// 施設カテゴリ・イベントカテゴリ → 表示 tone / ピン色 の集約。
import type { FacilityCat, EventItem } from '@/types';
import type { Tone } from '@/components/tokens';
import { colors } from '@/theme/colors';

// 絞り込みチップの並び順（map.png の凡例順）。
export const FACILITY_CATS: FacilityCat[] = [
  'hoiku',
  'kodomoen',
  'ichiji',
  'hiroba',
  'shokudo',
  'asobi',
];

// 施設カテゴリ → Tag の tone（tone 名はカテゴリ名と一致）。
export const FACILITY_CAT_TONE: Record<FacilityCat, Tone> = {
  hoiku: 'hoiku',
  kodomoen: 'kodomoen',
  ichiji: 'ichiji',
  hiroba: 'hiroba',
  shokudo: 'shokudo',
  asobi: 'asobi',
};

// 地図マーカーのピン色（className では当てられないため colors から取得。05 で使用）。
export function facilityPinColor(cat: FacilityCat): string {
  switch (cat) {
    case 'hoiku':
      return colors.catHoiku.pin;
    case 'kodomoen':
      return colors.catKodomoen.pin;
    case 'ichiji':
      return colors.catIchiji.pin;
    case 'hiroba':
      return colors.catHiroba.pin;
    case 'shokudo':
      return colors.catShokudo.pin;
    case 'asobi':
      return colors.catAsobi.pin;
  }
}

// イベントカテゴリ → Tag の tone。
export const EVENT_CAT_TONE: Record<EventItem['category'], Tone> = {
  food: 'shokudo',
  lesson: 'info',
  hiroba: 'hiroba',
  other: 'info',
};
