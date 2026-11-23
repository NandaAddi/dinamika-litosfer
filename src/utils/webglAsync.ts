export interface AsyncProgramHandle {
  vs: WebGLShader | null;
  fs: WebGLShader | null;
  prog: WebGLProgram | null;
  cancel: () => void;
}

/**
 * Mengompilasi & menautkan shader WebGL secara asinkron menggunakan KHR_parallel_shader_compile
 * agar main thread tidak pernah freeze saat perpindahan halaman / inisialisasi modul 3D.
 */
export function linkProgramAsync(
  gl: WebGLRenderingContext,
  vertSrc: string,
  fragSrc: string,
  onReady: (prog: WebGLProgram, vs: WebGLShader, fs: WebGLShader) => void,
  onError?: (msg: string) => void
): AsyncProgramHandle {
  let cancelled = false;
  let pollId: number | null = null;

  const vs = gl.createShader(gl.VERTEX_SHADER);
  const fs = gl.createShader(gl.FRAGMENT_SHADER);
  const prog = gl.createProgram();

  if (!vs || !fs || !prog) {
    onError?.('Gagal mengalokasikan shader atau program WebGL');
    return { vs, fs, prog, cancel: () => {} };
  }

  gl.shaderSource(vs, vertSrc);
  gl.compileShader(vs);
  gl.shaderSource(fs, fragSrc);
  gl.compileShader(fs);
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);

  const parallelExt = gl.getExtension('KHR_parallel_shader_compile') as {
    COMPLETION_STATUS_KHR: number;
  } | null;

  const finalize = () => {
    if (cancelled) return;
    if (gl.isContextLost()) return;
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      const vsLog = gl.getShaderInfoLog(vs) || '';
      const fsLog = gl.getShaderInfoLog(fs) || '';
      const pLog = gl.getProgramInfoLog(prog) || '';
      const errMsg = `WebGL Link Error: ${pLog} | VS: ${vsLog} | FS: ${fsLog}`;
      console.error(errMsg);
      onError?.(errMsg);
      return;
    }
    onReady(prog, vs, fs);
  };

  if (parallelExt && typeof parallelExt.COMPLETION_STATUS_KHR === 'number') {
    const statusParam = parallelExt.COMPLETION_STATUS_KHR;
    const check = () => {
      if (cancelled || gl.isContextLost()) return;
      if (gl.getProgramParameter(prog, statusParam)) {
        finalize();
      } else {
        pollId = requestAnimationFrame(check);
      }
    };
    pollId = requestAnimationFrame(check);
  } else {
    pollId = requestAnimationFrame(finalize);
  }

  return {
    vs,
    fs,
    prog,
    cancel: () => {
      cancelled = true;
      if (pollId !== null) {
        cancelAnimationFrame(pollId);
        pollId = null;
      }
    }
  };
}

/**
 * Menjadwalkan pelepasan slot konteks WebGL secara asinkron setelah transisi halaman selesai
 * agar loseContext() tidak memblokir GPU process IPC saat klik navigasi.
 */
export function releaseWebGLContextAsync(gl: WebGLRenderingContext | null): void {
  if (!gl) return;
  const doLose = () => {
    try {
      if (!gl.isContextLost()) {
        const loseCtx = gl.getExtension('WEBGL_lose_context');
        if (loseCtx) loseCtx.loseContext();
      }
    } catch {}
  };
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    (window as any).requestIdleCallback(doLose, { timeout: 250 });
  } else {
    setTimeout(doLose, 120);
  }
}
