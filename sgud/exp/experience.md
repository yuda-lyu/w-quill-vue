# 累積經驗

本檔為執行工作時特有之累積經驗,留給後續之嘗試、執行與判斷,由agent自行編列、擴充與維護.過長時抽出舊者為`experience_<年月日>.md`,並於本檔註明何時抽出.

## quill升級之瀏覽器實跑(2026-11-09,quill 1.3.7 → 2.0.3)

本套件為ui類,畫面差異node測試看不出來,升級quill時以「同一腳本對新舊兩版並排實跑」確認.作法(暫存腳本,不入倉庫,套件未依賴playwright):

1. 新版: 套件之建置腳本(`toolg/gDistRollup.mjs`)之選項不變,另寫暫存建置腳本把`fdTar`改為`./tmp/<任務>/dist`,不動倉庫`dist/`.舊版: 取修前之`dist/w-quill-vue.umd.js`副本與`npm pack quill@1.3.7`解出之`dist/quill.js`,`quill.snow.css`.
2. 頁面: 以倉庫`examples/ex-default.html`(舊版取`git show HEAD:...`)為底,把CDN位址換成本機檔(Vue 2借他套件已裝之`vue.min.js`副本),以`file://`載入;換完須檢查不含`src=`/`href=`之`http(s)`位址(`xmlns`不算).另備harness頁(多實例,`:editable`,`v-if`,`@input`計數,空白區供失焦點擊).
3. playwright: 借用`w-package-tools`已安裝者(動態`import(pathToFileURL(...))`),headless;瀏覽器已隨機器安裝則直接`chromium.launch()`.
4. 比對: 工具列各格式鈕作用後之`.ql-editor`innerHTML,版面數字(`getBoundingClientRect`),computed樣式,往返表(貼入各HTML片段後之編輯器HTML與父層收到之`input`值),截圖位元組雜湊,console錯誤.往返表須「每片段前清空emit記錄」,否則看不到外部設值後自動emit之值.
5. 結果判讀注意: 往返表之片段彼此順序相依(舊版於程式碼區塊之後貼入連結曾丟失連結,乾淨狀態各別貼入則相同),判定差異前先以乾淨狀態各別貼入複驗.

## Vue 2元件封裝quill之要點

- `data`之`valueTrans`初值必須取自`this.value`.若初值為`''`而由render中之computed(`changeValue`)才設為`value`,掛載後`valueTrans`之watch會多觸發一次:重貼內容→`text-change`→`valueTrans`被改為正規化HTML→未編輯之編輯器一失焦就emit(`valueTrans !== value`).此為2.0.3升級時自寫膠水碼初版踩到之錯(vue-quill-editor時代因子元件一建立prop已是`value`而不發生);單元測試R06守住,headless以「輸入後失焦恰emit一次」驗.
- quill對未聚焦編輯器於`document`首次`selectionchange`時會發`selection-change(null)`(`Selection`之`lastRange`初值為`Range(0,0)`),新舊版皆然;本元件把它當失焦(`onLostFocus`),所以外部改`value`後(貼入使`valueTrans`被正規化,與`value`字串不同)元件會自行emit一次正規化後之值.看到「沒操作就emit」先查此項再查別處.
- `dangerouslyPasteHTML`(新舊版皆然)內含`setSelection(0, SILENT)`,編輯器為啟用狀態時會取得焦點;全域`disable`/`enable`之設計即為避免多個綁同值之編輯器互搶焦點.不要為了「乾淨」改成`setContents`而不先評估使用端是否依賴此行為.
- quill之`on`/`off`須用同一函式參考,故事件處理函式存於實例屬性(`fSelectionChange`,`fTextChange`)供`beforeDestroy`解除;quill 2無`destroy()`.
- UMD之`globals: { quill: 'quill' }`使瀏覽器端讀`global.quill`(不存在),CDN之quill 2掛的是`window.Quill`,故元件須自備`window.Quill`之備援(`getQuill()`);在`mounted`內取用以免模組載入時即碰`window`.
- 版面: `.quill-editor`外層套`height`,quill之`.ql-container`為`height:100%`,工具列(42px)在其上方,故容器底端會超出外層42px;此為既有版面,新舊相同,勿以為升級造成.

