<template>
    <div style="display:inline-block;" :changeValue="changeValue">

        <div
            class="quill-editor"
            :style="`height:${height}px;`"
        >
            <div ref="editor"></div>
        </div>

    </div>
</template>

<script>
import evem from 'wsemi/src/evem.mjs'
import domGetPointFromEvent from 'wsemi/src/domGetPointFromEvent.mjs'
import domIsClientXYIn from 'wsemi/src/domIsClientXYIn.mjs'
import _Quill from 'quill'


let ev = evem()


//quill 2 之 UMD(例如CDN之dist/quill.js)會掛於window.Quill, 優先使用; 打包時改用import進來之quill
function getQuill() {
    if (typeof window !== 'undefined' && window.Quill) {
        return window.Quill
    }
    return _Quill
}


//元件預設quill選項, 僅於未由settings覆蓋時使用
let def_options = {
    theme: 'snow',
    placeholder: 'Insert text here ...',
    readOnly: false,
}


let def_settings = {
    modules: {
        toolbar: [
            //{ size: ['small', false, 'large', 'huge'] }, //同步文本會出現額外換行問題
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            // [{ 'list': 'ordered' }, { 'list': 'bullet' }], //同步文本會出現額外換行問題
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            // [{ 'header': [1, 2, 3, false] }], //同步文本會出現額外換行問題
            [{ 'align': [] }],
            // ['blockquote', 'code-block'], //同步文本會出現額外換行問題
            // ['link', 'image', 'video'], //同步文本會出現額外換行問題
            // ['clean'], //暫不使用
        ],
    },
}


/**
 * @vue-prop {String} [value=''] 輸入富文本字串(HTML)，預設為''
 * @vue-prop {Object} [settings={}] 輸入quill設定物件，預設值詳見原始碼
 * @vue-prop {Number} [height=250] 輸入高度數字，單位為px，預設為250
 * @vue-prop {Boolean} [editable=true] 輸入是否允許編輯，預設true
 */
