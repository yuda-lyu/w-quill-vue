<template>
    <div style="display:inline-block;" :changeValue="changeValue">

        <quill-editor
            ref="edr"
            :style="`height:${height}px;`"
            :options="useSettings"
            :disabled="!editable"
            v-model="valueTrans"
            @blur="onLostFocus"
        ></quill-editor>

    </div>
</template>

<script>
import evem from 'wsemi/src/evem.mjs'
import domGetPointFromEvent from 'wsemi/src/domGetPointFromEvent.mjs'
import domIsClientXYIn from 'wsemi/src/domIsClientXYIn.mjs'
import VueQuillEditor from 'vue-quill-editor'


let ev = evem()


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
 * @vue-prop {String} [value=''] 輸入富文本字串，預設為''
 * @vue-prop {Object} [settings={}] 輸入quill設定物件，預設值詳見原始碼
 * @vue-prop {Number} [height=250] 輸入高度數字，單位為px，預設為250
 * @vue-prop {Boolean} [editable=true] 輸入是否允許編輯，預設true
 */
export default {
    components: {
        'quill-editor': VueQuillEditor.quillEditor,
    },
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
            valueTrans: '',
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

        //ev
        ev.on('disable', () => {
            if (vo.getEditor()) {
                vo.getEditor().enable(false)
            }
        })
        ev.on('enable', () => {
            if (vo.getEditor()) {
                vo.getEditor().enable(vo.editable) //要還原成原本的editable
            }
        })

    },
    beforeDestroy: function() {
        //console.log('beforeDestroy')

        let vo = this

        //removeEventListener
        window.removeEventListener('mousedown', vo.fMousemove)

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

        getEditor: function() {
            //console.log('methods getEditor')

            let vo = this

            if (vo.$refs.edr) {
                return vo.$refs.edr.quill
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
