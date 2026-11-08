const fs = require('fs');

function modularize(srcPath, destPath, className, defaultPageId) {
  let content = fs.readFileSync(srcPath, 'utf8');

  // 1. Remove leading (function () {
  content = content.replace(/\(function\s*\(\)\s*\{/, '/* ES Module Export */');

  // 2. Export class
  content = content.replace(new RegExp(`class\\s+${className}\\s*\\{`), `export class ${className} {`);

  // 3. Cut off at the init function
  const initIdx = content.search(/\n\s*function\s+init/);
  if (initIdx !== -1) {
    content = content.slice(0, initIdx);
  }

  // 4. Update asset URLs
  content = content.replace(/assets\/images\//g, '/assets/images/');
  content = content.replace(/assets\/models\//g, '/assets/models/');

  // 5. Geometry caching per file
  if (className === 'Earth3DViewer') {
    content = content.replace(
      'function createShellGeometry(rInner, rOuter, cutaway) {',
      `const _shellGeomCache = new Map();
  function _uncachedCreateShellGeometry(rInner, rOuter, cutaway) {`
    );
    // Find the end of _uncachedCreateShellGeometry
    const returnGeomIdx = content.indexOf('return {\n      positions: new Float32Array(positions),', 300);
    if (returnGeomIdx !== -1) {
      const endOfFn = content.indexOf('};', returnGeomIdx);
      if (endOfFn !== -1) {
        const insertPos = endOfFn + 2;
        const cacheWrapper = `
  }
  function createShellGeometry(rInner, rOuter, cutaway) {
    const key = rInner + '_' + rOuter + '_' + cutaway;
    if (_shellGeomCache.has(key)) return _shellGeomCache.get(key);
    const g = _uncachedCreateShellGeometry(rInner, rOuter, cutaway);
    _shellGeomCache.set(key, g);
    return g;
`;
        content = content.slice(0, insertPos) + cacheWrapper + content.slice(insertPos);
      }
    }

    // Protect texture loading in Earth3DViewer against destroyed instances
    content = content.replace(
      /while\s*\(\s*pendingViewers\.length\s*>\s*0\s*\)\s*\{\s*const v = pendingViewers\.shift\(\);\s*v\.uploadEarthTextures\(sharedAlbedoCanvas, sharedMaterialCanvas\);\s*\}/,
      `while (pendingViewers.length > 0) {
      const v = pendingViewers.shift();
      if (v && !v.isDestroyed && v.gl && v.earthTex && v.materialTex) {
        v.uploadEarthTextures(sharedAlbedoCanvas, sharedMaterialCanvas);
      }
    }`
    );

    content = content.replace(
      'function requestEarthTextures(viewer) {',
      `function requestEarthTextures(viewer) {
    if (!viewer || viewer.isDestroyed) return;`
    );

    content = content.replace(
      'uploadEarthTextures(albCanvas, matCanvas) {\n      const gl = this.gl;\n      if (!gl) return;',
      `uploadEarthTextures(albCanvas, matCanvas) {
      if (this.isDestroyed || !this.gl || !this.earthTex || !this.materialTex) return;
      const gl = this.gl;
      if (!gl.isTexture(this.earthTex) || !gl.isTexture(this.materialTex)) return;`
    );
  } else if (className === 'Tectonic3DViewer') {
    content = content.replace(
      'function buildAllTectonicMeshes() {',
      `let _cachedTectonicMeshes = null;
  function _uncachedBuildAllTectonicMeshes() {`
    );
    const targetEnd = 'return [meshAstheno, meshOceanic, meshContinental, meshMagma, meshOceanWater];\n  }';
    const endIdx = content.indexOf(targetEnd);
    if (endIdx !== -1) {
      const insertPos = endIdx + targetEnd.length;
      const cacheWrapper = `
  function buildAllTectonicMeshes() {
    if (_cachedTectonicMeshes) return _cachedTectonicMeshes;
    _cachedTectonicMeshes = _uncachedBuildAllTectonicMeshes();
    return _cachedTectonicMeshes;
  }
`;
      content = content.slice(0, insertPos) + cacheWrapper + content.slice(insertPos);
    }
  } else if (className === 'Volcano3DViewer') {
    content = content.replace(
      'function buildAllSemeruMeshes() {',
      `let _cachedSemeruMeshes = null;
  function _uncachedBuildAllSemeruMeshes() {`
    );
    const targetEnd = 'return [meshBaseCrust, meshSemeruCone, meshBatholith, meshIntrusions, meshConduitAndLava];\n  }';
    const endIdx = content.indexOf(targetEnd);
    if (endIdx !== -1) {
      const insertPos = endIdx + targetEnd.length;
      const cacheWrapper = `
  function buildAllSemeruMeshes() {
    if (_cachedSemeruMeshes) return _cachedSemeruMeshes;
    _cachedSemeruMeshes = _uncachedBuildAllSemeruMeshes();
    return _cachedSemeruMeshes;
  }
`;
      content = content.slice(0, insertPos) + cacheWrapper + content.slice(insertPos);
    }
  } else if (className === 'Endogen3DViewer') {
    content = content.replace(
      'function buildAllEndogenMeshes() {',
      `let _cachedEndogenMeshes = null;
  function _uncachedBuildAllEndogenMeshes() {`
    );
    const targetEnd = 'return [b0.build(), b1.build(), b2.build(), b3.build(), b4.build()];\n  }';
    const endIdx = content.indexOf(targetEnd);
    if (endIdx !== -1) {
      const insertPos = endIdx + targetEnd.length;
      const cacheWrapper = `
  function buildAllEndogenMeshes() {
    if (_cachedEndogenMeshes) return _cachedEndogenMeshes;
    _cachedEndogenMeshes = _uncachedBuildAllEndogenMeshes();
    return _cachedEndogenMeshes;
  }
`;
      content = content.slice(0, insertPos) + cacheWrapper + content.slice(insertPos);
    }
  }

  // 6. Trim trailing whitespace and inject clean lifecycle methods before the final }
  content = content.trimEnd();
  const lastBrace = content.lastIndexOf('}');
  if (lastBrace !== -1) {
    const lifecycleMethods = `
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
`;
    content = content.slice(0, lastBrace) + lifecycleMethods + '\n}';
  }

  // 7. Fix constructor: assign rafId cleanly, setup visibility observer and cleanups
  content = content.replace(
    /this\.animate\s*=\s*this\.animate\.bind\(this\);\s*requestAnimationFrame\(this\.animate\);/,
    `this.animate = this.animate.bind(this);
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
      this.resume();`
  );

  // 8. Fix animate to check isDestroyed, visibility, active page, and only schedule rafId when active
  content = content.replace(
    /const pageEl = this\.cardEl\.closest\('\.page'\);\s*if \(pageEl && !pageEl\.classList\.contains\('active'\)\) return;\s*if \(!this\.resizeIfNeeded\(\)\) return;/g,
    ''
  );

  content = content.replace(
    /animate\(\)\s*\{/,
    `animate() {
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
      }`
  );

  content = content.replace(
    /animate\(now\)\s*\{/,
    `animate(now) {
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
      }`
  );

  content = content.replace(
    /(?<!this\.rafId\s*=\s*)requestAnimationFrame\(this\.animate\);/g,
    'this.rafId = requestAnimationFrame(this.animate);'
  );

  // 9. Protect any async Image onload from executing on destroyed WebGL context
  content = content.replace(
    /img\.onload\s*=\s*\(\)\s*=>\s*\{/g,
    'img.onload = () => {\n          if (this.isDestroyed || !this.gl || !this.earthTex || !this.gl.isTexture(this.earthTex)) return;'
  );

  fs.writeFileSync(destPath, content, 'utf8');
  console.log('Successfully optimized & regenerated:', destPath);
}

modularize('assets/js/earth-3d.js', 'src/engines/earth/Earth3DViewer.js', 'Earth3DViewer', 'struktur');
modularize('assets/js/tectonic-3d.js', 'src/engines/tectonic/Tectonic3DViewer.js', 'Tectonic3DViewer', 'lempeng');
modularize('assets/js/volcano-3d.js', 'src/engines/volcano/Volcano3DViewer.js', 'Volcano3DViewer', 'vulkanisme');
modularize('assets/js/endogen-3d.js', 'src/engines/endogen/Endogen3DViewer.js', 'Endogen3DViewer', 'endogen');
