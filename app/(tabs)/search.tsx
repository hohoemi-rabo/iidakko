import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ArticleCard } from '@/components/article-card';
import { SegmentedControl } from '@/components/segmented-control';
import { articles } from '@/data/articles';
import { AGE_LABEL, PURPOSE_LABEL } from '@/lib/labels';
import { colors } from '@/theme/colors';
import type { AgeBand, Purpose } from '@/types';

type Mode = 'age' | 'purpose';

type Tone = { bg: string };

// 年齢カード（2×2）。アイコンは絵文字＋カテゴリ色の丸バッジ（見た目重視のデモ）。
const AGE_CARDS: { value: AgeBand; emoji: string; tone: Tone }[] = [
  { value: 'pregnancy', emoji: '🤰', tone: colors.catHiroba },
  { value: 'age0_1', emoji: '👶', tone: colors.catHoiku },
  { value: 'age2_3', emoji: '🧒', tone: colors.catShokudo },
  { value: 'age4_6', emoji: '🎒', tone: colors.catAsobi },
];

// 目的カード（6枚）。
const PURPOSE_CARDS: { value: Purpose; emoji: string; tone: Tone }[] = [
  { value: 'care', emoji: '🧸', tone: colors.catHoiku },
  { value: 'support', emoji: '💰', tone: colors.catIchiji },
  { value: 'enroll', emoji: '🏫', tone: colors.catKodomoen },
  { value: 'outing', emoji: '🌳', tone: colors.catAsobi },
  { value: 'checkup', emoji: '🩺', tone: colors.catShokudo },
  { value: 'worry', emoji: '💬', tone: colors.catHiroba },
];

function CategoryCard({
  emoji,
  label,
  tone,
  selected,
  onPress,
}: {
  emoji: string;
  label: string;
  tone: Tone;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      className={`min-h-[120px] w-[48%] items-center justify-center gap-3 rounded-card border bg-surface p-4 active:opacity-90 ${
        selected ? 'border-primaryDk' : 'border-border'
      }`}>
      <View
        className="h-14 w-14 items-center justify-center rounded-pill"
        style={{ backgroundColor: tone.bg }}>
        <Text className="text-[28px]">{emoji}</Text>
      </View>
      <Text
        className={`text-center text-body font-bold ${selected ? 'text-primaryDk' : 'text-text'}`}>
        {label}
      </Text>
    </Pressable>
  );
}

export default function SearchScreen() {
  const [mode, setMode] = useState<Mode>('age');
  // 各モードで選択中の条件。初期値を入れておき、開いた直後から記事が出る（デモ映え）。
  const [selectedAge, setSelectedAge] = useState<AgeBand>('pregnancy');
  const [selectedPurpose, setSelectedPurpose] = useState<Purpose>('care');

  const selectedLabel =
    mode === 'age' ? AGE_LABEL[selectedAge] : PURPOSE_LABEL[selectedPurpose];

  // 選択条件で記事を絞り込み、更新日の新しい順に並べる。
  const filtered = useMemo(() => {
    const match =
      mode === 'age'
        ? (a: (typeof articles)[number]) => a.ages.includes(selectedAge)
        : (a: (typeof articles)[number]) => a.purposes.includes(selectedPurpose);
    return articles.filter(match).sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  }, [mode, selectedAge, selectedPurpose]);

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <ScrollView contentContainerClassName="gap-5 p-4 pb-8">
        {/* 見出し */}
        <View>
          <Text className="text-headingLg font-bold text-text">さがす</Text>
          <Text className="mt-0.5 text-body text-textSub">
            年齢や目的から、飯田市の子育て情報を見つけます。
          </Text>
        </View>

        {/* セグメント切替 */}
        <SegmentedControl<Mode>
          options={[
            { value: 'age', label: '年齢でさがす' },
            { value: 'purpose', label: '目的でさがす' },
          ]}
          value={mode}
          onChange={setMode}
        />

        {/* カード群（年齢＝2×2 / 目的＝6枚） */}
        <View className="flex-row flex-wrap justify-between gap-y-3">
          {mode === 'age'
            ? AGE_CARDS.map((c) => (
                <CategoryCard
                  key={c.value}
                  emoji={c.emoji}
                  label={AGE_LABEL[c.value]}
                  tone={c.tone}
                  selected={selectedAge === c.value}
                  onPress={() => setSelectedAge(c.value)}
                />
              ))
            : PURPOSE_CARDS.map((c) => (
                <CategoryCard
                  key={c.value}
                  emoji={c.emoji}
                  label={PURPOSE_LABEL[c.value]}
                  tone={c.tone}
                  selected={selectedPurpose === c.value}
                  onPress={() => setSelectedPurpose(c.value)}
                />
              ))}
        </View>

        {/* PDFカード化の注記 */}
        <Text className="text-center text-tag text-textSub">
          これまでPDFで配られていた情報をカード化しています。
        </Text>

        {/* 絞り込み結果 */}
        <View className="gap-2">
          <Text className="text-heading font-bold text-text">「{selectedLabel}」の情報</Text>
          {filtered.length ? (
            filtered.map((a) => <ArticleCard key={a.id} article={a} />)
          ) : (
            <View className="rounded-card border border-border bg-surface p-6">
              <Text className="text-center text-body text-textSub">
                該当する情報はまだ登録されていません。
              </Text>
            </View>
          )}
        </View>

        {/* 出典 */}
        <Text className="mt-2 text-center text-tag text-textSub">
          情報の出典：飯田市子育て応援サイト
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
