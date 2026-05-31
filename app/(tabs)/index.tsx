import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BigButton } from '@/components/big-button';
import { EmergencyBanner } from '@/components/emergency-banner';
import { NewsRow } from '@/components/news-row';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { articles } from '@/data/articles';
import { emergencyContacts } from '@/data/emergency';
import { events } from '@/data/events';
import { openExternal } from '@/lib/links';
import { colors } from '@/theme/colors';

// 子育て手帳PDF（公式・実在確認済み。ハブ: kosodatenavi-31.html）
const BOOKLETS: { id: string; title: string; desc: string; url: string }[] = [
  {
    id: 'minna',
    title: 'みんなで子育てナビ',
    desc: '妊娠期〜未就学児期の子育て家庭向け',
    url: 'https://www.city.iida.lg.jp/uploaded/attachment/80148.pdf',
  },
  {
    id: 'papa',
    title: 'いいだパパナビ',
    desc: 'パパ向けの子育て・おでかけ情報',
    url: 'https://www.city.iida.lg.jp/uploaded/attachment/80149.pdf',
  },
  {
    id: 'mago',
    title: 'まご手帳',
    desc: '祖父母向けのいまどき子育て情報',
    url: 'https://www.city.iida.lg.jp/uploaded/attachment/80150.pdf',
  },
];

// 新着情報：イベントと記事を合成し、日付の降順で上位5件。
type News = { id: string; kind: 'event' | 'notice'; date: string; sortDate: string; title: string; url: string };

function buildNews(): News[] {
  const fromEvents: News[] = events.map((e) => ({
    id: e.id,
    kind: 'event',
    date: e.date,
    sortDate: e.sortKey,
    title: e.title,
    url: e.url,
  }));
  const fromArticles: News[] = articles.map((a) => ({
    id: a.id,
    kind: 'notice',
    date: a.updatedAt,
    sortDate: a.updatedAt,
    title: a.title,
    url: a.url,
  }));
  return [...fromEvents, ...fromArticles]
    .sort((a, b) => (a.sortDate < b.sortDate ? 1 : -1))
    .slice(0, 5);
}

function SectionHeader({ title, onMore }: { title: string; onMore?: () => void }) {
  return (
    <View className="flex-row items-end justify-between">
      <Text className="text-heading font-bold text-text">{title}</Text>
      {onMore ? (
        <Pressable onPress={onMore} hitSlop={8} accessibilityRole="link">
          <Text className="text-body font-semibold text-primaryDk">もっと見る</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function BookletCard({ title, desc, url }: { title: string; desc: string; url: string }) {
  return (
    <Pressable
      onPress={() => openExternal(url)}
      accessibilityRole="link"
      accessibilityLabel={title}
      className="min-h-touch flex-row items-center gap-3 rounded-card border border-border bg-surface p-4 active:opacity-90">
      <View
        className="h-11 w-11 items-center justify-center rounded-pill"
        style={{ backgroundColor: colors.catHiroba.bg }}>
        <IconSymbol name="book.fill" size={22} color={colors.catHiroba.pin} />
      </View>
      <View className="flex-1">
        <Text className="text-body font-bold text-text">{title}</Text>
        <Text className="mt-0.5 text-tag text-textSub">{desc}</Text>
      </View>
      <IconSymbol name="arrow.up.right.square" size={18} color={colors.textSub} />
    </Pressable>
  );
}

export default function HomeScreen() {
  const news = buildNews();
  const emergency = emergencyContacts[0];

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <ScrollView contentContainerClassName="gap-5 p-4 pb-8">
        {/* ヘッダー */}
        <View className="flex-row items-center gap-3 rounded-card bg-catHoiku-bg p-4">
          <View className="h-14 w-14 items-center justify-center rounded-pill bg-surface">
            <Text className="text-[28px]">🍎</Text>
          </View>
          <View className="flex-1">
            <Text className="text-headingLg font-bold text-primaryTx">いいだっこ</Text>
            <Text className="mt-0.5 text-body text-textSub">飯田の子育てを、ひとつのアプリに。</Text>
          </View>
        </View>

        {/* 緊急バナー */}
        <EmergencyBanner
          title="こどもの急病・夜間の相談"
          subtitle="♯8000（毎日19:00〜翌8:00）をタップで発信"
          tel={emergency?.tel ?? '#8000'}
          tone="coral"
        />

        {/* 大ボタン3つ */}
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

        {/* 新着情報 */}
        <View className="gap-2">
          <SectionHeader title="新着情報" onMore={() => router.navigate('/events')} />
          {news.map((n) => (
            <NewsRow
              key={`${n.kind}-${n.id}`}
              kind={n.kind}
              date={n.date}
              title={n.title}
              onPress={() => openExternal(n.url)}
            />
          ))}
        </View>

        {/* 子育て手帳（PDF） */}
        <View className="gap-2">
          <SectionHeader title="子育て手帳（PDF）" />
          {BOOKLETS.map((b) => (
            <BookletCard key={b.id} title={b.title} desc={b.desc} url={b.url} />
          ))}
        </View>

        {/* 出典 */}
        <Text className="mt-2 text-center text-tag text-textSub">
          情報の出典：飯田市子育て応援サイト
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
