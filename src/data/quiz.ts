import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Lempeng Tektonik',
    model3d: {
      viewer: 'tectonic',
      slideIndex: 3,
      hint: 'Putar model 3D untuk mengamati arah panah dua lempeng samudra dan rekahan pematang di tengahnya.'
    },
    question: 'Dua lempeng tektonik yang bergerak saling menjauh di mana magma mantel naik membeku membentuk kerak samudra baru termasuk tipe batas pergerakan...',
    options: ['Konvergen', 'Divergen', 'Transform', 'Subduksi'],
    answer: 1,
    explanation: 'Batas divergen terjadi saat dua lempeng bergerak saling menjauh (seafloor spreading), sehingga magma astenosfer naik mengisi celah rekahan dan membentuk kerak samudra baru.'
  },
  {
    id: 2,
    category: 'Lempeng Tektonik',
    question: 'Wilayah Indonesia berada pada pertemuan tiga lempeng besar, yaitu ....',
    options: [
      'Indo-Australia, Eurasia, dan Afrika',
      'Eurasia, Pasifik, dan Amerika Utara',
      'Pasifik, Antartika, dan Afrika',
      'Indo-Australia, Eurasia, dan Pasifik'
    ],
    answer: 3,
    explanation: 'Kepulauan Indonesia berada di titik pertemuan tripel tiga lempeng utama dunia: Lempeng Indo-Australia (dari selatan), Lempeng Eurasia (di utara-barat), dan Lempeng Pasifik (dari timur).'
  },
  {
    id: 3,
    category: 'Struktur Lapisan Bumi',
    model3d: {
      viewer: 'earth',
      slideIndex: 3,
      hint: 'Amati lapisan mantel atas tepat di bawah cangkang kerak bumi tempat arus konveksi berputar.'
    },
    question: 'Lapisan di bawah litosfer yang bersifat plastis sehingga memungkinkan lempeng tektonik bergerak adalah ....',
    options: ['Astenosfer', 'Kerak benua', 'Inti dalam', 'Inti luar'],
    answer: 0,
    explanation: 'Astenosfer berada tepat di bawah litosfer (kedalaman ~100–660 km), bersuhu tinggi dan bersifat plastis/deformabel sehingga mampu mengalirkan arus konveksi penggerak lempeng.'
  },
  {
    id: 4,
    category: 'Lempeng Tektonik',
    model3d: {
      viewer: 'tectonic',
      slideIndex: 2,
      hint: 'Amati lempeng samudra yang menunjam miring ke bawah lempeng benua pada animasi 3D.'
    },
    question: 'Tumbukan lempeng samudra dengan lempeng benua menyebabkan lempeng samudra menunjam dan membentuk ....',
    options: [
      'palung laut dan jalur gunung api',
      'punggung tengah samudra dan lembah retakan',
      'sesar mendatar dan gunung perisai',
      'dataran aluvial dan delta'
    ],
    answer: 0,
    explanation: 'Pada batas konvergen, lempeng samudra (SiMa) yang lebih padat menunjam di bawah lempeng benua (SiAl), membentuk palung laut dalam di zona penunjaman serta jalur gunung api di busur daratannya.'
  },
  {
    id: 5,
    category: 'Vulkanisme',
    question: 'Magma yang keluar ke permukaan bumi serta bercampur dengan material vulkanik dan air disebut ....',
    options: ['lava', 'bom vulkanik', 'abu vulkanik', 'lahar'],
    answer: 3,
    explanation: 'Lahar adalah aliran lumpur vulkanik yang terbentuk ketika material piroklastik hasil erupsi bercampur dengan air (baik air danau kawah pada lahar panas maupun air hujan lebat pada lahar dingin).'
  },
  {
    id: 6,
    category: 'Tenaga Endogen',
    model3d: {
      viewer: 'endogen',
      slideIndex: 1,
      hint: 'Putar blok geologi 3D dan perhatikan bagian punggungan lipatan yang melengkung cembung ke atas.'
    },
    question: 'Bagian lipatan yang melengkung ke atas membentuk punggungan disebut ....',
    options: ['sinklin', 'antiklin', 'horst', 'graben'],
    answer: 1,
    explanation: 'Antiklin adalah bagian punggung lipatan batuan yang melengkung cembung ke atas (dan sering menjadi perangkap migas), sedangkan bagian lembah yang cekung ke bawah disebut sinklin.'
  },
  {
    id: 7,
    category: 'Tenaga Endogen',
    model3d: {
      viewer: 'endogen',
      slideIndex: 2,
      hint: 'Amati blok batuan di bagian tengah yang bergerak turun di antara dua dinding sesar.'
    },
    question: 'Blok batuan yang turun relatif terhadap blok di sekitarnya akibat patahan disebut ....',
    options: ['horst', 'antiklin', 'graben', 'sinklin'],
    answer: 2,
    explanation: 'Graben (atau slank) adalah blok kerak bumi (hanging wall) yang amblas turun di antara dua bidang sesar, sementara blok di kiri-kanannya yang tetap tinggi disebut horst.'
  },
  {
    id: 8,
    category: 'Tenaga Endogen',
    model3d: {
      viewer: 'endogen',
      slideIndex: 0,
      hint: 'Bandingkan sisi kiri (pelipatan cepat jalur sempit) dengan gerak naik-turun daratan luas di sisi kanan.'
    },
    question: 'Gerakan tektonik yang lambat dan meluas sehingga menaikkan atau menurunkan daratan secara luas disebut ....',
    options: ['orogenesa', 'vulkanisme', 'epirogenesa', 'sedimentasi'],
    answer: 2,
    explanation: 'Epirogenesa adalah gerak vertikal pengangkatan (epirogenesa negatif) atau penurunan (epirogenesa positif) daratan yang berlangsung sangat lambat dalam cakupan wilayah benua yang luas.'
  },
  {
    id: 9,
    category: 'Siklus Batuan',
    question: 'Batuan sedimen terbentuk melalui proses ....',
    options: [
      'pembekuan magma di dalam bumi',
      'pengendapan dan pemadatan (litifikasi) material hasil erosi',
      'perubahan batuan akibat tekanan dan suhu tinggi',
      'pembekuan lava di permukaan'
    ],
    answer: 1,
    explanation: 'Batuan sedimen terbentuk dari fragmen hasil pelapukan dan erosi (atau endapan kimia/organik) yang terangkut, terendapkan di cekungan, lalu mengalami kompaksi dan sementasi (litifikasi).'
  },
  {
    id: 10,
    category: 'Vulkanisme',
    question: 'Gunung Kilauea di Kepulauan Hawaii terkenal dengan aliran leleran lava yang mengalir tenang tanpa ledakan dahsyat. Jenis erupsi ini disebut...',
    options: ['Erupsi eksplosif', 'Erupsi efusif', 'Erupsi freatik', 'Erupsi plinian'],
    answer: 1,
    explanation: 'Magma basaltik yang encer, bersilika rendah, dan bertekanan gas rendah menghasilkan erupsi efusif berupa leleran lava tenang tanpa letusan eksplosif besar.'
  },
  {
    id: 11,
    category: 'Vulkanisme',
    question: 'Awan panas guguran kubah lava (nuée ardente d\'avalanche / wedhus gembel) yang meluncur deras di lereng Gunung Merapi atau Semeru merupakan fenomena...',
    options: [
      'Tenaga eksogen denudasi',
      'Sedimentasi fluviatil',
      'Vulkanisme Tipe Merapi',
      'Pelapukan'
    ],
    answer: 2,
    explanation: 'Awan panas guguran kubah lava merupakan ciri khas vulkanisme Tipe Merapi, terjadi saat kubah lava andesitik yang kental di puncak kawah runtuh akibat gravitasi dan meluncur cepat menuruni lereng.'
  },
  {
    id: 12,
    category: 'Tenaga Endogen',
    question: 'Gempa Cianjur 2022 dan sesar-sesar darat aktif di Pulau Jawa (Sesar Cimandiri, Sesar Lembang, Sesar Cugenang) merupakan contoh fenomena...',
    options: [
      'Tenaga eksogen denudasi',
      'Antropogenik',
      'Tenaga endogen orogenesa',
      'Sedimentasi'
    ],
    answer: 2,
    explanation: 'Pembentukan serta pergeseran sesar-sesar darat aktif akibat kompresi tektonik berkecepatan relatif cepat di jalur sempit termasuk manifestasi tenaga endogen orogenesa.'
  },
  {
    id: 13,
    category: 'Geomorfologi & Dinamika Lingkungan',
    question: 'Penurunan muka tanah (land subsidence) di dataran pesisir Jakarta dan Semarang yang mencapai 5–15 cm/tahun terutama dipicu dan dipercepat oleh...',
    options: [
      'Arus konveksi mesosfer',
      'Aktivitas antropogenik eksploitasi air tanah',
      'Pelapukan karst',
      'Sedimentasi delta'
    ],
    answer: 1,
    explanation: 'Penyusutan akuifer akibat penyedotan air tanah dalam (deep groundwater extraction) secara berlebihan oleh aktivitas manusia (antropogenik), ditambah beban konstruksi, menjadi pemicu utama land subsidence pesisir.'
  },
  {
    id: 14,
    category: 'Kebencanaan Geologi',
    question: 'Gempa M 9,1 terjadi di dasar Samudra Hindia pada zona pertemuan Lempeng Indo-Australia dan Lempeng Eurasia, lalu memicu tsunami yang menewaskan lebih dari 200.000 jiwa. Proses tektonik utama penyebab gempa sekaligus tsunami tersebut adalah ....',
    options: [
      'Divergensi dua lempeng sehingga magma naik membentuk punggung samudra baru',
      'Subduksi Lempeng Indo-Australia ke bawah Lempeng Eurasia yang melepaskan energi dan mengangkat kolom air laut secara tiba-tiba',
      'Pergerakan transform antarlempeng yang menghasilkan gelombang seismik lateral',
      'Tumbukan lempeng benua yang membentuk pegunungan lipatan di dasar laut'
    ],
    answer: 1,
    explanation: 'Gempa Aceh 2004 terjadi pada zona megathrust subduksi konvergen; pelepasan regangan elastis mendadak mengangkat dasar samudra secara vertikal dan mendorong kolom air laut di atasnya menjadi gelombang tsunami besar.'
  },
  {
    id: 15,
    category: 'Kebencanaan Geologi',
    question: 'Letusan Plinian Krakatau memuntahkan sekitar 21 km³ material dan memicu tsunami setinggi hingga 30 m yang menewaskan sekitar 36.000 jiwa di pesisir Banten dan Lampung. Mekanisme tsunami Krakatau 1883 yang membedakannya dari tsunami Aceh 2004 adalah ....',
    options: [
      'Tsunami Krakatau dipicu sesar di Selat Sunda, sedangkan tsunami Aceh dipicu runtuhnya kaldera',
      'Tsunami Krakatau bersumber dari runtuhnya kaldera dan masuknya material vulkanik ke laut, sedangkan tsunami Aceh dari pergerakan vertikal dasar laut akibat gempa subduksi',
      'Tsunami Krakatau dipicu gelombang udara supersonik, sedangkan tsunami Aceh dipicu erupsi bawah laut',
      'Keduanya identik karena sama-sama dipicu zona subduksi Indo-Australia'
    ],
    answer: 1,
    explanation: 'Tsunami vulkanogenik Krakatau 1883 terutama dipicu oleh ambruknya tubuh gunung api membentuk kaldera bawah laut serta luncuran aliran piroklastik masif ke laut, sedangkan tsunami Aceh 2004 adalah tsunami tektonik akibat dislokasi vertikal dasar laut di zona subduksi.'
  }
];
