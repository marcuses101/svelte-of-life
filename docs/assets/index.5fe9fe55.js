(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))o(l);new MutationObserver(l=>{for(const r of l)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(l){const r={};return l.integrity&&(r.integrity=l.integrity),l.referrerpolicy&&(r.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?r.credentials="include":l.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(l){if(l.ep)return;l.ep=!0;const r=n(l);fetch(l.href,r)}})();function te(){}function je(e,t){for(const n in t)e[n]=t[n];return e}function Be(e){return e()}function Ie(){return Object.create(null)}function K(e){e.forEach(Be)}function Te(e){return typeof e=="function"}function le(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function Ge(e){return Object.keys(e).length===0}function He(e,t,n,o){if(e){const l=Re(e,t,n,o);return e[0](l)}}function Re(e,t,n,o){return e[1]&&o?je(n.ctx.slice(),e[1](o(t))):n.ctx}function We(e,t,n,o){if(e[2]&&o){const l=e[2](o(n));if(t.dirty===void 0)return l;if(typeof l=="object"){const r=[],i=Math.max(t.dirty.length,l.length);for(let u=0;u<i;u+=1)r[u]=t.dirty[u]|l[u];return r}return t.dirty|l}return t.dirty}function De(e,t,n,o,l,r){if(l){const i=Re(t,n,o,r);e.p(i,l)}}function Fe(e){if(e.ctx.length>32){const t=[],n=e.ctx.length/32;for(let o=0;o<n;o++)t[o]=-1;return t}return-1}const qe=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function p(e,t){e.appendChild(t)}function B(e,t,n){e.insertBefore(t,n||null)}function N(e){e.parentNode&&e.parentNode.removeChild(e)}function Ke(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function P(e){return document.createElement(e)}function H(e){return document.createTextNode(e)}function O(){return H(" ")}function Xe(){return H("")}function V(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function J(e){return function(t){return t.preventDefault(),e.call(this,t)}}function b(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function ze(e){return e===""?null:+e}function Ze(e){return Array.from(e.childNodes)}function Le(e,t){t=""+t,e.data!==t&&(e.data=t)}function pe(e,t){e.value=t==null?"":t}function Z(e,t,n,o){n==null?e.style.removeProperty(t):e.style.setProperty(t,n,o?"important":"")}let ge;function Je(){if(ge===void 0){ge=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{ge=!0}}return ge}function Qe(e,t){getComputedStyle(e).position==="static"&&(e.style.position="relative");const o=P("iframe");o.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),o.setAttribute("aria-hidden","true"),o.tabIndex=-1;const l=Je();let r;return l?(o.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",r=V(window,"message",i=>{i.source===o.contentWindow&&t()})):(o.src="about:blank",o.onload=()=>{r=V(o.contentWindow,"resize",t),t()}),p(e,o),()=>{(l||r&&o.contentWindow)&&r(),N(o)}}function Ne(e,t,n){e.classList[n?"add":"remove"](t)}function Ue(e,t,{bubbles:n=!1,cancelable:o=!1}={}){const l=document.createEvent("CustomEvent");return l.initCustomEvent(e,n,o,t),l}let re;function oe(e){re=e}function Ve(){if(!re)throw new Error("Function called outside component initialization");return re}function Ye(e){Ve().$$.on_mount.push(e)}function xe(e){Ve().$$.on_destroy.push(e)}function et(){const e=Ve();return(t,n,{cancelable:o=!1}={})=>{const l=e.$$.callbacks[t];if(l){const r=Ue(t,n,{cancelable:o});return l.slice().forEach(i=>{i.call(e,r)}),!r.defaultPrevented}return!0}}function D(e,t){const n=e.$$.callbacks[t.type];n&&n.slice().forEach(o=>o.call(this,t))}const x=[],ye=[];let ee=[];const Ee=[],tt=Promise.resolve();let ve=!1;function nt(){ve||(ve=!0,tt.then($e))}function ke(e){ee.push(e)}function Ae(e){Ee.push(e)}const Ce=new Set;let Y=0;function $e(){if(Y!==0)return;const e=re;do{try{for(;Y<x.length;){const t=x[Y];Y++,oe(t),ot(t.$$)}}catch(t){throw x.length=0,Y=0,t}for(oe(null),x.length=0,Y=0;ye.length;)ye.pop()();for(let t=0;t<ee.length;t+=1){const n=ee[t];Ce.has(n)||(Ce.add(n),n())}ee.length=0}while(x.length);for(;Ee.length;)Ee.pop()();ve=!1,Ce.clear(),oe(e)}function ot(e){if(e.fragment!==null){e.update(),K(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(ke)}}function rt(e){const t=[],n=[];ee.forEach(o=>e.indexOf(o)===-1?t.push(o):n.push(o)),n.forEach(o=>o()),ee=t}const we=new Set;let Q;function lt(){Q={r:0,c:[],p:Q}}function it(){Q.r||K(Q.c),Q=Q.p}function S(e,t){e&&e.i&&(we.delete(e),e.i(t))}function j(e,t,n,o){if(e&&e.o){if(we.has(e))return;we.add(e),Q.c.push(()=>{we.delete(e),o&&(n&&e.d(1),o())}),e.o(t)}else o&&o()}function Oe(e,t,n){const o=e.$$.props[t];o!==void 0&&(e.$$.bound[o]=n,n(e.$$.ctx[o]))}function U(e){e&&e.c()}function F(e,t,n,o){const{fragment:l,after_update:r}=e.$$;l&&l.m(t,n),o||ke(()=>{const i=e.$$.on_mount.map(Be).filter(Te);e.$$.on_destroy?e.$$.on_destroy.push(...i):K(i),e.$$.on_mount=[]}),r.forEach(ke)}function q(e,t){const n=e.$$;n.fragment!==null&&(rt(n.after_update),K(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function st(e,t){e.$$.dirty[0]===-1&&(x.push(e),nt(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function ie(e,t,n,o,l,r,i,u=[-1]){const a=re;oe(e);const s=e.$$={fragment:null,ctx:[],props:r,update:te,not_equal:l,bound:Ie(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(a?a.$$.context:[])),callbacks:Ie(),dirty:u,skip_bound:!1,root:t.target||a.$$.root};i&&i(s.root);let I=!1;if(s.ctx=n?n(e,t.props||{},(d,m,...v)=>{const z=v.length?v[0]:m;return s.ctx&&l(s.ctx[d],s.ctx[d]=z)&&(!s.skip_bound&&s.bound[d]&&s.bound[d](z),I&&st(e,d)),m}):[],s.update(),I=!0,K(s.before_update),s.fragment=o?o(s.ctx):!1,t.target){if(t.hydrate){const d=Ze(t.target);s.fragment&&s.fragment.l(d),d.forEach(N)}else s.fragment&&s.fragment.c();t.intro&&S(e.$$.fragment),F(e,t.target,t.anchor,t.customElement),$e()}oe(a)}class se{$destroy(){q(this,1),this.$destroy=te}$on(t,n){if(!Te(n))return te;const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(n),()=>{const l=o.indexOf(n);l!==-1&&o.splice(l,1)}}$set(t){this.$$set&&!Ge(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function ut(e){let t,n,o;return{c(){t=P("div"),b(t,"class","svelte-38t2tm"),Ne(t,"on",e[0])},m(l,r){B(l,t,r),n||(o=[V(t,"pointerdown",e[1]),V(t,"pointerenter",e[2]),V(t,"pointerup",e[3]),V(t,"drag",J(e[4])),V(t,"dragstart",J(e[5]))],n=!0)},p(l,[r]){r&1&&Ne(t,"on",l[0])},i:te,o:te,d(l){l&&N(t),n=!1,K(o)}}}function ct(e,t,n){let{isOn:o}=t;function l(s){D.call(this,e,s)}function r(s){D.call(this,e,s)}function i(s){D.call(this,e,s)}function u(s){D.call(this,e,s)}function a(s){D.call(this,e,s)}return e.$$set=s=>{"isOn"in s&&n(0,o=s.isOn)},[o,l,r,i,u,a]}class ft extends se{constructor(t){super(),ie(this,t,ct,ut,le,{isOn:0})}}function at(e){let t,n,o,l;const r=e[1].default,i=He(r,e,e[0],null);return{c(){t=P("button"),i&&i.c(),b(t,"class","svelte-na47l")},m(u,a){B(u,t,a),i&&i.m(t,null),n=!0,o||(l=V(t,"click",e[2]),o=!0)},p(u,[a]){i&&i.p&&(!n||a&1)&&De(i,r,u,u[0],n?We(r,u[0],a,null):Fe(u[0]),null)},i(u){n||(S(i,u),n=!0)},o(u){j(i,u),n=!1},d(u){u&&N(t),i&&i.d(u),o=!1,l()}}}function dt(e,t,n){let{$$slots:o={},$$scope:l}=t;function r(i){D.call(this,e,i)}return e.$$set=i=>{"$$scope"in i&&n(0,l=i.$$scope)},[l,o,r]}class be extends se{constructor(t){super(),ie(this,t,dt,at,le,{})}}function _t(e){let t;return{c(){t=H("Next State")},m(n,o){B(n,t,o)},d(n){n&&N(t)}}}function mt(e){let t;return{c(){t=H("Random")},m(n,o){B(n,t,o)},d(n){n&&N(t)}}}function ht(e){let t;return{c(){t=H("Reset")},m(n,o){B(n,t,o)},d(n){n&&N(t)}}}function pt(e){let t;return{c(){t=H("Pause")},m(n,o){B(n,t,o)},d(n){n&&N(t)}}}function gt(e){let t;return{c(){t=H("Play")},m(n,o){B(n,t,o)},d(n){n&&N(t)}}}function bt(e){let t;function n(r,i){return r[5]?pt:gt}let o=n(e),l=o(e);return{c(){l.c(),t=Xe()},m(r,i){l.m(r,i),B(r,t,i)},p(r,i){o!==(o=n(r))&&(l.d(1),l=o(r),l&&(l.c(),l.m(t.parentNode,t)))},d(r){l.d(r),r&&N(t)}}}function wt(e){let t,n,o,l,r,i,u,a,s,I,d,m,v,z,w,k,L,c,X,f,_,y,g,G,M,ue,T,ce,R,A,ne,fe;return g=new be({props:{$$slots:{default:[_t]},$$scope:{ctx:e}}}),g.$on("click",e[11]),M=new be({props:{$$slots:{default:[mt]},$$scope:{ctx:e}}}),M.$on("click",e[12]),T=new be({props:{$$slots:{default:[ht]},$$scope:{ctx:e}}}),T.$on("click",e[13]),R=new be({props:{$$slots:{default:[bt]},$$scope:{ctx:e}}}),R.$on("click",e[14]),{c(){t=P("section"),n=P("article"),o=P("label"),o.textContent="Columns",l=O(),r=P("input"),a=O(),s=P("span"),I=H(e[1]),d=O(),m=P("article"),v=P("label"),v.textContent="Rows",z=O(),w=P("input"),c=O(),X=P("span"),f=H(e[0]),_=O(),y=P("section"),U(g.$$.fragment),G=O(),U(M.$$.fragment),ue=O(),U(T.$$.fragment),ce=O(),U(R.$$.fragment),b(o,"for","column"),b(r,"type","range"),b(r,"id","columns"),b(r,"min",i=e[3].min),b(r,"max",u=e[3].max),b(r,"step","1"),b(n,"class","range svelte-1kngrvi"),b(v,"for","rows"),b(w,"type","range"),b(w,"id","rows"),b(w,"min",k=e[2].min),b(w,"max",L=e[2].max),b(w,"step","1"),b(m,"class","range svelte-1kngrvi"),b(y,"class","buttons svelte-1kngrvi"),b(t,"class","controls")},m(h,C){B(h,t,C),p(t,n),p(n,o),p(n,l),p(n,r),pe(r,e[1]),p(n,a),p(n,s),p(s,I),p(t,d),p(t,m),p(m,v),p(m,z),p(m,w),pe(w,e[0]),p(m,c),p(m,X),p(X,f),p(t,_),p(t,y),F(g,y,null),p(y,G),F(M,y,null),p(y,ue),F(T,y,null),p(y,ce),F(R,y,null),A=!0,ne||(fe=[V(r,"change",e[7]),V(r,"change",e[8]),V(r,"input",e[8]),V(w,"change",e[9]),V(w,"change",e[10]),V(w,"input",e[10])],ne=!0)},p(h,[C]){(!A||C&8&&i!==(i=h[3].min))&&b(r,"min",i),(!A||C&8&&u!==(u=h[3].max))&&b(r,"max",u),C&2&&pe(r,h[1]),(!A||C&2)&&Le(I,h[1]),(!A||C&4&&k!==(k=h[2].min))&&b(w,"min",k),(!A||C&4&&L!==(L=h[2].max))&&b(w,"max",L),C&1&&pe(w,h[0]),(!A||C&1)&&Le(f,h[0]);const ae={};C&32768&&(ae.$$scope={dirty:C,ctx:h}),g.$set(ae);const de={};C&32768&&(de.$$scope={dirty:C,ctx:h}),M.$set(de);const _e={};C&32768&&(_e.$$scope={dirty:C,ctx:h}),T.$set(_e);const me={};C&32800&&(me.$$scope={dirty:C,ctx:h}),R.$set(me)},i(h){A||(S(g.$$.fragment,h),S(M.$$.fragment,h),S(T.$$.fragment,h),S(R.$$.fragment,h),A=!0)},o(h){j(g.$$.fragment,h),j(M.$$.fragment,h),j(T.$$.fragment,h),j(R.$$.fragment,h),A=!1},d(h){h&&N(t),q(g),q(M),q(T),q(R),ne=!1,K(fe)}}}function yt(e,t,n){let{rowControl:o={min:10,max:100}}=t,{rowValue:l=40}=t,{columnControl:r={min:10,max:100}}=t,{columnValue:i=40}=t,{resizeCallback:u=()=>{}}=t,{isPlaying:a=!1}=t;const s=et(),I=()=>{u()};function d(){i=ze(this.value),n(1,i)}const m=()=>{u()};function v(){l=ze(this.value),n(0,l)}const z=()=>{s("next")},w=()=>{s("random")},k=()=>{s("reset")},L=()=>{s("playPause")};return e.$$set=c=>{"rowControl"in c&&n(2,o=c.rowControl),"rowValue"in c&&n(0,l=c.rowValue),"columnControl"in c&&n(3,r=c.columnControl),"columnValue"in c&&n(1,i=c.columnValue),"resizeCallback"in c&&n(4,u=c.resizeCallback),"isPlaying"in c&&n(5,a=c.isPlaying)},[l,i,o,r,u,a,s,I,d,m,v,z,w,k,L]}class kt extends se{constructor(t){super(),ie(this,t,yt,wt,le,{rowControl:2,rowValue:0,columnControl:3,columnValue:1,resizeCallback:4,isPlaying:5})}}function Ct(e,t,n){const o=Math.floor(e/n),l=e%n,r=o===0?t-1:o-1,i=o===t-1?0:o+1,u=l===0?n-1:l-1,a=l===n-1?0:l+1;return[[r,l],[r,a],[o,a],[i,a],[i,l],[i,u],[o,u],[r,u]]}function Et(e,t,n){return e*n+t}function vt({currentIndex:e,currentCells:t,numberOfColumns:n,numberOfRows:o}){return Ct(e,o,n).reduce((i,[u,a])=>{const s=Et(u,a,n);return i+(t[s]?1:0)},0)}function Pt(e,t,n){return e.map((l,r)=>{const i=vt({currentCells:e,currentIndex:r,numberOfColumns:n,numberOfRows:t});return l&&i===2||i===3})}const{Boolean:Vt}=qe;function Se(e,t,n){const o=e.slice();return o[36]=t[n],o[38]=n,o}function Me(e){let t,n;function o(...r){return e[27](e[38],e[36],...r)}function l(){return e[29](e[38],e[36])}return t=new ft({props:{isOn:e[36]}}),t.$on("pointerdown",o),t.$on("pointerup",e[28]),t.$on("pointerenter",l),{c(){U(t.$$.fragment)},m(r,i){F(t,r,i),n=!0},p(r,i){e=r;const u={};i[0]&128&&(u.isOn=e[36]),t.$set(u)},i(r){n||(S(t.$$.fragment,r),n=!0)},o(r){j(t.$$.fragment,r),n=!1},d(r){q(t,r)}}}function It(e){let t,n,o,l,r,i,u,a,s,I,d,m,v;function z(f){e[24](f)}function w(f){e[25](f)}let k={rowControl:e[9],columnControl:e[10],resizeCallback:e[23],isPlaying:Boolean(e[5])};e[3]!==void 0&&(k.rowValue=e[3]),e[1]!==void 0&&(k.columnValue=e[1]),n=new kt({props:k}),ye.push(()=>Oe(n,"rowValue",z)),ye.push(()=>Oe(n,"columnValue",w)),n.$on("next",e[26]),n.$on("playPause",e[12]),n.$on("random",e[13]),n.$on("reset",e[14]);let L=e[7],c=[];for(let f=0;f<L.length;f+=1)c[f]=Me(Se(e,L,f));const X=f=>j(c[f],1,1,()=>{c[f]=null});return{c(){t=P("section"),U(n.$$.fragment),r=O(),i=P("i"),i.textContent="Hint! Try clicking/dragging on the grid",u=O(),a=P("article"),s=P("div");for(let f=0;f<c.length;f+=1)c[f].c();b(s,"class","grid svelte-17r4b0e"),Z(s,"--columns",e[1]),Z(s,"--rows",e[3]),Z(s,"--cursor",e[8]),Z(s,"--cell-size",`${Pe}px`),b(a,"class","grid-zone svelte-17r4b0e"),ke(()=>e[33].call(a)),b(t,"class","svelte-17r4b0e")},m(f,_){B(f,t,_),F(n,t,null),p(t,r),p(t,i),p(t,u),p(t,a),p(a,s);for(let y=0;y<c.length;y+=1)c[y]&&c[y].m(s,null);I=Qe(a,e[33].bind(a)),d=!0,m||(v=[V(s,"drag",J(e[21])),V(s,"dragstart",J(e[22])),V(s,"pointerdown",J(e[30])),V(s,"pointerup",J(e[31])),V(s,"pointerleave",J(e[32]))],m=!0)},p(f,_){const y={};if(_[0]&512&&(y.rowControl=f[9]),_[0]&1024&&(y.columnControl=f[10]),_[0]&32&&(y.isPlaying=Boolean(f[5])),!o&&_[0]&8&&(o=!0,y.rowValue=f[3],Ae(()=>o=!1)),!l&&_[0]&2&&(l=!0,y.columnValue=f[1],Ae(()=>l=!1)),n.$set(y),_[0]&164048){L=f[7];let g;for(g=0;g<L.length;g+=1){const G=Se(f,L,g);c[g]?(c[g].p(G,_),S(c[g],1)):(c[g]=Me(G),c[g].c(),S(c[g],1),c[g].m(s,null))}for(lt(),g=L.length;g<c.length;g+=1)X(g);it()}(!d||_[0]&2)&&Z(s,"--columns",f[1]),(!d||_[0]&8)&&Z(s,"--rows",f[3]),(!d||_[0]&256)&&Z(s,"--cursor",f[8])},i(f){if(!d){S(n.$$.fragment,f);for(let _=0;_<L.length;_+=1)S(c[_]);d=!0}},o(f){j(n.$$.fragment,f),c=c.filter(Vt);for(let _=0;_<c.length;_+=1)j(c[_]);d=!1},d(f){f&&N(t),q(n),Ke(c,f),I(),m=!1,K(v)}}}const Pe=15,zt=100;function Lt(e,t,n){let o,l,r,i,u,a=0,s=0,I=0,d=0,m=null,v="clear",z=!1,w=!1,k=Array(d*s).fill(!1);Ye(()=>{n(3,d=r),n(1,s=o),_(),f(),L()}),xe(()=>{m&&(clearInterval(m),n(5,m=null))});function L(){n(6,w=!1),m||n(5,m=setInterval(()=>{G()},zt))}function c(){n(6,w=!1),m&&(clearInterval(m),n(5,m=null))}function X(){if(m){c();return}L()}function f(){n(7,k=[...Array(d*s)].map(E=>Math.random()>.66))}function _(){c(),n(7,k=Array(d*s).fill(!1))}function y(E,$){n(7,k=k.map((W,he)=>he===E?!$:W))}function g(E,$){!z||v==="clear"&&!$||v==="fill"&&$||n(7,k=k.map((W,he)=>E!==he?W:v==="fill"))}function G(){w||n(7,k=Pt(k,d,s))}function M(E,$,W){if(n(6,w=!0),n(18,v=W?"clear":"fill"),y($,W),E.target===null)return;E.target.releasePointerCapture(E.pointerId)}function ue(E){D.call(this,e,E)}function T(E){D.call(this,e,E)}const ce=()=>{_()};function R(E){d=E,n(3,d),n(20,r),n(2,I)}function A(E){s=E,n(1,s),n(19,o),n(0,a)}const ne=()=>{c(),G()},fe=(E,$,W)=>{M(W,E,$)},h=()=>{n(6,w=!1),n(4,z=!1)},C=(E,$)=>{g(E,$)},ae=()=>{n(4,z=!0)},de=()=>{n(4,z=!1)},_e=()=>{n(4,z=!1),n(6,w=!1)};function me(){a=this.clientWidth,I=this.clientHeight,n(0,a),n(2,I)}return e.$$.update=()=>{e.$$.dirty[0]&1&&n(19,o=Math.floor(a/(Pe+1))),e.$$.dirty[0]&524288&&n(10,l={min:4,max:o}),e.$$.dirty[0]&524290&&s>o&&(n(1,s=o),_()),e.$$.dirty[0]&4&&n(20,r=Math.floor(I/(Pe+1))),e.$$.dirty[0]&1048576&&n(9,i={min:4,max:r}),e.$$.dirty[0]&1048584&&d>r&&(n(3,d=r),_()),e.$$.dirty[0]&262160&&n(8,u=z?v==="fill"?"cell":"crosshair":"pointer")},[a,s,I,d,z,m,w,k,u,i,l,c,X,f,_,g,G,M,v,o,r,ue,T,ce,R,A,ne,fe,h,C,ae,de,_e,me]}class Nt extends se{constructor(t){super(),ie(this,t,Lt,It,le,{},null,[-1,-1])}}function At(e){let t,n,o,l,r;return l=new Nt({}),{c(){t=P("main"),n=P("h1"),n.innerHTML='<a target="_blank" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" class="svelte-o3zial">Game of Life</a>',o=O(),U(l.$$.fragment),b(n,"class","svelte-o3zial"),b(t,"class","svelte-o3zial")},m(i,u){B(i,t,u),p(t,n),p(t,o),F(l,t,null),r=!0},p:te,i(i){r||(S(l.$$.fragment,i),r=!0)},o(i){j(l.$$.fragment,i),r=!1},d(i){i&&N(t),q(l)}}}class Ot extends se{constructor(t){super(),ie(this,t,null,At,le,{})}}new Ot({target:document.getElementById("app")});