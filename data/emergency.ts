import type { EmergencyContact } from '@/types';

// 「きんきゅう」の連絡先・導線。医療情報は公式の言い回しを尊重し改変しない。
// すべて飯田市公式サイトで確認済みのページへ遷移する。
export const emergencyContacts: EmergencyContact[] = [
  {
    id: 'sharp-8000',
    label: '長野県小児救急電話相談 ♯8000',
    tel: '#8000',
    note: '毎日 19:00〜翌8:00／小児科経験のある看護師が対応（ダイヤル回線・IP電話は 026-235-1818）',
    url: 'https://www.city.iida.lg.jp/site/kosodate/shounikyukyu.html',
  },
  {
    id: 'kyujitsu-yakan',
    label: '休日・夜間の医療（休日夜間急患診療所）',
    tel: '0265-23-3636',
    note: '内科・小児科。平日夜間19:00〜22:00（受付21:30まで）／日曜・祝日・年末年始・お盆 9:00〜12:30。飯田市東中央通5-96',
    url: 'https://www.city.iida.lg.jp/soshiki/15/kyuuzitsuyakan.html',
  },
  {
    id: 'shojo-betsu-taio-pdf',
    label: 'こどもの急病 症状別の対応方法（PDF）',
    note: '飯田市公式PDF。受診の目安を症状別に案内。',
    url: 'https://www.city.iida.lg.jp/uploaded/attachment/72213.pdf',
  },
];
