import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, type Region } from 'react-native-maps';

import { MapLegend } from '@/components/map-legend';
import { facilityPinColor } from '@/lib/categories';
import type { Facility } from '@/types';

import type { FacilityMapProps } from './facility-map.types';

// 飯田市中心の初期表示。施設群（lat 35.42〜35.54 / lng 137.80〜137.87）を収める広さ。
const INITIAL_REGION: Region = {
  latitude: 35.515,
  longitude: 137.828,
  latitudeDelta: 0.085,
  longitudeDelta: 0.085,
};

// カテゴリ色のカスタムピン。選択中は一回り大きく＋濃い枠で強調。
function PinMarker({
  facility,
  selected,
  onPress,
}: {
  facility: Facility;
  selected: boolean;
  onPress: () => void;
}) {
  const color = facilityPinColor(facility.category);
  const size = selected ? 24 : 18;

  // カスタムView のマーカーは、初回（と見た目が変わる選択時）に tracksViewChanges=true で
  // ビューをマーカー画像へキャプチャし、その後 false に固定する。
  // 最初から false だと Android でマーカー画像が生成されず空（透明）になるため必須。
  const [tracks, setTracks] = useState(true);
  useEffect(() => {
    setTracks(true);
    const t = setTimeout(() => setTracks(false), 600);
    return () => clearTimeout(t);
  }, [selected]);

  return (
    <Marker
      coordinate={{ latitude: facility.lat, longitude: facility.lng }}
      onPress={onPress}
      tracksViewChanges={tracks}
      anchor={{ x: 0.5, y: 0.5 }}
      title={facility.name}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          borderWidth: selected ? 3 : 2,
          borderColor: '#FFFFFF',
        }}
      />
    </Marker>
  );
}

// react-native-maps ラッパー（ネイティブ）。施設をカテゴリ色ピンで表示し、ピンタップを親へ通知。
export function FacilityMap({ facilities, selectedId, onSelectFacility }: FacilityMapProps) {
  return (
    <View style={StyleSheet.absoluteFill}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        initialRegion={INITIAL_REGION}>
        {facilities.map((f) => (
          <PinMarker
            key={f.id}
            facility={f}
            selected={f.id === selectedId}
            onPress={() => onSelectFacility(f.id)}
          />
        ))}
      </MapView>
      {/* 凡例オーバーレイ（左上） */}
      <View className="absolute left-3 top-3 w-40" pointerEvents="none">
        <MapLegend />
      </View>
    </View>
  );
}
