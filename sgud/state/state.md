# 狀態

本檔記載當前已開發功能之最新狀態(現況,不寫過程;過程寫入`sgud/exp/experience.md`).規則帳本為藍圖(`sgud/rule/rulebook.md`),兩者比對即知尚未做到者.過長時依功能類型拆為`state_<類型>.md`,本檔只留索引.

## 最近一次驗證與版本

- 驗證日期: 2026-11-09(quill 2.0.3 升級輪與其後之銷毀時監聽解除輪).
- `package.json`版本: 2.0.36(未動版號,未發布).
- node單元測試: `npm test` 25 passing(`test/unit-quill2.test.mjs` 16案對應R01~R07,`test/unit-lifecycle.test.mjs` 8案對應R08,`test/all.test.mjs` 1案);`unit-lifecycle`連跑5次皆過.
- 瀏覽器實跑(headless,範例頁與harness,暫存腳本不入倉庫): 範例頁/harness 31項全過(升級輪;銷毀時監聽解除後重跑仍31/31,6張截圖位元組與前一輪相同);同腳本對升級前之dist(quill 1.3.7)29項過,2項不過(貼入`<img onerror>`被執行、隨之載入失敗請求).
- 生命週期實跑(建立→銷毀→再建立3輪,真實DOM,以包裝`addEventListener`記錄元件登錄之`window` mousemove監聽): 修後8項全過(每輪銷毀後回到存活數,全部銷毀後為0,已銷毀實例不再被全域disable/enable呼叫,全程無console error);修前版3過5不過(銷毀後監聽數2,3,4,最後殘留5,已銷毀實例被呼叫2次).
- 新舊並排: 範例頁6張截圖(初始,格式化後,失焦同步後,輸入後,editable=false,空內容)新舊位元組相同;版面數字(外層/工具列/容器/編輯區之x,y,寬,高)與computed樣式新舊相同.

## 功能現況

| 功能 | 狀態 | 規則 | 驗證 |
|---|---|---|---|
| quill 2.0.3,元件直接建立/銷毀Quill實例 | 完成 | R01,R02,R03 | 單元,實跑 |
| `v-model`(HTML字串,失焦且值變時emit `input`) | 完成 | R05,R06 | 單元,實跑 |
| props `value`,`settings`,`height`,`editable` | 完成 | R06 | 單元,實跑 |
| 預設工具列(bold,italic,underline,strike,color,background,indent,script,align) | 完成(各格式鈕實測作用,HTML與修前相同) | R04 | 單元,實跑 |
| 多個編輯器綁同一值之同步(全域disable/enable) | 完成(沿用既有設計) | R06 | 實跑 |
| README與範例頁(quill 2.0.3之CDN) | 完成 | R07 | 單元 |
| 銷毀時解除全部全域監聽(`window` mousemove,事件匯流排`ev`之disable/enable,quill實例事件);建立→銷毀→再建立不累積 | 完成 | R08 | 單元,實跑 |

## 使用端可見之變化(quill 1.3.7 → 2.0.3)

與README〈Breaking changes (since quill 2)〉一致.元件不提供舊版相容之墊片.

1. 資源: 須改載quill 2(`quill/dist/quill.snow.css`或CDN `quill@2.0.3/dist/quill.snow.css`與`quill.js`);quill 1之CDN檔不得再用.
2. `v-model`值之HTML: 預設工具列之格式(段落,粗斜底線刪除線,顏色,背景,縮排,上下標,對齊,連結)輸出與修前相同;清單改為`<ol><li data-list="bullet|ordered"><span class="ql-ui" contenteditable="false"></span>...`(原`<ul>`/`<ol>`),程式碼區塊改為`<div class="ql-code-block-container"><div class="ql-code-block">`(原`<pre class="ql-syntax">`);混合標題貼入時不再於標題前多一個空段落.
3. `getEditor()`回quill 2實例:`pasteHTML`已移除(改`clipboard.dangerouslyPasteHTML`),`clipboard.convert`改收`{ html, text }`,選項`strict`,`scrollingContainer`,`matchVisual`已移除.
4. 貼入/外部設值之HTML不再執行腳本(quill 1.3.7會執行`<img onerror>`;GHSA-4943-9vgg-gr5r).
5. 打包: quill 2之npm檔為ESM並含新語法,舊工具鏈(如webpack 4)可能需轉譯(推測,未驗);不再支援IE.
6. 套件依賴: 不再安裝`vue-quill-editor`;UMD之`dist`不再內含其程式碼(由發布流程產製).
7. 畫面: 預設工具列之版面數字,字型,截圖與修前相同(實測,見上〈最近一次驗證〉).

## 公告之判斷

quill主版本升級,且清單/程式碼區塊之HTML形態改變,使用端若保存或另處顯示含此類格式之內容須自查;CDN使用端須同步改為quill 2.0.3之檔案.預設工具列之內容與畫面不受影響.維護者裁定(2026-11-09): 以README之〈Breaking changes (since quill 2)〉為升級說明即可,不另發公告.

## 已知缺口與待辦

1. GHSA-v3m3-f69x-jf25(CVE-2025-15056,LOW,2.0.3之`getSemanticHTML`等HTML export缺資料驗證):本元件不使用該API(R05),待上游修補版;npm audit仍會對quill 2.0.3報1個low.
2. 既有行為(新舊版相同,本輪未改,見經驗檔): ①外部改`value`時`dangerouslyPasteHTML`內之`setSelection`使編輯器取得焦點;②多個編輯器綁同一值且內容含多種格式時(各編輯器innerHTML之class/style順序不同),同步後直接點入另一編輯器會使其立即失焦(全域disable);③外部改`value`後元件會自行emit一次正規化後之HTML(Quill對未聚焦編輯器之初始selection-change視為失焦).
3. 工具列被註解之list,header,blockquote,code-block,link註解稱「同步文本會出現額外換行問題」為quill 1現象;quill 2下混合標題樣本已無此現象(實測),但清單/程式碼區塊之HTML形態已變,是否開放待使用端評估(維護者裁定: 不動).
4. 瀏覽器實跑腳本不入倉庫(套件未依賴playwright);重跑作法見經驗檔.
