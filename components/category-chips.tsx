import { FilterChips, type FilterOption } from '@/components/filter-chips';
import { FACILITY_CATS } from '@/lib/categories';
import { FACILITY_LABEL } from '@/lib/labels';
import type { FacilityCat } from '@/types';

export type ChipValue = 'all' | FacilityCat;

export interface CategoryChipsProps {
  value: ChipValue;
  onChange: (next: ChipValue) => void;
  options?: ChipValue[]; // 既定は ['all', ...FACILITY_CATS]
}

function chipLabel(v: ChipValue): string {
  return v === 'all' ? 'すべて' : FACILITY_LABEL[v];
}

// マップ画面の施設カテゴリ絞り込みチップ。汎用 FilterChips にカテゴリ→ラベルを渡す薄いラッパ。
export function CategoryChips({ value, onChange, options }: CategoryChipsProps) {
  const items: ChipValue[] = options ?? ['all', ...FACILITY_CATS];
  const filterOptions: FilterOption<ChipValue>[] = items.map((v) => ({ value: v, label: chipLabel(v) }));
  return <FilterChips options={filterOptions} value={value} onChange={onChange} />;
}
