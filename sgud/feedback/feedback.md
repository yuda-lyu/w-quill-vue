# 回饋

本檔記錄任務中發現之自有套件、全域技能、全域設定之調整與抽提提案(只增不改,處置結果另記一列),供主控核實、盤點與整合.欄位: 日期、類別、對象、內容、依據.

| 日期 | 類別 | 對象 | 內容 | 依據 |
|---|---|---|---|---|
| 2026-11-09 | 自有套件 | w-package-tools(`rollupFiles`之`globals`用法)與各UI元件套件之`toolg/gDistRollup.mjs` | UMD以`globals: { quill: 'quill' }`輸出,瀏覽器端讀`global.quill`(undefined);CDN之quill實際全域名為`Quill`.元件只能自備`window.Quill`備援.建議在w-package-tools說明`globals`須用實際全域名,或對常見套件(quill等)提供對照提示;各套件之`toolg/`不自行改(標準寫法). | `toolg/gDistRollup.mjs:13-16`;暫存建置之UMD表頭`n(e.quill)`;`src/WQuillVue.vue`之`getQuill()` |
| 2026-11-09 | 全域技能 | role-coder-for-test(§4目錄配置) | 規範寫明測試程式禁用`./tmp/`,但「一次性之瀏覽器實跑證據腳本」(非測試檔,不入倉庫,需借用他套件已裝之playwright,頁面改為本機檔)該放哪、如何借用無明文;本次放`./tmp/<任務>/`.建議補一小節: 一次性實跑腳本之位置(`./tmp/`)、借用playwright之動態import寫法、`file://`頁面與雜湊比對截圖之作法. | `sgud/exp/experience.md`〈quill升級之瀏覽器實跑〉 |
| 2026-11-09 | 全域技能(兼自有套件抽提候選) | role-coder-for-test(§3 `unit-` 層)、各 `w-*-vue` 元件套件 | 規範之 `unit-` 層寫「元件掛載(jsdom)」,但本類套件無 jsdom/Vue 依賴;本次以「抽出 SFC 之 `<script>`、只替換外部接縫(quill、window)、每測試全新模組實例、假 vm、`mock.timers`」於 node 下驅動 `mounted`/`beforeDestroy` 並驗證監聽解除,同形需求(全域監聽/計時器之銷毀清理)各元件套件皆可能有.建議:技能補此作法;或把 `test/tools/loadWQuillVue.mjs` 之通用部分抽提為自有套件(如併入既有測試工具套件)供各元件套件共用. | `test/tools/loadWQuillVue.mjs`;`test/unit-lifecycle.test.mjs`;`sgud/exp/experience.md`〈元件生命週期(監聽解除)之要點〉 |
| 2026-11-09 | 自有套件 | wsemi(`evem` 之 JSDoc) | `evem()` 之 JSDoc 詳列 eventemitter3 行為之注意事項,但未提「`off(event)` 未給函式時清空該事件全部監聽」;元件於 `beforeDestroy` 於未掛載或重複呼叫時以 `undefined` 呼叫 `ev.off` 即誤清其他實例之監聽(測試案對未守護之寫法為紅).建議於 `evem` 之說明補一句. | `node_modules/wsemi/src/evem.mjs:4-25`;`sgud/rule/rulebook.md` R08;`test/unit-lifecycle.test.mjs`「未掛載即銷毀或重複銷毀…」案 |
