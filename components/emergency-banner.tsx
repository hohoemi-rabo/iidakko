import { Pressable, Text, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { callPhone } from '@/lib/links';
import { colors } from '@/theme/colors';

export interface EmergencyBannerProps {
  title: string; // 'こどもの急病・夜間の相談'
  subtitle?: string; // '♯8000（毎日19:00〜翌8:00）をタップで発信'
  tel: string; // '#8000'
}

// ホーム上部の緊急バナー（赤系）。タップで発信。
export function EmergencyBanner({ title, subtitle, tel }: EmergencyBannerProps) {
  return (
    <Pressable
      onPress={() => callPhone(tel)}
      accessibilityRole="button"
      accessibilityLabel={`${title} ${tel} に発信`}
      className="min-h-touch flex-row items-center gap-3 rounded-card bg-danger-bg p-4 active:opacity-90">
      <IconSymbol name="exclamationmark.triangle.fill" size={24} color={colors.danger.tx} />
      <View className="flex-1">
        <Text className="text-headingSm font-bold text-danger-tx">{title}</Text>
        {subtitle ? <Text className="mt-0.5 text-tag text-danger-tx">{subtitle}</Text> : null}
      </View>
      <IconSymbol name="phone" size={22} color={colors.danger.tx} />
    </Pressable>
  );
}
