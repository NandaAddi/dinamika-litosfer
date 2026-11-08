/* ==========================================================================
   MODUL 4 — 3D INTERAKTIF TENAGA ENDOGEN, STRUKTUR GEOLOGI & SIKLUS BATUAN
   WebGL 3D Cutaway Geological Block Diorama + Real-Time Deformation Shaders +
   2D HUD Overlay disinkronkan dengan 8 Slide Materi Modul 4:
   1. Dinamika Endogen: Epirogenesa (Positif/Negatif) & Orogenesa
   2. Deformasi Lipatan: Antiklin, Sinklin & Perangkap Migas (Kendeng/Bogor)
   3. Deformasi Patahan: Horst, Graben (Slank), Hanging/Footwall (Ngarai Sianok)
   4. Klasifikasi Sesar (Normal, Naik, Mendatar) & Variasi Lipatan Rebah
   5. Siklus Batuan (Rock Cycle): Magma → Beku → Sedimen → Metamorf
   6. Batuan Sedimen: Batu Gamping Karst (Sewu/Maros), Batu Pasir & Batu Bara
   7. Batuan Metamorf: Marmer (Tulungagung) & Batu Sabak (Slate)
   8. Tenaga Eksogen & Antropogenik: Delta Bengawan Solo & Land Subsidence Jakarta
   ========================================================================== */
