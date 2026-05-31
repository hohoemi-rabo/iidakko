import { Pressable, Text, View } from 'react-native';

import { Tag } from '@/components/tag';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { EVENT_CAT_TONE } from '@/lib/categories';
import { EVENT_CAT_LABEL, agesLabel } from '@/lib/labels';
import { openExternal } from '@/lib/links';
import { colors } from '@/theme/colors';
import type { EventItem } from '@/types';

export interface EventCardProps {
  event: EventItem;
  dimmed?: boolean; // 過去イベントのグレーアウト（06用）
}

// イベントカード：日付タグ・カテゴリタグ・年齢タグ・タイトル・場所＋申込/詳細リンク。
export function EventCard({ event, dimmed }: EventCardProps) {
  const ages = agesLabel(event.ages);
  return (
    <Pressable
      onPress={() => openExternal(event.url)}
      accessibilityRole="link"
      accessibilityLabel={event.title}
      className={`rounded-card border border-border bg-surface p-4 active:opacity-90 ${
        dimmed ? 'opacity-50' : ''
      }`}>
      <View className="flex-row flex-wrap items-center gap-2">
        <Tag label={event.date} tone="date" />
        <Tag label={EVENT_CAT_LABEL[event.category]} tone={EVENT_CAT_TONE[event.category]} />
        {ages ? <Tag label={ages} tone="age" /> : null}
      </View>
      <Text className="mt-2 text-headingSm font-bold text-text">{event.title}</Text>
      <View className="mt-1 flex-row items-center gap-1">
        <IconSymbol name="mappin.and.ellipse" size={14} color={colors.textSub} />
        <Text className="flex-1 text-body text-textSub">
          {event.place}
          {event.needsApply ? '　／　申込が必要' : ''}
        </Text>
      </View>
    </Pressable>
  );
}
