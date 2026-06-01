import { Pressable, ScrollView, Text } from 'react-native';

import type { FacilityCat } from '@/types';
import { FACILITY_CATS } from '@/lib/categories';
import { FACILITY_LABEL } from '@/lib/labels';

export type ChipValue = 'all' | FacilityCat;

export interface CategoryChipsProps {
  value: ChipValue;
  onChange: (next: ChipValue) => void;
  options?: ChipValue[]; // 既定は ['all', ...FACILITY_CATS]
}

function chipLabel(v: ChipValue): string {
  return v === 'all' ? 'すべて' : FACILITY_LABEL[v];
}

// マップ画面の横スクロール絞り込みチップ。選択＝薄コーラル塗り、未選択＝白＋淡ボーダー。
export function CategoryChips({ value, onChange, options }: CategoryChipsProps) {
  const items: ChipValue[] = options ?? ['all', ...FACILITY_CATS];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      // 横スクロールの ScrollView は flex 親の中で縦方向に伸びてしまうため flexGrow:0 で内容高に固定。
      style={{ flexGrow: 0 }}
      contentContainerClassName="flex-row items-center gap-2 px-4 py-2">
      {items.map((v) => {
        const selected = v === value;
        return (
          <Pressable
            key={v}
            onPress={() => onChange(v)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            className={`min-h-touch items-center justify-center rounded-pill border px-4 active:opacity-90 ${
              selected ? 'border-primary bg-catHoiku-bg' : 'border-border bg-surface'
            }`}>
            <Text
              className={`text-body font-semibold ${selected ? 'text-primaryDk' : 'text-textSub'}`}>
              {chipLabel(v)}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
