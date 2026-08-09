import React, { useState } from 'react';
import { Shuffle, BookOpen, CheckCircle2, XCircle, ChevronRight, RotateCcw, ClipboardList } from 'lucide-react';

const FONT_STACK = "'Hiragino Kaku Gothic ProN','Hiragino Sans','Yu Gothic',sans-serif";

const questionBank = [
  // ==================== 連結会計（10問） ====================
  {
    id: 1,
    topic: '連結会計',
    question:
      '支配獲得日において、子会社の資本の額が10,000、親会社の投資勘定の額が12,000（持分比率100%）であった。このとき生じる「のれん」の金額として正しいものはどれか。',
    choices: ['2,000（借方）', '2,000（貸方）', '12,000（借方）', 'のれんは発生しない'],
    correctIndex: 0,
    explanation:
      '投資額12,000 － 資本額10,000 ＝ 2,000 が借方差額となり、「のれん」として資産計上されます。',
  },
  {
    id: 2,
    topic: '連結会計',
    question:
      '支配獲得日における子会社の資本合計は20,000であり、親会社の持分比率は80%であった。このとき連結貸借対照表に計上される「非支配株主持分」の金額はどれか。',
    choices: ['4,000', '16,000', '20,000', '2,000'],
    correctIndex: 0,
    explanation: '子会社資本20,000 × 非支配株主持分比率20%（100%－80%）＝ 4,000 が非支配株主持分となります。',
  },
  {
    id: 3,
    topic: '連結会計',
    question: '支配獲得時に発生したのれん3,000を、発生年度の翌期から10年間にわたり定額法で償却する。当期ののれん償却額はどれか。',
    choices: ['3,000', '300', '30', '0'],
    correctIndex: 1,
    explanation: 'のれん3,000 ÷ 10年 ＝ 300 が当期の「のれん償却額」（販売費及び一般管理費）となります。',
  },
  {
    id: 4,
    topic: '連結会計',
    question:
      'これまで保有していた子会社株式（帳簿価額3,000）について、支配獲得日の時価は3,500であった。支配獲得日にこの株式を時価評価する際に生じる損益として正しいものはどれか。',
    choices: [
      '段階取得に係る差益 500',
      '段階取得に係る差損 500',
      'のれん 500',
      '評価差額はなし',
    ],
    correctIndex: 0,
    explanation:
      '支配獲得日の時価3,500 － 帳簿価額3,000 ＝ 500 が「段階取得に係る差益」として、個別上の株式評価差額を連結修正で損益計上します。',
  },
  {
    id: 5,
    topic: '連結会計',
    question:
      '子会社の資本合計は30,000である。親会社が子会社株式を追加取得（追加取得比率10%）し、対価として1,500を支払った。この追加取得に伴い増減する「資本剰余金」の金額として正しいものはどれか。',
    choices: [
      '資本剰余金 1,500 増加',
      '資本剰余金 1,500 減少',
      '資本剰余金 3,000 増加',
      'のれん 1,500 計上',
    ],
    correctIndex: 0,
    explanation:
      '非支配株主持分の減少額＝30,000×10%＝3,000。支払対価1,500との差額3,000－1,500＝1,500は、追加取得により生じた親会社持分の増加として「資本剰余金」に計上します（のれんは発生しません）。',
  },
  {
    id: 6,
    topic: '連結会計',
    question:
      '親会社が保有する子会社株式の一部を売却し、非支配株主持分が2,000増加した。売却対価は2,500であった。この一部売却に伴い増減する「資本剰余金」の金額として正しいものはどれか。',
    choices: ['資本剰余金 500 増加', '資本剰余金 500 減少', '売却益 500（損益計算書）', '資本剰余金 2,500 増加'],
    correctIndex: 0,
    explanation:
      '売却対価2,500 － 非支配株主持分増加額2,000 ＝ 500 は、支配が継続する一部売却では損益ではなく「資本剰余金」として処理します。',
  },
  {
    id: 7,
    topic: '連結会計',
    question:
      '親会社は子会社に対して商品1,000を掛けで販売しており、期末時点で子会社はこの代金を全額未払いである。連結修正仕訳で相殺消去すべき「売掛金・買掛金」の金額はどれか。',
    choices: ['500', '1,000', '2,000', '相殺消去は不要'],
    correctIndex: 1,
    explanation:
      '親会社の売掛金1,000と子会社の買掛金1,000は企業集団内部の債権債務であるため、連結上は全額1,000を相殺消去します。',
  },
  {
    id: 8,
    topic: '連結会計',
    question:
      '親会社が原価800の商品を子会社に1,000で販売（ダウンストリーム）し、子会社は期末時点でこの商品を全て在庫として保有している。連結修正で消去すべき未実現利益の金額はどれか。',
    choices: ['200', '800', '1,000', '未実現利益は生じない'],
    correctIndex: 0,
    explanation: '販売価格1,000 － 原価800 ＝ 200 が期末棚卸資産に含まれる未実現利益であり、全額消去します。',
  },
  {
    id: 9,
    topic: '連結会計',
    question:
      '子会社が原価4,000の商品を親会社に5,000で販売（アップストリーム）し、親会社は期末時点でこの商品を全て在庫として保有している。非支配株主持分比率が20%である場合、非支配株主持分に負担させる未実現利益消去額はどれか。',
    choices: ['1,000', '200', '800', '4,000'],
    correctIndex: 1,
    explanation:
      '未実現利益＝5,000－4,000＝1,000。アップストリーションでは非支配株主にも損益を負担させるため、1,000×20%＝200を非支配株主持分から減額します。',
  },
  {
    id: 10,
    topic: '連結会計',
    question: '子会社の当期純利益が5,000であり、非支配株主持分比率が30%である場合、「非支配株主に帰属する当期純利益」はどれか。',
    choices: ['1,500', '3,500', '5,000', '0'],
    correctIndex: 0,
    explanation: '子会社当期純利益5,000 × 非支配株主持分比率30% ＝ 1,500 を非支配株主に帰属する当期純利益として振り替えます。',
  },

  // ==================== 標準原価計算（10問） ====================
  {
    id: 11,
    topic: '標準原価計算',
    question:
      '当期の直接材料費の価格差異を計算する。標準価格@100円、実際価格@105円、実際消費量1,000kgの場合、材料価格差異の金額と有利・不利の組み合わせとして正しいものはどれか。',
    choices: ['5,000円（有利差異）', '5,000円（不利差異）', '50,000円（不利差異）', '105,000円（有利差異）'],
    correctIndex: 1,
    explanation:
      '（標準@100 － 実際@105）× 実際1,000kg ＝ －5,000円。実際にかかった価格の方が高いため、不利差異（借方差異）となります。',
  },
  {
    id: 12,
    topic: '標準原価計算',
    question:
      '直接材料費の数量差異を計算する。標準消費量900kg、実際消費量1,000kg、標準価格@100円の場合、材料数量差異の金額と有利・不利の組み合わせとして正しいものはどれか。',
    choices: ['10,000円（有利差異）', '10,000円（不利差異）', '1,000円（不利差異）', '100,000円（不利差異）'],
    correctIndex: 1,
    explanation:
      '（標準900kg － 実際1,000kg）× 標準価格@100円 ＝ －10,000円。実際消費量の方が多いため不利差異となります。',
  },
  {
    id: 13,
    topic: '標準原価計算',
    question:
      '直接労務費の賃率差異を計算する。標準賃率@1,200円、実際賃率@1,250円、実際直接作業時間500時間の場合、賃率差異の金額と有利・不利の組み合わせとして正しいものはどれか。',
    choices: ['25,000円（有利差異）', '25,000円（不利差異）', '2,500円（不利差異）', '60,000円（不利差異）'],
    correctIndex: 1,
    explanation:
      '（標準@1,200円 － 実際@1,250円）× 実際作業時間500時間 ＝ －25,000円。実際賃率の方が高いため不利差異となります。',
  },
  {
    id: 14,
    topic: '標準原価計算',
    question:
      '直接労務費の作業時間差異を計算する。標準作業時間480時間、実際作業時間500時間、標準賃率@1,200円の場合、作業時間差異の金額と有利・不利の組み合わせとして正しいものはどれか。',
    choices: ['24,000円（有利差異）', '24,000円（不利差異）', '20,000円（不利差異）', '2,400円（不利差異）'],
    correctIndex: 1,
    explanation:
      '（標準480時間 － 実際500時間）× 標準賃率@1,200円 ＝ －24,000円。実際作業時間の方が長いため不利差異となります。',
  },
  {
    id: 15,
    topic: '標準原価計算',
    question:
      '製造間接費の予算差異を計算する。変動費率@300円/時間、標準操業度480時間、固定費予算120,000円、実際直接作業時間500時間、実際製造間接費発生額275,000円の場合、予算差異の金額と有利・不利の組み合わせとして正しいものはどれか。',
    choices: ['5,000円（有利差異）', '5,000円（不利差異）', '30,000円（不利差異）', '差異は生じない'],
    correctIndex: 1,
    explanation:
      '予算許容額＝変動費率@300円×実際操業度500時間＋固定費予算120,000円＝270,000円。実際発生額275,000円との差額270,000－275,000＝－5,000円が不利な予算差異です。',
  },
  {
    id: 16,
    topic: '標準原価計算',
    question:
      '製造間接費の能率差異（変動費部分）を計算する。標準操業度480時間、実際操業度500時間、変動費率@300円/時間の場合、能率差異の金額と有利・不利の組み合わせとして正しいものはどれか。',
    choices: ['6,000円（有利差異）', '6,000円（不利差異）', '20,000円（不利差異）', '600円（不利差異）'],
    correctIndex: 1,
    explanation:
      '（標準480時間 － 実際500時間）× 変動費率@300円 ＝ －6,000円。実際操業度の方が標準操業度を上回っているため不利差異となります。',
  },
  {
    id: 17,
    topic: '標準原価計算',
    question:
      '製造間接費の操業度差異を計算する。基準操業度600時間、実際操業度500時間、固定費率@200円/時間の場合、操業度差異の金額と有利・不利の組み合わせとして正しいものはどれか。',
    choices: ['20,000円（有利差異）', '20,000円（不利差異）', '120,000円（不利差異）', '2,000円（不利差異）'],
    correctIndex: 1,
    explanation:
      '（実際操業度500時間 － 基準操業度600時間）× 固定費率@200円 ＝ －20,000円。実際操業度が基準操業度に達していないため不利差異となります。',
  },
  {
    id: 18,
    topic: '標準原価計算',
    question:
      '標準操業度480時間、標準配賦率合計@500円（変動費率@300円＋固定費率@200円）、実際製造間接費発生額275,000円の場合、製造間接費の総差異の金額と有利・不利の組み合わせとして正しいものはどれか。',
    choices: ['35,000円（有利差異）', '35,000円（不利差異）', '15,000円（不利差異）', '5,000円（不利差異）'],
    correctIndex: 1,
    explanation:
      '標準配賦額＝480時間×@500円＝240,000円。実際発生額275,000円との差額240,000－275,000＝－35,000円が製造間接費の総差異（不利）です。',
  },
  {
    id: 19,
    topic: '標準原価計算',
    question:
      '材料受入価格差異が2,000円の有利差異（貸方差異）として生じ、正常な範囲内の差異であるため期末に売上原価へ賦課する。このときの会計処理として正しいものはどれか。',
    choices: [
      '売上原価を2,000円増加させる',
      '売上原価を2,000円減少させる',
      '材料の帳簿価額を2,000円増加させる',
      '差異は翌期に繰り越し、当期は処理しない',
    ],
    correctIndex: 1,
    explanation:
      '有利差異は実際原価が標準（予定）より低かったことを意味するため、標準原価で計上済みの売上原価を2,000円減少させる処理を行います。',
  },
  {
    id: 20,
    topic: '標準原価計算',
    question:
      '直接材料費の総差異が8,000円（不利差異）であり、そのうち価格差異が5,000円（不利差異）であった場合、数量差異の金額と有利・不利の組み合わせとして正しいものはどれか。',
    choices: ['3,000円（有利差異）', '3,000円（不利差異）', '13,000円（不利差異）', '5,000円（不利差異）'],
    correctIndex: 1,
    explanation: '直接材料費総差異＝価格差異＋数量差異のため、数量差異＝8,000円－5,000円＝3,000円（不利差異）となります。',
  },

  // ==================== 資産除去債務（10問） ====================
  {
    id: 21,
    topic: '資産除去債務',
    question:
      '有形固定資産の取得に伴い、将来の除去費用（割引前）が5,000発生すると見込まれる。割引率を2%（3年後の現価係数0.942）とした場合、取得時における「資産除去債務」の計上額はいくらか。',
    choices: ['5,000', '4,710', '5,100', '0'],
    correctIndex: 1,
    explanation:
      '将来の支出額5,000 × 現価係数0.942 ＝ 4,710円を、割引現在価値として資産除去債務に計上します。',
  },
  {
    id: 22,
    topic: '資産除去債務',
    question:
      '資産除去債務の期首残高が4,710、割引率が2%である場合、当期における「時の経過による資産除去債務の調整額（利息費用）」として正しいものはどれか。',
    choices: ['94円', '100円', '4,710円', '4,804円'],
    correctIndex: 0,
    explanation: '期首残高4,710円 × 割引率2% ＝ 94.2円（円未満四捨五入で94円）が当期の利息費用です。',
  },
  {
    id: 23,
    topic: '資産除去債務',
    question:
      '資産除去債務に対応する除去費用4,710円を有形固定資産の取得原価に加算し、耐用年数3年・残存価額0・定額法で減価償却する。毎期の減価償却費に含まれる除去費用相当額はいくらか。',
    choices: ['4,710円', '1,570円', '2,355円', '94円'],
    correctIndex: 1,
    explanation: '資産計上した除去費用4,710円 ÷ 耐用年数3年 ＝ 1,570円が毎期の減価償却費に含まれます。',
  },
  {
    id: 24,
    topic: '資産除去債務',
    question:
      '3年後の資産除去債務の帳簿価額（時の経過による調整を反映済み）が5,000円であったが、実際の除去費用の支出額は5,300円であった。この差額300円の処理として正しいものはどれか。',
    choices: [
      '「履行差額」として費用（原則は損益計算書の営業外費用または特別損失）に計上する',
      '有形固定資産の取得原価に加算する',
      '利益剰余金を直接減額する',
      '差額は無視してよい',
    ],
    correctIndex: 0,
    explanation:
      '資産除去債務の見積額と実際の支払額との差額は「履行差額」として、原則、除去を行った期の損益（営業外費用又は特別損失）に計上します。',
  },
  {
    id: 25,
    topic: '資産除去債務',
    question:
      '割引前将来キャッシュ・フローの見積りが5,000円から6,000円に増加した。割引率2%、残存耐用年数3年（現価係数0.942）を用いて見積り変更を反映する場合、追加計上すべき資産除去債務の金額はどれか。',
    choices: ['1,000円', '942円', '5,652円', '0円'],
    correctIndex: 1,
    explanation: '増加した将来キャッシュ・フロー（6,000－5,000＝1,000円）に現価係数0.942を乗じた942円を追加計上します。',
  },
  {
    id: 26,
    topic: '資産除去債務',
    question: '有形固定資産の取得時に資産除去債務4,710円を計上する場合、相手勘定として正しいものはどれか。',
    choices: [
      '当期の費用（除去費用として一括費用処理）',
      '当該有形固定資産の取得原価に加算する',
      '引当金繰入額として販管費に計上する',
      '利益剰余金から直接減額する',
    ],
    correctIndex: 1,
    explanation:
      '資産除去債務を計上する際は、同額を関連する有形固定資産の取得原価に加算し、その後の減価償却を通じて費用配分します。',
  },
  {
    id: 27,
    topic: '資産除去債務',
    question: '資産除去債務の算定に用いる割引率として、会計基準上原則とされるものはどれか。',
    choices: [
      '自社の資本コストを反映した利率',
      '貨幣の時間価値を反映した無リスクの税引前の利率',
      '信用リスクを含む銀行借入利率',
      '一律5%の固定利率',
    ],
    correctIndex: 1,
    explanation:
      '資産除去債務の算定には、貨幣の時間価値を反映した無リスクの税引前の利率を割引率として用いることが原則とされています。',
  },
  {
    id: 28,
    topic: '資産除去債務',
    question: '履行時期が決算日の翌日から1年を超えて到来する資産除去債務は、貸借対照表上どの区分に表示されるか。',
    choices: ['流動負債', '固定負債', '純資産の部', '注記のみで負債計上はしない'],
    correctIndex: 1,
    explanation: '1年基準により、履行時期が1年を超える資産除去債務は固定負債の区分に表示します。',
  },
  {
    id: 29,
    topic: '資産除去債務',
    question: '資産除去債務に係る時の経過による調整額（利息費用）は、損益計算書上どの区分に計上するのが原則か。',
    choices: [
      '対応する減価償却費と同じ区分（原則として販売費及び一般管理費等）',
      '特別損失',
      '売上原価から直接控除',
      '営業外収益'],
    correctIndex: 0,
    explanation:
      '利息費用は、原則として資産除去債務に対応する有形固定資産の減価償却費と同じ区分（販売費及び一般管理費等）に含めて計上します。',
  },
  {
    id: 30,
    topic: '資産除去債務',
    question:
      '将来キャッシュ・フローの見積りが増加する方向に変更された場合、その増加部分の割引計算に用いる割引率として正しいものはどれか。',
    choices: [
      '負債計上時の当初の割引率を用いる',
      '見積りを変更した時点の割引率（新たな割引率）を用いる',
      '当初の割引率と新たな割引率の平均を用いる',
      '割引計算は行わず、増加額をそのまま加算する',
    ],
    correctIndex: 1,
    explanation:
      '見積りが増加する場合、その増加部分については見積り変更時点の割引率（新たな割引率）を適用して算定します（減少する場合は負債計上時の割引率を用います）。',
  },

  // ==================== 有価証券（3問） ====================
  {
    id: 31,
    topic: '有価証券',
    question: '売買目的有価証券（取得原価800円）の期末時価が900円であった場合の会計処理として正しいものはどれか。',
    choices: [
      '評価差額100円を有価証券評価益として当期の損益に計上する',
      '評価差額100円を有価証券評価損として当期の損益に計上する',
      '取得原価のまま評価替えは行わない',
      '評価差額100円をその他有価証券評価差額金（純資産）に計上する',
    ],
    correctIndex: 0,
    explanation: '売買目的有価証券は時価法で評価し、評価差額（900円－800円＝100円）は当期の損益（有価証券評価益）として処理します。',
  },
  {
    id: 32,
    topic: '有価証券',
    question:
      '満期保有目的の債券（額面100,000円、取得価額97,000円、償還期限5年）について償却原価法（定額法）を適用する場合、当期の償却額（社債利息の加算額）はいくらか。',
    choices: ['600円', '3,000円', '97,000円', '0円'],
    correctIndex: 0,
    explanation: '金利調整差額（100,000円－97,000円＝3,000円）を残存期間5年で按分し、3,000円÷5年＝600円を当期の償却額とします。',
  },
  {
    id: 33,
    topic: '有価証券',
    question:
      'その他有価証券（取得原価5,000円、期末時価5,300円）について全部純資産直入法を適用する場合、評価差額300円の処理として正しいものはどれか。',
    choices: [
      '有価証券評価益として当期の損益に計上する',
      'その他有価証券評価差額金として純資産の部に計上し、損益計算書には計上しない',
      '評価差額は取得原価に加算するのみで処理を終える',
      '負債の部に繰延収益として計上する',
    ],
    correctIndex: 1,
    explanation:
      'その他有価証券の評価差額は、全部純資産直入法では税効果を調整のうえ「その他有価証券評価差額金」として純資産の部に直接計上し、損益計算書を経由しません。',
  },

  // ==================== 減損会計（3問） ====================
  {
    id: 34,
    topic: '減損会計',
    question: '減損の兆候がある資産グループについて、減損損失を認識するかどうかを判定する手続きの名称として正しいものはどれか。',
    choices: ['減損損失の認識の判定', '減損損失の測定', 'グルーピング', '使用価値の算定'],
    correctIndex: 0,
    explanation:
      '減損の兆候がある資産について、割引前将来キャッシュ・フローの総額と帳簿価額を比較し、減損損失を認識するかどうかを判定する手続きを「減損損失の認識の判定」といいます。',
  },
  {
    id: 35,
    topic: '減損会計',
    question:
      '帳簿価額10,000円の資産グループについて減損損失を認識することとなった。正味売却価額7,500円、使用価値8,000円である場合、計上すべき減損損失の金額はいくらか。',
    choices: ['2,000円', '2,500円', '1,000円', '0円（減損損失は認識しない）'],
    correctIndex: 0,
    explanation:
      '回収可能価額は正味売却価額と使用価値のいずれか高い方（8,000円）。減損損失＝帳簿価額10,000円－回収可能価額8,000円＝2,000円となります。',
  },
  {
    id: 36,
    topic: '減損会計',
    question: '過年度に計上した減損損失について、その後資産の時価や収益性が回復した場合、日本基準における取り扱いとして正しいものはどれか。',
    choices: [
      '時価が回復すれば減損損失の戻し入れを行う',
      '減損損失の戻し入れは行わない',
      '将来キャッシュ・フローが改善すれば毎期見直して戻し入れる',
      '一定期間経過後に自動的に戻し入れる',
    ],
    correctIndex: 1,
    explanation: '日本基準では、IFRSと異なり、いったん計上した減損損失の戻し入れ（減損の回復処理）は行わないこととされています。',
  },

  // ==================== リース会計（3問） ====================
  {
    id: 37,
    topic: 'リース会計',
    question: '所有権移転外ファイナンス・リース取引について、借手が行う原則的な会計処理として正しいものはどれか。',
    choices: [
      '賃貸借取引に準じて処理し、資産計上は行わない',
      '売買取引に準じてリース資産・リース債務を計上する',
      '支払リース料を一括して前払費用に計上する',
      '純資産の部に直接計上する',
    ],
    correctIndex: 1,
    explanation:
      '所有権移転外ファイナンス・リース取引は、原則として通常の売買取引に準じ、借手はリース資産とリース債務を貸借対照表に計上します。',
  },
  {
    id: 38,
    topic: 'リース会計',
    question:
      'リース料総額60,000円、リース物件の見積現金購入価額54,000円である場合、利子抜き法によるリース資産の計上額として正しいものはどれか。',
    choices: ['60,000円', '54,000円', '6,000円', '57,000円'],
    correctIndex: 1,
    explanation:
      '借手は、リース料総額の割引現在価値とリース物件の見積現金購入価額とのいずれか低い額でリース資産を計上するため、54,000円を採用します。',
  },
  {
    id: 39,
    topic: 'リース会計',
    question: 'リース料総額60,000円のリース取引を「利子込み法」で処理する場合のリース資産・リース債務の計上額として正しいものはどれか。',
    choices: [
      '60,000円（リース料総額をそのまま計上する）',
      '54,000円（利息相当額を控除した額を計上する）',
      '6,000円（利息相当額のみを計上する）',
      '0円（利子込み法では資産計上しない）',
    ],
    correctIndex: 0,
    explanation: '利子込み法では、リース料総額に利息相当額を含めたまま、リース資産・リース債務として計上します。',
  },

  // ==================== 退職給付会計（3問） ====================
  {
    id: 40,
    topic: '退職給付会計',
    question: '退職給付債務1,000,000円、年金資産600,000円である場合、連結貸借対照表に計上される「退職給付に係る負債」の金額はどれか。',
    choices: ['1,000,000円', '600,000円', '400,000円', '0円'],
    correctIndex: 2,
    explanation: '退職給付債務1,000,000円 － 年金資産600,000円 ＝ 400,000円が「退職給付に係る負債」として計上されます。',
  },
  {
    id: 41,
    topic: '退職給付会計',
    question: '数理計算上の差異が発生した場合の会計処理として、一般的に採用される方法はどれか。',
    choices: [
      '発生時に全額を当期の損益として処理する',
      '平均残存勤務期間以内の一定の年数で按分して費用処理する（遅延認識）',
      '純資産に直接計上し、以後費用処理は行わない',
      '翌期にのみ一括して費用処理する',
    ],
    correctIndex: 1,
    explanation:
      '数理計算上の差異は、原則として各期の発生額を平均残存勤務期間以内の一定の年数で按分し、規則的に費用処理（遅延認識）します。',
  },
  {
    id: 42,
    topic: '退職給付会計',
    question: '勤務費用200円、利息費用50円、期待運用収益30円である場合、当期の退職給付費用（数理計算上の差異等の影響を除く）はいくらか。',
    choices: ['280円', '220円', '250円', '200円'],
    correctIndex: 1,
    explanation: '退職給付費用＝勤務費用200円＋利息費用50円－期待運用収益30円＝220円となります。',
  },

  // ==================== 税効果会計（3問） ====================
  {
    id: 43,
    topic: '税効果会計',
    question: '将来減算一時差異800円が生じており、法定実効税率が30%である場合、計上される繰延税金資産の金額はどれか。',
    choices: ['800円', '240円', '560円', '0円'],
    correctIndex: 1,
    explanation: '将来減算一時差異800円 × 法定実効税率30% ＝ 240円が繰延税金資産として計上されます。',
  },
  {
    id: 44,
    topic: '税効果会計',
    question: '貸倒引当金の損金算入限度超過額（将来減算一時差異）に対して繰延税金資産を計上する際の相手勘定として正しいものはどれか。',
    choices: ['法人税等調整額（損益計算書）', '法人税、住民税及び事業税', '繰越利益剰余金を直接減額', 'のれん'],
    correctIndex: 0,
    explanation: '一時差異の発生・解消に伴う繰延税金資産・負債の増減は、損益計算書上「法人税等調整額」として計上します。',
  },
  {
    id: 45,
    topic: '税効果会計',
    question: 'その他有価証券の評価差額（純資産直入法）に係る税効果はどのように処理されるか。',
    choices: [
      '法人税等調整額として損益計算書に計上する',
      'その他有価証券評価差額金から直接控除し、純資産の部で処理する',
      '繰延税金資産・負債は計上しない',
      '特別損失として計上する',
    ],
    correctIndex: 1,
    explanation:
      '純資産直入法により処理されるその他有価証券評価差額金に係る税効果は、損益計算書を経由せず、評価差額金から直接控除して純資産の部で処理します。',
  },

  // ==================== 外貨換算会計（3問） ====================
  {
    id: 46,
    topic: '外貨換算会計',
    question:
      '外貨建の売掛金1,000ドル（取得時レート@100円）を、決算時レート@110円で換算替えする場合に生じる為替差損益として正しいものはどれか。',
    choices: ['為替差益10,000円', '為替差損10,000円', '換算替えは行わない', '為替差益100,000円'],
    correctIndex: 0,
    explanation:
      '決算時の円換算額（1,000ドル×@110円＝110,000円）が取得時の円換算額（100,000円）を上回るため、差額10,000円は為替差益となります。',
  },
  {
    id: 47,
    topic: '外貨換算会計',
    question: '外貨建の子会社株式（非貨幣性項目）を決算時に換算する際、原則として用いるべき為替相場はどれか。',
    choices: ['決算時の直物為替相場（CR）', '取得時の為替相場（HR）', '期中平均相場（AR）', '換算は行わない'],
    correctIndex: 1,
    explanation:
      '子会社株式などの非貨幣性項目（外貨建有価証券のうち償却原価法が適用されないもの）は、取得時の為替相場（HR）により換算し、決算時には換算替えを行いません。',
  },
  {
    id: 48,
    topic: '外貨換算会計',
    question: '為替予約を振当処理する場合、直先差額（予約レートと予約時の直物レートとの差額のうち期間対応部分）はどのように処理するか。',
    choices: [
      '予約締結時に全額を当期の損益として計上する',
      '予約締結時から決済日までの期間に配分して処理する',
      '資産の取得原価に加算し、償却は行わない',
      '純資産の部に直接計上する',
    ],
    correctIndex: 1,
    explanation:
      '振当処理では、予約時の直々差額は当期の損益として即時処理し、直先差額は予約締結時から決済日までの期間に配分して処理します。',
  },

  // ==================== 社債（3問） ====================
  {
    id: 49,
    topic: '社債',
    question:
      '額面100,000円の社債を発行価額97,000円で発行し、償却原価法（定額法）を適用する。償還期間が5年である場合、当期の社債利息（金利調整差額の償却額）はいくらか。',
    choices: ['600円', '3,000円', '97,000円', '0円'],
    correctIndex: 0,
    explanation: '金利調整差額（100,000円－97,000円＝3,000円）を償還期間5年で按分し、3,000円÷5年＝600円を当期の償却額とします。',
  },
  {
    id: 50,
    topic: '社債',
    question:
      '社債のうち帳簿価額（償却原価）40,000円相当分を、期中に現金42,000円を支払って買入償還した。このとき生じる社債償還損益はどれか。',
    choices: ['社債償還益2,000円', '社債償還損2,000円', '差額は生じない', '社債償還損40,000円'],
    correctIndex: 1,
    explanation: '支払額42,000円が償却原価40,000円を上回るため、差額2,000円は「社債償還損」として計上します。',
  },
  {
    id: 51,
    topic: '社債',
    question: '社債発行費の会計処理として、原則的な取り扱いとして正しいものはどれか。',
    choices: [
      '支出時に全額費用として処理する（又は繰延資産に計上し社債の償還までの期間で償却する）',
      '取得原価に含めて資産計上し、償却は行わない',
      '純資産から直接控除する',
      '翌期の収益から控除する',
    ],
    correctIndex: 0,
    explanation:
      '社債発行費は、支出時に全額を費用処理することが原則ですが、繰延資産として計上し、社債の償還までの期間にわたり利息法（または定額法）により償却することも認められます。',
  },

  // ==================== 純資産（3問） ====================
  {
    id: 52,
    topic: '純資産',
    question: '自己株式を取得した場合の会計処理として正しいものはどれか。',
    choices: [
      '資産として貸借対照表に計上する',
      '純資産の部の株主資本から控除する形式で計上する',
      '取得時の費用として損益計算書に計上する',
      '負債として計上する',
    ],
    correctIndex: 1,
    explanation: '自己株式は、純資産の部の株主資本の末尾に控除項目として一括して表示します（資産や負債ではありません）。',
  },
  {
    id: 53,
    topic: '純資産',
    question: '帳簿価額500円の自己株式を600円で処分した場合、差額100円（自己株式処分差益）の処理として正しいものはどれか。',
    choices: [
      '自己株式処分益として当期の損益（特別利益）に計上する',
      'その他資本剰余金に加算する',
      '利益剰余金に加算する',
      '繰越利益剰余金から控除する',
    ],
    correctIndex: 1,
    explanation: '自己株式の処分差額は損益ではなく、資本取引として「その他資本剰余金」に加減算します。',
  },
  {
    id: 54,
    topic: '純資産',
    question: '新株予約権が権利行使されずに失効した場合の会計処理として正しいものはどれか。',
    choices: [
      '新株予約権の帳簿価額を資本金に振り替える',
      '新株予約権の帳簿価額を「新株予約権戻入益」として特別利益に計上する',
      '新株予約権の帳簿価額をそのまま負債として繰り越す',
      '新株予約権の帳簿価額を損失として計上する',
    ],
    correctIndex: 1,
    explanation: '権利行使されずに失効した新株予約権の帳簿価額は、失効が確定した期に「新株予約権戻入益」として特別利益に計上します。',
  },

  // ==================== 収益認識（3問） ====================
  {
    id: 55,
    topic: '収益認識',
    question: '収益認識に関する会計基準における基本原則は、収益をどのような金額で認識することを求めているか。',
    choices: [
      '対価として実際に受け取った現金の額',
      '財又はサービスと交換に企業が権利を得ると見込む対価の額',
      '契約締結時に見積もった総原価の額',
      '取引に要した実際コストの額',
    ],
    correctIndex: 1,
    explanation:
      '基本原則は、約束した財又はサービスの顧客への移転を、その対価として企業が権利を得ると見込む金額で描写するように収益を認識することです。',
  },
  {
    id: 56,
    topic: '収益認識',
    question:
      '商品10,000円と1年間の保守サービス2,000円を合わせて12,000円で販売する契約で、それぞれが独立した履行義務と判断された場合の収益認識として正しいものはどれか。',
    choices: [
      '12,000円を商品の引渡時に全額収益計上する',
      '取引価格を独立販売価格の比率で配分し、商品分は引渡時に、保守サービス分は役務提供期間にわたり収益計上する',
      '全額を保守サービスの提供期間にわたって按分計上する',
      '対価を現金で受け取った時点で一括して収益計上する',
    ],
    correctIndex: 1,
    explanation:
      '複数の履行義務がある場合、取引価格を独立販売価格の比率で各履行義務に配分し、それぞれの履行義務が充足された時点（又は充足するにつれて）収益を認識します。',
  },
  {
    id: 57,
    topic: '収益認識',
    question: '進捗度を合理的に見積ることができる工事契約など、一定の期間にわたり充足される履行義務に適用される収益認識方法はどれか。',
    choices: [
      '工事が完成した時点で一括して収益を認識する',
      '進捗度に応じて一定の期間にわたり収益を認識する',
      '対価を受領した時点で収益を認識する',
      '収益は認識せず、発生原価のみを費用計上する',
    ],
    correctIndex: 1,
    explanation:
      '一定の期間にわたり充足される履行義務については、進捗度を合理的に見積ることができる場合、その進捗度に応じて収益を認識します。',
  },

  // ==================== 本支店会計（3問） ====================
  {
    id: 58,
    topic: '本支店会計',
    question: '本店が支店へ現金1,000円を送付した場合、本店側の仕訳における相手勘定として正しいものはどれか。',
    choices: ['「支店」勘定（借方）', '「本店」勘定（借方）', '相手勘定は計上しない', '「未収入金」勘定'],
    correctIndex: 0,
    explanation: '本店側は（借）支店1,000／（貸）現金1,000と仕訳し、内部取引を管理する「支店」勘定を借方に計上します。',
  },
  {
    id: 59,
    topic: '本支店会計',
    question: '本支店合併財務諸表を作成する際、本店の「支店」勘定と支店の「本店」勘定はどのように処理されるか。',
    choices: ['相殺消去する', '両建てのまま表示する', '差額のみ売掛金として計上する', '資本金に振り替える'],
    correctIndex: 0,
    explanation: '「支店」勘定と「本店」勘定は企業内部の貸借関係を示すものであり、合併財務諸表の作成にあたって相殺消去します。',
  },
  {
    id: 60,
    topic: '本支店会計',
    question:
      '本店が原価に一定の利益を加算した振替価格（内部利益を含む）で支店に商品を送付している場合、本支店合併財務諸表の作成にあたり決算整理で調整すべき項目はどれか。',
    choices: [
      '支店の期末棚卸資産に含まれる内部利益（未実現利益）の控除',
      '本店の売上高の取消',
      '支店の売上原価の全額取消',
      '調整は不要である',
    ],
    correctIndex: 0,
    explanation:
      '支店の期末棚卸資産には本店が上乗せした内部利益が含まれているため、合併財務諸表上はこの未実現の内部利益を控除する調整が必要です。',
  },

  // ==================== 個別原価計算（3問） ====================
  {
    id: 61,
    topic: '個別原価計算',
    question: '製造指図書#101に集計された直接材料費300円、直接労務費200円、製造間接費150円の場合、この指図書の製造原価はいくらか。',
    choices: ['650円', '500円', '450円', '150円'],
    correctIndex: 0,
    explanation: '製造原価＝直接材料費300円＋直接労務費200円＋製造間接費150円＝650円となります。',
  },
  {
    id: 62,
    topic: '個別原価計算',
    question: '製造間接費を予定配賦する場合、予定配賦率は年間製造間接費予算をどの数値で除して算定するか。',
    choices: ['年間の基準操業度（予定配賦基準数値）', '実際の年間操業度', '前期実績の総原価', '直接材料費の実際発生額'],
    correctIndex: 0,
    explanation: '予定配賦率＝年間製造間接費予算 ÷ 年間の基準操業度（予定配賦基準数値）で算定します。',
  },
  {
    id: 63,
    topic: '個別原価計算',
    question: '製造間接費の実際発生額が予定配賦額を上回った場合に生じる差異の名称と、その原則的な処理として正しいものはどれか。',
    choices: [
      '「製造間接費配賦差異（不利差異）」が生じ、原則として売上原価等に賦課する',
      '「材料消費価格差異」が生じ、資産として繰り越す',
      '差異は生じず、調整も不要である',
      '「賃率差異」として処理する',
    ],
    correctIndex: 0,
    explanation:
      '実際発生額が予定配賦額を上回ると不利な「製造間接費配賦差異」が生じ、正常な範囲内であれば原則として売上原価等に賦課します。',
  },

  // ==================== 直接原価計算（3問） ====================
  {
    id: 64,
    topic: '直接原価計算',
    question: '売上高1,000,000円、変動費600,000円である場合、限界利益（貢献利益）率はどれか。',
    choices: ['60%', '40%', '20%', '80%'],
    correctIndex: 1,
    explanation: '限界利益＝1,000,000円－600,000円＝400,000円。限界利益率＝400,000円÷1,000,000円＝40%となります。',
  },
  {
    id: 65,
    topic: '直接原価計算',
    question: '固定費500,000円、限界利益率40%である場合、損益分岐点売上高はいくらか。',
    choices: ['1,250,000円', '500,000円', '2,000,000円', '200,000円'],
    correctIndex: 0,
    explanation: '損益分岐点売上高＝固定費500,000円 ÷ 限界利益率40% ＝ 1,250,000円となります。',
  },
  {
    id: 66,
    topic: '直接原価計算',
    question: '直接原価計算による損益計算書において、固定製造間接費はどのように扱われるか。',
    choices: [
      '製品原価に含めず、期間費用として発生年度に全額費用計上する',
      '製品原価に含めて、販売時に売上原価として計上する',
      '資産として繰り延べる',
      '変動費として扱う',
    ],
    correctIndex: 0,
    explanation:
      '直接原価計算では、固定製造間接費を製品原価に含めず、発生した期間の費用（期間原価）として全額を損益計算書に計上します。',
  },

  // ==================== 意思決定会計（3問） ====================
  {
    id: 67,
    topic: '意思決定会計',
    question:
      '外部から1個500円で購入できる部品を自製する場合の変動製造原価が1個あたり420円であり、自製に伴い解放される固定費はない。自製と購入のどちらが有利か（1個あたり）。',
    choices: ['自製の方が80円有利', '購入の方が80円有利', 'どちらでも同じである', '判断できない'],
    correctIndex: 0,
    explanation: '自製の変動費420円が購入価格500円を下回るため、差額80円だけ自製の方が有利です。',
  },
  {
    id: 68,
    topic: '意思決定会計',
    question: '遊休生産能力の範囲内で受注できる特別注文の意思決定において、既存の固定費の取り扱いとして正しいものはどれか。',
    choices: [
      '既存の固定費は意思決定に関連しない埋没原価であるため考慮しない',
      '固定費は必ず全額を追加原価として考慮する',
      '固定費は売上高に応じて按分し、必ず考慮する',
      '固定費を無視して意思決定してはならない',
    ],
    correctIndex: 0,
    explanation:
      '遊休能力の範囲内であれば、既存の固定費は受注の有無にかかわらず発生する埋没原価であるため、差額原価収益分析では考慮しません。',
  },
  {
    id: 69,
    topic: '意思決定会計',
    question: '設備投資の意思決定において、正味現在価値法（NPV法）の採否判断の基準として正しいものはどれか。',
    choices: [
      'NPVがプラスであれば投資を採用する',
      'NPVがマイナスであれば投資を採用する',
      'NPVの大小にかかわらず回収期間だけで判断する',
      'NPVは投資の意思決定には用いない',
    ],
    correctIndex: 0,
    explanation: '正味現在価値法では、将来キャッシュ・フローの現在価値合計から投資額を差し引いたNPVがプラスであれば投資を採用します。',
  },
];

