/* ==========================================================================
   MODUL 3: 3D INTERAKTIF VULKANISME — ANATOMI GUNUNG SEMERU (3.676 mdpl)
   Mendukung:
   - Morfologi 3D Realistis Gunung Semeru (Puncak Mahameru, Kawah Jonggring Saloko,
     Aliran Curah/Besuk Kobokan, Lembah Ranu Kumbolo, Sabuk Hutan Cemara & Batas
     Vegetasi Arcopodo) dengan Potongan Penampang Kuadran 90° (Cutaway)
   - Sistem Perpipaan Magma & Plutonisme Lengkap (Batolit, Dapur Magma, Diatrema,
     Lakolit, Sill, Dike/Korok, Apolisa, Kerucut Samping & Aliran Lava)
   - Rotasi Orbit 3D 360° (Mouse Drag & Touch) + Zoom
   - Exploded View 3D ("Pisahkan" anatomi vulkanik Semeru)
   - Animasi Tersinkronisasi Otomatis dengan 7 Slide Modul 3:
     * Slide 1: Anatomi Gunung Semeru (Mahameru, Jonggring Saloko, Diatrema & Dapur Magma)
     * Slide 2: Bentukan Intrusi Magma / Plutonisme (Batolit, Lakolit, Sill, Dike, Apolisa)
     * Slide 3: Material Erupsi (Gas Fumarol, Lava/Lahar Besuk Kobokan & Tefra Bom/Lapili/Abu)
     * Slide 4: Tipe Efusif vs Guguran Kubah Lava & Awan Panas (Wedhus Gembel Curah Kobokan)
     * Slide 5: Tipe Letusan Plinian (Tiang Stratosfer) & St. Vincent (Lahar Kawah)
     * Slide 6: Tipe Letusan Vulkano (Asap Kembang Kol Jonggring Saloko) & Tipe Pelee
     * Slide 7: Zona Pembentukan Batuan Beku (Granit, Andesit, Batu Apung) & Tanah Andosol
   ========================================================================== */
