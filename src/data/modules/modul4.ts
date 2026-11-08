import { ModuleData } from '../../types';

export const modul4Data: ModuleData = {
  id: 'endogen',
  num: 4,
  name: 'Tenaga Endogen',
  slug: 'endogen',
  badge: '04 — Geomorfologi',
  title: 'Tenaga Endogen, Patahan, & Siklus Batuan',
  description: 'Menganalisis proses epirogenesa, orogenesa, deformasi lipatan migas, sesar horst-graben, siklus batuan lengkap, hingga amblesan antropogenik.',
  bgImage: '/assets/images/bg_endogen.jpg',
  slides: [
    {
      number: '1',
      title: 'Dinamika Endogen: Gerak Epirogenesa & Orogenesa',
      desc: 'Relief permukaan bumi dibangun dan diangkat oleh tenaga endogen yang bersifat konstruktif (membangun). Gerak tektonisme ini terbagi dalam dua dimensi ruang dan waktu:',
      badge: '🌐 Epirogenesa Lambat & Orogenesa Pegunungan',
      hint: 'Epirogenesa benua positif/negatif vs orogenesa pelipatan pegunungan.',
      chips: [
        { label: 'Tenaga Konstruktif', val: 'Pembangun Bentang Lahan' },
        { label: 'Epirogenesa', val: 'Vertikal Wilayah Luas' },
        { label: 'Orogenesa', val: 'Cepat & Jalur Sempit' }
      ],
      points: [
        'Gerak Epirogenesa (Pembentukan Benua): Pergerakan vertikal lapisan kulit bumi yang berlangsung lambat dalam skala waktu geologis jutaan tahun dan mencakup wilayah benua yang sangat luas.',
        'Epirogenesa Positif: Penurunan daratan relatif terhadap permukaan laut, sehingga muka air laut seolah-olah naik menenggelamkan pesisir (contoh: Kepulauan Maluku).',
        'Epirogenesa Negatif: Pengangkatan daratan relatif terhadap permukaan laut, sehingga muka air laut seolah-olah turun meninggalkan teras-teras pantai terangkat (contoh: Pulau Timor dan pesisir selatan Jawa).',
        'Gerak Orogenesa (Pembentukan Pegunungan): Proses deformasi kulit bumi yang berlangsung relatif lebih cepat pada busur wilayah yang sempit, memicu perlipatan (folds) dan pergeseran patahan (faults).'
      ],
      alert: {
        title: '💡 Kunci Pembeda Utama',
        desc: 'Epirogenesa mengubah ketinggian bentang benua secara menyeluruh tanpa mengubah struktur stratigrafi secara ekstrem, sedangkan orogenesa melipat dan mematahkan susunan batuan menjadi rantai pegunungan tinggi.'
      }
    },
    {
      number: '2',
      title: 'Deformasi Batuan: Lipatan (Fold) & Perangkap Migas',
      desc: 'Tegasan kompresi mendatar yang berlangsung secara perlahan pada lapisan batuan sedimen yang plastis elastis akan membengkokkan lapisan batuan tanpa membuatnya patah:',
      badge: '⛰️ Struktur Antiklin & Perangkap Minyak Bumi',
      hint: 'Punggung antiklin, lembah sinklin, dan perangkap hidrokarbon fluida migas.',
      chips: [
        { label: 'Antiklin', val: 'Punggung Cembung ke Atas' },
        { label: 'Sinklin', val: 'Lembah Cekung ke Bawah' },
        { label: 'Perangkap Migas', val: 'Anticlinal Trap' }
      ],
      points: [
        'Antiklin: Struktur punggung lipatan yang melengkung cembung ke atas, di mana batuan tertua berada pada bagian inti tengah lipatan.',
        'Sinklin: Struktur lembah lipatan yang melengkung cekung ke bawah, di mana batuan termuda berada pada sumbu depresi cekungan.',
        'Anticlinal Trap (Perangkap Minyak & Gas): Struktur kubah antiklin yang dilapisi batuan impermeable tudung (caprock seperti lempung/shale) merupakan struktur perangkap hidrokarbon minyak dan gas bumi paling bernilai ekonomis di dunia.',
        'Contoh di Indonesia: Cekungan Jawa Timur Utara (Cepu), Cekungan Sumatra Tengah (Duri-Minas), dan Antiklinorium Bogor.'
      ],
      alert: {
        title: '🛢️ Relevansi Industri Energi',
        desc: 'Pemetaan struktur antiklin seismik menjadi metode dasar bagi para ahli geologi eksplorasi migas (Pertamina dll.) untuk menentukan titik sumur pemboran minyak bumi.'
      }
    },
    {
      number: '3',
      title: 'Deformasi Patahan: Horst & Graben (Sesar)',
      desc: 'Ketika gaya tektonik yang bekerja melampaui batas elastisitas batuan (brittle limit), batuan akan retak, patah, dan mengalami pergeseran posisi (dislokasi sesar):',
      badge: '⚡ Blok Horst & Lembah Amblas Graben',
      hint: 'Hanging wall, footwall, bukit horst, dan lembah patahan graben (Ngarai Sianok).',
      chips: [
        { label: 'Hanging Wall', val: 'Blok di Atas Bidang Sesar' },
        { label: 'Footwall', val: 'Blok di Bawah Bidang Sesar' },
        { label: 'Horst & Graben', val: 'Pematang Tinggi & Lembah Depresi' }
      ],
      points: [
        'Anatomi Sesar: Bidang rekahan tempat bergesernya batuan disebut bidang sesar (fault plane). Blok di atas bidang sesar dinamakan Hanging Wall, sedangkan blok di bawahnya disebut Footwall.',
        'Horst (Tanah Naik): Blok kerak bumi yang tetap menjulang tinggi di antara dua bidang patahan turun yang mengapitnya.',
        'Graben / Slank (Tanah Turun): Blok kerak bumi yang amblas turun di antara dua bidang sesar membentuk lembah depresi berdinding terjal.',
        'Contoh Alam Spektakuler di Indonesia: Ngarai Sianok di Bukittinggi (Sumatra Barat), Lembah Graben Danau Singkarak, dan Lembah Danau Toba yang terbentuk di sepanjang jalur Sesar Semangko.'
      ],
      alert: {
        title: '🏞️ Panorama Geowisata Ngarai Sianok',
        desc: 'Lembah ngarai megah dengan dinding tebing vertikal setinggi 100–120 meter di Bukittinggi adalah bukti visual nyata dari graben aktif yang terus bergeser akibat Sesar Semangko.'
      }
    },
    {
      number: '4',
      title: 'Klasifikasi Sesar & Variasi Geometri Lipatan',
      desc: 'Orientasi dan arah tegasan gaya lempeng menentukan tipe sesar yang terbentuk di kerak bumi:',
      badge: '↕️ Sesar Normal, Sesar Naik, & Sesar Mendatar',
      hint: 'Gaya regangan tensional vs kompresi horizontal penekan lempeng.',
      chips: [
        { label: 'Sesar Turun (Normal)', val: 'Regangan Tensional' },
        { label: 'Sesar Naik (Reverse)', val: 'Kompresi Menekan' },
        { label: 'Gawir Sesar', val: 'Tebing Patahan Terjal' }
      ],
      points: [
        'Sesar Turun (Normal Fault): Hanging wall merosot turun relatif terhadap footwall akibat tegasan regangan (tarikan). Menghasilkan gawir sesar (fault scarp) curam.',
        'Sesar Naik (Reverse / Thrust Fault): Hanging wall terdorong naik ke atas melompati footwall akibat tegasan kompresi (tekanan). Sesar anjakan (thrust fault) dengan sudut kemiringan landai (<45°) umum dijumpai di zona penunjaman subduksi.',
        'Sesar Mendatar (Strike-Slip Fault): Pergeseran horizontal sejajar arah bidang sesar, dibedakan menjadi dekstral (ke kanan) atau sinistral (ke kiri).',
        'Variasi Lipatan Berdasarkan Tekanan: Lipatan tegak (simetris), lipatan asimetris/miring, lipatan rebah (recumbent fold), hingga lipatan kelopak nappe.'
      ],
      alert: {
        title: '⚡ Gawir Sesar Lembang',
        desc: 'Tebing memanjang puluhan kilometer di utara Cekungan Bandung (Gawir Sesar Lembang) merupakan manifestasi fisik dari pergeseran vertikal sesar aktif daratan.'
      }
    },
    {
      number: '5',
      title: 'Siklus Batuan (The Rock Cycle) Berkelanjutan',
      desc: 'Bumi adalah planet dinamis di mana materi batuan tidak pernah musnah, melainkan mengalami daur ulang terus-menerus melalui proses termal, mekanik, dan kimiawi:',
      badge: '🔄 Siklus Batuan Dinamis',
      hint: 'Transformasi berkelanjutan: Magma -> Batuan Beku -> Batuan Sedimen -> Batuan Metamorf.',
      chips: [
        { label: 'Magma ke Beku', val: 'Kristalisasi / Pembekuan' },
        { label: 'Beku ke Sedimen', val: 'Pelapukan, Erosi, Litifikasi' },
        { label: 'Sedimen ke Metamorf', val: 'Suhu (T) & Tekanan (P)' },
        { label: 'Metamorf ke Magma', val: 'Peleburan (Melting)' }
      ],
      points: [
        'Kristalisasi Magma: Magma cair pijar mendingin dan membeku membentuk batuan beku primer (plutonik di dalam kerak, vulkanik di permukaan).',
        'Pelapukan & Litifikasi Sedimen: Tenaga eksogen (air, angin, gletser, organisme) melapukkan dan mengerosi batuan di permukaan. Fragmen sedimen terangkut, diendapkan di cekungan, lalu mengalami kompaksi dan sementasi (litifikasi) menjadi batuan sedimen berlapis.',
        'Metamorfisme (Malihan): Tekanan dan suhu tinggi di kedalaman kerak merekayasa struktur kristal batuan padat tanpa meleburnya menjadi batuan metamorf.',
        'Peleburan Kembali: Batuan yang terseret jauh ke dalam mantel di zona subduksi akan melebur kembali menjadi magma cair baru.'
      ],
      alert: {
        title: '🔄 Jalur Silang Siklus',
        desc: 'Batuan beku dapat langsung bermetamorfosis tanpa melewati fase sedimen, batuan sedimen dapat tererosi kembali menjadi sedimen baru, dan batuan apa pun dapat langsung melebur kembali menjadi magma.'
      }
    },
    {
      number: '6',
      title: 'Siklus Batuan Sedimen & Nilai Ekonomisnya',
      desc: 'Akumulasi fragmen batuan terlapukkan, endapan kimiawi, dan sisa bahan organik purba yang mengalami pembatuan (litifikasi):',
      badge: '🪨 Batuan Sedimen Klastik, Kimiawi, & Organik',
      hint: 'Batu gamping karst Sewu, batu pasir kuarsa, dan endapan batu bara Tanjung Enim.',
      chips: [
        { label: 'Batu Gamping (CaCO₃)', val: 'Karst Pegunungan Sewu' },
        { label: 'Batu Pasir Kuarsa', val: 'Konstruksi & Silika' },
        { label: 'Batu Bara', val: 'Pembatubaraan Organik' }
      ],
      points: [
        'Batu Gamping (Limestone): Batuan sedimen karbonat (CaCO₃) dari koral dan cangkang biota laut dangkal purba; menyusun lanskap karst Pegunungan Sewu (Gunungkidul-Pacitan) dan Maros-Pangkep; bahan baku semen dan kapur.',
        'Batu Pasir (Sandstone): Batuan sedimen klastik hasil sementasi butir-butir kuarsa tahan lapuk; material konstruksi dan reservoar fluida bawah tanah.',
        'Batu Bara (Coal): Batuan sedimen organik hasil pembatubaraan (inkohlung) materi gambut rawa purba jutaan tahun lalu di bawah tekanan dan temperatur cekungan sedimen Sumatra Selatan (Tanjung Enim) dan Kalimantan Timur.'
      ],
      alert: {
        title: '⛏️ Cekungan Sedimen Penghasil Energi',
        desc: 'Batuan sedimen merupakan sumber daya energi fosil utama peradaban modern (batu bara, minyak bumi, dan gas alam) yang tersimpan di dalam cekungan sedimentasi purba.'
      }
    },
    {
      number: '7',
      title: 'Siklus Batuan Metamorf (Malihan) & Rekristalisasi',
      desc: 'Transformasi fase padat batuan yang dipicu oleh fluktuasi temperatur (T), tekanan terarah (P), atau sirkulasi fluida hidrotermal kimiawi tanpa mencairkan batuan:',
      badge: '💎 Metamorfisme Kontak, Dinamo, & Regional',
      hint: 'Marmer Campurdarat Tulungagung, kuarsit, dan batu sabak slate berlembar.',
      chips: [
        { label: 'Marmer', val: 'Batu Gamping Terekristalisasi' },
        { label: 'Batu Sabak (Slate)', val: 'Serpih Berlembar Tipis' },
        { label: 'Kuarsit', val: 'Batu Pasir Metamorf' }
      ],
      points: [
        'Marmer: Batuan metamorf hasil rekristalisasi batu gamping akibat intrusi magma panas atau tekanan regional. Sentra industri marmer terbesar di Jawa Timur berada di Campurdarat, Tulungagung, dimanfaatkan untuk lantai mewah dan seni pahat.',
        'Batu Sabak (Slate) & Filit: Metamorfisme tingkat rendah pada batuan serpih/lempung yang menghasilkan sifat belahan datar berlembar (foliasi), tahan asam dan air untuk atap genteng batu.',
        'Gneiss & Sekis: Batuan metamorf regional tingkat tinggi dengan foliasi pita-pita mineral terang dan gelap yang terpisah akibat tekanan deformasi lempeng yang teramat intens.'
      ],
      alert: {
        title: '💎 Rekristalisasi Tulungagung',
        desc: 'Marmer Tulungagung membuktikan bagaimana batu gamping purba yang tertekan dan terpanaskan selama proses tektonik orogenesa berubah menjadi batuan bernilai seni dan ekonomi tinggi.'
      }
    },
    {
      number: '8',
      title: 'Tenaga Eksogen & Amblesan Tanah Antropogenik',
      desc: 'Jika tenaga endogen bersifat membangun relief, tenaga eksogen bersama ulah manusia (antropogenik) bertindak sebagai perombak dan perata permukaan bumi:',
      badge: '🏙️ Amblesan Tanah Antropogenik & Sedimentasi Delta',
      hint: 'Land subsidence pesisir Jakarta-Semarang dan progradasi Delta Bengawan Solo.',
      chips: [
        { label: 'Delta Bengawan Solo', val: 'Progradasi Sedimentasi' },
        { label: 'Land Subsidence', val: 'Ambles 5–15 cm/tahun' },
        { label: 'Faktor Antropogenik', val: 'Eksploitasi Air Tanah' }
      ],
      points: [
        'Sedimentasi Delta Fluviatil: Pengendapan material rombakan erosi daerah hulu sungai di muara laut tenang; progradasi Delta Bengawan Solo menambah luas daratan baru ke Laut Jawa.',
        'Amblesan Tanah (Land Subsidence): Penurunan vertikal permukaan tanah di dataran pesisir kota besar (Jakarta Utara dan Semarang) yang mencapai 5 hingga 15 cm per tahun.',
        'Pemicu Antropogenik Kritis: Amblesan tanah perkotaan terutama dipercepat oleh ekstraksi air tanah dalam (deep aquifer) secara masif tanpa kendali, dipadukan beban fisik bangunan gedung bertingkat dan pemadatan alami sedimen aluvium muda.'
      ],
      alert: {
        title: '⚠️ Ancaman Rob & Bahaya Banjir Pesisir',
        desc: 'Amblesan tanah antropogenik menyebabkan lebih dari 40% wilayah Jakarta Utara kini berada di bawah permukaan air laut pasang, menuntut pembangunan tanggul laut dan pembatasan ketat sumur bor tanah.'
      }
    }
  ]
};
