import { Text, View } from 'react-native';

import { FACILITY_CATS, facilityPinColor } from '@/lib/categories';
import { FACILITY_LABEL } from '@/lib/labels';

// 地図上の凡例「しせつの種類」。カテゴリ色ドット＋ラベルの縦並び（map.png 左上）。
// 地図モードのオーバーレイと、web フォールバックの両方で使う。
export function MapLegend() {
  return (
    <View className="rounded-card border border-border bg-surface/95 p-3">
      <Text className="mb-1.5 text-tag font-bold text-textSub">しせつの種類</Text>
      <View className="gap-1">
        {FACILITY_CATS.map((cat) => (
          <View key={cat} className="flex-row items-center gap-2">
            <View
              className="h-3 w-3 rounded-pill"
              style={{ backgroundColor: facilityPinColor(cat) }}
            />
            <Text className="text-tag text-text">{FACILITY_LABEL[cat]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
