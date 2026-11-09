# 規則帳本

本檔為套件設計與開發階段之規則帳本(藍圖),為要求程式碼須長成什麼樣,或由規格產出之測試(項目/說明/流程)有哪些,包含軸、單一擁有者、已知限制、破壞性變更紀錄,以及對應是哪些測試檔案或指令等,由agent自行編列、擴充與維護.當前已做到哪些記於`sgud/state/state.md`.過長時依類型拆為`rulebook_<類型>.md`,本檔只留索引.

本套件定位:以Vue2封裝Quill之富文本編輯器元件套件(`CLAUDE.md`).需求出處:套件維護者之升級建議(2026-11-09,quill升至2.0.3,移除vue-quill-editor).

## 測試與盤點之共同入口

- 單元測試(node,不載入瀏覽器): `npm test`(`test/unit-quill2.test.mjs`對應R01~R07之原始碼/依賴/文件檢查;`test/unit-lifecycle.test.mjs`對應R08,以替身驅動元件真實程式碼之`mounted`/`beforeDestroy`,輔助工具為`test/tools/loadWQuillVue.mjs`;`test/all.test.mjs`為既有佔位).
- 瀏覽器實跑(初始化,工具列各格式鈕,v-model值,editable,失焦,往返,銷毀): 暫存腳本,不入倉庫(套件未依賴playwright);作法見`sgud/exp/experience.md`之〈quill升級之瀏覽器實跑〉.
- 盤點指令(皆在套件根目錄,以Grep工具或`git grep`):
  - `git grep -n "vue-quill-editor" -- src package.json test examples README.md` 應無結果(R02).
  - `git grep -n "\.pasteHTML(\|getSemanticHTML(" -- src` 應無結果;`git grep -n "dangerouslyPasteHTML(" -- src` 應只在`pasteHtml`方法內(R03,R05).
  - `git grep -n "quill@" -- README.md examples` 應皆為`quill@2.0.3`(R07).
  - `git grep -n "addEventListener\|removeEventListener\|ev\.on(\|ev\.off(" -- src` 之站點須成對:`window.addEventListener('mousemove', ...)`對`window.removeEventListener('mousemove', ...)`(事件名一致),`ev.on('disable'|'enable', ...)`對`ev.off(...)`(R08).

## 規則

### R01 quill版本
- 規則: `dependencies.quill`為`^2.0.3`;已安裝版為2.x;README與範例頁之CDN路徑為`quill@2.0.3/dist/quill.snow.css`與`quill@2.0.3/dist/quill.js`.
- 判準: 已套(`package.json`,`README.md`,`examples/ex-default.html`).
- 測試: `unit-quill2.test.mjs` R01,R07.
- 已知限制: npm audit對2.0.3列GHSA-v3m3-f69x-jf25(LOW,HTML export),見R05.

### R02 直接使用quill,不經第三方封裝
- 規則: 依賴僅`quill`與`wsemi`;`vue-quill-editor`及其他封裝套件不得出現於`package.json`,`package-lock.json`與`src/`.
- 判準: 已套.
- 測試: `unit-quill2.test.mjs` R02(依賴,鎖檔,原始碼).

### R03 Quill實例之建立/內容貼入/銷毀
- 規則:
  - 建立: `mounted`時於`$refs.editor`以`new Quill(...)`建立;選項為`{ theme:'snow', placeholder:'Insert text here ...', readOnly:false }`加`def_settings`加使用端`settings`(淺層合併,後者覆蓋前者;`settings`僅於掛載時讀取,不隨後續變更重建).Quill實例不放`data`(非響應式).
  - 貼入: 一律`clipboard.dangerouslyPasteHTML(html)`;quill 2已移除`pasteHTML`,不得呼叫.初始內容於掛載事件之前貼入,故不觸發`text-change`.
  - 銷毀: `beforeDestroy`解除本元件掛載於實例之`selection-change`,`text-change`並釋放實例參考(quill 2無`destroy()`).`getEditor()`於銷毀後回`null`.
- 判準: 已套.
- 測試: `unit-quill2.test.mjs` R03;瀏覽器實跑(銷毀後無新增console錯誤,`getEditor()`為空).

### R04 預設工具列
- 規則: 預設工具列為bold/italic/underline/strike,color/background,indent(-1,+1),script(sub,super),align;其格式名皆須為已安裝quill之註冊格式.被註解掉之項目(size,list,header,blockquote,code-block,link,image,video,clean)為既有註解,未經使用端評估不啟用.
- 判準: 已套(未啟用項目為刻意不套).
- 測試: `unit-quill2.test.mjs` R04(格式名對照`node_modules/quill/quill.js`之註冊表);瀏覽器實跑(各格式鈕作用後之HTML).

### R05 v-model之值格式與HTML輸出之安全邊界
- 規則:
  - 值為編輯器內容之HTML字串,取自`quill.root.innerHTML`;內容為空(`<p><br></p>`)時為`''`.
  - 不使用`getSemanticHTML()`(GHSA-v3m3-f69x-jf25,HTML export缺資料驗證,2.0.3列為受影響,無修補版).若日後需改用,須先確認上游修補版並重驗R05實跑之往返表.
  - 值為HTML,元件不做淨化;顯示給他人(`v-html`)前由使用端淨化.
- 判準: 已套.
- 測試: `unit-quill2.test.mjs` R05;瀏覽器實跑(`<img onerror>`貼入後不執行;空值為'').

