// Tag/カード等の「種別→色」を出し分ける静的 className マップ。
// NativeWind は動的に組み立てた `bg-${x}` を content スキャンで拾えないため、
// 全クラスを literal で列挙する。このファイルは components/ 配下（tailwind の content 対象）に置くこと。
// bg（外枠 View 用）と tx（内側 Text 用）を分離する＝NativeWind v4 で Text の色を確実に伝えるため。

export type Tone =
  | 'hoiku'
  | 'kodomoen'
  | 'ichiji'
  | 'hiroba'
  | 'shokudo'
  | 'asobi'
  | 'age'
  | 'date'
  | 'danger'
  | 'info';

export const TONE: Record<Tone, { bg: string; tx: string }> = {
  hoiku: { bg: 'bg-catHoiku-bg', tx: 'text-catHoiku-tx' },
  kodomoen: { bg: 'bg-catKodomoen-bg', tx: 'text-catKodomoen-tx' },
  ichiji: { bg: 'bg-catIchiji-bg', tx: 'text-catIchiji-tx' },
  hiroba: { bg: 'bg-catHiroba-bg', tx: 'text-catHiroba-tx' },
  shokudo: { bg: 'bg-catShokudo-bg', tx: 'text-catShokudo-tx' },
  asobi: { bg: 'bg-catAsobi-bg', tx: 'text-catAsobi-tx' },
  age: { bg: 'bg-tagAge-bg', tx: 'text-tagAge-tx' },
  date: { bg: 'bg-tagDate-bg', tx: 'text-tagDate-tx' },
  danger: { bg: 'bg-danger-bg', tx: 'text-danger-tx' },
  info: { bg: 'bg-tagAge-bg', tx: 'text-tagAge-tx' }, // お知らせ等の中立（青系を流用）
};
