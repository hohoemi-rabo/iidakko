import { Text, View } from 'react-native';

import { TONE, type Tone } from '@/components/tokens';

export interface TagProps {
  label: string;
  tone: Tone;
  className?: string; // 外側の余白調整用
}

// 種別/年齢/日付/カテゴリ/緊急 等を表すピル型タグ。色は tone でトークン出し分け。
export function Tag({ label, tone, className }: TagProps) {
  const t = TONE[tone];
  return (
    <View className={`self-start rounded-pill px-2 py-0.5 ${t.bg} ${className ?? ''}`}>
      <Text className={`text-tag font-semibold ${t.tx}`}>{label}</Text>
    </View>
  );
}