const TOPIC_GROUPS = [
  {
    category: '商業簿記・会計学',
    topics: [
      '連結会計',
      '資産除去債務',
      '有価証券',
      '減損会計',
      'リース会計',
      '退職給付会計',
      '税効果会計',
      '外貨換算会計',
      '社債',
      '純資産',
      '収益認識',
      '本支店会計',
    ],
  },
  {
    category: '工業簿記・原価計算',
    topics: ['標準原価計算', '個別原価計算', '直接原価計算', '意思決定会計'],
  },
];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 選択肢の並び順もシャッフルし、正解インデックスを追跡し直す
function prepareQuestion(q) {
  const correctText = q.choices[q.correctIndex];
  const shuffledChoices = shuffleArray(q.choices);
  return { ...q, choices: shuffledChoices, correctIndex: shuffledChoices.indexOf(correctText) };
}

export default function BokiDrillApp() {
  const [screen, setScreen] = useState('select'); // select | quiz | result
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [records, setRecords] = useState([]);
  const [modeLabel, setModeLabel] = useState('');

  const startQuiz = (topic) => {
    const pool = topic ? questionBank.filter((q) => q.topic === topic) : questionBank;
    const count = Math.min(10, pool.length);
    const picked = shuffleArray(pool).slice(0, count).map(prepareQuestion);
    setQuizQuestions(picked);
    setCurrentIndex(0);
    setSelected(null);
    setAnswered(false);
    setRecords([]);
    setModeLabel(topic ? `論点別：${topic}` : '全範囲ランダム');
    setScreen('quiz');
  };

  const currentQuestion = quizQuestions[currentIndex];

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const isCorrect = idx === currentQuestion.correctIndex;
    setRecords((prev) => [
      ...prev,
      {
        topic: currentQuestion.topic,
        question: currentQuestion.question,
        choices: currentQuestion.choices,
        correctIndex: currentQuestion.correctIndex,
        selectedIndex: idx,
        explanation: currentQuestion.explanation,
        isCorrect,
      },
    ]);
  };

  const handleNext = () => {
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setScreen('result');
    }
  };

  const restart = () => setScreen('select');
  const correctCount = records.filter((r) => r.isCorrect).length;

  // ---------- モード選択画面 ----------
  if (screen === 'select') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center px-4 py-10" style={{ fontFamily: FONT_STACK }}>
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-blue-900 mb-2">
              <ClipboardList size={26} />
              <span className="text-xs font-bold tracking-[0.2em]">BOKI DRILL</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">簿記1級 4択ドリル</h1>
            <p className="text-slate-500 text-sm mt-1">スキマ時間で得点力を上げる</p>
          </div>

          <button
            onClick={() => startQuiz(null)}
            className="w-full bg-blue-900 hover:bg-blue-800 active:scale-[0.98] transition-transform text-white rounded-2xl p-5 flex items-center justify-between shadow-sm mb-7"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/15 rounded-full p-2.5">
                <Shuffle size={22} />
              </div>
              <div className="text-left">
                <div className="font-bold text-lg leading-tight">全範囲からランダム</div>
                <div className="text-blue-100 text-xs mt-0.5">全{questionBank.length}問からランダム出題</div>
              </div>
            </div>
            <ChevronRight size={22} />
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="h-px bg-slate-300 flex-1" />
            <span className="text-slate-400 text-xs font-medium">論点を選んで演習</span>
            <div className="h-px bg-slate-300 flex-1" />
          </div>

          <div className="space-y-6">
            {TOPIC_GROUPS.map((group) => (
              <div key={group.category}>
                <h2 className="text-xs font-bold text-slate-400 tracking-wide mb-2 pl-1">{group.category}</h2>
                <div className="grid grid-cols-2 gap-2.5">
                  {group.topics.map((topic) => {
                    const cnt = questionBank.filter((q) => q.topic === topic).length;
                    return (
                      <button
                        key={topic}
                        onClick={() => startQuiz(topic)}
                        className="bg-white border border-slate-200 hover:border-blue-300 active:scale-[0.97] transition-transform rounded-xl p-3 flex flex-col items-start gap-1.5 shadow-sm text-left"
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="bg-blue-50 text-blue-900 rounded-full p-1.5">
                            <BookOpen size={16} />
                          </div>
                          <span className="text-slate-400 text-[11px]">{cnt}問</span>
                        </div>
                        <div className="font-bold text-slate-800 text-sm leading-snug">{topic}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ---------- ドリル画面 ----------
  if (screen === 'quiz' && currentQuestion) {
    const total = quizQuestions.length;
    return (
      <div className="min-h-screen bg-slate-50 pb-8" style={{ fontFamily: FONT_STACK }}>
        <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-200 px-4 pt-4 pb-3 z-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2 py-1 rounded">{modeLabel}</span>
              <span className="text-sm font-bold text-slate-700 tabular-nums">
                {currentIndex + 1} / {total}問目
              </span>
            </div>
            <div className="flex gap-1">
              {quizQuestions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full ${
                    i < currentIndex ? 'bg-blue-900' : i === currentIndex ? 'bg-blue-400' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 pt-5">
          {/* 伝票風の問題カード */}
          <div className="relative bg-white rounded-r-2xl rounded-l-lg shadow-sm border border-slate-200 border-l-4 border-l-blue-900 p-5 mb-5">
            <div className="absolute -left-[7px] top-4 w-3.5 h-3.5 bg-slate-50 rounded-full border border-slate-200" />
            <div className="absolute -left-[7px] bottom-4 w-3.5 h-3.5 bg-slate-50 rounded-full border border-slate-200" />
            <span className="inline-block text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded mb-3">
              {currentQuestion.topic}
            </span>
            <p className="text-slate-800 text-base leading-relaxed font-medium">{currentQuestion.question}</p>
          </div>

          <div className="space-y-3">
            {currentQuestion.choices.map((choice, idx) => {
              let stateClass = 'bg-white border-slate-200 text-slate-800 active:bg-slate-50';
              if (answered) {
                if (idx === currentQuestion.correctIndex) {
                  stateClass = 'bg-emerald-50 border-emerald-500 text-emerald-800';
                } else if (idx === selected) {
                  stateClass = 'bg-rose-50 border-rose-500 text-rose-700';
                } else {
                  stateClass = 'bg-white border-slate-100 text-slate-300';
                }
              }
              const badgeClass =
                answered && idx === currentQuestion.correctIndex
                  ? 'border-emerald-500 bg-emerald-500 text-white'
                  : answered && idx === selected
                  ? 'border-rose-500 bg-rose-500 text-white'
                  : 'border-slate-300 text-slate-500';
              return (
                <button
                  key={idx}
                  disabled={answered}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left border-2 rounded-2xl px-4 py-4 flex items-center gap-3 transition-colors ${stateClass}`}
                >
                  <span className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${badgeClass}`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-base font-semibold tabular-nums flex-1">{choice}</span>
                  {answered && idx === currentQuestion.correctIndex && (
                    <CheckCircle2 className="text-emerald-500 shrink-0" size={22} />
                  )}
                  {answered && idx === selected && idx !== currentQuestion.correctIndex && (
                    <XCircle className="text-rose-500 shrink-0" size={22} />
                  )}
                </button>
              );
            })}
          </div>

          {answered && (
            <div
              className={`mt-5 rounded-2xl p-4 border-l-4 ${
                selected === currentQuestion.correctIndex ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500'
              }`}
            >
              <div
                className={`flex items-center gap-2 font-bold mb-2 ${
                  selected === currentQuestion.correctIndex ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                {selected === currentQuestion.correctIndex ? (
                  <>
                    <CheckCircle2 size={20} /> 正解！
                  </>
                ) : (
                  <>
                    <XCircle size={20} /> 不正解
                  </>
                )}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{currentQuestion.explanation}</p>
            </div>
          )}

          {answered && (
            <button
              onClick={handleNext}
              className="w-full mt-5 bg-blue-900 hover:bg-blue-800 active:scale-[0.98] transition-transform text-white font-bold rounded-2xl py-4 text-lg shadow-sm"
            >
              {currentIndex + 1 < total ? '次の問題へ' : '結果を見る'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ---------- 結果画面 ----------
  const total = quizQuestions.length;
  const wrongRecords = records.filter((r) => !r.isCorrect);
  const scorePct = total ? Math.round((correctCount / total) * 100) : 0;
  const circumference = 2 * Math.PI * 42;

  return (
    <div className="min-h-screen bg-slate-50 pb-10" style={{ fontFamily: FONT_STACK }}>
      <div className="max-w-md mx-auto px-4 pt-8">
        <div className="text-center mb-6">
          <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2 py-1 rounded">{modeLabel}</span>
          <h2 className="text-xl font-bold text-slate-900 mt-3">お疲れさまでした</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 mb-3">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#E2E8F0" strokeWidth="10" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#1e3a8a"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - scorePct / 100)}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                {correctCount}
                <span className="text-base text-slate-400">/{total}</span>
              </span>
              <span className="text-xs text-slate-400 mt-0.5">正解</span>
            </div>
          </div>
          <p className="text-slate-500 text-sm">正答率 {scorePct}%</p>
        </div>

        {wrongRecords.length > 0 ? (
          <div className="mb-6">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <XCircle size={18} className="text-rose-500" /> 復習リスト（{wrongRecords.length}問）
            </h3>
            <div className="space-y-4">
              {wrongRecords.map((r, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                  <span className="inline-block text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded mb-2">
                    {r.topic}
                  </span>
                  <p className="text-slate-800 text-sm font-medium mb-3 leading-relaxed">{r.question}</p>
                  <div className="text-sm mb-1">
                    <span className="text-rose-600 font-semibold">あなたの回答：</span>
                    <span className="text-slate-600">{r.choices[r.selectedIndex]}</span>
                  </div>
                  <div className="text-sm mb-3">
                    <span className="text-emerald-600 font-semibold">正解：</span>
                    <span className="text-slate-700 font-semibold">{r.choices[r.correctIndex]}</span>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-600 leading-relaxed border-l-4 border-blue-900">
                    {r.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center mb-6">
            <CheckCircle2 className="text-emerald-500 mx-auto mb-2" size={32} />
            <p className="text-emerald-700 font-bold">全問正解です！</p>
          </div>
        )}

        <button
          onClick={restart}
          className="w-full bg-blue-900 hover:bg-blue-800 active:scale-[0.98] transition-transform text-white font-bold rounded-2xl py-4 text-lg flex items-center justify-center gap-2 shadow-sm"
        >
          <RotateCcw size={20} /> モード選択に戻る
        </button>
      </div>
    </div>
  );
}
