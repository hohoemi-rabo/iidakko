import type { EventItem } from '@/types';

// 「イベント」のデータ。日付まで公式で確認できたものだけを掲載（出典＝飯田市公式）。
// 注: おもちゃばこ通信の各ひろば講座は月次PDF内に日付があり機械抽出できないため未掲載。
//     わくわく並木広場など季節イベントは2026年の確定日付が公式未掲載のため未掲載。
//     必要に応じて公式の最新号・イベント情報から手動で追加する。
export const events: EventItem[] = [
  {
    id: 'maternity-salon-2026-06',
    title: 'マタニティサロン「ママとパパと赤ちゃんのために」2026',
    date: '6/6(土) 9:45〜',
    sortKey: '2026-06-06',
    place: '飯田市公民館 丘の上結いスクエア3階',
    ages: ['pregnancy'],
    category: 'lesson',
    needsApply: true,
    url: 'https://www.city.iida.lg.jp/soshiki/40/mamasalon.html',
  },
  {
    id: 'bp1-akachan-ga-kita-2026-07',
    title: '親子の絆づくりプログラム “赤ちゃんがきた！”（BP1）',
    date: '7月開催（申込 6/20(土)〜）',
    sortKey: '2026-07-01',
    place: 'わいわいひろば（飯田女子短期大学）',
    ages: ['age0_1'],
    category: 'lesson',
    needsApply: true,
    url: 'https://www.city.iida.lg.jp/site/kosodate/461.html',
  },
];
