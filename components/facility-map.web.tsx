import { Text, View } from 'react-native';

import { MapLegend } from '@/components/map-legend';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { colors } from '@/theme/colors';

import type { FacilityMapProps } from './facility-map.types';

// web / 非ネイティブ環境のフォールバック。react-native-maps は web 非対応のため、
// 地図は描画せず案内プレースホルダ＋凡例を表示する（Metro が web で自動選択）。
// props シグネチャはネイティブ版と同一（selectedId / onSelectFacility は web では未使用）。
export function FacilityMap(_props: FacilityMapProps) {
  return (
    <View className="flex-1 items-center justify-center gap-4 p-6">
      <View
        className="h-16 w-16 items-center justify-center rounded-pill"
        style={{ backgroundColor: colors.catAsobi.bg }}>
        <IconSymbol name="map" size={32} color={colors.catAsobi.pin} />
      </View>
      <Text className="text-center text-body font-bold text-text">
        地図はアプリ版でご利用いただけます
      </Text>
      <Text className="text-center text-body text-textSub">
        「一覧」に切り替えると施設を確認できます。
      </Text>
      <View className="w-44">
        <MapLegend />
      </View>
    </View>
  );
}
