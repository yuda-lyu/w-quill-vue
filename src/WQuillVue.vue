<template>
    <div class="quill-editor" style="display:inline-block;" :changeValue="changeValue">

        <quill-editor
            :style="{'height':settings.height+'px'}"
            :options="settings"
            :disabled="!editable"
            v-model="valueTrans"
            @input="triggerEvent"
        ></quill-editor>

    </div>
</template>

<script>
import genID from 'wsemi/src/genID.mjs'
import debounce from 'wsemi/src/debounce.mjs'
import VueQuillEditor from 'vue-quill-editor'


let def_settings = {
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'header': [1, 2, 3, false] }],
            [{ 'align': [] }],
            ['blockquote', 'code-block'],
            ['link', 'image', 'video'],
            ['clean'],
        ],
    },
    height: 250,
}


/**
 * @vue-prop {String} value 輸入富文本字串
 * @vue-prop {String} settings 輸入quill設定物件，預設值詳見原始碼
 * @vue-prop {String} [editable=true] 輸入是否允許編輯，預設true
 */
export default {
    components: {
        'quill-editor': VueQuillEditor.quillEditor
    },
    props: {
        value: {
            type: String,
        },
        settings: {
            type: Object,
            default: function() {
                return def_settings
            }
        },
        editable: {
            type: Boolean,
            default: true,
        },
    },
    data: function() {
        return {
            mmkey: null,
            valueTrans: '',
        }
    },
    mounted: function() {
        //console.log('mounted')

        let vo = this

        //mmkey
        vo.mmkey = genID()

    },
    computed: {

        changeValue: function() {
            //console.log('computed changeValue')

            let vo = this

            //save
            vo.valueTrans = vo.value

            return ''
        },

    },
    methods: {

        triggerEvent: function() {
            //console.log('methods triggerEvent')

            let vo = this

            //debounce
            debounce(`${vo.mmkey}|trigger`, () => {

                //refresh
                vo.$emit('input', vo.valueTrans)

            })

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
