/* ==========================================================================
   MODUL 2: 3D INTERAKTIF LEMPENG TEKTONIK (WebGL Geological Block Diorama + HUD)
   Mendukung:
   - Blok Geologi 3D Bertekstur Realistis (Kerak Benua SiAl, Kerak Samudra SiMa,
     Slab Subduksi, Pematang Tengah Samudra, Busur Gunung Api, Air Samudra Transparan,
     & Astenosfer Magma Berkonveksi)
   - Rotasi Orbit 3D 360° (Mouse Drag & Touch) + Zoom
   - Exploded View 3D ("Pisahkan" anatomi blok tektonik)
   - Klik Komponen 3D & Pil Pemilih Struktur Tektonik
   - Animasi Tersinkronisasi Otomatis dengan 5 Slide Modul 2:
     * Slide 1: Hipotesis Continental Drift Alfred Wegener (Pangaea & Fosil Purba)
     * Slide 2: Teori Tektonik Lempeng & 3 Gaya Penggerak (Konveksi, Slab Pull, Ridge Push)
     * Slide 3: Batas Konvergen & Tripel Lempeng Indonesia (Subduksi, Palung Sunda, Megathrust)
     * Slide 4: Batas Divergen & Pemekaran Kerak Samudra (Mid-Oceanic Ridge & Rift Valley)
     * Slide 5: Batas Transform & Sistem Sesar Geser (Sesar Semangko, Palu-Koro, Lembang)
   ========================================================================== */
