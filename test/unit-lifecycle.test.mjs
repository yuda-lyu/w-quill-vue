import assert from 'assert'
import { mock } from 'node:test'
import { loadComponent, makeWindow, makeVm } from './tools/loadWQuillVue.mjs'


//規格出處: 維護者之修正要求: 銷毀元件時, window之mousemove監聽須解除(原以'mousedown'解除而殘留),
//mounted時登錄於全域事件匯流排ev之disable/enable監聽須於銷毀時解除(不再以閉包持有已銷毀元件); 焦點行為不動.
//本檔以替身(StubQuill,window)驅動元件之mounted/beforeDestroy, 元件程式碼與wsemi之evem為真實程式碼(test/tools/loadWQuillVue.mjs).
//對應規則帳本R08(sgud/rule/rulebook.md).


describe('unit-lifecycle', function() {

    let win = null
    let loaded = null
    let comp = null

    beforeEach(async function() {
        win = makeWindow()
        globalThis.window = win
        loaded = await loadComponent('lifecycle')
        comp = loaded.comp
        mock.timers.enable({ apis: ['setTimeout'] }) //onLostFocus之50ms還原改以假時鐘推進, 不以真實延時等待
    })

    afterEach(function() {
        mock.timers.reset()
        delete globalThis.window
        loaded.cleanup()
    })

    //建立並掛載一個實例, 並於其getEditor外包一層計數(計數不改變其回傳), 供驗證「已銷毀之實例是否仍被匯流排呼叫」
    function mountOne(props) {
        let vm = makeVm(comp, props)
        vm.mount()
        vm.nGetEditor = 0
        let orig = vm.getEditor
        vm.getEditor = function() {
            vm.nGetEditor++
            return orig()
        }
        return vm
    }

    //經由存活實例之失焦流程發出全域disable, 再推進假時鐘50ms發出全域enable
    function emitDisableEnable(vmLive) {
        vmLive.bInElement = false
        vmLive.value = 'a'
        vmLive.valueTrans = 'b' //值不同, 才會進入emit流程
        vmLive.onLostFocus()
        let afterDisable = vmLive.quill.enableCalls.slice()
        mock.timers.tick(50)
        return afterDisable
    }

    it('R08 掛載後於window登錄1個mousemove監聽, 且即vm.fMousemove', function() {
        let vm = mountOne()
        assert.strictEqual(win.count('mousemove'), 1)
        assert.strictEqual(win.listeners.find(v => v.type === 'mousemove').fn, vm.fMousemove)
    })

    it('R08 銷毀後window不殘留本元件註冊之mousemove監聽(原以mousedown解除而殘留)', function() {
        let vm = mountOne()
        vm.destroy()
        assert.strictEqual(win.count('mousemove'), 0)
        assert.strictEqual(win.listeners.length, 0)
    })

    it('R08 銷毀後ev之disable/enable不再呼叫已銷毀之實例(不再以閉包持有)', function() {
        let dead = mountOne()
        let live = mountOne()
        dead.destroy()
        let n0 = dead.nGetEditor
        emitDisableEnable(live)
        assert.strictEqual(dead.nGetEditor, n0, '已銷毀實例之getEditor仍被匯流排呼叫')
    })

    it('R08 銷毀一個實例不影響存活實例: disable後關閉, 50ms後依各自editable還原', function() {
        let dead = mountOne()
        let liveEditable = mountOne({ editable: true })
        let liveReadonly = mountOne({ editable: false })
        dead.destroy()
        emitDisableEnable(liveEditable)
        //掛載時: editable者enable(false)再enable(true), 唯讀者只有enable(false); 其後disable(全關)與50ms後enable(依各自editable還原)
        assert.deepStrictEqual(liveEditable.quill.enableCalls, [false, true, false, true])
        assert.deepStrictEqual(liveReadonly.quill.enableCalls, [false, false, false])
        assert.strictEqual(liveEditable.emitted.filter(v => v.name === 'input').length, 1)
    })

    it('R08 建立→銷毀→再建立3輪: 每輪window之mousemove數等於存活數, 已銷毀實例從未再被匯流排呼叫', function() {
        let keeper = mountOne() //全程存活, 作為發出事件之實例
        let deads = []
        for (let i = 0; i < 3; i++) {
            let vm = mountOne()
            assert.strictEqual(win.count('mousemove'), 2, `第${i + 1}輪建立後`)
            vm.destroy()
            deads.push({ vm, n: vm.nGetEditor })
            assert.strictEqual(win.count('mousemove'), 1, `第${i + 1}輪銷毀後`)
            emitDisableEnable(keeper)
        }
        for (let d of deads) {
            assert.strictEqual(d.vm.nGetEditor, d.n, '已銷毀實例之getEditor仍被匯流排呼叫')
        }
        keeper.destroy()
        assert.strictEqual(win.count('mousemove'), 0)
    })

    it('R08 銷毀後解除quill上之selection-change/text-change並釋放實例', function() {
        let vm = mountOne()
        let q = vm.quill
        assert.strictEqual(q.handlers['selection-change'].length, 1)
        assert.strictEqual(q.handlers['text-change'].length, 1)
        vm.destroy()
        assert.strictEqual(q.handlers['selection-change'].length, 0)
        assert.strictEqual(q.handlers['text-change'].length, 0)
        assert.strictEqual(vm.quill, null)
    })

    it('R08 未掛載即銷毀或重複銷毀, 不得移除其他存活實例之監聽(eventemitter3之off未給函數時會清空該事件全部監聽)', function() {
        let live = mountOne()
        let never = makeVm(comp) //未呼叫mount
        assert.doesNotThrow(() => never.destroy())
        let twice = mountOne()
        twice.destroy()
        assert.doesNotThrow(() => twice.destroy())
        emitDisableEnable(live)
        assert.deepStrictEqual(live.quill.enableCalls, [false, true, false, true])
    })

    it('R08 重複呼叫beforeDestroy不拋錯', function() {
        let vm = mountOne()
        vm.destroy()
        assert.doesNotThrow(() => vm.destroy())
        assert.strictEqual(win.count('mousemove'), 0)
    })

})
