/*!
 * w-quill-vue v1.0.5
 * (c) 2018-2019 yuda-lyu(semisphere)
 * Released under the MIT License.
 */(function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b(require("quill")):"function"==typeof define&&define.amd?define(["quill"],b):(a=a||self,a["w-quill-vue"]=b(a.quill))})(this,function(a){'use strict';function b(a,b){var d=j?b.media||"default":a,e=k[d]||(k[d]={ids:new Set,styles:[]});if(!e.ids.has(a)){e.ids.add(a);var f=b.source;if(b.map&&(f+="\n/*# sourceURL="+b.map.sources[0]+" */",f+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(b.map))))+" */"),e.element||(e.element=document.createElement("style"),e.element.type="text/css",b.media&&e.element.setAttribute("media",b.media),void 0===c&&(c=document.head||document.getElementsByTagName("head")[0]),c.appendChild(e.element)),"styleSheet"in e.element)e.styles.push(f),e.element.styleSheet.cssText=e.styles.filter(Boolean).join("\n");else{var g=e.ids.size-1,h=document.createTextNode(f),i=e.element.childNodes;i[g]&&e.element.removeChild(i[g]),i.length?e.element.insertBefore(h,i[g]):e.element.appendChild(h)}}}a=a&&a.hasOwnProperty("default")?a["default"]:a;var c,d="undefined"==typeof globalThis?"undefined"==typeof window?"undefined"==typeof global?"undefined"==typeof self?{}:self:global:window:globalThis,e=function(a,b){return b={exports:{}},a(b,b.exports),b.exports}(function(b){!function(c,d){b.exports=d(a)}(d,function(a){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.i=function(a){return a},b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a.default}:function(){return a};return b.d(c,"a",c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p="/",b(b.s=2)}([function(b){b.exports=a},function(a,b,c){Object.defineProperty(b,"__esModule",{value:!0});var d=c(4),e=c.n(d),f=c(6),g=c(5),h=g(e.a,f.a,!1,null,null,null);b.default=h.exports},function(b,d,e){function f(a){return a&&a.__esModule?a:{default:a}}Object.defineProperty(d,"__esModule",{value:!0}),d.install=d.quillEditor=d.Quill=void 0;var g=e(0),h=f(g),i=e(1),j=f(i),k=window.Quill||h.default,l=function(a,b){b&&(j.default.props.globalOptions.default=function(){return b}),a.component(j.default.name,j.default)},a={Quill:k,quillEditor:j.default,install:l};d.default=a,d.Quill=k,d.quillEditor=j.default,d.install=l},function(a,b){Object.defineProperty(b,"__esModule",{value:!0}),b.default={theme:"snow",boundary:document.body,modules:{toolbar:[["bold","italic","underline","strike"],["blockquote","code-block"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["clean"],["link","image","video"]]},placeholder:"Insert text here ...",readOnly:!1}},function(a,b,c){function d(a){return a&&a.__esModule?a:{default:a}}Object.defineProperty(b,"__esModule",{value:!0});var e=c(0),f=d(e),g=c(3),h=d(g),i=window.Quill||f.default;"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(a){if(null==a)throw new TypeError("Cannot convert undefined or null to object");for(var b,c=Object(a),d=1;d<arguments.length;d++)if(b=arguments[d],null!=b)for(var e in b)Object.prototype.hasOwnProperty.call(b,e)&&(c[e]=b[e]);return c},writable:!0,configurable:!0}),b.default={name:"quill-editor",data:function(){return{_options:{},_content:"",defaultOptions:h.default}},props:{content:String,value:String,disabled:{type:Boolean,default:!1},options:{type:Object,required:!1,default:function(){return{}}},globalOptions:{type:Object,required:!1,default:function(){return{}}}},mounted:function(){this.initialize()},beforeDestroy:function(){this.quill=null,delete this.quill},methods:{initialize:function(){var a=this;this.$el&&(this._options=Object.assign({},this.defaultOptions,this.globalOptions,this.options),this.quill=new i(this.$refs.editor,this._options),this.quill.enable(!1),(this.value||this.content)&&this.quill.pasteHTML(this.value||this.content),this.disabled||this.quill.enable(!0),this.quill.on("selection-change",function(b){b?a.$emit("focus",a.quill):a.$emit("blur",a.quill)}),this.quill.on("text-change",function(){var b=a.$refs.editor.children[0].innerHTML,c=a.quill,d=a.quill.getText();"<p><br></p>"===b&&(b=""),a._content=b,a.$emit("input",a._content),a.$emit("change",{html:b,text:d,quill:c})}),this.$emit("ready",this.quill))}},watch:{content:function(a){this.quill&&(a&&a!==this._content?(this._content=a,this.quill.pasteHTML(a)):a||this.quill.setText(""))},value:function(a){this.quill&&(a&&a!==this._content?(this._content=a,this.quill.pasteHTML(a)):a||this.quill.setText(""))},disabled:function(a){this.quill&&this.quill.enable(!a)}}}},function(a){a.exports=function(b,g,e,h,i,j){var k,l=b=b||{},m=typeof b.default;"object"!=m&&"function"!=m||(k=b,l=b.default);var n="function"==typeof l?l.options:l;g&&(n.render=g.render,n.staticRenderFns=g.staticRenderFns,n._compiled=!0),e&&(n.functional=!0),i&&(n._scopeId=i);var a;if(j?(a=function(a){a=a||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,a||"undefined"==typeof __VUE_SSR_CONTEXT__||(a=__VUE_SSR_CONTEXT__),h&&h.call(this,a),a&&a._registeredComponents&&a._registeredComponents.add(j)},n._ssrRegister=a):h&&(a=h),a){var o=n.functional,d=o?n.render:n.beforeCreate;o?(n._injectStyles=a,n.render=function(b,c){return a.call(c),d(b,c)}):n.beforeCreate=d?[].concat(d,a):[a]}return{esModule:k,exports:l,options:n}}},function(a,b){b.a={render:function(){var a=this,b=a.$createElement,c=a._self._c||b;return c("div",{staticClass:"quill-editor"},[a._t("toolbar"),a._v(" "),c("div",{ref:"editor"})],2)},staticRenderFns:[]}}])})}),f=function(a){return a&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,"default")?a["default"]:a}(e),g=e.VueQuillEditor,h={modules:{toolbar:[["bold","italic","underline","strike"],[{color:[]},{background:[]}],[{list:"ordered"},{list:"bullet"}],[{indent:"-1"},{indent:"+1"}],[{script:"sub"},{script:"super"}],[{header:[1,2,3,!1]}],[{align:[]}],["blockquote","code-block"],["link","image","video"],["clean"]]},height:250},i={components:{"quill-editor":f.quillEditor},props:{value:{type:String},settings:{type:Object,default:function(){return h}},editable:{type:Boolean,default:!0}},data:function(){return{}},mounted:function(){},computed:{},methods:{}},j="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase()),k={};var l=function(){var a=this,b=a.$createElement,c=a._self._c||b;return c("div",{staticClass:"quill-editor",staticStyle:{display:"inline-block"}},[c("quill-editor",{style:{height:a.settings.height+"px"},attrs:{options:a.settings,value:a.value,disabled:!a.editable},on:{input:function(b){a.$emit("input",b)}}})],1)};l._withStripped=!0;var m=function(a,b,c,d,e,f,g,h,i,j){"boolean"!=typeof g&&(i=h,h=g,g=!1);var k="function"==typeof c?c.options:c;a&&a.render&&(k.render=a.render,k.staticRenderFns=a.staticRenderFns,k._compiled=!0,e&&(k.functional=!0)),d&&(k._scopeId=d);var l;if(f?(l=function(a){a=a||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,a||"undefined"==typeof __VUE_SSR_CONTEXT__||(a=__VUE_SSR_CONTEXT__),b&&b.call(this,i(a)),a&&a._registeredComponents&&a._registeredComponents.add(f)},k._ssrRegister=l):b&&(l=g?function(){b.call(this,j(this.$root.$options.shadowRoot))}:function(a){b.call(this,h(a))}),l)if(k.functional){var m=k.render;k.render=function(a,b){return l.call(b),m(a,b)}}else{var n=k.beforeCreate;k.beforeCreate=n?[].concat(n,l):[l]}return c}({render:l,staticRenderFns:[]},function(a){a&&a("data-v-3ca5faf2_0",{source:"\n[data-v-3ca5faf2] .ql-container {\r\n    font-size: inherit;\r\n    font-family: inherit;\n}\r\n",map:{version:3,sources:["D:\\\u958B\u6E90-JS-101-1-w-quill-vue\\w-quill-vue\\src\\WQuillVue.vue"],names:[],mappings:";AAyEA;IACA,kBAAA;IACA,oBAAA;AACA",file:"WQuillVue.vue",sourcesContent:["<template>\r\n    <div class=\"quill-editor\" style=\"display:inline-block;\">\r\n\r\n        <quill-editor\r\n            :style=\"{'height':settings.height+'px'}\"\r\n            :options=\"settings\"\r\n            :value=\"value\"\r\n            :disabled=\"!editable\"\r\n            @input=\"function(v){$emit('input',v)}\"\r\n        ></quill-editor>\r\n\r\n    </div>\r\n</template>\r\n\r\n<script>\r\nimport VueQuillEditor from 'vue-quill-editor'\r\n\r\nlet def_settings = {\r\n    modules: {\r\n        toolbar: [\r\n            ['bold', 'italic', 'underline', 'strike'],\r\n            [{ 'color': [] }, { 'background': [] }],\r\n            [{ 'list': 'ordered' }, { 'list': 'bullet' }],\r\n            [{ 'indent': '-1' }, { 'indent': '+1' }],\r\n            [{ 'script': 'sub' }, { 'script': 'super' }],\r\n            [{ 'header': [1, 2, 3, false] }],\r\n            [{ 'align': [] }],\r\n            ['blockquote', 'code-block'],\r\n            ['link', 'image', 'video'],\r\n            ['clean']\r\n        ],\r\n    },\r\n    height: 250,\r\n}\r\n\r\n/**\r\n * @vue-prop {String} value \u8F38\u5165\u5BCC\u6587\u672C\u5B57\u4E32\r\n * @vue-prop {String} settings \u8F38\u5165quill\u8A2D\u5B9A\u7269\u4EF6\uFF0C\u9810\u8A2D\u503C\u8A73\u898B\u539F\u59CB\u78BC\r\n * @vue-prop {String} [editable=true] \u8F38\u5165\u662F\u5426\u5141\u8A31\u7DE8\u8F2F\uFF0C\u9810\u8A2Dtrue\r\n */\r\nexport default {\r\n    components: {\r\n        'quill-editor': VueQuillEditor.quillEditor\r\n    },\r\n    props: {\r\n        value: {\r\n            type: String,\r\n        },\r\n        settings: {\r\n            type: Object,\r\n            default: function() {\r\n                return def_settings\r\n            }\r\n        },\r\n        editable: {\r\n            type: Boolean,\r\n            default: true,\r\n        },\r\n    },\r\n    data: function() {\r\n        return {\r\n        }\r\n    },\r\n    mounted: function() {\r\n    },\r\n    computed: {\r\n    },\r\n    methods: {\r\n    },\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n::v-deep .ql-container {\r\n    font-size: inherit;\r\n    font-family: inherit;\r\n}\r\n</style>\r\n"]},media:void 0})},i,"data-v-3ca5faf2",!1,void 0,function(){return function(a,c){return b(a,c)}},void 0);return m});
//# sourceMappingURL=w-quill-vue.umd.js.map
