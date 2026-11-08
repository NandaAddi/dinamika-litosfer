// ==========================================================================
// MESIN FISIKA MAGMA & VOLKANOLOGI - DINAMIKA LITOSFER
// Kurikulum Merdeka Geografi SMA/MA (Fase E/F)
// Hubungan Silika (SiO2), Viskositas, Tekanan Gas, dan Gaya Erupsi
// ==========================================================================

export type EruptionRegime = 'hawaii' | 'stromboli' | 'vulcanian_semeru' | 'plinian';

export interface MagmaParams {
  silicaPercent: number; // 45% s.d. 75%
  gasContentPercent: number; // 0.5% s.d. 6.5%
}

export interface EruptionTelemetry {
  regime: EruptionRegime;
  regimeName: string;
  magmaType: string; // 'Basaltik (Basa)' | 'Andesitik (Intermediet)' | 'Riolitik / Dasitik (Asam)'
  temperatureCelsius: number; // Suhu lelehan (°C)
  viscosityRating: string; // 'Sangat Rendah (Encer)' | 'Sedang' | 'Kental' | 'Sangat Kental'
  gasPressureRating: string; // 'Rendah (Degassing Tenang)' | 'Sedang' | 'Tinggi (Fragmentasi Eksplosif)' | 'Ekstrem'
  vei: number; // Volcanic Explosivity Index (0 - 6)
  columnHeightKm: number; // Estimasi tinggi kolom abu (km)
  flowVelocityKmH: number; // Kecepatan aliran lava / awan panas (km/jam)
  primaryHazard: string;
  rockFormed: string;
  analogue: string; // Gunung api pembanding di Nusantara / Dunia
  explanation: string;
}

export const MAGMA_PRESETS: Record<
  string,
  { label: string; icon: string; silica: number; gas: number; desc: string }
> = {
  semeru: {
    label: 'Gunung Semeru (Jonggring Saloko)',
    icon: '🌋',
    silica: 58,
    gas: 3.8,
    desc: 'Tipe Vulkano & Awan Panas Guguran (Besuk Kobokan)'
  },
  kilauea: {
    label: 'Kilauea / Mauna Loa (Hawaii)',
    icon: '🏝️',
    silica: 48,
    gas: 1.2,
    desc: 'Erupsi Efusif Tenang, Lelehan Lava Basaltik Encer'
  },
  stromboli: {
    label: 'Gunung Stromboli (Italia)',
    icon: '🎆',
    silica: 51,
    gas: 4.6,
    desc: 'Air Mancur Lava Pijar Ritmik & Bom Balistik'
  },
  krakatau: {
    label: 'Krakatau 1883 / Tambora 1815',
    icon: '💥',
    silica: 71,
    gas: 5.8,
    desc: 'Letusan Katastrofik Ultra-Plinian Kolom Stratosfer'
  }
};

