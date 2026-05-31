// RN スタイル（StyleSheet オブジェクトや、className を当てられない tabBarStyle 等）から
// カラー値を直接参照するための型付きエクスポート。
// 生の値は theme/palette.cjs（単一の真実）にある。
// eslint-disable-next-line @typescript-eslint/no-require-imports
const palette = require('./palette.cjs');

export const colors = palette as {
  bg: string;
  surface: string;
  primary: string;
  primaryDk: string;
  primaryTx: string;
  accent: string;
  accentDk: string;
  text: string;
  textSub: string;
  border: string;
  catHoiku: { pin: string; bg: string; tx: string };
  catHiroba: { pin: string; bg: string; tx: string };
  catShokudo: { pin: string; bg: string; tx: string };
  tagAge: { bg: string; tx: string };
  tagDate: { bg: string; tx: string };
  danger: { bg: string; tx: string };
};
