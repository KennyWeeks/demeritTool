(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))a(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const f of i.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&a(f)}).observe(document,{childList:!0,subtree:!0});function n(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerPolicy&&(i.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?i.credentials="include":l.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(l){if(l.ep)return;l.ep=!0;const i=n(l);fetch(l.href,i)}})();function E(){}function he(t){return t()}function le(){return Object.create(null)}function W(t){t.forEach(he)}function ge(t){return typeof t=="function"}function O(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let G;function xe(t,e){return G||(G=document.createElement("a")),G.href=e,t===G.href}function ke(t){return Object.keys(t).length===0}function v(t,e){t.appendChild(e)}function A(t,e,n){t.insertBefore(e,n||null)}function k(t){t.parentNode&&t.parentNode.removeChild(t)}function ee(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function w(t){return document.createElement(t)}function M(t){return document.createTextNode(t)}function B(){return M(" ")}function ye(){return M("")}function I(t,e,n,a){return t.addEventListener(e,n,a),()=>t.removeEventListener(e,n,a)}function ie(t){return function(e){return e.preventDefault(),t.call(this,e)}}function c(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Ae(t){return Array.from(t.childNodes)}function be(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function x(t,e,n,a){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,a?"important":"")}function q(t,e,n){t.classList[n?"add":"remove"](e)}let F;function U(t){F=t}function Be(){if(!F)throw new Error("Function called outside component initialization");return F}function _e(t){Be().$$.on_mount.push(t)}function V(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(a=>a.call(this,e))}const $=[],oe=[],J=[],re=[],Ee=Promise.resolve();let te=!1;function Te(){te||(te=!0,Ee.then(we))}function ne(t){J.push(t)}const Z=new Set;let P=0;function we(){if(P!==0)return;const t=F;do{try{for(;P<$.length;){const e=$[P];P++,U(e),Ce(e.$$)}}catch(e){throw $.length=0,P=0,e}for(U(null),$.length=0,P=0;oe.length;)oe.pop()();for(let e=0;e<J.length;e+=1){const n=J[e];Z.has(n)||(Z.add(n),n())}J.length=0}while($.length);for(;re.length;)re.pop()();te=!1,Z.clear(),U(t)}function Ce(t){if(t.fragment!==null){t.update(),W(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(ne)}}const Q=new Set;let N;function Ie(){N={r:0,c:[],p:N}}function ze(){N.r||W(N.c),N=N.p}function z(t,e){t&&t.i&&(Q.delete(t),t.i(e))}function H(t,e,n,a){if(t&&t.o){if(Q.has(t))return;Q.add(t),N.c.push(()=>{Q.delete(t),a&&(n&&t.d(1),a())}),t.o(e)}else a&&a()}const We=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function j(t){t&&t.c()}function S(t,e,n,a){const{fragment:l,after_update:i}=t.$$;l&&l.m(e,n),a||ne(()=>{const f=t.$$.on_mount.map(he).filter(ge);t.$$.on_destroy?t.$$.on_destroy.push(...f):W(f),t.$$.on_mount=[]}),i.forEach(ne)}function L(t,e){const n=t.$$;n.fragment!==null&&(W(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function qe(t,e){t.$$.dirty[0]===-1&&($.push(t),Te(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function D(t,e,n,a,l,i,f,m=[-1]){const g=F;U(t);const u=t.$$={fragment:null,ctx:[],props:i,update:E,not_equal:l,bound:le(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(g?g.$$.context:[])),callbacks:le(),dirty:m,skip_bound:!1,root:e.target||g.$$.root};f&&f(u.root);let p=!1;if(u.ctx=n?n(t,e.props||{},(s,o,...r)=>{const h=r.length?r[0]:o;return u.ctx&&l(u.ctx[s],u.ctx[s]=h)&&(!u.skip_bound&&u.bound[s]&&u.bound[s](h),p&&qe(t,s)),o}):[],u.update(),p=!0,W(u.before_update),u.fragment=a?a(u.ctx):!1,e.target){if(e.hydrate){const s=Ae(e.target);u.fragment&&u.fragment.l(s),s.forEach(k)}else u.fragment&&u.fragment.c();e.intro&&z(t.$$.fragment),S(t,e.target,e.anchor,e.customElement),we()}U(g)}class R{$destroy(){L(this,1),this.$destroy=E}$on(e,n){if(!ge(n))return E;const a=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return a.push(n),()=>{const l=a.indexOf(n);l!==-1&&a.splice(l,1)}}$set(e){this.$$set&&!ke(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function He(t){let e,n,a,l;return{c(){e=w("button"),n=M(t[0]),c(e,"class","clickbutton svelte-kubop"),q(e,"printbutton",t[1]===!0),q(e,"view",t[2]===!0)},m(i,f){A(i,e,f),v(e,n),a||(l=I(e,"click",t[3]),a=!0)},p(i,[f]){f&1&&be(n,i[0]),f&2&&q(e,"printbutton",i[1]===!0),f&4&&q(e,"view",i[2]===!0)},i:E,o:E,d(i){i&&k(e),a=!1,l()}}}function Ne(t,e,n){let{buttonText:a="click"}=e,{printbutton:l=!1}=e,{view:i=!1}=e;function f(m){V.call(this,t,m)}return t.$$set=m=>{"buttonText"in m&&n(0,a=m.buttonText),"printbutton"in m&&n(1,l=m.printbutton),"view"in m&&n(2,i=m.view)},[a,l,i,f]}class ve extends R{constructor(e){super(),D(this,e,Ne,He,O,{buttonText:0,printbutton:1,view:2})}}const Se="/live_website/assets/header-3411b5d4.png";function Le(t){let e,n,a,l,i,f,m,g,u,p,s;return{c(){e=w("div"),n=w("img"),l=B(),i=w("div"),i.innerHTML=`<div class="itemblocks" id="test" style="font-size:18px; margin-bottom:0px; flex-grow:2;"><h3 class="description" style="margin-bottom:0px; font-weight:normal;">Name <span id="name-text"></span></h3></div> 

        <div class="itemblocks" style="font-size:18px; margin-bottom:0px; flex-grow:1;"><h3 class="description" style="margin-bottom:0px; font-weight:normal;">Date <span id="date-text"></span></h3></div> 

        <div class="itemblocks" style="font-size:18px; margin-bottom:0px; flex-grow:1;"><h3 class="description" style="margin-bottom:0px; font-weight:normal;">HR # <span id="number-text"></span></h3></div>`,f=B(),m=w("h3"),m.textContent="Infraction:",g=B(),u=w("p"),u.innerHTML=`I earned <span id="demerit-points">(#)</span> demerit points at approximately <span id="time">(time)</span> for a/an <span id="infraction-space">infraction</span>. <span id="assigned">(Who assigned
    you the demerits, if Capt. Spell out Captain)</span> assigned me this demerit report because <span id="demerit-description">...</span>`,p=B(),s=w("table"),s.innerHTML=`<colgroup><col span="1" style="width: 0%;"/> 
            <col span="1" style="width: 45%;"/> 
            <col span="1" style="width: 30%;"/> 
            <col span="1" style="width: 25%;"/></colgroup> 
        <tr><td style="box-shadow:inset 0 0 0 0.25px #000; overflow:hidden; padding:10px; padding-top:5px; padding-bottom:35px; font-style:italic; font-size:14px;"></td> 
            <td style="box-shadow:inset 0 0 0 0.25px #000; overflow:hidden; padding:10px; padding-top:5px; padding-bottom:35px; font-style:italic; font-size:14px;">Recruit Signature</td> 
            <td style="box-shadow:inset 0 0 0 0.25px #000; overflow:hidden; padding:10px; padding-top:5px; padding-bottom:35px; font-style:italic; font-size:14px;">HR #</td> 
            <td style="box-shadow:inset 0 0 0 0.25px #000; overflow:hidden; padding:10px; padding-top:5px; padding-bottom:35px; font-style:italic; font-size:14px;">Date</td></tr> 
        <tr><td style="box-shadow:inset 0 0 0 0.25px #000; overflow:hidden; padding:10px; padding-top:5px; padding-bottom:35px; font-style:italic; font-size:14px;"></td> 
            <td style="box-shadow:inset 0 0 0 0.25px #000; overflow:hidden; padding:10px; padding-top:5px; padding-bottom:35px; font-style:italic; font-size:14px;">Academy Staff Signature</td> 
            <td style="box-shadow:inset 0 0 0 0.25px #000; overflow:hidden; padding:10px; padding-top:5px; padding-bottom:35px; font-style:italic; font-size:14px;">HR #</td> 
            <td style="box-shadow:inset 0 0 0 0.25px #000; overflow:hidden; padding:10px; padding-top:5px; padding-bottom:35px; font-style:italic; font-size:14px;">Date</td></tr>`,xe(n.src,a=Se)||c(n,"src",a),x(n,"margin-top","96px"),x(n,"margin-left","96px"),c(n,"alt","Fire Academy Header"),c(i,"id","header"),x(i,"width","calc(6.5*96px)"),x(i,"border-bottom","3px solid #000"),x(i,"display","flex"),x(i,"justify-content","space-between"),x(i,"flex-flow","row"),x(i,"flex-wrap","nowrap"),x(i,"margin-left","96px"),c(m,"id","infraction"),x(m,"text-transform","uppercase"),x(m,"font-weight","normal"),x(m,"margin-left","96px"),x(m,"font-size","16px"),c(u,"id","infraction-starting-line"),x(u,"width","calc(6.5*96px)"),x(u,"margin-left","96px"),x(u,"font-size","15.25px"),c(s,"cellspacing","0"),x(s,"width","calc(6.5*96px)"),x(s,"border-bottom","0.25px solid #000"),x(s,"border-right","0.25px solid #000"),x(s,"position","absolute"),x(s,"bottom","96px"),x(s,"left","96px"),c(e,"id","main-component"),x(e,"width","calc(8.5*96px)"),x(e,"height","calc(11*96px)"),x(e,"position","relative"),x(e,"overflow","hidden"),x(e,"background-color","#fff"),c(e,"class","svelte-tosqs")},m(o,r){A(o,e,r),v(e,n),v(e,l),v(e,i),v(e,f),v(e,m),v(e,g),v(e,u),v(e,p),v(e,s)},p:E,i:E,o:E,d(o){o&&k(e)}}}class Me extends R{constructor(e){super(),D(this,e,null,Le,O,{})}}function Pe(t){let e,n,a,l,i,f,m;return{c(){e=w("label"),n=M("Type demerit details here "),a=w("span"),a.textContent="Please enter data",l=B(),i=w("textarea"),c(a,"class","svelte-kpb9a2"),q(a,"show",t[0]===!0),c(e,"for","textarea"),c(e,"class","svelte-kpb9a2"),c(i,"name","textarea"),c(i,"rows","20"),c(i,"placeholder","Write demerit details here ..."),i.required=!0,c(i,"class","svelte-kpb9a2")},m(g,u){A(g,e,u),v(e,n),v(e,a),A(g,l,u),A(g,i,u),f||(m=[I(i,"focus",t[1]),I(i,"keypress",ie(t[2]))],f=!0)},p(g,[u]){u&1&&q(a,"show",g[0]===!0)},i:E,o:E,d(g){g&&k(e),g&&k(l),g&&k(i),f=!1,W(m)}}}function $e(t,e,n){let{err:a=!1}=e;function l(f){V.call(this,t,f)}const i=f=>{if(f.charCode<48||f.charCode>57){let m=String.fromCharCode(f.charCode);f.target.value.length==0&&(m=m.toUpperCase()),f.target.value+=m}};return t.$$set=f=>{"err"in f&&n(0,a=f.err)},[a,l,i]}class je extends R{constructor(e){super(),D(this,e,$e,Pe,O,{err:0})}}function Oe(t){let e,n,a;return{c(){e=w("input"),c(e,"type",t[1]),c(e,"name",t[0]),c(e,"class","inputtag svelte-13qnuxw"),c(e,"placeholder",t[2]),c(e,"min",t[3]),e.required=!0},m(l,i){A(l,e,i),n||(a=I(e,"focus",t[7]),n=!0)},p(l,i){i&2&&c(e,"type",l[1]),i&1&&c(e,"name",l[0]),i&4&&c(e,"placeholder",l[2]),i&8&&c(e,"min",l[3])},d(l){l&&k(e),n=!1,a()}}}function De(t){let e,n,a;return{c(){e=w("input"),c(e,"type",t[1]),c(e,"name",t[0]),c(e,"class","inputtag svelte-13qnuxw"),c(e,"placeholder",t[2]),c(e,"min",t[3]),e.required=!0},m(l,i){A(l,e,i),n||(a=[I(e,"keypress",ie(t[9])),I(e,"focus",t[6])],n=!0)},p(l,i){i&2&&c(e,"type",l[1]),i&1&&c(e,"name",l[0]),i&4&&c(e,"placeholder",l[2]),i&8&&c(e,"min",l[3])},d(l){l&&k(e),n=!1,W(a)}}}function Re(t){let e,n,a;return{c(){e=w("input"),c(e,"type",t[1]),c(e,"name",t[0]),c(e,"class","inputtag svelte-13qnuxw"),c(e,"placeholder",t[2]),c(e,"min",t[3]),e.required=!0},m(l,i){A(l,e,i),n||(a=[I(e,"keypress",ie(t[8])),I(e,"focus",t[5])],n=!0)},p(l,i){i&2&&c(e,"type",l[1]),i&1&&c(e,"name",l[0]),i&4&&c(e,"placeholder",l[2]),i&8&&c(e,"min",l[3])},d(l){l&&k(e),n=!1,W(a)}}}function Ue(t){let e,n=t[0].replace(/-/g," ")+"",a,l,i,f,m,g;function u(o,r){return o[0]==="Hr-number"?Re:o[0]=="Name"||o[0]=="Who-assigned-the-demerit"?De:Oe}let p=u(t),s=p(t);return{c(){e=w("label"),a=M(n),l=B(),i=w("span"),i.textContent="Please enter data",f=w("br"),m=B(),s.c(),g=ye(),c(i,"class","svelte-13qnuxw"),q(i,"show",t[4]===!0),c(e,"for",t[0]),c(e,"class","svelte-13qnuxw")},m(o,r){A(o,e,r),v(e,a),v(e,l),v(e,i),A(o,f,r),A(o,m,r),s.m(o,r),A(o,g,r)},p(o,[r]){r&1&&n!==(n=o[0].replace(/-/g," ")+"")&&be(a,n),r&16&&q(i,"show",o[4]===!0),r&1&&c(e,"for",o[0]),p===(p=u(o))&&s?s.p(o,r):(s.d(1),s=p(o),s&&(s.c(),s.m(g.parentNode,g)))},i:E,o:E,d(o){o&&k(e),o&&k(f),o&&k(m),s.d(o),o&&k(g)}}}function Ve(t,e,n){let{labelTag:a=""}=e,{type:l="text"}=e,{def:i=""}=e,{min:f=null}=e,{err:m=!1}=e;function g(r){V.call(this,t,r)}function u(r){V.call(this,t,r)}function p(r){V.call(this,t,r)}const s=r=>{r.charCode>=48&&r.charCode<=57&&(r.target.value+=String.fromCharCode(r.charCode))},o=r=>{if(r.charCode<48||r.charCode>57){let h=String.fromCharCode(r.charCode);r.target.value.length==0&&(h=h.toUpperCase()),r.target.value+=h}};return t.$$set=r=>{"labelTag"in r&&n(0,a=r.labelTag),"type"in r&&n(1,l=r.type),"def"in r&&n(2,i=r.def),"min"in r&&n(3,f=r.min),"err"in r&&n(4,m=r.err)},[a,l,i,f,m,g,u,p,s,o]}class Fe extends R{constructor(e){super(),D(this,e,Ve,Ue,O,{labelTag:0,type:1,def:2,min:3,err:4})}}function se(t,e,n){const a=t.slice();return a[8]=e[n],a}function ae(t,e,n){const a=t.slice();return a[11]=e[n],a}function de(t,e,n){const a=t.slice();return a[11]=e[n],a}function Ye(t){let e,n,a,l,i,f,m,g,u,p,s,o=Array.from(Array(25).keys(),pe),r=[];for(let d=0;d<o.length;d+=1)r[d]=fe(de(t,o,d));let h=Array.from(Array(60).keys(),me),_=[];for(let d=0;d<h.length;d+=1)_[d]=ue(ae(t,h,d));return{c(){e=w("label"),e.textContent="Time of Demerit",n=w("br"),a=B(),l=w("select");for(let d=0;d<r.length;d+=1)r[d].c();i=B(),f=w("select");for(let d=0;d<_.length;d+=1)_[d].c();m=B(),g=w("select"),u=w("option"),u.textContent="AM",p=w("option"),p.textContent="PM",s=w("br"),c(e,"for","hours"),x(e,"font-size","20px"),x(e,"margin-bottom","10px"),x(e,"color","#000"),c(l,"name","hours"),c(l,"id","hours-tag"),x(l,"margin-top","5px"),x(l,"margin-bottom","10px"),x(l,"font-size","18px"),c(f,"name","minutes"),c(f,"id","minutes"),x(f,"font-size","18px"),u.__value="am",u.value=u.__value,p.__value="pm",p.value=p.__value,c(g,"name","ampm"),c(g,"id","ampm-tag"),x(g,"font-size","18px")},m(d,b){A(d,e,b),A(d,n,b),A(d,a,b),A(d,l,b);for(let y=0;y<r.length;y+=1)r[y].m(l,null);A(d,i,b),A(d,f,b);for(let y=0;y<_.length;y+=1)_[y].m(f,null);A(d,m,b),A(d,g,b),v(g,u),v(g,p),A(d,s,b)},p(d,b){if(b&0){o=Array.from(Array(25).keys(),pe);let y;for(y=0;y<o.length;y+=1){const C=de(d,o,y);r[y]?r[y].p(C,b):(r[y]=fe(C),r[y].c(),r[y].m(l,null))}for(;y<r.length;y+=1)r[y].d(1);r.length=o.length}if(b&0){h=Array.from(Array(60).keys(),me);let y;for(y=0;y<h.length;y+=1){const C=ae(d,h,y);_[y]?_[y].p(C,b):(_[y]=ue(C),_[y].c(),_[y].m(f,null))}for(;y<_.length;y+=1)_[y].d(1);_.length=h.length}},d(d){d&&k(e),d&&k(n),d&&k(a),d&&k(l),ee(r,d),d&&k(i),d&&k(f),ee(_,d),d&&k(m),d&&k(g),d&&k(s)}}}function Ke(t){let e;return{c(){e=w("hr"),c(e,"class","svelte-uqn9ck")},m(n,a){A(n,e,a)},p:E,d(n){n&&k(e)}}}function fe(t){let e,n=t[11]+"",a;return{c(){e=w("option"),a=M(n),e.__value=t[11],e.value=e.__value},m(l,i){A(l,e,i),v(e,a)},p:E,d(l){l&&k(e)}}}function ue(t){let e,n=t[11]+"",a;return{c(){e=w("option"),a=M(n),e.__value=t[11],e.value=e.__value},m(l,i){A(l,e,i),v(e,a)},p:E,d(l){l&&k(e)}}}function ce(t){let e,n,a,l,i;function f(...p){return t[5](t[8],...p)}e=new Fe({props:{err:t[2][t[8]][2],labelTag:t[8].charAt(0).toUpperCase()+t[8].slice(1),type:t[2][t[8]][0],min:t[2][t[8]][1],def:t[2][t[8]][1]}}),e.$on("focus",f);function m(p,s){if(p[8]=="hr-number")return Ke;if(p[8]=="demerit-points")return Ye}let g=m(t),u=g&&g(t);return{c(){j(e.$$.fragment),n=w("br"),a=B(),u&&u.c(),l=ye()},m(p,s){S(e,p,s),A(p,n,s),A(p,a,s),u&&u.m(p,s),A(p,l,s),i=!0},p(p,s){t=p;const o={};s&4&&(o.err=t[2][t[8]][2]),s&4&&(o.labelTag=t[8].charAt(0).toUpperCase()+t[8].slice(1)),s&4&&(o.type=t[2][t[8]][0]),s&4&&(o.min=t[2][t[8]][1]),s&4&&(o.def=t[2][t[8]][1]),e.$set(o),g===(g=m(t))&&u?u.p(t,s):(u&&u.d(1),u=g&&g(t),u&&(u.c(),u.m(l.parentNode,l)))},i(p){i||(z(e.$$.fragment,p),i=!0)},o(p){H(e.$$.fragment,p),i=!1},d(p){L(e,p),p&&k(n),p&&k(a),u&&u.d(p),p&&k(l)}}}function Ge(t){let e,n,a,l,i,f,m,g,u=Object.keys(t[2]),p=[];for(let o=0;o<u.length;o+=1)p[o]=ce(se(t,u,o));const s=o=>H(p[o],1,1,()=>{p[o]=null});return i=new je({props:{err:t[3]}}),i.$on("focus",t[6]),m=new ve({props:{printbutton:t[0],buttonText:t[1]}}),m.$on("click",t[7]),{c(){e=w("div"),n=w("br"),a=B();for(let o=0;o<p.length;o+=1)p[o].c();l=B(),j(i.$$.fragment),f=B(),j(m.$$.fragment),c(e,"id","editor-block"),c(e,"class","svelte-uqn9ck")},m(o,r){A(o,e,r),v(e,n),v(e,a);for(let h=0;h<p.length;h+=1)p[h].m(e,null);v(e,l),S(i,e,null),v(e,f),S(m,e,null),g=!0},p(o,[r]){if(r&4){u=Object.keys(o[2]);let d;for(d=0;d<u.length;d+=1){const b=se(o,u,d);p[d]?(p[d].p(b,r),z(p[d],1)):(p[d]=ce(b),p[d].c(),z(p[d],1),p[d].m(e,l))}for(Ie(),d=u.length;d<p.length;d+=1)s(d);ze()}const h={};r&8&&(h.err=o[3]),i.$set(h);const _={};r&1&&(_.printbutton=o[0]),r&2&&(_.buttonText=o[1]),m.$set(_)},i(o){if(!g){for(let r=0;r<u.length;r+=1)z(p[r]);z(i.$$.fragment,o),z(m.$$.fragment,o),g=!0}},o(o){p=p.filter(Boolean);for(let r=0;r<p.length;r+=1)H(p[r]);H(i.$$.fragment,o),H(m.$$.fragment,o),g=!1},d(o){o&&k(e),ee(p,o),L(i),L(m)}}}const pe=t=>t,me=t=>t;function Je(t,e,n){let{printButton:a=!0}=e,{buttonText:l="Print"}=e,i={name:["text","Your name ...",!1],date:["date","02/14/2023",!1],"hr-number":["text","1111111...",!1],"demerit-points":["number","1",!1],"who-assigned-the-demerit":["text","Captain ....",!1]},f=!1;_e(async()=>{let s=new Date;document.getElementById("hours-tag").value=s.getHours(),document.getElementById("minutes").value=s.getMinutes(),s.getHours()>12&&(document.getElementById("ampm-tag").value="pm")});const m=s=>{let o=window.open("","PRINT",`height=${816}px, width=${1056}px`);window.innerWidth<=794&&o.print(),s.style.transform="scale(1.0)";let r=Array.from(s.childNodes);r=r.filter(d=>d.data!=" "),o.document.write("<div id='main-component'></div>");let h=o.document.getElementById("main-component");h.innerHTML=s.innerHTML;let _=Array.from(h.childNodes);_=_.filter(d=>d.data!=" "),h.setAttribute("style",s.getAttribute("style"));for(let d=0;d<_.length;d++)_[d].setAttribute("style",r[d].getAttribute("style"));window.innerWidth>794&&o.print()},g=(s,o,r=s)=>{o.target.style.outline="none",n(2,i[r][2]=!1,i)},u=s=>{s.target.style.outline="none",n(3,f=!1)},p=()=>{let s=document.querySelectorAll("input"),o=!1;s=Array.from(s),s.forEach(h=>{let _=h.getAttribute("name").toLowerCase();h.value==""&&(n(2,i[_][2]=!0,i),h.style.outline="2px solid #ff0000",o=!0)});let r=document.querySelectorAll("textarea")[0];if(console.log(r.value),r.value==""&&(r.style.outline="2px solid #ff0000",o=!0,n(3,f=!0)),o){let h=document.getElementById("editor"),_=document.getElementById("total-editor-block");window.innerHeight<_.offsetHeight&&h.scrollTo(0,0)}else{document.getElementById("name-text").innerText=s[0].value,document.getElementById("date-text").innerText=s[1].value,document.getElementById("number-text").innerText=s[2].value,document.getElementById("demerit-points").innerText=s[3].value,document.getElementById("assigned").innerText=s[4].value;let h="",_=document.querySelectorAll("select");_=Array.from(_),console.log(_),_.forEach(b=>{if(b.getAttribute("name")=="hours"){let y=b.value;parseInt(b.value)==0&&(y=12),h+=y+":"}else if(b.getAttribute("name")=="ampm")h+=" "+b.value;else{let y=b.value;parseInt(b.value)==0&&(y="00"),console.log(y),h+=y}}),document.getElementById("time").innerText=h,document.getElementById("demerit-description").innerText=r.value.charAt(0).toLowerCase()+r.value.slice(1),window.innerWidth<=500&&(document.getElementById("flip-switch").style.left="-50px",document.getElementById("flip-switch").setAttribute("data-toggle","1"),document.getElementById("editor").style.left="-100vw");let d=document.getElementById("main-component");if(a)m(d);else{let b=document.getElementById("editor"),y=document.getElementById("flip-switch");b.style.left="-100vw",y.setAttribute("data-toggle","1");let C=Array.from(y.childNodes).filter(Y=>Y.data!=" ");window.innerWidth<=550?y.style.left="-50px":(y.style.left="0px",C[0].style.display="none",b.style.boxShadow="none")}}};return t.$$set=s=>{"printButton"in s&&n(0,a=s.printButton),"buttonText"in s&&n(1,l=s.buttonText)},[a,l,i,f,m,g,u,p]}class Qe extends R{constructor(e){super(),D(this,e,Je,Ge,O,{printButton:0,buttonText:1})}}const{window:Xe}=We;function Ze(t){let e,n,a,l,i,f,m,g,u,p,s,o,r,h,_,d,b,y,C,Y;return s=new Qe({props:{printButton:t[1],buttonText:t[0]}}),h=new ve({props:{view:!0,printbutton:!0,buttonText:"Print"}}),h.$on("click",t[6]),b=new Me({}),{c(){e=w("main"),n=w("div"),a=w("div"),a.innerHTML=`<div class="images svelte-byz1tv"><img src="eye.png" width="35" alt="View" class="svelte-byz1tv"/></div> 

      <div class="images svelte-byz1tv"><img src="generate.png" width="35" alt="View" class="svelte-byz1tv"/></div>`,l=B(),i=w("div"),f=w("div"),m=w("h3"),m.textContent="Write demerit content here",g=B(),u=w("hr"),p=B(),j(s.$$.fragment),o=B(),r=w("div"),j(h.$$.fragment),_=B(),d=w("div"),j(b.$$.fragment),c(a,"id","flip-switch"),c(a,"data-toggle","0"),c(a,"class","svelte-byz1tv"),c(m,"class","svelte-byz1tv"),c(u,"class","svelte-byz1tv"),c(f,"id","total-editor-block"),c(f,"class","svelte-byz1tv"),c(i,"id","editor"),c(i,"class","svelte-byz1tv"),c(d,"id","inner-body"),c(d,"class","svelte-byz1tv"),c(r,"id","preview"),c(r,"class","svelte-byz1tv"),c(n,"id","main-area"),c(n,"class","svelte-byz1tv")},m(T,K){A(T,e,K),v(e,n),v(n,a),v(n,l),v(n,i),v(i,f),v(f,m),v(f,g),v(f,u),v(f,p),S(s,f,null),v(n,o),v(n,r),S(h,r,null),v(r,_),v(r,d),S(b,d,null),y=!0,C||(Y=[I(Xe,"resize",t[4]),I(a,"click",t[5]),I(a,"keydown",et)],C=!0)},p(T,[K]){const X={};K&2&&(X.printButton=T[1]),K&1&&(X.buttonText=T[0]),s.$set(X)},i(T){y||(z(s.$$.fragment,T),z(h.$$.fragment,T),z(b.$$.fragment,T),y=!0)},o(T){H(s.$$.fragment,T),H(h.$$.fragment,T),H(b.$$.fragment,T),y=!1},d(T){T&&k(e),L(s),L(h),L(b),C=!1,W(Y)}}}const et=()=>{};function tt(t,e,n){let l="print",i=!0;const f=function(){let s=!1;return function(o){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(o)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(o.substr(0,4)))&&(s=!0)}(navigator.userAgent||navigator.vendor||window.opera),s};_e(async()=>{let s=document.getElementById("total-editor-block");window.innerHeight>s.offsetHeight&&(s.style.top="50%",s.style.transform="translateY(-50%)"),window.innerWidth-500<=408&&(n(0,l="preview"),n(1,i=!1));let o=document.getElementById("inner-body");if(window.innerWidth-500<=8.5*96&&window.innerWidth-500>=408){let r=1*((window.innerWidth-500)/816);o.style.transform=`scale(${r})`}});const m=s=>{let o=f();console.log(o);let r=window.open("","PRINT",`height=${11*96}px, width=${8.5*96}px`);o&&r.print(),s.style.transform="scale(1.0)";let h=Array.from(s.childNodes);h=h.filter(b=>b.data!=" "),r.document.write("<div id='main-component'></div>");let _=r.document.getElementById("main-component");_.innerHTML=s.innerHTML;let d=Array.from(_.childNodes);d=d.filter(b=>b.data!=" "),_.setAttribute("style",s.getAttribute("style"));for(let b=0;b<d.length;b++)d[b].setAttribute("style",h[b].getAttribute("style"));o||r.print()};return[l,i,408,m,()=>{let s=document.getElementById("total-editor-block");document.getElementById("preview");let o=document.getElementById("inner-body"),r=document.getElementById("editor"),h=document.getElementById("flip-switch"),_=Array.from(h.childNodes).filter(d=>d.data!=" ");if(window.innerHeight<=s.offsetHeight?(s.style.top="0px",s.style.transform="none"):(s.style.top="50%",s.style.transform="translateY(-50%)"),window.innerWidth-500<=8.5*96&&window.innerWidth-500>=408){let d=1*((window.innerWidth-500)/816);o.style.transform=`scale(${d})`,n(1,i=!0),n(0,l="Print"),r.removeAttribute("style"),h.setAttribute("data-toggle","0"),h.style.left="500px",_[0].style.display="block"}else window.innerWidth-500<408&&(n(0,l="Preview"),n(1,i=!1),window.innerWidth<=550?(r.style.boxShadow="none",o.removeAttribute("style"),h.removeAttribute("style"),h.getAttribute("data-toggle")=="1"&&(_[0].style.display="block",h.style.left="-50px")):(o.style.transform="scale(1.0)",h.getAttribute("data-toggle")=="1"?(_[0].style.display="none",h.style.left="0px",r.style.boxShadow="none"):r.style.boxShadow="0 0 0 50vw rgba(0,0,0,0.8)"))},s=>{let o=document.getElementById("flip-switch"),r=Array.from(o.childNodes).filter(h=>h.data!=" ");parseInt(o.getAttribute("data-toggle"))==0?(document.getElementById("editor").style.left="-100vw",window.innerWidth>550?(o.style.left="0px",document.getElementById("editor").style.boxShadow="none",r[0].style.display="none"):o.style.left="-50px",o.setAttribute("data-toggle","1")):(document.getElementById("editor").style.left="0vw",window.innerWidth>550?(document.getElementById("editor").style.boxShadow="0 0 0 50vw rgba(0,0,0,0.8)",o.style.left="500px",r[0].style.display="block"):o.style.left="calc(100vw - 50px)",o.setAttribute("data-toggle","0"))},()=>{console.log("WHAT");let s=document.getElementById("main-component");m(s)}]}class nt extends R{constructor(e){super(),D(this,e,tt,Ze,O,{})}}new nt({target:document.getElementById("app")});
