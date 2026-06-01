import { Pressable, ScrollView, Text } from 'react-native';

export interface FilterOption<T extends string> {
  value: T;
  label: string;
}

export interface FilterChipsProps<T extends string> {
  options: FilterOption<T>[];
  value: T;
  onChange: (next: T) => void;
}

// 汎用の横スクロール・ピル絞り込み。選択＝薄コーラル塗り、未選択＝白＋淡ボーダー。
// マップのカテゴリ絞り込み（CategoryChips）・イベントのカテゴリ絞り込みで共用する。
export function FilterChips<T extends string>({ options, value, onChange }: FilterChipsProps<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      // 横スクロールの ScrollView は flex 親の中で縦方向に伸びてしまうため flexGrow:0 で内容高に固定。
      style={{ flexGrow: 0 }}
      contentContainerClassName="flex-row items-center gap-2 px-4 py-2">
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            className={`min-h-touch items-center justify-center rounded-pill border px-4 active:opacity-90 ${
              selected ? 'border-primary bg-catHoiku-bg' : 'border-border bg-surface'
            }`}>
            <Text
              className={`text-body font-semibold ${selected ? 'text-primaryDk' : 'text-textSub'}`}>
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
