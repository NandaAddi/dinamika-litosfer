import { ModuleData } from '../../types';

export const modul1Data: ModuleData = {
  id: 'struktur',
  num: 1,
  name: 'Struktur Bumi',
  slug: 'struktur',
  badge: '01 — Geologi Dasar',
  title: 'Struktur Lapisan Bumi & Metode Seismik',
  description: 'Menganalisis karakteristik lapisan bumi, sifat fisik batuan, bidang diskontinuitas, serta penjalaran gelombang seismik P & S.',
  bgImage: '/assets/images/bg_struktur.jpg',
  layers: [
    {
      id: 'inti-dalam',
      index: 0,
      name: 'Inti Dalam (Inner Core)',
      depth: '5.150 – 6.371 km',
      temp: '± 5.000 – 6.000 °C',
      state: 'Padat (Tekanan Ekstrem)',
      comp: 'Besi (Fe) & Nikel (Ni) Padat Kristalin',
      density: '~12,8 – 13,1 g/cm³',
      color: '#fff099',
      accent: '#f7c948'
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
      color: '#ff922b',
      accent: '#f2842c'
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
      color: '#c93b1e',
      accent: '#e4572e'
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
      color: '#eb5e28',
      accent: '#ff7b47'
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
      color: '#2b7bb9',
      accent: '#4ea8de'
    }
  ],
  slides: [
    {
      number: '1',
      title: 'Metode Seismik & Bukti Interior Bumi',
      desc: 'Pengeboran terdalam manusia (Kola Superdeep Borehole di Rusia) hanya mencapai ±12 km, nilai yang sangat kecil dibandingkan radius bumi 6.371 km. Pengetahuan interior bumi diperoleh secara tidak langsung melalui analisis rambatan gelombang gempa bumi (seismik):',
      badge: '🔬 Simulasi Gelombang Seismik P & S',
      hint: 'Gelombang P (biru) menembus inti cair; Gelombang S (kuning) terhenti di 2.900 km (Zona Bayangan).',
      focusLayer: null,
      chips: [
        { label: 'Gelombang P & S', val: 'Primer & Sekunder' },
        { label: 'Zona Bayangan', val: 'Shadow Zone 103°–142°' },
        { label: 'Kola Borehole', val: '12 km rekor bor' }
      ],
      points: [
        'Gelombang Primer (P): Merambat paling cepat, berupa gelombang kompresi longitudinal yang mampu menembus batuan padat maupun fluida cair.',
        'Gelombang Sekunder (S): Gelombang geser transversal yang HANYA merambat pada medium padat. Hilangnya gelombang S di kedalaman 2.900 km membuktikan keberadaan fluida logam cair di inti luar.'
      ],
      alert: {
        title: '🔬 Fenomena Zona Bayangan (Shadow Zone)',
        desc: 'Pembiasan gelombang P di batas mantel-inti menghasilkan zona hening 103°–142°, sedangkan gelombang S sama sekali tidak terdeteksi pada jarak sudut >103°.'
      }
    },
    {
      number: '2',
      title: 'Aplikasi Seismologi di Indonesia & Diskontinuitas',
      desc: 'Wilayah kepulauan Indonesia merupakan laboratorium alam seismotektonik paling dinamis di dunia:',
      badge: '📡 Bidang Diskontinuitas Moho & Gutenberg',
      hint: 'Pembiasan tajam gelombang gempa di batas Moho (~35 km), Gutenberg (2.900 km), & Lehmann (5.150 km).',
      focusLayer: null,
      chips: [
        { label: 'Diskontinuitas Moho', val: '~35–70 km' },
        { label: 'Batas Gutenberg', val: '2.900 km' },
        { label: 'InaTEWS BMKG', val: 'Peringatan Tsunami' }
      ],
      points: [
        'Tomografi Seismik BMKG: Rekaman gempa bumi diolah untuk memetakan kecepatan gelombang dan slab lempeng yang menunjam di bawah Pulau Sumatra dan Jawa.',
        'Mitigasi Bencana: Analisis kecepatan gelombang seismik memungkinkan sistem peringatan dini tsunami InaTEWS mendeteksi potensi bahaya dalam waktu di bawah 5 menit.'
      ],
      alert: {
        title: '💡 Kunci Diskontinuitas Seismik',
        desc: 'Perubahan densitas dan fase materi batuan secara mendadak terbukti dari lonjakan kecepatan gelombang seismik di batas Moho (kerak-mantel), Gutenberg (mantel-inti luar), dan Lehmann (inti luar-inti dalam).'
      }
    },
    {
      number: '3',
      title: 'Kerak Benua vs Kerak Samudra (SiAl vs SiMa)',
      desc: 'Kerak bumi adalah cangkang terluar tempat berlangsungnya seluruh biosfer dan peradaban:',
      badge: '🏔️ Kerak Benua (SiAl) vs Kerak Samudra (SiMa)',
      hint: 'Kerak benua tebal (30–70 km, ringan) vs kerak samudra tipis (5–10 km, padat & menunjam).',
      focusLayer: 4,
      chips: [
        { label: 'Kerak Benua', val: 'SiAl (Granitik)' },
        { label: 'Kerak Samudra', val: 'SiMa (Basaltik)' },
        { label: 'Kontras Densitas', val: '2,7 vs 3,0 g/cm³' }
      ],
      points: [
        'Kerak Benua (Continental Crust): Ketebalan 30–70 km, kaya Silika-Aluminium (SiAl), didominasi granit felsik berdensitas lebih ringan (~2,7 g/cm³).',
        'Kerak Samudra (Oceanic Crust): Ketebalan 5–10 km, kaya Silika-Magnesium (SiMa), didominasi basalt mafik berdensitas lebih padat (~3,0 g/cm³).'
      ],
      alert: {
        title: '💡 Implikasi Geologis Subduksi',
        desc: 'Karena massa jenis kerak samudra lebih tinggi, saat terjadi tumbukan konvergen lempeng samudra akan selalu tertekuk dan menunjam (subduksi) ke bawah lempeng benua.'
      }
    },
    {
      number: '4',
      title: 'Mantel Bumi, Litosfer & Astenosfer Plastis',
      desc: 'Mantel membentang hingga kedalaman 2.900 km dan mencakup 84% dari total volume bumi:',
      badge: '🔥 Arus Konveksi Termal Astenosfer & Mantel',
      hint: 'Sirkulasi panas mantel mengapungkan dan menggeser lempeng litosfer di atasnya.',
      focusLayer: 3,
      chips: [
        { label: 'Litosfer', val: '0–100 km (Kaku)' },
        { label: 'Astenosfer', val: '100–660 km (Plastis)' },
        { label: 'Mesosfer', val: '660–2.900 km (Padat)' }
      ],
      points: [
        'Litosfer: Lapisan kaku dan rapuh setebal ±100 km yang mencakup seluruh kerak dan mantel paling atas; terpecah menjadi lempeng-lempeng tektonik utama.',
        'Astenosfer: Lapisan mantel atas yang bersuhu tinggi dan bersifat plastis/deformabel, memungkinkan lempeng mengapung dan bergerak.',
        'Mesosfer: Mantel bawah yang kembali berfase padat kaku akibat tekanan litosferik bumi yang luar biasa besar.'
      ],
      alert: {
        title: '⚡ Mesin Penggerak Mantel',
        desc: 'Gradien gradien panas inti bumi memicu arus konveksi termal melingkar di mantel bumi, menjadi daya dorong dasar bagi pergeseran lempeng benua dan samudra.'
      }
    },
    {
      number: '5',
      title: 'Inti Luar Cair & Inti Dalam Padat (Fe-Ni)',
      desc: 'Inti bumi berpusat dari kedalaman 2.900 km hingga 6.371 km, tersusun dari paduan logam berat Besi (Fe) dan Nikel (Ni):',
      badge: '🧲 Efek Dinamo Inti Luar & Medan Magnet Bumi',
      hint: 'Konveksi logam Fe-Ni cair di Inti Luar membangkitkan perisai magnetosfer bumi.',
      focusLayer: 1,
      chips: [
        { label: 'Inti Luar', val: 'Cair (2.900–5.150 km)' },
        { label: 'Inti Dalam', val: 'Padat (>5.150 km)' },
        { label: 'Komposisi', val: 'Besi (Fe) & Nikel (Ni)' },
        { label: 'Geodynamo', val: 'Perisai Magnetosfer' }
      ],
      points: [
        'Inti Luar (Outer Core): Berfase cair. Aliran sirkulasi konveksi logam cair konduktif yang dipadukan rotasi bumi memicu efek dinamo (geodynamo) yang melahirkan medan magnet bumi.',
        'Inti Dalam (Inner Core): Bersuhu ekstrem mencapai >5.000–6.000 °C (setara permukaan matahari), namun berwujud padat kristalin akibat tekanan kompresi gravitasi bumi yang mencapai 3,6 juta atmosfer.'
      ],
      alert: {
        title: '🛡️ Perisai Kehidupan Biosfer',
        desc: 'Medan magnet hasil geodynamo inti luar melindungi atmosfer bumi dari badai angin matahari (solar wind) mematikan dan radiasi kosmik galaksi.'
      }
    }
  ]
};
