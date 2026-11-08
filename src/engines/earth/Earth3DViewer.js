/* ==========================================================================
   MODUL 1: 3D INTERAKTIF STRUKTUR LAPISAN BUMI (WebGL Photorealistic + HUD)
   Mendukung:
   - Tekstur Satelit Bumi Realistis (NASA Blue Marble Equirectangular 2048x1024)
   - Normal/Bump Mapping Pegunungan 3D, Spekular Samudra, Awan Dinamis & Atmosfer
   - Tekstur Penampang Magma & Batuan Berlapis (Domain-Warped FBM)
   - Rotasi Orbit 3D 360° (Mouse Drag & Touch) + Zoom
   - Exploded View 3D ("Pisahkan Lapisan" anatomi cangkang bumi)
   - Klik Lapisan 3D (Raycasting Bola Konsentris) & Pil Pemilih Lapisan
   - Animasi Tersinkronisasi Otomatis dengan 5 Slide Modul 1:
     * Slide 1: Penjalaran Gelombang Seismik P & S + Zona Bayangan (Shadow Zone)
     * Slide 2: Tomografi Seismik & Bidang Diskontinuitas (Moho, Gutenberg, Lehmann)
     * Slide 3: Perbandingan Kerak Benua (SiAl) vs Kerak Samudra (SiMa)
     * Slide 4: Arus Konveksi Termal Mantel (Astenosfer & Mesosfer)
     * Slide 5: Efek Dinamo (Geodynamo) Inti Luar Cair & Medan Magnet 3D
   ========================================================================== */
