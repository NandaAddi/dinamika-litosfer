import { ModuleData } from '../../types';

export const modul2Data: ModuleData = {
  id: 'lempeng',
  num: 2,
  name: 'Lempeng Tektonik',
  slug: 'lempeng',
  badge: '02 — Dinamika Litosfer',
  title: 'Tektonik Lempeng & Busur Subduksi Nusantara',
  description: 'Menganalisis teori pengapungan benua, mekanisme penggerak lempeng, batas konvergen, divergen, transform, serta kerangka geologi Indonesia.',
  bgImage: '/assets/images/bg_lempeng.jpg',
  slides: [
    {
      number: '1',
      title: 'Hipotesis Continental Drift Alfred Wegener',
      desc: 'Pada tahun 1912, meteorolog dan geofisikawan Jerman Alfred Wegener mengemukakan hipotesis bahwa seluruh daratan bumi dahulu menyatu dalam superbenua tunggal Pangaea:',
      badge: '🧩 Rekonstruksi Superbenua Pangaea',
      hint: 'Kecocokan garis pantai Amerika Selatan & Afrika serta sebaran fosil flora Glossopteris.',
      chips: [
        { label: 'Alfred Wegener', val: 'Tahun 1912' },
        { label: 'Superbenua', val: 'Pangaea & Panthalassa' },
        { label: 'Fosil Identik', val: 'Glossopteris & Mesosaurus' }
      ],
      points: [
        'Kesesuaian Morfologi Garis Pantai: Lekukan pantai timur Amerika Selatan tampak cocok saling melengkapi dengan lekukan barat benua Afrika.',
        'Korelasi Fosil Purba: Fosil pakis berdaun lidah Glossopteris dan reptil air tawar Mesosaurus ditemukan melintasi batas samudra luas yang kini saling berjauhan.',
        'Struktur Geologi & Bukti Glasiasi: Formasi batuan pegunungan Appalachia di Amerika Utara memiliki kemiripan stratigrafi dengan Pegunungan Caledonian di Skotlandia dan Skandinavia.'
      ],
      alert: {
        title: '💡 Hambatan Teori Wegener Masa Silam',
        desc: 'Hipotesis Wegener sempat ditolak komunitas ilmiah karena ia belum mampu menjelaskan gaya fisika apa yang cukup kuat untuk mendorong benua-benua raksasa bergeser.'
      }
    },
    {
      number: '2',
      title: 'Teori Tektonik Lempeng & 3 Gaya Penggerak',
      desc: 'Teori modern berkembang pada dekade 1960-an lewat penemuan pemekaran dasar samudra (seafloor spreading) oleh Harry Hess dan pembalikan medan magnet bumi (paleomagnetisme):',
      badge: '⚡ 3 Gaya Penggerak Lempeng Tektonik',
      hint: 'Slab pull pada palung subduksi mendominasi 90% gaya penggerak lempeng litosfer.',
      chips: [
        { label: 'Harry Hess', val: 'Seafloor Spreading' },
        { label: 'Slab Pull', val: 'Gaya Tarik Penunjaman' },
        { label: 'Ridge Push', val: 'Gaya Dorong Pematang' }
      ],
      points: [
        'Konveksi Mantel Termal: Arus sirkulasi magma astenosfer yang merayap lambat akibat perpindahan energi panas dari inti luar bumi.',
        'Slab Pull (Tarikan Slab): Gaya gravitasi lempeng samudra yang telah tua, dingin, dan berdensitas tinggi saat tertekuk dan tenggelam ke mantel (gaya dominan penarik lempeng).',
        'Ridge Push (Dorongan Pematang): Gravitasi lereng tinggian kerak muda di pematang tengah samudra (mid-ocean ridge) yang mendorong lempeng bergerak menjauhi sumbu pemekaran.'
      ],
      alert: {
        title: '🔬 Pita Magnetik Dasar Samudra',
        desc: 'Pola zebra pita magnetik simetris di kedua sisi punggungan samudra membuktikan bahwa dasar samudra terus-menerus membelah dan diperbarui sepanjang zaman geologis.'
      }
    },
    {
      number: '3',
      title: 'Batas Konvergen & Tripel Pertemuan Lempeng Indonesia',
      desc: 'Batas konvergen terjadi saat lempeng saling mendekat dan bertumbukan. Kepulauan Indonesia merupakan titik pertemuan tripel spektakuler: Lempeng Indo-Australia, Eurasia, dan Pasifik:',
      badge: '🌊 Subduksi Busur Sunda & Megathrust',
      hint: 'Penunjaman Lempeng Indo-Australia ke bawah Lempeng Eurasia di Palung Jawa-Sumatra.',
      chips: [
        { label: 'Batas Konvergen', val: 'Subduksi & Kolisi' },
        { label: 'Palung Sunda', val: 'Kedalaman ±7.200 m' },
        { label: 'Megathrust', val: 'Pemicu Gempa Dahsyat' }
      ],
      points: [
        'Subduksi Palung Sunda: Lempeng Indo-Australia menunjam miring (oblique subduction) di barat Sumatra hingga selatan Nusa Tenggara, membentuk palung laut berkedalaman >7.000 meter.',
        'Busur Vulkanik & Prisma Akresi: Peleburan parsial slab lempeng memicu jalur gunung api aktif Busur Sunda, sementara endapan sedimen yang terserut membentuk pulau busur luar non-vulkanik (Nias, Mentawai, Enggano).',
        'Zona Sunda Megathrust: Bidang kontak gesek seismogenik raksasa yang mengakumulasi tegangan elastis dan memicu gempa megathrust serta tsunami besar (Gempa Aceh 2004).'
      ],
      alert: {
        title: '🌋 Ring of Fire Nusantara',
        desc: 'Konvergensi lempeng inilah yang menjadikan Indonesia memiliki lebih dari 127 gunung api aktif dan menjadikannya wilayah seismotektonik paling dinamis di planet bumi.'
      }
    },
    {
      number: '4',
      title: 'Batas Divergen & Pemekaran Kerak Samudra',
      desc: 'Dua lempeng tektonik bergerak saling menjauh (rifting/spreading). Celah rekahan yang terbuka segera diisi oleh lelehan magma mantel yang mendingin membentuk kerak basaltik baru:',
      badge: '🌋 Pemekaran Dasar Samudra & Celah Retakan',
      hint: 'Pematang Tengah Samudra (Mid-Ocean Ridge) dan Lembah Retakan Benua (Rift Valley).',
      chips: [
        { label: 'Mid-Atlantic Ridge', val: 'Pematang Atlantik' },
        { label: 'East African Rift', val: 'Lembah Retakan Benua' },
        { label: 'Kerak Baru', val: 'Basaltik SiMa' }
      ],
      points: [
        'Mid-Oceanic Ridge: Rantai pegunungan bawah laut terpanjang di bumi (>65.000 km) dengan aktivitas hidrotermal ventilasi hitam (black smokers).',
        'East African Rift System: Contoh retakan di daratan benua Afrika Timur yang kelak dalam puluhan juta tahun akan terpisah dan terisi oleh samudra baru.',
        'Keseimbangan Kerak Global: Kecepatan pembentukan kerak baru di batas divergen mengimbangi volume kerak yang dihancurkan di palung subduksi konvergen.'
      ],
      alert: {
        title: '⚖️ Teori Kesetimbangan Tektonik',
        desc: 'Meskipun dasar samudra terus membelah dan bertambah luas, ukuran total bola bumi tidak membesar karena volume kerak baru diseimbangkan oleh peleburan kerak lama di zona subduksi.'
      }
    },
    {
      number: '5',
      title: 'Batas Transform & Sistem Sesar Geser Mendatar',
      desc: 'Dua lempeng bergerak berpapasan secara horizontal (strike-slip). Pada batas ini tidak terjadi penambahan maupun peleburan kerak bumi, namun menghasilkan akumulasi tegasan geser tinggi:',
      badge: '⚠️ Sesar Geser Mendatar & Bahaya Gempa Darat',
      hint: 'Sesar Besar Sumatra (Sesar Semangko), Sesar Palu-Koro, dan Sesar Lembang.',
      chips: [
        { label: 'Sesar San Andreas', val: 'California, AS' },
        { label: 'Sesar Semangko', val: 'Sumatra (1.900 km)' },
        { label: 'Sesar Palu-Koro', val: 'Sulawesi Tengah' }
      ],
      points: [
        'Sesar Besar Sumatra (The Great Sumatran Fault / Sesar Semangko): Sistem sesar geser dekstral aktif sepanjang 1.900 km dari Teluk Semangka hingga Laut Andaman, membelah Bukit Barisan.',
        'Sesar Palu-Koro: Sesar geser sinistral di Sulawesi Tengah dengan laju geser sangat tinggi (±35–44 mm/tahun) yang memicu Gempa & Likuifaksi Palu 2018.',
        'Bahaya Sesar Darat Aktif di Pulau Jawa: Sesar Cimandiri, Sesar Lembang (Bandung), Sesar Opak (Yogyakarta), dan Sesar Cugenang (Cianjur 2022) dengan hiposentrum dangkal yang merusak pemukiman.'
      ],
      alert: {
        title: '⚠️ Risiko Gempa Dangkal Darat',
        desc: 'Meskipun magnitudo gempa sesar darat sering kali lebih kecil dibanding gempa megathrust bawah laut, kedalaman pusat gempanya yang sangat dangkal (0–15 km) membuatnya sangat destruktif bagi pemukiman warga.'
      }
    }
  ]
};
