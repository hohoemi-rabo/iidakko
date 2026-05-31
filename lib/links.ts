// 外部リンクの共通ハンドラ。電話発信 / 経路 / 公式・PDF を expo-linking + expo-web-browser で開く。
// components/external-link.tsx（Link コンポーネント版）のロジックを関数化したもの。
import * as Linking from 'expo-linking';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';

// 電話発信。'0265-22-1389' → 'tel:0265221389'、'#8000' → 'tel:#8000'（数字と # のみ残す）。
export async function callPhone(tel: string): Promise<void> {
  const cleaned = tel.replace(/[^\d#]/g, '');
  if (!cleaned) return;
  await Linking.openURL(`tel:${cleaned}`);
}

// 経路（Google マップのルート案内）URL を組み立てる。
export function buildDirectionsUrl(p: { lat: number; lng: number; label?: string }): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`;
}

// 経路を開く。
export async function openDirections(p: { lat: number; lng: number; label?: string }): Promise<void> {
  await Linking.openURL(buildDirectionsUrl(p));
}

// 公式ページ・PDF・申込フォームを開く。web は新規タブ、native はアプリ内ブラウザ。
export async function openExternal(url: string): Promise<void> {
  if (process.env.EXPO_OS === 'web') {
    await Linking.openURL(url);
    return;
  }
  await openBrowserAsync(url, { presentationStyle: WebBrowserPresentationStyle.AUTOMATIC });
}
