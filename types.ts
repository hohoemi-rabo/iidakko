// アプリ全体の型集約（REQUIREMENTS.md 6章）。
// データはすべて静的 TS。lat/lng はビルド前にジオコーディングして直書きする（実行時変換はしない）。

export type AgeBand = 'pregnancy' | 'age0_1' | 'age2_3' | 'age4_6';

export type Purpose =
  | 'care' // こどもを預ける
  | 'support' // 支援・手当
  | 'enroll' // 入園
  | 'outing' // おでかけ
  | 'checkup' // 健診と学級
  | 'worry'; // 子育てに悩んだら

export type FacilityCat =
  | 'hoiku' // 保育園
  | 'kodomoen' // 認定こども園
  | 'ichiji' // 一時預かり
  | 'hiroba' // つどいの広場
  | 'shokudo' // こども食堂
  | 'asobi'; // 遊び場

// さがす：サイトの情報カード
export interface Article {
  id: string;
  title: string;
  updatedAt: string; // 'YYYY-MM-DD'
  ages: AgeBand[];
  purposes: Purpose[];
  summary?: string; // 1〜2行（PDFの要点を平易に）
  url: string; // 公式ページ or PDF or 申込フォーム
  source: '飯田市子育て応援サイト';
}

// マップ：施設
export interface Facility {
  id: string;
  name: string;
  category: FacilityCat;
  area: string; // 地区
  address: string;
  lat: number; // ビルド前にジオコーディングして直書き
  lng: number;
  ages?: string; // '0〜5歳' 等
  hours?: string; // '7:30〜18:30' 等
  tel?: string;
  url?: string;
  note?: string; // '要事前申込' 等
  source: '飯田市子育て応援サイト';
}

// イベント
export interface EventItem {
  id: string;
  title: string;
  date: string; // 表示 '6/14(日)'
  sortKey: string; // 'YYYY-MM-DD'
  place: string;
  lat?: number;
  lng?: number;
  ages: AgeBand[];
  category: 'food' | 'lesson' | 'hiroba' | 'other';
  needsApply: boolean;
  url: string;
}

// きんきゅう：連絡先・導線（REQUIREMENTS に明示の interface が無いため暫定。08で確定）
export interface EmergencyContact {
  id: string;
  label: string; // '♯8000（小児救急電話相談）' 等
  tel?: string; // 発信用番号
  url?: string; // 当番医ページ・症状別PDF 等
  note?: string; // '毎日19:00〜翌8:00' 等
}