## 元件生命週期(監聽解除)之要點

- 解除須「同一事件名 + 同一函式參考」:`window.addEventListener('mousemove', f)` 與 `removeEventListener('mousedown', f)` 不會報錯、也解除不了(曾如此殘留);事件匯流排 `ev.on(name, 內聯箭頭)` 同理無從解除.監聽函式一律存於實例屬性(非 `data`)再登錄.
- `wsemi` 之 `evem()` 即原生 eventemitter3,其 `off(event)` **未給函式時清空該事件全部監聽**(含其他存活實例者).`beforeDestroy` 於未掛載(`mounted` 未執行,函式參考為 `undefined`)或重複呼叫時若直接 `ev.off(name, vo.fn)` 會誤清他人,故須 `if (vo.fn)` 守住並於解除後設 `null`;測試案「未掛載即銷毀/重複銷毀不得移除其他存活實例之監聽」對未加守護之寫法為紅.
- 驗證解除是否生效,不能只看已銷毀實例之 `getEditor()` 是否為空(銷毀後 `vo.quill` 已為 `null`,有無解除都一樣);改為包裝已銷毀實例之 `getEditor` 計數,再由存活實例發出全域 disable/enable,看計數是否為 0.
- node 下單元測試 Vue 2 單檔元件之生命週期(無 jsdom、無 Vue 依賴):`test/tools/loadWQuillVue.mjs` 抽出 `<script>`,只替換外部接縫(`import _Quill from 'quill'` 改為 `null`,因 quill 2 於 node 載入即碰 `document`;`window.Quill` 與 `window` 之 `addEventListener/removeEventListener` 以替身提供),寫入 `test/_tmp/<案名>/` 後以不同 query 動態 import,使每個測試皆有全新之模組實例(含模組層級之 `ev`);假 vm 依元件選項組出 props 預設、methods、computed、data.50ms 還原改以 `node:test` 之 `mock.timers` 推進.替換規則失配時工具會拋錯(不靜默通過).
- 真實 DOM 偵測監聽殘留: `page.addInitScript` 包裝 `EventTarget.prototype.addEventListener/removeEventListener`,只記 `this === window` 且事件為 `mousemove` 者;**須以呼叫堆疊含元件檔名過濾**——Playwright 自己會在 `window` 注入 `mousemove` 監聽(`addHitTargetInterceptorListeners`,點擊時之命中檢查),不濾會多算 1 個而誤判為殘留.

## 工具與環境

- `quiet-run`於Windows以cmd執行,指令不能寫`node_modules/.bin/mocha`(`'node_modules'不是內部或外部命令`),改`node node_modules/mocha/bin/mocha.js ...`或`npm test`.
- `node_modules/quill/dist/quill.snow.css`等壓縮檔為單行巨檔,不要對它用grep印出符合列.
- `npm install quill@^2.0.3 --save`會把`package-lock.json`頂層`version`同步為`package.json`之版本(原鎖檔停在2.0.35,本輪因此出現2.0.35→2.0.36之差異,版號本身未動).
- `npm audit --omit=dev`對quill 2.0.3回報1個low(GHSA-v3m3-f69x-jf25),並建議`quill@2.0.2`(降版,超出`^2.0.3`範圍);是否降版屬維護者裁示,不自行處理.
- 檔案換行: 追蹤中之原始檔於工作目錄為CRLF(`.editorconfig`: `end_of_line = crlf`,索引為LF),`sgud/`之檔為LF.整檔重寫後以暫存腳本轉回CRLF,避免整檔差異.
