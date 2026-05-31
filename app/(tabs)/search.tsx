import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-heading font-bold text-text">さがす</Text>
        <Text className="mt-2 text-body text-textSub">準備中</Text>
      </View>
    </SafeAreaView>
  );
}