export default {
    props: {
        value: {
            type: String,
            default: '',
        },
        settings: {
            type: Object,
            default: () => {},
        },
        height: {
            type: Number,
            default: 250,
        },
        editable: {
            type: Boolean,
            default: true,
        },
    },
    data: function() {
        return {
            fMousemove: null,
            bInElement: false,
            valueTrans: this.value, //初值直接取value, 避免首次render才由changeValue設值而使valueTrans之watch於掛載後多貼入一次
        }
    },
    mounted: function() {
        //console.log('mounted')

        let vo = this

        //fMousemove
        vo.fMousemove = (e) => {
            //console.log('fMousemove', e)

            //domGetPointFromEvent
            let p = domGetPointFromEvent(e)

            //domIsClientXYIn
            let b = domIsClientXYIn(p.clientX, p.clientY, vo.$el)

            //save bInElement
            vo.bInElement = b

        }

        //addEventListener
        window.addEventListener('mousemove', vo.fMousemove)

        //ev, 監聽函數存於實例屬性, 供beforeDestroy解除
        vo.fEvDisable = () => {
            if (vo.getEditor()) {
                vo.getEditor().enable(false)
            }
        }
        vo.fEvEnable = () => {
            if (vo.getEditor()) {
                vo.getEditor().enable(vo.editable) //要還原成原本的editable
            }
        }
        ev.on('disable', vo.fEvDisable)
        ev.on('enable', vo.fEvEnable)

        //initQuill
        vo.initQuill()

    },
    beforeDestroy: function() {
        //console.log('beforeDestroy')

        let vo = this

        //removeEventListener, 與mounted註冊之事件名須一致
        window.removeEventListener('mousemove', vo.fMousemove)

        //ev, 只解除本實例註冊之監聽函數; 須有函數才解除(未給函數時eventemitter3之off會清空該事件全部監聽, 含其他實例者), 故未掛載或重複銷毀時略過
        if (vo.fEvDisable) {
            ev.off('disable', vo.fEvDisable)
            vo.fEvDisable = null
        }
        if (vo.fEvEnable) {
            ev.off('enable', vo.fEvEnable)
            vo.fEvEnable = null
        }

        //destroyQuill
        vo.destroyQuill()

    },
    watch: {

        valueTrans: function(newVal) {
            //console.log('watch valueTrans', newVal)

            let vo = this

            //check
            if (!vo.quill) {
                return
            }

            if (newVal && newVal !== vo.htmlLast) {

                //save, 避免編輯器自身變更後回灌造成重複貼入
                vo.htmlLast = newVal

                //pasteHtml
                vo.pasteHtml(newVal)

            }
            else if (!newVal) {

                //setText
                vo.quill.setText('')

            }

        },

        editable: function(newVal) {
            //console.log('watch editable', newVal)

            let vo = this

            if (vo.quill) {
                vo.quill.enable(newVal)
            }

        },

    },
    computed: {

        useSettings: function() {
            //console.log('computed useSettings')

            let vo = this

            return {
                ...def_settings,
                ...vo.settings,
            }
        },

        changeValue: function() {
            //console.log('computed changeValue')

            let vo = this

            //save
            vo.valueTrans = vo.value

            //quill有問題, 解析例如有h1文本時(<p>abc中文123</p><p>a</p><p>b</p><h1>c</h1><p>d</p>)，會多解析出換行符號, 可只開放純文本編輯, 待後續quill修復
            // setTimeout(() => {
            //     if (vo.getEditor()) {
            //         console.log('vo.value', vo.value)
            //         console.log('vo.getEditor().getContents()', o2j(vo.getEditor().getContents()))
            //         console.log('')
            //     }
            // }, 100)

            return ''
        },

    },
    methods: {

        initQuill: function() {
            //console.log('methods initQuill')

            let vo = this

            //Quill, 非響應式(不放data), 避免Vue對Quill實例做深層代理
            let Quill = getQuill()

            //quill
            vo.quill = new Quill(vo.$refs.editor, {
                ...def_options,
                ...vo.useSettings,
            })

            //先關閉編輯再貼入內容, 之後才依editable開啟
            vo.quill.enable(false)

            //set content, 貼入時尚未掛載事件, 故不觸發text-change
            vo.htmlLast = ''
            if (vo.valueTrans) {
                vo.pasteHtml(vo.valueTrans)
            }

            //editable
            if (vo.editable) {
                vo.quill.enable(true)
            }

            //selection-change, 無range代表失焦
            vo.fSelectionChange = (range) => {
                if (!range) {
                    vo.onLostFocus()
                }
            }
            vo.quill.on('selection-change', vo.fSelectionChange)

            //text-change, 以編輯器內容之innerHTML更新valueTrans, 空內容(<p><br></p>)視為''
            vo.fTextChange = () => {
                let html = vo.quill.root.innerHTML
                if (html === '<p><br></p>') {
                    html = ''
                }
                vo.htmlLast = html
                vo.valueTrans = html
            }
            vo.quill.on('text-change', vo.fTextChange)

        },

        destroyQuill: function() {
            //console.log('methods destroyQuill')

            let vo = this

            //check
            if (!vo.quill) {
                return
            }

            //quill 2無destroy, 故解除本元件掛載之事件並釋放實例參考
            vo.quill.off('selection-change', vo.fSelectionChange)
            vo.quill.off('text-change', vo.fTextChange)
            vo.fSelectionChange = null
            vo.fTextChange = null
            vo.quill = null

        },

        pasteHtml: function(html) {
            //console.log('methods pasteHtml')

            let vo = this

            //quill 2已移除pasteHTML, 改用clipboard.dangerouslyPasteHTML, 內容經DOMParser解析並轉為delta, 不直接寫入DOM
            vo.quill.clipboard.dangerouslyPasteHTML(html)

        },

        getEditor: function() {
            //console.log('methods getEditor')

            let vo = this

            if (vo.quill) {
                return vo.quill
            }
            return null
        },

        onLostFocus: function() {
            //console.log('methods onLostFocus')

            let vo = this

            //check, 還在組件內不算不觸發事件
            if (vo.bInElement) {
                return
            }

            //check, 同值就不觸發事件
            if (vo.valueTrans === vo.value) {
                return
            }

            //disable
            ev.emit('disable')

            //$emit
            vo.$emit('input', vo.valueTrans)

            //setTimeout
            setTimeout(() => {

                //enable
                ev.emit('enable')

            }, 50)

        },

    },
}
</script>

<style scoped>
::v-deep .ql-container {
    font-size: inherit;
    font-family: inherit;
}
</style>