/* ES Module Export */
  const PART_DATA = [
    {
      id: 'kerak-dasar',
      index: 0,
      name: 'Batuan Dasar & Stratigrafi Kerak Jawa',
      depth: '1.500 – 8.000 m di bawah permukaan',
      temp: '± 150 – 650 °C',
      state: 'Padat Berlapis (Sedimen Tersier & Vulkanik Tua)',
      comp: 'Batu Gamping, Breksi Vulkanik Tua & Batuan Dasar Kompleks Tengger–Jambangan',
      density: '~2,65 – 2,80 g/cm³',
      accent: '#8d99ae',
      explodeVec: [-0.18, -0.26, -0.18]
    },
    {
      id: 'kerucut-semeru',
      index: 1,
      name: 'Kerucut Stratovolcano Gunung Semeru (Mahameru)',
      depth: 'Puncak 3.676 mdpl · Batas Vegetasi Arcopodo ~2.900 mdpl',
      temp: '8 – 24 °C (Permukaan) · >400 °C (Kawah)',
      state: 'Kerucut Berlapis (Perselingan Lava Andesit & Piroklastik Tefra)',
      comp: 'Andesit-Basaltik, Endapan Piroklastik, Pasir Vulkanik Puncak & Tanah Andosol Lereng',
      density: '~2,40 – 2,75 g/cm³',
      accent: '#52b788',
      explodeVec: [-0.22, 0.22, -0.22]
    },
    {
      id: 'dapur-magma',
      index: 2,
      name: 'Batolit & Dapur Magma Utama Semeru',
      depth: '4 – 12 km di bawah kawah',
      temp: '± 1.050 – 1.250 °C',
      state: 'Lelehan Silikat Pijar Kaya Gas (Reservoir Magma)',
      comp: 'Magma Andesitik–Basaltik Hasil Flux Melting Zona Subduksi Jawa',
      density: '~2,55 – 2,70 g/cm³',
      accent: '#ff5a36',
      explodeVec: [0.0, -0.34, 0.0]
    },
    {
      id: 'intrusi-plutonik',
      index: 3,
      name: 'Intrusi Plutonik (Lakolit, Sill, Dike & Apolisa)',
      depth: '1 – 5 km di dalam lapisan kerak',
      temp: '± 750 – 1.050 °C',
      state: 'Membeku Lambat di Bawah Permukaan (Plutonisme)',
      comp: 'Lakolit (Kubah), Sill (Mendatar), Dike/Korok (Memotong Lapisan) & Urat Apolisa',
      density: '~2,68 – 2,85 g/cm³',
      accent: '#ff922b',
      explodeVec: [0.28, -0.06, 0.28]
    },
    {
      id: 'diatrema-kawah',
      index: 4,
      name: 'Diatrema, Kawah Jonggring Saloko & Aliran Curah Kobokan',
      depth: '0 – 4 km (Pipa Kepundan Utama & Kubah Lava)',
      temp: '± 850 – 1.150 °C',
      state: 'Saluran Aktif Erupsi Vulkano, Kubah Lava & Awan Panas Guguran (APG)',
      comp: 'Magma Andesitik Kental, Kubah Lava Jonggring Saloko & Guguran Lava Besuk Kobokan',
      density: '~2,50 – 2,68 g/cm³',
      accent: '#f7c948',
      explodeVec: [0.24, 0.28, 0.24]
    }
  ];

  const SLIDE_MODES = [
    {
      id: 'anatomi',
      modeInt: 0,
      badge: '🌋 Anatomi Gunung Semeru (Mahameru 3.676 mdpl)',
      hint: 'Irisan 3D Puncak Mahameru, Kawah Jonggring Saloko, Pipa Diatrema & Dapur Magma.',
      targetYaw: 0.72,
      targetPitch: 0.28,
      targetZoom: 1.04,
      focusPart: null
    },
    {
      id: 'intrusi',
      modeInt: 1,
      badge: '🍄 Bentukan Intrusi Magma (Plutonisme Bawah Permukaan)',
      hint: 'Injeksi magma ke celah batuan: Batolit, Lakolit (kubah), Sill (mendatar), Dike (korok) & Apolisa.',
      targetYaw: 0.82,
      targetPitch: 0.20,
      targetZoom: 1.08,
      focusPart: null
    },
    {
      id: 'material',
      modeInt: 2,
      badge: '🪨 Material Erupsi: Gas Fumarol, Lava & Tefra Padat',
      hint: 'Semburan gas Jonggring Saloko, lontaran Bom (>64mm) & Lapili, serta aliran lava Besuk Kobokan.',
      targetYaw: 0.65,
      targetPitch: 0.30,
      targetZoom: 1.0,
      focusPart: null
    },
    {
      id: 'efusif_merapi',
      modeInt: 3,
      badge: '🟡 Kubah Lava & Awan Panas Guguran (Curah Kobokan)',
      hint: 'Runtuhnya kubah lava kawah Jonggring Saloko memicu luncuran awan panas (wedhus gembel) ke lereng.',
      targetYaw: 0.52,
      targetPitch: 0.34,
      targetZoom: 1.04,
      focusPart: null
    },
    {
      id: 'plinian',
      modeInt: 4,
      badge: '🔴 Letusan Katastrofik Plinian & Banjir Lahar St. Vincent',
      hint: 'Tiang erupsi vertikal raksasa menembus stratosfer (Tambora/Krakatau) & luapan lahar kawah.',
      targetYaw: 0.68,
      targetPitch: 0.22,
      targetZoom: 0.92,
      focusPart: null
    },
    {
      id: 'vulkano_pelee',
      modeInt: 5,
      badge: '☁️ Letusan Tipe Vulkano (Semeru/Bromo) & Tipe Pelee',
      hint: 'Letusan ritmik tiang abu kembang kol khas Kawah Jonggring Saloko Semeru & hembusan lateral Pelee.',
      targetYaw: 0.62,
      targetPitch: 0.28,
      targetZoom: 1.02,
      focusPart: null
    },
    {
      id: 'batuan_manfaat',
      modeInt: 6,
      badge: '🏛️ Zona Batuan Beku (Granit, Andesit, Apung) & Andosol',
      hint: 'Granit membeku lambat di Batolit, Porfiri di Korok/Dike, Andesit & Batu Apung di lereng Semeru.',
      targetYaw: 0.76,
      targetPitch: 0.26,
      targetZoom: 1.05,
      focusPart: null
    }
  ];

  // Matematika Matriks 3D (Mendukung buffer 'out' untuk Zero-Allocation)
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

  // Fungsi Profil Morfologi Otentik Gunung Semeru:
  // - Puncak Mahameru (3.676 mdpl) di sisi barat laut kawah
  // - Kawah Aktif Jonggring Saloko di sisi tenggara puncak yang membuka ke Curah Kobokan
  // - Lembah Danau Ranu Kumbolo (2.400 mdpl), Kalimati, Arcopodo & Kerucut Samping (Parasitic Cone)
  function evalSemeruHeight(r, phi) {
    const rNorm = Math.min(1.0, r / 1.22);
    // Profil cekung-eksponensial khas stratovolcano Semeru (lereng atas curam ~34°, kaki landai)
    let h = 0.80 * Math.pow(1.0 - rNorm, 1.52);

    const x = r * Math.cos(phi);
    const z = r * Math.sin(phi);

    // 1. Punggung & Puncak Sejati Mahameru (3.676 mdpl) di utara-barat laut kawah (x ~ -0.075, z ~ -0.065)
    const dMahameru = Math.hypot(x + 0.075, z + 0.065);
    const mahameruPeak = 0.115 * Math.exp(-(dMahameru * dMahameru) / 0.022);
    h += mahameruPeak;

    // 2. Kawah Aktif Jonggring Saloko (berpusat di x ~ 0.01, z ~ 0.01, bukaan ke tenggara phi ~ 1.85)
    const dCrater = Math.hypot(x - 0.01, z - 0.01);
    if (dCrater < 0.165) {
      const craterBowl = 0.145 * Math.cos((dCrater / 0.165) * Math.PI * 0.5);
      h -= craterBowl;
    }

    // 3. Lembah Bukaan Kawah & Alur Lahar Curah / Besuk Kobokan (phi ~ 1.85 rad)
    const dPhiKobokan = Math.atan2(Math.sin(phi - 1.85), Math.cos(phi - 1.85));
    const kobokanWidth = 0.18 + 0.08 * rNorm;
    const kobokanChute =
      Math.exp(-Math.pow(dPhiKobokan / kobokanWidth, 2.0)) *
      Math.sin(Math.min(1.0, r / 1.12) * Math.PI) *
      0.095;
    h -= kobokanChute;
    // Tanggul alam piroklastik (levee) di sisi kiri-kanan alur Curah Kobokan
    const kobokanLevee =
      Math.exp(-Math.pow((Math.abs(dPhiKobokan) - kobokanWidth * 1.15) / 0.09, 2.0)) *
      Math.sin(Math.min(1.0, r / 0.95) * Math.PI) *
      0.024;
    h += kobokanLevee;

    // 4. Alur-alur lembah lahar sekunder (Besuk Kembar, Besuk Bang, Besuk Sat) & igir radial (barrancos)
    const besukKembar = Math.exp(-Math.pow(Math.atan2(Math.sin(phi - 2.35), Math.cos(phi - 2.35)) / 0.14, 2.0)) * 0.042 * Math.sin(rNorm * Math.PI);
    const besukBang   = Math.exp(-Math.pow(Math.atan2(Math.sin(phi - 2.82), Math.cos(phi - 2.82)) / 0.14, 2.0)) * 0.036 * Math.sin(rNorm * Math.PI);
    h -= (besukKembar + besukBang);

    const radialBarrancos =
      (Math.sin(phi * 16.0 + r * 3.0) * 0.48 +
       Math.cos(phi * 27.0 - r * 4.0) * 0.34 +
       Math.sin(phi * 39.0) * 0.18) *
      0.022 *
      Math.pow(Math.sin(rNorm * Math.PI), 1.2);
    h += radialBarrancos;

    // 5. Cekungan Tekto-Vulkanik Danau Ranu Kumbolo (2.400 mdpl) di bahu utara-barat laut (x ~ -0.58, z ~ -0.48)
    const dKumbolo = Math.hypot(x + 0.58, z + 0.48);
    if (dKumbolo < 0.19) {
      const lakeBowl = 0.052 * Math.cos((dKumbolo / 0.19) * Math.PI * 0.5);
      h -= lakeBowl;
    }
    // Bukit sabana pengapit Ranu Kumbolo (Oro-oro Ombo / Tanjakan Cinta)
    const dTanjakan = Math.hypot(x + 0.44, z + 0.58);
    if (dTanjakan < 0.18) {
      h += 0.034 * Math.exp(-(dTanjakan * dTanjakan) / 0.016);
    }

    // 6. Kerucut Samping (Parasitic Cone / Gunung Kepolo) di dekat dinding irisan phi = 0.52*PI, r = 0.55
    const phiParasite = Math.PI * 0.555;
    const xPar = 0.55 * Math.cos(phiParasite);
    const zPar = 0.55 * Math.sin(phiParasite);
    const dPar = Math.hypot(x - xPar, z - zPar);
    if (dPar < 0.16) {
      let parCone = 0.078 * Math.exp(-(dPar * dPar) / 0.0085);
      if (dPar < 0.035) parCone -= 0.022 * Math.cos((dPar / 0.035) * Math.PI * 0.5);
      h += parCone;
    }

    return -0.14 + Math.max(0.0, h);
  }

  // Generator Mesh Silinder/Kerucut Terpotong Kuadran 90 Derajat (Cutaway phi in [0, 0.52*PI])
  function createCutawayRadialMesh(rSteps, phiSteps, rMax, evalYBounds) {
    const positions = [];
    const normals = [];
    const uvs = [];
    const surfTypes = []; // 0 = outer/top surface, 1 = bottom, 2 = cut wall YZ (phi=phiStart), 3 = cut wall XY (phi=2*PI)
    const indices = [];

    const phiStart = Math.PI * 0.52;
    const phiRange = Math.PI * 2.0 - phiStart;
    const dr = rMax / rSteps;
    const dPhi = phiRange / phiSteps;

    // 1. Permukaan Atas (Top Slope / Terrain, surfType = 0)
    const baseTop = positions.length / 3;
    for (let ir = 0; ir <= rSteps; ir++) {
      const u = ir / rSteps;
      const r = u * rMax;
      for (let ip = 0; ip <= phiSteps; ip++) {
        const v = ip / phiSteps;
        const phi = phiStart + v * phiRange;
        const x = r * Math.cos(phi);
        const z = r * Math.sin(phi);
        const { yTop } = evalYBounds(r, phi);

        // Hitung normal permukaan dari beda hingga radial & azimutal
        const rP = Math.min(rMax, r + dr * 0.5);
        const rM = Math.max(0.001, r - dr * 0.5);
        const dydr = (evalYBounds(rP, phi).yTop - evalYBounds(rM, phi).yTop) / (rP - rM || 0.01);
        const dydphi =
          r > 0.02
            ? (evalYBounds(r, phi + dPhi * 0.5).yTop - evalYBounds(r, phi - dPhi * 0.5).yTop) / (r * dPhi)
            : 0.0;

        const nx = -dydr * Math.cos(phi) + dydphi * Math.sin(phi);
        const ny = 1.0;
        const nz = -dydr * Math.sin(phi) - dydphi * Math.cos(phi);
        const nLen = Math.hypot(nx, ny, nz) || 1.0;

        positions.push(x, yTop, z);
        normals.push(nx / nLen, ny / nLen, nz / nLen);
        uvs.push(u, v);
        surfTypes.push(0);
      }
    }
    const strideP = phiSteps + 1;
    for (let ir = 0; ir < rSteps; ir++) {
      for (let ip = 0; ip < phiSteps; ip++) {
        const a = baseTop + ir * strideP + ip;
        const b = a + strideP;
        const c = a + 1;
        const d = b + 1;
        indices.push(a, c, b, c, d, b);
      }
    }

    // 2. Dinding Luar Silinder (Outer Rim pada r = rMax)
    const rimLayers = 8;
    const baseRim = positions.length / 3;
    for (let iy = 0; iy <= rimLayers; iy++) {
      const ty = iy / rimLayers;
      for (let ip = 0; ip <= phiSteps; ip++) {
        const v = ip / phiSteps;
        const phi = phiStart + v * phiRange;
        const { yBot, yTop } = evalYBounds(rMax, phi);
        const y = yBot + ty * (yTop - yBot);
        positions.push(rMax * Math.cos(phi), y, rMax * Math.sin(phi));
        normals.push(Math.cos(phi), 0, Math.sin(phi));
        uvs.push(v, ty);
        surfTypes.push(1);
      }
    }
    for (let iy = 0; iy < rimLayers; iy++) {
      for (let ip = 0; ip < phiSteps; ip++) {
        const a = baseRim + iy * strideP + ip;
        const b = a + strideP;
        const c = a + 1;
        const d = b + 1;
        indices.push(a, b, c, c, b, d);
      }
    }

    // 3. Dua Dinding Irisan Kuadran (Cutaway Walls pada phi = phiStart & phi = 2*PI)
    const wallYSteps = 26;
    const strideR = rSteps + 1;
    function addCutWall(phiVal, nx, nz, flip, sType) {
      const base = positions.length / 3;
      const cosP = Math.cos(phiVal);
      const sinP = Math.sin(phiVal);
      for (let iy = 0; iy <= wallYSteps; iy++) {
        const v = iy / wallYSteps;
        for (let ir = 0; ir <= rSteps; ir++) {
          const u = ir / rSteps;
          const r = u * rMax;
          const { yBot, yTop } = evalYBounds(r, phiVal);
          const y = yBot + v * (yTop - yBot);
          positions.push(r * cosP, y, r * sinP);
          normals.push(nx, 0, nz);
          uvs.push(u, v);
          surfTypes.push(sType);
        }
      }
      for (let iy = 0; iy < wallYSteps; iy++) {
        for (let ir = 0; ir < rSteps; ir++) {
          const a = base + iy * strideR + ir;
          const b = a + strideR;
          const c = a + 1;
          const d = b + 1;
          if (!flip) indices.push(a, b, c, c, b, d);
          else indices.push(a, c, b, c, d, b);
        }
      }
    }
    addCutWall(phiStart, 1, 0, false, 2);
    addCutWall(Math.PI * 2.0, 0, 1, true, 3);

    return {
      positions: new Float32Array(positions),
      normals: new Float32Array(normals),
      uvs: new Float32Array(uvs),
      surfTypes: new Float32Array(surfTypes),
      indices: new Uint16Array(indices)
    };
  }

  // Helper penggabung beberapa sub-mesh menjadi satu mesh komponen
  function mergeSubMeshes(list) {
    const positions = [];
    const normals = [];
    const uvs = [];
    const surfTypes = [];
    const indices = [];

    list.forEach(m => {
      const offset = positions.length / 3;
      for (let i = 0; i < m.positions.length; i++) positions.push(m.positions[i]);
      for (let i = 0; i < m.normals.length; i++) normals.push(m.normals[i]);
      for (let i = 0; i < m.uvs.length; i++) uvs.push(m.uvs[i]);
      for (let i = 0; i < m.surfTypes.length; i++) surfTypes.push(m.surfTypes[i]);
      for (let i = 0; i < m.indices.length; i++) indices.push(m.indices[i] + offset);
    });

    return {
      positions: new Float32Array(positions),
      normals: new Float32Array(normals),
      uvs: new Float32Array(uvs),
      surfTypes: new Float32Array(surfTypes),
      indices: new Uint16Array(indices)
    };
  }

  // Helper pembuat tabung 3D berlekuk (untuk Pipa Diatrema, Dike/Korok, Apolisa & Aliran Lava)
  function createTubeMesh(pathPts, radii, segs, sType = 0) {
    const positions = [];
    const normals = [];
    const uvs = [];
    const surfTypes = [];
    const indices = [];

    const rings = pathPts.length;
    for (let i = 0; i < rings; i++) {
      const v = i / (rings - 1);
      const [cx, cy, cz] = pathPts[i];
      const r = radii[i];
      for (let j = 0; j <= segs; j++) {
        const u = j / segs;
        const phi = u * Math.PI * 2.0;
        const nx = Math.cos(phi);
        const nz = Math.sin(phi);
        positions.push(cx + r * nx, cy, cz + r * nz);
        normals.push(nx, 0.2, nz);
        uvs.push(u, v);
        surfTypes.push(sType);
      }
    }
    const stride = segs + 1;
    for (let i = 0; i < rings - 1; i++) {
      for (let j = 0; j < segs; j++) {
        const a = i * stride + j;
        const b = a + stride;
        const c = a + 1;
        const d = b + 1;
        indices.push(a, c, b, c, d, b);
      }
    }
    return {
      positions: new Float32Array(positions),
      normals: new Float32Array(normals),
      uvs: new Float32Array(uvs),
      surfTypes: new Float32Array(surfTypes),
      indices: new Uint16Array(indices)
    };
  }

  let _cachedSemeruMeshes = null;
  function _uncachedBuildAllSemeruMeshes() {
    const rMax = 1.22;
    const phiWall1 = Math.PI * 0.52;
    const cosW1 = Math.cos(phiWall1);
    const sinW1 = Math.sin(phiWall1);
    // Normal keluar dari Dinding Irisan 1 (phi = 0.52*PI) menuju kuadran yang terpotong
    const nW1x = Math.sin(phiWall1);
    const nW1z = -Math.cos(phiWall1);

    // Fungsi elevasi batas antara Kerak Jawa (Part 0) dan Dasar Stratovolcano Semeru (Part 1)
    // Mencakup lengkungan kubah (doming) di atas Lakolit pada r ~ 0.64, phi ~ 2*PI!
    function evalCrustTop(r, phi) {
      const fold = 0.016 * Math.sin(r * 6.5 + phi * 2.0);
      const x = r * Math.cos(phi);
      const z = r * Math.sin(phi);
      const dLac = Math.hypot(x - 0.64, z - 0.0);
      const lacDome = dLac < 0.24 ? 0.055 * Math.cos((dLac / 0.24) * Math.PI * 0.5) : 0.0;
      return -0.14 + fold + lacDome;
    }

    // 0. Batuan Dasar & Stratigrafi Kerak Jawa (y dari -0.68 s/d evalCrustTop)
    const meshBaseCrust = createCutawayRadialMesh(42, 68, rMax, (r, phi) => {
      return {
        yBot: -0.68,
        yTop: evalCrustTop(r, phi)
      };
    });

    // 1. Kerucut Stratovolcano Gunung Semeru (Mahameru 3.676 mdpl + Ranu Kumbolo + Besuk Kobokan)
    const meshSemeruCone = createCutawayRadialMesh(64, 92, rMax, (r, phi) => {
      const yBot = evalCrustTop(r, phi);
      const yTop = Math.max(yBot + 0.018, evalSemeruHeight(r, phi));
      return { yBot, yTop };
    });

    // 2. Batolit (>100 km²) & Dapur Magma Utama Semeru (Tertanam presisi di bidang irisan kuadran)
    const meshBatholith = createCutawayRadialMesh(30, 52, 0.80, (r, phi) => {
      const u = Math.min(1.0, r / 0.80);
      const bathoDome = Math.cos(u * Math.PI * 0.5);
      // Kubah Dapur Magma Utama di tengah (r < 0.36) menjulang hingga y = -0.18
      const chamberU = Math.min(1.0, r / 0.36);
      const chamberDome = r < 0.36 ? Math.pow(Math.cos(chamberU * Math.PI * 0.5), 1.3) * 0.20 : 0.0;
      const irregularity = 0.018 * Math.sin(phi * 5.0 + r * 9.0) * bathoDome;
      return {
        yBot: -0.675,
        yTop: -0.665 + bathoDome * 0.29 + chamberDome + irregularity
      };
    });

    // 3. Bentukan Intrusi Plutonik (Lakolit, Sill, Dike/Korok & Urat Apolisa)
    // Tertanam presisi (Flush Relief) pada Dinding Irisan 1 (phi = 0.52*PI) & Dinding Irisan 2 (z = 0)
    // a) LAKOLIT: Lensa kubah cembung (plano-convex mushroom dome) di Dinding Irisan 2 (x ~ 0.64, z = 0)
    const meshLaccolith = createCutawayRadialMesh(20, 28, 0.20, (r, phi) => {
      // Geser titik pusat lokal nantinya, atau buat dengan tube pipih menempel di dinding z = 0
      return { yBot: 0, yTop: 0 };
    });
    // Buat geometri Lakolit plano-konveks yang menempel rata di Dinding Irisan 2 (x dari 0.44 s/d 0.84, z ~ 0.008)
    const lacPts = [];
    const lacRadii = [];
    for (let i = 0; i <= 16; i++) {
      const t = (i / 16) * 2.0 - 1.0; // -1 s/d +1
      const x = 0.64 + t * 0.19;
      const arch = Math.cos(t * Math.PI * 0.5);
      const yCenter = -0.25 + arch * 0.048;
      const radius = 0.006 + arch * 0.056;
      lacPts.push([x, yCenter, 0.008]);
      lacRadii.push(radius);
    }
    const flushLaccolith = createTubeMesh(lacPts, lacRadii, 20, 0);

    // b) Feeder Dike Lakolit (menghubungkan Batolit ke dasar Lakolit pada Dinding Irisan 2, z = 0.008)
    const dike1 = createTubeMesh(
      [
        [0.46, -0.46, 0.008],
        [0.55, -0.35, 0.008],
        [0.64, -0.24, 0.008]
      ],
      [0.032, 0.026, 0.024],
      16,
      1
    );

    // c) Apolisa Kanan (urat cabang dari Feeder Dike di Dinding Irisan 2)
    const apolisaRight = createTubeMesh(
      [
        [0.54, -0.36, 0.008],
        [0.72, -0.33, 0.008],
        [0.86, -0.30, 0.008]
      ],
      [0.018, 0.013, 0.005],
      12,
      3
    );

    // Helper titik tertanam di Dinding Irisan 1 (phi = 0.52*PI) dengan sedikit relief keluar (flushOffset = 0.008)
    function wall1Pt(r, y, flushOff = 0.008) {
      return [r * cosW1 + nW1x * flushOff, y, r * sinW1 + nW1z * flushOff];
    }

    // d) SILL MENDATAR (Konkordan sejajar perlapisan batuan di Dinding Irisan 1, y = -0.25)
    const sillPts = [];
    const sillR = [];
    for (let i = 0; i <= 14; i++) {
      const t = i / 14;
      const r = 0.16 + t * 0.68;
      const y = -0.25 + 0.012 * Math.sin(r * 6.5 + phiWall1 * 2.0);
      const taper = t > 0.8 ? (1.0 - (t - 0.8) / 0.2) : 1.0;
      sillPts.push(wall1Pt(r, y));
      sillR.push(0.026 * (0.4 + 0.6 * taper));
    }
    const sillMesh = createTubeMesh(sillPts, sillR, 16, 2);

    // e) DIKE / KOROK MIRING (Diskordan memotong lapisan batuan di Dinding Irisan 1 menuju Kerucut Samping r = 0.55!)
    const dike2Pts = [];
    const dike2R = [];
    for (let i = 0; i <= 14; i++) {
      const t = i / 14;
      const r = 0.16 + t * 0.39; // Berakhir tepat di r = 0.55 (Kerucut Samping di lereng Semeru!)
      const ySurfAtEnd = evalSemeruHeight(0.55, phiWall1 * 1.03);
      const y = -0.38 + t * (ySurfAtEnd + 0.36);
      dike2Pts.push(wall1Pt(r, y));
      dike2R.push(0.032 * (1.0 - t * 0.42));
    }
    const dike2 = createTubeMesh(dike2Pts, dike2R, 16, 1);

    // f) URAT APOLISA (Cabang miring dari Dike 2 yang merambat ke dalam lapisan stratovolcano di Dinding Irisan 1)
    const apolisaLeft = createTubeMesh(
      [
        wall1Pt(0.34, -0.10),
        wall1Pt(0.52, -0.03),
        wall1Pt(0.68,  0.01)
      ],
      [0.020, 0.014, 0.005],
      12,
      3
    );

    const meshIntrusions = mergeSubMeshes([flushLaccolith, dike1, apolisaRight, sillMesh, dike2, apolisaLeft]);

    // 4. Pipa Kepundan Utama (Diatrema), Kubah Lava Jonggring Saloko & Aliran Lava Curah Kobokan
    const diatremaPts = [];
    const diatremaR = [];
    for (let i = 0; i <= 22; i++) {
      const t = i / 22;
      const y = -0.36 + t * 0.93; // Berakhir tepat di Kawah Jonggring Saloko (y = +0.57)
      // Leher pipa menyempit di tengah lalu melebar menjadi Kubah Lava di kawah atas
      const neck = 0.052 * (1.0 - 0.22 * Math.sin(t * Math.PI));
      const domeFlare = t > 0.80 ? Math.sin(((t - 0.80) / 0.20) * Math.PI * 0.65) * 0.078 : 0.0;
      diatremaPts.push([0.006, y, 0.006]);
      diatremaR.push(neck + domeFlare);
    }
    const meshDiatrema = createTubeMesh(diatremaPts, diatremaR, 28, 0);

    // Aliran Lava Pijar Berkerak (Blocky Andesite Lava) menuruni dasar Lembah Curah Kobokan (phi = 1.85 rad)
    const phiFlow = 1.85;
    const lavaPts = [];
    const lavaR = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const r = 0.09 + t * 0.86;
      const meander = 0.018 * Math.sin(t * Math.PI * 5.0);
      const phiCur = phiFlow + meander;
      const y = evalSemeruHeight(r, phiCur) + 0.010;
      lavaPts.push([r * Math.cos(phiCur), y, r * Math.sin(phiCur)]);
      lavaR.push(0.032 * (1.0 - t * 0.52));
    }
    const meshLavaFlow = createTubeMesh(lavaPts, lavaR, 16, 1);

    const meshConduitAndLava = mergeSubMeshes([meshDiatrema, meshLavaFlow]);

    return [meshBaseCrust, meshSemeruCone, meshBatholith, meshIntrusions, meshConduitAndLava];
  }
  function buildAllSemeruMeshes() {
    if (_cachedSemeruMeshes) return _cachedSemeruMeshes;
    _cachedSemeruMeshes = _uncachedBuildAllSemeruMeshes();
    return _cachedSemeruMeshes;
  }


  const VERT_SRC = `
    precision highp float;
    precision highp int;

    attribute vec3 aPos;
    attribute vec3 aNorm;
    attribute vec2 aUV;
    attribute float aSurfType;

    uniform mat4 uMVP;
    uniform vec3 uOffset;
    uniform int uPartIndex;
    uniform int uMode;
    uniform float uTime;

    varying vec3 vPos;
    varying vec3 vWorldPos;
    varying vec3 vNorm;
    varying vec2 vUV;
    varying float vSurfType;

    void main() {
      vec3 p = aPos;

      // Denyut Kubah Lava & Pipa Kepundan saat fase erupsi aktif
      if (uPartIndex == 4 && p.y > 0.42) {
        float domePulse = 1.0 + 0.06 * sin(uTime * 3.2 + p.y * 8.0);
        p.x *= domePulse;
        p.z *= domePulse;
      }

      vec3 world = p + uOffset;
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
    precision highp int;

    varying vec3 vPos;
    varying vec3 vWorldPos;
    varying vec3 vNorm;
    varying vec2 vUV;
    varying float vSurfType;

    uniform int uPartIndex;
    uniform int uMode;
    uniform float uTime;
    uniform float uHighlight;
    uniform float uDim;
    uniform vec3 uEye;
    uniform sampler2D uEarthTex;

    float sqr(float x) {
      return x * x;
    }

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
        p = p * 2.04 + vec3(1.7, 9.2, 5.4);
        a *= 0.5;
      }
      return v;
    }

    // Perturbasi normal 3D analitik untuk detail mikro-relief tebing batuan, kekar lava & kawah
    vec3 perturbNormal(vec3 N, vec3 p, float scale, float strength) {
      vec2 e = vec2(0.011, 0.0);
      float h0 = fbm(p * scale);
      vec3 grad = vec3(
        fbm((p + e.xyy) * scale) - h0,
        fbm((p + e.yxy) * scale) - h0,
        fbm((p + e.yyx) * scale) - h0
      ) / e.x;
      grad -= N * dot(grad, N);
      return normalize(N - grad * strength);
    }

    void main() {
      vec3 N_geom = normalize(vNorm);
      vec3 V = normalize(uEye - vWorldPos);
      vec3 L1 = normalize(vec3(0.56, 0.78, 0.52));
      vec3 L2 = normalize(vec3(-0.64, 0.28, 0.65));
      vec3 L3 = normalize(vec3(0.15, -0.85, -0.45));

      float hC = fbm(vPos * 16.0);
      float hDetail = fbm(vPos * 48.0);
      float grain = noise(vPos * 96.0);
      float bumpStrength = (uPartIndex == 1 && vSurfType < 0.5) ? 0.052 : 0.042;
      vec3 N = perturbNormal(N_geom, vPos, 22.0, bumpStrength);

      float rim = pow(1.0 - max(dot(N_geom, V), 0.0), 2.6);

      vec3 baseCol = vec3(0.5);
      float emissive = 0.0;
      float specPower = 26.0;
      float specStrength = 0.14;
      float ao = 1.0;

      if (uPartIndex == 0) {
        // PART 0: BATUAN DASAR & STRATIGRAFI KERAK JAWA SELATAN (TNBTS)
        float rXZ = length(vPos.xz);
        // Lengkungan lapisan sedimen terangkat di atas kubah Lakolit (x = 0.64, z = 0)
        float dLac = length(vec2(vPos.x - 0.64, vPos.z * 1.4));
        float lacArch = 0.145 * exp(-sqr(dLac / 0.23)) * smoothstep(-0.42, -0.14, vPos.y);
        float sY = vPos.y - lacArch * 0.88 + (hC - 0.5) * 0.024;

        // 1. Batuan Dasar Kristalin (Granit-Diorit & Sekis Kompleks Jawa Selatan)
        float speckle = step(0.56, grain);
        float quartz = smoothstep(0.45, 0.78, hDetail);
        vec3 basementRock = mix(vec3(0.20, 0.18, 0.19), vec3(0.46, 0.42, 0.40), quartz);
        basementRock = mix(basementRock, vec3(0.09, 0.08, 0.10), speckle * 0.55);

        // 2. Formasi Batupasir Vulkanik & Serpih Tersier
        float fineLam = sin(sY * 145.0 + hDetail * 3.2) * 0.5 + 0.5;
        vec3 tertiarySand = mix(vec3(0.42, 0.33, 0.25), vec3(0.60, 0.47, 0.35), fineLam);

        // 3. Formasi Gamping Karst Jawa Selatan (CaCO3 - Formasi Wonosari/Punung)
        float karstJoint = smoothstep(0.86, 0.98, abs(sin(vPos.x * 46.0 + vPos.z * 42.0 + hC * 4.0)));
        vec3 southLimestone = mix(vec3(0.72, 0.67, 0.57), vec3(0.84, 0.80, 0.71), hDetail);
        southLimestone = mix(southLimestone, vec3(0.36, 0.33, 0.29), karstJoint * 0.65);

        // 4. Breksi Vulkanik Tua (Fondasi Semeru Tua / Kompleks Jambangan)
        float brecciaClast = step(0.62, noise(vPos * 52.0));
        vec3 oldBreccia = mix(vec3(0.34, 0.30, 0.27), vec3(0.52, 0.44, 0.37), hC);
        oldBreccia = mix(oldBreccia, vec3(0.18, 0.16, 0.15), brecciaClast * 0.55);

        baseCol = basementRock;
        baseCol = mix(baseCol, tertiarySand,   smoothstep(-0.54, -0.49, sY));
        baseCol = mix(baseCol, southLimestone, smoothstep(-0.40, -0.35, sY));
        baseCol = mix(baseCol, oldBreccia,     smoothstep(-0.27, -0.22, sY));

        // Bidang perlapisan gelap (bedding plane seams)
        float seam = smoothstep(0.90, 0.99, abs(sin(sY * 62.0)));
        baseCol *= (1.0 - seam * 0.28);

        // Aureol Metamorfisme Kontak (Hornfels & Skarn Pijar) di sekeliling Batolit & Lakolit
        float batholithHalo = (1.0 - smoothstep(0.48, 0.82, rXZ)) * (1.0 - smoothstep(-0.54, -0.26, vPos.y));
        float laccolithHalo = exp(-sqr(length(vec2(vPos.x - 0.64, vPos.y + 0.20)) / 0.22)) * (1.0 - smoothstep(0.0, 0.14, abs(vPos.z)));
        float contactHeat = clamp(batholithHalo + laccolithHalo * 0.65, 0.0, 1.0);
        baseCol = mix(baseCol, vec3(0.92, 0.38, 0.10), contactHeat * 0.68);
        emissive = contactHeat * 0.35;
        ao = mix(0.75, 1.0, smoothstep(-0.68, -0.18, vPos.y));
      } else if (uPartIndex == 1) {
        // PART 1: KERUCUT STRATOVOLCANO GUNUNG SEMERU (PUNCAK MAHAMERU 3.676 MDPL)
        float rXZ = length(vPos.xz);
        float y = vPos.y;
        float phi = atan(vPos.z, vPos.x);

        if (vSurfType < 0.5) {
          // === PERMUKAAN EKSTERIOR LERENG GUNUNG SEMERU ===
          vec2 satUV = vec2(fract(0.79 + vUV.x * 0.09), clamp(0.49 + vUV.y * 0.09, 0.01, 0.99));
          vec3 satCol = texture2D(uEarthTex, satUV).rgb;
          float slope = 1.0 - clamp(N_geom.y, 0.0, 1.0);

          // 1. Sabuk Vegetasi TNBTS: Kaki Andosol -> Hutan Hujan Tropis -> Hutan Cemara Gunung (Kalimati) -> Batas Arcopodo
          float canopy = noise(vPos * 68.0);
          vec3 andosolFoot     = mix(vec3(0.14, 0.38, 0.15), vec3(0.28, 0.52, 0.22), hC * 0.7 + canopy * 0.3);
          vec3 rainForest      = mix(vec3(0.08, 0.29, 0.12), vec3(0.19, 0.42, 0.18), canopy);
          vec3 casuarinaBelt   = mix(vec3(0.18, 0.34, 0.16), vec3(0.35, 0.45, 0.23), hDetail * 0.6 + canopy * 0.4);
          vec3 arcopodoSubAlp  = mix(vec3(0.44, 0.39, 0.29), vec3(0.55, 0.48, 0.36), hC);

          // 2. Kerucut Pasir, Abu & Scree Andesit Puncak Mahameru (di atas batas vegetasi Arcopodo ~2.900 mdpl)
          float rillStreaks = sin(phi * 48.0 + hDetail * 2.5) * 0.5 + 0.5;
          vec3 mahameruAsh   = mix(vec3(0.24, 0.23, 0.25), vec3(0.42, 0.39, 0.37), hC * 0.65 + rillStreaks * 0.35);
          vec3 andesiteCliff = mix(vec3(0.20, 0.19, 0.21), vec3(0.36, 0.33, 0.31), hDetail);

          float treeLineNoise = (hC - 0.5) * 0.045 + (hDetail - 0.5) * 0.02;
          baseCol = andosolFoot;
          baseCol = mix(baseCol, rainForest,     smoothstep(-0.08, 0.06, y + treeLineNoise));
          baseCol = mix(baseCol, casuarinaBelt,  smoothstep(0.06, 0.18, y + treeLineNoise));
          baseCol = mix(baseCol, arcopodoSubAlp, smoothstep(0.18, 0.24, y + treeLineNoise));
          baseCol = mix(baseCol, mahameruAsh,    smoothstep(0.24, 0.32, y + treeLineNoise));

          // Singkapan tebing batuan andesit curam pada dinding jurang barrancos (slope > 0.45)
          float cliffMask = smoothstep(0.42, 0.68, slope);
          baseCol = mix(baseCol, andesiteCliff, cliffMask * 0.72);
          baseCol = mix(baseCol, satCol * 1.05, 0.22 * (1.0 - smoothstep(0.22, 0.34, y)));

          // 3. Alur Guguran Awan Panas & Lahar Dingin di Lembah Curah/Besuk Kobokan (phi ~ 1.85 rad) & Besuk Kembar
          float dPhiKobokan = atan(sin(phi - 1.85), cos(phi - 1.85));
          float chWidth = 0.09 + 0.10 * rXZ;
          float kobokanFloor = exp(-sqr(dPhiKobokan / chWidth)) * smoothstep(0.06, 0.20, rXZ);
          float kobokanLevee = exp(-sqr((abs(dPhiKobokan) - chWidth * 1.15) / (chWidth * 0.65))) * smoothstep(0.12, 0.26, rXZ);
          vec3 pyroclasticDeposit = mix(vec3(0.22, 0.20, 0.20), vec3(0.36, 0.33, 0.31), hDetail);
          vec3 laharBoulders      = mix(vec3(0.46, 0.41, 0.36), vec3(0.30, 0.27, 0.25), grain);
          baseCol = mix(baseCol, laharBoulders, kobokanLevee * 0.68);
          baseCol = mix(baseCol, pyroclasticDeposit, kobokanFloor * 0.88);

          // 4. Danau Ranu Kumbolo (2.400 mdpl) di lembah antargunung utara-barat laut (x ~ -0.56, z ~ -0.46)
          float dKumbolo = length((vPos.xz - vec2(-0.56, -0.46)) * vec2(1.0, 1.22));
          if (dKumbolo < 0.145) {
            float shoreMeadow = (1.0 - smoothstep(0.095, 0.145, dKumbolo)) * smoothstep(0.065, 0.098, dKumbolo);
            float waterMask   = 1.0 - smoothstep(0.068, 0.095, dKumbolo);
            float ripples     = sin(dKumbolo * 180.0 - uTime * 2.5 + hDetail * 4.0) * 0.5 + 0.5;
            vec3 lakeCol      = mix(vec3(0.04, 0.32, 0.48), vec3(0.12, 0.62, 0.74), 0.35 + 0.35 * ripples);
            baseCol = mix(baseCol, vec3(0.42, 0.56, 0.24), shoreMeadow * 0.78);
            baseCol = mix(baseCol, lakeCol, waterMask);
            N = mix(N, vec3(0.0, 1.0, 0.0), waterMask * 0.88);
            specStrength = mix(specStrength, 0.92, waterMask);
            specPower = mix(specPower, 72.0, waterMask);
          }

          // 5. Kerucut Samping (Parasitic Scoria Cone) pada lereng tempat Dike mencapai permukaan (r = 0.55, phi = 0.555*pi)
          vec2 pConeCenter = vec2(0.55 * cos(1.7436), 0.55 * sin(1.7436));
          float dPCone = length(vPos.xz - pConeCenter);
          if (dPCone < 0.12) {
            float scoriaMask = 1.0 - smoothstep(0.04, 0.11, dPCone);
            vec3 scoriaCol = mix(vec3(0.28, 0.15, 0.12), vec3(0.52, 0.24, 0.14), hDetail);
            baseCol = mix(baseCol, scoriaCol, scoriaMask * 0.85);
            float ventGlow = 1.0 - smoothstep(0.0, 0.032, dPCone);
            baseCol = mix(baseCol, vec3(0.98, 0.45, 0.10), ventGlow * 0.85);
            emissive += ventGlow * 0.52;
          }

          // 6. Kawah Aktif Jonggring Saloko (x = 0.025, z = 0.032) & Puncak Mahameru (x = -0.085, z = -0.075)
          float dJonggring = length(vPos.xz - vec2(0.025, 0.032));
          if (dJonggring < 0.16) {
            float sulfurRim = (1.0 - smoothstep(0.065, 0.145, dJonggring)) * smoothstep(0.035, 0.075, dJonggring);
            vec3 fumaroleSulfur = mix(vec3(0.82, 0.72, 0.26), vec3(0.95, 0.90, 0.55), grain);
            baseCol = mix(baseCol, fumaroleSulfur, sulfurRim * 0.72);
            float craterInner = 1.0 - smoothstep(0.025, 0.085, dJonggring);
            float lavaCracks = smoothstep(0.58, 0.82, fbm(vPos * 38.0 + vec3(0.0, -uTime * 1.2, 0.0)));
            vec3 craterFloorCol = mix(vec3(0.22, 0.12, 0.10), vec3(1.0, 0.42, 0.08), lavaCracks);
            baseCol = mix(baseCol, craterFloorCol, craterInner * 0.90);
            emissive += craterInner * (0.35 + lavaCracks * 0.55);
          }

          // Ambient occlusion di dalam lembah jurang barrancos
          ao = mix(0.68, 1.0, clamp(N_geom.y * 0.85 + 0.25, 0.0, 1.0)) * (1.0 - kobokanFloor * 0.15);
        } else {
          // === DINDING PENAMPANG IRISAN 90 DERAJAT STRATOVOLCANO GUNUNG SEMERU ===
          N = perturbNormal(N_geom, vPos, 32.0, 0.065);

          // Kemiringan lapisan purba (paleo-slope) mengikuti morfologi kerucut komposit + undulasi organik
          float undulate = (hC - 0.5) * 0.042 + 0.016 * sin(rXZ * 22.0);
          float paleoSlope = y + rXZ * 0.62 + undulate;
          float freq = 10.5;
          float phase = fract(paleoSlope * freq);
          float layerID = floor(paleoSlope * freq);
          float layerRand = fract(sin(layerID * 12.9898) * 43758.5453);

          // 3 Fasies Utama Stratovolcano:
          // (A) Aliran Lava Andesit-Basaltik Beku dengan Kekar Tiang (Columnar/Blocky Joints) & Vesikula
          float colJoint = smoothstep(0.84, 0.98, abs(sin(rXZ * 105.0 + layerID * 5.7 + hDetail * 2.5)));
          float vesicles = step(0.76, grain);
          vec3 andesiteLava = mix(vec3(0.19, 0.18, 0.21), vec3(0.31, 0.29, 0.32), hDetail);
          andesiteLava = mix(andesiteLava, vec3(0.08, 0.08, 0.10), max(colJoint * 0.75, vesicles * 0.55));

          // (B) Endapan Breksi Piroklastik & Aglomerat (Fragmen Batuan Runcing di Dalam Matriks Abu)
          float coarseClast = step(0.60, noise(vPos * 46.0 + vec3(layerID * 1.3)));
          float fineClast   = step(0.68, grain);
          vec3 pyroBreccia  = mix(vec3(0.44, 0.36, 0.29), vec3(0.56, 0.46, 0.37), hC);
          pyroBreccia = mix(pyroBreccia, vec3(0.22, 0.19, 0.18), coarseClast * 0.65);
          pyroBreccia = mix(pyroBreccia, vec3(0.76, 0.68, 0.56), fineClast * 0.40);

          // (C) Lapisan Tefra, Lapili & Tuf Abu Vulkanik Berlaminasi Halus
          float ashLam = sin(paleoSlope * 110.0 + hDetail * 4.0) * 0.5 + 0.5;
          vec3 tephraTuff = mix(vec3(0.58, 0.48, 0.37), vec3(0.72, 0.62, 0.49), ashLam);

          // Perselingan realistis antar-lapisan berdasarkan fase & ketebalan bervariasi
          float b1 = smoothstep(0.28, 0.36, phase);
          float b2 = smoothstep(0.64, 0.72, phase);
          vec3 stratumCol = mix(andesiteLava, pyroBreccia, b1);
          stratumCol = mix(stratumCol, tephraTuff, b2);
          if (layerRand > 0.55) {
            stratumCol = mix(stratumCol, andesiteLava, (1.0 - b2) * 0.55);
          }

          // Bidang kontak erosi antar-lapisan (unconformity / bedding contact seams)
          float contactSeam = (1.0 - smoothstep(0.0, 0.07, phase)) + smoothstep(0.93, 1.0, phase);
          baseCol = stratumCol * (1.0 - contactSeam * 0.35);

          // Alterasi Hidrotermal & Pemanasan Kontak di Sekitar Pipa Kepundan (Diatrema) & Korok Dike
          float ventDist = rXZ;
          float hydroAlter = (1.0 - smoothstep(0.06, 0.22, ventDist));
          vec3 alteredRock = mix(vec3(0.68, 0.42, 0.20), vec3(0.85, 0.66, 0.28), hDetail);
          baseCol = mix(baseCol, alteredRock, hydroAlter * 0.65);

          float conduitHeat = 1.0 - smoothstep(0.04, 0.13, ventDist);
          baseCol = mix(baseCol, vec3(0.98, 0.38, 0.08), conduitHeat * 0.82);
          emissive = conduitHeat * 0.48;
          ao = mix(0.78, 1.0, smoothstep(-0.18, 0.45, y));
        }
      } else if (uPartIndex == 2) {
        // PART 2: BATOLIT & DAPUR MAGMA UTAMA SEMERU
        N = perturbNormal(N_geom, vPos, 18.0, 0.055);
        float rXZ = length(vPos.xz);
        vec3 p = vPos * 6.2 + vec3(0.0, -uTime * 0.38, uTime * 0.18);
        float w = fbm(p);
        float magma = fbm(p * 1.55 + vec3(w * 2.6));

        // Kerak Batuan Beku Dalam (Granit/Diorit Dingin pada Chilled Margin Tepi Batolit)
        float phenocryst = step(0.64, grain);
        vec3 graniteCrust = mix(vec3(0.32, 0.18, 0.16), vec3(0.58, 0.38, 0.32), phenocryst);
        vec3 darkMagma    = vec3(0.55, 0.10, 0.02);
        vec3 brightMagma  = vec3(0.98, 0.42, 0.06);
        vec3 whiteHot     = vec3(1.0, 0.90, 0.42);

        vec3 moltenCore = mix(darkMagma, brightMagma, smoothstep(0.20, 0.58, magma));
        moltenCore = mix(moltenCore, whiteHot, smoothstep(0.58, 0.85, magma));

        // Tepi luar Batolit mengalami pendinginan lambat (Chilled Margin), sedangkan bagian dalam konveksi pijar
        float edgeMask = smoothstep(0.48, 0.72, rXZ) * (1.0 - smoothstep(0.52, 0.76, magma));
        baseCol = mix(moltenCore, graniteCrust, edgeMask * 0.70);
        emissive = (1.0 - edgeMask * 0.65) * (0.68 + 0.14 * sin(uTime * 2.4));
        specStrength = 0.48;
      } else if (uPartIndex == 3) {
        // PART 3: BENTUKAN INTRUSI PLUTONIK FLUSH (LAKOLIT, SILL, DIKE/KOROK & APOLISA)
        N = perturbNormal(N_geom, vPos, 28.0, 0.058);

        // Tekstur Batuan Beku Korok (Porfiri/Diabas pada Chilled Margin Tepi Intrusi)
        float porphyritic = step(0.68, grain);
        vec3 chilledPorphyry = mix(vec3(0.24, 0.19, 0.21), vec3(0.62, 0.48, 0.40), porphyritic * 0.65);

        // Aliran magma pijar aktif di inti urat intrusi (Core Fissures)
        vec3 flowCoord = vPos * 11.5 - vec3(0.0, uTime * 1.35, 0.0);
        float warp = fbm(flowCoord);
        float magmaVein = fbm(flowCoord * 1.4 + vec3(warp * 2.2));
        vec3 hotOrange = vec3(0.98, 0.44, 0.08);
        vec3 hotGold   = vec3(1.0, 0.86, 0.32);
        vec3 magmaCore = mix(vec3(0.62, 0.16, 0.04), hotOrange, smoothstep(0.22, 0.58, magmaVein));
        magmaCore = mix(magmaCore, hotGold, smoothstep(0.58, 0.84, magmaVein));

        // Tepi Chilled Margin di sekeliling kontak batuan samping vs Inti Magma Pijar di tengah penampang
        float rimDist = abs(vUV.x - 0.5) * 2.0;
        float isBevelRim = (vSurfType < 0.5) ? 0.72 : smoothstep(0.55, 0.92, rimDist) * 0.55;
        float coreGlow = clamp(1.0 - isBevelRim + (magmaVein - 0.45) * 0.5, 0.0, 1.0);

        baseCol = mix(chilledPorphyry, magmaCore, coreGlow);
        emissive = coreGlow * (0.58 + (uMode == 1 ? 0.28 : 0.08));
        specStrength = 0.42;
      } else {
        // PART 4: PIPA KEPUNDAN (DIATREMA), KUBAH LAVA JONGGRING SALOKO & ALIRAN LAVA CURAH KOBOKAN
        N = perturbNormal(N_geom, vPos, 26.0, 0.062);
        float flow = fbm(vec3(vPos.x * 10.0, vPos.y * 8.0 - uTime * 2.8, vPos.z * 10.0));
        float upwardWave = 0.5 + 0.5 * sin(vPos.y * 22.0 - uTime * 5.0);

        if (vSurfType < 0.5) {
          // Pipa Kepundan (Diatrema) & Kubah Lava Jonggring Saloko
          vec3 crustedDome = mix(vec3(0.26, 0.16, 0.15), vec3(0.42, 0.22, 0.16), hDetail);
          vec3 moltenLava  = vec3(0.98, 0.38, 0.06);
          vec3 glowingCore = vec3(1.0, 0.90, 0.36);

          vec3 conduitCol = mix(crustedDome, moltenLava, smoothstep(0.18, 0.52, flow));
          conduitCol = mix(conduitCol, glowingCore, smoothstep(0.52, 0.84, flow * 0.7 + upwardWave * 0.3));

          // Di puncak (y > 0.42), tampak Kubah Lava Andesit berkerak gelap dengan retakan pijar
          float domeMask = smoothstep(0.38, 0.50, vPos.y);
          float domeCracks = smoothstep(0.48, 0.74, flow);
          vec3 domeCol = mix(crustedDome, glowingCore, domeCracks);
          baseCol = mix(conduitCol, domeCol, domeMask * 0.65);
          emissive = mix(0.76 + upwardWave * 0.18, 0.28 + domeCracks * 0.68, domeMask);
        } else {
          // Aliran Lava Andesit Berkerak (Blocky Lava Flow) menuruni Lembah Curah Kobokan
          float blockyCrust = smoothstep(0.36, 0.64, fbm(vPos * 28.0 - vec3(0.0, uTime * 1.6, 0.0)));
          vec3 cooledClinker = mix(vec3(0.18, 0.15, 0.16), vec3(0.30, 0.24, 0.22), grain);
          vec3 incandescent  = mix(vec3(0.96, 0.32, 0.04), vec3(1.0, 0.82, 0.24), flow);
          baseCol = mix(incandescent, cooledClinker, blockyCrust * 0.68);
          emissive = (1.0 - blockyCrust * 0.68) * 0.82;
        }
        specStrength = 0.50;
      }

      // Pencahayaan 3-Titik (Key Sun Light + Sky Hemisphere Fill + Warm Magmatic Under-Bounce)
      float diff1 = max(dot(N, L1), 0.0);
      float diff2 = max(dot(N, L2), 0.0) * 0.36;
      float diff3 = max(dot(N, L3), 0.0) * 0.18;
      vec3 H = normalize(L1 + V);
      float spec = pow(max(dot(N, H), 0.0), specPower) * specStrength;

      vec3 ambientCol = mix(vec3(0.20, 0.25, 0.32), vec3(0.32, 0.26, 0.22), clamp(0.5 - N.y * 0.5, 0.0, 1.0));
      vec3 lightSum = baseCol * (ambientCol + vec3(1.0, 0.97, 0.91) * diff1 * 0.74 + vec3(0.72, 0.84, 0.96) * diff2 + vec3(0.95, 0.55, 0.28) * diff3) * ao;
      lightSum += baseCol * emissive + vec3(1.0, 0.97, 0.90) * spec;

      if (uHighlight > 0.01) {
        lightSum = mix(lightSum, lightSum * 1.30 + vec3(0.22, 0.15, 0.04), uHighlight);
        lightSum += vec3(1.0, 0.78, 0.28) * rim * uHighlight * 0.78;
      }

      lightSum *= (1.0 - uDim * 0.45);
      // Tone mapping filmik lembut agar bagian magma pijar tidak mudah clipping putih polos
      lightSum = clamp(lightSum / (1.0 + lightSum * 0.14), 0.0, 1.0);
      gl_FragColor = vec4(lightSum, 1.0);
    }
  `;

  function compileShader(gl, type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error('Volcano3D Shader error:', gl.getShaderInfoLog(sh));
    }
    return sh;
  }

  export class Volcano3DViewer {
    constructor(cardEl, pageId) {
      this.cardEl = cardEl;
      this.pageId = pageId;
      this.yaw = 0.72;
      this.pitch = 0.28;
      this.zoom = 1.04;
      this.targetYaw = 0.72;
      this.targetPitch = 0.28;
      this.targetZoom = 1.04;

      this.isDragging = false;
      this.dragMoved = false;
      this.lastX = 0;
      this.lastY = 0;
      this.userInteracting = false;

      this.isPlaying = true;
      this.isExploded = false;
      this.explodeAmount = 0.0;
      this.showLabels = true;
      this.selectedPart = null;
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
      const badgeEl = this.cardEl.querySelector('.model-badge');
      if (badgeEl) {
        badgeEl.innerHTML = '<span>🌋</span> 3D Interaktif · Anatomi Gunung Semeru';
      }

      this.wrap = document.createElement('div');
      this.wrap.className = 'earth3d-stage';
      this.wrap.innerHTML = `
        <canvas class="earth3d-gl" aria-label="Model 3D Interaktif Anatomi Gunung Semeru"></canvas>
        <canvas class="earth3d-hud"></canvas>

        <!-- Banner Penjelasan Mode Animasi Slide -->
        <div class="earth3d-sim-banner">
          <b class="sim-title">🌋 Anatomi Gunung Semeru (Mahameru 3.676 mdpl)</b>
          <span class="sim-sub">Putar model 3D Gunung Semeru (drag) atau klik struktur magma untuk detail.</span>
        </div>

        <!-- Kartu Detail Komponen Vulkanik -->
        <div class="earth3d-layer-popup" style="display:none">
          <div class="lp-head">
            <span class="lp-dot"></span>
            <strong class="lp-name">Kawah Jonggring Saloko</strong>
            <button type="button" class="lp-close" aria-label="Tutup detail">✕</button>
          </div>
          <div class="lp-grid">
            <div><small>Elevasi / Kedalaman</small><b class="lp-depth">-</b></div>
            <div><small>Temperatur</small><b class="lp-temp">-</b></div>
            <div><small>Sifat &amp; Aktivitas</small><b class="lp-state">-</b></div>
            <div><small>Massa Jenis</small><b class="lp-dens">-</b></div>
          </div>
          <div class="lp-comp"></div>
        </div>

        <!-- Baris Pil Struktur Semeru & Tombol Kontrol Taktil -->
        <div class="earth3d-bottom-bar">
          <div class="earth3d-layer-pills" role="group" aria-label="Pilih Anatomi Gunung Semeru">
            ${['Kerak Dasar', 'Lereng Semeru', 'Dapur Magma', 'Intrusi Magma', 'Kawah & Pipa'].map(
              (shortTitle, idx) => `<button type="button" class="e3d-pill" data-part="${idx}">
                      <i style="background:${PART_DATA[idx].accent}"></i>${shortTitle}
                    </button>`
            ).join('')}
          </div>
          <div class="earth3d-ctrls">
            <button type="button" class="e3d-ctrl-btn active" data-action="play" title="Jeda / Mainkan Animasi">⏸ Jeda</button>
            <button type="button" class="e3d-ctrl-btn" data-action="explode" title="Pisahkan / Satukan Anatomi Gunung Api">🧩 Pisahkan</button>
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
        uPartIndex: gl.getUniformLocation(prog, 'uPartIndex'),
        uMode: gl.getUniformLocation(prog, 'uMode'),
        uTime: gl.getUniformLocation(prog, 'uTime'),
        uHighlight: gl.getUniformLocation(prog, 'uHighlight'),
        uDim: gl.getUniformLocation(prog, 'uDim'),
        uEye: gl.getUniformLocation(prog, 'uEye'),
        uEarthTex: gl.getUniformLocation(prog, 'uEarthTex')
      };

      this.earthTex = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.earthTex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([36, 98, 46, 255]));

      if (window.EARTH_DAYMAP_DATA_URI) {
        const img = new Image();
        img.onload = () => {
          if (this.isDestroyed || !this.gl || !this.earthTex || !this.gl.isTexture(this.earthTex)) return;
          const c = document.createElement('canvas');
          c.width = 1024;
          c.height = 512;
          c.getContext('2d').drawImage(img, 0, 0, 1024, 512);
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, this.earthTex);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c);
          gl.generateMipmap(gl.TEXTURE_2D);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        };
        img.src = window.EARTH_DAYMAP_DATA_URI;
      }

      const rawMeshes = buildAllSemeruMeshes();
      this.meshes = rawMeshes.map(geom => {
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
        gl.bufferData(gl.ARRAY_BUFFER, geom.surfTypes, gl.STATIC_DRAW);

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
        this.targetPitch = Math.max(-0.25, Math.min(1.20, this.targetPitch + dy * 0.0085));
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
          this.targetZoom = Math.max(0.72, Math.min(1.55, touchStartZoom * factor));
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
        this.targetZoom = Math.max(0.72, Math.min(1.55, this.targetZoom - e.deltaY * 0.001));
      }, { passive: false });

      this.wrap.querySelectorAll('.e3d-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = Number(btn.dataset.part);
          this.selectPart(this.selectedPart === idx ? null : idx, true);
        });
      });

      this.wrap.querySelector('.lp-close').addEventListener('click', () => {
        this.selectPart(null);
      });

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
          } else if (act === 'labels') {
            this.showLabels = !this.showLabels;
            btn.classList.toggle('active', this.showLabels);
          } else if (act === 'reset') {
            this.userInteracting = false;
            this.isExploded = false;
            this.wrap.querySelector('[data-action="explode"]').classList.remove('active');
            this.wrap.querySelector('[data-action="explode"]').innerHTML = '🧩 Pisahkan';
            this.selectPart(null);
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
        let bestIdx = null;
        let bestDist = 48;
        for (let i = 0; i < this.lastScreenAnchors.length; i++) {
          const a = this.lastScreenAnchors[i];
          if (!a) continue;
          const d = Math.hypot(px - a.x, py - a.y);
          if (d < bestDist) {
            bestDist = d;
            bestIdx = i;
          }
        }
        if (bestIdx !== null) {
          this.selectPart(this.selectedPart === bestIdx ? null : bestIdx);
        }
      }
    }

    selectPart(partIdx, fromPill = false) {
      this.selectedPart = partIdx;
      this.wrap.querySelectorAll('.e3d-pill').forEach((btn, i) => {
        btn.classList.toggle('active', i === partIdx);
      });

      if (partIdx === null || partIdx === undefined) {
        this.popupEl.style.display = 'none';
        return;
      }

      if (fromPill && (!this.lastScreenAnchors || !this.lastScreenAnchors[partIdx])) {
        const mode = SLIDE_MODES[this.slideIndex];
        this.targetYaw = mode.targetYaw;
        this.targetPitch = Math.max(0.26, mode.targetPitch);
      }

      const d = PART_DATA[partIdx];
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

      if (mode.focusPart !== null) {
        this.selectPart(mode.focusPart);
      } else {
        this.selectPart(null);
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

    getPartOffset(idx) {
      const v = PART_DATA[idx].explodeVec;
      const selBoost = this.selectedPart === idx ? 0.12 : 0.0;
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
          this.targetYaw = SLIDE_MODES[this.slideIndex].targetYaw + Math.sin(this.simTime * 0.42) * 0.10;
        }
      }

      this.yaw += (this.targetYaw - this.yaw) * 0.1;
      this.pitch += (this.targetPitch - this.pitch) * 0.1;
      this.zoom += (this.targetZoom - this.zoom) * 0.1;

      const targetExplode = this.isExploded ? 1.0 : 0.0;
      this.explodeAmount += (targetExplode - this.explodeAmount) * 0.1;

      const dist = 4.35 / this.zoom;
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

      mat4Perspective(0.62, this.cssW / this.cssH, 0.1, 20.0, this._projMat);
      mat4LookAt(eye, [0, -0.04, 0], [0, 1, 0], this._viewMat);
      mat4Multiply(this._projMat, this._viewMat, this._mvpMat);
      const mvp = this._mvpMat;
      this.lastMVP = mvp;
      this.currentEye = eye;

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
      gl.uniform1i(this.uniforms.uMode, SLIDE_MODES[this.slideIndex].modeInt);
      gl.uniform3fv(this.uniforms.uEye, eye);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.earthTex);
      gl.uniform1i(this.uniforms.uEarthTex, 0);

      for (let i = 0; i < this.meshes.length; i++) {
        const m = this.meshes[i];
        const off = this.getPartOffset(i);
        const isSel = this.selectedPart === i;
        const isDimmed = this.selectedPart !== null && !isSel;

        gl.uniform3fv(this.uniforms.uOffset, off);
        gl.uniform1i(this.uniforms.uPartIndex, i);
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

    getVisibilityAlpha(pt3d, normalVec) {
      const eye = this.currentEye || [2.5, 1.4, 3.0];
      const eyeLen = Math.hypot(eye[0], eye[1], eye[2]) || 1;
      const eyNorm = eye[1] / eyeLen;

      // Sembunyikan jika pengguna memutar kamera melihat dari kolong bawah gunung
      const bottomMin = this.isExploded ? -0.16 : -0.02;
      const bottomMax = this.isExploded ? 0.06 : 0.16;
      const bottomFactor = Math.max(0.0, Math.min(1.0, (eyNorm - bottomMin) / (bottomMax - bottomMin)));
      if (bottomFactor <= 0.01) return 0.0;

      // Default normal: jika di dalam irisan bawah (y < 0.0), gunakan normal kuadran irisan (+X, +Z)
      let n = normalVec;
      if (!n) {
        if (pt3d[1] < 0.02 && pt3d[0] >= -0.05) {
          n = [0.68, 0.22, 0.70];
        } else if (pt3d[1] > 0.50) {
          n = [0.15, 0.92, 0.35];
        } else {
          n = [pt3d[0] * 0.6, 0.75, pt3d[2] * 0.6];
        }
      }

      const vx = eye[0] - pt3d[0];
      const vy = eye[1] - pt3d[1];
      const vz = eye[2] - pt3d[2];
      const vLen = Math.hypot(vx, vy, vz) || 1;
      const nLen = Math.hypot(n[0], n[1], n[2]) || 1;
      const dot = (vx * n[0] + vy * n[1] + vz * n[2]) / (vLen * nLen);

      const minDot = this.isExploded ? 0.02 : 0.12;
      const maxDot = this.isExploded ? 0.26 : 0.36;
      const faceFactor = Math.max(0.0, Math.min(1.0, (dot - minDot) / (maxDot - minDot)));
      return faceFactor * bottomFactor;
    }

    renderHUD(mvp) {
      const ctx = this.ctx2d;
      const w = this.cssW;
      const h = this.cssH;
      ctx.save();
      ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const mode = SLIDE_MODES[this.slideIndex].id;

      // Animasi Erupsi & Partikel 3D Spesifik Slide pada Gunung Semeru
      if (mode === 'anatomi') {
        this.drawSemeruAnatomyHUD(ctx, mvp, w, h);
      } else if (mode === 'intrusi') {
        this.drawPlutonicIntrusionsHUD(ctx, mvp, w, h);
      } else if (mode === 'material') {
        this.drawEruptionMaterialsHUD(ctx, mvp, w, h);
      } else if (mode === 'efusif_merapi') {
        this.drawPyroclasticFlowHUD(ctx, mvp, w, h);
      } else if (mode === 'plinian') {
        this.drawPlinianColumnHUD(ctx, mvp, w, h);
      } else if (mode === 'vulkano_pelee') {
        this.drawVulcanianCloudHUD(ctx, mvp, w, h);
      } else if (mode === 'batuan_manfaat') {
        this.drawIgneousRocksHUD(ctx, mvp, w, h);
      }

      this.drawPartLabels3D(ctx, mvp, w, h);
      ctx.restore();
    }

    // Slide 1: Anatomi Gunung Semeru (Mahameru 3.676 mdpl, Jonggring Saloko, Ranu Kumbolo, Flux Melting)
    drawSemeruAnatomyHUD(ctx, mvp, w, h) {
      const cutAlpha = this.getVisibilityAlpha([0.15, 0.0, 0.15], [0.68, 0.20, 0.70]);
      // Pulsa naiknya magma di sepanjang Pipa Kepundan (Diatrema)
      if (cutAlpha >= 0.05) {
        ctx.save();
        ctx.globalAlpha = cutAlpha;
        for (let i = 0; i < 4; i++) {
          const t = ((this.simTime * 0.55 + i * 0.25) % 1.0);
          const y = -0.42 + t * 0.96;
          const p = projectPoint3D([0.006, y, 0.006], mvp, w, h);
          if (p) {
            ctx.fillStyle = '#fff3b0';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#ff5a36';
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // Asap fumarol lembut di Kawah Jonggring Saloko
      const topAlpha = this.getVisibilityAlpha([0, 0.7, 0], [0, 1, 0]);
      if (topAlpha >= 0.05) {
        ctx.save();
        ctx.globalAlpha = topAlpha;
        this.drawCraterSmokePuffs(ctx, mvp, w, h, 0.35, 'rgba(220, 230, 240, 0.45)');
        ctx.restore();
      }

      const items = [
        { pt: [-0.085, 0.72, -0.075], norm: [0.0, 0.95, 0.30],     dy: -20, text: '🏔️ Puncak Mahameru (3.676 mdpl)', bg: 'rgba(14,42,58,0.92)', fg: '#f7c948', dot: '#f7c948' },
        { pt: [-0.56, 0.04, -0.46],   norm: [-0.45, 0.78, -0.42],  dy: 20,  text: '💧 Ranu Kumbolo (2.400 mdpl)',   bg: 'rgba(14,42,58,0.90)', fg: '#38bdf8', dot: '#38bdf8' }
      ];
      this.drawPillTagList(ctx, items, mvp, w, h);
    }

    // Slide 2: Bentukan Intrusi Magma (Batolit, Lakolit, Sill, Dike/Korok, Apolisa)
    drawPlutonicIntrusionsHUD(ctx, mvp, w, h) {
      const off = this.getPartOffset(3);
      const items = [
        { pt: [0.34, -0.52, 0.32],                            norm: [0.68, 0.22, 0.70], dy: 20,  text: '🧱 Batolit (>100 km²)',                bg: 'rgba(9, 27, 38, 0.92)', fg: '#ff5a36', dot: '#ff5a36' },
        { pt: [0.64 + off[0], -0.18 + off[1], 0.02 + off[2]], norm: [0.85, 0.22, 0.48], dy: -20, text: '🍄 Lakolit (Kubah Intrusi)',        bg: 'rgba(9, 27, 38, 0.92)', fg: '#f7c948', dot: '#f7c948' },
        { pt: [-0.02 + off[0], -0.25 + off[1], 0.54 + off[2]], norm: [0.42, 0.22, 0.88], dy: 20, text: '➖ Sill (Intrusi Mendatar)',        bg: 'rgba(9, 27, 38, 0.92)', fg: '#38bdf8', dot: '#38bdf8' },
        { pt: [-0.01 + off[0], -0.11 + off[1], 0.30 + off[2]], norm: [0.65, 0.22, 0.72], dy: -20, text: '📐 Dike / Korok & Apolisa',        bg: 'rgba(9, 27, 38, 0.92)', fg: '#ff922b', dot: '#ff922b' },
        { pt: [-0.08, 0.25, 0.54],                            norm: [-0.15, 0.65, 0.74], dy: -20, text: '🌋 Kerucut Samping (Parasitic Cone)', bg: 'rgba(9, 27, 38, 0.92)', fg: '#52b788', dot: '#52b788' }
      ];
      this.drawPillTagList(ctx, items, mvp, w, h);
    }

    // Slide 3: Material Erupsi (Gas Fumarol, Bom Vulkanik, Lapili, Abu & Lava/Lahar)
    drawEruptionMaterialsHUD(ctx, mvp, w, h) {
      const topAlpha = this.getVisibilityAlpha([0, 0.6, 0], [0, 0.92, 0.38]);
      if (topAlpha >= 0.05) {
        ctx.save();
        ctx.globalAlpha = topAlpha;
        this.drawCraterSmokePuffs(ctx, mvp, w, h, 0.55, 'rgba(200, 215, 228, 0.58)');

        // Lintasan balistik Bom Vulkanik (>64 mm) & Lapili (2-64 mm) dari Kawah Jonggring Saloko
        const trajectories = [
          { vx: 0.45, vz: 0.25, vy: 0.55 },
          { vx: -0.38, vz: 0.42, vy: 0.62 },
          { vx: 0.22, vz: -0.48, vy: 0.58 },
          { vx: -0.45, vz: -0.28, vy: 0.52 }
        ];

        trajectories.forEach((tr, idx) => {
          const t = ((this.simTime * 0.75 + idx * 0.25) % 1.0);
          const x = 0.025 + tr.vx * t;
          const z = 0.032 + tr.vz * t;
          const y = 0.56 + tr.vy * t - 0.95 * t * t;
          const p = projectPoint3D([x, y, z], mvp, w, h);
          if (p) {
            ctx.fillStyle = '#ff922b';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#fff3b0';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        });
        ctx.restore();
      }

      const items = [
        { pt: [0.02, 0.88, 0.03],  norm: [0.0, 0.96, 0.28],   dy: -16, text: '💨 Gas Fumarol/Solfatara (H₂O, SO₂, CO₂, H₂S)', bg: 'rgba(14,42,58,0.92)', fg: '#38bdf8', dot: '#38bdf8' },
        { pt: [0.38, 0.62, 0.22],  norm: [0.45, 0.78, 0.42],  dy: -16, text: '🪨 Tefra: Bom (>64mm), Lapili & Abu (<2mm)',    bg: 'rgba(14,42,58,0.92)', fg: '#f7c948', dot: '#f7c948' },
        { pt: [-0.18, 0.14, 0.65], norm: [-0.18, 0.62, 0.76], dy: 18,  text: '🔥 Aliran Lava & Lahar Besuk Kobokan',          bg: 'rgba(14,42,58,0.92)', fg: '#ff7b47', dot: '#ff7b47' }
      ];
      this.drawPillTagList(ctx, items, mvp, w, h);
    }

    // Slide 4: Guguran Kubah Lava & Luncuran Awan Panas (Wedhus Gembel / Nuée Ardente)
    drawPyroclasticFlowHUD(ctx, mvp, w, h) {
      const flowAlpha = this.getVisibilityAlpha([-0.16, 0.22, 0.58], [-0.18, 0.65, 0.74]);
      const phiFlow = 1.85;
      // Gumpalan awan panas guguran (APG) meluncur deras menuruni Curah Kobokan
      if (flowAlpha >= 0.05) {
        ctx.save();
        ctx.globalAlpha = flowAlpha;
        for (let i = 0; i < 12; i++) {
          const t = ((this.simTime * 0.65 + i / 12) % 1.0);
          const r = 0.08 + t * 0.92;
          const y = evalSemeruHeight(r, phiFlow) + 0.04 + Math.sin(t * Math.PI) * 0.05;
          const x = r * Math.cos(phiFlow);
          const z = r * Math.sin(phiFlow);
          const p = projectPoint3D([x, y, z], mvp, w, h);
          if (p) {
            const rad = (8 + t * 24) * this.zoom;
            const grad = ctx.createRadialGradient(p.x, p.y, 2, p.x, p.y, rad);
            grad.addColorStop(0, `rgba(255, 165, 70, ${0.75 * (1 - t * 0.5)})`);
            grad.addColorStop(0.45, `rgba(140, 125, 118, ${0.68 * (1 - t * 0.4)})`);
            grad.addColorStop(1, 'rgba(80, 72, 68, 0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.restore();
      }

      const items = [
        { pt: [0.025, 0.62, 0.032], norm: [0.15, 0.92, 0.35],  dy: -20, text: '🟡 Kubah Lava Kawah Jonggring Saloko',                bg: 'rgba(14,42,58,0.92)', fg: '#f7c948', dot: '#f7c948' },
        { pt: [-0.16, 0.22, 0.58],  norm: [-0.18, 0.65, 0.74], dy: 20,  text: '💨 Awan Panas Guguran (Wedhus Gembel / Nuée Ardente)', bg: 'rgba(14,42,58,0.92)', fg: '#ff7b47', dot: '#ff7b47' }
      ];
      this.drawPillTagList(ctx, items, mvp, w, h);
    }

    // Slide 5: Letusan Plinian Ultra-Eksplosif (Kolom Stratosfer) & St. Vincent
    drawPlinianColumnHUD(ctx, mvp, w, h) {
      const topAlpha = this.getVisibilityAlpha([0.025, 0.90, 0.032], [0.0, 0.95, 0.30]);
      if (topAlpha < 0.05) return;

      ctx.save();
      ctx.globalAlpha = topAlpha;
      // Tiang kolom erupsi Plinian menjulang tinggi + tudung payung stratosfer
      for (let i = 0; i < 16; i++) {
        const t = ((this.simTime * 0.8 + i / 16) % 1.0);
        const y = 0.56 + t * 0.78;
        const spread = t > 0.65 ? Math.pow((t - 0.65) / 0.35, 1.4) * 0.55 : t * 0.08;
        const ang = i * 2.4 + this.simTime;
        const p = projectPoint3D([0.025 + Math.cos(ang) * spread, y, 0.032 + Math.sin(ang) * spread], mvp, w, h);
        if (p) {
          const rad = (12 + t * 34) * this.zoom;
          const grad = ctx.createRadialGradient(p.x, p.y, 2, p.x, p.y, rad);
          grad.addColorStop(0, t < 0.25 ? 'rgba(255, 140, 50, 0.85)' : 'rgba(175, 168, 162, 0.72)');
          grad.addColorStop(1, 'rgba(90, 85, 82, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const plinPt = projectPoint3D([0.025, 1.24, 0.032], mvp, w, h);
      if (plinPt) {
        this.drawPillTag(ctx, plinPt.x, plinPt.y, '🔴 Kolom Erupsi Plinian (Stratosfer >25 km)', 'rgba(14,42,58,0.92)', '#ff5a36');
      }
      ctx.restore();
    }

    // Slide 6: Tipe Vulkano (Asap Kembang Kol Semeru/Bromo) & Tipe Pelee (Lateral Blast)
    drawVulcanianCloudHUD(ctx, mvp, w, h) {
      const topAlpha = this.getVisibilityAlpha([0, 0.7, 0], [0, 0.94, 0.34]);
      if (topAlpha >= 0.05) {
        ctx.save();
        ctx.globalAlpha = topAlpha;
        this.drawCraterSmokePuffs(ctx, mvp, w, h, 0.72, 'rgba(165, 158, 152, 0.75)');
        ctx.restore();
      }

      const items = [
        { pt: [0.025, 0.96, 0.032], norm: [0.0, 0.95, 0.30],  dy: -18, text: '☁️ Tipe Vulkano: Erupsi Asap Kembang Kol (Semeru & Bromo)', bg: 'rgba(14,42,58,0.92)', fg: '#f7c948', dot: '#f7c948' },
        { pt: [0.42, 0.52, 0.0],    norm: [0.65, 0.68, 0.34], dy: 18,  text: '💥 Tipe Pelee: Semburan Awan Panas Lateral',                bg: 'rgba(14,42,58,0.92)', fg: '#ff7b47', dot: '#ff7b47' }
      ];
      this.drawPillTagList(ctx, items, mvp, w, h);
    }

    // Slide 7: Zona Batuan Beku (Granit Dalam, Porfiri Korok, Andesit & Batu Apung Luar) + Tanah Andosol
    drawIgneousRocksHUD(ctx, mvp, w, h) {
      const items = [
        { pt: [0.28, -0.52, 0.26],  norm: [0.68, 0.22, 0.70],  dy: 20,  text: '🏛️ Batuan Beku Dalam: Granit (Pendinginan Lambat)',       bg: 'rgba(9, 27, 38, 0.92)', fg: '#ff7b47', dot: '#ff7b47' },
        { pt: [0.64, -0.20, 0.02],  norm: [0.84, 0.22, 0.48],  dy: -20, text: '📐 Batuan Beku Korok/Gang: Porfiri (Pendinginan Sedang)', bg: 'rgba(9, 27, 38, 0.92)', fg: '#f7c948', dot: '#f7c948' },
        { pt: [-0.26, 0.44, 0.24],  norm: [-0.38, 0.78, 0.48], dy: -20, text: '🛕 Batuan Beku Luar: Andesit & Batu Apung (Cepat)',       bg: 'rgba(9, 27, 38, 0.92)', fg: '#38bdf8', dot: '#38bdf8' },
        { pt: [-0.66, -0.02, 0.45], norm: [-0.45, 0.68, 0.58], dy: 20,  text: '🌾 Tanah Andosol Subur & Energi Panas Bumi (Geotermal)',  bg: 'rgba(9, 27, 38, 0.92)', fg: '#52b788', dot: '#52b788' }
      ];
      this.drawPillTagList(ctx, items, mvp, w, h);
    }

    drawCraterSmokePuffs(ctx, mvp, w, h, heightSpan, colorStr) {
      for (let i = 0; i < 9; i++) {
        const t = ((this.simTime * 0.45 + i / 9) % 1.0);
        const y = 0.56 + t * heightSpan;
        const wobbleX = 0.025 + Math.sin(t * 6.0 + i) * 0.08 * t;
        const wobbleZ = 0.032 + Math.cos(t * 5.0 + i) * 0.08 * t;
        const p = projectPoint3D([wobbleX, y, wobbleZ], mvp, w, h);
        if (p) {
          const rad = (7 + t * 22) * this.zoom;
          ctx.fillStyle = colorStr;
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    drawPartLabels3D(ctx, mvp, w, h) {
      const anchorLocal = [
        [0.84, -0.44, 0.02],      // 0: Kerak Dasar
        [-0.44, 0.30, 0.32],      // 1: Kerucut Gunung Semeru
        [0.28, -0.52, 0.26],      // 2: Dapur Magma & Batolit
        [0.64, -0.18, 0.02],      // 3: Intrusi (Lakolit, Sill, Dike)
        [0.025, 0.55, 0.032]      // 4: Diatrema & Kawah Jonggring Saloko
      ];

      const partNormals = [
        [0.84, 0.18, 0.52],       // 0: Dinding penampang kanan-depan
        [-0.42, 0.74, 0.52],      // 1: Lereng depan-kiri Semeru
        [0.68, 0.22, 0.70],       // 2: Kuadran irisan dalam dapur magma
        [0.80, 0.22, 0.55],       // 3: Kuadran irisan intrusi
        [0.15, 0.92, 0.35]        // 4: Puncak Kawah Jonggring Saloko
      ];

      const partAlphas = anchorLocal.map((pt, i) => {
        const off = this.getPartOffset(i);
        return this.getVisibilityAlpha([pt[0] + off[0], pt[1] + off[1], pt[2] + off[2]], partNormals[i]);
      });

      this.lastScreenAnchors = anchorLocal.map((pt, i) => {
        if (partAlphas[i] < 0.05) return null;
        const off = this.getPartOffset(i);
        return projectPoint3D([pt[0] + off[0], pt[1] + off[1], pt[2] + off[2]], mvp, w, h);
      });

      if (!this.showLabels) return;
      // Pada slide Intrusi (1) dan Batuan Beku (6), HUD spesifik sudah menampilkan label detail
      const mode = SLIDE_MODES[this.slideIndex].id;
      if ((mode === 'intrusi' || mode === 'batuan_manfaat') && !this.isExploded) return;

      const shortLabels = [
        'Batuan Dasar Kerak',
        'Lereng Semeru (3.676m)',
        'Dapur Magma & Batolit',
        'Intrusi (Lakolit & Sill)',
        'Kawah Jonggring Saloko'
      ];

      const items = [];
      this.lastScreenAnchors.forEach((sp, i) => {
        if (!sp || partAlphas[i] < 0.05) return;
        const d = PART_DATA[i];
        const isSel = this.selectedPart === i;
        items.push({
          sp,
          dy: i === 2 || i === 0 ? 18 : -18,
          text: shortLabels[i],
          bg: isSel ? '#5266eb' : 'rgba(23, 23, 33, 0.88)',
          fg: '#ffffff',
          dot: d.accent,
          dotR: isSel ? 5.8 : 4.4,
          alpha: partAlphas[i]
        });
      });

      this.drawResolvedBoxes(ctx, items);
    }

    drawPillTagList(ctx, items, mvp, w, h) {
      const projected = [];
      items.forEach(item => {
        const alpha = this.getVisibilityAlpha(item.pt, item.norm);
        if (alpha < 0.05) return;
        const sp = projectPoint3D(item.pt, mvp, w, h);
        if (!sp) return;
        projected.push({
          sp,
          dy: item.dy || -16,
          text: item.text,
          bg: item.bg,
          fg: '#ffffff',
          dot: item.dot || item.fg || '#5266eb',
          dotR: item.dotR || 4.4,
          alpha
        });
      });
      this.drawResolvedBoxes(ctx, projected);
    }

    drawResolvedBoxes(ctx, projected) {
      ctx.font = '400 11.5px "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
      const padX = 9;
      const dotSpace = 12;
      const bh = 22;
      const boxes = projected.map(item => {
        const tw = ctx.measureText(item.text).width;
        const bw = tw + padX * 2 + dotSpace;
        const bx = Math.max(6, Math.min(this.cssW - bw - 6, item.sp.x - bw / 2));
        const by = Math.max(44, Math.min(this.cssH - 80, item.sp.y + item.dy - bh / 2));
        return {
          ...item,
          bw,
          bh,
          bx,
          by
        };
      });

      // Resolusi tabrakan 2D antar-label (iterative relaxation)
      for (let iter = 0; iter < 6; iter++) {
        for (let i = 0; i < boxes.length; i++) {
          for (let j = i + 1; j < boxes.length; j++) {
            const a = boxes[i];
            const b = boxes[j];
            const ox = Math.min(a.bx + a.bw + 4, b.bx + b.bw + 4) - Math.max(a.bx, b.bx);
            const oy = Math.min(a.by + a.bh + 3, b.by + b.bh + 3) - Math.max(a.by, b.by);
            if (ox > 0 && oy > 0) {
              const pushY = (oy * 0.52) * (a.by <= b.by ? -1 : 1);
              a.by = Math.max(44, Math.min(this.cssH - 80, a.by + pushY));
              b.by = Math.max(44, Math.min(this.cssH - 80, b.by - pushY));
            }
          }
        }
      }

      // Gambar garis penghubung tipis & titik jangkar 3D terlebih dahulu
      boxes.forEach(b => {
        ctx.save();
        ctx.globalAlpha = b.alpha ?? 1.0;
        const cx = b.bx + b.bw / 2;
        const cy = b.by + b.bh / 2;
        const dist = Math.hypot(cx - b.sp.x, cy - b.sp.y);
        if (dist > 14) {
          ctx.strokeStyle = 'rgba(226, 227, 237, 0.35)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(b.sp.x, b.sp.y);
          ctx.lineTo(cx, cy);
          ctx.stroke();
        }
        ctx.fillStyle = b.dot;
        ctx.beginPath();
        ctx.arc(b.sp.x, b.sp.y, b.dotR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#171721';
        ctx.lineWidth = 1.6;
        ctx.stroke();
        ctx.restore();
      });

      // Gambar kapsul label (teks putih, dot berwarna di kiri)
      boxes.forEach(b => {
        ctx.save();
        ctx.globalAlpha = b.alpha ?? 1.0;
        const isActive = b.bg === '#5266eb' || b.bg === '#e4572e';
        ctx.fillStyle = isActive ? '#5266eb' : 'rgba(23, 23, 33, 0.88)';
        ctx.beginPath();
        ctx.roundRect(b.bx, b.by, b.bw, b.bh, 99);
        ctx.fill();
        ctx.strokeStyle = isActive ? 'rgba(255, 255, 255, 0.45)' : 'rgba(226, 227, 237, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = b.dot;
        ctx.beginPath();
        ctx.arc(b.bx + padX + 3.5, b.by + b.bh / 2, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.text, b.bx + padX + dotSpace, b.by + b.bh / 2 + 0.5);
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

      ctx.fillStyle = 'rgba(23, 23, 33, 0.88)';
      ctx.beginPath();
      ctx.roundRect(bx, by, bw, bh, 99);
      ctx.fill();
      ctx.strokeStyle = 'rgba(226, 227, 237, 0.2)';
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