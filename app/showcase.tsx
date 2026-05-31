// 【検証専用・後で削除】共通コンポーネント(02)の単体表示確認用ルート。
// タブ外のスタックルート（/showcase）。03〜06 で各画面に組み込んだら削除する。
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { ArticleCard } from '@/components/article-card';
import { BigButton } from '@/components/big-button';
import { CategoryChips, type ChipValue } from '@/components/category-chips';
import { EmergencyBanner } from '@/components/emergency-banner';
import { EventCard } from '@/components/event-card';
import { FacilityCard } from '@/components/facility-card';
import { MapListToggle, type MapListMode } from '@/components/map-list-toggle';
import { NewsRow } from '@/components/news-row';
import { SegmentedControl } from '@/components/segmented-control';
import { Tag } from '@/components/tag';
import { TONE, type Tone } from '@/components/tokens';
import { articles } from '@/data/articles';
import { emergencyContacts } from '@/data/emergency';
import { events } from '@/data/events';
import { facilities } from '@/data/facilities';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-2">
      <Text className="text-heading font-bold text-text">{title}</Text>
      {children}
    </View>
  );
}

export default function ShowcaseScreen() {
  const [seg, setSeg] = useState<'age' | 'purpose'>('age');
  const [mode, setMode] = useState<MapListMode>('map');
  const [chip, setChip] = useState<ChipValue>('all');
  const allTones = Object.keys(TONE) as Tone[];

  // 各施設カテゴリから1件ずつ（データにあるものだけ）。
  const sampleFacilities = facilities.slice(0, 4);

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <ScrollView contentContainerClassName="gap-6 p-4">
        <Text className="text-headingLg font-bold text-text">コンポーネント確認</Text>

        <Section title="EmergencyBanner">
          <EmergencyBanner
            title="こどもの急病・夜間の相談"
            subtitle={emergencyContacts[0]?.note}
            tel={emergencyContacts[0]?.tel ?? '#8000'}
          />
        </Section>

        <Section title="BigButton">
          <View className="flex-row gap-3">
            <BigButton
              icon="mappin.and.ellipse"
              label="マップ"
              sub="あずける・あそぶ"
              tone="primary"
              onPress={() => router.navigate('/map')}
            />
            <BigButton
              icon="magnifyingglass"
              label="さがす"
              sub="年齢・目的で"
              tone="accent"
              onPress={() => router.navigate('/search')}
            />
            <BigButton
              icon="calendar"
              label="イベント"
              sub="今月の予定"
              tone="shokudo"
              onPress={() => router.navigate('/events')}
            />
          </View>
        </Section>

        <Section title="Tag（全 tone）">
          <View className="flex-row flex-wrap gap-2">
            {allTones.map((t) => (
              <Tag key={t} label={t} tone={t} />
            ))}
          </View>
        </Section>

        <Section title="SegmentedControl / MapListToggle">
          <SegmentedControl<'age' | 'purpose'>
            options={[
              { value: 'age', label: '年齢でさがす' },
              { value: 'purpose', label: '目的でさがす' },
            ]}
            value={seg}
            onChange={setSeg}
          />
          <MapListToggle value={mode} onChange={setMode} />
        </Section>

        <Section title="CategoryChips">
          <CategoryChips value={chip} onChange={setChip} />
        </Section>

        <Section title="NewsRow">
          <NewsRow
            kind="event"
            date={events[0]?.date ?? ''}
            title={events[0]?.title ?? ''}
            onPress={() => {}}
          />
          <NewsRow
            kind="notice"
            date={articles[0]?.updatedAt ?? ''}
            title={articles[0]?.title ?? ''}
            onPress={() => {}}
          />
        </Section>

        <Section title="ArticleCard">
          {articles.slice(0, 2).map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </Section>

        <Section title="FacilityCard">
          {sampleFacilities.map((f) => (
            <FacilityCard key={f.id} facility={f} />
          ))}
        </Section>

        <Section title="EventCard">
          {events.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}
