# w-quill-vue
A wrapper for [quill](https://github.com/slab/quill) 2.x in Vue 2.

![language](https://img.shields.io/badge/language-JavaScript-orange.svg) 
[![language](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://github.com/vuejs/vue) 
[![npm version](http://img.shields.io/npm/v/w-quill-vue.svg?style=flat)](https://npmjs.org/package/w-quill-vue) 
[![npm download](https://img.shields.io/npm/dt/w-quill-vue.svg)](https://npmjs.org/package/w-quill-vue) 
[![npm download](https://img.shields.io/npm/dm/w-quill-vue.svg)](https://npmjs.org/package/w-quill-vue) 
[![jsdelivr download](https://img.shields.io/jsdelivr/npm/hm/w-quill-vue.svg)](https://www.jsdelivr.com/package/npm/w-quill-vue)

## Documentation
To view documentation or get support, visit [docs](https://yuda-lyu.github.io/w-quill-vue/module-WQuillVue.html).

## Example
To view some examples for more understanding, visit examples:
> **default:** [ex-default.html](https://yuda-lyu.github.io/w-quill-vue/examples/ex-default.html) [[source code](https://github.com/yuda-lyu/w-quill-vue/blob/master/docs/examples/ex-default.html)]

## Breaking changes (since quill 2)
This package now creates the editor with quill 2.0.3 directly; `vue-quill-editor` (quill 1 only) is no longer used or installed. The props (`value`, `settings`, `height`, `editable`), the `input` event and the `v-model` behavior (the value is the HTML of the editor and is emitted when the editor loses focus) are unchanged. What you may notice:

- **Assets:** load the quill 2 files: `quill/dist/quill.snow.css` (bundler) or the `quill@2.0.3` CDN files shown below. The quill 1 CDN files (`quill.min.js`, `quill.snow.min.css`) must no longer be used.
- **HTML of lists and code blocks:** quill 2 writes lists as `<ol><li data-list="bullet|ordered"><span class="ql-ui" contenteditable="false"></span>...</li></ol>` (quill 1: `<ul>`/`<ol>`) and code blocks as `<div class="ql-code-block-container"><div class="ql-code-block">` (quill 1: `<pre class="ql-syntax">`). Such HTML renders correctly inside the editor (with the quill css); if you show the value elsewhere, check it. Paragraphs, bold/italic/underline/strike, color/background, indent, sub/superscript, alignment and links (the default toolbar and its formats) produce the same HTML as before. A heading pasted between paragraphs no longer gets an extra empty paragraph in front of it.
- **`getEditor()`** returns a quill 2 instance. Quill 1 APIs are gone or changed (for example `pasteHTML` was removed, use `clipboard.dangerouslyPasteHTML`; `clipboard.convert` now takes `{ html, text }`), see [Upgrading to 2.0](https://quilljs.com/docs/upgrading-to-2-0). The options `strict` and `scrollingContainer`, and the clipboard option `matchVisual`, no longer exist in quill 2.
- **Bundlers:** quill 2 is published as ES modules written with modern syntax; older toolchains (for example webpack 4) may need to transpile `quill` (not verified here). Internet Explorer is not supported by quill 2.
- **Security:** pasted or bound HTML such as `<img src="x" onerror="...">` was executed by quill 1.3.7 and is not executed by quill 2.0.3. This package reads the value from `quill.root.innerHTML` and does not use `getSemanticHTML()` (GHSA-v3m3-f69x-jf25, HTML export, no patched release yet). The value is HTML: sanitize it before showing it to other users with `v-html`.

## Installation

### Using npm(ES6 module):
```alias
npm i w-quill-vue
```
By import:
```alias
<w-quill-vue 
    v-model="..."
></w-quill-vue>

import 'quill/dist/quill.snow.css'
import WQuillVue from 'w-quill-vue'

Vue.component('w-quill-vue', WQuillVue)
```

### In a browser(UMD module):

Add script for quill.
```alias
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" />
<script src="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js"></script>
```

Add script for vue.
```alias
<script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.min.js"></script>
```

Add script for w-quill-vue.
```alias
<script src="https://yuda-lyu.github.io/w-quill-vue/dist/w-quill-vue.umd.js"></script>
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