/* ES Module Export */
  const LAYER_DATA = [
    {
      id: 'inti-dalam',
      index: 0,
      name: 'Inti Dalam (Inner Core)',
      depth: '5.150 – 6.371 km',
      temp: '± 5.000 – 6.000 °C',
      state: 'Padat (Tekanan Ekstrem)',
      comp: 'Besi (Fe) & Nikel (Ni) Padat Kristalin',
      density: '~12,8 – 13,1 g/cm³',
      rInner: 0.0,
      rOuter: 0.22,
      color: '#fff099',
      accent: '#f7c948',
      explodeVec: [0.38, 0.22, 0.38]
    },
    {
      id: 'inti-luar',
      index: 1,
      name: 'Inti Luar (Outer Core)',
      depth: '2.900 – 5.150 km',
      temp: '± 4.000 – 5.000 °C',
      state: 'Cair (Konveksi Logam Cair)',
      comp: 'Besi (Fe) & Nikel (Ni) Cair — Pemicu Geodynamo',
      density: '~9,9 – 12,2 g/cm³',
      rInner: 0.225,
      rOuter: 0.45,
      color: '#ff922b',
      accent: '#f2842c',
      explodeVec: [0.24, 0.14, 0.24]
    },
    {
      id: 'mesosfer',
      index: 2,
      name: 'Mesosfer (Mantel Bawah)',
      depth: '660 – 2.900 km',
      temp: '± 1.900 – 3.700 °C',
      state: 'Padat Kaku (Kompresi Tinggi)',
      comp: 'Batuan Silikat Kaya Besi & Magnesium (Perovskit)',
      density: '~4,4 – 5,6 g/cm³',
      rInner: 0.455,
      rOuter: 0.74,
      color: '#c93b1e',
      accent: '#e4572e',
      explodeVec: [0.12, 0.07, 0.12]
    },
    {
      id: 'astenosfer',
      index: 3,
      name: 'Astenosfer (Mantel Atas)',
      depth: '100 – 660 km',
      temp: '± 1.300 – 1.900 °C',
      state: 'Plastis / Semi-Cair (Deformabel)',
      comp: 'Silikat (Olivin & Piroksen) — Mesin Arus Konveksi',
      density: '~3,3 – 3,9 g/cm³',
      rInner: 0.745,
      rOuter: 0.92,
      color: '#eb5e28',
      accent: '#ff7b47',
      explodeVec: [0.04, 0.02, 0.04]
    },
    {
      id: 'kerak',
      index: 4,
      name: 'Litosfer & Kerak Bumi',
      depth: '0 – 100 km (Kerak 5–70 km)',
      temp: '0 – 1.000 °C',
      state: 'Padat Kaku & Rapuh (Brittle)',
      comp: 'Kerak Benua (SiAl/Granit) & Samudra (SiMa/Basalt)',
      density: '2,7 g/cm³ (Benua) · 3,0 g/cm³ (Samudra)',
      rInner: 0.925,
      rOuter: 1.0,
      color: '#2b7bb9',
      accent: '#4ea8de',
      explodeVec: [-0.04, -0.02, -0.04]
    }
  ];

  const SLIDE_MODES = [
    {
      id: 'seismik',
      badge: '🔬 Simulasi Gelombang Seismik P & S',
      hint: 'Gelombang P (biru) menembus inti cair; Gelombang S (kuning) terhenti di 2.900 km (Zona Bayangan).',
      targetYaw: 0.78,
      targetPitch: 0.22,
      targetZoom: 1.0,
      focusLayer: null
    },
    {
      id: 'diskontinuitas',
      badge: '📡 Bidang Diskontinuitas Moho & Gutenberg',
      hint: 'Pembiasan tajam gelombang gempa di batas Moho (~35 km), Gutenberg (2.900 km), & Lehmann (5.150 km).',
      targetYaw: 0.84,
      targetPitch: 0.26,
      targetZoom: 1.04,
      focusLayer: null
    },
    {
      id: 'kerak',
      badge: '🏔️ Kerak Benua (SiAl) vs Kerak Samudra (SiMa)',
      hint: 'Kerak benua tebal (30–70 km, ringan) vs kerak samudra tipis (5–10 km, padat & menunjam).',
      targetYaw: 0.70,
      targetPitch: 0.30,
      targetZoom: 1.12,
      focusLayer: 4
    },
    {
      id: 'konveksi',
      badge: '🔥 Arus Konveksi Termal Astenosfer & Mantel',
      hint: 'Sirkulasi panas mantel mengapungkan dan menggeser lempeng litosfer di atasnya.',
      targetYaw: 0.80,
      targetPitch: 0.22,
      targetZoom: 1.04,
      focusLayer: 3
    },
    {
      id: 'geodynamo',
      badge: '🧲 Efek Dinamo Inti Luar & Medan Magnet Bumi',
      hint: 'Konveksi logam Fe-Ni cair di Inti Luar membangkitkan perisai magnetosfer bumi.',
      targetYaw: 0.76,
      targetPitch: 0.18,
      targetZoom: 0.92,
      focusLayer: 1
    }
  ];

  // Cache kanvas tekstur satelit & normal/specular map agar hanya dihitung sekali
  let sharedAlbedoCanvas = null;
  let sharedMaterialCanvas = null;
  const pendingViewers = [];

  function buildSharedEarthCanvases(img) {
    const W = 2048;
    const H = 1024;
    const albCanvas = document.createElement('canvas');
    albCanvas.width = W;
    albCanvas.height = H;
    const albCtx = albCanvas.getContext('2d');
    albCtx.drawImage(img, 0, 0, W, H);

    const imgData = albCtx.getImageData(0, 0, W, H);
    const d = imgData.data;

    // 1. Blend sambungan bujur (seam) di Samudra Pasifik agar 100% mulus tanpa garis sambungan
    const blendW = 36;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < blendW; x++) {
        const t = x / blendW;
        const idxL = (y * W + x) * 4;
        const idxR = (y * W + (W - 1 - x)) * 4;
        for (let c = 0; c < 3; c++) {
          const avg = (d[idxL + c] + d[idxR + c]) * 0.5;
          d[idxL + c] = Math.round(avg * (1 - t) + d[idxL + c] * t);
          d[idxR + c] = Math.round(avg * (1 - t) + d[idxR + c] * t);
        }
      }
    }

    // 2. Haluskan baris piksel di kutub utara & selatan agar tidak mengerucut di titik kutub
    const poleRows = 16;
    for (let y = 0; y < poleRows; y++) {
      let rAvg = 0, gAvg = 0, bAvg = 0;
      for (let x = 0; x < W; x++) {
        const idx = (y * W + x) * 4;
        rAvg += d[idx]; gAvg += d[idx + 1]; bAvg += d[idx + 2];
      }
      rAvg /= W; gAvg /= W; bAvg /= W;
      const t = y / poleRows;
      for (let x = 0; x < W; x++) {
        const idx = (y * W + x) * 4;
        d[idx]     = Math.round(rAvg * (1 - t) + d[idx] * t);
        d[idx + 1] = Math.round(gAvg * (1 - t) + d[idx + 1] * t);
        d[idx + 2] = Math.round(bAvg * (1 - t) + d[idx + 2] * t);
      }
    }
    for (let y = H - poleRows; y < H; y++) {
      let rAvg = 0, gAvg = 0, bAvg = 0;
      for (let x = 0; x < W; x++) {
        const idx = (y * W + x) * 4;
        rAvg += d[idx]; gAvg += d[idx + 1]; bAvg += d[idx + 2];
      }
      rAvg /= W; gAvg /= W; bAvg /= W;
      const t = (H - 1 - y) / poleRows;
      for (let x = 0; x < W; x++) {
        const idx = (y * W + x) * 4;
        d[idx]     = Math.round(rAvg * (1 - t) + d[idx] * t);
        d[idx + 1] = Math.round(gAvg * (1 - t) + d[idx + 1] * t);
        d[idx + 2] = Math.round(bAvg * (1 - t) + d[idx + 2] * t);
      }
    }
    albCtx.putImageData(imgData, 0, 0);

    // 3. Bangun Peta Normal Topografi 3D + Masker Air Spekular + Elevasi (1024x512)
    const MW = 1024;
    const MH = 512;
    const matCanvas = document.createElement('canvas');
    matCanvas.width = MW;
    matCanvas.height = MH;
    const matCtx = matCanvas.getContext('2d');
    const matData = matCtx.createImageData(MW, MH);
    const md = matData.data;

    const heights = new Float32Array(MW * MH);
    const waterMask = new Float32Array(MW * MH);

    for (let y = 0; y < MH; y++) {
      const sy = y * 2;
      const latNorm = Math.abs(y / MH - 0.5) * 2.0; // 0 di ekuator, 1 di kutub
      for (let x = 0; x < MW; x++) {
        const sx = x * 2;
        const idx = (sy * W + sx) * 4;
        const r = d[idx] / 255;
        const g = d[idx + 1] / 255;
        const b = d[idx + 2] / 255;

        // Deteksi samudra vs daratan vs salju/pegunungan dari spektrum warna satelit
        const isOcean = b > r * 1.18 && b > g * 0.94 && (r + g) < 1.15;
        let h = 0.0;
        let spec = 0.05;

        if (isOcean) {
          // Kedalaman batimetri laut (laut dangkal paparan benua sedikit lebih tinggi)
          h = Math.max(0.0, (g - r) * 0.12);
          spec = 0.88;
        } else {
          const luma = r * 0.33 + g * 0.45 + b * 0.22;
          const isSnow = r > 0.72 && g > 0.74 && b > 0.72;
          const isMountain = r > g * 1.04 && r > b * 1.18;
          if (isSnow) {
            h = latNorm > 0.72 ? 0.42 : 0.92;
            spec = 0.24;
          } else if (isMountain) {
            h = 0.45 + (r - b) * 0.85 + luma * 0.3;
            spec = 0.04;
          } else {
            // Hutan tropis / dataran rendah
            h = 0.16 + luma * 0.32;
            spec = 0.06;
          }
        }
        heights[y * MW + x] = Math.min(1.0, Math.max(0.0, h));
        waterMask[y * MW + x] = spec;
      }
    }

    for (let y = 0; y < MH; y++) {
      const yUp = Math.max(0, y - 1);
      const yDn = Math.min(MH - 1, y + 1);
      // Redam gradien di dekat kutub agar tidak terjadi artefak normal
      const poleFade = Math.sin((y / (MH - 1)) * Math.PI);
      for (let x = 0; x < MW; x++) {
        const xL = (x - 1 + MW) % MW;
        const xR = (x + 1) % MW;

        const dhdx = (heights[y * MW + xR] - heights[y * MW + xL]) * poleFade;
        const dhdy = (heights[yDn * MW + x] - heights[yUp * MW + x]) * poleFade;

        const nx = Math.max(-1, Math.min(1, dhdx * 4.2));
        const ny = Math.max(-1, Math.min(1, dhdy * 4.2));

        const outIdx = (y * MW + x) * 4;
        md[outIdx]     = Math.round((nx * 0.5 + 0.5) * 255);
        md[outIdx + 1] = Math.round((ny * 0.5 + 0.5) * 255);
        md[outIdx + 2] = Math.round(waterMask[y * MW + x] * 255);
        md[outIdx + 3] = Math.round(heights[y * MW + x] * 255);
      }
    }
    matCtx.putImageData(matData, 0, 0);

    sharedAlbedoCanvas = albCanvas;
    sharedMaterialCanvas = matCanvas;

    while (pendingViewers.length > 0) {
      const v = pendingViewers.shift();
      if (v && !v.isDestroyed && v.gl && v.earthTex && v.materialTex) {
        v.uploadEarthTextures(sharedAlbedoCanvas, sharedMaterialCanvas);
      }
    }
  }

  function requestEarthTextures(viewer) {
    if (!viewer || viewer.isDestroyed) return;
    if (sharedAlbedoCanvas && sharedMaterialCanvas) {
      viewer.uploadEarthTextures(sharedAlbedoCanvas, sharedMaterialCanvas);
      return;
    }
    pendingViewers.push(viewer);
    if (pendingViewers.length > 1) return;

    const img = new Image();
    img.onload = () => buildSharedEarthCanvases(img);
    img.src = window.EARTH_DAYMAP_DATA_URI || '/assets/images/earth_daymap.jpg';
  }

  // Matriks & Proyeksi 3D (Mendukung buffer 'out' untuk Zero-Allocation)
  function mat4Perspective(fovRad, aspect, near, far, out = new Float32Array(16)) {
    const f = 1.0 / Math.tan(fovRad / 2);
    const nf = 1 / (near - far);
    out[0] = f / aspect; out[1] = 0; out[2] = 0; out[3] = 0;
    out[4] = 0; out[5] = f; out[6] = 0; out[7] = 0;
    out[8] = 0; out[9] = 0; out[10] = (far + near) * nf; out[11] = -1;
    out[12] = 0; out[13] = 0; out[14] = (2 * far * near) * nf; out[15] = 0;
    return out;
  }

  function mat4LookAt(eye, center, up, out = new Float32Array(16)) {
    let zx = eye[0] - center[0], zy = eye[1] - center[1], zz = eye[2] - center[2];
    let len = Math.hypot(zx, zy, zz) || 1;
    zx /= len; zy /= len; zz /= len;
    let xx = up[1] * zz - up[2] * zy;
    let xy = up[2] * zx - up[0] * zz;
    let xz = up[0] * zy - up[1] * zx;
    len = Math.hypot(xx, xy, xz) || 1;
    xx /= len; xy /= len; xz /= len;
    const yx = zy * xz - zz * xy;
    const yy = zz * xx - zx * xz;
    const yz = zx * xy - zy * xx;
    out[0] = xx; out[1] = yx; out[2] = zx; out[3] = 0;
    out[4] = xy; out[5] = yy; out[6] = zy; out[7] = 0;
    out[8] = xz; out[9] = yz; out[10] = zz; out[11] = 0;
    out[12] = -(xx * eye[0] + xy * eye[1] + xz * eye[2]);
    out[13] = -(yx * eye[0] + yy * eye[1] + yz * eye[2]);
    out[14] = -(zx * eye[0] + zy * eye[1] + zz * eye[2]);
    out[15] = 1;
    return out;
  }

  function mat4Multiply(a, b, out = new Float32Array(16)) {
    const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }

  function projectPoint3D(pt, mvp, width, height, out = null) {
    const x = pt[0], y = pt[1], z = pt[2];
    const cx = mvp[0] * x + mvp[4] * y + mvp[8]  * z + mvp[12];
    const cy = mvp[1] * x + mvp[5] * y + mvp[9]  * z + mvp[13];
    const cz = mvp[2] * x + mvp[6] * y + mvp[10] * z + mvp[14];
    const cw = mvp[3] * x + mvp[7] * y + mvp[11] * z + mvp[15];
    if (cw <= 0.05) return null;
    const ndcX = cx / cw;
    const ndcY = cy / cw;
    const res = out || { x: 0, y: 0, z: 0 };
    res.x = (ndcX * 0.5 + 0.5) * width;
    res.y = (1.0 - (ndcY * 0.5 + 0.5)) * height;
    res.z = cz / cw;
    return res;
  }

  // Geometri Cangkang Bola 3D Halus (Tanpa Distorsi Kutub) dengan Potongan Kuadran (Cutaway)
  const _shellGeomCache = new Map();
  function _uncachedCreateShellGeometry(rInner, rOuter, cutaway) {
    const latSegs = 56;
    const lonSegs = 80;
    const positions = [];
    const normals = [];
    const uvs = [];
    const surfaceTypes = []; // 0 = outer surface, 1 = inner surface, 2 = cut wall YZ, 3 = cut wall XY
    const indices = [];

    const phiCut = cutaway ? Math.PI * 0.52 : 0;
    const phiStart = phiCut;
    const phiRange = Math.PI * 2 - phiCut;
    // Offset bujur agar Kepulauan Indonesia, Asia, Australia & Afrika tampak jelas di dekat irisan
    const lonOffset = 0.08;

    function addSphericalCap(radius, flipNormal, surfType) {
      const base = positions.length / 3;
      for (let i = 0; i <= latSegs; i++) {
        const v = i / latSegs;
        const theta = v * Math.PI;
        const sinT = Math.sin(theta);
        const cosT = Math.cos(theta);
        for (let j = 0; j <= lonSegs; j++) {
          const u = j / lonSegs;
          const phi = phiStart + u * phiRange;
          const x = radius * sinT * Math.cos(phi);
          const y = radius * cosT;
          const z = radius * sinT * Math.sin(phi);
          positions.push(x, y, z);
          const sign = flipNormal ? -1 : 1;
          normals.push(sinT * Math.cos(phi) * sign, cosT * sign, sinT * Math.sin(phi) * sign);
          // Orientasi Barat-ke-Timur yang benar ketika dilihat dari luar bola
          const texU = 1.0 - phi / (Math.PI * 2) + lonOffset;
          uvs.push(texU, v);
          surfaceTypes.push(surfType);
        }
      }
      const stride = lonSegs + 1;
      for (let i = 0; i < latSegs; i++) {
        for (let j = 0; j < lonSegs; j++) {
          const a = base + i * stride + j;
          const b = a + stride;
          const c = a + 1;
          const d = b + 1;
          if (!flipNormal) {
            indices.push(a, b, c, c, b, d);
          } else {
            indices.push(a, c, b, c, d, b);
          }
        }
      }
    }

    addSphericalCap(rOuter, false, 0);
    if (rInner > 0.001) {
      addSphericalCap(rInner, true, 1);
    }

    if (cutaway) {
      const rSteps = 8;
      function addCutPlane(phi, nx, ny, nz, flipWinding, surfType) {
        const base = positions.length / 3;
        const cosP = Math.cos(phi);
        const sinP = Math.sin(phi);
        for (let i = 0; i <= latSegs; i++) {
          const v = i / latSegs;
          const theta = v * Math.PI;
          const sinT = Math.sin(theta);
          const cosT = Math.cos(theta);
          for (let k = 0; k <= rSteps; k++) {
            const u = k / rSteps;
            const r = rInner + u * (rOuter - rInner);
            positions.push(r * sinT * cosP, r * cosT, r * sinT * sinP);
            normals.push(nx, ny, nz);
            uvs.push(r, v);
            surfaceTypes.push(surfType);
          }
        }
        const stride = rSteps + 1;
        for (let i = 0; i < latSegs; i++) {
          for (let k = 0; k < rSteps; k++) {
            const a = base + i * stride + k;
            const b = a + stride;
            const c = a + 1;
            const d = b + 1;
            if (flipWinding) {
              indices.push(a, b, c, c, b, d);
            } else {
              indices.push(a, c, b, c, d, b);
            }
          }
        }
      }
      addCutPlane(phiStart, 1, 0, 0, true, 2);
      addCutPlane(Math.PI * 2, 0, 0, 1, false, 3);
    }

    return {
      positions: new Float32Array(positions),
      normals: new Float32Array(normals),
      uvs: new Float32Array(uvs),
      surfaceTypes: new Float32Array(surfaceTypes),
      indices: new Uint16Array(indices)
    };
  }
  function createShellGeometry(rInner, rOuter, cutaway) {
    const key = rInner + '_' + rOuter + '_' + cutaway;
    if (_shellGeomCache.has(key)) return _shellGeomCache.get(key);
    const g = _uncachedCreateShellGeometry(rInner, rOuter, cutaway);
    _shellGeomCache.set(key, g);
    return g;

  }

  const VERT_SRC = `
    attribute vec3 aPos;
    attribute vec3 aNorm;
    attribute vec2 aUV;
    attribute float aSurfType;

    uniform mat4 uMVP;
    uniform vec3 uOffset;
    uniform float uScale;

    varying vec3 vPos;
    varying vec3 vWorldPos;
    varying vec3 vNorm;
    varying vec2 vUV;
    varying float vSurfType;

    void main() {
      vec3 world = aPos * uScale + uOffset;
      vPos = aPos;
      vWorldPos = world;
      vNorm = aNorm;
      vUV = aUV;
      vSurfType = aSurfType;
      gl_Position = uMVP * vec4(world, 1.0);
    }
  `;

  const FRAG_SRC = `
    precision highp float;

    varying vec3 vPos;
    varying vec3 vWorldPos;
    varying vec3 vNorm;
    varying vec2 vUV;
    varying float vSurfType;

    uniform int uLayerIndex;
    uniform float uTime;
    uniform float uHighlight;
    uniform float uDim;
    uniform vec3 uEye;
    uniform sampler2D uEarthTex;
    uniform sampler2D uMaterialTex;

    float hash(vec3 p) {
      p = fract(p * 0.3183099 + 0.1);
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }

    float noise(vec3 x) {
      vec3 i = floor(x);
      vec3 f = fract(x);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
            mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
        mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
            mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
    }

    float fbm(vec3 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 4; i++) {
        v += a * noise(p);
        p = p * 2.03 + vec3(1.7, 9.2, 5.4);
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec3 N_geom = normalize(vNorm);
      vec3 N = N_geom;
      vec3 V = normalize(uEye - vWorldPos);
      vec3 L1 = normalize(vec3(0.62, 0.58, 0.65));
      vec3 L2 = normalize(vec3(-0.65, -0.35, 0.65));

      float rim = pow(1.0 - max(dot(N_geom, V), 0.0), 3.0);

      vec3 baseCol = vec3(0.5);
      float emissive = 0.0;
      float specPower = 28.0;
      float specStrength = 0.22;
      float r = length(vPos);

      if (uLayerIndex == 0) {
        // Inti Dalam Padat Kristalin Fe-Ni (>5.000 C)
        vec3 p = vPos * 12.0;
        float q = fbm(p + vec3(uTime * 0.35));
        float crystal = fbm(p * 1.8 + vec3(q * 2.2));
        float pulse = 0.5 + 0.5 * sin(uTime * 2.6);
        baseCol = mix(vec3(1.0, 0.68, 0.14), vec3(1.0, 0.96, 0.80), crystal * 0.78 + pulse * 0.18);
        baseCol = mix(baseCol, vec3(1.0, 1.0, 0.95), smoothstep(0.62, 0.88, crystal));
        emissive = 0.76 + pulse * 0.14;
        specStrength = 0.65;
      } else if (uLayerIndex == 1) {
        // Inti Luar Cair (Logam Fe-Ni Cair Berkonveksi)
        vec3 p = vPos * 7.5 + vec3(0.0, uTime * 0.42, uTime * 0.22);
        float warp = fbm(p);
        float flow = fbm(p + vec3(warp * 2.4, -uTime * 0.3, warp * 1.8));
        baseCol = mix(vec3(0.68, 0.16, 0.02), vec3(0.98, 0.48, 0.06), smoothstep(0.22, 0.65, flow));
        baseCol = mix(baseCol, vec3(1.0, 0.84, 0.25), smoothstep(0.62, 0.86, flow));
        if (vSurfType > 1.5) {
          float eddy = sin((r - 0.225) * 62.0 - uTime * 2.2 + warp * 5.0) * 0.5 + 0.5;
          baseCol = mix(baseCol, vec3(1.0, 0.78, 0.22), eddy * 0.28);
        }
        emissive = 0.46;
        specStrength = 0.45;
      } else if (uLayerIndex == 2) {
        // Mesosfer (Mantel Bawah - Batuan Silikat Perovskit Tekanan Tinggi)
        vec3 p = vPos * 6.0;
        float q = fbm(p - vec3(0.0, uTime * 0.18, 0.0));
        float plume = fbm(p * 1.6 + vec3(q * 2.0));
        float radialTemp = 1.0 - smoothstep(0.455, 0.74, r);
        vec3 coolRock = vec3(0.36, 0.07, 0.04);
        vec3 hotMantle = vec3(0.84, 0.24, 0.08);
        vec3 magmaVein = vec3(1.0, 0.54, 0.14);
        baseCol = mix(coolRock, hotMantle, clamp(plume * 0.85 + radialTemp * 0.45, 0.0, 1.0));
        baseCol = mix(baseCol, magmaVein, smoothstep(0.64, 0.85, plume) * (0.4 + radialTemp * 0.6));
        emissive = 0.22 + radialTemp * 0.16;
      } else if (uLayerIndex == 3) {
        // Astenosfer (Mantel Atas Plastis - Arus Konveksi Magma)
        vec3 p = vPos * 8.5 + vec3(sin(uTime * 0.4) * 0.4, uTime * 0.32, cos(uTime * 0.4) * 0.4);
        float w = fbm(p);
        float magma = fbm(p * 1.4 + vec3(w * 2.5));
        vec3 crusted = vec3(0.48, 0.11, 0.04);
        vec3 molten = vec3(0.95, 0.36, 0.08);
        vec3 incandescent = vec3(1.0, 0.76, 0.22);
        baseCol = mix(crusted, molten, smoothstep(0.25, 0.62, magma));
        baseCol = mix(baseCol, incandescent, smoothstep(0.64, 0.86, magma));
        emissive = 0.34;
      } else {
        // Lapisan 4: Litosfer & Kerak Bumi
        if (vSurfType < 0.5) {
          // PERMUKAAN LUAR BUMI: Peta Satelit Realistis + Normal Mapping + Spekular Samudra + Awan
          vec2 uv = vec2(fract(vUV.x), clamp(vUV.y, 0.002, 0.998));
          vec3 texCol = texture2D(uEarthTex, uv).rgb;
          vec4 mat = texture2D(uMaterialTex, uv);

          // Bump / Normal Mapping dari gradien topografi peta satelit
          vec2 dNorm = (mat.rg - 0.5) * 2.0;
          float waterMask = mat.b;
          float elev = mat.a;

          vec3 T = normalize(vec3(N_geom.z, 0.0, -N_geom.x + 0.0001));
          vec3 B = normalize(cross(N_geom, T));
          float bumpScale = mix(0.65, 0.08, smoothstep(0.3, 0.7, waterMask));
          N = normalize(N_geom + (T * dNorm.x - B * dNorm.y) * bumpScale);

          // Koreksi kontras & kekayaan warna satelit (laut dalam kaya, daratan tajam)
          vec3 oceanTint = mix(texCol * vec3(0.88, 0.98, 1.12), vec3(0.03, 0.16, 0.36), 0.18);
          vec3 landTint = pow(texCol, vec3(0.94)) * 1.06;
          // Tambah detail mikro topografi pada pegunungan daratan
          float micro = fbm(vPos * 28.0);
          landTint *= (0.90 + micro * 0.22 + elev * 0.12);

          baseCol = mix(landTint, oceanTint, smoothstep(0.35, 0.65, waterMask));

          // Lapisan Awan Atmosfer Dinamis (Drifting Cyclone & Trade-Wind Clouds)
          vec3 cloudPos = vec3(
            vPos.x * cos(uTime * 0.025) - vPos.z * sin(uTime * 0.025),
            vPos.y,
            vPos.x * sin(uTime * 0.025) + vPos.z * cos(uTime * 0.025)
          );
          float cWarp = fbm(cloudPos * 3.2 + vec3(0.0, uTime * 0.015, 0.0));
          float cRaw = fbm(cloudPos * 5.4 + vec3(cWarp * 1.8));
          // Sabuk awan ekuator (ITCZ) dan lintang sedang
          float latBand = 0.78 + 0.22 * cos(vPos.y * 5.5);
          float clouds = smoothstep(0.50, 0.76, cRaw * latBand);

          // Bayangan tipis awan di permukaan bumi
          float cShadow = smoothstep(0.52, 0.75, fbm((cloudPos - L1 * 0.025) * 5.4 + vec3(cWarp * 1.8)) * latBand);
          baseCol *= (1.0 - cShadow * 0.22);

          // Campurkan awan putih bersih di atas samudra dan benua
          baseCol = mix(baseCol, vec3(0.96, 0.98, 1.0), clouds * 0.68);

          // Spekular air laut (glint matahari di samudra, redup di bawah awan & daratan)
          specStrength = mix(0.06, 0.78, smoothstep(0.35, 0.75, waterMask)) * (1.0 - clouds * 0.75);
          specPower = mix(18.0, 56.0, smoothstep(0.35, 0.75, waterMask));

          // Pendaran atmosfer biru Rayleigh (Atmospheric Limb Scattering)
          vec3 atmosCol = vec3(0.24, 0.62, 1.0);
          baseCol = mix(baseCol, atmosCol, rim * 0.42);
          emissive = 0.06;
        } else {
          // Penampang Irisan Batuan Litosfer & Kerak (Granit SiAl & Basalt SiMa)
          float strata = fbm(vec3(vPos.x * 18.0, vPos.y * 18.0, r * 65.0));
          vec3 lowerLitho = vec3(0.28, 0.21, 0.18);
          vec3 upperCrust = vec3(0.54, 0.46, 0.38);
          baseCol = mix(lowerLitho, upperCrust, smoothstep(0.925, 0.995, r) * 0.7 + strata * 0.3);
          // Pijar panas dari perbatasan Astenosfer di bagian bawah litosfer
          float mohoGlow = 1.0 - smoothstep(0.925, 0.945, r);
          baseCol = mix(baseCol, vec3(0.95, 0.45, 0.12), mohoGlow * 0.55);
          emissive = 0.10;
          specStrength = 0.12;
        }
      }

      // Garis pembatas geologis pada bidang irisan (Moho, Gutenberg, Lehmann)
      if (vSurfType > 1.5) {
        float dInner = abs(r - 0.225);
        float dGuten = abs(r - 0.452);
        float dAsth  = abs(r - 0.742);
        float dMoho  = abs(r - 0.925);
        float border = smoothstep(0.008, 0.0012, min(min(dInner, dGuten), min(dAsth, dMoho)));
        baseCol = mix(baseCol, vec3(1.0, 0.90, 0.58), border * 0.62);
      }

      float diff1 = max(dot(N, L1), 0.0);
      float diff2 = max(dot(N, L2), 0.0) * 0.32;
      vec3 H = normalize(L1 + V);
      float spec = pow(max(dot(N, H), 0.0), specPower) * specStrength;

      vec3 lightSum = baseCol * (0.28 + diff1 * 0.74 + diff2) + baseCol * emissive + vec3(1.0, 0.97, 0.90) * spec;

      // Tambahan atmospheric Fresnel halo khusus permukaan luar bola bumi
      if (uLayerIndex == 4 && vSurfType < 0.5) {
        lightSum += vec3(0.20, 0.56, 0.98) * rim * (0.35 + diff1 * 0.35);
      }

      // Highlight saat lapisan dipilih / di-hover
      if (uHighlight > 0.01) {
        lightSum = mix(lightSum, lightSum * 1.32 + vec3(0.22, 0.15, 0.04), uHighlight);
        lightSum += vec3(1.0, 0.78, 0.28) * rim * uHighlight * 0.80;
      }

      lightSum *= (1.0 - uDim * 0.45);
      gl_FragColor = vec4(lightSum, 1.0);
    }
  `;

  function compileShader(gl, type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error('Shader error:', gl.getShaderInfoLog(sh));
    }
    return sh;
  }

  export class Earth3DViewer {
    constructor(cardEl, pageId) {
      this.cardEl = cardEl;
      this.pageId = pageId;
      this.yaw = 0.78;
      this.pitch = 0.22;
      this.zoom = 1.0;
      this.targetYaw = 0.78;
      this.targetPitch = 0.22;
      this.targetZoom = 1.0;

      this.isDragging = false;
      this.dragMoved = false;
      this.lastX = 0;
      this.lastY = 0;
      this.userInteracting = false;

      this.isPlaying = true;
      this.isExploded = false;
      this.explodeAmount = 0.0;
      this.showLabels = true;
      this.selectedLayer = null;
      this.slideIndex = 0;
      this.simTime = 0;
      this.lastFrameTime = performance.now();

      this.buildDOM();
      this.initWebGL();
      this.bindEvents();
      this.onSlideChange(0);

      this.animate = this.animate.bind(this);
      this.isDestroyed = false;
      this.isPaused = false;
      if (!this._cleanups) this._cleanups = [];
      if (this.glCanvas) {
        const onLost = (e) => {
          e.preventDefault();
          this.isPaused = true;
          if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
          }
        };
        this.glCanvas.addEventListener('webglcontextlost', onLost, false);
        this._cleanups.push(() => this.glCanvas?.removeEventListener('webglcontextlost', onLost));
      }
      const onVisChange = () => {
        if (!document.hidden && this.cardEl && this.cardEl.offsetParent !== null) {
          const pageEl = this.cardEl.closest('.page');
          if (!pageEl || pageEl.classList.contains('active')) {
            this.resume();
          }
        }
      };
      document.addEventListener('visibilitychange', onVisChange);
      this._cleanups.push(() => document.removeEventListener('visibilitychange', onVisChange));
      if (typeof IntersectionObserver !== 'undefined' && this.cardEl) {
        this._io = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !document.hidden) {
              const pageEl = this.cardEl.closest('.page');
              if (!pageEl || pageEl.classList.contains('active')) {
                this.resume();
              }
            } else {
              this.pause();
            }
          });
        }, { threshold: 0.05 });
        this._io.observe(this.cardEl);
      }
      this.resume();
    }

    buildDOM() {
      this.wrap = document.createElement('div');
      this.wrap.className = 'earth3d-stage';
      this.wrap.innerHTML = `
        <canvas class="earth3d-gl" aria-label="Model 3D Interaktif Struktur Lapisan Bumi"></canvas>
        <canvas class="earth3d-hud"></canvas>

        <!-- Banner Penjelasan Mode Animasi Slide -->
        <div class="earth3d-sim-banner">
          <b class="sim-title">🔬 Simulasi Gelombang Seismik P &amp; S</b>
          <span class="sim-sub">Putar bola bumi (drag) atau klik lapisan untuk inspeksi detail.</span>
        </div>

        <!-- Kartu Detail Lapisan (Muncul saat Lapisan Diklik) -->
        <div class="earth3d-layer-popup" style="display:none">
          <div class="lp-head">
            <span class="lp-dot"></span>
            <strong class="lp-name">Inti Dalam</strong>
            <button type="button" class="lp-close" aria-label="Tutup detail lapisan">✕</button>
          </div>
          <div class="lp-grid">
            <div><small>Kedalaman</small><b class="lp-depth">-</b></div>
            <div><small>Temperatur</small><b class="lp-temp">-</b></div>
            <div><small>Wujud &amp; Sifat</small><b class="lp-state">-</b></div>
            <div><small>Massa Jenis</small><b class="lp-dens">-</b></div>
          </div>
          <div class="lp-comp"></div>
        </div>

        <!-- Baris Pil Lapisan & Tombol Kontrol Taktil di Bawah -->
        <div class="earth3d-bottom-bar">
          <div class="earth3d-layer-pills" role="group" aria-label="Pilih Lapisan Bumi">
            ${LAYER_DATA.map(
              l => `<button type="button" class="e3d-pill" data-layer="${l.index}">
                      <i style="background:${l.accent}"></i>${l.name.split(' (')[0]}
                    </button>`
            ).join('')}
          </div>
          <div class="earth3d-ctrls">
            <button type="button" class="e3d-ctrl-btn active" data-action="play" title="Jeda / Mainkan Animasi">⏸ Jeda</button>
            <button type="button" class="e3d-ctrl-btn" data-action="explode" title="Pisahkan / Satukan Lapisan 3D">🧩 Pisahkan</button>
            <button type="button" class="e3d-ctrl-btn active" data-action="labels" title="Tampilkan / Sembunyikan Label">🏷️ Label</button>
            <button type="button" class="e3d-ctrl-btn" data-action="reset" title="Reset Sudut Kamera">↺ Reset</button>
          </div>
        </div>
      `;
      this.cardEl.appendChild(this.wrap);

      this.glCanvas = this.wrap.querySelector('.earth3d-gl');
      this.hudCanvas = this.wrap.querySelector('.earth3d-hud');
      this.ctx2d = this.hudCanvas.getContext('2d');
      this.simTitleEl = this.wrap.querySelector('.sim-title');
      this.simSubEl = this.wrap.querySelector('.sim-sub');
      this.popupEl = this.wrap.querySelector('.earth3d-layer-popup');
    }

    initWebGL() {
      const gl = this.glCanvas.getContext('webgl', { antialias: true, alpha: true });
      this.gl = gl;
      if (!gl) return;

      const vs = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC);
      const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
      const prog = gl.createProgram();
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      gl.useProgram(prog);
      this.prog = prog;

      this.attribs = {
        aPos: gl.getAttribLocation(prog, 'aPos'),
        aNorm: gl.getAttribLocation(prog, 'aNorm'),
        aUV: gl.getAttribLocation(prog, 'aUV'),
        aSurfType: gl.getAttribLocation(prog, 'aSurfType')
      };
      this.uniforms = {
        uMVP: gl.getUniformLocation(prog, 'uMVP'),
        uOffset: gl.getUniformLocation(prog, 'uOffset'),
        uScale: gl.getUniformLocation(prog, 'uScale'),
        uLayerIndex: gl.getUniformLocation(prog, 'uLayerIndex'),
        uTime: gl.getUniformLocation(prog, 'uTime'),
        uHighlight: gl.getUniformLocation(prog, 'uHighlight'),
        uDim: gl.getUniformLocation(prog, 'uDim'),
        uEye: gl.getUniformLocation(prog, 'uEye'),
        uEarthTex: gl.getUniformLocation(prog, 'uEarthTex'),
        uMaterialTex: gl.getUniformLocation(prog, 'uMaterialTex')
      };

      // Buat placeholder tekstur 1x1 sebelum peta satelit 2048x1024 selesai diunggah
      this.earthTex = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.earthTex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([18, 68, 128, 255]));

      this.materialTex = gl.createTexture();
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, this.materialTex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([128, 128, 220, 0]));

      requestEarthTextures(this);

      this.meshes = LAYER_DATA.map((layer, idx) => {
        const geom = createShellGeometry(layer.rInner, layer.rOuter, idx > 0);
        const posBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
        gl.bufferData(gl.ARRAY_BUFFER, geom.positions, gl.STATIC_DRAW);

        const normBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normBuf);
        gl.bufferData(gl.ARRAY_BUFFER, geom.normals, gl.STATIC_DRAW);

        const uvBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
        gl.bufferData(gl.ARRAY_BUFFER, geom.uvs, gl.STATIC_DRAW);

        const surfBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, surfBuf);
        gl.bufferData(gl.ARRAY_BUFFER, geom.surfaceTypes, gl.STATIC_DRAW);

        const idxBuf = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuf);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geom.indices, gl.STATIC_DRAW);

        return {
          posBuf,
          normBuf,
          uvBuf,
          surfBuf,
          idxBuf,
          count: geom.indices.length
        };
      });

      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
    }

    uploadEarthTextures(albCanvas, matCanvas) {
      if (this.isDestroyed || !this.gl || !this.earthTex || !this.materialTex) return;
      const gl = this.gl;
      if (!gl.isTexture(this.earthTex) || !gl.isTexture(this.materialTex)) return;

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.earthTex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, albCanvas);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, this.materialTex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, matCanvas);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }

    bindEvents() {
      const stage = this.hudCanvas;

      const onPointerDown = (x, y) => {
        this.isDragging = true;
        this.dragMoved = false;
        this.lastX = x;
        this.lastY = y;
        this.userInteracting = true;
      };

      const onPointerMove = (x, y) => {
        if (!this.isDragging) return;
        const dx = x - this.lastX;
        const dy = y - this.lastY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) this.dragMoved = true;
        this.lastX = x;
        this.lastY = y;
        this.targetYaw -= dx * 0.0085;
        this.targetPitch = Math.max(-1.15, Math.min(1.15, this.targetPitch + dy * 0.0085));
      };

      const onPointerUp = (x, y) => {
        if (this.isDragging && !this.dragMoved) {
          this.handleCanvasClick(x, y);
        }
        this.isDragging = false;
      };

      if (!this._cleanups) this._cleanups = [];
      const onMove = e => onPointerMove(e.clientX, e.clientY);
      const onUp = e => onPointerUp(e.clientX, e.clientY);

      stage.addEventListener('mousedown', e => onPointerDown(e.clientX, e.clientY));
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
      this._cleanups.push(() => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      });

      let touchStartDist = 0;
      let touchStartZoom = this.targetZoom;

      stage.addEventListener('touchstart', e => {
        if (e.touches.length === 1) {
          onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
        } else if (e.touches.length === 2) {
          this.userInteracting = true;
          touchStartDist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          touchStartZoom = this.targetZoom;
        }
      }, { passive: true });

      stage.addEventListener('touchmove', e => {
        if (e.touches.length === 1 && this.isDragging) {
          onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
        } else if (e.touches.length === 2 && touchStartDist > 0) {
          const dist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          const factor = dist / touchStartDist;
          this.targetZoom = Math.max(0.7, Math.min(1.55, touchStartZoom * factor));
        }
      }, { passive: true });

      stage.addEventListener('touchend', e => {
        if (e.touches.length === 0) {
          touchStartDist = 0;
          const t = e.changedTouches[0];
          if (t) onPointerUp(t.clientX, t.clientY);
        }
      });

      stage.addEventListener('wheel', e => {
        e.preventDefault();
        this.userInteracting = true;
        this.targetZoom = Math.max(0.7, Math.min(1.55, this.targetZoom - e.deltaY * 0.001));
      }, { passive: false });

      // Pil pemilih lapisan
      this.wrap.querySelectorAll('.e3d-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = Number(btn.dataset.layer);
          this.selectLayer(this.selectedLayer === idx ? null : idx, true);
        });
      });

      this.wrap.querySelector('.lp-close').addEventListener('click', () => {
        this.selectLayer(null);
      });

      // Tombol kontrol bawah
      this.wrap.querySelectorAll('.e3d-ctrl-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const act = btn.dataset.action;
          if (act === 'play') {
            this.isPlaying = !this.isPlaying;
            btn.classList.toggle('active', this.isPlaying);
            btn.innerHTML = this.isPlaying ? '⏸ Jeda' : '▶ Putar';
          } else if (act === 'explode') {
            this.isExploded = !this.isExploded;
            btn.classList.toggle('active', this.isExploded);
            btn.innerHTML = this.isExploded ? '🧲 Satukan' : '🧩 Pisahkan';
            if (typeof this.onInspect === 'function') {
              this.onInspect({ type: 'action', action: 'explode', state: this.isExploded });
            }
          } else if (act === 'labels') {
            this.showLabels = !this.showLabels;
            btn.classList.toggle('active', this.showLabels);
          } else if (act === 'reset') {
            this.userInteracting = false;
            this.isExploded = false;
            this.wrap.querySelector('[data-action="explode"]').classList.remove('active');
            this.wrap.querySelector('[data-action="explode"]').innerHTML = '🧩 Pisahkan';
            this.selectLayer(null);
            this.onSlideChange(this.slideIndex);
          }
        });
      });
    }

    handleCanvasClick(clientX, clientY) {
      const rect = this.hudCanvas.getBoundingClientRect();
      const px = clientX - rect.left;
      const py = clientY - rect.top;

      if (this.lastScreenAnchors) {
        for (let i = 0; i < this.lastScreenAnchors.length; i++) {
          const a = this.lastScreenAnchors[i];
          if (!a) continue;
          if (Math.hypot(px - a.x, py - a.y) < 34) {
            this.selectLayer(this.selectedLayer === i ? null : i);
            return;
          }
        }
      }

      const center = projectPoint3D([0, 0, 0], this.lastMVP, rect.width, rect.height);
      const edge = projectPoint3D([0, 1, 0], this.lastMVP, rect.width, rect.height);
      if (center && edge) {
        const R = Math.hypot(edge.x - center.x, edge.y - center.y) || 140;
        const rNorm = Math.hypot(px - center.x, py - center.y) / R;
        if (rNorm <= 1.05) {
          for (let i = 0; i < LAYER_DATA.length; i++) {
            if (rNorm <= LAYER_DATA[i].rOuter + 0.03) {
              this.selectLayer(this.selectedLayer === i ? null : i);
              return;
            }
          }
        }
      }
    }

    selectLayer(layerIdx, fromPill = false) {
      this.selectedLayer = layerIdx;
      this.wrap.querySelectorAll('.e3d-pill').forEach((btn, i) => {
        btn.classList.toggle('active', i === layerIdx);
      });

      if (typeof this.onInspect === 'function' && layerIdx !== null && layerIdx !== undefined) {
        this.onInspect({ type: 'layer', id: layerIdx, name: LAYER_DATA[layerIdx]?.name });
      }

      if (layerIdx === null || layerIdx === undefined) {
        this.popupEl.style.display = 'none';
        return;
      }

      if (fromPill && this.currentEye) {
        const eye = this.currentEye;
        const eyeLen = Math.hypot(eye[0], eye[1], eye[2]) || 1;
        const cutDot = (eye[0] * 0.68 + eye[1] * 0.08 + eye[2] * 0.73) / eyeLen;
        if (cutDot < 0.22) {
          this.targetYaw = 0.78;
          this.targetPitch = 0.22;
        }
      }

      const d = LAYER_DATA[layerIdx];
      this.popupEl.style.display = 'block';
      this.popupEl.querySelector('.lp-dot').style.background = d.accent;
      this.popupEl.querySelector('.lp-name').textContent = d.name;
      this.popupEl.querySelector('.lp-depth').textContent = d.depth;
      this.popupEl.querySelector('.lp-temp').textContent = d.temp;
      this.popupEl.querySelector('.lp-state').textContent = d.state;
      this.popupEl.querySelector('.lp-dens').textContent = d.density;
      this.popupEl.querySelector('.lp-comp').textContent = d.comp;
    }

    onSlideChange(slideIdx) {
      this.slideIndex = Math.max(0, Math.min(SLIDE_MODES.length - 1, slideIdx));
      const mode = SLIDE_MODES[this.slideIndex];
      this.userInteracting = false;
      this.targetYaw = mode.targetYaw;
      this.targetPitch = mode.targetPitch;
      this.targetZoom = mode.targetZoom;

      if (this.simTitleEl) this.simTitleEl.textContent = mode.badge;
      if (this.simSubEl) this.simSubEl.textContent = mode.hint;

      if (mode.focusLayer !== null) {
        this.selectLayer(mode.focusLayer);
      } else {
        this.selectLayer(null);
      }
    }

    resizeIfNeeded() {
      const w = this.wrap.clientWidth;
      const h = this.wrap.clientHeight;
      if (w <= 0 || h <= 0) return false;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const pw = Math.round(w * dpr);
      const ph = Math.round(h * dpr);
      if (this.glCanvas.width !== pw || this.glCanvas.height !== ph) {
        this.glCanvas.width = pw;
        this.glCanvas.height = ph;
        this.hudCanvas.width = pw;
        this.hudCanvas.height = ph;
      }
      this.cssW = w;
      this.cssH = h;
      this.dpr = dpr;
      return true;
    }

    getLayerOffset(idx) {
      const v = LAYER_DATA[idx].explodeVec;
      const selBoost = this.selectedLayer === idx ? 0.14 : 0.0;
      const k = this.explodeAmount + selBoost;
      return [v[0] * k, v[1] * k, v[2] * k];
    }

    animate(now) {
      if (this.isDestroyed || this.isPaused) {
        this.rafId = null;
        return;
      }
      if (document.hidden || (this.cardEl && this.cardEl.offsetParent === null)) {
        this.isPaused = true;
        this.rafId = null;
        return;
      }
      const pageEl = this.cardEl ? this.cardEl.closest('.page') : null;
      if (pageEl && !pageEl.classList.contains('active')) {
        this.isPaused = true;
        this.rafId = null;
        return;
      }
      if (!this.resizeIfNeeded()) {
        this.isPaused = true;
        this.rafId = null;
        return;
      }
      this.rafId = requestAnimationFrame(this.animate);
      if (typeof now !== 'number') now = performance.now();
      const dt = Math.min(0.05, Math.max(0, (now - this.lastFrameTime) * 0.001));
      this.lastFrameTime = now;

      

      if (this.isPlaying) {
        this.simTime += dt;
        if (!this.userInteracting) {
          this.targetYaw = SLIDE_MODES[this.slideIndex].targetYaw + Math.sin(this.simTime * 0.45) * 0.12;
        }
      }

      this.yaw += (this.targetYaw - this.yaw) * 0.1;
      this.pitch += (this.targetPitch - this.pitch) * 0.1;
      this.zoom += (this.targetZoom - this.zoom) * 0.1;

      const targetExplode = this.isExploded ? 1.0 : 0.0;
      this.explodeAmount += (targetExplode - this.explodeAmount) * 0.1;

      const dist = 4.25 / this.zoom;
      if (!this._projMat) {
        this._projMat = new Float32Array(16);
        this._viewMat = new Float32Array(16);
        this._mvpMat = new Float32Array(16);
        this._eye = [0, 0, 0];
      }
      this._eye[0] = dist * Math.cos(this.pitch) * Math.sin(this.yaw);
      this._eye[1] = dist * Math.sin(this.pitch);
      this._eye[2] = dist * Math.cos(this.pitch) * Math.cos(this.yaw);
      const eye = this._eye;

      mat4Perspective(0.66, this.cssW / this.cssH, 0.1, 20.0, this._projMat);
      mat4LookAt(eye, [0, 0.03, 0], [0, 1, 0], this._viewMat);
      mat4Multiply(this._projMat, this._viewMat, this._mvpMat);
      const mvp = this._mvpMat;
      this.lastMVP = mvp;

      this.renderWebGL(mvp, eye);
      this.renderHUD(mvp, eye);
    }

    renderWebGL(mvp, eye) {
      const gl = this.gl;
      if (!gl) return;

      gl.viewport(0, 0, this.glCanvas.width, this.glCanvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.useProgram(this.prog);
      gl.uniformMatrix4fv(this.uniforms.uMVP, false, mvp);
      gl.uniform1f(this.uniforms.uTime, this.simTime);
      gl.uniform3fv(this.uniforms.uEye, eye);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.earthTex);
      gl.uniform1i(this.uniforms.uEarthTex, 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, this.materialTex);
      gl.uniform1i(this.uniforms.uMaterialTex, 1);

      for (let i = 0; i < this.meshes.length; i++) {
        const m = this.meshes[i];
        const off = this.getLayerOffset(i);
        const isSel = this.selectedLayer === i;
        const isDimmed = this.selectedLayer !== null && !isSel;

        gl.uniform3fv(this.uniforms.uOffset, off);
        gl.uniform1f(this.uniforms.uScale, 1.0);
        gl.uniform1i(this.uniforms.uLayerIndex, i);
        gl.uniform1f(this.uniforms.uHighlight, isSel ? 1.0 : 0.0);
        gl.uniform1f(this.uniforms.uDim, isDimmed ? 1.0 : 0.0);

        gl.bindBuffer(gl.ARRAY_BUFFER, m.posBuf);
        gl.enableVertexAttribArray(this.attribs.aPos);
        gl.vertexAttribPointer(this.attribs.aPos, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, m.normBuf);
        gl.enableVertexAttribArray(this.attribs.aNorm);
        gl.vertexAttribPointer(this.attribs.aNorm, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, m.uvBuf);
        gl.enableVertexAttribArray(this.attribs.aUV);
        gl.vertexAttribPointer(this.attribs.aUV, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, m.surfBuf);
        gl.enableVertexAttribArray(this.attribs.aSurfType);
        gl.vertexAttribPointer(this.attribs.aSurfType, 1, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, m.idxBuf);
        gl.drawElements(gl.TRIANGLES, m.count, gl.UNSIGNED_SHORT, 0);
      }
    }

    renderHUD(mvp, eye) {
      this.currentEye = eye;
      const ctx = this.ctx2d;
      const w = this.cssW;
      const h = this.cssH;
      ctx.save();
      ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Hitung seberapa menghadap kamera ke kuadran irisan (+X, +Z)
      const eyeLen = Math.hypot(eye[0], eye[1], eye[2]) || 1;
      const cutDot = (eye[0] * 0.68 + eye[1] * 0.08 + eye[2] * 0.73) / eyeLen;
      const minCut = this.isExploded ? -0.22 : -0.02;
      const maxCut = this.isExploded ? 0.14 : 0.34;
      const interiorAlpha = Math.max(0.0, Math.min(1.0, (cutDot - minCut) / (maxCut - minCut)));

      const mode = SLIDE_MODES[this.slideIndex].id;

      // 1. Visualisasi Spesifik Slide di Ruang 3D
      if (interiorAlpha > 0.02 || mode === 'geodynamo') {
        ctx.save();
        ctx.globalAlpha = mode === 'geodynamo' ? 1.0 : interiorAlpha;
        if (mode === 'seismik') {
          this.drawSeismicWaves3D(ctx, mvp, w, h);
        } else if (mode === 'diskontinuitas') {
          this.drawDiscontinuityRings3D(ctx, mvp, w, h);
        } else if (mode === 'kerak') {
          this.drawCrustComparison3D(ctx, mvp, w, h, eye);
        } else if (mode === 'konveksi') {
          this.drawMantleConvection3D(ctx, mvp, w, h);
        } else if (mode === 'geodynamo') {
          this.drawGeodynamoField3D(ctx, mvp, w, h);
        }
        ctx.restore();
      }

      // 2. Pin Label Anatomi 3D
      this.drawLayerLabels3D(ctx, mvp, w, h, interiorAlpha, eye);

      ctx.restore();
    }

    // Slide 1: Penjalaran Gelombang P (menembus inti) & Gelombang S (terhenti di 2.900 km)
    drawSeismicWaves3D(ctx, mvp, w, h) {
      const epic = [0.0, 0.98, 0.0];
      const pEpic = projectPoint3D(epic, mvp, w, h);
      if (pEpic) {
        const pulse = (this.simTime * 1.6) % 1.0;
        ctx.strokeStyle = `rgba(255, 90, 54, ${1 - pulse})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(pEpic.x, pEpic.y, 6 + pulse * 22, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#ff5a36';
        ctx.beginPath();
        ctx.arc(pEpic.x, pEpic.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      const pPaths = [
        [[0, 0.96, 0], [0.22, 0.52, 0], [0.16, 0.05, 0], [0.12, -0.42, 0], [0.18, -0.94, 0]],
        [[0, 0.96, 0], [0, 0.55, 0.24], [0, 0.05, 0.18], [0, -0.42, 0.14], [0, -0.94, 0.20]],
        [[0, 0.96, 0], [0.42, 0.62, 0], [0.68, 0.12, 0], [0.85, -0.45, 0]]
      ];

      pPaths.forEach((pts, idx) => {
        this.drawAnimatedRay3D(ctx, mvp, w, h, pts, '#38bdf8', 2.2, (this.simTime * 0.65 + idx * 0.25) % 1.0);
      });

      const sPaths = [
        [[0, 0.96, 0], [0.26, 0.65, 0], [0.35, 0.28, 0]],
        [[0, 0.96, 0], [0, 0.65, 0.26], [0, 0.28, 0.35]]
      ];
      sPaths.forEach((pts, idx) => {
        this.drawAnimatedRay3D(ctx, mvp, w, h, pts, '#f7c948', 2.2, (this.simTime * 0.65 + idx * 0.3) % 1.0);
        const stopPt = projectPoint3D(pts[pts.length - 1], mvp, w, h);
        if (stopPt) {
          ctx.fillStyle = '#ffffff';
          ctx.font = '400 10.5px "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
          ctx.fillText('✕ S Terhenti (Cair)', stopPt.x + 6, stopPt.y + 4);
        }
      });

      const shadowAnchor = projectPoint3D([0.35, -0.88, 0.35], mvp, w, h);
      if (shadowAnchor) {
        this.drawPillTag(ctx, shadowAnchor.x, shadowAnchor.y, '🌑 Zona Bayangan (Shadow Zone 103°–142°)', 'rgba(14,42,58,0.9)', '#38bdf8');
      }
    }

    // Slide 2: Bidang Diskontinuitas Mohorovičić, Gutenberg & Lehmann
    drawDiscontinuityRings3D(ctx, mvp, w, h) {
      const rings = [
        { r: 0.925, color: '#38bdf8', label: 'Moho (~35 km)' },
        { r: 0.452, color: '#f7c948', label: 'Gutenberg (2.900 km)' },
        { r: 0.225, color: '#ff922b', label: 'Lehmann (5.150 km)' }
      ];

      rings.forEach((rg, idx) => {
        ctx.strokeStyle = rg.color;
        ctx.lineWidth = 2.2;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        let started = false;
        for (let i = 0; i <= 28; i++) {
          const theta = (i / 28) * Math.PI;
          const x = rg.r * Math.sin(theta);
          const y = rg.r * Math.cos(theta);
          const p = projectPoint3D([x, y, 0], mvp, w, h);
          if (p) {
            if (!started) { ctx.moveTo(p.x, p.y); started = true; }
            else ctx.lineTo(p.x, p.y);
          }
        }
        ctx.stroke();
        ctx.setLineDash([]);

        const ang = 0.65 + idx * 0.42;
        const lblPt = projectPoint3D([rg.r * Math.sin(ang), rg.r * Math.cos(ang), 0], mvp, w, h);
        if (lblPt) {
          this.drawPillTag(ctx, lblPt.x, lblPt.y, rg.label, 'rgba(9,27,38,0.9)', rg.color);
        }
      });
    }

    // Slide 3: Perbandingan Kerak Benua (SiAl) vs Kerak Samudra (SiMa)
    drawCrustComparison3D(ctx, mvp, w, h, eye) {
      const off = this.getLayerOffset(4);
      const cPos = [0.72 + off[0], 0.68 + off[1], 0.0 + off[2]];
      const oPos = [0.0 + off[0], 0.62 + off[1], 0.76 + off[2]];
      const ptCont = projectPoint3D(cPos, mvp, w, h);
      const ptOcean = projectPoint3D(oPos, mvp, w, h);
      const eyeLen = eye ? (Math.hypot(eye[0], eye[1], eye[2]) || 1) : 1;

      if (ptCont && eye) {
        const dotC = (eye[0] * 0.68 + eye[1] * 0.52 + eye[2] * 0.25) / eyeLen;
        const alphaC = Math.max(0.0, Math.min(1.0, (dotC - 0.04) / 0.28));
        if (alphaC > 0.05) {
          ctx.save();
          ctx.globalAlpha *= alphaC;
          this.drawPillTag(ctx, ptCont.x, ptCont.y - 16, '🏔️ Kerak Benua: 30–70 km (SiAl · 2,7 g/cm³)', 'rgba(14,42,58,0.92)', '#f7c948');
          ctx.restore();
        }
      }
      if (ptOcean && eye) {
        const dotO = (eye[0] * 0.25 + eye[1] * 0.52 + eye[2] * 0.68) / eyeLen;
        const alphaO = Math.max(0.0, Math.min(1.0, (dotO - 0.04) / 0.28));
        if (alphaO > 0.05) {
          ctx.save();
          ctx.globalAlpha *= alphaO;
          this.drawPillTag(ctx, ptOcean.x, ptOcean.y + 18, '🌊 Kerak Samudra: 5–10 km (SiMa · 3,0 g/cm³)', 'rgba(14,42,58,0.92)', '#38bdf8');
          ctx.restore();
        }
      }
    }

    // Slide 4: Sel Arus Konveksi Termal di Mantel
    drawMantleConvection3D(ctx, mvp, w, h) {
      const off = this.getLayerOffset(3);
      const cells = [
        { thetaCenter: 0.85, plane: 'XY' },
        { thetaCenter: 2.25, plane: 'XY' },
        { thetaCenter: 1.05, plane: 'YZ' },
        { thetaCenter: 2.15, plane: 'YZ' }
      ];

      cells.forEach((cell, cIdx) => {
        const steps = 20;
        const rMid = 0.66;
        const rSpan = 0.16;
        const tSpan = 0.36;

        for (let pass = 0; pass < 2; pass++) {
          ctx.beginPath();
          for (let i = 0; i <= steps; i++) {
            const a = (i / steps) * Math.PI * 2 + this.simTime * 1.8 * (cIdx % 2 === 0 ? 1 : -1);
            const r = rMid + Math.sin(a) * rSpan;
            const th = cell.thetaCenter + Math.cos(a) * tSpan;
            const x = cell.plane === 'XY' ? r * Math.sin(th) + off[0] : off[0];
            const y = r * Math.cos(th) + off[1];
            const z = cell.plane === 'YZ' ? r * Math.sin(th) + off[2] : off[2];
            const p = projectPoint3D([x, y, z], mvp, w, h);
            if (p) {
              if (i === 0) ctx.moveTo(p.x, p.y);
              else ctx.lineTo(p.x, p.y);
            }
          }
          ctx.strokeStyle = pass === 0 ? 'rgba(255, 200, 72, 0.78)' : 'rgba(228, 87, 46, 0.45)';
          ctx.lineWidth = pass === 0 ? 2.2 : 5.0;
          ctx.stroke();
        }

        for (let k = 0; k < 3; k++) {
          const a = this.simTime * 2.1 + (k * Math.PI * 2) / 3;
          const r = rMid + Math.sin(a) * rSpan;
          const th = cell.thetaCenter + Math.cos(a) * tSpan;
          const x = cell.plane === 'XY' ? r * Math.sin(th) + off[0] : off[0];
          const y = r * Math.cos(th) + off[1];
          const z = cell.plane === 'YZ' ? r * Math.sin(th) + off[2] : off[2];
          const p = projectPoint3D([x, y, z], mvp, w, h);
          if (p) {
            ctx.fillStyle = Math.sin(a) > 0 ? '#fff3b0' : '#ff6b35';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });
    }

    // Slide 5: Garis Medan Magnet Bumi (Geodynamo Magnetosphere) di Ruang 3D
    drawGeodynamoField3D(ctx, mvp, w, h) {
      const azimuths = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5, Math.PI * 0.25, Math.PI * 1.25];
      azimuths.forEach((phi, idx) => {
        ctx.beginPath();
        const steps = 36;
        for (let i = 0; i <= steps; i++) {
          const theta = 0.18 + (i / steps) * (Math.PI - 0.36);
          const sinT = Math.sin(theta);
          const r = 1.48 * sinT * sinT + 0.18;
          const x = r * sinT * Math.cos(phi + this.simTime * 0.25);
          const y = r * Math.cos(theta);
          const z = r * sinT * Math.sin(phi + this.simTime * 0.25);
          const p = projectPoint3D([x, y, z], mvp, w, h);
          if (p) {
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
        }
        ctx.strokeStyle = 'rgba(78, 168, 222, 0.62)';
        ctx.lineWidth = 1.8;
        ctx.stroke();

        const t = ((this.simTime * 0.55 + idx * 0.17) % 1.0);
        const thetaP = (1.0 - t) * (Math.PI - 0.36) + 0.18;
        const sinTP = Math.sin(thetaP);
        const rP = 1.48 * sinTP * sinTP + 0.18;
        const pFlux = projectPoint3D([
          rP * sinTP * Math.cos(phi + this.simTime * 0.25),
          rP * Math.cos(thetaP),
          rP * sinTP * Math.sin(phi + this.simTime * 0.25)
        ], mvp, w, h);
        if (pFlux) {
          ctx.fillStyle = '#72efdd';
          ctx.beginPath();
          ctx.arc(pFlux.x, pFlux.y, 3.6, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }

    drawAnimatedRay3D(ctx, mvp, w, h, pts3D, color, width, progress) {
      const screenPts = pts3D.map(p => projectPoint3D(p, mvp, w, h)).filter(Boolean);
      if (screenPts.length < 2) return;

      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.beginPath();
      screenPts.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();

      const pNorm = Number.isFinite(progress) ? ((progress % 1) + 1) % 1 : 0;
      const totalSegs = screenPts.length - 1;
      const segFloat = pNorm * totalSegs;
      const segIdx = Math.max(0, Math.min(totalSegs - 1, Math.floor(segFloat)));
      const frac = segFloat - segIdx;
      const a = screenPts[segIdx];
      const b = screenPts[segIdx + 1];
      if (!a || !b) return;
      const wx = a.x + (b.x - a.x) * frac;
      const wy = a.y + (b.y - a.y) * frac;

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(wx, wy, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    drawLayerLabels3D(ctx, mvp, w, h, interiorAlpha, eye) {
      const anchorLocal = [
        [0.0, 0.0, 0.0],          // Inti Dalam
        [0.24, -0.22, 0.12],      // Inti Luar
        [0.44, 0.36, 0.0],        // Mesosfer
        [0.0, 0.56, 0.62],        // Astenosfer
        [-0.58, 0.72, 0.38]       // Litosfer & Kerak
      ];

      const eyeLen = eye ? (Math.hypot(eye[0], eye[1], eye[2]) || 1) : 1;
      const dot4 = eye ? ((-0.58 * eye[0] + 0.72 * eye[1] + 0.38 * eye[2]) / eyeLen) : 1.0;
      const minOuter = this.isExploded ? -0.15 : 0.04;
      const maxOuter = this.isExploded ? 0.18 : 0.32;
      const outerAlpha = Math.max(0.0, Math.min(1.0, (dot4 - minOuter) / (maxOuter - minOuter)));

      this.lastScreenAnchors = anchorLocal.map((pt, i) => {
        const pinAlpha = i < 4 ? interiorAlpha : outerAlpha;
        if (pinAlpha < 0.05) return null;
        const off = this.getLayerOffset(i);
        return projectPoint3D([pt[0] + off[0], pt[1] + off[1], pt[2] + off[2]], mvp, w, h);
      });

      if (!this.showLabels) return;

      this.lastScreenAnchors.forEach((sp, i) => {
        if (!sp) return;
        const pinAlpha = i < 4 ? interiorAlpha : outerAlpha;
        if (pinAlpha < 0.05) return;

        ctx.save();
        ctx.globalAlpha = pinAlpha;
        const d = LAYER_DATA[i];
        const isSel = this.selectedLayer === i;

        ctx.fillStyle = d.accent;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, isSel ? 5.8 : 4.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#171721';
        ctx.lineWidth = 1.6;
        ctx.stroke();

        const shortName = d.name.split(' (')[0];
        this.drawPillTag(
          ctx,
          sp.x,
          sp.y - 16,
          shortName,
          isSel ? '#5266eb' : 'rgba(23, 23, 33, 0.88)',
          d.accent
        );
        ctx.restore();
      });
    }

    drawPillTag(ctx, x, y, text, bg, dotColor) {
      ctx.font = '400 11.5px "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
      const padX = 9;
      const dotSpace = 12;
      const tw = ctx.measureText(text).width;
      const bw = tw + padX * 2 + dotSpace;
      const bh = 22;
      const bx = Math.max(6, Math.min(this.cssW - bw - 6, x - bw / 2));
      const by = Math.max(44, Math.min(this.cssH - 80, y - bh / 2));

      const isActive = bg === '#5266eb' || bg === '#e4572e';
      ctx.fillStyle = isActive ? '#5266eb' : 'rgba(23, 23, 33, 0.88)';
      ctx.beginPath();
      ctx.roundRect(bx, by, bw, bh, 99);
      ctx.fill();
      ctx.strokeStyle = isActive ? 'rgba(255, 255, 255, 0.45)' : 'rgba(226, 227, 237, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = dotColor || '#5266eb';
      ctx.beginPath();
      ctx.arc(bx + padX + 3.5, by + bh / 2, 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, bx + padX + dotSpace, by + bh / 2 + 0.5);
    }
  
    resize() {
      if (!this.isDestroyed && typeof this.resizeIfNeeded === 'function') {
        return this.resizeIfNeeded();
      }
    }

    resume() {
      if (this.isDestroyed) return;
      if (this.isPaused || !this.rafId) {
        this.isPaused = false;
        this.lastFrameTime = performance.now();
        this.rafId = requestAnimationFrame(this.animate);
      }
    }

    pause() {
      this.isPaused = true;
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
    }

    destroy() {
      this.isDestroyed = true;
      this.isPaused = true;
      if (this._cleanups && Array.isArray(this._cleanups)) {
        this._cleanups.forEach(fn => { try { fn(); } catch (e) {} });
        this._cleanups = null;
      }
      if (this._io) {
        try { this._io.disconnect(); } catch (e) {}
        this._io = null;
      }
      if (typeof pendingViewers !== 'undefined' && Array.isArray(pendingViewers)) {
        const idx = pendingViewers.indexOf(this);
        if (idx !== -1) pendingViewers.splice(idx, 1);
      }
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
      if (this.gl) {
        try {
          if (this.prog) {
            this.gl.deleteProgram(this.prog);
            this.prog = null;
          }
          if (this.earthTex) {
            this.gl.deleteTexture(this.earthTex);
            this.earthTex = null;
          }
          if (this.materialTex) {
            this.gl.deleteTexture(this.materialTex);
            this.materialTex = null;
          }
          if (this.meshes) {
            this.meshes.forEach(m => {
              if (m.posBuf) this.gl.deleteBuffer(m.posBuf);
              if (m.normBuf) this.gl.deleteBuffer(m.normBuf);
              if (m.uvBuf) this.gl.deleteBuffer(m.uvBuf);
              if (m.surfBuf) this.gl.deleteBuffer(m.surfBuf);
              if (m.idxBuf) this.gl.deleteBuffer(m.idxBuf);
            });
            this.meshes = null;
          }
        } catch (e) {}
      }
      if (this.glCanvas) {
        this.glCanvas.width = 1;
        this.glCanvas.height = 1;
      }
      if (this.hudCanvas) {
        this.hudCanvas.width = 1;
        this.hudCanvas.height = 1;
      }
      if (this.wrap && this.wrap.parentNode) {
        this.wrap.parentNode.removeChild(this.wrap);
      }
    }

}