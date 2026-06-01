import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryChips, type ChipValue } from '@/components/category-chips';
import { FacilityCard } from '@/components/facility-card';
import { FacilityMap } from '@/components/facility-map';
import { MapListToggle, type MapListMode } from '@/components/map-list-toggle';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { facilities } from '@/data/facilities';
import { colors } from '@/theme/colors';

export default function MapScreen() {
  const [mode, setMode] = useState<MapListMode>('map');
  const [chip, setChip] = useState<ChipValue>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // カテゴリ絞り込み（地図ピン・一覧の両方に効く）。
  const filtered = useMemo(
    () => (chip === 'all' ? facilities : facilities.filter((f) => f.category === chip)),
    [chip]
  );

  // チップ変更：選択中施設が絞り込みから外れたら選択解除。
  const handleChip = (next: ChipValue) => {
    setChip(next);
    if (selectedId && next !== 'all' && facilities.find((f) => f.id === selectedId)?.category !== next) {
      setSelectedId(null);
    }
  };

  const selected = selectedId ? facilities.find((f) => f.id === selectedId) : undefined;

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      {/* ヘッダー：タイトル＋[地図|一覧]トグル */}
      <View className="flex-row items-center justify-between gap-3 px-4 pb-2 pt-1">
        <View className="flex-row items-center gap-2">
          <IconSymbol name="mappin.and.ellipse" size={22} color={colors.primaryDk} />
          <Text className="text-heading font-bold text-text">あずける・あそぶ場所</Text>
        </View>
        <View className="w-36">
          <MapListToggle value={mode} onChange={setMode} />
        </View>
      </View>

      {/* カテゴリ絞り込みチップ */}
      <CategoryChips value={chip} onChange={handleChip} />

      {/* 本体 */}
      <View className="flex-1">
        {mode === 'map' ? (
          <View className="flex-1">
            <FacilityMap
              facilities={filtered}
              selectedId={selectedId}
              onSelectFacility={setSelectedId}
            />
            {/* ピンタップでせり出す施設カード */}
            {selected ? (
              <Animated.View
                key={selected.id}
                entering={SlideInDown.duration(220)}
                className="absolute inset-x-0 bottom-0 p-4">
                <View className="gap-2">
                  <Pressable
                    onPress={() => setSelectedId(null)}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel="閉じる"
                    className="self-end rounded-pill border border-border bg-surface px-3 py-1 active:opacity-90">
                    <Text className="text-tag font-semibold text-textSub">閉じる ✕</Text>
                  </Pressable>
                  <FacilityCard facility={selected} />
                </View>
              </Animated.View>
            ) : null}
          </View>
        ) : (
          <ScrollView contentContainerClassName="gap-3 p-4 pb-8">
            {filtered.map((f) => (
              <FacilityCard key={f.id} facility={f} />
            ))}
            {filtered.length === 0 ? (
              <View className="rounded-card border border-border bg-surface p-6">
                <Text className="text-center text-body text-textSub">
                  該当する施設がありません。
                </Text>
              </View>
            ) : null}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
