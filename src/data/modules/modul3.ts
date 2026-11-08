import { ModuleData } from '../../types';

export const modul3Data: ModuleData = {
  id: 'vulkanisme',
  num: 3,
  name: 'Vulkanisme Semeru',
  slug: 'vulkanisme',
  badge: '03 — Aktivitas Magmatik',
  title: 'Vulkanisme & Anatomi Gunung Semeru',
  description: 'Menganalisis proses naiknya magma, bentukan intrusi dan ekstrusi, material piroklastik, tipe letusan gunung api, serta genesis batuan beku.',
  bgImage: '/assets/images/bg_vulkanisme.jpg',
  slides: [
    {
      number: '1',
      title: 'Anatomi Gunung Api & Genesis Magma',
      desc: 'Vulkanisme adalah peristiwa naiknya magma dari interior mantel/kerak bumi menuju ke permukaan. Representasi Gunung Semeru (3.676 mdpl) di Jawa Timur menyajikan stratigrafi kerucut komposit berlapis:',
      badge: '🌋 Anatomi Kerucut Gunung Semeru',
      hint: 'Dapur magma, pipa kepundan, kawah aktif Jonggring Saloko, dan lapisan piroklastik.',
      chips: [
        { label: 'Gunung Semeru', val: '3.676 mdpl (Mahameru)' },
        { label: 'Kawah Aktif', val: 'Jonggring Saloko' },
        { label: 'Tipe Gunung', val: 'Stratovulkan Komposit' }
      ],
      points: [
        'Dapur Magma (Magma Chamber): Ruang penampungan di kerak bumi pada kedalaman 5–20 km tempat diferensiasi fraksinasi magma berlangsung.',
        'Pipa Kepundan (Vent/Diatrema): Saluran vertikal penghubung dapur magma ke puncak kawah yang dilalui fluida magma dan gas bertekanan.',
        'Kawah & Kaldera: Kawah adalah lubang bukaan letusan (seperti Jonggring Saloko); Kaldera adalah kawah raksasa yang terbentuk runtuh akibat kekosongan atap dapur magma pasca erupsi dahsyat (Toba, Krakatau, Bromo).'
      ],
      alert: {
        title: '🔬 Mekanisme Flux Melting',
        desc: 'Di zona subduksi Semeru, pelepasan fluida air dari lempeng samudra Indo-Australia ke dalam baji mantel (mantle wedge) menurunkan titik lebur batuan peridotit sehingga meleleh menjadi magma andesitik-basaltik.'
      }
    },
    {
      number: '2',
      title: 'Bentukan Intrusi Magma (Plutonisme)',
      desc: 'Tidak semua magma berhasil mencapai permukaan bumi. Magma yang mendingin dan membeku secara perlahan di dalam kerak membentuk formasi batuan beku intrusif:',
      badge: '🧱 Formasi Batuan Beku Intrusif',
      hint: 'Batolit, Lakolit, Sill horizontal, Dike vertikal, dan saluran Apolisa.',
      chips: [
        { label: 'Batolit', val: 'Pluton Raksasa (>100 km²)' },
        { label: 'Lakolit & Sill', val: 'Kubah & Lembar Datar' },
        { label: 'Dike & Apolisa', val: 'Korok Memotong Lapisan' }
      ],
      points: [
        'Batolit: Tubuh batuan beku raksasa berukuran lebih dari 100 km² yang membeku di kedalaman kerak dalam; inti dari banyak deretan pegunungan lipatan.',
        'Lakolit & Sill: Lakolit menerobos dan mengangkat lapisan sedimen di atasnya membentuk kubah cembung; Sill menyusup secara horizontal mendatar sejajar dengan perlapisan batuan.',
        'Dike (Korok/Gang) & Apolisa: Dike memotong lapisan batuan secara tegak lurus atau miring; cabang-cabang urat magma yang lebih halus disebut Apolisa.'
      ],
      alert: {
        title: '💡 Tekstur Kristal Faneritik',
        desc: 'Karena mendingin dengan laju sangat lambat di kedalaman bumi yang terisolasi panas, mineral penyusun batuan intrusif (seperti Granit dan Diorit) memiliki kristal kasar yang tampak jelas dengan mata telanjang.'
      }
    },
    {
      number: '3',
      title: 'Material Erupsi: Gas, Cair & Tefra Padat',
      desc: 'Saat erupsi vulkanik meletus, material dilepaskan dalam tiga wujud materi berbeda:',
      badge: '💨 Gas, Lava Cair, dan Piroklastik Padat',
      hint: 'Gas solfatara, aliran lava pijar, abu vulkanik halus, lapili, serta bom vulkanik.',
      chips: [
        { label: 'Gas Fumarol', val: 'H₂O, CO₂, SO₂, H₂S' },
        { label: 'Material Cair', val: 'Lava Pijar & Lahar' },
        { label: 'Tefra Padat', val: 'Abu, Lapili, Bom Vulkanik' }
      ],
      points: [
        'Emanasi Gas (Fumarol, Solfatara, Mofet): Uap air (H₂O mendominasi 70–90%), belerang SO₂/H₂S (kawah Ijen), dan gas beracun karbon dioksida CO₂.',
        'Material Cair (Lava & Lahar): Lava adalah lelehan magma di permukaan bumi; Lahar dingin terbentuk saat material piroklastik di lereng tersapu hujan lebat; Lahar panas dipicu oleh jebolnya danau kawah.',
        'Piroklastik (Tefra): Diklasifikasikan berdasarkan ukuran diameter: Abu/Debu (<2 mm), Kerikil Lapili (2–64 mm), serta Bom vulkanik (gumpalan lava membulat aerodinamis saat melayang di udara, >64 mm) dan Blok angular.'
      ],
      alert: {
        title: '⚠️ Ancaman Lahar Hujan Semeru',
        desc: 'Endapan jutaan meter kubik material piroklastik di lereng Semeru berisiko tinggi diterjang banjir lahar dingin melintasi DAS Besuk Kobokan, Curah Kobokan, dan Leprak saat musim penghujan.'
      }
    },
    {
      number: '4',
      title: 'Tipe Letusan Efusif vs Tipe Merapi',
      desc: 'Klasifikasi erupsi Macdonald (1972) ditentukan oleh derajat viskositas (kekentalan) magma dan besarnya tekanan gas vulkanik:',
      badge: '🟢 Erupsi Efusif vs Tipe Kubah Lava Merapi',
      hint: 'Aliran leleran basaltik tenang (Hawaii) vs guguran awan panas kubah lava (Merapi).',
      chips: [
        { label: 'Tipe Hawaii', val: 'Efusif Basaltik Encer' },
        { label: 'Tipe Merapi', val: 'Kubah Lava Kental' },
        { label: 'Awan Panas', val: 'Nuée Ardente d\'Avalanche' }
      ],
      points: [
        'Tipe Hawaii & Stromboli (Efusif): Magma basaltik encer bersuhu sangat tinggi (>1.100 °C) mengalir tenang membentuk gunung api perisai (shield volcano) seperti Mauna Loa dan Kilauea di Kepulauan Hawaii.',
        'Tipe Merapi: Magma andesitik yang kental menyumbat mulut kawah membentuk kubah lava (lava dome). Saat kubah terus membesar dan terdesak gravitasi, terjadi keruntuhan yang melepaskan awan panas guguran (wedhus gembel) bersuhu hingga 600 °C dengan kecepatan meluncur >150 km/jam.'
      ],
      alert: {
        title: '☁️ Fenomena Awan Panas Semeru & Merapi',
        desc: 'Awan panas guguran kubah lava di lereng Semeru (Besuk Kobokan) merupakan representasi bahaya vulkanik paling mematikan bagi masyarakat di radius Kawasan Rawan Bencana (KRB).'
      }
    },
    {
      number: '5',
      title: 'Tipe Letusan Plinian & St. Vincent',
      desc: 'Tipe letusan berkekuatan katastrofik dengan indeks letusan VEI (Volcanic Explosivity Index) tinggi:',
      badge: '🔴 Tipe Plinian & Banjir Lahar St. Vincent',
      hint: 'Kolom letusan menembus stratosfer (Krakatau 1883, Tambora 1815) dan letusan danau kawah Kelud.',
      chips: [
        { label: 'Tipe Plinian', val: 'Kolom Abu >20–50 km' },
        { label: 'Tambora 1815', val: 'Year Without a Summer' },
        { label: 'Tipe St. Vincent', val: 'Danau Kawah G. Kelud' }
      ],
      points: [
        'Tipe Plinian / Perret (Ultra-Eksplosif): Tekanan gas teramat dahsyat dari magma riolitik/dasitik kaya gas melontarkan tiang cendawan gas dan abu puluhan kilometer menembus stratosfer bumi. Contoh historis: Letusan Gunung Tambora 1815 (VEI 7) dan Krakatau 1883 (VEI 6).',
        'Tipe St. Vincent: Letusan eksplosif pada gunung yang memiliki danau kawah bervolume besar di puncaknya. Letusan memuntahkan seketika jutaan meter kubik air danau bercampur material kawah menjadi banjir lahar letusan primer (seperti letusan bersejarah Gunung Kelud Jawa Timur).'
      ],
      alert: {
        title: '🌍 Dampak Anomali Iklim Global',
        desc: 'Injeksi miliaran ton aerosol sulfat dari letusan Plinian Tambora 1815 ke lapisan stratosfer memantulkan radiasi surya dan memicu penurunan suhu global ekstrem, dikenal sebagai "Year Without a Summer" pada 1816 di Eropa dan Amerika Utara.'
      }
    },
    {
      number: '6',
      title: 'Tipe Letusan Vulkano & Pelee',
      desc: 'Dua variasi erupsi eksplosif khas lainnya yang diklasifikasikan oleh Macdonald (1972):',
      badge: '☁️ Tipe Vulkano & Tipe Pelee Lateral',
      hint: 'Awan kembang kol bertekanan sedang (Bromo) vs semburan awan panas lateral (Mont Pelée).',
      chips: [
        { label: 'Tipe Vulkano', val: 'Bom Roti & Awan Bunga Kol' },
        { label: 'Gunung Bromo', val: 'Aktivitas Ritmik' },
        { label: 'Tipe Pelee', val: 'Awan Panas Mendatar Lateral' }
      ],
      points: [
        'Tipe Vulkano: Erupsi eksplosif berskala sedang hingga kuat, ditandai dengan terbentuknya awan abu gelap menyerupai bentuk bunga kol dan lontaran bom vulkanik berkerak retak ("bread-crust bomb"). Contoh: Gunung Vulcano di Kepulauan Aeolian Italia dan fase letusan Gunung Bromo Jawa Timur.',
        'Tipe Pelee: Magma silisik yang terlampau kental membeku di saluran kawah membentuk sumbat tajam (spine), hingga gas di bawahnya meledak dan menyemburkan awan panas lateral berarah horizontal (nuée ardente d\'explosion). Contoh tragis: Letusan Mont Pelée di Martinik tahun 1902 yang melenyapkan kota Saint-Pierre dalam hitungan menit.'
      ],
      alert: {
        title: '💡 Pentingnya Zonasi KRB',
        desc: 'Karakteristik tipe letusan menentukan radius peta Kawasan Rawan Bencana (KRB) yang diterbitkan PVMBG/Badan Geologi untuk menentukan lokasi evakuasi aman.'
      }
    },
    {
      number: '7',
      title: 'Batuan Beku & Manfaat Vulkanisme bagi Kehidupan',
      desc: 'Meskipun membawa bahaya letusan, vulkanisme adalah berkah geologis terbesar yang menopang kehidupan dan peradaban manusia di Nusantara:',
      badge: '🏛️ Batuan Beku & Berkah Geologis Vulkanik',
      hint: 'Batu granit, andesit Borobudur, batu apung pumice, tanah andosol, dan energi panas bumi.',
      chips: [
        { label: 'Granit & Diorit', val: 'Beku Dalam (Plutonik)' },
        { label: 'Andesit & Basalt', val: 'Beku Luar (Candi Borobudur)' },
        { label: 'Tanah Andosol', val: 'Sangat Subur' },
        { label: 'Geotermal', val: 'Energi Terbarukan' }
      ],
      points: [
        'Granit (Plutonik): Batuan beku dalam berbutir kasar yang membeku perlahan; ditambang luas di Kepulauan Bangka-Belitung untuk lantai dan ornamen bangunan.',
        'Andesit & Basalt: Andesit adalah batuan beku leleran lava yang membeku cepat; batu kokoh penyusun mahakarya Candi Borobudur dan Prambanan; Basalt menyusun dasar samudra bumi.',
        'Batu Apung (Pumice) & Obsidian: Pumice terbentuk dari lava kaya gas yang mendingin cepat menyisakan rongga-rongga udara berpori; Obsidian adalah kaca vulkanik alami hasil pendinginan seketika.',
        'Kesuburan Tanah Andosol & Geotermal: Pelapukan abu vulkanik kaya unsur hara P, K, Ca menjadikan lereng gunung api sentra pertanian subur di Jawa-Sumatra-Bali; serta fluida magma menyediakan potensi energi panas bumi bersih (PLTP Kamojang, Dieng, Ijen).'
      ],
      alert: {
        title: '🌱 Filosofi Gemah Ripah Loh Jinawi',
        desc: 'Peradaban agraria Nusantara yang makmur sejak ribuan tahun silam bertumpu langsung pada tanah vulkanik muda (andosol) yang terus-menerus diremajakan oleh abu letusan gunung api.'
      }
    }
  ]
};
