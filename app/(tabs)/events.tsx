import { useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EventCard } from '@/components/event-card';
import { FilterChips, type FilterOption } from '@/components/filter-chips';
import { events } from '@/data/events';
import { EVENT_CAT_LABEL } from '@/lib/labels';
import type { EventItem } from '@/types';

type CatFilter = 'all' | EventItem['category'];

const FILTER_OPTIONS: FilterOption<CatFilter>[] = [
  { value: 'all', label: 'すべて' },
  { value: 'food', label: EVENT_CAT_LABEL.food },
  { value: 'lesson', label: EVENT_CAT_LABEL.lesson },
  { value: 'hiroba', label: EVENT_CAT_LABEL.hiroba },
  { value: 'other', label: EVENT_CAT_LABEL.other },
];

// 'YYYY-MM-DD' を返す（sortKey と同形式なので辞書順で日付比較できる）。
function todayKey(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export default function EventsScreen() {
  const [cat, setCat] = useState<CatFilter>('all');

  const { upcoming, past } = useMemo(() => {
    const today = todayKey();
    const filtered = cat === 'all' ? events : events.filter((e) => e.category === cat);
    return {
      // 今後：日付昇順（近い順）／終了：降順（最近終わった順）
      upcoming: filtered
        .filter((e) => e.sortKey >= today)
        .sort((a, b) => (a.sortKey < b.sortKey ? -1 : 1)),
      past: filtered
        .filter((e) => e.sortKey < today)
        .sort((a, b) => (a.sortKey < b.sortKey ? 1 : -1)),
    };
  }, [cat]);

  const isEmpty = upcoming.length === 0 && past.length === 0;

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      {/* 見出し */}
      <View className="px-4 pb-2 pt-1">
        <Text className="text-headingLg font-bold text-text">イベント・おでかけ</Text>
        <Text className="mt-0.5 text-body text-textSub">飯田市の子育てイベントを日付順に。</Text>
      </View>

      {/* カテゴリ絞り込み */}
      <FilterChips options={FILTER_OPTIONS} value={cat} onChange={setCat} />

      {/* リスト */}
      <ScrollView contentContainerClassName="gap-3 p-4 pb-8">
        {upcoming.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}

        {past.length > 0 ? (
          <>
            <Text className="mt-2 text-headingSm font-bold text-textSub">終了したイベント</Text>
            {past.map((e) => (
              <EventCard key={e.id} event={e} dimmed />
            ))}
          </>
        ) : null}

        {isEmpty ? (
          <View className="rounded-card border border-border bg-surface p-6">
            <Text className="text-center text-body text-textSub">
              該当するイベントはありません。
            </Text>
          </View>
        ) : null}

        {/* 注記・出典 */}
        <Text className="mt-2 text-center text-tag text-textSub">
          これまでPDFで配られていた情報をカード化しています。
        </Text>
        <Text className="text-center text-tag text-textSub">情報の出典：飯田市公式サイト</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
