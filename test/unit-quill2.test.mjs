import fs from 'fs'
import vm from 'vm'
import assert from 'assert'
import { fileURLToPath } from 'url'


//規格出處: 建議w-quill-vue修正.md(quill升至2.0.3, 移除vue-quill-editor, 於WQuillVue.vue直接建立Quill實例)
//本檔為node下可跑之單元測試(不載入瀏覽器), 讀取套件原始碼與已安裝之quill, 驗證規則帳本R01~R08(sgud/rule/rulebook.md)
//瀏覽器實跑(初始化,工具列,v-model,editable,失焦)不在本檔, 見sgud/state/state.md之驗證紀錄


function rp(rel) {
    return fileURLToPath(new URL(rel, import.meta.url))
}

function rd(rel) {
    return fs.readFileSync(rp(rel), 'utf8').replace(/\r\n/g, '\n') //統一換行, 避免CRLF檔使正則落空
}

//取出元件<script>區塊
function getScript() {
    let src = rd('../src/WQuillVue.vue')
    let m = src.match(/<script>([\s\S]*)<\/script>/)
    assert.ok(m, '找不到<script>區塊')
    return m[1]
}

//取出元件預設設定物件(src內以字面值給定, 只含字面值與註解)
function getDefSettings() {
    let m = getScript().match(/let def_settings = (\{[\s\S]*?\n\})\n/)
    assert.ok(m, '找不到def_settings')
    return JSON.parse(JSON.stringify(vm.runInNewContext('(' + m[1] + ')'))) //經JSON轉回主realm, 避免跨realm之Array使deepStrictEqual失配
}

//已安裝quill所註冊之格式名稱(讀quill自身之註冊表, 非手抄清單)
function getQuillFormats() {
    let src = rd('../node_modules/quill/quill.js')
    let fmts = new Set()
    for (let m of src.matchAll(/'formats\/([a-z-]+)'/g)) {
        fmts.add(m[1])
    }
    return fmts
}


