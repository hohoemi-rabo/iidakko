import { Pressable, Text, View } from 'react-native';

import { IconSymbol, type IconSymbolName } from '@/components/ui/icon-symbol';
import { callPhone, openExternal } from '@/lib/links';
import { colors } from '@/theme/colors';
import type { EmergencyContact } from '@/types';

export interface EmergencyContactCardProps {
  contact: EmergencyContact;
}

// アクションボタン：発信＝赤系の塗り、外部リンク＝アウトライン。
function ActionButton({
  icon,
  label,
  tone,
  onPress,
}: {
  icon: IconSymbolName;
  label: string;
  tone: 'call' | 'link';
  onPress: () => void;
}) {
  const isCall = tone === 'call';
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      className={`min-h-touch flex-1 flex-row items-center justify-center gap-1 rounded-pill px-2 active:opacity-90 ${
        isCall ? 'bg-danger-bg' : 'border border-border bg-surface'
      }`}>
      <IconSymbol name={icon} size={16} color={isCall ? colors.danger.tx : colors.primaryDk} />
      <Text className={`text-tag font-bold ${isCall ? 'text-danger-tx' : 'text-primaryTx'}`}>
        {label}
      </Text>
    </Pressable>
  );
}

// きんきゅうの連絡先カード：公式の言い回し（note）をそのまま表示し、発信／外部リンクへ導く。
export function EmergencyContactCard({ contact }: EmergencyContactCardProps) {
  const isPdf = !!contact.url?.toLowerCase().endsWith('.pdf');
  return (
    <View className="rounded-card border border-border bg-surface p-4">
      <Text className="text-headingSm font-bold text-text">{contact.label}</Text>
      {contact.note ? <Text className="mt-1 text-body text-textSub">{contact.note}</Text> : null}

      {contact.tel || contact.url ? (
        <View className="mt-3 flex-row gap-2">
          {contact.tel ? (
            <ActionButton
              icon="phone"
              label="電話"
              tone="call"
              onPress={() => callPhone(contact.tel!)}
            />
          ) : null}
          {contact.url ? (
            <ActionButton
              icon="arrow.up.right.square"
              label={isPdf ? 'PDFを開く' : '公式ページ'}
              tone="link"
              onPress={() => openExternal(contact.url!)}
            />
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
