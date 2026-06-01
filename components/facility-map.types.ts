import type { Facility } from '@/types';

// FacilityMap のプロップス（native / web フォールバックで共有）。
// react-native-maps を import しない純粋な型ファイルにしておくことで、
// web バンドルにネイティブ実装が混入するのを防ぐ。
export interface FacilityMapProps {
  facilities: Facility[];
  selectedId: string | null;
  onSelectFacility: (id: string) => void;
}
