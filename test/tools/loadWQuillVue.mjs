import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'


//輔助工具(非測試檔): 於node下載入src/WQuillVue.vue之<script>並建立假vm, 以替身取代quill與window,
//讓元件之生命週期(mounted/beforeDestroy)可在不載入瀏覽器下被驅動與觀察.
//只替換外部接縫(quill之import與window), 元件本身之程式碼(含wsemi之evem)為真實程式碼.
//臨時檔寫於test/_tmp/<案名>/, 由cleanup刪除(測試目錄規範).


let fdTmpRoot = fileURLToPath(new URL('../_tmp/', import.meta.url))
let fpVue = fileURLToPath(new URL('../../src/WQuillVue.vue', import.meta.url))
let nLoad = 0


//Quill替身: 記錄呼叫與事件登錄, 不含任何DOM行為
export class StubQuill {
    constructor(el, opts) {
        this.el = el
        this.opts = opts
        this.handlers = {}
        this.enableCalls = []
        this.pasted = []
        this.root = { innerHTML: '<p><br></p>' }
        this.clipboard = {
            dangerouslyPasteHTML: (html) => {
                this.pasted.push(html)
            },
        }
    }

    enable(b) {
        let v = b === undefined ? true : b
        this.enableCalls.push(v)
        this.enabled = v
    }

    on(name, fn) {
        if (!this.handlers[name]) {
            this.handlers[name] = []
        }
        this.handlers[name].push(fn)
    }

    off(name, fn) {
        let arr = this.handlers[name] || []
        this.handlers[name] = arr.filter(v => v !== fn)
    }

    setText() {}
}


//window替身: 記錄addEventListener/removeEventListener, 並提供window.Quill
export function makeWindow() {
    let win = {
        listeners: [],
        Quill: StubQuill,
        addEventListener: (type, fn) => {
            win.listeners.push({ type, fn })
        },
        removeEventListener: (type, fn) => {
            let i = win.listeners.findIndex(v => v.type === type && v.fn === fn)
            if (i >= 0) {
                win.listeners.splice(i, 1)
            }
        },
        count: (type) => win.listeners.filter(v => v.type === type).length,
    }
    return win
}


//載入元件(每次呼叫皆為全新之模組實例, 故模組層級之事件匯流排ev亦為全新)
export async function loadComponent(name) {

    //讀<script>
    let src = fs.readFileSync(fpVue, 'utf8').replace(/\r\n/g, '\n')
    let m = src.match(/<script>([\s\S]*)<\/script>/)
    if (!m) {
        throw new Error('找不到<script>區塊')
    }

    //quill 2於node無document, 其import即失敗, 故以null取代(元件優先使用window.Quill, 由window替身提供)
    let code = m[1].replace(/^import _Quill from 'quill'$/m, 'const _Quill = null')
    if (code === m[1]) {
        throw new Error('找不到import _Quill from \'quill\', 輔助工具須隨元件之import寫法更新')
    }

    //寫入test/_tmp/<案名>/(位於套件根目錄之下, 故wsemi等裸引用可由node_modules解析)
    let fd = path.join(fdTmpRoot, name)
    fs.mkdirSync(fd, { recursive: true })
    let fp = path.join(fd, 'WQuillVue.mjs')
    fs.writeFileSync(fp, code, 'utf8')

    //import(以query使每次皆為全新模組實例)
    nLoad++
    let mod = await import(pathToFileURL(fp).href + '?n=' + nLoad)

    return {
        comp: mod.default,
        cleanup: () => {
            fs.rmSync(fd, { recursive: true, force: true })
        },
    }
}


//建立假vm: 依元件選項組出props預設值, methods, computed(useSettings)與data, 並以替身提供$refs,$el,$emit
export function makeVm(comp, props) {
    let vm = {}
    for (let [k, def] of Object.entries(comp.props)) {
        let d = def.default
        vm[k] = typeof d === 'function' ? d() : d
    }
    Object.assign(vm, props || {})
    for (let [k, f] of Object.entries(comp.methods)) {
        vm[k] = f.bind(vm)
    }
    Object.defineProperty(vm, 'useSettings', {
        get: () => comp.computed.useSettings.call(vm),
    })
    Object.assign(vm, comp.data.call(vm))
    vm.$refs = { editor: {} }
    vm.$el = {}
    vm.emitted = []
    vm.$emit = (name, val) => {
        vm.emitted.push({ name, val })
    }
    vm.mount = () => comp.mounted.call(vm)
    vm.destroy = () => comp.beforeDestroy.call(vm)
    return vm
}
