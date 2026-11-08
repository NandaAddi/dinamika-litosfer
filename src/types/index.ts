export interface SlideChip {
  label: string;
  val: string;
}

export interface SlideAlert {
  title: string;
  desc: string;
}

export interface SlideMetaCard {
  icon: string;
  title: string;
  desc: string;
}

export interface Slide {
  number: string;
  title: string;
  desc: string;
  focusLayer?: number | null;
  badge?: string;
  hint?: string;
  chips?: SlideChip[];
  points?: string[];
  alert?: SlideAlert;
  metaCards?: SlideMetaCard[];
  formula?: string;
}

export interface LayerInfo {
  id: string;
  index: number;
  name: string;
  depth: string;
  temp: string;
  state: string;
  comp: string;
  density: string;
  color: string;
  accent: string;
}

export interface ModuleData {
  id: string;
  num: number;
  name: string;
  slug: string;
  badge: string;
  title: string;
  description: string;
  bgImage: string;
  slides: Slide[];
  layers?: LayerInfo[];
}

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  answer: number; // 0 to 3
  explanation: string;
}

export interface QuizResult {
  score: number;
  correctCount: number;
  totalCount: number;
  isPassed: boolean;
  userAnswers: (number | null)[];
}

export interface ReferenceItem {
  category: string;
  citation: string;
  description: string;
}
