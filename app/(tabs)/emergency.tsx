import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmergencyContactCard } from '@/components/emergency-contact-card';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { emergencyContacts } from '@/data/emergency';
import { callPhone, openExternal } from '@/lib/links';
import { colors } from '@/theme/colors';

export default function EmergencyScreen() {
  const sharp = emergencyContacts.find((c) => c.id === 'sharp-8000');
  const others = emergencyContacts.filter((c) => c.id !== 'sharp-8000');

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <ScrollView contentContainerClassName="gap-4 p-4 pb-8">
        {/* 見出し */}
        <View>
          <Text className="text-headingLg font-bold text-text">きんきゅう</Text>
          <Text className="mt-0.5 text-body text-textSub">こどもの急病で困ったときに。</Text>
        </View>

        {/* 119番リマインダー（命に関わる緊急時） */}
        <View
          className="gap-3 rounded-card p-4"
          style={{ backgroundColor: colors.danger.bg }}>
          <View className="flex-row items-start gap-2">
            <IconSymbol name="exclamationmark.triangle.fill" size={20} color={colors.danger.tx} />
            <Text className="flex-1 text-body font-semibold" style={{ color: colors.danger.tx }}>
              意識がない・けいれんが続く・呼吸が苦しいなど、命に関わるときは迷わず119番。
            </Text>
          </View>
          <Pressable
            onPress={() => callPhone('119')}
            accessibilityRole="button"
            accessibilityLabel="119 に発信"
            className="min-h-touch flex-row items-center justify-center gap-2 rounded-pill bg-surface active:opacity-90">
            <IconSymbol name="phone" size={18} color={colors.danger.tx} />
            <Text className="text-body font-bold" style={{ color: colors.danger.tx }}>
              119 に発信
            </Text>
          </Pressable>
        </View>

        {/* ♯8000 ヒーロー発信ボタン */}
        {sharp ? (
          <View className="gap-2">
            <Pressable
              onPress={() => callPhone(sharp.tel ?? '#8000')}
              accessibilityRole="button"
              accessibilityLabel="♯8000 に電話をかける"
              className="flex-row items-center gap-3 rounded-card p-5 active:opacity-90"
              style={{ backgroundColor: colors.danger.tx }}>
              <View
                className="h-12 w-12 items-center justify-center rounded-pill"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                <IconSymbol name="phone" size={26} color="#FFFFFF" />
              </View>
              <View className="flex-1">
                <Text className="text-headingLg font-bold text-surface">♯8000 に電話</Text>
                <Text className="mt-0.5 text-body text-surface">
                  小児救急電話相談・毎日19:00〜翌8:00
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={22} color="#FFFFFF" />
            </Pressable>

            {/* 公式表現の補足＋公式ページ */}
            {sharp.note ? (
              <Text className="px-1 text-tag text-textSub">{sharp.note}</Text>
            ) : null}
            {sharp.url ? (
              <Pressable
                onPress={() => openExternal(sharp.url!)}
                accessibilityRole="link"
                hitSlop={6}
                className="flex-row items-center gap-1 px-1 active:opacity-90">
                <IconSymbol name="arrow.up.right.square" size={14} color={colors.primaryDk} />
                <Text className="text-body font-semibold text-primaryDk">公式ページを見る</Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}

        {/* そのほかの相談・受診先 */}
        <View className="gap-2">
          <Text className="text-heading font-bold text-text">そのほかの相談・受診先</Text>
          {others.map((c) => (
            <EmergencyContactCard key={c.id} contact={c} />
          ))}
        </View>

        {/* 出典 */}
        <Text className="mt-2 text-center text-tag text-textSub">
          情報の出典：飯田市公式サイト
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
