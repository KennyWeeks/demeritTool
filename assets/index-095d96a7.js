(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();function E(){}function pe(t){return t()}function te(){return Object.create(null)}function O(t){t.forEach(pe)}function me(t){return typeof t=="function"}function j(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function _e(t){return Object.keys(t).length===0}function w(t,e){t.appendChild(e)}function b(t,e,n){t.insertBefore(e,n||null)}function _(t){t.parentNode&&t.parentNode.removeChild(t)}function Q(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function y(t){return document.createElement(t)}function M(t){return document.createTextNode(t)}function A(){return M(" ")}function be(){return M("")}function W(t,e,n,l){return t.addEventListener(e,n,l),()=>t.removeEventListener(e,n,l)}function m(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function xe(t){return Array.from(t.childNodes)}function ge(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function T(t,e,n,l){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,l?"important":"")}function Y(t,e,n){t.classList[n?"add":"remove"](e)}let V;function R(t){V=t}function we(){if(!V)throw new Error("Function called outside component initialization");return V}function ve(t){we().$$.on_mount.push(t)}function Be(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(l=>l.call(this,e))}const L=[],ne=[],K=[],le=[],Ee=Promise.resolve();let X=!1;function Ie(){X||(X=!0,Ee.then(he))}function Z(t){K.push(t)}const J=new Set;let S=0;function he(){if(S!==0)return;const t=V;do{try{for(;S<L.length;){const e=L[S];S++,R(e),Te(e.$$)}}catch(e){throw L.length=0,S=0,e}for(R(null),L.length=0,S=0;ne.length;)ne.pop()();for(let e=0;e<K.length;e+=1){const n=K[e];J.has(n)||(J.add(n),n())}K.length=0}while(L.length);for(;le.length;)le.pop()();X=!1,J.clear(),R(t)}function Te(t){if(t.fragment!==null){t.update(),O(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(Z)}}const U=new Set;let C;function Ae(){C={r:0,c:[],p:C}}function ke(){C.r||O(C.c),C=C.p}function k(t,e){t&&t.i&&(U.delete(t),t.i(e))}function z(t,e,n,l){if(t&&t.o){if(U.has(t))return;U.add(t),C.c.push(()=>{U.delete(t),l&&(n&&t.d(1),l())}),t.o(e)}else l&&l()}const $e=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function N(t){t&&t.c()}function P(t,e,n,l){const{fragment:o,after_update:a}=t.$$;o&&o.m(e,n),l||Z(()=>{const s=t.$$.on_mount.map(pe).filter(me);t.$$.on_destroy?t.$$.on_destroy.push(...s):O(s),t.$$.on_mount=[]}),a.forEach(Z)}function H(t,e){const n=t.$$;n.fragment!==null&&(O(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function ze(t,e){t.$$.dirty[0]===-1&&(L.push(t),Ie(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function D(t,e,n,l,o,a,s,d=[-1]){const c=V;R(t);const i=t.$$={fragment:null,ctx:[],props:a,update:E,not_equal:o,bound:te(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:te(),dirty:d,skip_bound:!1,root:e.target||c.$$.root};s&&s(i.root);let r=!1;if(i.ctx=n?n(t,e.props||{},(f,h,...u)=>{const v=u.length?u[0]:h;return i.ctx&&o(i.ctx[f],i.ctx[f]=v)&&(!i.skip_bound&&i.bound[f]&&i.bound[f](v),r&&ze(t,f)),h}):[],i.update(),r=!0,O(i.before_update),i.fragment=l?l(i.ctx):!1,e.target){if(e.hydrate){const f=xe(e.target);i.fragment&&i.fragment.l(f),f.forEach(_)}else i.fragment&&i.fragment.c();e.intro&&k(t.$$.fragment),P(t,e.target,e.anchor,e.customElement),he()}R(c)}class q{$destroy(){H(this,1),this.$destroy=E}$on(e,n){if(!me(n))return E;const l=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return l.push(n),()=>{const o=l.indexOf(n);o!==-1&&l.splice(o,1)}}$set(e){this.$$set&&!_e(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function We(t){let e,n,l,o;return{c(){e=y("button"),n=M(t[0]),m(e,"class","clickbutton svelte-13cjgb8"),Y(e,"printbutton",t[1]===!0),Y(e,"view",t[2]===!0)},m(a,s){b(a,e,s),w(e,n),l||(o=W(e,"click",t[3]),l=!0)},p(a,[s]){s&1&&ge(n,a[0]),s&2&&Y(e,"printbutton",a[1]===!0),s&4&&Y(e,"view",a[2]===!0)},i:E,o:E,d(a){a&&_(e),l=!1,o()}}}function Ce(t,e,n){let{buttonText:l="click"}=e,{printbutton:o=!1}=e,{view:a=!1}=e;function s(d){Be.call(this,t,d)}return t.$$set=d=>{"buttonText"in d&&n(0,l=d.buttonText),"printbutton"in d&&n(1,o=d.printbutton),"view"in d&&n(2,a=d.view)},[l,o,a,s]}class ye extends q{constructor(e){super(),D(this,e,Ce,We,j,{buttonText:0,printbutton:1,view:2})}}function Pe(t){let e;return{c(){e=y("div"),e.innerHTML=`<img src="header.png" style="margin-top:96px; margin-left:96px;" alt="Fire Academy Header"/> 

    

    <div id="header" style="width:calc(6.5*96px); border-bottom:3px solid #000; display:flex; justify-content:space-between; flex-flow:row; flex-wrap:nowrap; margin-left:96px;"><div class="itemblocks" id="test" style="font-size:18px; margin-bottom:0px; flex-grow:2;"><h3 class="description" style="margin-bottom:0px; font-weight:normal;">Name <span id="name-text"></span></h3></div> 

        <div class="itemblocks" style="font-size:18px; margin-bottom:0px; flex-grow:1;"><h3 class="description" style="margin-bottom:0px; font-weight:normal;">Date <span id="date-text"></span></h3></div> 

        <div class="itemblocks" style="font-size:18px; margin-bottom:0px; flex-grow:1;"><h3 class="description" style="margin-bottom:0px; font-weight:normal;">HR # <span id="number-text"></span></h3></div></div> 

    

    <h3 id="infraction" style="text-transform:uppercase; font-weight:normal; margin-left:96px; font-size:16px;">Infraction:</h3> 

    

    <p id="infraction-starting-line" style="width:calc(6.5*96px); margin-left:96px; font-size:15.25px;">I earned <span id="demerit-points">(#)</span> demerit points at approximately <span id="time">(time)</span> for a/an <span id="infraction-space">infraction</span>. <span id="assigned">(Who assigned
    you the demerits, if Capt. Spell out Captain)</span> assigned me this demerit report because <span id="demerit-description">...</span></p> 

    

    <table cellspacing="0" style="width:calc(6.5*96px); border-bottom:0.25px solid #000; border-right:0.25px solid #000; position:absolute; bottom:96px; left:96px;"><colgroup><col span="1" style="width: 0%;"/> 
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
            <td style="box-shadow:inset 0 0 0 0.25px #000; overflow:hidden; padding:10px; padding-top:5px; padding-bottom:35px; font-style:italic; font-size:14px;">Date</td></tr></table>`,m(e,"id","main-component"),T(e,"width","calc(8.5*96px)"),T(e,"height","calc(11*96px)"),T(e,"position","relative"),T(e,"overflow","hidden"),T(e,"background-color","#fff"),m(e,"class","svelte-17cv2x9")},m(n,l){b(n,e,l)},p:E,i:E,o:E,d(n){n&&_(e)}}}class He extends q{constructor(e){super(),D(this,e,null,Pe,j,{})}}function Se(t){let e,n,l,o,a;return{c(){e=y("label"),e.textContent="Type demerit details here",n=A(),l=y("textarea"),m(e,"for","textarea"),m(e,"class","svelte-1gjyv38"),m(l,"name","textarea"),m(l,"rows","20"),m(l,"placeholder","Write demerit details here ..."),m(l,"class","svelte-1gjyv38")},m(s,d){b(s,e,d),b(s,n,d),b(s,l,d),o||(a=W(l,"focus",Le),o=!0)},p:E,i:E,o:E,d(s){s&&_(e),s&&_(n),s&&_(l),o=!1,a()}}}const Le=t=>{t.target.style.outline="none"};class Ne extends q{constructor(e){super(),D(this,e,null,Se,j,{})}}function Oe(t){let e,n=t[0].replace(/-/g," ")+"",l,o,a,s,d,c;return{c(){e=y("label"),l=M(n),o=y("br"),a=A(),s=y("input"),m(e,"for",t[0]),m(e,"class","svelte-1a7rsed"),m(s,"type",t[1]),m(s,"name",t[0]),m(s,"class","inputtag svelte-1a7rsed"),m(s,"placeholder",t[2]),m(s,"min",t[3]),s.required=!0},m(i,r){b(i,e,r),w(e,l),b(i,o,r),b(i,a,r),b(i,s,r),d||(c=W(s,"focus",je),d=!0)},p(i,[r]){r&1&&n!==(n=i[0].replace(/-/g," ")+"")&&ge(l,n),r&1&&m(e,"for",i[0]),r&2&&m(s,"type",i[1]),r&1&&m(s,"name",i[0]),r&4&&m(s,"placeholder",i[2]),r&8&&m(s,"min",i[3])},i:E,o:E,d(i){i&&_(e),i&&_(o),i&&_(a),i&&_(s),d=!1,c()}}}const je=t=>{t.target.style.outline="None"};function Me(t,e,n){let{labelTag:l=""}=e,{type:o="text"}=e,{def:a=""}=e,{min:s=null}=e;return t.$$set=d=>{"labelTag"in d&&n(0,l=d.labelTag),"type"in d&&n(1,o=d.type),"def"in d&&n(2,a=d.def),"min"in d&&n(3,s=d.min)},[l,o,a,s]}class De extends q{constructor(e){super(),D(this,e,Me,Oe,j,{labelTag:0,type:1,def:2,min:3})}}function ie(t,e,n){const l=t.slice();return l[4]=e[n],l}function oe(t,e,n){const l=t.slice();return l[7]=e[n],l}function re(t,e,n){const l=t.slice();return l[7]=e[n],l}function qe(t){let e,n,l,o,a,s,d,c,i,r,f,h=Array.from(Array(25).keys(),fe),u=[];for(let p=0;p<h.length;p+=1)u[p]=se(re(t,h,p));let v=Array.from(Array(60).keys(),ce),B=[];for(let p=0;p<v.length;p+=1)B[p]=ae(oe(t,v,p));return{c(){e=y("label"),e.textContent="Time of Demerit",n=y("br"),l=A(),o=y("select");for(let p=0;p<u.length;p+=1)u[p].c();a=A(),s=y("select");for(let p=0;p<B.length;p+=1)B[p].c();d=A(),c=y("select"),i=y("option"),i.textContent="AM",r=y("option"),r.textContent="PM",f=y("br"),m(e,"for","hours"),T(e,"font-size","20px"),T(e,"margin-bottom","10px"),T(e,"color","#000"),m(o,"name","hours"),m(o,"id","hours-tag"),T(o,"margin-top","5px"),T(o,"margin-bottom","10px"),T(o,"font-size","18px"),m(s,"name","minutes"),m(s,"id","minutes"),T(s,"font-size","18px"),i.__value="am",i.value=i.__value,r.__value="pm",r.value=r.__value,m(c,"name","ampm"),m(c,"id","ampm-tag"),T(c,"font-size","18px")},m(p,x){b(p,e,x),b(p,n,x),b(p,l,x),b(p,o,x);for(let g=0;g<u.length;g+=1)u[g].m(o,null);b(p,a,x),b(p,s,x);for(let g=0;g<B.length;g+=1)B[g].m(s,null);b(p,d,x),b(p,c,x),w(c,i),w(c,r),b(p,f,x)},p(p,x){if(x&0){h=Array.from(Array(25).keys(),fe);let g;for(g=0;g<h.length;g+=1){const $=re(p,h,g);u[g]?u[g].p($,x):(u[g]=se($),u[g].c(),u[g].m(o,null))}for(;g<u.length;g+=1)u[g].d(1);u.length=h.length}if(x&0){v=Array.from(Array(60).keys(),ce);let g;for(g=0;g<v.length;g+=1){const $=oe(p,v,g);B[g]?B[g].p($,x):(B[g]=ae($),B[g].c(),B[g].m(s,null))}for(;g<B.length;g+=1)B[g].d(1);B.length=v.length}},d(p){p&&_(e),p&&_(n),p&&_(l),p&&_(o),Q(u,p),p&&_(a),p&&_(s),Q(B,p),p&&_(d),p&&_(c),p&&_(f)}}}function Re(t){let e;return{c(){e=y("hr")},m(n,l){b(n,e,l)},p:E,d(n){n&&_(e)}}}function se(t){let e,n=t[7]+"",l;return{c(){e=y("option"),l=M(n),e.__value=t[7],e.value=e.__value},m(o,a){b(o,e,a),w(e,l)},p:E,d(o){o&&_(e)}}}function ae(t){let e,n=t[7]+"",l;return{c(){e=y("option"),l=M(n),e.__value=t[7],e.value=e.__value},m(o,a){b(o,e,a),w(e,l)},p:E,d(o){o&&_(e)}}}function de(t){let e,n,l,o,a;e=new De({props:{labelTag:t[4].charAt(0).toUpperCase()+t[4].slice(1),type:t[2][t[4]][0],def:t[2][t[4]][1]}});function s(i,r){if(i[4]=="hr-number")return Re;if(i[4]=="demerit-points")return qe}let d=s(t),c=d&&d(t);return{c(){N(e.$$.fragment),n=y("br"),l=A(),c&&c.c(),o=be()},m(i,r){P(e,i,r),b(i,n,r),b(i,l,r),c&&c.m(i,r),b(i,o,r),a=!0},p(i,r){c&&c.p(i,r)},i(i){a||(k(e.$$.fragment,i),a=!0)},o(i){z(e.$$.fragment,i),a=!1},d(i){H(e,i),i&&_(n),i&&_(l),c&&c.d(i),i&&_(o)}}}function Ve(t){let e,n,l,o,a,s,d=Object.keys(t[2]),c=[];for(let r=0;r<d.length;r+=1)c[r]=de(ie(t,d,r));const i=r=>z(c[r],1,1,()=>{c[r]=null});return l=new Ne({}),a=new ye({props:{printbutton:t[0],buttonText:t[1]}}),a.$on("click",t[3]),{c(){e=y("div");for(let r=0;r<c.length;r+=1)c[r].c();n=A(),N(l.$$.fragment),o=A(),N(a.$$.fragment),m(e,"id","editor-block"),m(e,"class","svelte-18o191h")},m(r,f){b(r,e,f);for(let h=0;h<c.length;h+=1)c[h].m(e,null);w(e,n),P(l,e,null),w(e,o),P(a,e,null),s=!0},p(r,[f]){if(f&4){d=Object.keys(r[2]);let u;for(u=0;u<d.length;u+=1){const v=ie(r,d,u);c[u]?(c[u].p(v,f),k(c[u],1)):(c[u]=de(v),c[u].c(),k(c[u],1),c[u].m(e,n))}for(Ae(),u=d.length;u<c.length;u+=1)i(u);ke()}const h={};f&1&&(h.printbutton=r[0]),f&2&&(h.buttonText=r[1]),a.$set(h)},i(r){if(!s){for(let f=0;f<d.length;f+=1)k(c[f]);k(l.$$.fragment,r),k(a.$$.fragment,r),s=!0}},o(r){c=c.filter(Boolean);for(let f=0;f<c.length;f+=1)z(c[f]);z(l.$$.fragment,r),z(a.$$.fragment,r),s=!1},d(r){r&&_(e),Q(c,r),H(l),H(a)}}}const fe=t=>t,ce=t=>t;function Fe(t,e,n){let{printButton:l=!0}=e,{buttonText:o="Print"}=e,a={name:["text","Your name ..."],date:["date","02/14/2023"],"hr-number":["text","1111111..."],"demerit-points":["number","1"],"who-assigned-the-demerit":["text","Captain ...."]};ve(async()=>{let d=new Date;document.getElementById("hours-tag").value=d.getHours(),document.getElementById("minutes").value=d.getMinutes(),d.getHours()>12&&(document.getElementById("ampm-tag").value="pm")});const s=()=>{let d=document.querySelectorAll("input"),c=!1;d=Array.from(d),d.forEach(r=>{r.value==""&&(r.style.outline="2px solid #00ff00",c=!0)});let i=document.querySelectorAll("textarea")[0];if(console.log(i.value),i.value==""&&(i.style.outline="2px solid #00ff00",c=!0),c){let r=document.getElementById("editor"),f=document.getElementById("total-editor-block");window.innerHeight<f.offsetHeight&&(console.log("Hello"),r.scrollTo(0,0))}else{document.getElementById("name-text").innerText=d[0].value,document.getElementById("date-text").innerText=d[1].value,document.getElementById("number-text").innerText=d[2].value,document.getElementById("demerit-points").innerText=d[3].value,document.getElementById("assigned").innerText=d[4].value;let r="",f=document.querySelectorAll("select");f=Array.from(f),console.log(f),f.forEach(h=>{if(h.getAttribute("name")=="hours"){let u=h.value;parseInt(h.value)==0&&(u=12),r+=u+":"}else if(h.getAttribute("name")=="ampm")r+=" "+h.value;else{let u=h.value;parseInt(h.value)==0&&(u="00"),console.log(u),r+=u}}),document.getElementById("time").innerText=r,document.getElementById("demerit-description").innerText=i.value.charAt(0).toLowerCase()+i.value.slice(1),window.innerWidth<=500&&(document.getElementById("flip-switch").style.left="-50px",document.getElementById("flip-switch").setAttribute("data-toggle","1"),document.getElementById("editor").style.left="-100vw")}};return t.$$set=d=>{"printButton"in d&&n(0,l=d.printButton),"buttonText"in d&&n(1,o=d.buttonText)},[l,o,a,s]}class Ye extends q{constructor(e){super(),D(this,e,Fe,Ve,j,{printButton:0,buttonText:1})}}const{window:ue}=$e;function Ke(t){let e,n,l,o,a,s,d,c,i,r,f,h,u,v,B,p,x,g,$,ee;return f=new Ye({props:{printButton:t[1],buttonText:t[0]}}),v=new ye({props:{view:!0,printbutton:!0,buttonText:"Print"}}),x=new He({}),{c(){e=y("main"),n=y("div"),l=y("div"),l.innerHTML=`<div class="images svelte-16onp50"><img src="eye.png" width="35" alt="View" class="svelte-16onp50"/></div> 

      <div class="images svelte-16onp50"><img src="generate.png" width="35" alt="View" class="svelte-16onp50"/></div>`,o=A(),a=y("div"),s=y("div"),d=y("h3"),d.textContent="Write demerit content here",c=A(),i=y("hr"),r=A(),N(f.$$.fragment),h=A(),u=y("div"),N(v.$$.fragment),B=A(),p=y("div"),N(x.$$.fragment),m(l,"id","flip-switch"),m(l,"data-toggle","0"),m(l,"class","svelte-16onp50"),m(d,"class","svelte-16onp50"),m(i,"class","svelte-16onp50"),m(s,"id","total-editor-block"),m(s,"class","svelte-16onp50"),m(a,"id","editor"),m(a,"class","svelte-16onp50"),m(p,"id","inner-body"),m(p,"class","svelte-16onp50"),m(u,"id","preview"),m(u,"class","svelte-16onp50"),m(n,"id","main-area"),m(n,"class","svelte-16onp50")},m(I,F){b(I,e,F),w(e,n),w(n,l),w(n,o),w(n,a),w(a,s),w(s,d),w(s,c),w(s,i),w(s,r),P(f,s,null),w(n,h),w(n,u),P(v,u,null),w(u,B),w(u,p),P(x,p,null),g=!0,$||(ee=[W(ue,"load",t[3]),W(ue,"resize",t[4]),W(l,"click",t[5]),W(l,"keydown",Ue)],$=!0)},p(I,[F]){const G={};F&2&&(G.printButton=I[1]),F&1&&(G.buttonText=I[0]),f.$set(G)},i(I){g||(k(f.$$.fragment,I),k(v.$$.fragment,I),k(x.$$.fragment,I),g=!0)},o(I){z(f.$$.fragment,I),z(v.$$.fragment,I),z(x.$$.fragment,I),g=!1},d(I){I&&_(e),H(f),H(v),H(x),$=!1,O(ee)}}}const Ue=()=>{};function Ge(t,e,n){let l="print",o=!0;const a=.5*8.5*96;return[l,o,a,()=>{let i=document.getElementById("total-editor-block"),r=document.getElementById("preview"),f=Array.from(r.childNodes);window.innerWidth>500?f[0].style.display="none":(n(0,l="Preview"),n(1,o=!1)),window.innerHeight>i.offsetHeight&&(i.style.position="absolute",i.style.top="50%",i.style.transform="translateY(-50%)")},()=>{let i=document.getElementById("preview"),r=Array.from(i.childNodes);if(window.innerWidth<=794?(r[0].style.display="block",n(0,l="Preview"),n(1,o=!1)):(r[0].style.display="none",n(0,l="Print"),n(1,o=!0)),window.innerWidth-500<8.5*96&&window.innerWidth-500>a){let h=1*(window.innerWidth-500)/(8.5*96),u=document.getElementById("main-component");u.style.transform=`scale(${h})`,console.log("Test")}else if(window.innerWidth-500>=8.5*96){let f=document.getElementById("main-component");f.style.width="calc(8.5*96px)",f.style.height="calc(11*96px)"}else if(window.innerWidth<=794&&window.innerWidth>=551){let f=document.getElementById("main-component");f.style.transform="scale(1.0)"}else if(window.innerWidth<551){let f=document.getElementById("main-component");f.style.transform="scale(0.5)"}if(window.innerWidth<=550){let f=document.getElementById("flip-switch");parseInt(f.getAttribute("data-toggle"))==1?f.style.left="-50px":f.style.left="calc(100vw - 50px)"}else if(window.innerWidth>550&&window.innerWidth<=794){let f=document.getElementById("flip-switch");parseInt(f.getAttribute("data-toggle"))==1?f.style.left="0px":f.style.left="500px"}else{let f=document.getElementById("flip-switch");f.style.left="500px",f.setAttribute("data-toggle","0");let h=document.getElementById("editor");h.style.left="0px"}},()=>{let i=document.getElementById("flip-switch");parseInt(i.getAttribute("data-toggle"))==0?(document.getElementById("editor").style.left="-100vw",window.innerWidth>500?(i.style.left="0px",document.getElementById("editor").style.boxShadow="none"):i.style.left="-50px",i.setAttribute("data-toggle","1")):(document.getElementById("editor").style.left="0vw",window.innerWidth>500?(document.getElementById("editor").style.boxShadow="0 0 0 50vw rgba(0,0,0,0.8)",i.style.left="500px"):i.style.left="calc(100vw - 50px)",i.setAttribute("data-toggle","0"))}]}class Je extends q{constructor(e){super(),D(this,e,Ge,Ke,j,{})}}new Je({target:document.getElementById("app")});
