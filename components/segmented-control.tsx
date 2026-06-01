import { Pressable, Text, View } from 'react-native';

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
}

export interface SegmentedControlProps<T extends string> {
  options: [SegmentOption<T>, SegmentOption<T>]; // 2分割
  value: T;
  onChange: (next: T) => void;
  labelClassName?: string; // ラベルのサイズ等を上書き（既定は text-body）
}

// 汎用2分割トグル（[年齢でさがす | 目的でさがす] 等）。選択側はコーラル塗り＋白文字。
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  labelClassName = 'text-body',
}: SegmentedControlProps<T>) {
  return (
    <View className="flex-row rounded-pill border border-border bg-surface p-1">
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            className={`min-h-touch flex-1 items-center justify-center rounded-pill px-3 active:opacity-90 ${
              selected ? 'bg-primary' : 'bg-transparent'
            }`}>
            <Text
              className={`${labelClassName} font-bold ${selected ? 'text-surface' : 'text-textSub'}`}>
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
