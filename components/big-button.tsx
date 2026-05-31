import { Pressable, Text, View } from 'react-native';

import { IconSymbol, type IconSymbolName } from '@/components/ui/icon-symbol';
import { colors } from '@/theme/colors';

type ButtonTone = 'primary' | 'accent' | 'shokudo';

export interface BigButtonProps {
  icon: IconSymbolName;
  label: string;
  sub?: string;
  onPress: () => void;
  tone?: ButtonTone;
}

// 円アイコンの背景・前景色（home.png の大ボタン3色）。className では円の動的色を当てづらいので定数から。
const CIRCLE: Record<ButtonTone, { bg: string; fg: string }> = {
  primary: { bg: colors.catHoiku.bg, fg: colors.primaryDk },
  accent: { bg: colors.catHiroba.bg, fg: colors.accentDk },
  shokudo: { bg: colors.catShokudo.bg, fg: colors.catShokudo.pin },
};

// ホームの大ボタン：円アイコン＋太字ラベル＋小サブ。
export function BigButton({ icon, label, sub, onPress, tone = 'primary' }: BigButtonProps) {
  const circle = CIRCLE[tone];
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      className="min-h-touch flex-1 items-center justify-center rounded-card border border-border bg-surface px-2 py-3 active:opacity-90">
      <View
        className="mb-2 h-12 w-12 items-center justify-center rounded-pill"
        style={{ backgroundColor: circle.bg }}>
        <IconSymbol name={icon} size={24} color={circle.fg} />
      </View>
      <Text className="text-body font-bold text-text">{label}</Text>
      {sub ? <Text className="mt-0.5 text-tag text-textSub">{sub}</Text> : null}
    </Pressable>
  );
}
