import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Struktur Lapisan Bumi',
    question: 'Berdasarkan metode studi penjalaran gelombang seismik, berapa rentang ketebalan rata-rata dari kerak benua (continental crust)?',
    options: ['5–10 km', '30–70 km', '100–150 km', '2–5 km'],
    answer: 1,
    explanation: 'Kerak benua memiliki ketebalan 30–70 km, kaya Silika-Aluminium (SiAl), dan tersusun dari batuan granit felsik yang relatif ringan (~2,7 g/cm³).'
  },
  {
    id: 2,
    category: 'Struktur Lapisan Bumi',
    question: 'Kerak samudra (oceanic crust) memiliki karakteristik batuan penyusun utama yang bersifat...',
    options: ['Felsik (granit)', 'Karbonat koral', 'Mafik (basalt)', 'Gambut sedimen'],
    answer: 2,
    explanation: 'Kerak samudra berketebalan 5–10 km, kaya Silika-Magnesium (SiMa), dan didominasi batuan basalt mafik berdensitas tinggi (~3,0 g/cm³).'
  },
  {
    id: 3,
    category: 'Lempeng Tektonik',
    question: 'Arus konveksi termal mantel yang menjadi salah satu mesin penggerak lempeng tektonik berlangsung pada lapisan...',
    options: ['Inti dalam padat', 'Kerak bumi terluar', 'Inti luar cair', 'Mantel atas (astenosfer)'],
    answer: 3,
    explanation: 'Astenosfer adalah lapisan mantel atas yang bersuhu tinggi dan bersifat plastis/deformabel, tempat mengalirnya arus konveksi termal pemindah lempeng litosfer.'
  },
  {
    id: 4,
    category: 'Lempeng Tektonik',
    question: 'Dua lempeng tektonik yang bergerak saling menjauh di mana magma mantel naik membeku membentuk kerak samudra baru termasuk tipe batas pergerakan...',
    options: ['Konvergen', 'Divergen', 'Transform', 'Subduksi'],
    answer: 1,
    explanation: 'Batas divergen terjadi saat dua lempeng bergerak saling menjauh (seafloor spreading), menghasilkan pematang tengah samudra seperti Mid-Atlantic Ridge.'
  },
  {
    id: 5,
    category: 'Vulkanisme',
    question: 'Gunung Kilauea di Kepulauan Hawaii terkenal dengan aliran leleran lava yang mengalir tenang tanpa ledakan dahsyat. Jenis erupsi ini disebut...',
    options: ['Erupsi eksplosif', 'Erupsi efusif', 'Erupsi freatik', 'Erupsi plinian'],
    answer: 1,
    explanation: 'Magma basaltik encer bersuhu tinggi dan bersilika rendah menghasilkan erupsi efusif (leleran lava tenang tanpa ledakan dahsyat).'
  },
  {
    id: 6,
    category: 'Vulkanisme',
    question: 'Awan panas guguran kubah lava (nuée ardente d\'avalanche / wedhus gembel) yang meluncur deras di lereng Gunung Merapi atau Semeru merupakan fenomena...',
    options: ['Tenaga eksogen denudasi', 'Sedimentasi fluviatil', 'Vulkanisme (tipe Merapi)', 'Pelapukan kimiawi'],
    answer: 2,
    explanation: 'Merupakan fenomena vulkanisme tipe Merapi: lava andesitik kental membentuk kubah lava yang tidak stabil lalu runtuh terdorong gravitasi menjadi awan panas guguran bersuhu hingga 600 °C.'
  },
  {
    id: 7,
    category: 'Tenaga Endogen',
    question: 'Pada patahan sesar turun, blok kerak bumi di bagian tengah yang amblas turun di antara dua blok yang tetap tinggi disebut...',
    options: ['Horst', 'Graben (Slank)', 'Sesar Lembang', 'Antiklinorium'],
    answer: 1,
    explanation: 'Blok yang amblas turun di antara dua bidang patahan disebut Graben atau Slank (contoh: Ngarai Sianok Bukittinggi); sedangkan blok yang tetap tinggi disebut Horst.'
  },
  {
    id: 8,
    category: 'Tenaga Endogen',
    question: 'Gempa Cianjur 2022 dan sesar-sesar darat aktif di Pulau Jawa (Sesar Cimandiri, Sesar Lembang, Sesar Cugenang) merupakan manifestasi langsung dari...',
    options: ['Tenaga eksogen denudasi', 'Antropogenik murni', 'Endogen — Tektogenesis (Orogenesa)', 'Sedimentasi lakustrin'],
    answer: 2,
    explanation: 'Patahan/sesar aktif bersumber dari akumulasi tegasan lempeng tektonik di kerak bumi, tergolong tenaga endogen tektonisme (orogenesa).'
  },
  {
    id: 9,
    category: 'Geomorfologi & Dinamika Lingkungan',
    question: 'Penurunan muka tanah (land subsidence) di dataran pesisir Jakarta dan Semarang yang mencapai 5–15 cm/tahun terutama dipicu dan dipercepat oleh...',
    options: [
      'Arus konveksi mesosfer bumi',
      'Aktivitas antropogenik: eksploitasi air tanah dalam berlebihan & beban infrastruktur',
      'Pelapukan eksokarst dolina kapur',
      'Sedimentasi delta laut pasang'
    ],
    answer: 1,
    explanation: 'Eksploitasi air tanah dalam secara masif, beban infrastruktur fisik perkotaan, dan hilangnya resapan air adalah faktor antropogenik utama percepatan amblesan tanah.'
  },
  {
    id: 10,
    category: 'Geomorfologi & Tenaga Eksogen',
    question: 'Delta Bengawan Solo yang terus bertambah luas menjorok ke arah Laut Jawa merupakan bentang alam hasil bentukan proses...',
    options: [
      'Sedimentasi muara fluviatil (tenaga eksogen)',
      'Tektogenesis orogenik pegunungan',
      'Vulkanisme eksplosif bawah laut',
      'Epirogenesa negatif terangkat'
    ],
    answer: 0,
    explanation: 'Pengangkutan dan pengendapan material rombakan hasil erosi oleh aliran sungai di muara laut tenang merupakan proses sedimentasi fluviatil (tenaga eksogen).'
  },
  {
    id: 11,
    category: 'Siklus Batuan',
    question: 'Batuan andesit yang menjadi bahan baku utama penyusun mahakarya Candi Borobudur dan Prambanan tergolong ke dalam kelompok batuan...',
    options: ['Beku ekstrusif (vulkanik)', 'Sedimen klastik', 'Metamorf regional', 'Beku intrusif (plutonik)'],
    answer: 0,
    explanation: 'Andesit terbentuk dari pembekuan cepat leleran lava andesitik di permukaan bumi busur vulkanik, sehingga tergolong batuan beku ekstrusif.'
  },
  {
    id: 12,
    category: 'Siklus Batuan',
    question: 'Batu marmer bermutu tinggi dari Campurdarat, Tulungagung (Jawa Timur) terbentuk dari rekristalisasi batuan asal...',
    options: ['Batu pasir kuarsa', 'Basalt mafik', 'Batu bara organik', 'Batu gamping (limestone)'],
    answer: 3,
    explanation: 'Marmer adalah batuan metamorf hasil rekristalisasi mineral kalsit pada batu gamping akibat pengaruh temperatur tinggi dan tekanan deformasi tektonik.'
  },
  {
    id: 13,
    category: 'Tenaga Endogen',
    question: 'Sesar naik (reverse / thrust fault) pada litosfer bumi terbentuk terutama akibat dominasi gaya...',
    options: ['Regangan tensional', 'Geseran lateral murni', 'Pelapukan kimiawi batuan', 'Kompresi horizontal menekan'],
    answer: 3,
    explanation: 'Pada sesar naik, hanging wall terdorong naik melompati footwall akibat tegasan kompresi horizontal yang menekan lapisan kerak bumi.'
  }
];
