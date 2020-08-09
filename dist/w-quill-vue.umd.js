/*!
 * w-quill-vue v1.0.24
 * (c) 2018-2020 yuda-lyu(semisphere)
 * Released under the MIT License.
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("quill")):"function"==typeof define&&define.amd?define(["quill"],t):(e="undefined"!=typeof globalThis?globalThis:e||self)["w-quill-vue"]=t(e.quill)}(this,(function(e){"use strict";e=e&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e;var t=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function r(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function o(e,t,n){return e(n={path:t,exports:{},require:function(e,t){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==t&&n.path)}},n.exports),n.exports}var i=o((function(e){var t=Object.prototype.hasOwnProperty,n="~";function r(){}function o(e,t,n){this.fn=e,this.context=t,this.once=n||!1}function i(e,t,r,i,u){if("function"!=typeof r)throw new TypeError("The listener must be a function");var l=new o(r,i||e,u),s=n?n+t:t;return e._events[s]?e._events[s].fn?e._events[s]=[e._events[s],l]:e._events[s].push(l):(e._events[s]=l,e._eventsCount++),e}function u(e,t){0==--e._eventsCount?e._events=new r:delete e._events[t]}function l(){this._events=new r,this._eventsCount=0}Object.create&&(r.prototype=Object.create(null),(new r).__proto__||(n=!1)),l.prototype.eventNames=function(){var e,r,o=[];if(0===this._eventsCount)return o;for(r in e=this._events)t.call(e,r)&&o.push(n?r.slice(1):r);return Object.getOwnPropertySymbols?o.concat(Object.getOwnPropertySymbols(e)):o},l.prototype.listeners=function(e){var t=n?n+e:e,r=this._events[t];if(!r)return[];if(r.fn)return[r.fn];for(var o=0,i=r.length,u=new Array(i);o<i;o++)u[o]=r[o].fn;return u},l.prototype.listenerCount=function(e){var t=n?n+e:e,r=this._events[t];return r?r.fn?1:r.length:0},l.prototype.emit=function(e,t,r,o,i,u){var l=n?n+e:e;if(!this._events[l])return!1;var s,a,c=this._events[l],f=arguments.length;if(c.fn){switch(c.once&&this.removeListener(e,c.fn,void 0,!0),f){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,t),!0;case 3:return c.fn.call(c.context,t,r),!0;case 4:return c.fn.call(c.context,t,r,o),!0;case 5:return c.fn.call(c.context,t,r,o,i),!0;case 6:return c.fn.call(c.context,t,r,o,i,u),!0}for(a=1,s=new Array(f-1);a<f;a++)s[a-1]=arguments[a];c.fn.apply(c.context,s)}else{var d,p=c.length;for(a=0;a<p;a++)switch(c[a].once&&this.removeListener(e,c[a].fn,void 0,!0),f){case 1:c[a].fn.call(c[a].context);break;case 2:c[a].fn.call(c[a].context,t);break;case 3:c[a].fn.call(c[a].context,t,r);break;case 4:c[a].fn.call(c[a].context,t,r,o);break;default:if(!s)for(d=1,s=new Array(f-1);d<f;d++)s[d-1]=arguments[d];c[a].fn.apply(c[a].context,s)}}return!0},l.prototype.on=function(e,t,n){return i(this,e,t,n,!1)},l.prototype.once=function(e,t,n){return i(this,e,t,n,!0)},l.prototype.removeListener=function(e,t,r,o){var i=n?n+e:e;if(!this._events[i])return this;if(!t)return u(this,i),this;var l=this._events[i];if(l.fn)l.fn!==t||o&&!l.once||r&&l.context!==r||u(this,i);else{for(var s=0,a=[],c=l.length;s<c;s++)(l[s].fn!==t||o&&!l[s].once||r&&l[s].context!==r)&&a.push(l[s]);a.length?this._events[i]=1===a.length?a[0]:a:u(this,i)}return this},l.prototype.removeAllListeners=function(e){var t;return e?(t=n?n+e:e,this._events[t]&&u(this,t)):(this._events=new r,this._eventsCount=0),this},l.prototype.off=l.prototype.removeListener,l.prototype.addListener=l.prototype.on,l.prefixed=n,l.EventEmitter=l,e.exports=l}));var u=Object.prototype;var l=function(e){var t=e&&e.constructor;return e===("function"==typeof t&&t.prototype||u)};var s=function(e,t){return function(n){return e(t(n))}},a=s(Object.keys,Object),c=Object.prototype.hasOwnProperty;var f=function(e){if(!l(e))return a(e);var t=[];for(var n in Object(e))c.call(e,n)&&"constructor"!=n&&t.push(n);return t},d=o((function(e){function t(n){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=t=function(e){return typeof e}:e.exports=t=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(n)}e.exports=t})),p="object"==d(n)&&n&&n.Object===Object&&n,v="object"==("undefined"==typeof self?"undefined":d(self))&&self&&self.Object===Object&&self,h=p||v||Function("return this")(),b=h.Symbol,m=Object.prototype,y=m.hasOwnProperty,g=m.toString,_=b?b.toStringTag:void 0;var j=function(e){var t=y.call(e,_),n=e[_];try{e[_]=void 0;var r=!0}catch(e){}var o=g.call(e);return r&&(t?e[_]=n:delete e[_]),o},O=Object.prototype.toString;var w=function(e){return O.call(e)},E=b?b.toStringTag:void 0;var x=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":E&&E in Object(e)?j(e):w(e)};var q=function(e){var t=d(e);return null!=e&&("object"==t||"function"==t)};var S,T=function(e){if(!q(e))return!1;var t=x(e);return"[object Function]"==t||"[object GeneratorFunction]"==t||"[object AsyncFunction]"==t||"[object Proxy]"==t},C=h["__core-js_shared__"],P=(S=/[^.]+$/.exec(C&&C.keys&&C.keys.IE_PROTO||""))?"Symbol(src)_1."+S:"";var $=function(e){return!!P&&P in e},M=Function.prototype.toString;var k=function(e){if(null!=e){try{return M.call(e)}catch(e){}try{return e+""}catch(e){}}return""},A=/^\[object .+?Constructor\]$/,L=Function.prototype,I=Object.prototype,F=L.toString,R=I.hasOwnProperty,z=RegExp("^"+F.call(R).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");var X=function(e){return!(!q(e)||$(e))&&(T(e)?z:A).test(k(e))};var V=function(e,t){return null==e?void 0:e[t]};var N=function(e,t){var n=V(e,t);return X(n)?n:void 0},Y=N(h,"DataView"),D=N(h,"Map"),B=N(h,"Promise"),Q=N(h,"Set"),U=N(h,"WeakMap"),G=k(Y),H=k(D),W=k(B),J=k(Q),K=k(U),Z=x;(Y&&"[object DataView]"!=Z(new Y(new ArrayBuffer(1)))||D&&"[object Map]"!=Z(new D)||B&&"[object Promise]"!=Z(B.resolve())||Q&&"[object Set]"!=Z(new Q)||U&&"[object WeakMap]"!=Z(new U))&&(Z=function(e){var t=x(e),n="[object Object]"==t?e.constructor:void 0,r=n?k(n):"";if(r)switch(r){case G:return"[object DataView]";case H:return"[object Map]";case W:return"[object Promise]";case J:return"[object Set]";case K:return"[object WeakMap]"}return t});var ee=Z;var te=function(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=9007199254740991};var ne=function(e){return null!=e&&te(e.length)&&!T(e)},re=Array.isArray;var oe=function(e){return null!=e&&"object"==d(e)};var ie=function(e){return"string"==typeof e||!re(e)&&oe(e)&&"[object String]"==x(e)};var ue=function(e){return function(t){return null==t?void 0:t[e]}}("length"),le=RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");var se=function(e){return le.test(e)},ae="[\\ud800-\\udfff]",ce="[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",fe="\\ud83c[\\udffb-\\udfff]",de="[^\\ud800-\\udfff]",pe="(?:\\ud83c[\\udde6-\\uddff]){2}",ve="[\\ud800-\\udbff][\\udc00-\\udfff]",he="(?:"+ce+"|"+fe+")"+"?",be="[\\ufe0e\\ufe0f]?"+he+("(?:\\u200d(?:"+[de,pe,ve].join("|")+")[\\ufe0e\\ufe0f]?"+he+")*"),me="(?:"+[de+ce+"?",ce,pe,ve,ae].join("|")+")",ye=RegExp(fe+"(?="+fe+")|"+me+be,"g");var ge=function(e){for(var t=ye.lastIndex=0;ye.test(e);)++t;return t};var _e=function(e){return se(e)?ge(e):ue(e)};var je=function(e){if(null==e)return 0;if(ne(e))return ie(e)?_e(e):e.length;var t=ee(e);return"[object Map]"==t||"[object Set]"==t?e.size:f(e).length};var Oe=function(e){return"symbol"==d(e)||oe(e)&&"[object Symbol]"==x(e)},we=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Ee=/^\w*$/;var xe=function(e,t){if(re(e))return!1;var n=d(e);return!("number"!=n&&"symbol"!=n&&"boolean"!=n&&null!=e&&!Oe(e))||(Ee.test(e)||!we.test(e)||null!=t&&e in Object(t))},qe=N(Object,"create");var Se=function(){this.__data__=qe?qe(null):{},this.size=0};var Te=function(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t},Ce=Object.prototype.hasOwnProperty;var Pe=function(e){var t=this.__data__;if(qe){var n=t[e];return"__lodash_hash_undefined__"===n?void 0:n}return Ce.call(t,e)?t[e]:void 0},$e=Object.prototype.hasOwnProperty;var Me=function(e){var t=this.__data__;return qe?void 0!==t[e]:$e.call(t,e)};var ke=function(e,t){var n=this.__data__;return this.size+=this.has(e)?0:1,n[e]=qe&&void 0===t?"__lodash_hash_undefined__":t,this};function Ae(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}Ae.prototype.clear=Se,Ae.prototype.delete=Te,Ae.prototype.get=Pe,Ae.prototype.has=Me,Ae.prototype.set=ke;var Le=Ae;var Ie=function(){this.__data__=[],this.size=0};var Fe=function(e,t){return e===t||e!=e&&t!=t};var Re=function(e,t){for(var n=e.length;n--;)if(Fe(e[n][0],t))return n;return-1},ze=Array.prototype.splice;var Xe=function(e){var t=this.__data__,n=Re(t,e);return!(n<0)&&(n==t.length-1?t.pop():ze.call(t,n,1),--this.size,!0)};var Ve=function(e){var t=this.__data__,n=Re(t,e);return n<0?void 0:t[n][1]};var Ne=function(e){return Re(this.__data__,e)>-1};var Ye=function(e,t){var n=this.__data__,r=Re(n,e);return r<0?(++this.size,n.push([e,t])):n[r][1]=t,this};function De(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}De.prototype.clear=Ie,De.prototype.delete=Xe,De.prototype.get=Ve,De.prototype.has=Ne,De.prototype.set=Ye;var Be=De;var Qe=function(){this.size=0,this.__data__={hash:new Le,map:new(D||Be),string:new Le}};var Ue=function(e){var t=d(e);return"string"==t||"number"==t||"symbol"==t||"boolean"==t?"__proto__"!==e:null===e};var Ge=function(e,t){var n=e.__data__;return Ue(t)?n["string"==typeof t?"string":"hash"]:n.map};var He=function(e){var t=Ge(this,e).delete(e);return this.size-=t?1:0,t};var We=function(e){return Ge(this,e).get(e)};var Je=function(e){return Ge(this,e).has(e)};var Ke=function(e,t){var n=Ge(this,e),r=n.size;return n.set(e,t),this.size+=n.size==r?0:1,this};function Ze(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}Ze.prototype.clear=Qe,Ze.prototype.delete=He,Ze.prototype.get=We,Ze.prototype.has=Je,Ze.prototype.set=Ke;var et=Ze;function tt(e,t){if("function"!=typeof e||null!=t&&"function"!=typeof t)throw new TypeError("Expected a function");var n=function n(){var r=arguments,o=t?t.apply(this,r):r[0],i=n.cache;if(i.has(o))return i.get(o);var u=e.apply(this,r);return n.cache=i.set(o,u)||i,u};return n.cache=new(tt.Cache||et),n}tt.Cache=et;var nt=tt;var rt=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,ot=/\\(\\)?/g,it=function(e){var t=nt(e,(function(e){return 500===n.size&&n.clear(),e})),n=t.cache;return t}((function(e){var t=[];return 46===e.charCodeAt(0)&&t.push(""),e.replace(rt,(function(e,n,r,o){t.push(r?o.replace(ot,"$1"):n||e)})),t}));var ut=function(e,t){for(var n=-1,r=null==e?0:e.length,o=Array(r);++n<r;)o[n]=t(e[n],n,e);return o},lt=b?b.prototype:void 0,st=lt?lt.toString:void 0;var at=function e(t){if("string"==typeof t)return t;if(re(t))return ut(t,e)+"";if(Oe(t))return st?st.call(t):"";var n=t+"";return"0"==n&&1/t==-1/0?"-0":n};var ct=function(e){return null==e?"":at(e)};var ft=function(e,t){return re(e)?e:xe(e,t)?[e]:it(ct(e))};var dt=function(e){if("string"==typeof e||Oe(e))return e;var t=e+"";return"0"==t&&1/e==-1/0?"-0":t};var pt=function(e,t){for(var n=0,r=(t=ft(t,e)).length;null!=e&&n<r;)e=e[dt(t[n++])];return n&&n==r?e:void 0};var vt=function(e,t,n){var r=null==e?void 0:pt(e,t);return void 0===r?n:r};var ht=function(e){return"number"==typeof e||oe(e)&&"[object Number]"==x(e)},bt=s(Object.getPrototypeOf,Object),mt=Function.prototype,yt=Object.prototype,gt=mt.toString,_t=yt.hasOwnProperty,jt=gt.call(Object);var Ot=function(e){if(!oe(e)||"[object Object]"!=x(e))return!1;var t=bt(e);if(null===t)return!0;var n=_t.call(t,"constructor")&&t.constructor;return"function"==typeof n&&n instanceof n&&gt.call(n)==jt};var wt=function(e){return oe(e)&&1===e.nodeType&&!Ot(e)};function Et(e,t,n){if(ht(e))if(ht(t)){if(function(e){return wt(e)}(n)){var r;try{r=n.getBoundingClientRect()}catch(e){return void console.log("invalid ele for getBoundingClientRect",e)}var o=!1;try{o=e>=r.left&&e<=r.right&&t>=r.top&&t<=r.bottom}catch(e){console.log("catch when calculating page information of element",e)}return o}console.log("ele is not HTMLElement",n)}else console.log("clientY is not Number",t);else console.log("clientX is not Number",e)}var xt=r(o((function(t,n){var r;t.exports=(r=e,function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/",t(t.s=2)}([function(e,t){e.exports=r},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(4),o=n.n(r),i=n(6),u=n(5)(o.a,i.a,!1,null,null,null);t.default=u.exports},function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.install=t.quillEditor=t.Quill=void 0;var o=r(n(0)),i=r(n(1)),u=window.Quill||o.default,l=function(e,t){t&&(i.default.props.globalOptions.default=function(){return t}),e.component(i.default.name,i.default)},s={Quill:u,quillEditor:i.default,install:l};t.default=s,t.Quill=u,t.quillEditor=i.default,t.install=l},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default={theme:"snow",boundary:document.body,modules:{toolbar:[["bold","italic","underline","strike"],["blockquote","code-block"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["clean"],["link","image","video"]]},placeholder:"Insert text here ...",readOnly:!1}},function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(0)),i=r(n(3)),u=window.Quill||o.default;"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(e,t){if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(e),r=1;r<arguments.length;r++){var o=arguments[r];if(null!=o)for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(n[i]=o[i])}return n},writable:!0,configurable:!0}),t.default={name:"quill-editor",data:function(){return{_options:{},_content:"",defaultOptions:i.default}},props:{content:String,value:String,disabled:{type:Boolean,default:!1},options:{type:Object,required:!1,default:function(){return{}}},globalOptions:{type:Object,required:!1,default:function(){return{}}}},mounted:function(){this.initialize()},beforeDestroy:function(){this.quill=null,delete this.quill},methods:{initialize:function(){var e=this;this.$el&&(this._options=Object.assign({},this.defaultOptions,this.globalOptions,this.options),this.quill=new u(this.$refs.editor,this._options),this.quill.enable(!1),(this.value||this.content)&&this.quill.pasteHTML(this.value||this.content),this.disabled||this.quill.enable(!0),this.quill.on("selection-change",(function(t){t?e.$emit("focus",e.quill):e.$emit("blur",e.quill)})),this.quill.on("text-change",(function(t,n,r){var o=e.$refs.editor.children[0].innerHTML,i=e.quill,u=e.quill.getText();"<p><br></p>"===o&&(o=""),e._content=o,e.$emit("input",e._content),e.$emit("change",{html:o,text:u,quill:i})})),this.$emit("ready",this.quill))}},watch:{content:function(e,t){this.quill&&(e&&e!==this._content?(this._content=e,this.quill.pasteHTML(e)):e||this.quill.setText(""))},value:function(e,t){this.quill&&(e&&e!==this._content?(this._content=e,this.quill.pasteHTML(e)):e||this.quill.setText(""))},disabled:function(e,t){this.quill&&this.quill.enable(!e)}}}},function(e,t){e.exports=function(e,t,n,r,o,i){var u,l=e=e||{},s=d(e.default);"object"!==s&&"function"!==s||(u=e,l=e.default);var a,c="function"==typeof l?l.options:l;if(t&&(c.render=t.render,c.staticRenderFns=t.staticRenderFns,c._compiled=!0),n&&(c.functional=!0),o&&(c._scopeId=o),i?(a=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},c._ssrRegister=a):r&&(a=r),a){var f=c.functional,p=f?c.render:c.beforeCreate;f?(c._injectStyles=a,c.render=function(e,t){return a.call(t),p(e,t)}):c.beforeCreate=p?[].concat(p,a):[a]}return{esModule:u,exports:l,options:c}}},function(e,t,n){var r={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"quill-editor"},[e._t("toolbar"),e._v(" "),n("div",{ref:"editor"})],2)},staticRenderFns:[]};t.a=r}]))})));function qt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function St(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?qt(Object(r),!0).forEach((function(n){t(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):qt(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Tt=new i,Ct={modules:{toolbar:[["bold","italic","underline","strike"],[{color:[]},{background:[]}],[{indent:"-1"},{indent:"+1"}],[{script:"sub"},{script:"super"}],[{align:[]}]]}},Pt={components:{"quill-editor":xt.quillEditor},props:{value:{type:String,default:""},settings:{type:Object,default:function(){}},height:{type:Number,default:250},editable:{type:Boolean,default:!0}},data:function(){return{fMousemove:null,bInElement:!1,valueTrans:""}},mounted:function(){var e=this;e.fMousemove=function(t){var n=function(e){var t=vt(e,"clientX",null),n=vt(e,"clientY",null),r=vt(e,"pageX",null),o=vt(e,"pageY",null);if(null!==t&&null!==n&&null!==r&&null!==o)return{clientX:t,clientY:n,pageX:r,pageY:o};var i=vt(e,"changedTouches",[]);if(1!==je(i))return null;var u=i[0];return{clientX:vt(u,"clientX",null),clientY:vt(u,"clientY",null),pageX:vt(u,"pageX",null),pageY:vt(u,"pageY",null)}}(t),r=Et(n.clientX,n.clientY,e.$el);e.bInElement=r},window.addEventListener("mousemove",e.fMousemove),Tt.on("disable",(function(){e.getEditor()&&e.getEditor().enable(!1)})),Tt.on("enable",(function(){e.getEditor()&&e.getEditor().enable(e.editable)}))},beforeDestroy:function(){window.removeEventListener("mousedown",this.fMousemove)},computed:{useSettings:function(){return St(St({},Ct),this.settings)},changeValue:function(){return this.valueTrans=this.value,""}},methods:{getEditor:function(){return this.$refs.edr?this.$refs.edr.quill:null},onLostFocus:function(){var e=this;e.bInElement||e.valueTrans!==e.value&&(Tt.emit("disable"),e.$emit("input",e.valueTrans),setTimeout((function(){Tt.emit("enable")}),50))}}};function $t(e,t,n,r,o,i,u,l,s,a){"boolean"!=typeof u&&(s=l,l=u,u=!1);var c,f="function"==typeof n?n.options:n;if(e&&e.render&&(f.render=e.render,f.staticRenderFns=e.staticRenderFns,f._compiled=!0,o&&(f.functional=!0)),r&&(f._scopeId=r),i?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),t&&t.call(this,s(e)),e&&e._registeredComponents&&e._registeredComponents.add(i)},f._ssrRegister=c):t&&(c=u?function(e){t.call(this,a(e,this.$root.$options.shadowRoot))}:function(e){t.call(this,l(e))}),c)if(f.functional){var d=f.render;f.render=function(e,t){return c.call(t),d(e,t)}}else{var p=f.beforeCreate;f.beforeCreate=p?[].concat(p,c):[c]}return n}var Mt,kt="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());function At(e){return function(e,t){return function(e,t){var n=kt?t.media||"default":e,r=Lt[n]||(Lt[n]={ids:new Set,styles:[]});if(!r.ids.has(e)){r.ids.add(e);var o=t.source;if(t.map&&(o+="\n/*# sourceURL="+t.map.sources[0]+" */",o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t.map))))+" */"),r.element||(r.element=document.createElement("style"),r.element.type="text/css",t.media&&r.element.setAttribute("media",t.media),void 0===Mt&&(Mt=document.head||document.getElementsByTagName("head")[0]),Mt.appendChild(r.element)),"styleSheet"in r.element)r.styles.push(o),r.element.styleSheet.cssText=r.styles.filter(Boolean).join("\n");else{var i=r.ids.size-1,u=document.createTextNode(o),l=r.element.childNodes;l[i]&&r.element.removeChild(l[i]),l.length?r.element.insertBefore(u,l[i]):r.element.appendChild(u)}}}(e,t)}}var Lt={};const It=Pt;var Ft=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{display:"inline-block"},attrs:{changeValue:e.changeValue}},[n("quill-editor",{ref:"edr",style:"height:"+e.height+"px;",attrs:{options:e.useSettings,disabled:!e.editable},on:{blur:e.onLostFocus},model:{value:e.valueTrans,callback:function(t){e.valueTrans=t},expression:"valueTrans"}})],1)};Ft._withStripped=!0;return $t({render:Ft,staticRenderFns:[]},(function(e){e&&e("data-v-7e0b05d4_0",{source:"\n[data-v-7e0b05d4] .ql-container {\r\n    font-size: inherit;\r\n    font-family: inherit;\n}\r\n",map:{version:3,sources:["D:\\開源-JS-102-1-w-quill-vue\\w-quill-vue\\src\\WQuillVue.vue"],names:[],mappings:";AA+MA;IACA,kBAAA;IACA,oBAAA;AACA",file:"WQuillVue.vue",sourcesContent:["<template>\r\n    <div style=\"display:inline-block;\" :changeValue=\"changeValue\">\r\n\r\n        <quill-editor\r\n            ref=\"edr\"\r\n            :style=\"`height:${height}px;`\"\r\n            :options=\"useSettings\"\r\n            :disabled=\"!editable\"\r\n            v-model=\"valueTrans\"\r\n            @blur=\"onLostFocus\"\r\n        ></quill-editor>\r\n\r\n    </div>\r\n</template>\r\n\r\n<script>\r\nimport evem from 'wsemi/src/evem.mjs'\r\nimport domGetPointFromEvent from 'wsemi/src/domGetPointFromEvent.mjs'\r\nimport domIsClientXYIn from 'wsemi/src/domIsClientXYIn.mjs'\r\nimport VueQuillEditor from 'vue-quill-editor'\r\n\r\n\r\nlet ev = evem()\r\n\r\n\r\nlet def_settings = {\r\n    modules: {\r\n        toolbar: [\r\n            //{ size: ['small', false, 'large', 'huge'] }, //同步文本會出現額外換行問題\r\n            ['bold', 'italic', 'underline', 'strike'],\r\n            [{ 'color': [] }, { 'background': [] }],\r\n            // [{ 'list': 'ordered' }, { 'list': 'bullet' }], //同步文本會出現額外換行問題\r\n            [{ 'indent': '-1' }, { 'indent': '+1' }],\r\n            [{ 'script': 'sub' }, { 'script': 'super' }],\r\n            // [{ 'header': [1, 2, 3, false] }], //同步文本會出現額外換行問題\r\n            [{ 'align': [] }],\r\n            // ['blockquote', 'code-block'], //同步文本會出現額外換行問題\r\n            // ['link', 'image', 'video'], //同步文本會出現額外換行問題\r\n            // ['clean'], //暫不使用\r\n        ],\r\n    },\r\n}\r\n\r\n\r\n/**\r\n * @vue-prop {String} [value=''] 輸入富文本字串，預設為''\r\n * @vue-prop {Object} [settings={}] 輸入quill設定物件，預設值詳見原始碼\r\n * @vue-prop {Number} [height=250] 輸入高度數字，單位為px，預設為250\r\n * @vue-prop {Boolean} [editable=true] 輸入是否允許編輯，預設true\r\n */\r\nexport default {\r\n    components: {\r\n        'quill-editor': VueQuillEditor.quillEditor,\r\n    },\r\n    props: {\r\n        value: {\r\n            type: String,\r\n            default: '',\r\n        },\r\n        settings: {\r\n            type: Object,\r\n            default: () => {},\r\n        },\r\n        height: {\r\n            type: Number,\r\n            default: 250,\r\n        },\r\n        editable: {\r\n            type: Boolean,\r\n            default: true,\r\n        },\r\n    },\r\n    data: function() {\r\n        return {\r\n            fMousemove: null,\r\n            bInElement: false,\r\n            valueTrans: '',\r\n        }\r\n    },\r\n    mounted: function() {\r\n        //console.log('mounted')\r\n\r\n        let vo = this\r\n\r\n        //fMousemove\r\n        vo.fMousemove = (e) => {\r\n            //console.log('fMousemove', e)\r\n\r\n            //domGetPointFromEvent\r\n            let p = domGetPointFromEvent(e)\r\n\r\n            //domIsClientXYIn\r\n            let b = domIsClientXYIn(p.clientX, p.clientY, vo.$el)\r\n\r\n            //save bInElement\r\n            vo.bInElement = b\r\n\r\n        }\r\n\r\n        //addEventListener\r\n        window.addEventListener('mousemove', vo.fMousemove)\r\n\r\n        //ev\r\n        ev.on('disable', () => {\r\n            if (vo.getEditor()) {\r\n                vo.getEditor().enable(false)\r\n            }\r\n        })\r\n        ev.on('enable', () => {\r\n            if (vo.getEditor()) {\r\n                vo.getEditor().enable(vo.editable) //要還原成原本的editable\r\n            }\r\n        })\r\n\r\n    },\r\n    beforeDestroy: function() {\r\n        //console.log('beforeDestroy')\r\n\r\n        let vo = this\r\n\r\n        //removeEventListener\r\n        window.removeEventListener('mousedown', vo.fMousemove)\r\n\r\n    },\r\n    computed: {\r\n\r\n        useSettings: function() {\r\n            //console.log('computed useSettings')\r\n\r\n            let vo = this\r\n\r\n            return {\r\n                ...def_settings,\r\n                ...vo.settings,\r\n            }\r\n        },\r\n\r\n        changeValue: function() {\r\n            //console.log('computed changeValue')\r\n\r\n            let vo = this\r\n\r\n            //save\r\n            vo.valueTrans = vo.value\r\n\r\n            //quill有問題, 解析例如有h1文本時(<p>abc中文123</p><p>a</p><p>b</p><h1>c</h1><p>d</p>)，會多解析出換行符號, 可只開放純文本編輯, 待後續quill修復\r\n            // setTimeout(() => {\r\n            //     if (vo.getEditor()) {\r\n            //         console.log('vo.value', vo.value)\r\n            //         console.log('vo.getEditor().getContents()', o2j(vo.getEditor().getContents()))\r\n            //         console.log('')\r\n            //     }\r\n            // }, 100)\r\n\r\n            return ''\r\n        },\r\n\r\n    },\r\n    methods: {\r\n\r\n        getEditor: function() {\r\n            //console.log('methods getEditor')\r\n\r\n            let vo = this\r\n\r\n            if (vo.$refs.edr) {\r\n                return vo.$refs.edr.quill\r\n            }\r\n            return null\r\n        },\r\n\r\n        onLostFocus: function() {\r\n            //console.log('methods onLostFocus')\r\n\r\n            let vo = this\r\n\r\n            //check, 還在組件內不算不觸發事件\r\n            if (vo.bInElement) {\r\n                return\r\n            }\r\n\r\n            //check, 同值就不觸發事件\r\n            if (vo.valueTrans === vo.value) {\r\n                return\r\n            }\r\n\r\n            //disable\r\n            ev.emit('disable')\r\n\r\n            //$emit\r\n            vo.$emit('input', vo.valueTrans)\r\n\r\n            //setTimeout\r\n            setTimeout(() => {\r\n\r\n                //enable\r\n                ev.emit('enable')\r\n\r\n            }, 50)\r\n\r\n        },\r\n\r\n    },\r\n}\r\n<\/script>\r\n\r\n<style scoped>\r\n::v-deep .ql-container {\r\n    font-size: inherit;\r\n    font-family: inherit;\r\n}\r\n</style>\r\n"]},media:void 0})}),It,"data-v-7e0b05d4",!1,void 0,!1,At,void 0,void 0)}));
//# sourceMappingURL=w-quill-vue.umd.js.map
