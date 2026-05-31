// コード値 → 日本語ラベルの変換。Tag やカード、さがすのセグメントで参照する。
import type { AgeBand, Purpose, FacilityCat, EventItem } from '@/types';

export const AGE_LABEL: Record<AgeBand, string> = {
  pregnancy: '妊娠〜出産',
  age0_1: '0〜1歳',
  age2_3: '2〜3歳',
  age4_6: '4〜6歳',
};

export const PURPOSE_LABEL: Record<Purpose, string> = {
  care: 'こどもを預ける',
  support: '支援・手当',
  enroll: '入園',
  outing: 'おでかけ',
  checkup: '健診と学級',
  worry: '子育てに悩んだら',
};

export const FACILITY_LABEL: Record<FacilityCat, string> = {
  hoiku: '保育園',
  kodomoen: '認定こども園',
  ichiji: '一時預かり',
  hiroba: 'つどいの広場',
  shokudo: 'こども食堂',
  asobi: '遊び場',
};

export const EVENT_CAT_LABEL: Record<EventItem['category'], string> = {
  food: 'こども食堂',
  lesson: '講座',
  hiroba: 'ひろば',
  other: 'その他',
};

// AgeBand 配列を表示用ラベルにまとめる。全4種そろっていれば「全年齢」、それ以外は「・」で連結。
const ALL_AGES: AgeBand[] = ['pregnancy', 'age0_1', 'age2_3', 'age4_6'];

export function agesLabel(ages: AgeBand[]): string {
  if (ages.length === 0) return '';
  if (ALL_AGES.every((a) => ages.includes(a))) return '全年齢';
  return ages.map((a) => AGE_LABEL[a]).join('・');
}
