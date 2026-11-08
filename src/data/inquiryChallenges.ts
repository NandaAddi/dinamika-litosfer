export interface RevealedKnowledge {
  headline: string;
  fact: string;
  significance: string;
}

export interface InquiryChallenge {
  id: string;
  moduleId: string;
  targetSlide: number; // 0-indexed slide position where challenge activates
  title: string;
  badge: string;
  instruction: string;
  hint: string;
  targetType: 'layer' | 'part' | 'action';
  targetId?: number | string; // layer or part index
  targetAction?: string; // action name e.g. 'explode'
  xpReward: number;
  reflectionPrompt: string;
  revealedKnowledge: RevealedKnowledge;
}

export const INQUIRY_CHALLENGES: Record<string, InquiryChallenge> = {
  struktur: {
    id: 'inquiry-struktur',
    moduleId: 'struktur',
    targetSlide: 4, // Slide 5: Efek Dinamo (Geodynamo) Inti Luar Cair & Medan Magnet 3D
    title: 'Deteksi Generator Medan Magnet Bumi (Geodynamo)',
    badge: '🎯 MISI INKUIRI #01',
    instruction: 'Klik pada lapisan interior bumi yang berfasa cair dan mengalami konveksi logam berat (Fe-Ni) untuk menemukan sumber medan magnet pelindung bumi!',
    hint: 'Lapisan ini berada di kedalaman 2.900 hingga 5.150 km, tepat di atas inti dalam padat.',
    targetType: 'layer',
    targetId: 1, // Inti Luar (Outer Core)
    xpReward: 75,
    reflectionPrompt: 'Mengapa gelombang gempa transversal (S-wave) terhenti di batas mantel-inti dan tidak dapat menembus lapisan ini?',
    revealedKnowledge: {
      headline: 'Inti Luar Cair (Outer Core) Terkonfirmasi!',
      fact: 'Arus konveksi besi-nikel cair setebal 2.250 km yang dipadukan rotasi bumi bekerja layaknya kumparan dinamo raksasa (Geodynamo Effect).',
      significance: 'Tanpa fluida konveksi logam cair ini, medan magnet (magnetosfer) lenyap dan atmosfer bumi akan musnah disapu badai matahari (solar wind).'
    }
  },
  lempeng: {
    id: 'inquiry-lempeng',
    moduleId: 'lempeng',
    targetSlide: 2, // Slide 3: Batas Konvergen & Tripel Lempeng Indonesia
    title: 'Investigasi Geometri Penunjaman Megathrust',
    badge: '🎯 MISI INKUIRI #02',
    instruction: 'Klik pada lempeng kerak samudra (SiMa) yang menunjam ke bawah kerak benua (SiAl) pada zona Palung Sunda!',
    hint: 'Pilih blok slab samudra (warna biru/laut) di sisi kiri penampang geologi atau pilih pil Lempeng Samudra.',
    targetType: 'part',
    targetId: 1, // Lempeng Samudra & Slab Subduksi
    xpReward: 75,
    reflectionPrompt: 'Mengapa lempeng kerak samudra selalu menunjam ke bawah lempeng benua dan bukan sebaliknya?',
    revealedKnowledge: {
      headline: 'Slab Subduksi Megathrust Teridentifikasi!',
      fact: 'Massa jenis kerak samudra basaltik (~3,0 g/cm³) lebih padat dibandingkan kerak benua granitik (~2,7 g/cm³), memicu penunjaman gravitasi alami.',
      significance: 'Tarikan lempeng menunjam (slab pull) ke astenosfer menjadi penggerak utama akumulasi energi gempa megathrust dan magma busur vulkanik Nusantara.'
    }
  },
  vulkanisme: {
    id: 'inquiry-vulkanisme',
    moduleId: 'vulkanisme',
    targetSlide: 0, // Slide 1: Anatomi Gunung Semeru & Dapur Magma
    title: 'Pelacakan Ruang Magma Utama Semeru (Batolit)',
    badge: '🎯 MISI INKUIRI #03',
    instruction: 'Identifikasi reservoir magma raksasa di kedalaman 4–12 km di bawah kawah aktif Jonggring Saloko!',
    hint: 'Gunakan tombol [🧩 Pisahkan] atau klik langsung kantong magma pijar di dasar penampang Semeru.',
    targetType: 'part',
    targetId: 2, // Batolit & Dapur Magma Utama Semeru
    xpReward: 75,
    reflectionPrompt: 'Bagaimana akumulasi gas silikat pada dapur magma dapat memicu erupsi eksplosif kolom abu Mahameru?',
    revealedKnowledge: {
      headline: 'Dapur Magma Batolit Terverifikasi!',
      fact: 'Reservoir magma Semeru terbentuk dari dehidrasi dan peleburan sebagian slab lempeng Indo-Australia di kedalaman 100–150 km.',
      significance: 'Volume dapur magma yang besar menjaga suplai letusan berkala kawah Jonggring Saloko dan pembentukan kubah lava Besuk Kobokan.'
    }
  },
  endogen: {
    id: 'inquiry-endogen',
    moduleId: 'endogen',
    targetSlide: 3, // Slide 4: Lembah Patahan Graben / Slank
    title: 'Analisis Amblasan Blok Patahan (Graben)',
    badge: '🎯 MISI INKUIRI #04',
    instruction: 'Temukan blok batuan tengah (Hanging Wall) yang amblas ke bawah akibat gaya tarikan (tensional) tektonik!',
    hint: 'Pilih lembah sesar amblas di tengah blok yang membentuk bentang alam seperti Ngarai Sianok.',
    targetType: 'part',
    targetId: 3, // Lembah Patahan Graben / Slank
    xpReward: 75,
    reflectionPrompt: 'Apa perbedaan gaya geologi utama yang membentuk punggung Horst dibandingkan lembah Graben?',
    revealedKnowledge: {
      headline: 'Blok Graben Sesar Turun Teridentifikasi!',
      fact: 'Graben terbentuk saat tegangan regangan (tensional stress) menarik kerak bumi hingga blok tengah merosot di antara dua bidang sesar normal.',
      significance: 'Jalur Graben Semangko di sepanjang Bukit Barisan Sumatera menjadi jalur cekungan sedimen produktif, mata air panas, dan singkapan batu bara.'
    }
  }
};