(function () {
  const PART_DATA = [
    {
      id: 'astenosfer',
      index: 0,
      name: 'Astenosfer (Mantel Atas Plastis)',
      depth: '100 – 660 km',
      temp: '± 1.300 – 1.900 °C',
      state: 'Plastis / Semi-Cair (Konveksi Termal)',
      comp: 'Batuan Silikat (Olivin & Piroksen) Berpijar',
      density: '~3,3 – 3,9 g/cm³',
      accent: '#ff7b47',
      explodeVec: [0.0, -0.34, 0.0]
    },
    {
      id: 'lempeng-samudra',
      index: 1,
      name: 'Lempeng Samudra & Slab Subduksi',
      depth: '5 – 10 km (Kerak) · Litosfer ~80 km',
      temp: '0 – 1.100 °C',
      state: 'Padat Mafik Kaku (Menunjam / Slab Pull)',
      comp: 'Basalt & Gabro Kaya Silika-Magnesium (SiMa)',
      density: '~3,0 g/cm³ (Lebih Padat)',
      accent: '#38bdf8',
      explodeVec: [-0.28, 0.06, 0.0]
    },
    {
      id: 'lempeng-benua',
      index: 2,
      name: 'Lempeng Benua & Busur Vulkanik',
      depth: '30 – 70 km (Kerak) · Litosfer ~120 km',
      temp: '0 – 950 °C',
      state: 'Padat Felsik Apung (Buoyant)',
      comp: 'Granit & Andesit Kaya Silika-Aluminium (SiAl)',
      density: '~2,7 g/cm³ (Lebih Ringan)',
      accent: '#52b788',
      explodeVec: [0.28, 0.14, 0.0]
    },
    {
      id: 'magma-busur',
      index: 3,
      name: 'Diapir Magma & Zona Megathrust',
      depth: '80 – 160 km (Peleburan Sebagian)',
      temp: '± 1.150 – 1.400 °C',
      state: 'Lelehan Magma Andesitik & Pematang Basaltik',
      comp: 'Magma Hasil Dehidrasi Slab Subduksi & Upwelling Ridge',
      density: '~2,5 – 2,8 g/cm³ (Naik ke Kawah)',
      accent: '#f7c948',
      explodeVec: [0.08, 0.28, 0.18]
    },
    {
      id: 'samudra-palung',
      index: 4,
      name: 'Cekungan Samudra & Palung (Trench)',
      depth: '4 – 10 km (Palung Sunda ~7.200 m)',
      temp: '2 – 26 °C (Hidrosfer)',
      state: 'Cair (Perairan Samudra di Atas Kerak SiMa)',
      comp: 'Air Laut di Atas Pematang Tengah Samudra & Palung Subduksi',
      density: '~1,03 g/cm³',
      accent: '#4ea8de',
      explodeVec: [-0.20, 0.36, 0.0]
    }
  ];

  const SLIDE_MODES = [
    {
      id: 'wegener',
      modeInt: 0,
      badge: '🧩 Hipotesis Continental Drift (Pangaea 1912)',
      hint: 'Kesesuaian garis pantai Amerika Selatan–Afrika & bukti sabuk fosil Glossopteris–Mesosaurus.',
      targetYaw: 0.18,
      targetPitch: 0.48,
      targetZoom: 1.02,
      focusPart: null
    },
    {
      id: 'penggerak',
      modeInt: 1,
      badge: '⚡ 3 Gaya Penggerak Lempeng (Hess)',
      hint: 'Kombinasi Konveksi Mantel Termal, dorongan Ridge Push di pematang, dan tarikan Slab Pull di palung.',
      targetYaw: 0.24,
      targetPitch: 0.32,
      targetZoom: 1.04,
      focusPart: null
    },
    {
      id: 'konvergen',
      modeInt: 2,
      badge: '🌋 Batas Konvergen: Subduksi, Palung Sunda & Megathrust',
      hint: 'Lempeng Indo-Australia (SiMa) menunjam di bawah Lempeng Eurasia (SiAl), memicu gempa & busur gunung api.',
      targetYaw: 0.32,
      targetPitch: 0.28,
      targetZoom: 1.10,
      focusPart: null
    },
    {
      id: 'divergen',
      modeInt: 3,
      badge: '⛰️ Batas Divergen: Pemekaran Dasar Samudra (Spreading)',
      hint: 'Dua lempeng saling menjauh di Mid-Oceanic Ridge; magma astenosfer naik membentuk kerak samudra baru.',
      targetYaw: -0.28,
      targetPitch: 0.34,
      targetZoom: 1.12,
      focusPart: null
    },
    {
      id: 'transform',
      modeInt: 4,
      badge: '⚠️ Batas Transform: Sesar Geser (Strike-Slip)',
      hint: 'Dua blok lempeng bergeser mendatar berlawanan arah (Sesar Semangko, Palu-Koro, Lembang, San Andreas).',
      targetYaw: 0.08,
      targetPitch: 0.52,
      targetZoom: 1.08,
      focusPart: null
    }
  ];

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

  // Generator Blok Geologi 3D Berkontur (Top, Bottom & 4 Dinding Irisan dengan Normal Halus)
  function createGeologicalBlockMesh(xMin, xMax, zMin, zMax, nx, nz, evalY) {
    const positions = [];
    const normals = [];
    const uvs = [];
    const surfTypes = []; // 0 = top terrain, 1 = bottom, 2 = front/back wall (XY), 3 = left/right wall (YZ)
    const indices = [];

    const dx = (xMax - xMin) / nx;
    const dz = (zMax - zMin) / nz;

    // 1. Permukaan Atas (Top Terrain, surfType = 0)
    const baseTop = positions.length / 3;
    for (let iz = 0; iz <= nz; iz++) {
      const v = iz / nz;
      const z = zMin + v * (zMax - zMin);
      for (let ix = 0; ix <= nx; ix++) {
        const u = ix / nx;
        const x = xMin + u * (xMax - xMin);
        const { yTop } = evalY(x, z);
        const yR = evalY(x + dx * 0.5, z).yTop;
        const yL = evalY(x - dx * 0.5, z).yTop;
        const yF = evalY(x, z + dz * 0.5).yTop;
        const yB = evalY(x, z - dz * 0.5).yTop;
        const dydx = (yR - yL) / dx;
        const dydz = (yF - yB) / dz;
        const len = Math.hypot(-dydx, 1.0, -dydz) || 1.0;

        positions.push(x, yTop, z);
        normals.push(-dydx / len, 1.0 / len, -dydz / len);
        uvs.push(u, v);
        surfTypes.push(0);
      }
    }
    const strideX = nx + 1;
    for (let iz = 0; iz < nz; iz++) {
      for (let ix = 0; ix < nx; ix++) {
        const a = baseTop + iz * strideX + ix;
        const b = a + strideX;
        const c = a + 1;
        const d = b + 1;
        indices.push(a, b, c, c, b, d);
      }
    }

    // 2. Permukaan Bawah (Bottom Surface, surfType = 1)
    const baseBot = positions.length / 3;
    for (let iz = 0; iz <= nz; iz++) {
      const v = iz / nz;
      const z = zMin + v * (zMax - zMin);
      for (let ix = 0; ix <= nx; ix++) {
        const u = ix / nx;
        const x = xMin + u * (xMax - xMin);
        const { yBot } = evalY(x, z);
        positions.push(x, yBot, z);
        normals.push(0, -1, 0);
        uvs.push(u, v);
        surfTypes.push(1);
      }
    }
    for (let iz = 0; iz < nz; iz++) {
      for (let ix = 0; ix < nx; ix++) {
        const a = baseBot + iz * strideX + ix;
        const b = a + strideX;
        const c = a + 1;
        const d = b + 1;
        indices.push(a, c, b, c, d, b);
      }
    }

    // 3. Dinding Penampang Depan (z = zMax) & Belakang (z = zMin) -> surfType = 2
    const nyWall = 16;
    function addZWall(zVal, normZ, flip) {
      const base = positions.length / 3;
      for (let iy = 0; iy <= nyWall; iy++) {
        const v = iy / nyWall;
        for (let ix = 0; ix <= nx; ix++) {
          const u = ix / nx;
          const x = xMin + u * (xMax - xMin);
          const { yBot, yTop } = evalY(x, zVal);
          const y = yBot + v * (yTop - yBot);
          positions.push(x, y, zVal);
          normals.push(0, 0, normZ);
          uvs.push(u, v);
          surfTypes.push(2);
        }
      }
      for (let iy = 0; iy < nyWall; iy++) {
        for (let ix = 0; ix < nx; ix++) {
          const a = base + iy * strideX + ix;
          const b = a + strideX;
          const c = a + 1;
          const d = b + 1;
          if (!flip) indices.push(a, c, b, c, d, b);
          else indices.push(a, b, c, c, b, d);
        }
      }
    }
    addZWall(zMax, 1, false);
    addZWall(zMin, -1, true);

    // 4. Dinding Penampang Kiri (x = xMin) & Kanan (x = xMax) -> surfType = 3
    const strideZ = nz + 1;
    function addXWall(xVal, normX, flip) {
      const base = positions.length / 3;
      for (let iy = 0; iy <= nyWall; iy++) {
        const v = iy / nyWall;
        for (let iz = 0; iz <= nz; iz++) {
          const u = iz / nz;
          const z = zMin + u * (zMax - zMin);
          const { yBot, yTop } = evalY(xVal, z);
          const y = yBot + v * (yTop - yBot);
          positions.push(xVal, y, z);
          normals.push(normX, 0, 0);
          uvs.push(u, v);
          surfTypes.push(3);
        }
      }
      for (let iy = 0; iy < nyWall; iy++) {
        for (let iz = 0; iz < nz; iz++) {
          const a = base + iy * strideZ + iz;
          const b = a + strideZ;
          const c = a + 1;
          const d = b + 1;
          if (!flip) indices.push(a, c, b, c, d, b);
          else indices.push(a, b, c, c, b, d);
        }
      }
    }
    addXWall(xMin, -1, false);
    addXWall(xMax, 1, true);

    return {
      positions: new Float32Array(positions),
      normals: new Float32Array(normals),
      uvs: new Float32Array(uvs),
      surfTypes: new Float32Array(surfTypes),
      indices: new Uint16Array(indices)
    };
  }

  function mergeSubMeshes(list) {
    const positions = [];
    const normals = [];
    const uvs = [];
    const surfTypes = [];
    const indices = [];
    let offset = 0;
    for (let m = 0; m < list.length; m++) {
      const g = list[m];
      for (let i = 0; i < g.positions.length; i++) positions.push(g.positions[i]);
      for (let i = 0; i < g.normals.length; i++) normals.push(g.normals[i]);
      for (let i = 0; i < g.uvs.length; i++) uvs.push(g.uvs[i]);
      for (let i = 0; i < g.surfTypes.length; i++) surfTypes.push(g.surfTypes[i]);
      for (let i = 0; i < g.indices.length; i++) indices.push(g.indices[i] + offset);
      offset += g.positions.length / 3;
    }
    return {
      positions: new Float32Array(positions),
      normals: new Float32Array(normals),
      uvs: new Float32Array(uvs),
      surfTypes: new Float32Array(surfTypes),
      indices: new Uint16Array(indices)
    };
  }

  // Fungsi Geometri Presisi Lempeng Samudra Indo-Australia (SiMa + Mantel Litosferik)
  function evalOceanicLayer(x, z) {
    // 1. Pematang Tengah Samudra (Mid-Oceanic Ridge) di x = -0.82 dengan pergeseran sesar transform mikro
    const transformOffset = 0.025 * Math.tanh(z * 5.0);
    const dxRidge = x + 0.82 - transformOffset;
    const ridgeSwell = 0.148 * Math.exp(-(dxRidge * dxRidge) / 0.048);
    const axialRift  = -0.064 * Math.exp(-(dxRidge * dxRidge) / 0.0028);

    // 2. Perbukitan Abisal (Abyssal Hills) paralel pematang & Gunung Laut (Seamounts Wharton Basin)
    const abyssalHills = 0.008 * Math.sin(dxRidge * 44.0) * Math.exp(-(dxRidge * dxRidge) / 0.35);
    const sm1 = 0.048 * Math.exp(-((x + 0.42) * (x + 0.42) + (z - 0.32) * (z - 0.32)) / 0.0045);
    const sm2 = 0.042 * Math.exp(-((x + 0.28) * (x + 0.28) + (z + 0.38) * (z + 0.38)) / 0.0038);
    const microRough = 0.005 * Math.sin(x * 22.0 + z * 14.0) * Math.cos(z * 9.0);

    let yTop = -0.082 + ridgeSwell + axialRift + abyssalHills + sm1 + sm2 + microRough;

    // Ketebalan litosfer samudra menebal seiring bertambahnya umur (Half-Space Cooling: ~0.09 di Ridge -> 0.155 di Palung)
    const ageDist = Math.min(1.0, Math.abs(dxRidge) / 0.72);
    let thickness = 0.092 + 0.064 * Math.sqrt(ageDist);

    // 3. Penunjaman Slab Subduksi di timur Palung Sunda (x > -0.08 hingga x = 0.72)
    if (x > -0.08) {
      const t = (x + 0.08) / 0.80;
      const slabDrop = Math.pow(t, 1.38) * 0.51;
      yTop -= slabDrop;
      thickness = 0.148 * (1.0 - t * 0.08);
    }

    return {
      yBot: yTop - thickness,
      yTop
    };
  }

  // Fungsi Geometri Presisi Lempeng Benua Eurasia (Busur Sunda: Palung -> Prisma Akresi Mentawai -> Cekungan Muka -> Bukit Barisan & Sesar Semangko)
  const VOLCANO_CENTERS = [
    [0.64, -0.48, 0.34, 0.20],
    [0.64,  0.00, 0.39, 0.22],
    [0.64,  0.48, 0.33, 0.19]
  ];

  function evalContinentalLayer(x, z) {
    // Lengkungan halus garis pantai & palung mengikuti Busur Sunda
    const arcCurve = 0.025 * (z * z - 0.35);
    const xArc = x - arcCurve;

    // 1. Lereng Dalam Palung Sunda (xArc = -0.05 .. +0.08)
    const tRamp = Math.max(0.0, Math.min(1.0, (xArc + 0.05) / 0.52));
    let yTop = -0.155 + Math.pow(tRamp, 0.62) * 0.265;

    // 2. Busur Luar Non-Vulkanik / Prisma Akresi (Kepulauan Mentawai, Nias, Simeulue) di xArc ~ 0.13
    const dxMentawai = xArc - 0.13;
    const mentawaiIsl = 0.75 + 0.45 * Math.cos(z * 7.2);
    const accretionaryRidge = (0.068 * mentawaiIsl) * Math.exp(-(dxMentawai * dxMentawai) / 0.0052);
    // Lipatan imbrikasi punggungan prisma akresi
    const imbricateFolds = 0.011 * Math.sin((xArc - 0.02) * 58.0 + z * 4.0) * Math.exp(-Math.pow((xArc - 0.12) / 0.11, 2));

    // 3. Cekungan Muka Busur (Forearc Basin Mentawai) di xArc ~ 0.31
    const dxForearc = xArc - 0.31;
    const forearcBasin = -0.078 * Math.exp(-(dxForearc * dxForearc) / 0.011);

    // 4. Pegunungan Lipatan Bukit Barisan / Busur Magmatik Sunda di xArc ~ 0.64
    const dxBarisan = xArc - 0.64;
    const barisanRange = 0.115 * Math.exp(-(dxBarisan * dxBarisan) / 0.065);

    // 5. Lembah Patahan Sesar Besar Sumatra (Sesar Semangko - Pull-Apart Graben) di xArc ~ 0.76
    const dxSemangko = xArc - 0.76;
    const semangkoRift = -0.048 * Math.exp(-(dxSemangko * dxSemangko) / 0.0018);

    // 6. Dataran Rendah Belakang Busur (Back-Arc Basin Sumatra Timur / Laut Jawa) di xArc > 0.92
    const backArcSlope = xArc > 0.82 ? -0.052 * Math.pow(Math.min(1.0, (xArc - 0.82) / 0.52), 1.2) : 0.0;

    // 7. 3 Kerucut Stratovolcano Aktif dengan Jurang Barrancos Radial & Kawah Puncak
    let cones = 0.0;
    for (let i = 0; i < VOLCANO_CENTERS.length; i++) {
      const [vx, vz, vh, vr] = VOLCANO_CENTERS[i];
      const dx = x - vx;
      const dz = z - vz;
      const r = Math.hypot(dx, dz);
      if (r < vr * 1.65) {
        const phi = Math.atan2(dz, dx);
        const coneProfile = vh * Math.exp(-(r * r) / (vr * vr * 0.40));
        const barrancos = -0.016 * Math.pow(Math.sin(phi * 7.0 + i * 1.7), 2) * Math.exp(-Math.pow((r - vr * 0.52) / (vr * 0.36), 2));
        const craterRim = 0.018 * Math.exp(-Math.pow((r - 0.048) / 0.016, 2));
        const craterPit = r < 0.052 ? -0.072 * Math.cos((r / 0.052) * Math.PI * 0.5) : 0.0;
        cones += coneProfile + barrancos + craterRim + craterPit;
      }
    }

    const detailNoise =
      0.015 * Math.sin(x * 16.0 + z * 11.0) +
      0.009 * Math.cos(x * 27.0 - z * 19.0);

    yTop += accretionaryRidge + imbricateFolds + forearcBasin + barisanRange + semangkoRift + backArcSlope + cones + detailNoise * Math.min(1.0, tRamp * 1.4);

    // Batas Bawah Litosfer Benua:
    // Di zona kontak subduksi (x < 0.34), bagian bawah prisma akresi menempel tepat di atas bidang Slab Subduksi (+0.006) agar bebas Z-fighting!
    const slabTop = evalOceanicLayer(x, z).yTop + 0.006;
    // Akar litosfer benua menebal di bawah Pegunungan Bukit Barisan (Isostasi Airy: ~ -0.26)
    const isostaticRoot = -0.215 - 0.055 * Math.exp(-(dxBarisan * dxBarisan) / 0.14);
    const yBot = Math.max(slabTop, isostaticRoot);

    return {
      yBot: Math.min(yTop - 0.024, yBot),
      yTop
    };
  }

  // Generator Mesh Diapir Magma Flush, Dapur Magma Pematang & Zona Geser Megathrust (Part 3)
  function createMagmaPlumesMesh() {
    const subMeshes = [];

    // Helper: Pita Intrusi & Diapir Magma Flush pada Dinding Penampang Depan/Belakang (z = zWall)
    // surfType = 1 pada penampang tengah (Inti Magma Pijar), surfType = 0 pada tepi miring (Chilled Margin)
    function createFlushWallVein(pts2D, halfWidths, zWall, normZ) {
      const positions = [];
      const normals = [];
      const uvs = [];
      const surfTypes = [];
      const indices = [];
      const n = pts2D.length;
      const zFace = zWall + normZ * 0.005;
      const zBack = zWall - normZ * 0.012;

      for (let i = 0; i < n; i++) {
        const v = i / (n - 1);
        const [cx, cy] = pts2D[i];
        const pPrev = pts2D[Math.max(0, i - 1)];
        const pNext = pts2D[Math.min(n - 1, i + 1)];
        let tx = pNext[0] - pPrev[0];
        let ty = pNext[1] - pPrev[1];
        const tLen = Math.hypot(tx, ty) || 1.0;
        tx /= tLen;
        ty /= tLen;
        const nx = -ty;
        const ny = tx;
        const hw = halfWidths[i];

        // 4 simpul per baris: [0] tepi kiri dalam, [1] muka kiri, [2] muka kanan, [3] tepi kanan dalam
        positions.push(cx - nx * hw * 1.25, cy - ny * hw * 1.25, zBack);
        normals.push(-nx * 0.8, -ny * 0.8, normZ * 0.6);
        uvs.push(0.0, v);
        surfTypes.push(0);

        positions.push(cx - nx * hw, cy - ny * hw, zFace);
        normals.push(0, 0, normZ);
        uvs.push(0.25, v);
        surfTypes.push(1);

        positions.push(cx + nx * hw, cy + ny * hw, zFace);
        normals.push(0, 0, normZ);
        uvs.push(0.75, v);
        surfTypes.push(1);

        positions.push(cx + nx * hw * 1.25, cy + ny * hw * 1.25, zBack);
        normals.push(nx * 0.8, ny * 0.8, normZ * 0.6);
        uvs.push(1.0, v);
        surfTypes.push(0);
      }

      for (let i = 0; i < n - 1; i++) {
        const rowA = i * 4;
        const rowB = (i + 1) * 4;
        for (let k = 0; k < 3; k++) {
          const a = rowA + k;
          const b = rowA + k + 1;
          const c = rowB + k;
          const d = rowB + k + 1;
          if (normZ > 0) indices.push(a, b, c, b, d, c);
          else indices.push(a, c, b, b, c, d);
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

    // 1. Diapir Magma Utama & Dapur Magma Kerak Busur Sunda (Flush di Dinding Irisan Depan z = +0.84)
    const frontDiapirPts = [];
    const frontDiapirW = [];
    const frontTopY = evalContinentalLayer(0.64, 0.84).yTop - 0.008;
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const y = -0.35 + t * (frontTopY + 0.35);
      // Melengkung naik dari atas slab subduksi (x = 0.46) menuju sumbu gunung api (x = 0.64)
      const x = 0.46 + 0.18 * Math.pow(t, 0.65) + 0.012 * Math.sin(t * Math.PI * 2.0);
      // Menggembung membentuk Dapur Magma (Magma Chamber) di kedalaman kerak y ~ -0.14 (t ~ 0.38)
      const chamberBulge = 0.058 * Math.exp(-Math.pow((t - 0.36) / 0.16, 2));
      const baseBulge = 0.036 * Math.exp(-Math.pow(t / 0.18, 2));
      const conduitW = 0.016 * (1.0 - t * 0.35);
      frontDiapirPts.push([x, y]);
      frontDiapirW.push(conduitW + chamberBulge + baseBulge);
    }
    subMeshes.push(createFlushWallVein(frontDiapirPts, frontDiapirW, 0.84, 1));
    subMeshes.push(createFlushWallVein(frontDiapirPts, frontDiapirW, -0.84, -1));

    // 2. Diapir Peleburan Sebagian Kedua (Secondary Mantle Wedge Plume) & Intrusi Sill Mendatar di Penampang Depan
    const secPlumePts = [];
    const secPlumeW = [];
    for (let i = 0; i <= 14; i++) {
      const t = i / 14;
      const x = 0.34 + t * 0.14;
      const y = -0.24 + t * 0.13;
      const w = 0.026 * Math.sin(t * Math.PI) + 0.006 * (1.0 - t);
      secPlumePts.push([x, y]);
      secPlumeW.push(w);
    }
    subMeshes.push(createFlushWallVein(secPlumePts, secPlumeW, 0.84, 1));

    // Intrusi Sill Mendatar menyabang dari Dapur Magma Busur Sunda (x = 0.56 .. 0.82, y = -0.14)
    const sillPts = [];
    const sillW = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      const x = 0.58 + t * 0.24;
      const y = -0.135 + 0.008 * Math.sin(t * Math.PI * 2.0);
      sillPts.push([x, y]);
      sillW.push(0.015 * (1.0 - Math.pow(t, 1.5) * 0.85));
    }
    subMeshes.push(createFlushWallVein(sillPts, sillW, 0.84, 1));

    // 3. Pita Gesekan Sunda Megathrust & Dehidrasi Slab (Wadati-Benioff Shear Ribbon) di Dinding Depan
    const megaPts = [];
    const megaW = [];
    for (let i = 0; i <= 22; i++) {
      const t = i / 22;
      const x = -0.03 + t * 0.55;
      const y = evalOceanicLayer(x, 0.84).yTop + 0.003;
      const w = 0.012 * Math.sin(t * Math.PI) + 0.004;
      megaPts.push([x, y]);
      megaW.push(w);
    }
    subMeshes.push(createFlushWallVein(megaPts, megaW, 0.84, 1));

    // 4. Dapur Magma Pematang Tengah Samudra (Mid-Oceanic Ridge Axial Magma Chamber) Flush di x = -0.82
    const morPts = [];
    const morW = [];
    const morTopY = evalOceanicLayer(-0.82, 0.84).yTop - 0.003;
    for (let i = 0; i <= 16; i++) {
      const t = i / 16;
      const y = -0.25 + t * (morTopY + 0.25);
      const lensBulge = 0.068 * Math.exp(-Math.pow((t - 0.28) / 0.26, 2));
      const dikeNeck = 0.014 * (1.0 - t * 0.3);
      morPts.push([-0.82, y]);
      morW.push(dikeNeck + lensBulge);
    }
    subMeshes.push(createFlushWallVein(morPts, morW, 0.84, 1));
    subMeshes.push(createFlushWallVein(morPts, morW, -0.84, -1));

    // 5. Kantong & Pipa Diapir 3D Internal untuk ke-3 Gunung Api Busur Sunda (Tersimpan Rapi di Dalam Kerak & Muncul Saat Exploded View)
    function createInternalPlume3D(vx, vz) {
      const positions = [];
      const normals = [];
      const uvs = [];
      const surfTypes = [];
      const indices = [];
      const segs = 20;
      const rings = 18;
      const topY = evalContinentalLayer(vx, vz).yTop - 0.015;
      for (let i = 0; i <= rings; i++) {
        const v = i / rings;
        const cx = (vx - 0.14) + 0.14 * Math.pow(v, 0.65);
        const cy = -0.35 + v * (topY + 0.35);
        const cz = vz;
        const chamber = 0.052 * Math.exp(-Math.pow((v - 0.36) / 0.16, 2));
        const r = 0.018 * (1.0 - v * 0.25) + chamber;
        for (let j = 0; j <= segs; j++) {
          const u = j / segs;
          const phi = u * Math.PI * 2;
          const nx = Math.cos(phi);
          const nz = Math.sin(phi);
          positions.push(cx + r * nx, cy, cz + r * nz);
          normals.push(nx, 0.12, nz);
          uvs.push(u, v);
          surfTypes.push(1);
        }
      }
      const stride = segs + 1;
      for (let i = 0; i < rings; i++) {
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

    VOLCANO_CENTERS.forEach(([vx, vz]) => {
      subMeshes.push(createInternalPlume3D(vx, vz));
    });

    // Punggungan Magma Internal di Bawah Lembah Rift Mid-Oceanic Ridge (-0.83 .. +0.83)
    const ridgeSpine = createGeologicalBlockMesh(-0.86, -0.78, -0.83, 0.83, 8, 22, (x, z) => {
      const transformOffset = 0.025 * Math.tanh(z * 5.0);
      const dist = Math.abs(x + 0.82 - transformOffset) / 0.045;
      const peak = Math.max(0.0, 1.0 - dist * dist);
      const seaFloor = evalOceanicLayer(x, z).yTop;
      return {
        yBot: -0.24,
        yTop: Math.min(seaFloor - 0.004, -0.15 + peak * 0.13)
      };
    });
    subMeshes.push(ridgeSpine);

    return mergeSubMeshes(subMeshes);
  }

  // Fungsi Pembangunan Ke-5 Komponen Tektonik Tanpa Tumpang-Tindih (Zero Z-Fighting)
  function buildAllTectonicMeshes() {
    // 0. Astenosfer (Mantel Atas Plastis):
    // Terdiri atas (A) Astenosfer Bawah Slab & Samudra, serta (B) Baji Mantel (Mantle Wedge) di Atas Slab Subduksi
    const asthenoSubSlab = createGeologicalBlockMesh(-1.35, 0.72, -0.838, 0.838, 44, 24, (x, z) => {
      const slabBot = evalOceanicLayer(x, z).yBot;
      return {
        yBot: -0.76,
        yTop: Math.max(-0.74, slabBot - 0.005)
      };
    });

    const asthenoMantleWedge = createGeologicalBlockMesh(0.24, 1.35, -0.838, 0.838, 36, 24, (x, z) => {
      const contBot = evalContinentalLayer(x, z).yBot - 0.005;
      let wedgeBot = -0.76;
      if (x < 0.73) {
        const slabTop = evalOceanicLayer(x, z).yTop + 0.005;
        const blend = Math.max(0.0, Math.min(1.0, (x - 0.66) / 0.07));
        wedgeBot = slabTop * (1.0 - blend) + (-0.76) * blend;
      }
      return {
        yBot: Math.min(contBot - 0.012, wedgeBot),
        yTop: contBot
      };
    });
    const meshAstheno = mergeSubMeshes([asthenoSubSlab, asthenoMantleWedge]);

    // 1. Lempeng Samudra Indo-Australia (SiMa + Mantel Litosferik + Pematang Samudra + Slab Subduksi)
    const meshOceanic = createGeologicalBlockMesh(-1.35, 0.72, -0.84, 0.84, 68, 36, evalOceanicLayer);

    // 2. Lempeng Benua Eurasia (Prisma Akresi Mentawai + Cekungan Muka + Bukit Barisan + 3 Gunung Api + Sesar Semangko)
    const meshContinental = createGeologicalBlockMesh(-0.05, 1.35, -0.84, 0.84, 72, 40, evalContinentalLayer);

    // 3. Diapir Magma Subduksi Flush, Dapur Magma Pematang & Zona Sunda Megathrust
    const meshMagma = createMagmaPlumesMesh();

    // 4. Volume Air Samudra Transparan (Meliputi Samudra Hindia, Palung Sunda & Cekungan Muka Busur Mentawai)
    const meshOceanWater = createGeologicalBlockMesh(-1.35, 0.39, -0.836, 0.836, 48, 24, (x, z) => {
      const wave = 0.004 * Math.sin(x * 18.0 + z * 12.0);
      const seaFloor = x < -0.05 ? evalOceanicLayer(x, z).yTop : evalContinentalLayer(x, z).yTop;
      return {
        yBot: Math.min(-0.004, seaFloor + 0.002),
        yTop: 0.004 + wave
      };
    });

    return [meshAstheno, meshOceanic, meshContinental, meshMagma, meshOceanWater];
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

      // Animasi Dinamis Geometri Lempeng Berdasarkan Slide Aktif (uMode)
      if (uMode == 0) {
        // Slide 1: Continental Drift (Pangaea memisah & menyatu kembali secara periodik)
        float drift = (0.5 + 0.5 * sin(uTime * 0.9)) * 0.14;
        if (uPartIndex == 1) p.x -= drift;
        if (uPartIndex == 2 || uPartIndex == 3) {
          if (p.x > -0.20) p.x += drift;
          else p.x -= drift;
        }
      } else if (uMode == 3) {
        // Slide 4: Batas Divergen (Pemekaran lempeng saling menjauh dari pematang)
        float spread = sin(uTime * 1.4) * 0.042;
        if (uPartIndex == 1) {
          p.x += (p.x < -0.82 ? -abs(spread) : abs(spread));
        }
        if (uPartIndex == 2) {
          p.x += abs(spread) * 1.15;
        }
      } else if (uMode == 4) {
        // Slide 5: Batas Transform (Sesar Geser Mendatar / Strike-Slip sepanjang z = 0)
        float slip = sin(uTime * 1.65) * 0.13;
        if (uPartIndex == 1 || uPartIndex == 2 || uPartIndex == 4) {
          float side = smoothstep(-0.03, 0.03, p.z) * 2.0 - 1.0;
          p.x += side * slip;
          // Lembah patahan sesar lurus sepanjang garis z = 0
          float faultGroove = exp(-(p.z * p.z) / 0.0022);
          if (aSurfType < 0.5 && uPartIndex != 4) {
            p.y -= faultGroove * 0.052;
          }
        }
      }

      // Riak gelombang permukaan air laut pada Part 4
      if (uPartIndex == 4 && aSurfType < 0.5) {
        p.y += sin(p.x * 20.0 + uTime * 2.8) * 0.004 + cos(p.z * 15.0 - uTime * 2.2) * 0.003;
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

    // Perturbasi normal 3D analitik untuk detail mikro-relief pegunungan, lantai samudra & batuan irisan
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
      vec3 L1 = normalize(vec3(0.54, 0.80, 0.50));
      vec3 L2 = normalize(vec3(-0.66, 0.28, 0.64));
      vec3 L3 = normalize(vec3(0.10, -0.88, -0.42));

      float hC = fbm(vPos * 15.0);
      float hDetail = fbm(vPos * 44.0);
      float grain = noise(vPos * 92.0);
      float bumpStrength = (uPartIndex == 4) ? 0.016 : 0.048;
      vec3 N = perturbNormal(N_geom, vPos, 20.0, bumpStrength);

      float rim = pow(1.0 - max(dot(N_geom, V), 0.0), 2.6);

      vec3 baseCol = vec3(0.5);
      float emissive = 0.0;
      float specPower = 26.0;
      float specStrength = 0.16;
      float alpha = 1.0;
      float ao = 1.0;

      if (uPartIndex == 0) {
        // PART 0: ASTENOSFER PLASTIS & BAJI MANTEL BERKONVEKSI (Peridotit Silikat 1.300-1.900 C)
        vec3 flowCoord = vPos * 4.6 + vec3(-uTime * 0.24, sin(vPos.x * 2.8 + uTime * 0.55) * 0.38, 0.0);
        float w = fbm(flowCoord);
        float magma = fbm(flowCoord * 1.65 + vec3(w * 2.5));

        // Upwelling termal kuat di bawah Mid-Oceanic Ridge (x ~ -0.82) & Baji Mantel Subduksi (x ~ 0.48)
        float morPlume   = exp(-sqr((vPos.x + 0.82) / 0.30));
        float wedgePlume = 0.90 * exp(-sqr((vPos.x - 0.48) / 0.28)) * smoothstep(-0.55, -0.22, vPos.y);
        float depthHeat  = smoothstep(-0.22, -0.72, vPos.y) * 0.32;
        float temp = clamp(magma * 0.74 + morPlume * 0.36 + wedgePlume * 0.42 + depthHeat, 0.0, 1.0);

        // Tekstur matriks peridotit kristal gelap vs sel konveksi magma pijar
        vec3 cooledPeridotite = mix(vec3(0.20, 0.07, 0.05), vec3(0.34, 0.11, 0.06), grain);
        vec3 redMantle        = vec3(0.84, 0.22, 0.05);
        vec3 orangeConvect    = vec3(0.98, 0.54, 0.10);
        vec3 whiteHotCore     = vec3(1.0, 0.88, 0.36);

        baseCol = mix(cooledPeridotite, redMantle, smoothstep(0.16, 0.46, temp));
        baseCol = mix(baseCol, orangeConvect, smoothstep(0.46, 0.74, temp));
        baseCol = mix(baseCol, whiteHotCore, smoothstep(0.74, 0.94, temp));

        // Urat konveksi halus
        float vein = smoothstep(0.62, 0.86, magma);
        emissive = 0.24 + smoothstep(0.42, 0.90, temp) * 0.46 + vein * 0.14;
        specStrength = 0.28;
        ao = mix(0.76, 1.0, smoothstep(-0.76, -0.25, vPos.y));
      } else if (uPartIndex == 1) {
        // PART 1: LEMPENG SAMUDRA INDO-AUSTRALIA (Ofiolit SiMa: Sedimen Pelagis, Pillow Basalt, Gabro & Mantel Litosfer)
        float transformOffset = 0.025 * (smoothstep(-0.35, 0.35, vPos.z) * 2.0 - 1.0);
        float distFromRidge = abs(vPos.x + 0.82 - transformOffset);
        float conveyor = distFromRidge * 26.0 - uTime * 2.0;

        if (vSurfType < 0.5) {
          // === PERMUKAAN LANTAI SAMUDRA (ABYSSAL SEABED & MID-OCEANIC RIDGE) ===
          N = perturbNormal(N_geom, vPos, 28.0, 0.055);

          // Sabuk Anomali Paleomagnetik Simetris (Bukti Seafloor Spreading Vine-Matthews-Morley)
          float magStripes = smoothstep(-0.35, 0.35, sin(conveyor));
          // Ketebalan sedimen pelagis meningkat menjauhi pematang menuju Palung Sunda
          float sedimentCover = smoothstep(0.06, 0.55, distFromRidge);

          vec3 freshPillowBasalt = mix(vec3(0.09, 0.14, 0.20), vec3(0.15, 0.22, 0.30), hDetail);
          vec3 normalPolarityCol = mix(vec3(0.11, 0.22, 0.32), vec3(0.18, 0.31, 0.42), hC);
          vec3 revPolarityCol    = mix(vec3(0.16, 0.28, 0.38), vec3(0.24, 0.37, 0.47), hC);
          vec3 pelagicOoze       = mix(vec3(0.32, 0.36, 0.37), vec3(0.44, 0.43, 0.39), hC * 0.7 + grain * 0.3);

          baseCol = mix(normalPolarityCol, revPolarityCol, magStripes * 0.65);
          baseCol = mix(freshPillowBasalt, baseCol, smoothstep(0.02, 0.14, distFromRidge));
          baseCol = mix(baseCol, pelagicOoze, sedimentCover * 0.55);

          // Zona Rekahan Sesar Transform Samudra (Transform Fracture Zone) di sekitar z = 0
          float transformScar = exp(-sqr(vPos.z / 0.032)) * smoothstep(0.02, 0.45, distFromRidge);
          baseCol = mix(baseCol, vec3(0.07, 0.11, 0.16), transformScar * 0.65);

          // Celah Rekahan Lava Pijar Basaltik & Black Smoker di Lembah Rift Pematang (x ~ -0.82)
          float riftFissure = exp(-sqr((vPos.x + 0.82 - transformOffset) / 0.024));
          float lavaCrack = riftFissure * smoothstep(0.32, 0.68, fbm(vPos * 36.0 + vec3(0.0, uTime * 1.4, 0.0)));
          baseCol = mix(baseCol, vec3(0.12, 0.10, 0.12), riftFissure * 0.60);
          baseCol = mix(baseCol, vec3(1.0, 0.48, 0.08), lavaCrack * 0.92);
          emissive = lavaCrack * 0.78;

          // Metamorfisme Sekis Biru -> Eklogit & Dehidrasi Slab saat menunjam di bawah Busur Sunda (x > 0.02)
          if (vPos.x > 0.02) {
            float subDepth = smoothstep(0.02, 0.65, vPos.x);
            vec3 eclogiteSlab = mix(vec3(0.14, 0.24, 0.28), vec3(0.78, 0.28, 0.08), subDepth);
            baseCol = mix(baseCol, eclogiteSlab, subDepth * 0.72);
            emissive += subDepth * 0.32;
          }
          ao = mix(0.68, 1.0, clamp(N_geom.y * 0.8 + 0.25, 0.0, 1.0));
        } else {
          // === DINDING IRISAN PENAMPANG LITOSFER SAMUDRA (STRATIGRAFI OFIOLIT 4 LAPIS) ===
          N = perturbNormal(N_geom, vPos, 32.0, 0.058);
          float vLayer = vUV.y; // 0 = dasar litosfer, 1 = lantai samudra

          // 1. Mantel Litosferik Samudra (Harzburgit / Peridotit Ultramafik Hijau-Zaitun Gelap: vLayer 0.00 - 0.56)
          vec3 harzburgite = mix(vec3(0.14, 0.21, 0.16), vec3(0.24, 0.32, 0.23), hDetail * 0.7 + grain * 0.3);

          // 2. Kerak Samudra Bawah: Gabro Berlapis (Coarse Crystalline Gabbro: vLayer 0.56 - 0.76)
          float gabbroCrystal = step(0.58, grain);
          vec3 gabbroLayer = mix(vec3(0.18, 0.22, 0.28), vec3(0.30, 0.35, 0.42), gabbroCrystal * 0.65 + hC * 0.35);

          // 3. Kerak Samudra Atas: Kompleks Korok Lembar (Sheeted Dikes) & Pillow Basalt (vLayer 0.76 - 0.93)
          float dikeJoints = smoothstep(0.82, 0.98, abs(sin(vPos.x * 115.0 + hDetail * 2.0)));
          vec3 pillowBasalt = mix(vec3(0.11, 0.16, 0.23), vec3(0.20, 0.27, 0.35), hC);
          pillowBasalt *= (1.0 - dikeJoints * 0.35);

          // 4. Lapisan Tipis Sedimen Laut Dalam Pelagis di Puncak (vLayer 0.93 - 1.00)
          vec3 pelagicCap = mix(vec3(0.46, 0.42, 0.35), vec3(0.58, 0.53, 0.44), hDetail);

          baseCol = harzburgite;
          baseCol = mix(baseCol, gabbroLayer,  smoothstep(0.53, 0.59, vLayer));
          baseCol = mix(baseCol, pillowBasalt, smoothstep(0.74, 0.79, vLayer));
          baseCol = mix(baseCol, pelagicCap,   smoothstep(0.91, 0.95, vLayer));

          // Garis Diskontinuitas Moho Samudra (vLayer ~ 0.56)
          float mohoSeam = exp(-sqr((vLayer - 0.56) / 0.018));
          baseCol = mix(baseCol, vec3(0.06, 0.08, 0.09), mohoSeam * 0.55);

          // Pemanasan gesekan & peleburan tepi slab yang menunjam ke dalam astenosfer (x > 0.10)
          if (vPos.x > 0.10) {
            float slabHeat = smoothstep(0.10, 0.68, vPos.x);
            float rimHeat  = smoothstep(0.65, 0.98, vLayer) + (1.0 - smoothstep(0.0, 0.25, vLayer));
            baseCol = mix(baseCol, vec3(0.92, 0.34, 0.08), slabHeat * (0.35 + rimHeat * 0.35));
            emissive = slabHeat * (0.18 + rimHeat * 0.22);
          }
        }
        specStrength = 0.22;
      } else if (uPartIndex == 2) {
        // PART 2: LEMPENG BENUA EURASIA (PRISMA AKRESI MENTAWAI, CEKUNGAN MUKA, BUKIT BARISAN & SESAR SEMANGKO)
        float arcCurve = 0.025 * (vPos.z * vPos.z - 0.35);
        float xArc = vPos.x - arcCurve;
        float y = vPos.y;

        if (vSurfType < 0.5) {
          // === PERMUKAAN FISIOGRAFI BUSUR SUNDA INDONESIA ===
          N = perturbNormal(N_geom, vPos, 26.0, 0.056);
          vec2 satUV = vec2(fract(0.75 + vUV.x * 0.12), clamp(0.45 + vUV.y * 0.12, 0.01, 0.99));
          vec3 satSample = texture2D(uEarthTex, satUV).rgb;
          float slope = 1.0 - clamp(N_geom.y, 0.0, 1.0);
          float canopy = noise(vPos * 68.0);

          // Bioma & Fasies Batuan Permukaan:
          vec3 trenchSlopeMud  = mix(vec3(0.24, 0.29, 0.31), vec3(0.36, 0.39, 0.38), hC);
          vec3 coastalSand     = mix(vec3(0.72, 0.65, 0.49), vec3(0.82, 0.76, 0.60), grain);
          vec3 lowlandForest   = mix(vec3(0.12, 0.39, 0.16), vec3(0.25, 0.52, 0.22), hC * 0.6 + canopy * 0.4);
          vec3 montaneForest   = mix(vec3(0.08, 0.30, 0.13), vec3(0.18, 0.42, 0.18), canopy);
          vec3 subAlpineScrub  = mix(vec3(0.42, 0.37, 0.27), vec3(0.54, 0.47, 0.35), hC);
          vec3 andesiteCone    = mix(vec3(0.23, 0.22, 0.24), vec3(0.40, 0.37, 0.35), hDetail);
          vec3 cliffOutcrop    = mix(vec3(0.32, 0.28, 0.25), vec3(0.48, 0.41, 0.35), grain);

          float bioNoise = (hC - 0.5) * 0.032;
          baseCol = trenchSlopeMud;
          baseCol = mix(baseCol, coastalSand,    smoothstep(-0.018, 0.008, y));
          baseCol = mix(baseCol, lowlandForest,  smoothstep(0.006, 0.042, y + bioNoise));
          baseCol = mix(baseCol, montaneForest,  smoothstep(0.075, 0.175, y + bioNoise));
          baseCol = mix(baseCol, subAlpineScrub, smoothstep(0.195, 0.255, y + bioNoise));
          baseCol = mix(baseCol, andesiteCone,   smoothstep(0.255, 0.325, y + bioNoise));

          // Tebing batuan tersingkap pada lereng curam & dinding patahan Sesar Semangko
          float cliffMask = smoothstep(0.42, 0.68, slope);
          baseCol = mix(baseCol, cliffOutcrop, cliffMask * 0.68);
          baseCol = mix(baseCol, satSample * 1.10, 0.24 * smoothstep(-0.01, 0.05, y) * (1.0 - smoothstep(0.22, 0.32, y)));

          // Sungai Meander Belakang Busur (Back-Arc River: Sungai Musi / Batanghari) di xArc > 0.92
          if (xArc > 0.88) {
            float riverZ = 0.18 * sin((xArc - 0.88) * 9.5) + 0.06 * cos(xArc * 18.0);
            float dRiver = abs(vPos.z - riverZ);
            float riverMask = (1.0 - smoothstep(0.014, 0.032, dRiver)) * smoothstep(0.88, 0.96, xArc);
            baseCol = mix(baseCol, vec3(0.10, 0.46, 0.62), riverMask * 0.88);
            specStrength = mix(specStrength, 0.82, riverMask);
          }

          // Jejak Lembah Patahan Sesar Semangko (xArc ~ 0.76)
          float semangkoTrace = exp(-sqr((xArc - 0.76) / 0.028));
          baseCol = mix(baseCol, vec3(0.36, 0.30, 0.24), semangkoTrace * 0.45);

          // Kawah Puncak 3 Gunung Api Aktif (Belerang Solfatara + Kubah Lava Pijar)
          float dV1 = length(vec2(vPos.x - 0.64, vPos.z + 0.48));
          float dV2 = length(vec2(vPos.x - 0.64, vPos.z - 0.00));
          float dV3 = length(vec2(vPos.x - 0.64, vPos.z - 0.48));
          float dCrater = min(dV1, min(dV2, dV3));
          if (dCrater < 0.095) {
            float sulfurRing = (1.0 - smoothstep(0.042, 0.088, dCrater)) * smoothstep(0.022, 0.048, dCrater);
            baseCol = mix(baseCol, vec3(0.86, 0.78, 0.32), sulfurRing * 0.68);
            float lavaVent = 1.0 - smoothstep(0.015, 0.046, dCrater);
            baseCol = mix(baseCol, vec3(1.0, 0.48, 0.10), lavaVent * 0.92);
            emissive = lavaVent * 0.82;
          }

          // Sabuk Fosil Purba (Hijau Zamrud) khusus pada Slide 1 (Wegener)
          if (uMode == 0) {
            float fossilBelt = exp(-sqr((vPos.z + 0.12 - vPos.x * 0.25) / 0.085));
            baseCol = mix(baseCol, vec3(0.32, 0.92, 0.58), fossilBelt * 0.38);
          }

          // Jejak Patahan Sesar Geser Aktif pada Slide 5 (Transform)
          if (uMode == 4) {
            float faultLine = exp(-(vPos.z * vPos.z) / 0.0018);
            baseCol = mix(baseCol, vec3(0.92, 0.38, 0.16), faultLine * 0.72);
          }

          ao = mix(0.68, 1.0, clamp(N_geom.y * 0.82 + 0.24, 0.0, 1.0));
          specStrength = 0.10;
        } else {
          // === DINDING IRISAN PENAMPANG LEMPENG BENUA EURASIA & PRISMA AKRESI ===
          N = perturbNormal(N_geom, vPos, 30.0, 0.062);
          float vLayer = vUV.y;

          if (vPos.x < 0.32) {
            // (A) Zona Prisma Akresi (Accretionary Wedge): Lipatan & Sesar Naik Imbrikasi Sedimen Laut Terkikis!
            float thrustCoord = (vPos.x + 0.05) * 42.0 + vPos.y * 28.0 + hC * 3.5;
            float imbricate = sin(thrustCoord) * 0.5 + 0.5;
            float thrustFault = smoothstep(0.88, 0.98, abs(sin(thrustCoord * 0.5)));
            vec3 trenchTurbidite = mix(vec3(0.38, 0.34, 0.29), vec3(0.56, 0.48, 0.39), imbricate);
            trenchTurbidite = mix(trenchTurbidite, vec3(0.18, 0.16, 0.15), thrustFault * 0.65);
            baseCol = trenchTurbidite;
          } else {
            // (B) Litosfer Benua Utama (Stratigrafi 4 Lapis):
            // 1. Mantel Litosferik Benua (Peridotit Gelap: vLayer 0.00 - 0.28)
            vec3 contMantle = mix(vec3(0.20, 0.22, 0.19), vec3(0.30, 0.31, 0.27), hDetail);

            // 2. Kerak Benua Bawah (Granulit Mafik-Menengah: vLayer 0.28 - 0.54)
            vec3 lowerGranulite = mix(vec3(0.38, 0.31, 0.29), vec3(0.50, 0.41, 0.37), hC * 0.6 + grain * 0.4);

            // 3. Kerak Benua Atas Felsik (Batuan Granit & Gneis SiAl Kaya Kuarsa-Feldspar: vLayer 0.54 - 0.84)
            float feldspar = step(0.60, grain);
            vec3 sialGranite = mix(vec3(0.58, 0.46, 0.38), vec3(0.76, 0.63, 0.52), feldspar * 0.55 + hDetail * 0.45);

            // 4. Lapisan Sedimen & Endapan Vulkanik Terlipat di Bagian Atas (vLayer 0.84 - 1.00)
            float foldWave = sin(vPos.x * 18.0) * 0.025;
            float sedBeds = sin((vPos.y + foldWave) * 95.0 + hC * 3.0) * 0.5 + 0.5;
            vec3 upperSediment = mix(vec3(0.46, 0.38, 0.30), vec3(0.68, 0.57, 0.44), sedBeds);

            baseCol = contMantle;
            baseCol = mix(baseCol, lowerGranulite, smoothstep(0.25, 0.31, vLayer));
            baseCol = mix(baseCol, sialGranite,    smoothstep(0.51, 0.57, vLayer));
            baseCol = mix(baseCol, upperSediment,  smoothstep(0.82, 0.87, vLayer));

            // Diskontinuitas Moho Benua (vLayer ~ 0.28) & Diskontinuitas Conrad (vLayer ~ 0.54)
            float mohoLine = exp(-sqr((vLayer - 0.28) / 0.018));
            baseCol *= (1.0 - mohoLine * 0.42);
          }

          // Transisi halus antara Prisma Akresi (x < 0.32) dan Kerak Benua Utama
          if (vPos.x >= 0.24 && vPos.x < 0.36) {
            float tBlend = smoothstep(0.24, 0.36, vPos.x);
            float thrustCoord = (vPos.x + 0.05) * 42.0 + vPos.y * 28.0 + hC * 3.5;
            vec3 prismCol = mix(vec3(0.38, 0.34, 0.29), vec3(0.56, 0.48, 0.39), sin(thrustCoord) * 0.5 + 0.5);
            baseCol = mix(prismCol, baseCol, tBlend);
          }

          // Aureol Pemanasan Kontak di Sekitar Dapur Magma & Pipa Diapir Busur Sunda (x ~ 0.60)
          float dMagmaAxis = abs(vPos.x - 0.60);
          float crustHeat = exp(-sqr(dMagmaAxis / 0.14)) * (1.0 - smoothstep(-0.28, 0.18, vPos.y));
          baseCol = mix(baseCol, vec3(0.92, 0.38, 0.10), crustHeat * 0.55);
          emissive = crustHeat * 0.28;
          specStrength = 0.14;
        }
      } else if (uPartIndex == 3) {
        // PART 3: DIAPIR MAGMA SUBDUKSI FLUSH, DAPUR MAGMA PEMATANG & ZONA MEGATHRUST
        N = perturbNormal(N_geom, vPos, 28.0, 0.058);

        // Tepi Batuan Beku Dingin (Chilled Porphyry/Gabbro Margin) vs Inti Magma Pijar
        float phenocryst = step(0.66, grain);
        vec3 chilledMargin = mix(vec3(0.24, 0.18, 0.20), vec3(0.58, 0.44, 0.36), phenocryst * 0.65);

        vec3 flowVec = vec3(vPos.x * 11.0, vPos.y * 9.0 - uTime * 2.2, vPos.z * 11.0);
        float warp = fbm(flowVec);
        float magmaCore = fbm(flowVec * 1.45 + vec3(warp * 2.2));

        vec3 deepRed    = vec3(0.64, 0.14, 0.03);
        vec3 brightLava = vec3(0.98, 0.44, 0.08);
        vec3 whiteGold  = vec3(1.0, 0.90, 0.38);

        vec3 moltenCol = mix(deepRed, brightLava, smoothstep(0.20, 0.56, magmaCore));
        moltenCol = mix(moltenCol, whiteGold, smoothstep(0.56, 0.85, magmaCore));

        // Pada zona dehidrasi slab (x = 0.15 .. 0.42, y < -0.18), tampilkan aksen fluida hidrotermal berpendar
        float isDehydration = smoothstep(-0.02, 0.22, vPos.x) * (1.0 - smoothstep(0.32, 0.48, vPos.x)) * (1.0 - smoothstep(-0.28, -0.08, vPos.y));
        moltenCol = mix(moltenCol, vec3(1.0, 0.62, 0.18), isDehydration * 0.35);

        float edgeDist = abs(vUV.x - 0.5) * 2.0;
        float isRim = (vSurfType < 0.5) ? 0.68 : smoothstep(0.58, 0.94, edgeDist) * 0.52;
        float coreMask = clamp(1.0 - isRim + (magmaCore - 0.45) * 0.45, 0.0, 1.0);

        baseCol = mix(chilledMargin, moltenCol, coreMask);
        emissive = coreMask * (0.68 + 0.18 * sin(vPos.y * 16.0 - uTime * 3.8));
        specStrength = 0.46;
      } else {
        // PART 4: VOLUME AIR SAMUDRA TRANSPARAN (Batimetri Samudra Hindia, Palung Sunda & Cekungan Mentawai)
        float wave1 = fbm(vec3(vPos.x * 14.0 + uTime * 0.38, uTime * 0.25, vPos.z * 14.0 - uTime * 0.22));
        float wave2 = fbm(vec3(vPos.x * 28.0 - uTime * 0.45, uTime * 0.30, vPos.z * 28.0 + uTime * 0.35));
        float caustics = smoothstep(0.42, 0.78, wave1 * 0.6 + wave2 * 0.4);

        // Kedalaman batimetri menentukan warna air (Palung Sunda di x ~ -0.06 tampak biru-indigo pekat, Pematang & Pesisir tampak pirus-sian)
        float trenchDepth = exp(-sqr((vPos.x + 0.06) / 0.11));
        float ridgeShallow = exp(-sqr((vPos.x + 0.82) / 0.18));
        float coastalShallow = smoothstep(-0.02, 0.36, vPos.x);

        vec3 trenchAbyssCol = vec3(0.02, 0.13, 0.29);
        vec3 openOceanCol   = vec3(0.04, 0.28, 0.50);
        vec3 turquoiseShelf = vec3(0.11, 0.58, 0.74);

        baseCol = mix(openOceanCol, trenchAbyssCol, trenchDepth * 0.75);
        baseCol = mix(baseCol, turquoiseShelf, clamp(ridgeShallow * 0.48 + coastalShallow * 0.65, 0.0, 1.0));
        baseCol += vec3(0.16, 0.34, 0.42) * caustics * (vSurfType < 0.5 ? 0.35 : 0.15);

        // Buih ombak pantai (shoreline surf foam) di sekitar kepulauan Mentawai & pesisir Sumatra
        float foamZone = smoothstep(0.02, 0.38, vPos.x) * smoothstep(0.55, 0.82, wave2);
        baseCol = mix(baseCol, vec3(0.88, 0.96, 1.0), foamZone * 0.32);

        specStrength = 0.92;
        specPower = 72.0;
        emissive = 0.10;
        alpha = vSurfType < 0.5 ? mix(0.62, 0.74, trenchDepth) : 0.48;
      }

      // Pencahayaan 3-Titik (Matahari + Langit + Pantulan Termal Mantel)
      float diff1 = max(dot(N, L1), 0.0);
      float diff2 = max(dot(N, L2), 0.0) * 0.36;
      float diff3 = max(dot(N, L3), 0.0) * 0.18;
      vec3 H = normalize(L1 + V);
      float spec = pow(max(dot(N, H), 0.0), specPower) * specStrength;

      vec3 ambientCol = mix(vec3(0.20, 0.26, 0.34), vec3(0.32, 0.25, 0.20), clamp(0.5 - N.y * 0.5, 0.0, 1.0));
      vec3 lightSum = baseCol * (ambientCol + vec3(1.0, 0.97, 0.91) * diff1 * 0.72 + vec3(0.72, 0.85, 0.98) * diff2 + vec3(0.95, 0.52, 0.24) * diff3) * ao;
      lightSum += baseCol * emissive + vec3(1.0, 0.98, 0.92) * spec;

      if (uHighlight > 0.01) {
        lightSum = mix(lightSum, lightSum * 1.30 + vec3(0.22, 0.15, 0.04), uHighlight);
        lightSum += vec3(1.0, 0.78, 0.28) * rim * uHighlight * 0.75;
      }

      lightSum *= (1.0 - uDim * 0.45);
      lightSum = clamp(lightSum / (1.0 + lightSum * 0.12), 0.0, 1.0);
      gl_FragColor = vec4(lightSum, alpha);
    }
  `;

  function compileShader(gl, type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error('Tectonic3D Shader error:', gl.getShaderInfoLog(sh));
    }
    return sh;
  }

  class Tectonic3DViewer {
    constructor(cardEl, pageId) {
      this.cardEl = cardEl;
      this.pageId = pageId;
      this.yaw = 0.22;
      this.pitch = 0.36;
      this.zoom = 1.04;
      this.targetYaw = 0.22;
      this.targetPitch = 0.36;
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
      requestAnimationFrame(this.animate);
    }

    buildDOM() {
      this.wrap = document.createElement('div');
      this.wrap.className = 'earth3d-stage';
      this.wrap.innerHTML = `
        <canvas class="earth3d-gl" aria-label="Model 3D Interaktif Lempeng Tektonik"></canvas>
        <canvas class="earth3d-hud"></canvas>

        <!-- Banner Penjelasan Mode Animasi Slide -->
        <div class="earth3d-sim-banner">
          <b class="sim-title">🧩 Hipotesis Continental Drift (Pangaea 1912)</b>
          <span class="sim-sub">Putar blok tektonik 3D (drag) atau klik komponen lempeng untuk inspeksi.</span>
        </div>

        <!-- Kartu Detail Komponen Lempeng -->
        <div class="earth3d-layer-popup" style="display:none">
          <div class="lp-head">
            <span class="lp-dot"></span>
            <strong class="lp-name">Lempeng Samudra</strong>
            <button type="button" class="lp-close" aria-label="Tutup detail">✕</button>
          </div>
          <div class="lp-grid">
            <div><small>Ketebalan / Kedalaman</small><b class="lp-depth">-</b></div>
            <div><small>Temperatur</small><b class="lp-temp">-</b></div>
            <div><small>Wujud &amp; Dinamika</small><b class="lp-state">-</b></div>
            <div><small>Massa Jenis</small><b class="lp-dens">-</b></div>
          </div>
          <div class="lp-comp"></div>
        </div>

        <!-- Baris Pil Komponen & Tombol Kontrol Taktil -->
        <div class="earth3d-bottom-bar">
          <div class="earth3d-layer-pills" role="group" aria-label="Pilih Struktur Tektonik">
            ${['Astenosfer', 'Kerak Samudra', 'Kerak Benua', 'Diapir Magma', 'Palung Laut'].map(
              (shortTitle, idx) => `<button type="button" class="e3d-pill" data-part="${idx}">
                      <i style="background:${PART_DATA[idx].accent}"></i>${shortTitle}
                    </button>`
            ).join('')}
          </div>
          <div class="earth3d-ctrls">
            <button type="button" class="e3d-ctrl-btn active" data-action="play" title="Jeda / Mainkan Animasi">⏸ Jeda</button>
            <button type="button" class="e3d-ctrl-btn" data-action="explode" title="Pisahkan / Satukan Blok Lempeng">🧩 Pisahkan</button>
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

      // Inisialisasi tekstur permukaan bumi
      this.earthTex = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.earthTex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([38, 110, 52, 255]));

      if (window.EARTH_DAYMAP_DATA_URI) {
        const img = new Image();
        img.onload = () => {
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

      const rawMeshes = buildAllTectonicMeshes();
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
        this.targetPitch = Math.max(-0.45, Math.min(1.22, this.targetPitch + dy * 0.0085));
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
      requestAnimationFrame(this.animate);
      if (typeof now !== 'number') now = performance.now();
      const dt = Math.min(0.05, Math.max(0, (now - this.lastFrameTime) * 0.001));
      this.lastFrameTime = now;

      const pageEl = this.cardEl.closest('.page');
      if (pageEl && !pageEl.classList.contains('active')) return;
      if (!this.resizeIfNeeded()) return;

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

      const dist = 4.65 / this.zoom;
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
      mat4LookAt(eye, [0, -0.18, 0], [0, 1, 0], this._viewMat);
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

      // Gambar mesh solid terlebih dahulu (0..3), lalu mesh air samudra transparan (4)
      for (let i = 0; i < this.meshes.length; i++) {
        const m = this.meshes[i];
        const off = this.getPartOffset(i);
        const isSel = this.selectedPart === i;
        const isDimmed = this.selectedPart !== null && !isSel;

        if (i === 4) {
          gl.enable(gl.BLEND);
          gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
          gl.depthMask(false);
        } else {
          gl.disable(gl.BLEND);
          gl.depthMask(true);
        }

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

      gl.depthMask(true);
      gl.disable(gl.BLEND);
    }

    getVisibilityAlpha(pt3d, normalVec) {
      const eye = this.currentEye || [0, 1.5, 4.0];
      const eyeLen = Math.hypot(eye[0], eye[1], eye[2]) || 1;
      const eyNorm = eye[1] / eyeLen;

      // Sembunyikan jika pengguna memutar kamera melihat dari kolong bawah blok
      const bottomMin = this.isExploded ? -0.16 : -0.02;
      const bottomMax = this.isExploded ? 0.06 : 0.16;
      const bottomFactor = Math.max(0.0, Math.min(1.0, (eyNorm - bottomMin) / (bottomMax - bottomMin)));
      if (bottomFactor <= 0.01) return 0.0;

      const n = normalVec || (pt3d[2] >= 0.45 ? [0.0, 0.22, 0.97] : [0.0, 0.74, 0.67]);
      const vx = eye[0] - pt3d[0];
      const vy = eye[1] - pt3d[1];
      const vz = eye[2] - pt3d[2];
      const vLen = Math.hypot(vx, vy, vz) || 1;
      const nLen = Math.hypot(n[0], n[1], n[2]) || 1;
      const dot = (vx * n[0] + vy * n[1] + vz * n[2]) / (vLen * nLen);

      const minDot = this.isExploded ? 0.02 : 0.14;
      const maxDot = this.isExploded ? 0.26 : 0.38;
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

      this.pendingBoxes = [];
      const mode = SLIDE_MODES[this.slideIndex].id;

      if (mode === 'wegener') {
        this.drawWegenerDriftHUD(ctx, mvp, w, h);
      } else if (mode === 'penggerak') {
        this.drawDrivingForcesHUD(ctx, mvp, w, h);
      } else if (mode === 'konvergen') {
        this.drawConvergentSubductionHUD(ctx, mvp, w, h);
      } else if (mode === 'divergen') {
        this.drawDivergentRidgeHUD(ctx, mvp, w, h);
      } else if (mode === 'transform') {
        this.drawTransformFaultHUD(ctx, mvp, w, h);
      }

      this.drawPartLabels3D(ctx, mvp, w, h);
      this.flushResolvedBoxes(ctx);
      ctx.restore();
    }

    // Slide 1: Hipotesis Continental Drift Wegener (Pangaea & Sabuk Fosil)
    drawWegenerDriftHUD(ctx, mvp, w, h) {
      const topAlpha = this.getVisibilityAlpha([0, 0.2, 0], [0.0, 0.74, 0.67]);
      if (topAlpha < 0.05) return;

      const drift = (0.5 + 0.5 * Math.sin(this.simTime * 0.9)) * 0.14;
      const pLeft = projectPoint3D([-0.55 - drift, 0.14, 0.0], mvp, w, h);
      const pRight = projectPoint3D([0.55 + drift, 0.24, 0.0], mvp, w, h);

      if (pLeft && pRight) {
        ctx.save();
        ctx.globalAlpha = topAlpha;
        // Garis penghubung bukti sabuk fosil Glossopteris & Mesosaurus
        ctx.strokeStyle = 'rgba(82, 183, 136, 0.85)';
        ctx.lineWidth = 2.4;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(pLeft.x, pLeft.y);
        ctx.quadraticCurveTo((pLeft.x + pRight.x) * 0.5, Math.min(pLeft.y, pRight.y) - 36, pRight.x, pRight.y);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        this.drawPillTag(
          ctx,
          (pLeft.x + pRight.x) * 0.5,
          Math.min(pLeft.y, pRight.y) - 34,
          '🌿 Sabuk Fosil Glossopteris & Mesosaurus (Pangaea)',
          'rgba(14, 42, 58, 0.92)',
          '#74c69d',
          null,
          '#74c69d',
          4.2,
          topAlpha
        );
      }

      this.drawVectorArrow3D(ctx, mvp, w, h, [-0.24 - drift, 0.20, 0.08], [-0.74 - drift, 0.20, 0.08], '#38bdf8', '◄ Amerika Selatan');
      this.drawVectorArrow3D(ctx, mvp, w, h, [0.24 + drift, 0.26, 0.08], [0.74 + drift, 0.26, 0.08], '#f7c948', 'Afrika ►');
    }

    // Slide 2: 3 Mekanisme Penggerak Lempeng (Konveksi Termal, Ridge Push, Slab Pull)
    drawDrivingForcesHUD(ctx, mvp, w, h) {
      // 1. Ridge Push di lereng Mid-Oceanic Ridge
      this.drawVectorArrow3D(ctx, mvp, w, h, [-0.80, 0.04, 0.35], [-0.28, -0.03, 0.35], '#38bdf8', '② Ridge Push');

      // 2. Slab Pull pada lempeng samudra yang menunjam ke mantel
      this.drawVectorArrow3D(ctx, mvp, w, h, [0.10, -0.18, 0.52], [0.54, -0.50, 0.52], '#f7c948', '③ Slab Pull (Gravitasi)');

      // 3. Sel Arus Konveksi Termal di Astenosfer
      const frontAlpha = this.getVisibilityAlpha([-0.35, -0.52, 0.84], [0.0, 0.20, 0.98]);
      if (frontAlpha >= 0.05) {
        ctx.save();
        ctx.globalAlpha = frontAlpha;
        this.drawConvectionLoop3D(ctx, mvp, w, h, -0.35, -0.48, 0.84, 0.34, 0.13, 1);
        ctx.restore();
        const convPt = projectPoint3D([-0.35, -0.62, 0.84], mvp, w, h);
        if (convPt) {
          this.drawPillTag(ctx, convPt.x, convPt.y + 12, '① Arus Konveksi Termal Astenosfer', 'rgba(14,42,58,0.92)', '#ff7b47', convPt, '#ff7b47', 4.2, frontAlpha);
        }
      }
    }

    // Slide 3: Batas Konvergen (Subduksi, Palung Sunda, Busur Luar Mentawai, Megathrust & Busur Gunung Api)
    drawConvergentSubductionHUD(ctx, mvp, w, h) {
      this.drawVectorArrow3D(ctx, mvp, w, h, [-0.66, 0.03, 0.52], [-0.18, 0.01, 0.52], '#38bdf8', 'Lempeng Indo-Australia ➔');
      this.drawVectorArrow3D(ctx, mvp, w, h, [0.98, 0.20, 0.45], [0.52, 0.20, 0.45], '#52b788', '◄ Lempeng Eurasia');

      // Gelombang hiposenter gempa di Zona Sunda Megathrust
      const megaAlpha = this.getVisibilityAlpha([0.16, -0.17, 0.84], [0.0, 0.22, 0.97]);
      const megaPt = projectPoint3D([0.16, -0.17, 0.84], mvp, w, h);
      if (megaPt && megaAlpha >= 0.05) {
        ctx.save();
        ctx.globalAlpha = megaAlpha;
        const pulse = (this.simTime * 1.8) % 1.0;
        ctx.strokeStyle = `rgba(255, 90, 54, ${1.0 - pulse})`;
        ctx.lineWidth = 2.6;
        ctx.beginPath();
        ctx.arc(megaPt.x, megaPt.y, 6 + pulse * 26, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#ff5a36';
        ctx.beginPath();
        ctx.arc(megaPt.x, megaPt.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        this.drawPillTag(ctx, megaPt.x, megaPt.y + 24, '⚡ Zona Sunda Megathrust (Gempa & Tsunami)', 'rgba(14,42,58,0.92)', '#ff7b47', megaPt, '#ff5a36', 4.2, megaAlpha);
      }

      // Label Palung Sunda & Prisma Akresi Mentawai
      const topAlpha = this.getVisibilityAlpha([0.0, 0.0, -0.1], [0.0, 0.76, 0.65]);
      if (topAlpha >= 0.05) {
        const trenchPt = projectPoint3D([-0.06, -0.09, -0.32], mvp, w, h);
        if (trenchPt) {
          this.drawPillTag(ctx, trenchPt.x, trenchPt.y - 18, '🌊 Palung Sunda (~7.200 m)', 'rgba(9,27,38,0.92)', '#38bdf8', trenchPt, '#38bdf8', 4.2, topAlpha);
        }
        const prismPt = projectPoint3D([0.13, 0.04, 0.12], mvp, w, h);
        if (prismPt) {
          this.drawPillTag(ctx, prismPt.x, prismPt.y - 18, '🏝️ Prisma Akresi (Kep. Mentawai–Nias)', 'rgba(9,27,38,0.92)', '#a3e635', prismPt, '#a3e635', 4.2, topAlpha);
        }
      }
    }

    // Slide 4: Batas Divergen (Pemekaran Dasar Samudra / Mid-Oceanic Ridge)
    drawDivergentRidgeHUD(ctx, mvp, w, h) {
      this.drawVectorArrow3D(ctx, mvp, w, h, [-0.92, 0.06, 0.25], [-1.28, 0.06, 0.25], '#38bdf8', '◄ Lempeng Menjauh');
      this.drawVectorArrow3D(ctx, mvp, w, h, [-0.72, 0.06, 0.25], [-0.28, 0.06, 0.25], '#38bdf8', 'Lempeng Menjauh ►');

      // Panah naiknya magma astenosfer di celah rekahan
      this.drawVectorArrow3D(ctx, mvp, w, h, [-0.82, -0.52, 0.84], [-0.82, -0.04, 0.84], '#f7c948', '🔥 Upwelling Magma');

      const ridgeAlpha = this.getVisibilityAlpha([-0.82, 0.06, -0.28], [-0.2, 0.76, 0.62]);
      const ridgePt = projectPoint3D([-0.82, 0.06, -0.28], mvp, w, h);
      if (ridgePt && ridgeAlpha >= 0.05) {
        this.drawPillTag(ctx, ridgePt.x, ridgePt.y - 18, '⛰️ Mid-Oceanic Ridge & Lembah Rift', 'rgba(14,42,58,0.92)', '#f7c948', ridgePt, '#f7c948', 4.2, ridgeAlpha);
      }
    }

    // Slide 5: Batas Transform (Sesar Geser Mendatar / Strike-Slip)
    drawTransformFaultHUD(ctx, mvp, w, h) {
      this.drawVectorArrow3D(ctx, mvp, w, h, [-0.35, 0.22, 0.36], [0.35, 0.22, 0.36], '#f7c948', 'Blok Depan Bergeser ➔');
      this.drawVectorArrow3D(ctx, mvp, w, h, [0.35, 0.22, -0.36], [-0.35, 0.22, -0.36], '#38bdf8', '◄ Blok Belakang Bergeser');

      // Episentrum gempa dangkal di sepanjang garis patahan z = 0
      const faultAlpha = this.getVisibilityAlpha([0.15, 0.16, 0.0], [0.0, 0.78, 0.62]);
      const faultEpic = projectPoint3D([0.15, 0.16, 0.0], mvp, w, h);
      if (faultEpic && faultAlpha >= 0.05) {
        ctx.save();
        ctx.globalAlpha = faultAlpha;
        const pulse = (this.simTime * 2.0) % 1.0;
        ctx.strokeStyle = `rgba(247, 201, 72, ${1.0 - pulse})`;
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.arc(faultEpic.x, faultEpic.y, 5 + pulse * 24, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        this.drawPillTag(
          ctx,
          faultEpic.x,
          faultEpic.y - 24,
          '⚠️ Sesar Semangko · Palu-Koro · Lembang (Strike-Slip)',
          'rgba(14,42,58,0.92)',
          '#f7c948',
          faultEpic,
          '#f7c948',
          4.2,
          faultAlpha
        );
      }
    }

    drawVectorArrow3D(ctx, mvp, w, h, pStart, pEnd, color, label) {
      const mid3D = [(pStart[0] + pEnd[0]) * 0.5, (pStart[1] + pEnd[1]) * 0.5, (pStart[2] + pEnd[2]) * 0.5];
      const norm = mid3D[2] >= 0.45 ? [0.0, 0.28, 0.96] : [0.0, 0.76, 0.65];
      const alpha = this.getVisibilityAlpha(mid3D, norm);
      if (alpha < 0.05) return;

      const a = projectPoint3D(pStart, mvp, w, h);
      const b = projectPoint3D(pEnd, mvp, w, h);
      if (!a || !b) return;

      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const ang = Math.atan2(dy, dx);

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = 3.0;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();

      // Kepala panah
      const headLen = 10;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(b.x, b.y);
      ctx.lineTo(b.x - headLen * Math.cos(ang - 0.45), b.y - headLen * Math.sin(ang - 0.45));
      ctx.lineTo(b.x - headLen * Math.cos(ang + 0.45), b.y - headLen * Math.sin(ang + 0.45));
      ctx.closePath();
      ctx.fill();

      // Titik pulsa bergerak sepanjang vektor gaya
      const t = (this.simTime * 1.1) % 1.0;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(a.x + dx * t, a.y + dy * t, 3.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (label) {
        const mid = { x: (a.x + b.x) * 0.5, y: (a.y + b.y) * 0.5 };
        this.drawPillTag(ctx, mid.x, mid.y - 16, label, 'rgba(9, 27, 38, 0.90)', color, mid, color, 3.2, alpha);
      }
    }

    drawConvectionLoop3D(ctx, mvp, w, h, cx, cy, cz, rx, ry, dir) {
      const steps = 24;
      ctx.strokeStyle = 'rgba(255, 180, 60, 0.78)';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        const p = projectPoint3D([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry, cz], mvp, w, h);
        if (p) {
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
      }
      ctx.stroke();

      for (let k = 0; k < 3; k++) {
        const a = this.simTime * 2.0 * dir + (k * Math.PI * 2) / 3;
        const p = projectPoint3D([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry, cz], mvp, w, h);
        if (p) {
          ctx.fillStyle = Math.sin(a) > 0 ? '#fff3b0' : '#ff6b35';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    drawPartLabels3D(ctx, mvp, w, h) {
      if (!this.showLabels) return;

      const mode = SLIDE_MODES[this.slideIndex].id;
      // Pada slide tematik (Wegener, Penggerak, Transform), sembunyikan label geologi internal
      // agar tidak menumpuk dengan anotasi pergerakan lempeng, kecuali sedang diklik atau mode Exploded
      if (!this.isExploded && this.selectedPart === null) {
        if (mode === 'wegener' || mode === 'penggerak' || mode === 'transform') {
          return;
        }
      }

      const driftOffset = (mode === 'wegener') ? (0.5 + 0.5 * Math.sin(this.simTime * 0.9)) * 0.14 : 0.0;
      const anchorLocal = [
        [-0.35, -0.55, 0.84],                       // 0: Astenosfer (dinding penampang depan)
        [-0.82 - driftOffset, 0.04, 0.84],          // 1: Kerak Samudra (irisan depan)
        [0.64 + driftOffset, 0.44, 0.0],            // 2: Puncak Benua & Busur Api
        [0.55, -0.16, 0.84],                        // 3: Diapir Magma Subduksi (irisan depan)
        [-0.08, -0.12, 0.84]                        // 4: Palung Laut (irisan depan)
      ];

      const partNormals = [
        [0.0, 0.20, 0.98],        // 0: Dinding penampang depan astenosfer
        [0.0, 0.22, 0.97],        // 1: Irisan depan lempeng samudra
        [0.0, 0.78, 0.62],        // 2: Puncak busur gunung api
        [0.0, 0.22, 0.97],        // 3: Dinding penampang depan diapir magma
        [0.0, 0.74, 0.67]         // 4: Palung laut
      ];

      const partAlphas = anchorLocal.map((pt, i) => {
        const off = this.getPartOffset(i);
        const worldPt = [pt[0] + off[0], pt[1] + off[1], pt[2] + off[2]];
        return this.getVisibilityAlpha(worldPt, partNormals[i]);
      });

      this.lastScreenAnchors = anchorLocal.map((pt, i) => {
        if (partAlphas[i] < 0.05) return null;
        const off = this.getPartOffset(i);
        return projectPoint3D([pt[0] + off[0], pt[1] + off[1], pt[2] + off[2]], mvp, w, h);
      });

      const shortLabels = [
        'Astenosfer (Konveksi)',
        'Kerak Samudra (SiMa)',
        'Busur Gunung Api (SiAl)',
        'Diapir Magma Subduksi',
        'Samudra & Palung'
      ];

      this.lastScreenAnchors.forEach((sp, i) => {
        if (!sp || partAlphas[i] < 0.05) return;
        if (this.selectedPart !== null && this.selectedPart !== i && !this.isExploded) return;
        const d = PART_DATA[i];
        const isSel = this.selectedPart === i;
        const dy = (i === 0 || i === 3) ? 18 : -18;

        this.drawPillTag(
          ctx,
          sp.x,
          sp.y + dy,
          shortLabels[i],
          isSel ? '#5266eb' : 'rgba(23, 23, 33, 0.88)',
          '#ffffff',
          sp,
          d.accent,
          isSel ? 5.8 : 4.4,
          partAlphas[i]
        );
      });
    }

    drawPillTag(ctx, x, y, text, bg, fg, anchorPt = null, dotCol = null, dotR = 4.2, alpha = 1.0) {
      if (alpha < 0.05) return;
      if (!this.pendingBoxes) this.pendingBoxes = [];
      ctx.font = '400 11.5px "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
      const padX = 9;
      const dotSpace = 12;
      const tw = ctx.measureText(text).width;
      const bw = tw + padX * 2 + dotSpace;
      const bh = 22;
      const bx = Math.max(6, Math.min(this.cssW - bw - 6, x - bw / 2));
      const by = Math.max(44, Math.min(this.cssH - 80, y - bh / 2));
      this.pendingBoxes.push({
        text,
        bg,
        fg: '#ffffff',
        bw,
        bh,
        bx,
        by,
        sp: anchorPt || { x, y },
        hasDot: Boolean(anchorPt),
        dotCol: dotCol || fg || '#5266eb',
        dotR,
        alpha
      });
    }

    flushResolvedBoxes(ctx) {
      const boxes = this.pendingBoxes || [];
      if (!boxes.length) return;

      // Resolusi tabrakan 2D lintas seluruh label pada frame aktif
      for (let iter = 0; iter < 10; iter++) {
        for (let i = 0; i < boxes.length; i++) {
          for (let j = i + 1; j < boxes.length; j++) {
            const a = boxes[i];
            const b = boxes[j];
            const ox = Math.min(a.bx + a.bw + 6, b.bx + b.bw + 6) - Math.max(a.bx, b.bx);
            const oy = Math.min(a.by + a.bh + 5, b.by + b.bh + 5) - Math.max(a.by, b.by);
            if (ox > 0 && oy > 0) {
              const pushY = (oy * 0.55) * (a.by <= b.by ? -1 : 1);
              a.by = Math.max(44, Math.min(this.cssH - 80, a.by + pushY));
              b.by = Math.max(44, Math.min(this.cssH - 80, b.by - pushY));
              const pushX = (ox * 0.35) * (a.bx <= b.bx ? -1 : 1);
              a.bx = Math.max(6, Math.min(this.cssW - a.bw - 6, a.bx + pushX));
              b.bx = Math.max(6, Math.min(this.cssW - b.bw - 6, b.bx - pushX));
            }
          }
        }
      }

      ctx.font = '400 11.5px "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
      const padX = 9;
      const dotSpace = 12;

      // Gambar garis penghubung & titik jangkar 3D terlebih dahulu
      boxes.forEach(b => {
        if (!b.hasDot) return;
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
        ctx.fillStyle = b.dotCol;
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

        ctx.fillStyle = b.dotCol;
        ctx.beginPath();
        ctx.arc(b.bx + padX + 3.5, b.by + b.bh / 2, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.text, b.bx + padX + dotSpace, b.by + b.bh / 2 + 0.5);
        ctx.restore();
      });
    }
  }

  function initTectonic3DViewer() {
    const pageEl = document.getElementById('page-lempeng');
    if (!pageEl) return;
    const cardEl = pageEl.querySelector('.model-frame-card');
    if (!cardEl) return;
    window.earth3DViewers = window.earth3DViewers || {};
    window.earth3DViewers.lempeng = new Tectonic3DViewer(cardEl, 'lempeng');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTectonic3DViewer);
  } else {
    initTectonic3DViewer();
  }
})();