describe('unit-quill2', function() {

    let pkg = JSON.parse(rd('../package.json'))

    describe('依賴', function() {

        it('R01 quill宣告為^2.0.3(主控已定1)', function() {
            assert.strictEqual(pkg.dependencies.quill, '^2.0.3')
        })

        it('R01 已安裝之quill為2.x(含dist/quill.snow.css, 供使用端引用)', function() {
            let ip = JSON.parse(rd('../node_modules/quill/package.json'))
            assert.ok(/^2\./.test(ip.version), `已安裝quill為${ip.version}`)
            assert.ok(fs.existsSync(rp('../node_modules/quill/dist/quill.snow.css')))
            assert.ok(fs.existsSync(rp('../node_modules/quill/dist/quill.js')))
        })

        it('R02 package.json不再依賴vue-quill-editor(主控已定2)', function() {
            let all = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies, ...pkg.optionalDependencies }
            assert.ok(!('vue-quill-editor' in all))
        })

        it('R02 不改用其他第三方封裝套件(依賴僅quill,wsemi)', function() {
            assert.deepStrictEqual(Object.keys(pkg.dependencies).sort(), ['quill', 'wsemi'])
        })

        it('R02 package-lock.json不再含vue-quill-editor', function() {
            let lock = rd('../package-lock.json')
            assert.ok(!/vue-quill-editor/.test(lock))
        })

    })

    describe('元件原始碼', function() {

        it('R02 元件不再import或使用vue-quill-editor', function() {
            let s = getScript()
            assert.ok(!/vue-quill-editor/.test(s))
            assert.ok(!/VueQuillEditor/.test(s))
            assert.ok(!/<quill-editor/.test(rd('../src/WQuillVue.vue')))
        })

        it('R03 元件直接import quill並建立Quill實例', function() {
            let s = getScript()
            assert.ok(/import\s+\w+\s+from\s+'quill'/.test(s))
            assert.ok(/new\s+Quill\(/.test(s))
        })

        it('R03 元件不呼叫quill 2已移除之pasteHTML', function() {
            let s = getScript()
            assert.ok(!/\.pasteHTML\(/.test(s))
            assert.ok(/clipboard\.dangerouslyPasteHTML\(/.test(s))
        })

        it('R03 beforeDestroy時銷毀Quill實例(解除自註冊之事件並釋放參考)', function() {
            let s = getScript()
            let m = s.match(/beforeDestroy:\s*function\(\)\s*\{([\s\S]*?)\n {4}\},/)
            assert.ok(m, '找不到beforeDestroy')
            assert.ok(/destroyQuill\(\)/.test(m[1]))
            let d = s.match(/destroyQuill:\s*function\(\)\s*\{([\s\S]*?)\n {8}\},/)
            assert.ok(d, '找不到destroyQuill')
            assert.ok(/\.off\('text-change'/.test(d[1]))
            assert.ok(/\.off\('selection-change'/.test(d[1]))
            assert.ok(/vo\.quill = null/.test(d[1]))
        })

        it('R05 v-model值取自root.innerHTML, 不用getSemanticHTML(GHSA-v3m3-f69x-jf25之HTML export)', function() {
            let s = getScript()
            assert.ok(/root\.innerHTML/.test(s))
            assert.ok(!/getSemanticHTML/.test(s))
        })

        it('R06 valueTrans初值取自value(否則掛載後watch多貼入一次, 使未編輯者失焦即emit正規化後之HTML)', function() {
            let s = getScript()
            let m = s.match(/data:\s*function\(\)\s*\{\s*return\s*\{([\s\S]*?)\n {8}\}\n {4}\},/)
            assert.ok(m, '找不到data')
            assert.ok(/valueTrans:\s*this\.value\b/.test(m[1]))
        })

        it('R06 對外props(value,settings,height,editable)與input事件語意不變', function() {
            let s = getScript()
            let m = s.match(/props:\s*\{([\s\S]*?)\n {4}\},\n {4}data:/)
            assert.ok(m, '找不到props')
            let keys = [...m[1].matchAll(/^ {8}(\w+):\s*\{/gm)].map(v => v[1])
            assert.deepStrictEqual(keys, ['value', 'settings', 'height', 'editable'])
            assert.ok(/\$emit\('input',\s*vo\.valueTrans\)/.test(s))
        })

    })

    describe('預設工具列', function() {

        it('R04 預設工具列之格式皆為已安裝quill所註冊者', function() {
            let fmts = getQuillFormats()
            assert.ok(fmts.size >= 20, `解析到之格式數過少: ${fmts.size}`)
            assert.ok(fmts.has('bold') && fmts.has('code-block') && fmts.has('script'))
            let def = getDefSettings()
            let tb = def.modules.toolbar
            assert.ok(Array.isArray(tb) && tb.length > 0)
            let names = []
            for (let group of tb) {
                for (let item of group) {
                    if (typeof item === 'string') {
                        names.push(item)
                    }
                    else {
                        names.push(...Object.keys(item))
                    }
                }
            }
            assert.ok(names.length > 0)
            for (let name of names) {
                assert.ok(fmts.has(name), `工具列格式${name}不在已安裝quill之註冊表`)
            }
        })

        it('R04 預設工具列之內容不變(bold,italic,underline,strike,color,background,indent,script,align)', function() {
            let def = getDefSettings()
            let names = def.modules.toolbar.flat().map(v => (typeof v === 'string' ? v : Object.keys(v)[0]))
            assert.deepStrictEqual(names, ['bold', 'italic', 'underline', 'strike', 'color', 'background', 'indent', 'indent', 'script', 'script', 'align'])
        })

    })

    describe('README與範例', function() {

        it('R07 README與範例頁之quill樣式與腳本改為2.0.3, 無1.x路徑', function() {
            for (let rel of ['../README.md', '../examples/ex-default.html']) {
                let s = rd(rel)
                assert.ok(/quill@2\.0\.3\/dist\/quill\.snow\.css/.test(s), `${rel}缺quill@2.0.3之snow樣式`)
                assert.ok(/quill@2\.0\.3\/dist\/quill\.js/.test(s), `${rel}缺quill@2.0.3之腳本`)
                assert.ok(!/quill@1\./.test(s), `${rel}仍有quill@1.x`)
            }
        })

        it('R07 README載明使用端可見之變化', function() {
            let s = rd('../README.md')
            assert.ok(/Breaking changes|使用端可見/.test(s))
            assert.ok(!/wrapper for vue-quill-editor/.test(s))
        })

    })

})
