# w-quill-vue
A wrapper for vue-quill-editor.

![language](https://img.shields.io/badge/language-JavaScript-orange.svg) 
[![language](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://github.com/vuejs/vue) 
[![npm version](http://img.shields.io/npm/v/w-quill-vue.svg?style=flat)](https://npmjs.org/package/w-quill-vue) 
[![Build Status](https://travis-ci.org/yuda-lyu/w-quill-vue.svg?branch=master)](https://travis-ci.org/yuda-lyu/w-quill-vue) [![license](https://img.shields.io/npm/l/w-quill-vue.svg?style=flat)](https://npmjs.org/package/w-quill-vue) 
[![gzip file size](http://img.badgesize.io/yuda-lyu/w-quill-vue/master/dist/w-quill-vue.umd.js.svg?compression=gzip)](https://github.com/yuda-lyu/w-quill-vue)
[![npm download](https://img.shields.io/npm/dt/w-quill-vue.svg)](https://npmjs.org/package/w-quill-vue) 
[![jsdelivr download](https://img.shields.io/jsdelivr/npm/hm/w-quill-vue.svg)](https://www.jsdelivr.com/package/npm/w-quill-vue)

## Documentation
To view documentation or get support, visit [docs](https://yuda-lyu.github.io/w-quill-vue/module-WQuillVue.html).

## Example
To view some examples for more understanding, visit examples:
> **default:** [ex-default.html](https://yuda-lyu.github.io/w-quill-vue/examples/ex-default.html) [[source code](https://github.com/yuda-lyu/w-quill-vue/blob/master/docs/examples/ex-default.html)]

## Installation
### Using npm(ES6 module):
> **Note:** w-quill-vue depends on `quill`, `vue-quill-editor` and `vue`.
```alias
npm i w-quill-vue
```
By import:
```alias
<w-quill-vue 
    v-model="..."
></w-quill-vue>

import WQuillVue from 'w-quill-vue'

Vue.component('w-quill-vue', WQuillVue)
```

### In a browser(UMD module):
> **Note:** umd file includes with `vue-quill-editor`, by using tree-shaking for dead-code elimination

[Necessary] Add script for quill.
```alias
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/quill@1.3.6/dist/quill.snow.min.css" />
<script src="https://cdn.jsdelivr.net/npm/quill@1.3.6/dist/quill.min.js"></script>
```
[Necessary] Add script for vue.
```alias
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"></script>
```
[Necessary] Add script for w-quill-vue.
```alias
<script src="https://cdn.jsdelivr.net/npm/w-quill-vue@1.0.16/dist/w-quill-vue.umd.js"></script>
```
Directly use:
```alias
<w-quill-vue 
    v-model="..."
></w-quill-vue>

Vue.component('w-quill-vue', window['w-quill-vue'])

new Vue({
    el: '#app',
    data: {
        content: 'abc中文123'
    }
})
```