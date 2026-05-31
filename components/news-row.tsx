import { Pressable, Text, View } from 'react-native';

import { Tag } from '@/components/tag';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { colors } from '@/theme/colors';

export interface NewsRowProps {
  kind: 'event' | 'notice';
  date: string; // '6/14(日)' / '05.11'
  title: string;
  onPress: () => void;
}

// ホームの新着情報の行：タグ＋日付＋タイトル2行＋右chevron。
export function NewsRow({ kind, date, title, onPress }: NewsRowProps) {
  const isEvent = kind === 'event';
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="link"
      accessibilityLabel={title}
      className="min-h-touch flex-row items-center gap-3 rounded-card border border-border bg-surface p-3 active:opacity-90">
      <Tag label={isEvent ? 'イベント' : 'お知らせ'} tone={isEvent ? 'date' : 'info'} />
      <View className="flex-1">
        <Text className="text-tag text-textSub">{date}</Text>
        <Text className="text-body font-semibold text-text" numberOfLines={2}>
          {title}
        </Text>
      </View>
      <IconSymbol name="chevron.right" size={18} color={colors.textSub} />
    </Pressable>
  );
}