### R06 對外介面與事件語意
- 規則:
  - props: `value`(String,預設''),`settings`(Object),`height`(Number,預設250,px,套於`.quill-editor`外層),`editable`(Boolean,預設true).
  - 事件: 僅`input`;於編輯器失焦、滑鼠不在元件內、且`valueTrans`與`value`不同時才emit一次;emit前全域disable所有實例,50ms後依各自`editable`還原(多個編輯器綁同一值時避免互相搶焦點).`vue-quill-editor`之`ready`,`change`,`focus`事件本元件從未轉發,維持不轉發.
  - `valueTrans`初值取自`value`(`data()`內),否則掛載後`valueTrans`之watch會多貼入一次,使未編輯之編輯器失焦即emit正規化後之HTML.
  - `editable`變更以`quill.enable()`切換;`valueTrans`變為非空且不同於最後已知HTML時重貼,變為空字串時`setText('')`.
  - DOM結構: 根`div(inline-block)`>`.quill-editor(高度)`>`div[ref=editor]`;`.ql-container`之字型沿用外層.
- 判準: 已套.
- 測試: `unit-quill2.test.mjs` R06;瀏覽器實跑(失焦emit次數,editable切換,同步後仍可編輯,height綁定,版面數字與修前一致).

### R07 說明文件
- 規則: README列「Breaking changes (since quill 2)」(使用端可見之變化),並與`sgud/state/state.md`之〈使用端可見之變化〉一致;範例頁之CDN位址指向quill 2.0.3.
- 判準: 已套.
- 測試: `unit-quill2.test.mjs` R07.

### R08 元件銷毀時須解除其登錄之全部全域監聽
- 規則:
  - 站點全集(`mounted`登錄者):①`window` `mousemove`(`fMousemove`);②模組層級事件匯流排`ev`之`disable`(`fEvDisable`)與`enable`(`fEvEnable`);③quill實例上之`selection-change`,`text-change`(R03).每一站點須於`beforeDestroy`以**同一事件名與同一函式參考**解除.
  - 監聽函式存於實例屬性(非`data`,不響應式),供解除之用;解除後設為`null`.
  - `ev.off`須給函式參考:eventemitter3之`off(event)`未給函式時會清空該事件之全部監聽(含其他存活實例者),故`beforeDestroy`於未掛載(`mounted`未執行)或重複呼叫時須略過(以`if (vo.fEvDisable)`守住).
  - 只解除本實例者;其他存活實例之全域disable/enable流程(失焦emit前全關,50ms後依各自`editable`還原)不得受影響.焦點行為(既有)不動.
- 判準: 已套(三類站點皆成對).
- 測試: `unit-lifecycle.test.mjs` R08 ×8(登錄數、銷毀後無殘留、已銷毀實例不再被匯流排呼叫、存活實例不受影響且依`editable`還原、建立→銷毀→再建立3輪、quill事件解除、未掛載/重複銷毀不誤清他者、重複呼叫不拋錯);瀏覽器實跑(真實DOM,以包裝`addEventListener`記錄元件登錄之`window` mousemove監聽數:建立/銷毀/再建立3輪皆回到存活數,全部銷毀後為0).
- 修前紅: 單元4紅(銷毀後仍殘留1個mousemove、匯流排呼叫已銷毀實例2次、3輪循環、重複銷毀);實跑修前版於3輪銷毀後之監聽數為2,3,4(應為1),全部銷毀後殘留5個,且已銷毀實例被匯流排呼叫2次.

## 破壞性變更紀錄(quill 1.3.7 → 2.0.3)

查證依據: 官方〈Upgrading to 2.0〉,已安裝2.0.3之原始碼,及新舊並排之瀏覽器實跑(證據: 任務報告).

| 項目 | quill 1 | quill 2 | 對本元件之影響 |
|---|---|---|---|
| `pasteHTML` | 為`dangerouslyPasteHTML`之別名 | 已移除 | 元件改呼叫`clipboard.dangerouslyPasteHTML` |
| 貼入HTML之解析 | 寫入容器`innerHTML`後再轉delta,`<img onerror>`會執行 | `DOMParser`解析,不執行 | 貼入(外部設值)不再執行腳本 |
| 清單 | `<ul>`/`<ol>` | 一律`<ol><li data-list="...">`並含`<span class="ql-ui">` | `v-model`值之HTML形態改變(預設工具列未開放清單) |
| 程式碼區塊 | `<pre class="ql-syntax">` | `<div class="ql-code-block-container">` | 同上 |
| 混合標題貼入 | `<h1>`前多一個空段落 | 無 | 既有註解所述之額外換行問題於此樣本消失 |
| `clipboard.convert` | 字串 | `{ html, text }` | 元件未用 |
| 選項 | `strict`,`scrollingContainer`,clipboard之`matchVisual` | 已移除 | 使用端`settings`若有設定則失效 |
| CDN檔 | `quill.min.js`,`quill.snow.min.css` | `quill.js`,`quill.snow.css`(無`.min`) | README與範例已改 |
| 模組格式 | CJS/UMD | npm為ESM(含ES2022語法),`dist/quill.js`為UMD | 打包時舊工具鏈可能需轉譯(未驗) |
| IE | 支援 | 不支援 | — |
| 工具列/格式HTML | — | — | 預設工具列各格式之HTML,版面數字,截圖與修前一致(實測) |
