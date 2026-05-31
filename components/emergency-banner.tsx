import { Pressable, Text, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { callPhone } from '@/lib/links';
import { colors } from '@/theme/colors';

export interface EmergencyBannerProps {
  title: string; // 'こどもの急病・夜間の相談'
  subtitle?: string; // '♯8000（毎日19:00〜翌8:00）をタップで発信'
  tel: string; // '#8000'
  tone?: 'coral' | 'danger'; // 既定 coral（ホーム）。きんきゅう画面は danger
}

// tone ごとの背景クラスと前景色（前景は className では当てづらいので colors から）。
const BANNER = {
  coral: { bg: 'bg-catHoiku-bg', fg: colors.primaryTx, icon: colors.primaryDk },
  danger: { bg: 'bg-danger-bg', fg: colors.danger.tx, icon: colors.danger.tx },
} as const;

// 緊急バナー。タップで発信。ホームは淡いコーラル、きんきゅう画面は赤系。
export function EmergencyBanner({ title, subtitle, tel, tone = 'coral' }: EmergencyBannerProps) {
  const c = BANNER[tone];
  return (
    <Pressable
      onPress={() => callPhone(tel)}
      accessibilityRole="button"
      accessibilityLabel={`${title} ${tel} に発信`}
      className={`min-h-touch flex-row items-center gap-3 rounded-card p-4 active:opacity-90 ${c.bg}`}>
      <IconSymbol name="exclamationmark.triangle.fill" size={24} color={c.icon} />
      <View className="flex-1">
        <Text className="text-headingSm font-bold" style={{ color: c.fg }}>
          {title}
        </Text>
        {subtitle ? (
          <Text className="mt-0.5 text-tag" style={{ color: c.fg }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <IconSymbol name="phone" size={22} color={c.icon} />
    </Pressable>
  );
}
