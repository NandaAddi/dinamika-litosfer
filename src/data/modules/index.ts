import { modul1Data } from './modul1';
import { modul2Data } from './modul2';
import { modul3Data } from './modul3';
import { modul4Data } from './modul4';
import { ModuleData } from '../../types';

export const ALL_MODULES: Record<string, ModuleData> = {
  struktur: modul1Data,
  lempeng: modul2Data,
  vulkanisme: modul3Data,
  endogen: modul4Data
};

export { modul1Data, modul2Data, modul3Data, modul4Data };
