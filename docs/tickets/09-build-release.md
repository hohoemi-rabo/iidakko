# 09 — ビルド・配布（Maps APIキー・EAS開発ビルド・APK）

地図機能の実機確認と、商工会議所デモ用のAPK配布を整える。`react-native-maps` は Expo Go では動かないため、EAS 開発ビルドが必須。

## 参照
- `REQUIREMENTS.md` 3章（技術スタック・配布）・実装状況（手元で実行する手順）・8章（Maps API 規約）
- `CLAUDE.md` 「Expo SDK 54 ベストプラクティス」（依存は `npx expo install`、開発ビルド、EAS profile）

## 依存
- 05（マップ画面）

## Todo

### セットアップ
- [ ] `npm install` → `npx expo install --fix` で依存をSDK 54に整える
- [ ] `npx expo install react-native-maps` で導入し、config plugin を設定
- [ ] Google Cloud で Maps SDK / Geocoding API を有効化
- [ ] Google Maps APIキーを `app.json`（Android）に設定（キーは環境変数/EAS env 経由、コミットしない）

### ビルド・確認
- [ ] `eas.json` に build profile（development / preview / production）を用意
- [ ] `npx expo run:android`（または EAS 開発ビルド）で実機/エミュレータ表示を確認
- [ ] 地図・ピン・カードの表示と外部リンク起動を実機で検証

### 配布
- [ ] EAS Build で Android APK を生成
- [ ] 商工会議所デモ用に配布（限定配布）

## 完了条件
- [ ] 開発ビルドで地図機能を含む全画面が実機表示できる
- [ ] APIキーがコミットされず、環境変数/EAS env で管理されている
- [ ] デモ用APKが生成・配布できる
