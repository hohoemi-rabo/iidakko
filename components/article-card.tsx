import { Pressable, Text, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { openExternal } from '@/lib/links';
import { colors } from '@/theme/colors';
import type { Article } from '@/types';

export interface ArticleCardProps {
  article: Article;
  onPress?: (article: Article) => void; // 省略時は公式URLを開く
}

// 「さがす」の記事カード：タイトル・更新日・要点1〜2行＋公式/PDFリンク。
export function ArticleCard({ article, onPress }: ArticleCardProps) {
  const handlePress = () => (onPress ? onPress(article) : openExternal(article.url));
  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="link"
      accessibilityLabel={article.title}
      className="min-h-touch rounded-card border border-border bg-surface p-4 active:opacity-90">
      <View className="flex-row items-start justify-between gap-2">
        <Text className="flex-1 text-headingSm font-bold text-text">{article.title}</Text>
        <IconSymbol name="arrow.up.right.square" size={18} color={colors.textSub} />
      </View>
      {article.summary ? (
        <Text className="mt-1 text-body text-textSub" numberOfLines={2}>
          {article.summary}
        </Text>
      ) : null}
      <Text className="mt-2 text-tag text-textSub">
        更新 {article.updatedAt}　・　{article.source}
      </Text>
    </Pressable>
  );
}