/* ES Module Export */
  'use strict';

  const PART_DATA = [
    {
      index: 0,
      id: 'metamorf_basement',
      name: 'Batuan Dasar, Magma & Zona Metamorf (Marmer & Sabak)',
      depth: 'Kedalaman 5 – 25 km',
      temp: '300 – 1.100 °C',
      state: 'Metamorfisme Kontak & Regional (P-T Tinggi)',
      density: '2,7 – 3,0 g/cm³',
      comp: 'Zona bawah kerak tempat batuan gamping terubah menjadi Marmer (Campurdarat, Tulungagung) akibat panas intrusi magma (metamorfisme kontak), dan batu serpih lempung tertekan menjadi Batu Sabak (Slate) berlembar tipis.',
      dotColor: '#a855f7',
      accent: '#c084fc',
      explodeVec: [0.0, -0.44, 0.0],
      labelAnchor: [-0.55, -0.56, 0.84]
    },
    {
      index: 1,
      id: 'lipatan_antiklin',
      name: 'Zona Lipatan: Antiklin, Sinklin & Perangkap Migas',
      depth: 'Zona Kendeng & Antiklinorium Bogor',
      temp: 'Kompresi Tektonik Elastis',
      state: 'Punggung Antiklin (Cembung) & Lembah Sinklin (Cekung)',
      density: '2,3 – 2,6 g/cm³ (Sedimen Terlipat)',
      comp: 'Gaya tekan (kompresi) horizontal membengkokkan lapisan sedimen elastis tanpa patah. Puncak Antiklin di bawah batuan lempung kedap (Cap Rock) menjadi struktur perangkap (trap) Gas Bumi, Minyak Bumi, dan Air Formasi.',
      dotColor: '#f59e0b',
      accent: '#fbbf24',
      explodeVec: [-0.46, 0.14, 0.0],
      labelAnchor: [-0.88, 0.42, 0.40]
    },
    {
      index: 2,
      id: 'blok_horst',
      name: 'Blok Patahan Horst (Footwall) & Bukit Karst Gamping',
      depth: 'Gawir Sesar & Karst Pegunungan Sewu / Maros',
      temp: 'Dislokasi Getas (Brittle Faulting)',
      state: 'Blok Kerak Tinggi & Bentang Alam Karst CaCO₃',
      density: '2,5 – 2,7 g/cm³ (Batu Gamping & Pasir)',
      comp: 'Blok kerak (Footwall) yang tetap tinggi di antara bidang-bidang sesar turun, membentuk tebing Gawir Sesar (Fault Scarp) terjal. Di puncaknya berkembang morfologi bukit kerucut Karst Batu Gamping (CaCO₃) seperti di Gunungkidul & Maros.',
      dotColor: '#22c55e',
      accent: '#4ade80',
      explodeVec: [0.08, 0.36, -0.18],
      labelAnchor: [0.02, 0.42, 0.25]
    },
    {
      index: 3,
      id: 'blok_graben',
      name: 'Lembah Patahan Graben / Slank (Ngarai Sianok)',
      depth: 'Jalur Sesar Semangko — Bukittinggi',
      temp: 'Blok Hanging Wall Amblas Turun',
      state: 'Depresi Tektonik & Sisipan Batu Bara Tanjung Enim',
      density: '2,2 – 2,5 g/cm³ (Sedimen & Lapisan Batu Bara)',
      comp: 'Blok tengah (Hanging Wall) yang amblas turun di sepanjang bidang sesar akibat gaya tarikan (regangan), membentuk lembah patahan curam seperti Ngarai Sianok. Penampangnya menyingkap lapisan Batu Pasir dan Batu Bara.',
      dotColor: '#ef4444',
      accent: '#f87171',
      explodeVec: [0.18, -0.16, 0.38],
      labelAnchor: [0.48, 0.12, 0.48]
    },
    {
      index: 4,
      id: 'delta_subsidence',
      name: 'Delta Bengawan Solo & Pesisir Land Subsidence Jakarta',
      depth: 'Muara Laut Jawa (Amblesan 5 – 15 cm/thn)',
      temp: 'Proses Eksogen & Antropogenik',
      state: 'Progradasi Delta Sungai & Ekstraksi Air Tanah',
      density: '1,8 – 2,1 g/cm³ (Aluvial & Akuifer Pesisir)',
      comp: 'Perombakan permukaan oleh tenaga eksogen (pengendapan sedimen sungai yang memajukan Delta Bengawan Solo ke Laut Jawa) serta faktor antropogenik berupa penyedotan air tanah berlebihan dan beban gedung pemicu Land Subsidence di Jakarta & Semarang.',
      dotColor: '#38bdf8',
      accent: '#7dd3fc',
      explodeVec: [0.50, 0.12, 0.18],
      labelAnchor: [1.08, 0.10, 0.35]
    }
  ];

  const SLIDE_MODES = [
    {
      mode: 'epirogenesa_orogenesa',
      title: '🌐 Epirogenesa (Naik/Turun Benua) & Orogenesa (Pegunungan)',
      sub: 'Amati perbandingan gerak vertikal pantai yang luas (Epirogenesa) vs pelipatan & patahan pegunungan cepat (Orogenesa).',
      camYaw: -0.34,
      camPitch: 0.36,
      camZoom: 4.65
    },
    {
      mode: 'lipatan_migas',
      title: '⛰️ Lipatan Batuan (Antiklin & Sinklin) & Perangkap Migas',
      sub: 'Kompresi mendatar melipat batuan sedimen; Gas & Minyak Bumi terjebak di puncak Antiklin di bawah batuan penudung (Cap Rock).',
      camYaw: -0.22,
      camPitch: 0.32,
      camZoom: 4.50
    },
    {
      mode: 'horst_graben',
      title: '⚡ Patahan (Sesar): Horst, Graben & Ngarai Sianok',
      sub: 'Blok Hanging Wall amblas turun sepanjang bidang sesar membentuk lembah Graben (Ngarai Sianok) di antara dua tebing Horst.',
      camYaw: -0.32,
      camPitch: 0.35,
      camZoom: 4.55
    },
    {
      mode: 'klasifikasi_sesar_lipatan',
      title: '↕️ Sesar Normal, Sesar Naik, Mendatar & Lipatan Rebah',
      sub: 'Perhatikan siklus pergerakan Sesar Normal (turun), Sesar Naik (kompresi), Sesar Mendatar, serta kemiringan Lipatan Rebah.',
      camYaw: -0.36,
      camPitch: 0.36,
      camZoom: 4.65
    },
    {
      mode: 'siklus_batuan',
      title: '🔄 Siklus Batuan (Rock Cycle): Magma → Beku → Sedimen → Metamorf',
      sub: 'Daur transformasi berkelanjutan dari dapur magma, pembekuan, pelapukan-sedimentasi, metamorfisme P-T tinggi, hingga pelelehan.',
      camYaw: -0.26,
      camPitch: 0.32,
      camZoom: 4.65
    },
    {
      mode: 'batuan_sedimen',
      title: '🪨 Batuan Sedimen: Karst Gamping, Batu Pasir & Batu Bara',
      sub: 'Sorotan bukit Karst Batu Gamping (CaCO₃ Sewu & Maros), lapisan Batu Pasir kuarsa, dan endapan Batu Bara (Tanjung Enim).',
      camYaw: -0.30,
      camPitch: 0.34,
      camZoom: 4.55
    },
    {
      mode: 'batuan_metamorf',
      title: '💎 Batuan Metamorf: Marmer Tulungagung & Batu Sabak (Slate)',
      sub: 'Rekristalisasi batu gamping oleh panas magma menjadi Marmer (Tulungagung) dan metamorfisme serpih menjadi Batu Sabak.',
      camYaw: -0.22,
      camPitch: 0.28,
      camZoom: 4.55
    },
    {
      mode: 'eksogen_subsidence',
      title: '🌊 Delta Bengawan Solo & Land Subsidence Jakarta (5–15 cm/thn)',
      sub: 'Progradasi sedimen Delta Bengawan Solo ke Laut Jawa dan penurunan muka tanah pesisir akibat ekstraksi air tanah berlebih.',
      camYaw: -0.45,
      camPitch: 0.38,
      camZoom: 4.60
    }
  ];

  // =========================================================================
  // SHADER GLSL — GEOLOGICAL STRATIGRAPHY, ANTICLINAL MIGAS TRAP, FAULT PLANES,
  // COAL SEAM, KARST LIMESTONE, MARBLE & SLATE METAMORPHISM, & DELTA WATER
  // =========================================================================
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
    varying vec3 vRawPos;
    varying vec3 vNorm;
    varying vec2 vUV;
    varying float vSurfType;

    void main() {
      vec3 p = aPos;
      vec3 n = aNorm;

      // Animasi deformasi geologi real-time per slide
      if (uMode == 0) {
        // Slide 1: Orogenesa (pelipatan cepat di kiri) vs Epirogenesa (gerak vertikal lambat pesisir kanan)
        if (uPartIndex == 1) {
          float foldLift = 0.035 * sin(uTime * 2.2) * max(0.0, 1.0 - abs(p.x + 0.90) * 2.2);
          p.y += foldLift;
        } else if (uPartIndex == 4) {
          float epiro = 0.028 * sin(uTime * 1.3);
          p.y += epiro;
        }
      } else if (uMode == 1) {
        // Slide 2: Deformasi Lipatan Antiklin & Sinklin (kompresi elastis horizontal)
        if (uPartIndex == 1 && p.y > -0.32) {
          float comp = 0.5 + 0.5 * sin(uTime * 2.0);
          float arch = sin((p.x + 1.28) / 1.10 * 6.28318);
          p.y += 0.032 * comp * arch * ((p.y + 0.34) / 0.75);
        }
      } else if (uMode == 2) {
        // Slide 3: Patahan Horst & Graben (Hanging Wall amblas turun sepanjang bidang sesar 62 derajat)
        if (uPartIndex == 3) {
          float slip = 0.045 * (0.5 + 0.5 * sin(uTime * 2.0));
          p.y -= slip;
        }
      } else if (uMode == 3) {
        // Slide 4: Klasifikasi Sesar (Normal, Naik, Mendatar) & Lipatan Rebah (Recumbent Fold)
        float phase = mod(uTime * 0.45, 3.0);
        if (uPartIndex == 3) {
          if (phase < 1.0) {
            // Sesar Normal (turun)
            float s = sin(phase * 3.14159);
            p.y -= 0.055 * s;
          } else if (phase < 2.0) {
            // Sesar Naik / Reverse Fault (terdorong naik)
            float s = sin((phase - 1.0) * 3.14159);
            p.y += 0.065 * s;
          } else {
            // Sesar Mendatar / Strike-Slip (geser lateral Z)
            float s = sin((phase - 2.0) * 6.28318);
            p.z += 0.075 * s;
          }
        }
        if (uPartIndex == 1 && p.y > -0.30) {
          // Variasi Lipatan Miring / Rebah (Overturned / Recumbent lean)
          float lean = 0.14 * (0.5 + 0.5 * sin(uTime * 1.8)) * max(0.0, (p.y + 0.30) / 0.72);
          p.x += lean;
        }
      } else if (uMode == 7) {
        // Slide 8: Land Subsidence Jakarta & Semarang (penurunan muka tanah pesisir)
        if (uPartIndex == 4 && p.z < 0.10 && p.y > -0.15) {
          float sub = 0.042 * (0.5 + 0.5 * sin(uTime * 1.8));
          p.y -= sub;
        }
      }

      vRawPos = aPos;
      vPos = p;
      vNorm = n;
      vUV = aUV;
      vSurfType = aSurfType;

      vec3 worldPos = p + uOffset;
      gl_Position = uMVP * vec4(worldPos, 1.0);
    }
  `;

  const FRAG_SRC = `
    precision highp float;
    precision highp int;

    varying vec3 vPos;
    varying vec3 vRawPos;
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

    float sqr(float x) { return x * x; }

    float hash(vec3 p) {
      p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
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
            mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z
      );
    }

    float fbm(vec3 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 4; i++) {
        v += a * noise(p);
        p = p * 2.03 + vec3(11.3, 7.1, 5.7);
        a *= 0.5;
      }
      return v;
    }

    // Perturbasi Normal 3D Analitik untuk tekstur batuan & topografi mikro yang realistis
    vec3 perturbNormal(vec3 N, vec3 p, float scale, float strength) {
      float e = 0.014;
      float c  = fbm(p * scale);
      float dx = fbm((p + vec3(e, 0.0, 0.0)) * scale) - c;
      float dy = fbm((p + vec3(0.0, e, 0.0)) * scale) - c;
      float dz = fbm((p + vec3(0.0, 0.0, e)) * scale) - c;
      vec3 grad = vec3(dx, dy, dz) / e;
      grad -= N * dot(N, grad);
      return normalize(N - grad * strength);
    }

    // Fungsi elevasi struktural lapisan untuk penampang stratigrafi (Fold + Horst + Graben)
    float structuralBaseY(vec3 p, int partIdx) {
      if (partIdx == 1) {
        // Gelombang lipatan Antiklin (x = -0.90) & Sinklin (x = -0.44)
        float t = clamp((p.x + 1.30) / 1.12, 0.0, 1.0);
        float wave = 0.175 * sin(t * 6.28318 - 0.15);
        return p.y - wave;
      } else if (partIdx == 3) {
        // Blok Graben telah turun (offset patahan -0.20)
        return p.y + 0.20;
      } else if (partIdx == 2) {
        // Blok Horst tetap tinggi
        return p.y - 0.03;
      }
      return p.y;
    }

    void main() {
      vec3 N = normalize(vNorm);
      vec3 V = normalize(uEye - vPos);
      vec3 L1 = normalize(vec3(0.54, 0.78, 0.48));
      vec3 L2 = normalize(vec3(-0.62, 0.38, -0.48));

      float nVal = fbm(vRawPos * 6.5);
      float medGrain = fbm(vRawPos * 14.0 + vec3(nVal * 1.6));
      float fineGrain = fbm(vRawPos * 28.0);
      float microCrystal = noise(vRawPos * 58.0);

      // Sampel tekstur satelit Bumi untuk variasi warna vegetasi & permukaan alami
      vec2 satUV = fract(vec2((vRawPos.x + 1.35) * 0.18 + 0.76, (vRawPos.z + 0.85) * 0.22 + 0.48));
      vec3 satTex = texture2D(uEarthTex, satUV).rgb;

      vec3 col = vec3(0.5);
      float emissive = 0.0;
      float specStrength = 0.22;
      float specPower = 28.0;
      float ao = 1.0;
      float alpha = 1.0;

      // =========================================================
      // 0: BASEMENT KRISTALIN, DAPUR MAGMA & ZONA METAMORF (MARMER & SABAK)
      // =========================================================
      if (uPartIndex == 0) {
        N = perturbNormal(N, vRawPos * vec3(1.2, 1.8, 1.2), 11.0, 0.042);

        // Tekstur Batuan Dasar Granit-Gneiss Kristalin (Kuarsa putih, K-Feldspar merah muda, Biotit hitam)
        float biotite = smoothstep(0.58, 0.78, fineGrain);
        float feldspar = smoothstep(0.45, 0.75, medGrain);
        vec3 baseGranite = mix(vec3(0.30, 0.28, 0.32), vec3(0.56, 0.44, 0.42), feldspar * 0.65);
        baseGranite = mix(baseGranite, vec3(0.14, 0.13, 0.16), biotite * 0.65);
        baseGranite += vec3(0.08) * smoothstep(0.75, 0.95, microCrystal);

        // Dapur Magma / Intrusi Pluton dengan batas organik terdeformasi (domain-warped)
        vec2 mVec = vec2((vRawPos.x + 0.92) * 1.12, (vRawPos.y + 0.68) * 1.38);
        float distMagma = length(mVec) + (nVal - 0.5) * 0.085;

        // Zona 1: Inti Magma Silikat Pijar (dengan kerak pendinginan gelap & rekahan pijar)
        float magmaMask = 1.0 - smoothstep(0.28, 0.36, distMagma);
        // Zona 2: Aureole Metamorfisme Kontak -> MARMER (Campurdarat, Tulungagung)
        float marbleMask = smoothstep(0.28, 0.35, distMagma) * (1.0 - smoothstep(0.52, 0.64, distMagma));
        // Zona 3: Metamorfisme Regional Tekanan Tinggi -> BATU SABAK (SLATE) berfoliasi
        float slateMask = (1.0 - smoothstep(0.18, 0.42, vRawPos.x)) * smoothstep(-0.66, -0.54, vRawPos.y) * (1.0 - magmaMask) * (1.0 - marbleMask * 0.85);

        // Hitung tekstur Marmer Tulungagung (urat kalsit putih-gading, rose-quartz & emas)
        float warpVein = fbm(vRawPos * 12.0 + vec3(nVal * 2.8));
        float vein1 = abs(sin((vRawPos.x * 18.0 + vRawPos.y * 14.0) + warpVein * 6.5));
        float vein2 = abs(cos((vRawPos.x * 32.0 - vRawPos.y * 22.0) + fineGrain * 4.0));
        vec3 marbleMatrix = mix(vec3(0.94, 0.92, 0.88), vec3(0.84, 0.78, 0.75), medGrain);
        vec3 roseVein = vec3(0.68, 0.46, 0.52);
        vec3 goldVein = vec3(0.76, 0.62, 0.38);
        vec3 marbleCol = mix(roseVein, marbleMatrix, smoothstep(0.04, 0.28, vein1));
        marbleCol = mix(goldVein, marbleCol, smoothstep(0.03, 0.18, vein2));
        marbleCol += vec3(0.10) * smoothstep(0.72, 0.96, microCrystal);

        // Hitung tekstur Batu Sabak / Slate (foliasi Slaty Cleavage berlapis tipis & kilap mika)
        float slatyCleavage = 0.5 + 0.5 * sin((vRawPos.y * 1.1 + vRawPos.x * 0.28) * 105.0 + medGrain * 4.5);
        vec3 slateCol = mix(vec3(0.20, 0.23, 0.30), vec3(0.44, 0.48, 0.57), slatyCleavage);
        slateCol = mix(slateCol, vec3(0.54, 0.48, 0.66), 0.25 * fineGrain);

        // Hitung tekstur Magma Pijar
        vec3 mCoord = vRawPos * 8.5 - vec3(0.0, uTime * 0.55, uTime * 0.25);
        float mFlow = fbm(mCoord + vec3(fbm(mCoord)));
        vec3 magmaCol = mix(vec3(0.32, 0.06, 0.02), vec3(0.92, 0.26, 0.04), smoothstep(0.20, 0.58, mFlow));
        magmaCol = mix(magmaCol, vec3(1.0, 0.84, 0.28), smoothstep(0.55, 0.85, mFlow + (0.34 - distMagma) * 0.8));

        col = baseGranite;
        col = mix(col, slateCol, clamp(slateMask, 0.0, 1.0));
        col = mix(col, marbleCol, clamp(marbleMask, 0.0, 1.0));
        col = mix(col, magmaCol, clamp(magmaMask, 0.0, 1.0));

        emissive = magmaMask * (0.65 + 0.20 * sin(uTime * 2.8));
        if (uMode == 6 || uMode == 4) {
          emissive += marbleMask * (0.22 + 0.10 * sin(uTime * 3.4));
          emissive += slateMask * 0.16;
        }
        specStrength = mix(0.25, 0.58, marbleMask + slateMask * 0.5);
        specPower = 42.0;
      }

      // =========================================================
      // 1, 2, 3: PENAMPANG STRATIGRAFI LIPATAN (PART 1), HORST (PART 2) & GRABEN (PART 3)
      // =========================================================
      else if (uPartIndex == 1 || uPartIndex == 2 || uPartIndex == 3) {
        bool isTopSurface = (vSurfType > 0.5 && vSurfType < 1.5);
        bool isFaultScarp = (vSurfType > 2.5 && vSurfType < 3.5);
        bool isDerrick    = (vSurfType > 3.5 && vSurfType < 4.5);

        if (isDerrick) {
          // Menara Eksplorasi Migas (Derrick) di puncak Antiklin
          float truss = step(0.35, abs(sin(vRawPos.y * 95.0))) + step(0.35, abs(cos(vRawPos.x * 95.0)));
          col = mix(vec3(0.78, 0.22, 0.10), vec3(0.92, 0.86, 0.78), clamp(truss * 0.4, 0.0, 1.0));
          emissive = 0.22;
          specStrength = 0.45;
        } else if (isTopSurface) {
          // Perturbasi normal mikro untuk kanopi hutan tropis, tebing gamping karst, & lembah sungai
          N = perturbNormal(N, vRawPos, 16.0, 0.055);
          float slope = 1.0 - max(0.0, N.y);

          if (uPartIndex == 3) {
            // Dasar Lembah Graben Ngarai Sianok + Sungai Batang Sianok Berkelok + Gosong Pasir (Sandbar)
            float riverCenter = 0.49 + 0.055 * sin(vRawPos.z * 5.0) + 0.015 * cos(vRawPos.z * 11.0);
            float riverDist = abs(vRawPos.x - riverCenter);

            if (riverDist < 0.036) {
              // Air Sungai Batang Sianok dengan riak arus & pantulan langit
              float ripple = fbm(vec3(vRawPos.x * 35.0, vRawPos.z * 28.0 - uTime * 3.2, uTime * 0.5));
              col = mix(vec3(0.06, 0.42, 0.66), vec3(0.42, 0.80, 0.94), ripple * 0.75 + 0.25 * (1.0 - riverDist / 0.036));
              specStrength = 0.85;
              specPower = 64.0;
              emissive = 0.14;
            } else if (riverDist < 0.058) {
              // Gosong pasir & kerikil sungai (Point bar gravel & alluvial sand)
              vec3 sandBar = mix(vec3(0.76, 0.68, 0.52), vec3(0.58, 0.52, 0.40), fineGrain);
              vec3 bankGrass = mix(vec3(0.20, 0.46, 0.18), satTex * 0.9, 0.35);
              col = mix(sandBar, bankGrass, smoothstep(0.036, 0.058, riverDist));
              specStrength = 0.15;
            } else {
              // Sawah & Hutan Lembah Ngarai Sianok
              vec3 paddyGreen = mix(vec3(0.24, 0.52, 0.20), vec3(0.14, 0.38, 0.15), medGrain);
              paddyGreen = mix(paddyGreen, satTex * vec3(0.85, 1.15, 0.80), 0.32);
              // Bayangan Ambient Occlusion di kaki tebing Gawir Sesar kiri & kanan
              float wallAO = smoothstep(0.21, 0.30, vRawPos.x) * smoothstep(0.77, 0.68, vRawPos.x);
              col = paddyGreen;
              ao = 0.62 + 0.38 * wallAO;
            }
          } else if (uPartIndex == 2) {
            // Permukaan Atas Horst & Bukit-Bukit Kerucut Karst (Sinoid Karst Gunung Sewu & Maros)
            float hKarst = clamp((vRawPos.y - 0.32) / 0.14, 0.0, 1.0);
            vec3 tropicalCanopy = mix(vec3(0.14, 0.40, 0.16), vec3(0.28, 0.54, 0.22), medGrain);
            tropicalCanopy = mix(tropicalCanopy, satTex * vec3(0.85, 1.15, 0.80), 0.35);

            // Singkapan Batu Gamping Putih-Keabuan (CaCO3) pada lereng curam & puncak bukit kerucut Karst
            vec3 karstLimestone = mix(vec3(0.78, 0.76, 0.70), vec3(0.55, 0.54, 0.48), fineGrain);
            float grike = smoothstep(0.42, 0.58, abs(sin(vRawPos.x * 48.0 + nVal * 5.0)));
            karstLimestone *= (0.85 + 0.15 * grike);

            float rockExposure = clamp(slope * 2.1 + smoothstep(0.35, 0.88, hKarst) * 0.65, 0.0, 1.0);
            col = mix(tropicalCanopy, karstLimestone, rockExposure);
            if (uMode == 5 && hKarst > 0.15) {
              col = mix(col, vec3(0.95, 0.90, 0.72), 0.28 + 0.12 * sin(uTime * 3.5));
              emissive = 0.18;
            }
            specStrength = mix(0.12, 0.34, rockExposure);
          } else {
            // Permukaan Atas Zona Lipatan (Punggung Antiklin & Lembah Sinklin)
            float hNorm = clamp((vRawPos.y - 0.04) / 0.38, 0.0, 1.0);
            vec3 synclineForest = mix(vec3(0.12, 0.38, 0.15), vec3(0.24, 0.50, 0.20), medGrain);
            vec3 anticlineRidge = mix(vec3(0.26, 0.52, 0.22), vec3(0.46, 0.48, 0.28), fineGrain);
            vec3 exposedSandstone = mix(vec3(0.68, 0.56, 0.38), vec3(0.52, 0.42, 0.28), fineGrain);

            col = mix(synclineForest, anticlineRidge, smoothstep(0.0, 0.68, hNorm));
            col = mix(col, satTex * vec3(0.9, 1.15, 0.85), 0.28);
            col = mix(col, exposedSandstone, clamp(slope * 1.8 + smoothstep(0.72, 0.98, hNorm) * 0.5, 0.0, 1.0));

            // Lembah Sinklin sedikit lebih teduh (AO)
            ao = 0.78 + 0.22 * smoothstep(0.0, 0.35, hNorm);
          }
        } else {
          // =================================================================
          // DINDING PENAMPANG STRATIGRAFI BAWAH PERMUKAAN & GAWIR SESAR
          // =================================================================
          N = perturbNormal(N, vRawPos * vec3(1.5, 2.8, 1.5), 14.0, isFaultScarp ? 0.068 : 0.045);

          // Elevasi struktural dengan sedikit ketidakteraturan sedimen alami
          float sY = structuralBaseY(vRawPos, uPartIndex) + (nVal - 0.5) * 0.008;

          // 1. Lapisan Konglomerat & Breksi Dasar (sY < -0.21)
          float pebbles = smoothstep(0.45, 0.72, noise(vRawPos * vec3(28.0, 34.0, 28.0)));
          vec3 conglomerateCol = mix(vec3(0.42, 0.24, 0.16), vec3(0.64, 0.44, 0.30), pebbles);
          conglomerateCol = mix(conglomerateCol, vec3(0.28, 0.16, 0.12), fineGrain * 0.45);

          // 2. Lapisan Batu Bara Antrasit/Bituminus (sY: -0.21 s/d -0.135) — Tanjung Enim & Kaltim
          float coalBands = 0.5 + 0.5 * sin(sY * 420.0 + fineGrain * 3.0);
          float cleatFracture = step(0.86, abs(sin(vRawPos.x * 90.0 + fineGrain * 4.0)));
          vec3 coalCol = mix(vec3(0.05, 0.06, 0.08), vec3(0.16, 0.18, 0.22), coalBands);
          coalCol += vec3(0.22, 0.18, 0.10) * cleatFracture * 0.5;

          // 3. Lapisan Batu Pasir Kuarsa Berpori (sY: -0.135 s/d +0.005) — Reservoir Migas
          float crossBed = 0.5 + 0.5 * sin((sY * 160.0 + vRawPos.x * 38.0) + medGrain * 2.5);
          vec3 sandstoneCol = mix(vec3(0.76, 0.58, 0.28), vec3(0.92, 0.76, 0.44), crossBed * 0.7 + fineGrain * 0.3);
          sandstoneCol += vec3(0.10) * smoothstep(0.70, 0.95, microCrystal);

          // PERANGKAP MIGAS ANTIKLIN (Anticlinal Trap) — Berdasarkan Hukum Buoyancy Fluida (Horisontal di Y)!
          // Hanya terjadi di dalam Lapisan Reservoir Batu Pasir pada kubah Antiklin (uPartIndex == 1, sekitar x = -0.90)
          float archMask = smoothstep(-1.24, -1.04, vRawPos.x) * (1.0 - smoothstep(-0.76, -0.56, vRawPos.x));
          if (uPartIndex == 1 && archMask > 0.01) {
            // Kontak fluida mendatar (Gas-Oil Contact di y = 0.018, Oil-Water Contact di y = -0.042)
            float gasZone   = smoothstep(0.012, 0.026, vRawPos.y);
            float oilZone   = smoothstep(-0.046, -0.032, vRawPos.y) * (1.0 - gasZone);
            float brineZone = smoothstep(-0.105, -0.085, vRawPos.y) * (1.0 - smoothstep(-0.046, -0.032, vRawPos.y));

            vec3 gasCol   = mix(vec3(0.92, 0.24, 0.08), vec3(1.0, 0.62, 0.18), 0.5 + 0.5 * sin(uTime * 3.2 + fineGrain * 3.0));
            vec3 oilCol   = mix(vec3(0.10, 0.18, 0.08), vec3(0.48, 0.38, 0.10), 0.5 + 0.5 * sin(sY * 140.0));
            vec3 brineCol = mix(sandstoneCol, vec3(0.12, 0.48, 0.76), 0.72);

            vec3 trapCol = sandstoneCol;
            trapCol = mix(trapCol, brineCol, brineZone);
            trapCol = mix(trapCol, oilCol, oilZone);
            trapCol = mix(trapCol, gasCol, gasZone);

            sandstoneCol = mix(sandstoneCol, trapCol, archMask);
            if (uMode == 1) {
              emissive += archMask * (gasZone * 0.48 + oilZone * 0.28);
            } else {
              emissive += archMask * (gasZone * 0.22 + oilZone * 0.12);
            }
          }

          // 4. Lapisan Serpih Lempung Kedap / Cap Rock Shale (sY: +0.005 s/d +0.105)
          float shaleLaminae = 0.5 + 0.5 * sin(sY * 320.0 + fineGrain * 2.0);
          vec3 shaleCol = mix(vec3(0.25, 0.32, 0.34), vec3(0.38, 0.46, 0.47), shaleLaminae);

          // 5. Lapisan Batu Gamping Karst / Limestone CaCO3 (sY: +0.105 s/d +0.225)
          float joint = smoothstep(0.08, 0.0, abs(sin(vRawPos.x * 28.0 + nVal * 4.0)));
          float cavity = smoothstep(0.76, 0.88, fbm(vRawPos * vec3(18.0, 24.0, 18.0)));
          vec3 limestoneCol = mix(vec3(0.82, 0.79, 0.70), vec3(0.93, 0.90, 0.82), medGrain);
          limestoneCol = mix(limestoneCol, vec3(0.45, 0.42, 0.36), joint * 0.55);
          limestoneCol = mix(limestoneCol, vec3(0.16, 0.14, 0.12), cavity * 0.75);

          // 6. Lapisan Tanah Pucuk & Regolit Aluvial (sY > +0.225)
          vec3 soilCol = mix(vec3(0.52, 0.34, 0.20), vec3(0.34, 0.24, 0.14), smoothstep(0.22, 0.36, sY) + fineGrain * 0.2);

          // Blending mulus antar 6 lapisan stratigrafi
          col = conglomerateCol;
          col = mix(col, coalCol,      smoothstep(-0.215, -0.205, sY));
          col = mix(col, sandstoneCol, smoothstep(-0.140, -0.130, sY));
          col = mix(col, shaleCol,     smoothstep( 0.000,  0.010, sY));
          col = mix(col, limestoneCol, smoothstep( 0.100,  0.110, sY));
          col = mix(col, soilCol,      smoothstep( 0.220,  0.232, sY));

          // Garis bidang perlapisan (bedding plane dark seams) di setiap batas formasi
          float b1 = exp(-sqr((sY + 0.210) / 0.0045));
          float b2 = exp(-sqr((sY + 0.135) / 0.0045));
          float b3 = exp(-sqr((sY - 0.005) / 0.0045));
          float b4 = exp(-sqr((sY - 0.105) / 0.0045));
          float b5 = exp(-sqr((sY - 0.225) / 0.0045));
          float seamDark = clamp(b1 + b2 + b3 + b4 + b5, 0.0, 1.0);
          col *= (1.0 - 0.35 * seamDark);

          // Kilap tinggi khusus pada Lapisan Batu Bara
          float isCoal = smoothstep(-0.210, -0.200, sY) * (1.0 - smoothstep(-0.140, -0.130, sY));
          specStrength = mix(0.20, 0.72, isCoal);
          if (uMode == 5) {
            emissive += isCoal * (0.28 + 0.15 * sin(uTime * 3.8));
          }

          // Tekstur khusus Gawir Sesar / Bidang Sesar (Fault Scarp: gores sesar slickensides & breksi sesar)
          if (isFaultScarp) {
            float slickenside = 0.5 + 0.5 * sin((vRawPos.z * 52.0 + vRawPos.y * 8.0) + fineGrain * 2.5);
            vec3 faultGouge = mix(vec3(0.48, 0.32, 0.22), vec3(0.78, 0.44, 0.24), slickenside);
            col = mix(col * 0.84, faultGouge, 0.32);
            specStrength = 0.42;
            if (uMode == 2 || uMode == 3) {
              emissive += 0.18 * (0.5 + 0.5 * sin(uTime * 3.8));
            }
          }
        }
      }

      // =========================================================
      // 4: MORFOLOGI EKSOGEN — DELTA BENGAWAN SOLO, LAUT JAWA & LAND SUBSIDENCE JAKARTA
      // =========================================================
      else if (uPartIndex == 4) {
        if (vSurfType > 5.5) {
          // Gedung-gedung Perkotaan Pesisir (Jakarta & Semarang) dengan fasad kaca & beton
          float floorLines = smoothstep(0.25, 0.35, fract(vRawPos.y * 42.0));
          float colLines   = smoothstep(0.25, 0.35, fract((vRawPos.x + vRawPos.z) * 48.0));
          float winMask = floorLines * colLines;
          vec3 concrete = mix(vec3(0.34, 0.38, 0.44), vec3(0.48, 0.52, 0.58), fineGrain);
          vec3 glass    = mix(vec3(0.16, 0.36, 0.52), vec3(0.96, 0.84, 0.48), step(0.45, noise(vRawPos * 32.0)));
          col = mix(concrete, glass, winMask * 0.82);
          specStrength = 0.65;
          specPower = 48.0;
          if (uMode == 7) {
            col = mix(col, vec3(1.0, 0.36, 0.18), 0.24 + 0.16 * sin(uTime * 4.0));
            emissive = 0.26;
          }
        } else if (vSurfType > 4.5) {
          // Perairan Laut Jawa dengan gelombang mikro normal-mapped & Plume Sedimen Delta Bengawan Solo
          N = perturbNormal(N, vec3(vRawPos.x * 2.2 + uTime * 0.18, vRawPos.y, vRawPos.z * 2.2 - uTime * 0.14), 18.0, 0.065);
          float wave = fbm(vec3(vRawPos.x * 12.0 + uTime * 0.45, vRawPos.z * 12.0 - uTime * 0.35, uTime * 0.25));
          vec3 deepJavaSea = vec3(0.03, 0.26, 0.46);
          vec3 shallowTurquoise = vec3(0.10, 0.54, 0.72);
          vec3 seaCol = mix(deepJavaSea, shallowTurquoise, wave * 0.7 + 0.3);

          // Plume suspensi sedimen lumpur kecokelatan di muara Delta Bengawan Solo
          float deltaDist = length(vec2((vRawPos.x - 1.00) * 1.15, (vRawPos.z - 0.40) * 0.95)) + (nVal - 0.5) * 0.08;
          float plumeMask = smoothstep(0.40, 0.06, deltaDist);
          vec3 turbidPlume = mix(vec3(0.58, 0.46, 0.26), vec3(0.76, 0.62, 0.36), fineGrain);
          col = mix(seaCol, turbidPlume, plumeMask * 0.78);
          specStrength = 0.88;
          specPower = 72.0;
          emissive = 0.12;
          alpha = 0.88;
        } else if (vSurfType > 0.5 && vSurfType < 1.5) {
          N = perturbNormal(N, vRawPos, 18.0, 0.045);
          if (vRawPos.z > 0.06) {
            // Kipas Aluvial Delta Bengawan Solo: Alur sungai bercabang (distributaries), tanggul alam & mangrove
            float ch1 = abs((vRawPos.z - 0.40) - (vRawPos.x - 0.94) * 0.36 + 0.02 * sin(vRawPos.x * 25.0));
            float ch2 = abs((vRawPos.z - 0.40) + (vRawPos.x - 0.94) * 0.42 + 0.02 * cos(vRawPos.x * 25.0));
            float ch3 = abs((vRawPos.z - 0.40) - (vRawPos.x - 0.94) * 0.05 + 0.015 * sin(vRawPos.x * 30.0));
            float minCh = min(ch1, min(ch2, ch3));
            if (minCh < 0.022) {
              col = mix(vec3(0.48, 0.42, 0.26), vec3(0.18, 0.56, 0.76), 0.55);
              specStrength = 0.75;
              emissive = 0.14;
            } else {
              vec3 alluvialMud = mix(vec3(0.56, 0.46, 0.28), vec3(0.68, 0.58, 0.38), fineGrain);
              vec3 mangroveGreen = mix(vec3(0.16, 0.44, 0.18), vec3(0.28, 0.54, 0.22), medGrain);
              col = mix(alluvialMud, mangroveGreen, smoothstep(0.022, 0.065, minCh) * 0.75);
              if (uMode == 7) emissive = 0.15;
            }
          } else {
            // Dataran Aluvial Pesisir Perkotaan (Jakarta & Semarang) dengan jalan grid & taman
            float roadGrid = step(0.88, fract(vRawPos.x * 28.0)) + step(0.88, fract(vRawPos.z * 28.0));
            vec3 urbanGround = mix(vec3(0.36, 0.40, 0.42), vec3(0.26, 0.44, 0.28), medGrain * 0.5);
            col = mix(urbanGround, vec3(0.20, 0.22, 0.25), clamp(roadGrid, 0.0, 1.0) * 0.65);
          }
        } else {
          // Penampang Bawah Permukaan Pesisir: Lapisan Akuifer Air Tanah Dalam & Lempung Kompresibel
          N = perturbNormal(N, vRawPos * 2.0, 14.0, 0.04);
          if (vRawPos.y > -0.22 && vRawPos.y < -0.06) {
            float aqFlow = 0.5 + 0.5 * sin(vRawPos.z * 22.0 - uTime * 3.2 + fineGrain * 2.0);
            col = mix(vec3(0.12, 0.42, 0.68), vec3(0.26, 0.66, 0.90), aqFlow * 0.75);
            if (uMode == 7) emissive = 0.24;
          } else {
            float sedBand = 0.5 + 0.5 * sin(vRawPos.y * 160.0 + fineGrain * 2.0);
            col = mix(vec3(0.46, 0.36, 0.26), vec3(0.34, 0.27, 0.20), sedBand);
          }
        }
      }

      // Pencahayaan Hemisferik + Difus Ganda + Spekular Blinn-Phong + Rim Fresnel + AO
      float diff1 = max(dot(N, L1), 0.0);
      float diff2 = max(dot(N, L2), 0.0) * 0.30;
      vec3 hemiSky = mix(vec3(0.24, 0.20, 0.18), vec3(0.38, 0.44, 0.52), 0.5 + 0.5 * N.y);
      vec3 lightCol = (hemiSky * 0.85 + vec3(1.0, 0.97, 0.92) * diff1 * 0.72 + vec3(0.75, 0.85, 1.0) * diff2) * ao;

      vec3 H = normalize(L1 + V);
      float spec = pow(max(dot(N, H), 0.0), specPower) * specStrength;
      float rim = pow(1.0 - max(dot(N, V), 0.0), 3.2) * 0.16;

      vec3 finalCol = col * (lightCol + vec3(emissive)) + vec3(1.0, 0.98, 0.92) * spec + col * rim;

      if (uHighlight > 0.01) {
        finalCol += vec3(0.26, 0.22, 0.10) * uHighlight;
      }
      if (uDim > 0.01) {
        finalCol *= (1.0 - 0.46 * uDim);
      }

      gl_FragColor = vec4(finalCol, alpha);
    }
  `;

  // =========================================================================
  // GEOMETRY BUILDER — 5 KOMPONEN BLOK GEOLOGI 3D (LIPATAN, HORST, GRABEN,
  // METAMORF-MAGMA & DELTA-SUBSIDENCE)
  // =========================================================================
  function createMeshBuilder() {
    const positions = [];
    const normals = [];
    const uvs = [];
    const surfTypes = [];
    const indices = [];

    function addVertex(x, y, z, nx, ny, nz, u, v, surfType) {
      const idx = positions.length / 3;
      positions.push(x, y, z);
      normals.push(nx, ny, nz);
      uvs.push(u, v);
      surfTypes.push(surfType);
      return idx;
    }

    function addQuad(v0, v1, v2, v3) {
      indices.push(v0, v1, v2, v0, v2, v3);
    }

    function addBox(x0, y0, z0, x1, y1, z1, surfTop, surfSide) {
      // Top
      addQuad(
        addVertex(x0, y1, z1, 0, 1, 0, 0, 1, surfTop),
        addVertex(x1, y1, z1, 0, 1, 0, 1, 1, surfTop),
        addVertex(x1, y1, z0, 0, 1, 0, 1, 0, surfTop),
        addVertex(x0, y1, z0, 0, 1, 0, 0, 0, surfTop)
      );
      // Front (z1)
      addQuad(
        addVertex(x0, y0, z1, 0, 0, 1, 0, 0, surfSide),
        addVertex(x1, y0, z1, 0, 0, 1, 1, 0, surfSide),
        addVertex(x1, y1, z1, 0, 0, 1, 1, 1, surfSide),
        addVertex(x0, y1, z1, 0, 0, 1, 0, 1, surfSide)
      );
      // Back (z0)
      addQuad(
        addVertex(x1, y0, z0, 0, 0, -1, 0, 0, surfSide),
        addVertex(x0, y0, z0, 0, 0, -1, 1, 0, surfSide),
        addVertex(x0, y1, z0, 0, 0, -1, 1, 1, surfSide),
        addVertex(x1, y1, z0, 0, 0, -1, 0, 1, surfSide)
      );
      // Left (x0)
      addQuad(
        addVertex(x0, y0, z0, -1, 0, 0, 0, 0, surfSide),
        addVertex(x0, y0, z1, -1, 0, 0, 1, 0, surfSide),
        addVertex(x0, y1, z1, -1, 0, 0, 1, 1, surfSide),
        addVertex(x0, y1, z0, -1, 0, 0, 0, 1, surfSide)
      );
      // Right (x1)
      addQuad(
        addVertex(x1, y0, z1, 1, 0, 0, 0, 0, surfSide),
        addVertex(x1, y0, z0, 1, 0, 0, 1, 0, surfSide),
        addVertex(x1, y1, z0, 1, 0, 0, 1, 1, surfSide),
        addVertex(x1, y1, z1, 1, 0, 0, 0, 1, surfSide)
      );
    }

    // Helper untuk membangun blok geologi dengan permukaan atas bertopografi & dinding miring sesar
    function addGeologicalBlock(nx, nz, zMin, zMax, yBot, getBoundsAndHeight, surfTop, surfFaultLeft, surfFaultRight) {
      // 1. Top Surface Grid
      const topGrid = [];
      for (let iz = 0; iz <= nz; iz++) {
        const v = iz / nz;
        const z = zMin + v * (zMax - zMin);
        const row = [];
        for (let ix = 0; ix <= nx; ix++) {
          const u = ix / nx;
          const pt = getBoundsAndHeight(u, v, 1.0, z);
          const ptDx = getBoundsAndHeight(Math.min(1.0, u + 0.02), v, 1.0, z);
          const ptDz = getBoundsAndHeight(u, Math.min(1.0, v + 0.02), 1.0, z + 0.02);
          const dyx = (ptDx.y - pt.y) / Math.max(0.001, ptDx.x - pt.x);
          const dyz = (ptDz.y - pt.y) / 0.02;
          let nxx = -dyx, nyy = 1.0, nzz = -dyz;
          const len = Math.hypot(nxx, nyy, nzz) || 1.0;
          row.push(addVertex(pt.x, pt.y, z, nxx / len, nyy / len, nzz / len, u, v, surfTop));
        }
        topGrid.push(row);
      }
      for (let iz = 0; iz < nz; iz++) {
        for (let ix = 0; ix < nx; ix++) {
          addQuad(topGrid[iz][ix], topGrid[iz + 1][ix], topGrid[iz + 1][ix + 1], topGrid[iz][ix + 1]);
        }
      }

      // 2. Front Wall (z = zMax) & Back Wall (z = zMin)
      const ny = 20;
      for (let side = 0; side < 2; side++) {
        const isFront = (side === 0);
        const z = isFront ? zMax : zMin;
        const v = isFront ? 1.0 : 0.0;
        const nzDir = isFront ? 1.0 : -1.0;
        const wallGrid = [];
        for (let iy = 0; iy <= ny; iy++) {
          const ty = iy / ny;
          const row = [];
          for (let ix = 0; ix <= nx; ix++) {
            const u = ix / nx;
            const pt = getBoundsAndHeight(u, v, ty, z);
            row.push(addVertex(pt.x, pt.y, z, 0, 0, nzDir, u, ty, 2.0));
          }
          wallGrid.push(row);
        }
        for (let iy = 0; iy < ny; iy++) {
          for (let ix = 0; ix < nx; ix++) {
            if (isFront) {
              addQuad(wallGrid[iy][ix], wallGrid[iy][ix + 1], wallGrid[iy + 1][ix + 1], wallGrid[iy + 1][ix]);
            } else {
              addQuad(wallGrid[iy][ix + 1], wallGrid[iy][ix], wallGrid[iy + 1][ix], wallGrid[iy + 1][ix + 1]);
            }
          }
        }
      }

      // 3. Left Wall (u = 0) & Right Wall (u = 1) — bisa berupa bidang sesar miring (Fault Scarp)
      for (let side = 0; side < 2; side++) {
        const isLeft = (side === 0);
        const u = isLeft ? 0.0 : 1.0;
        const nxDir = isLeft ? -1.0 : 1.0;
        const surfCode = isLeft ? surfFaultLeft : surfFaultRight;
        const sideGrid = [];
        for (let iy = 0; iy <= ny; iy++) {
          const ty = iy / ny;
          const row = [];
          for (let iz = 0; iz <= nz; iz++) {
            const v = iz / nz;
            const z = zMin + v * (zMax - zMin);
            const pt = getBoundsAndHeight(u, v, ty, z);
            row.push(addVertex(pt.x, pt.y, z, nxDir, 0.25, 0, v, ty, surfCode));
          }
          sideGrid.push(row);
        }
        for (let iy = 0; iy < ny; iy++) {
          for (let iz = 0; iz < nz; iz++) {
            if (isLeft) {
              addQuad(sideGrid[iy][iz], sideGrid[iy][iz + 1], sideGrid[iy + 1][iz + 1], sideGrid[iy + 1][iz]);
            } else {
              addQuad(sideGrid[iy][iz + 1], sideGrid[iy][iz], sideGrid[iy + 1][iz], sideGrid[iy + 1][iz + 1]);
            }
          }
        }
      }

      // 4. Bottom Cap (ty = 0)
      const b00 = getBoundsAndHeight(0, 0, 0, zMin);
      const b10 = getBoundsAndHeight(1, 0, 0, zMin);
      const b11 = getBoundsAndHeight(1, 1, 0, zMax);
      const b01 = getBoundsAndHeight(0, 1, 0, zMax);
      addQuad(
        addVertex(b00.x, yBot, zMin, 0, -1, 0, 0, 0, 2.0),
        addVertex(b10.x, yBot, zMin, 0, -1, 0, 1, 0, 2.0),
        addVertex(b11.x, yBot, zMax, 0, -1, 0, 1, 1, 2.0),
        addVertex(b01.x, yBot, zMax, 0, -1, 0, 0, 1, 2.0)
      );
    }

    function addCone(cx, cy, cz, rBase, rTop, height, segs, surfType) {
      for (let i = 0; i < segs; i++) {
        const a0 = (i / segs) * Math.PI * 2;
        const a1 = ((i + 1) / segs) * Math.PI * 2;
        const c0 = Math.cos(a0), s0 = Math.sin(a0);
        const c1 = Math.cos(a1), s1 = Math.sin(a1);
        const v0 = addVertex(cx + rBase * c0, cy, cz + rBase * s0, c0, 0.45, s0, i / segs, 0, surfType);
        const v1 = addVertex(cx + rBase * c1, cy, cz + rBase * s1, c1, 0.45, s1, (i + 1) / segs, 0, surfType);
        const v2 = addVertex(cx + rTop * c1, cy + height, cz + rTop * s1, c1, 0.45, s1, (i + 1) / segs, 1, surfType);
        const v3 = addVertex(cx + rTop * c0, cy + height, cz + rTop * s0, c0, 0.45, s0, i / segs, 1, surfType);
        addQuad(v0, v1, v2, v3);
      }
    }

    return {
      addBox,
      addGeologicalBlock,
      addCone,
      build() {
        return {
          positions: new Float32Array(positions),
          normals: new Float32Array(normals),
          uvs: new Float32Array(uvs),
          surfTypes: new Float32Array(surfTypes),
          indices: new Uint16Array(indices)
        };
      }
    };
  }

  let _cachedEndogenMeshes = null;
  function _uncachedBuildAllEndogenMeshes() {
    const zMin = -0.78, zMax = 0.78;
    const yBasementTop = -0.34;
    const yBasementBot = -0.74;

    // Fungsi derau topografi deterministik di JS untuk pahatan bukit, lembah, & karst organik
    function terrainMicroRelief(x, z) {
      return 0.014 * Math.sin(x * 11.0 + z * 7.5) * Math.cos(x * 6.5 - z * 12.0)
           + 0.007 * Math.sin(x * 23.0 - z * 19.0);
    }

    // -------------------------------------------------------------------------
    // PART 0: BATUAN DASAR KRISTALIN, DAPUR MAGMA & ZONA METAMORF (MARMER & SABAK)
    // -------------------------------------------------------------------------
    const b0 = createMeshBuilder();
    b0.addGeologicalBlock(34, 18, zMin, zMax, yBasementBot, (u, v, ty) => {
      const x = -1.30 + u * 2.60;
      const yTop = yBasementTop + 0.018 * Math.sin(u * Math.PI * 3.0);
      return { x, y: yBasementBot + ty * (yTop - yBasementBot) };
    }, 2.0, 2.0, 2.0);

    // -------------------------------------------------------------------------
    // PART 1: ZONA LIPATAN TEKTONIK (ANTIKLIN, SINKLIN & PERANGKAP MIGAS)
    // x dari -1.30 s/d -0.18
    // -------------------------------------------------------------------------
    const b1 = createMeshBuilder();
    b1.addGeologicalBlock(42, 28, zMin, zMax, yBasementTop, (u, v, ty, z) => {
      const x = -1.30 + u * 1.12; // -1.30 s/d -0.18
      // Gelombang lipatan: Puncak Antiklin di u = 0.34 (x = -0.92), Lembah Sinklin di u = 0.76 (x = -0.45)
      const wave = 0.18 * Math.sin(u * Math.PI * 2.0 - 0.15);
      // Alur erosi lereng punggungan Antiklin (spurs & gullies)
      const spurs = 0.018 * Math.sin(z * 8.5 + u * 6.0) * Math.cos(z * 4.5);
      const ySurf = 0.22 + wave + spurs + terrainMicroRelief(x, z);
      return { x, y: yBasementTop + ty * (ySurf - yBasementTop) };
    }, 1.0, 2.0, 2.0);
    // Pelataran & Menara Sumur Eksplorasi Migas (Derrick) di puncak Antiklin (x = -0.90, z = 0.0)
    b1.addBox(-0.945, 0.38, -0.045, -0.855, 0.405, 0.045, 4.0, 4.0);
    b1.addCone(-0.90, 0.405, 0.0, 0.032, 0.007, 0.115, 12, 4.0);

    // -------------------------------------------------------------------------
    // PART 2: BLOK PATAHAN HORST (FOOTWALL) & BUKIT KARST BATU GAMPING (CaCO3)
    // Bukit-bukit kerucut Karst (Sinoid Karst Gunung Sewu & Maros) dipahat organik
    // menyatu langsung dengan topografi permukaan Horst!
    // -------------------------------------------------------------------------
    const karstHills = [
      { cx: -0.04, cz: -0.46, r: 0.135, h: 0.125 },
      { cx:  0.07, cz: -0.16, r: 0.145, h: 0.140 },
      { cx: -0.06, cz:  0.14, r: 0.130, h: 0.118 },
      { cx:  0.05, cz:  0.44, r: 0.140, h: 0.132 },
      { cx: -0.07, cz:  0.60, r: 0.110, h: 0.095 }
    ];

    const b2 = createMeshBuilder();
    // Blok Horst 1 (mengapit sisi kiri Graben; dinding kanannya adalah Bidang Sesar Normal miring 62 derajat)
    b2.addGeologicalBlock(28, 32, zMin, zMax, yBasementTop, (u, v, ty, z) => {
      const xLeft = -0.18;
      const xRight = 0.33 - ty * 0.12;
      const x = xLeft + u * (xRight - xLeft);
      let karstBump = 0.0;
      for (let k = 0; k < karstHills.length; k++) {
        const kh = karstHills[k];
        const d2 = Math.pow(x - kh.cx, 2) + Math.pow(z - kh.cz, 2);
        const w2 = kh.r * kh.r;
        if (d2 < w2 * 2.2) {
          // Profil kubah kerucut Karst (Sinoid Kegelkarst)
          karstBump += kh.h * Math.exp(-d2 / (w2 * 0.55));
        }
      }
      const edgeTaper = Math.sin(u * Math.PI);
      const ySurf = 0.325 + karstBump * (0.35 + 0.65 * edgeTaper) + terrainMicroRelief(x, z);
      return { x, y: yBasementTop + ty * (ySurf - yBasementTop) };
    }, 1.0, 2.0, 3.0);

    // Blok Horst 2 (mengapit sisi kanan Graben; dinding kirinya adalah Gawir Sesar Normal miring 62 derajat)
    b2.addGeologicalBlock(20, 28, zMin, zMax, yBasementTop, (u, v, ty, z) => {
      const xLeft = 0.65 + ty * 0.12; // ty=0 -> 0.65, ty=1 -> 0.77
      const xRight = 0.96;
      const x = xLeft + u * (xRight - xLeft);
      const scarpRidge = 0.028 * Math.exp(-Math.pow((u - 0.18) / 0.25, 2));
      const ySurf = 0.295 + scarpRidge + terrainMicroRelief(x, z);
      return { x, y: yBasementTop + ty * (ySurf - yBasementTop) };
    }, 1.0, 3.0, 2.0);

    // -------------------------------------------------------------------------
    // PART 3: BLOK LEMBAH PATAHAN GRABEN / SLANK (NGARAI SIANOK — HANGING WALL)
    // -------------------------------------------------------------------------
    const b3 = createMeshBuilder();
    b3.addGeologicalBlock(28, 30, zMin, zMax, yBasementTop, (u, v, ty, z) => {
      const effTy = ty * 0.62;
      const xLeft = 0.33 - effTy * 0.12;
      const xRight = 0.65 + effTy * 0.12;
      const x = xLeft + u * (xRight - xLeft);
      // Alur sungai Batang Sianok berkelok di dasar lembah Ngarai Sianok
      const riverCurve = 0.5 + 0.11 * Math.sin(z * 5.0) + 0.03 * Math.cos(z * 11.0);
      const riverDip = 0.044 * Math.exp(-Math.pow((u - riverCurve) / 0.14, 2.0));
      const talusSlope = 0.022 * (Math.pow(1.0 - u, 4.0) + Math.pow(u, 4.0));
      const ySurf = 0.072 - riverDip + talusSlope + 0.4 * terrainMicroRelief(x, z);
      return { x, y: yBasementTop + ty * (ySurf - yBasementTop) };
    }, 1.0, 3.0, 3.0);

    // -------------------------------------------------------------------------
    // PART 4: DELTA BENGAWAN SOLO, LAUT JAWA & PESISIR LAND SUBSIDENCE JAKARTA
    // x dari 0.96 s/d 1.30
    // -------------------------------------------------------------------------
    const b4 = createMeshBuilder();
    b4.addGeologicalBlock(24, 28, zMin, zMax, yBasementTop, (u, v, ty, z) => {
      const x = 0.96 + u * 0.34;
      let ySurf = 0.042 * (1.0 - u * 0.82) + 0.35 * terrainMicroRelief(x, z);
      if (z > 0.06) {
        const fanDist = Math.hypot((x - 0.96) * 1.08, (z - 0.40) * 0.88);
        const deltaFan = 0.058 * Math.max(0.0, 1.0 - fanDist * 2.5);
        ySurf = -0.022 + deltaFan + 0.25 * terrainMicroRelief(x, z);
      }
      return { x, y: yBasementTop + ty * (ySurf - yBasementTop) };
    }, 1.0, 2.0, 2.0);

    // Lapisan Air Laut Jawa di sekitar kipas Delta Bengawan Solo
    b4.addBox(1.055, -0.065, -0.775, 1.305, 0.006, 0.775, 5.0, 5.0);

    // Gedung-gedung Perkotaan Pesisir (Jakarta & Semarang) di zona Land Subsidence (z < 0.05)
    b4.addBox(0.985, 0.02, -0.64, 1.055, 0.20, -0.53, 6.0, 6.0);
    b4.addBox(1.075, 0.01, -0.58, 1.145, 0.25, -0.47, 6.0, 6.0);
    b4.addBox(0.995, 0.02, -0.42, 1.065, 0.17, -0.31, 6.0, 6.0);
    b4.addBox(1.085, 0.01, -0.36, 1.155, 0.22, -0.25, 6.0, 6.0);
    b4.addBox(1.005, 0.02, -0.20, 1.070, 0.15, -0.10, 6.0, 6.0);
    b4.addBox(1.095, 0.01, -0.15, 1.160, 0.19, -0.05, 6.0, 6.0);

    return [b0.build(), b1.build(), b2.build(), b3.build(), b4.build()];
  }
  function buildAllEndogenMeshes() {
    if (_cachedEndogenMeshes) return _cachedEndogenMeshes;
    _cachedEndogenMeshes = _uncachedBuildAllEndogenMeshes();
    return _cachedEndogenMeshes;
  }


  // =========================================================================
  // MATRIX & CAMERA HELPERS
  // =========================================================================
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

  function projectPoint(pt, mvp, width, height, out = null) {
    const x = pt[0], y = pt[1], z = pt[2];
    const cx = mvp[0] * x + mvp[4] * y + mvp[8] * z + mvp[12];
    const cy = mvp[1] * x + mvp[5] * y + mvp[9] * z + mvp[13];
    const cw = mvp[3] * x + mvp[7] * y + mvp[11] * z + mvp[15];
    if (cw <= 0.05) return null;
    const ndcX = cx / cw;
    const ndcY = cy / cw;
    const res = out || { x: 0, y: 0 };
    res.x = (ndcX * 0.5 + 0.5) * width;
    res.y = (1.0 - (ndcY * 0.5 + 0.5)) * height;
    return res;
  }

  function compileShader(gl, type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error('Shader error:', gl.getShaderInfoLog(s));
    }
    return s;
  }

  // =========================================================================
  // ENDOGEN 3D VIEWER CLASS
  // =========================================================================
  export class Endogen3DViewer {
    constructor(cardEl) {
      this.cardEl = cardEl;

      this.playing = true;
      this.exploded = false;
      this.explodeFactor = 0.0;
      this.showLabels = true;
      this.selectedPart = -1;
      this.slideIndex = 0;
      this.time = 0;

      this.yaw = -0.45;
      this.pitch = 0.36;
      this.zoom = 3.75;
      this.targetYaw = -0.45;
      this.targetPitch = 0.36;
      this.targetZoom = 3.75;

      this.isDragging = false;
      this.dragMoved = false;
      this.lastX = 0;
      this.lastY = 0;
      this.labelHitBoxes = [];

      this.buildDOM();
      this.initWebGL();
      this.bindEvents();
      this.onSlideChange(0);

      this.lastFrameTime = performance.now();
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
        <canvas class="earth3d-gl" aria-label="Model 3D Interaktif Tenaga Endogen Lipatan Patahan dan Siklus Batuan"></canvas>
        <canvas class="earth3d-hud"></canvas>

        <!-- Banner Penjelasan Mode Animasi Slide -->
        <div class="earth3d-sim-banner">
          <b class="sim-title">🌐 Epirogenesa &amp; Orogenesa</b>
          <span class="sim-sub">Putar blok geologi 3D (drag) atau klik struktur lipatan &amp; patahan untuk detail.</span>
        </div>

        <!-- Kartu Detail Komponen Geologi -->
        <div class="earth3d-layer-popup" style="display:none">
          <div class="lp-head">
            <span class="lp-dot"></span>
            <strong class="lp-name">Zona Lipatan Antiklin</strong>
            <button type="button" class="lp-close" aria-label="Tutup detail">✕</button>
          </div>
          <div class="lp-grid">
            <div><small>Lokasi / Contoh</small><b class="lp-depth">-</b></div>
            <div><small>Mekanisme Gaya</small><b class="lp-temp">-</b></div>
            <div><small>Struktur Utama</small><b class="lp-state">-</b></div>
            <div><small>Massa Jenis</small><b class="lp-dens">-</b></div>
          </div>
          <div class="lp-comp"></div>
        </div>

        <!-- Baris Pil Struktur Geologi & Tombol Kontrol Taktil -->
        <div class="earth3d-bottom-bar">
          <div class="earth3d-layer-pills" role="group" aria-label="Pilih Struktur Tenaga Endogen">
            ${['Metamorf & Magma', 'Lipatan & Migas', 'Horst & Karst', 'Graben Sianok', 'Delta & Pesisir'].map(
              (shortTitle, idx) => `<button type="button" class="e3d-pill" data-part="${idx}">
                      <i style="background:${PART_DATA[idx].accent}"></i>${shortTitle}
                    </button>`
            ).join('')}
          </div>
          <div class="earth3d-ctrls">
            <button type="button" class="e3d-ctrl-btn active" data-action="play" title="Jeda / Mainkan Animasi">⏸ Jeda</button>
            <button type="button" class="e3d-ctrl-btn" data-action="explode" title="Pisahkan / Satukan Blok Geologi">🧩 Pisahkan</button>
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
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([42, 102, 48, 255]));

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

      const rawMeshes = buildAllEndogenMeshes();
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
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    }

    bindEvents() {
      const stage = this.hudCanvas;

      const onPointerDown = (x, y) => {
        this.isDragging = true;
        this.dragMoved = false;
        this.lastX = x;
        this.lastY = y;
      };

      const onPointerMove = (x, y) => {
        if (!this.isDragging) return;
        const dx = x - this.lastX;
        const dy = y - this.lastY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) this.dragMoved = true;
        this.lastX = x;
        this.lastY = y;
        this.targetYaw -= dx * 0.0085;
        this.targetPitch = Math.max(-0.20, Math.min(1.18, this.targetPitch + dy * 0.0085));
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
          const factor = touchStartDist / dist;
          this.targetZoom = Math.max(2.35, Math.min(5.2, touchStartZoom * factor));
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
        this.targetZoom = Math.max(2.35, Math.min(5.2, this.targetZoom + e.deltaY * 0.002));
      }, { passive: false });

      this.wrap.querySelectorAll('.e3d-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = Number(btn.dataset.part);
          this.selectPart(this.selectedPart === idx ? -1 : idx, true);
        });
      });

      this.popupEl.querySelector('.lp-close').addEventListener('click', () => {
        this.selectPart(-1);
      });

      this.wrap.querySelectorAll('.e3d-ctrl-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const action = btn.dataset.action;
          if (action === 'play') {
            this.playing = !this.playing;
            btn.classList.toggle('active', this.playing);
            btn.innerHTML = this.playing ? '⏸ Jeda' : '▶ Putar';
          } else if (action === 'explode') {
            this.exploded = !this.exploded;
            btn.classList.toggle('active', this.exploded);
          } else if (action === 'labels') {
            this.showLabels = !this.showLabels;
            btn.classList.toggle('active', this.showLabels);
          } else if (action === 'reset') {
            const cfg = SLIDE_MODES[this.slideIndex] || SLIDE_MODES[0];
            this.targetYaw = cfg.camYaw;
            this.targetPitch = cfg.camPitch;
            this.targetZoom = cfg.camZoom;
            this.exploded = false;
            const expBtn = this.wrap.querySelector('[data-action="explode"]');
            if (expBtn) expBtn.classList.remove('active');
            this.selectPart(-1);
          }
        });
      });
    }

    handleCanvasClick(clientX, clientY) {
      const rect = this.hudCanvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      for (const box of this.labelHitBoxes) {
        if (x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h) {
          this.selectPart(this.selectedPart === box.index ? -1 : box.index);
          return;
        }
      }
    }

    selectPart(index, fromPill = false) {
      this.selectedPart = index;
      this.wrap.querySelectorAll('.e3d-pill').forEach(btn => {
        btn.classList.toggle('active', Number(btn.dataset.part) === index);
      });

      if (index < 0 || index >= PART_DATA.length) {
        this.popupEl.style.display = 'none';
        return;
      }

      if (fromPill && this.currentEye) {
        const d = PART_DATA[index];
        const off = this.getPartOffset(index);
        const pt = [d.labelAnchor[0] + off[0], d.labelAnchor[1] + off[1], d.labelAnchor[2] + off[2]];
        if (this.getVisibilityAlpha(pt) < 0.25) {
          const cfg = SLIDE_MODES[this.slideIndex] || SLIDE_MODES[0];
          this.targetYaw = cfg.camYaw;
          this.targetPitch = Math.max(0.28, cfg.camPitch);
        }
      }

      const d = PART_DATA[index];
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
      const cfg = SLIDE_MODES[this.slideIndex];
      if (this.simTitleEl) this.simTitleEl.innerHTML = cfg.title;
      if (this.simSubEl) this.simSubEl.textContent = cfg.sub;
      this.targetYaw = cfg.camYaw;
      this.targetPitch = cfg.camPitch;
      this.targetZoom = cfg.camZoom;
    }

    getPartOffset(partIdx) {
      const d = PART_DATA[partIdx];
      const selBoost = this.selectedPart === partIdx ? 0.16 : 0.0;
      const k = this.explodeFactor + selBoost;
      return [
        d.explodeVec[0] * k,
        d.explodeVec[1] * k,
        d.explodeVec[2] * k
      ];
    }

    resizeIfNeeded() {
      const rect = this.wrap.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (this.glCanvas.width !== Math.floor(w * dpr) || this.glCanvas.height !== Math.floor(h * dpr)) {
        this.glCanvas.width = Math.floor(w * dpr);
        this.glCanvas.height = Math.floor(h * dpr);
        this.hudCanvas.width = Math.floor(w * dpr);
        this.hudCanvas.height = Math.floor(h * dpr);
      }
      return { w, h, dpr };
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
      const dt = Math.min(0.05, (now - this.lastFrameTime) / 1000);
      this.lastFrameTime = now;

      if (this.playing) {
        this.time += dt;
        if (!this.isDragging) {
          this.targetYaw += dt * 0.055 * Math.cos(this.time * 0.35);
        }
      }

      this.yaw += (this.targetYaw - this.yaw) * 0.10;
      this.pitch += (this.targetPitch - this.pitch) * 0.10;
      this.zoom += (this.targetZoom - this.zoom) * 0.12;

      const targetExp = this.exploded ? 1.0 : 0.0;
      this.explodeFactor += (targetExp - this.explodeFactor) * 0.10;

      const { w, h, dpr } = this.resizeIfNeeded();
      if (w > 10 && h > 10 && this.gl) {
        this.renderWebGL(w, h, dpr);
        this.renderHUD(w, h, dpr);
      }

      this.rafId = requestAnimationFrame(this.animate);
    }

    renderWebGL(w, h, dpr) {
      const gl = this.gl;
      gl.viewport(0, 0, Math.floor(w * dpr), Math.floor(h * dpr));
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      const aspect = w / h;
      if (!this._projMat) {
        this._projMat = new Float32Array(16);
        this._viewMat = new Float32Array(16);
        this._mvpMat = new Float32Array(16);
        this._eye = [0, 0, 0];
      }
      this._eye[0] = this.zoom * Math.cos(this.pitch) * Math.sin(this.yaw);
      this._eye[1] = this.zoom * Math.sin(this.pitch);
      this._eye[2] = this.zoom * Math.cos(this.pitch) * Math.cos(this.yaw);
      const eye = this._eye;
      this.currentEye = eye;

      mat4Perspective(38 * Math.PI / 180, aspect, 0.1, 25.0, this._projMat);
      mat4LookAt(eye, [0, -0.08, 0], [0, 1, 0], this._viewMat);
      mat4Multiply(this._projMat, this._viewMat, this._mvpMat);
      const mvp = this._mvpMat;
      this.currentMVP = mvp;

      gl.useProgram(this.prog);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.earthTex);
      gl.uniform1i(this.uniforms.uEarthTex, 0);
      gl.uniformMatrix4fv(this.uniforms.uMVP, false, mvp);
      gl.uniform1i(this.uniforms.uMode, this.slideIndex);
      gl.uniform1f(this.uniforms.uTime, this.time);
      gl.uniform3fv(this.uniforms.uEye, eye);

      for (let i = 0; i < this.meshes.length; i++) {
        const m = this.meshes[i];
        const off = this.getPartOffset(i);
        gl.uniform3fv(this.uniforms.uOffset, off);
        gl.uniform1i(this.uniforms.uPartIndex, i);

        const isSel = (this.selectedPart === i);
        const isDim = (this.selectedPart !== -1 && !isSel);
        gl.uniform1f(this.uniforms.uHighlight, isSel ? 1.0 : 0.0);
        gl.uniform1f(this.uniforms.uDim, isDim ? 1.0 : 0.0);

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

    // =======================================================================
    // 2D HUD OVERLAY — ANOTASI GEOLOGI PER SLIDE & CALLOUT STRUKTUR 3D
    // =======================================================================
    renderHUD(w, h, dpr) {
      const ctx = this.ctx2d;
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      const mvp = this.currentMVP;
      if (!mvp) {
        ctx.restore();
        return;
      }

      this.placedBoxes = [];
      this.labelHitBoxes = [];

      if (this.showLabels) {
        if (this.slideIndex === 0) {
          this.drawEpirogenesaOrogenesaHUD(ctx, mvp, w, h);
        } else if (this.slideIndex === 1) {
          this.drawLipatanMigasHUD(ctx, mvp, w, h);
        } else if (this.slideIndex === 2) {
          this.drawHorstGrabenHUD(ctx, mvp, w, h);
        } else if (this.slideIndex === 3) {
          this.drawKlasifikasiSesarHUD(ctx, mvp, w, h);
        } else if (this.slideIndex === 4) {
          this.drawRockCycleHUD(ctx, mvp, w, h);
        } else if (this.slideIndex === 5) {
          this.drawSedimenHUD(ctx, mvp, w, h);
        } else if (this.slideIndex === 6) {
          this.drawMetamorfHUD(ctx, mvp, w, h);
        } else if (this.slideIndex === 7) {
          this.drawEksogenSubsidenceHUD(ctx, mvp, w, h);
        }
        this.drawPartLabels(ctx, mvp, w, h);
      }

      ctx.restore();
    }

    resolveBoxOverlap(cx, cy, tw, th, w, h) {
      let x = Math.max(tw / 2 + 10, Math.min(w - tw / 2 - 10, cx));
      let y = Math.max(106, Math.min(h - 104, cy));
      for (let iter = 0; iter < 8; iter++) {
        let hit = false;
        for (const b of this.placedBoxes) {
          if (Math.abs(x - b.cx) < (tw + b.tw) * 0.5 + 6 && Math.abs(y - b.cy) < (th + b.th) * 0.5 + 4) {
            y = b.cy + (y >= b.cy ? 1 : -1) * ((th + b.th) * 0.5 + 5);
            y = Math.max(106, Math.min(h - 104, y));
            hit = true;
          }
        }
        if (!hit) break;
      }
      this.placedBoxes.push({ cx: x, cy: y, tw, th });
      return { cx: x, cy: y };
    }

    getVisibilityAlpha(pt3d, normalVec) {
      const eye = this.currentEye || [0, 1.5, 3.6];
      const eyeLen = Math.hypot(eye[0], eye[1], eye[2]) || 1;
      const eyNorm = eye[1] / eyeLen;

      // Sembunyikan jika pengguna memutar kamera melihat dari kolong bawah blok
      const bottomMin = this.exploded ? -0.16 : -0.02;
      const bottomMax = this.exploded ? 0.06 : 0.16;
      const bottomFactor = Math.max(0.0, Math.min(1.0, (eyNorm - bottomMin) / (bottomMax - bottomMin)));
      if (bottomFactor <= 0.01) return 0.0;

      const n = normalVec || (pt3d[2] >= 0.65 ? [0.0, 0.20, 0.98] : [0.0, 0.78, 0.62]);
      const vx = eye[0] - pt3d[0];
      const vy = eye[1] - pt3d[1];
      const vz = eye[2] - pt3d[2];
      const vLen = Math.hypot(vx, vy, vz) || 1;
      const nLen = Math.hypot(n[0], n[1], n[2]) || 1;
      const dot = (vx * n[0] + vy * n[1] + vz * n[2]) / (vLen * nLen);

      const minDot = this.exploded ? 0.02 : 0.14;
      const maxDot = this.exploded ? 0.26 : 0.38;
      const faceFactor = Math.max(0.0, Math.min(1.0, (dot - minDot) / (maxDot - minDot)));
      return faceFactor * bottomFactor;
    }

    drawPin(ctx, mvp, w, h, pt3d, text, borderCol, normalVec) {
      const alpha = this.getVisibilityAlpha(pt3d, normalVec);
      if (alpha < 0.05) return;
      const p = projectPoint(pt3d, mvp, w, h);
      if (!p) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.font = '400 11px "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
      const padX = 9;
      const dotSpace = 12;
      const tw = ctx.measureText(text).width + padX * 2 + dotSpace;
      const th = 22;
      const { cx, cy } = this.resolveBoxOverlap(p.x, p.y, tw, th, w, h);
      const bx = cx - tw / 2;
      const by = cy - th / 2;
      const dotColor = borderCol || '#38bdf8';

      ctx.fillStyle = dotColor;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#171721';
      ctx.lineWidth = 1.4;
      ctx.stroke();

      ctx.fillStyle = 'rgba(23, 23, 33, 0.88)';
      ctx.strokeStyle = 'rgba(226, 227, 237, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(bx, by, tw, th, 999);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = dotColor;
      ctx.beginPath();
      ctx.arc(bx + padX + 3.5, cy, 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, bx + padX + dotSpace, cy + 0.5);
      ctx.restore();
    }

    drawArrow3D(ctx, mvp, w, h, pStart, pEnd, color, label, normalVec) {
      const mid3D = [(pStart[0] + pEnd[0]) * 0.5, (pStart[1] + pEnd[1]) * 0.5, (pStart[2] + pEnd[2]) * 0.5];
      const alpha = this.getVisibilityAlpha(mid3D, normalVec);
      if (alpha < 0.05) return;
      const a = projectPoint(pStart, mvp, w, h);
      const b = projectPoint(pEnd, mvp, w, h);
      if (!a || !b) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();

      const ang = Math.atan2(b.y - a.y, b.x - a.x);
      ctx.beginPath();
      ctx.moveTo(b.x, b.y);
      ctx.lineTo(b.x - 9 * Math.cos(ang - 0.45), b.y - 9 * Math.sin(ang - 0.45));
      ctx.lineTo(b.x - 9 * Math.cos(ang + 0.45), b.y - 9 * Math.sin(ang + 0.45));
      ctx.closePath();
      ctx.fill();

      if (label) {
        ctx.font = '400 10.5px "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
        const padX = 8;
        const dotSpace = 11;
        const tw = ctx.measureText(label).width + padX * 2 + dotSpace;
        const th = 20;
        const mx = Math.max(tw / 2 + 8, Math.min(w - tw / 2 - 8, (a.x + b.x) * 0.5));
        const my = Math.max(104, Math.min(h - 102, (a.y + b.y) * 0.5 - 10));
        const bx = mx - tw / 2;
        const by = my - th / 2;
        ctx.fillStyle = 'rgba(23, 23, 33, 0.88)';
        ctx.strokeStyle = 'rgba(226, 227, 237, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(bx, by, tw, th, 999);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(bx + padX + 3, my, 3.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, bx + padX + dotSpace, my + 0.5);
      }
      ctx.restore();
    }

    // Slide 1: Epirogenesa & Orogenesa
    drawEpirogenesaOrogenesaHUD(ctx, mvp, w, h) {
      const off1 = this.getPartOffset(1);
      const off4 = this.getPartOffset(4);
      this.drawArrow3D(ctx, mvp, w, h,
        [-1.25 + off1[0], 0.25 + off1[1], 0.82],
        [-0.98 + off1[0], 0.25 + off1[1], 0.82],
        '#fbbf24', 'Orogenesa (Kompresi Cepat)'
      );
      this.drawPin(ctx, mvp, w, h, [-0.88 + off1[0], 0.54 + off1[1], 0.0], '⛰️ Orogenesa: Lipatan & Patahan Pegunungan', '#fbbf24');

      const epiroDir = Math.sin(this.time * 1.3) >= 0 ? 'Epirogenesa Negatif (Daratan Naik: P. Timor)' : 'Epirogenesa Positif (Daratan Turun: Kep. Maluku)';
      this.drawPin(ctx, mvp, w, h, [1.08 + off4[0], 0.30 + off4[1], 0.15], '🌐 ' + epiroDir, '#38bdf8');
    }

    // Slide 2: Deformasi Lipatan Antiklin, Sinklin & Perangkap Migas
    drawLipatanMigasHUD(ctx, mvp, w, h) {
      const off1 = this.getPartOffset(1);
      this.drawPin(ctx, mvp, w, h, [-0.90 + off1[0], 0.52 + off1[1], 0.10], '⛰️ Punggung ANTIKLIN (Cembung ke Atas)', '#fbbf24');
      this.drawPin(ctx, mvp, w, h, [-0.46 + off1[0], 0.18 + off1[1], 0.20], '🏞️ Lembah SINKLIN (Cekung ke Bawah)', '#38bdf8');
      this.drawPin(ctx, mvp, w, h, [-0.90 + off1[0], 0.08 + off1[1], 0.82], '🛢️ Perangkap Migas: Gas + Minyak di bawah Cap Rock', '#ef4444');

      // Panah kompresi mendatar kiri-kanan
      this.drawArrow3D(ctx, mvp, w, h, [-1.32 + off1[0], -0.05 + off1[1], 0.82], [-1.08 + off1[0], -0.05 + off1[1], 0.82], '#f97316', 'Kompresi →');
      this.drawArrow3D(ctx, mvp, w, h, [-0.20 + off1[0], -0.05 + off1[1], 0.82], [-0.44 + off1[0], -0.05 + off1[1], 0.82], '#f97316', '← Kompresi');
    }

    // Slide 3: Deformasi Patahan Horst & Graben (Ngarai Sianok)
    drawHorstGrabenHUD(ctx, mvp, w, h) {
      const off2 = this.getPartOffset(2);
      const off3 = this.getPartOffset(3);
      const slip = 0.045 * (0.5 + 0.5 * Math.sin(this.time * 2.0));

      this.drawPin(ctx, mvp, w, h, [0.02 + off2[0], 0.48 + off2[1], 0.10], '⬆️ HORST (Footwall Tetap Tinggi)', '#4ade80');
      this.drawPin(ctx, mvp, w, h, [0.49 + off3[0], 0.18 - slip + off3[1], 0.20], '⬇️ GRABEN / SLANK: Ngarai Sianok (Hanging Wall Amblas)', '#f87171');
      this.drawPin(ctx, mvp, w, h, [0.86 + off2[0], 0.42 + off2[1], -0.10], '⬆️ Blok HORST Kanan & Gawir Sesar', '#4ade80');

      this.drawArrow3D(ctx, mvp, w, h, [0.49 + off3[0], 0.02 + off3[1], 0.82], [0.49 + off3[0], -0.18 + off3[1], 0.82], '#ef4444', 'Amblas Turun');
    }

    // Slide 4: Klasifikasi Sesar & Variasi Lipatan
    drawKlasifikasiSesarHUD(ctx, mvp, w, h) {
      const off1 = this.getPartOffset(1);
      const off3 = this.getPartOffset(3);
      const phase = (this.time * 0.45) % 3.0;
      let faultModeLabel = '↕️ SESAR NORMAL (Turun): Hanging Wall Turun akibat Regangan';
      let badgeCol = '#f87171';
      if (phase >= 1.0 && phase < 2.0) {
        faultModeLabel = '⬆️ SESAR NAIK (Reverse/Thrust): Hanging Wall Terdorong Naik (Kompresi)';
        badgeCol = '#4ade80';
      } else if (phase >= 2.0) {
        faultModeLabel = '↔️ SESAR MENDATAR (Strike-Slip): Geseran Lateral Dekstral/Sinistral';
        badgeCol = '#38bdf8';
      }

      this.drawPin(ctx, mvp, w, h, [0.49 + off3[0], 0.28 + off3[1], 0.25], faultModeLabel, badgeCol);
      this.drawPin(ctx, mvp, w, h, [-0.82 + off1[0], 0.48 + off1[1], 0.10], '🌀 Variasi Lipatan: Tegak → Miring → Lipatan Rebah', '#fbbf24');
    }

    // Slide 5: Siklus Batuan (Rock Cycle)
    drawRockCycleHUD(ctx, mvp, w, h) {
      const off0 = this.getPartOffset(0);
      const off1 = this.getPartOffset(1);
      const off3 = this.getPartOffset(3);

      const pMagma = [-0.92 + off0[0], -0.62 + off0[1], 0.82];
      const pBeku  = [-0.92 + off1[0], 0.36 + off1[1], 0.82];
      const pSed   = [0.48 + off3[0], 0.04 + off3[1], 0.82];
      const pMeta  = [-0.15 + off0[0], -0.52 + off0[1], 0.82];

      this.drawArrow3D(ctx, mvp, w, h, pMagma, pBeku, '#f97316', '1. Pembekuan');
      this.drawArrow3D(ctx, mvp, w, h, pBeku, pSed, '#fbbf24', '2. Pelapukan & Litifikasi');
      this.drawArrow3D(ctx, mvp, w, h, pSed, pMeta, '#c084fc', '3. Tekanan (P) & Suhu (T)');
      this.drawArrow3D(ctx, mvp, w, h, pMeta, pMagma, '#ef4444', '4. Pelelehan (Anateksis)');

      this.drawPin(ctx, mvp, w, h, pMagma, '🔥 MAGMA', '#ef4444');
      this.drawPin(ctx, mvp, w, h, pBeku, '🪨 BATUAN BEKU', '#f97316');
      this.drawPin(ctx, mvp, w, h, pSed, '🏖️ BATUAN SEDIMEN', '#fbbf24');
      this.drawPin(ctx, mvp, w, h, pMeta, '💎 BATUAN METAMORF', '#c084fc');
    }

    // Slide 6: Batuan Sedimen (Gamping Karst, Batu Pasir, Batu Bara)
    drawSedimenHUD(ctx, mvp, w, h) {
      const off1 = this.getPartOffset(1);
      const off2 = this.getPartOffset(2);
      const off3 = this.getPartOffset(3);

      this.drawPin(ctx, mvp, w, h, [0.02 + off2[0], 0.48 + off2[1], 0.05], '🪨 Batu Gamping (CaCO₃): Karst Pegunungan Sewu & Maros', '#4ade80');
      this.drawPin(ctx, mvp, w, h, [-0.52 + off1[0], -0.08 + off1[1], 0.82], '🏖️ Batu Pasir Kuarsa (Konstruksi & Reservoir)', '#fbbf24');
      this.drawPin(ctx, mvp, w, h, [0.48 + off3[0], -0.34 + off3[1], 0.82], '⛏️ Lapisan Batu Bara (Tanjung Enim & Kaltim — PLTU)', '#f97316');
    }

    // Slide 7: Batuan Metamorf (Marmer Tulungagung & Batu Sabak)
    drawMetamorfHUD(ctx, mvp, w, h) {
      const off0 = this.getPartOffset(0);
      this.drawPin(ctx, mvp, w, h, [-0.55 + off0[0], -0.56 + off0[1], 0.82], '💎 Marmer (Campurdarat, Tulungagung): Rekristalisasi Gamping', '#f472b6');
      this.drawPin(ctx, mvp, w, h, [0.05 + off0[0], -0.48 + off0[1], 0.82], '🪓 Batu Sabak (Slate): Metamorfisme Serpih Lempung', '#c084fc');
      this.drawPin(ctx, mvp, w, h, [-0.95 + off0[0], -0.66 + off0[1], 0.82], '🔥 Panas Intrusi Magma & Tekanan Tektonik (P-T)', '#ef4444');
    }

    // Slide 8: Tenaga Eksogen & Land Subsidence
    drawEksogenSubsidenceHUD(ctx, mvp, w, h) {
      const off4 = this.getPartOffset(4);
      const sub = 0.042 * (0.5 + 0.5 * Math.sin(this.time * 1.8));
      this.drawPin(ctx, mvp, w, h, [1.10 + off4[0], 0.05 + off4[1], 0.48], '🌊 Progradasi Delta Bengawan Solo (Sedimentasi Muara)', '#38bdf8');
      this.drawPin(ctx, mvp, w, h, [1.08 + off4[0], 0.28 - sub + off4[1], -0.35], '🏙️ Land Subsidence Jakarta & Semarang (5–15 cm/thn)', '#f87171');
      this.drawPin(ctx, mvp, w, h, [1.12 + off4[0], -0.15 + off4[1], 0.78], '💧 Ekstraksi Air Tanah Berlebih & Beban Konstruksi', '#fbbf24');
    }

    drawPartLabels(ctx, mvp, w, h) {
      ctx.font = '400 11.5px "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
      const padX = 9;
      const dotSpace = 12;
      const pillLabels = [
        'Metamorf (Marmer & Sabak)',
        'Lipatan Antiklin & Migas',
        'Horst & Bukit Karst',
        'Graben (Ngarai Sianok)',
        'Delta & Pesisir Subsidence'
      ];
      const partNormals = [
        [0.0, 0.20, 0.98],        // 0: Metamorf (dinding penampang depan)
        [-0.20, 0.78, 0.59],      // 1: Lipatan Antiklin (permukaan atas-kiri-depan)
        [0.0, 0.82, 0.57],        // 2: Horst (permukaan atas-tengah)
        [0.0, 0.76, 0.65],        // 3: Graben (permukaan atas-depan)
        [0.32, 0.74, 0.58]        // 4: Delta (permukaan atas-kanan-depan)
      ];

      PART_DATA.forEach((d, idx) => {
        const off = this.getPartOffset(idx);
        const anchor = [
          d.labelAnchor[0] + off[0],
          d.labelAnchor[1] + off[1],
          d.labelAnchor[2] + off[2]
        ];
        const alpha = this.getVisibilityAlpha(anchor, partNormals[idx]);
        if (alpha < 0.05) return;

        const proj = projectPoint(anchor, mvp, w, h);
        if (!proj) return;

        ctx.save();
        ctx.globalAlpha = alpha;
        const isSel = (this.selectedPart === idx);
        const txt = pillLabels[idx];
        const tw = ctx.measureText(txt).width + padX * 2 + dotSpace;
        const th = 22;
        const { cx: lx, cy: ly } = this.resolveBoxOverlap(proj.x, proj.y - 24, tw, th, w, h);
        const bx = lx - tw / 2;
        const by = ly - th / 2;

        ctx.strokeStyle = isSel ? 'rgba(255, 255, 255, 0.6)' : 'rgba(226, 227, 237, 0.35)';
        ctx.lineWidth = isSel ? 1.6 : 1.2;
        ctx.beginPath();
        ctx.moveTo(proj.x, proj.y);
        ctx.lineTo(lx, ly);
        ctx.stroke();

        ctx.fillStyle = d.accent;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, isSel ? 5.2 : 4.0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#171721';
        ctx.lineWidth = 1.4;
        ctx.stroke();

        ctx.fillStyle = isSel ? '#5266eb' : 'rgba(23, 23, 33, 0.88)';
        ctx.strokeStyle = isSel ? 'rgba(255, 255, 255, 0.45)' : 'rgba(226, 227, 237, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(bx, by, tw, th, 999);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = d.accent;
        ctx.beginPath();
        ctx.arc(bx + padX + 3.5, ly, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(txt, bx + padX + dotSpace, ly + 0.5);
        ctx.restore();

        this.labelHitBoxes.push({ index: idx, x: bx, y: by, w: tw, h: th });
      });
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