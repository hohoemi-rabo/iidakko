// 施設の住所 → 緯度経度を「ビルド前に一度だけ」変換し、data/facilities.ts に数値で直書きするスクリプト。
// 実行時に地図APIへ問い合わせない設計（REQUIREMENTS 0章「実行時ジオコーディング禁止」）のための前処理。
//
// 使い方（APIキーはコミットせず、シェルの環境変数で渡す）:
//   GOOGLE_MAPS_API_KEY=xxxxx node scripts/geocode.mjs
//
// 必要: Google Cloud で「Geocoding API」を有効化したキー。Node 20+（global fetch / import.meta.dirname）。
// 動作: data/facilities.ts 内の各レコードの address を順に変換し、直後の lat/lng を書き換える。
//       取得に失敗したレコードは 0 のまま残し、警告を出す（あとで手当てできるように）。

import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
if (!API_KEY) {
  console.error(
    'エラー: 環境変数 GOOGLE_MAPS_API_KEY が未設定です。\n' +
      '  GOOGLE_MAPS_API_KEY=xxxxx node scripts/geocode.mjs の形で実行してください。'
  );
  process.exit(1);
}

const FILE = resolve(import.meta.dirname, '../data/facilities.ts');

// address: '...' の直後に続く lat/lng（私が data/facilities.ts をこの順で書いているため成立）をまとめて捉える。
const BLOCK = /address: '([^']+)',\s*\n(\s*)lat: [\d.-]+,\s*\n\s*lng: [\d.-]+,/g;

async function geocode(address) {
  const url =
    'https://maps.googleapis.com/maps/api/geocode/json' +
    `?address=${encodeURIComponent(address)}&region=jp&language=ja&key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (json.status !== 'OK' || !json.results?.length) {
    throw new Error(`status=${json.status}${json.error_message ? ` (${json.error_message})` : ''}`);
  }
  return json.results[0].geometry.location; // { lat, lng }
}

const original = await readFile(FILE, 'utf8');

// まず対象住所を抽出（順序保持・重複排除）。
const matches = [...original.matchAll(BLOCK)];
const addresses = [...new Set(matches.map((m) => m[1]))];
console.log(`対象施設: ${matches.length} 件 / ユニーク住所: ${addresses.length} 件`);

// 住所ごとに1回だけ変換してキャッシュ。
const coords = new Map();
let failures = 0;
for (const address of addresses) {
  try {
    const loc = await geocode(address);
    coords.set(address, loc);
    console.log(`OK   ${address} -> ${loc.lat}, ${loc.lng}`);
  } catch (e) {
    failures++;
    console.warn(`NG   ${address} -> ${e.message}（0 のまま据え置き）`);
  }
}

// 各ブロックの lat/lng を置換（取得できたものだけ）。
let replaced = 0;
const updated = original.replace(BLOCK, (whole, address, indent) => {
  const loc = coords.get(address);
  if (!loc) return whole;
  replaced++;
  return `address: '${address}',\n${indent}lat: ${loc.lat},\n${indent}lng: ${loc.lng},`;
});

if (replaced > 0) {
  await writeFile(FILE, updated, 'utf8');
}

console.log(`\n完了: ${replaced} 件の座標を data/facilities.ts に書き込みました（失敗 ${failures} 件）。`);
if (failures > 0) {
  console.warn('失敗した住所は lat/lng が 0 のままです。住所表記を見直して再実行してください。');
  process.exit(2);
}