export function calculateMagmaPhysics(silica: number, gas: number): EruptionTelemetry {
  // 1. Tipe Magma & Suhu berdasarkan kadar SiO2
  let magmaType = 'Andesitik (Intermediet)';
  let tempC = 950;
  let viscosityRating = 'Sedang (Andesit)';
  let rockFormed = 'Andesit & Breksi Vulkanik';

  if (silica < 52) {
    magmaType = 'Basaltik (Basa)';
    tempC = Math.round(1100 + (52 - silica) * 10);
    viscosityRating = 'Sangat Rendah (Encer)';
    rockFormed = 'Basalt & Gabro';
  } else if (silica <= 63) {
    magmaType = 'Andesitik (Intermediet)';
    tempC = Math.round(850 + (63 - silica) * 15);
    viscosityRating = 'Sedang s.d. Kental';
    rockFormed = 'Andesit Piroklastik (Khas Semeru)';
  } else {
    magmaType = 'Riolitik / Dasitik (Asam)';
    tempC = Math.round(700 + (75 - silica) * 12);
    viscosityRating = 'Sangat Kental (Resisten)';
    rockFormed = 'Riolit, Obsidian & Batu Apung (Pumice)';
  }

  // 2. Tekanan Gas berdasarkan kandungan gas volatil
  let gasPressureRating = 'Sedang';
  if (gas < 2.0) {
    gasPressureRating = 'Rendah (Degassing Tenang Tanpa Ledakan)';
  } else if (gas <= 4.0) {
    gasPressureRating = 'Menengah (Tekanan Gas Cukup Tinggi)';
  } else if (gas <= 5.2) {
    gasPressureRating = 'Tinggi (Fragmentasi Eksplosif Kuat)';
  } else {
    gasPressureRating = 'Ekstrem (Peledakan Katastrofik)';
  }

  // 3. Klasifikasi Rezim Erupsi
  let regime: EruptionRegime = 'vulcanian_semeru';
  let regimeName = 'Tipe Vulkano (Semeru)';
  let vei = 2;
  let columnHeightKm = 3.5;
  let flowVelocityKmH = 95;
  let primaryHazard = 'Awan Panas Guguran (Besuk Kobokan) & Lontaran Bom Vulkanik';
  let analogue = 'Gunung Semeru (Kawah Jonggring Saloko, Jawa Timur)';
  let explanation =
    'Magma andesitik kental menyumbat kawah membentuk kubah lava. Saat tekanan gas menumpuk, kubah runtuh menghasilkan awan panas guguran (wedhus gembel).';

  if (silica < 53 && gas < 2.5) {
    // Hawaii / Efusif
    regime = 'hawaii';
    regimeName = 'Tipe Hawaii (Efusif Tenang)';
    vei = 0;
    columnHeightKm = Number((0.2 + gas * 0.2).toFixed(1));
    flowVelocityKmH = Math.round(15 + (52 - silica) * 2);
    primaryHazard = 'Aliran Lelehan Lava Pijar (Merusak Infrastruktur & Lahan)';
    analogue = 'Gunung Kilauea / Mauna Loa (Kepulauan Hawaii)';
    explanation =
      'Magma basaltik encer dengan kadar silika rendah memungkinkan gas volatil keluar secara tenang tanpa tekanan eksplosif, mengalir sebagai sungai lava.';
  } else if (silica < 55 && gas >= 2.5) {
    // Stromboli
    regime = 'stromboli';
    regimeName = 'Tipe Stromboli (Ritmik Fountaining)';
    vei = 1 + Math.min(1, Math.floor((gas - 2.5) / 1.5));
    columnHeightKm = Number((0.8 + gas * 0.4).toFixed(1));
    flowVelocityKmH = 25;
    primaryHazard = 'Lontaran Bom Balistik Pijar, Lapili & Hujan Abu Lokal';
    analogue = 'Gunung Stromboli (Italia) & Kawah Anak Krakatau Fase Awal';
    explanation =
      'Magma cair namun kaya gas membentuk gelembung gas besar (slugs) yang pecah di permukaan kawah, melontarkan air mancur lava pijar secara ritmik.';
  } else if (silica >= 64 && gas >= 4.2) {
    // Plinian
    regime = 'plinian';
    regimeName = 'Tipe Plinian / Katastrofik';
    vei = 5 + (gas >= 5.5 ? 1 : 0);
    columnHeightKm = Math.round(18 + (gas - 4.2) * 6);
    flowVelocityKmH = 150;
    primaryHazard = 'Kolom Abu Stratosfer, Gelombang Piroklastik Padat & Hujan Batu Apung Luas';
    analogue = 'Krakatau (1883), Tambora (1815) & Danau Toba (Supervolcano)';
    explanation =
      'Magma riolitik sangat kental menjebak gas bertekanan luar biasa. Pelepasan gas menghasilkan fragmentasi dahsyat dan tiang erupsi menembus stratosfer.';
  } else {
    // Default Semeru / Vulkano
    regime = 'vulcanian_semeru';
    regimeName = 'Tipe Vulkano (Khas Semeru & Merapi)';
    vei = Math.min(4, Math.max(2, Math.round(gas * 0.8)));
    columnHeightKm = Number((2.0 + gas * 1.2).toFixed(1));
    flowVelocityKmH = Math.round(60 + gas * 15);
    primaryHazard = 'Awan Panas Guguran (Besuk Kobokan) & Lontaran Bom Kawah';
    analogue = 'Gunung Semeru (Jawa Timur) & Gunung Merapi (DIY/Jateng)';
    explanation =
      'Viskositas andesitik sedang-tinggi khas sabuk subduksi Jawa. Erupsi berkala dengan kolom asap kembang kol dan bahaya luncuran awan panas mematikan.';
  }

  return {
    regime,
    regimeName,
    magmaType,
    temperatureCelsius: tempC,
    viscosityRating,
    gasPressureRating,
    vei,
    columnHeightKm,
    flowVelocityKmH,
    primaryHazard,
    rockFormed,
    analogue,
    explanation
  };
}
