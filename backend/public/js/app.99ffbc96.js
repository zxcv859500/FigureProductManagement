(function(e){function t(t){for(var r,c,i=t[0],s=t[1],l=t[2],f=0,m=[];f<i.length;f++)c=i[f],o[c]&&m.push(o[c][0]),o[c]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);u&&u(t);while(m.length)m.shift()();return n.push.apply(n,l||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],r=!0,i=1;i<a.length;i++){var s=a[i];0!==o[s]&&(r=!1)}r&&(n.splice(t--,1),e=c(c.s=a[0]))}return e}var r={},o={app:0},n=[];function c(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.m=e,c.c=r,c.d=function(e,t,a){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(a,r,function(t){return e[t]}.bind(null,r));return a},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var u=s;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";var r=a("64a9"),o=a.n(r);o.a},"56d7":function(e,t,a){"use strict";a.r(t);a("cadf"),a("551c"),a("f751"),a("097d");var r=a("2b0e"),o=a("bc3a"),n=a.n(o),c={},i=n.a.create(c);i.interceptors.request.use(function(e){return e},function(e){return Promise.reject(e)}),i.interceptors.response.use(function(e){return e},function(e){return Promise.reject(e)}),Plugin.install=function(e,t){e.axios=i,window.axios=i,Object.defineProperties(e.prototype,{axios:{get:function(){return i}},$axios:{get:function(){return i}}})},r["default"].use(Plugin);Plugin;var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("el-header",[a("navigation")],1),a("el-main",{staticClass:"barcode-form"},[a("router-view")],1)],1)},l=[],u=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form"},[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"120px"}},[a("el-col",{attrs:{span:11}},[a("el-form-item",{attrs:{label:"바코드 번호"}},[a("el-input",{ref:"barcode",on:{focus:function(t){return e.onFocus()},blur:function(t){e.focused--}},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.getInformation(t)},keydown:function(t){return e.keyMonitor(t)}},model:{value:e.form.barcode,callback:function(t){e.$set(e.form,"barcode",t)},expression:"form.barcode"}})],1)],1),a("el-col",{attrs:{span:11}},[a("el-form-item",{attrs:{label:"상품 이름"}},[a("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),a("el-col",{attrs:{span:11}},[a("el-form-item",{attrs:{label:"재고 금액"}},[a("el-input",{model:{value:e.form.stockPrice,callback:function(t){e.$set(e.form,"stockPrice",t)},expression:"form.stockPrice"}})],1)],1),a("el-col",{attrs:{span:11}},[a("el-form-item",{attrs:{label:"단 가"}},[a("el-input",{model:{value:e.form.price,callback:function(t){e.$set(e.form,"price",t)},expression:"form.price"}})],1)],1),a("el-col",{attrs:{span:11}},[a("el-form-item",{attrs:{label:"재 고"}},[a("el-input",{model:{value:e.form.stock,callback:function(t){e.$set(e.form,"stock",t)},expression:"form.stock"}})],1)],1),a("el-col",{attrs:{span:11}},[e.mode?a("el-form-item",{attrs:{label:"판매 가격"}},[a("el-input",{model:{value:e.form.actualPrice,callback:function(t){e.$set(e.form,"actualPrice",t)},expression:"form.actualPrice"}})],1):e._e()],1)],1),a("el-col",{attrs:{span:21}},[a("el-switch",{attrs:{"active-text":"판매","inactive-text":"수정"},model:{value:e.mode,callback:function(t){e.mode=t},expression:"mode"}})],1),a("el-col",{attrs:{span:3}},[a("el-button",{attrs:{type:"primary"},on:{click:e.onClick}},[e._v("확인")])],1)],1)},f=[],m=(a("6b54"),a("a481"),a("7f7f"),{name:"BarcodeForm",mounted:function(){},data:function(){return{form:{barcode:"",name:"",stockPrice:0,price:0,stock:0,actualPrice:0},mode:!0,enterPressed:!1,focused:0}},methods:{onFocus:function(){this.$refs.barcode.focus()},onClick:function(){var e=this;this.mode?this.$axios.post("/api/sell",this.form).then(function(t){e.form.name=t.data.name,e.form.stockPrice=t.data.stockPrice,e.form.price=t.data.price,e.form.stock=t.data.stock}).catch(function(e){console.log(e)}):this.$axios.post("/api/update",this.form).then(function(t){e.form.name=t.data.name,e.form.stockPrice=t.data.stockPrice,e.form.price=t.data.price,e.form.stock=t.data.stock}).catch(function(e){console.log(e)}),this.form.actualPrice=0},keyMonitor:function(e){console.log("Key pressed event"),this.enterPressed&&(this.form.barcode="",this.enterPressed=!1),"Enter"===e.key&&(this.enterPressed=!0)},getInformation:function(){var e=this;!1===this.mode?this.$axios.post("/api/add",this.form).then(function(t){e.form.name=t.data.name,e.form.stockPrice=t.data.stockPrice,e.form.price=t.data.price,e.form.stock=t.data.stock,isNaN(e.form.price)||(e.form.price=e.form.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")),isNaN(e.form.stockPrice)||(e.form.stockPrice=e.form.stockPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","))}):this.$axios.post("/api/select",this.form).then(function(t){e.form.name=t.data.name,e.form.stockPrice=t.data.stockPrice,e.form.price=t.data.price,e.form.stock=t.data.stock,isNaN(e.form.price)||(e.form.price=e.form.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")),isNaN(e.form.stockPrice)||(e.form.stockPrice=e.form.stockPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","))}).then(function(e){console.log(e)})}}}),p=m,d=a("2877"),h=Object(d["a"])(p,u,f,!1,null,"6c9c79f6",null),b=h.exports,k=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("nav",{staticClass:"nav"},[a("el-row",{staticClass:"row-bg",attrs:{type:"flex",justify:"center"}},[a("el-col",{attrs:{span:20}},[a("el-menu",{attrs:{mode:"horizontal","background-color":"#409EFF","text-color":"#fff","active-text-color":"#DCDFE6",router:!0}},[a("el-menu-item",{attrs:{index:"home"}},[e._v("판매/갱신")]),a("el-menu-item",{attrs:{index:"product"}},[e._v("제품 목록")]),a("el-menu-item",{attrs:{index:"sell"}},[e._v("판매 기록")])],1)],1)],1)],1)},v=[],P={name:"Nav"},g=P,y=Object(d["a"])(g,k,v,!1,null,"366e0ef1",null),D=y.exports,x={name:"app",components:{BarcodeForm:b,navigation:D}},w=x,_=(a("034f"),Object(d["a"])(w,s,l,!1,null,null,null)),$=_.exports,S=a("5c96"),j=a.n(S),C=(a("0fae"),a("b2d6")),O=a.n(C),N=a("4897"),E=a.n(N),B=a("8c4f"),F=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"product"},[a("div",{staticClass:"sum-price"},[e._v("\n        합산 가격 : "+e._s(e.sumPrice)+"\n    ")]),a("el-table",{attrs:{data:e.tableData.filter(function(t){return!e.search||t.name.toLowerCase().includes(e.search.toLowerCase())||t.barcode.includes(e.search.toLowerCase())}),"default-sort":{prop:"name",order:"descending"}}},[a("el-table-column",{attrs:{prop:"name",label:"제품 이름","column-key":"name"}}),a("el-table-column",{attrs:{prop:"barcode",label:"바코드","column-key":"barcode"}}),a("el-table-column",{attrs:{prop:"price",label:"단가","column-key":"price"}}),a("el-table-column",{attrs:{prop:"stock",label:"개수","column-key":"price",sortable:""}}),a("el-table-column",{attrs:{prop:"stockPrice",label:"총 단가","column-key":"stockPrice"}}),a("el-table-column",{attrs:{align:"right"},scopedSlots:e._u([{key:"header",fn:function(t){return[a("el-input",{attrs:{size:"mini",placeholder:"Type to search"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})]}},{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("Delete")])]}}])})],1)],1)},L=[],M=(a("ac6a"),{name:"product",data:function(){return{tableData:[],search:"",sumPrice:0}},mounted:function(){var e=this;this.$axios.get("/api/list").then(function(t){e.tableData=[],t.data.forEach(function(t){var a={name:t.name,barcode:t.barcode,price:t.price,stock:t.stock,stockPrice:t.stockPrice};e.sumPrice+=a.stockPrice,isNaN(a.price)||(a.price=a.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")),isNaN(a.stockPrice)||(a.stockPrice=a.stockPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")),e.tableData.push(a)}),e.sumPrice=e.sumPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}).catch(function(e){console.log(e)})},methods:{handleDelete:function(e,t){}}}),T=M,z=Object(d["a"])(T,F,L,!1,null,"109f120c",null),H=z.exports,I=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"sell-history"},[a("div",{staticClass:"sum-price"},[e._v("\n        실제 합산 가격: "+e._s(e.sumPrice)+"\n    ")]),a("el-date-picker",{attrs:{type:"daterange","range-separator":"To","start-placeholder":"Start date","end-placeholder":"End date"},on:{change:e.onChange},model:{value:e.date,callback:function(t){e.date=t},expression:"date"}}),a("el-table",{attrs:{data:e.showData,"default-sort":{prop:"date",order:"descending"}}},[a("el-table-column",{attrs:{prop:"date",label:"날짜",sortable:"","column-key":"date"}}),a("el-table-column",{attrs:{prop:"name",label:"이름","column-key":"name"}}),a("el-table-column",{attrs:{prop:"actualPrice",label:"실판매가","column-key":"actualPrice"}}),a("el-table-column",{attrs:{prop:"barcode",label:"바코드","column-key":"barcode"}})],1)],1)},J=[],q=(a("c5f6"),{name:"sell",data:function(){return{tableData:[],date:"",compareDate:[],showData:[]}},mounted:function(){var e=this;this.compareDate[0]=Date.parse((new Date).toLocaleDateString()),this.compareDate[1]=this.compareDate[0]+324e5,this.load(),this.showData=this.tableData.filter(function(t){return!e.compareDate||Date.parse(t.date)>=e.compareDate[0]&&Date.parse(t.date)<=e.compareDate[1]})},methods:{load:function(){var e=this;this.$axios.get("/api/sell/list").then(function(t){e.tableData=[],t.data.forEach(function(t){var a={date:t.date,name:t.name,barcode:t.barcode,actualPrice:t.actualPrice};isNaN(a.actualPrice)||(a.actualPrice=a.actualPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")),e.tableData.push(a)})}).catch(function(e){console.log(e)})},onChange:function(){var e=this;this.compareDate[0]=Date.parse(this.date[0].toLocaleDateString()),this.compareDate[1]=Date.parse(this.date[1].toLocaleDateString())+324e5,this.showData=this.tableData.filter(function(t){return!e.compareDate||Date.parse(t.date)>=e.compareDate[0]&&Date.parse(t.date)<=e.compareDate[1]})}},computed:{sumPrice:function(){var e=0;return this.showData.forEach(function(t){var a=Number(t.actualPrice.replace(",",""));e+=a}),e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}}}),K=q,A=Object(d["a"])(K,I,J,!1,null,"ca053660",null),G=A.exports;r["default"].use(B["a"]);var Q=new B["a"]({mode:"history",base:"/",routes:[{path:"/",redirect:{name:"Home"}},{path:"/home",name:"Home",components:{default:b}},{path:"/product",name:"Product",components:{default:H}},{path:"/sell",name:"Sell",components:{default:G}}]});E.a.use(O.a),r["default"].use(j.a),r["default"].config.productionTip=!1,new r["default"]({router:Q,render:function(e){return e($)}}).$mount("#app")},"64a9":function(e,t,a){}});
//# sourceMappingURL=app.99ffbc96.js.map