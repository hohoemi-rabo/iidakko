import { SegmentedControl } from '@/components/segmented-control';

export type MapListMode = 'map' | 'list';

export interface MapListToggleProps {
  value: MapListMode;
  onChange: (next: MapListMode) => void;
}

// マップ画面の [地図 | 一覧] トグル。SegmentedControl の薄いラッパー。
export function MapListToggle({ value, onChange }: MapListToggleProps) {
  return (
    <SegmentedControl<MapListMode>
      options={[
        { value: 'map', label: '地図' },
        { value: 'list', label: '一覧' },
      ]}
      value={value}
      onChange={onChange}
      labelClassName="text-tag"
    />
  );
}
