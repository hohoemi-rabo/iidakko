import { Pressable, Text, View } from 'react-native';

import { Tag } from '@/components/tag';
import { IconSymbol, type IconSymbolName } from '@/components/ui/icon-symbol';
import { FACILITY_CAT_TONE } from '@/lib/categories';
import { FACILITY_LABEL } from '@/lib/labels';
import { callPhone, openDirections, openExternal } from '@/lib/links';
import { colors } from '@/theme/colors';
import type { Facility } from '@/types';

export interface FacilityCardProps {
  facility: Facility;
}

// カード下部の小アクションボタン（地図で見る / 電話 / 公式）。
function ActionButton({
  icon,
  label,
  onPress,
}: {
  icon: IconSymbolName;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      className="min-h-touch flex-1 flex-row items-center justify-center gap-1 rounded-pill border border-border bg-surface px-2 active:opacity-90">
      <IconSymbol name={icon} size={16} color={colors.primaryDk} />
      <Text className="text-tag font-semibold text-primaryTx">{label}</Text>
    </Pressable>
  );
}

// マップ／一覧の施設カード：種別タグ・対象年齢タグ・名称・地区・開所時間＋3アクション。
export function FacilityCard({ facility }: FacilityCardProps) {
  const hasGeo = facility.lat !== 0 || facility.lng !== 0;
  return (
    <View className="rounded-card border border-border bg-surface p-4">
      <View className="flex-row flex-wrap items-center gap-2">
        <Tag label={FACILITY_LABEL[facility.category]} tone={FACILITY_CAT_TONE[facility.category]} />
        {facility.ages ? <Tag label={facility.ages} tone="age" /> : null}
      </View>
      <Text className="mt-2 text-heading font-bold text-text">{facility.name}</Text>
      <Text className="mt-0.5 text-body text-textSub">
        {facility.area}
        {facility.hours ? `　／　${facility.hours}` : ''}
      </Text>
      {facility.note ? <Text className="mt-0.5 text-tag text-textSub">{facility.note}</Text> : null}

      <View className="mt-3 flex-row gap-2">
        {hasGeo ? (
          <ActionButton
            icon="map"
            label="地図で見る"
            onPress={() =>
              openDirections({ lat: facility.lat, lng: facility.lng, label: facility.name })
            }
          />
        ) : null}
        {facility.tel ? (
          <ActionButton icon="phone" label="電話" onPress={() => callPhone(facility.tel!)} />
        ) : null}
        {facility.url ? (
          <ActionButton
            icon="arrow.up.right.square"
            label="公式"
            onPress={() => openExternal(facility.url!)}
          />
        ) : null}
      </View>
    </View>
  );
}
