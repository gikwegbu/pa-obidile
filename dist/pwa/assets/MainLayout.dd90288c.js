import{Q as O,a as I,b as K,c as R,_ as j}from"./candle.e54dcde7.js";import{k as q,c,h as v,l as k,i as U,m as $,n as E,r as y,w as z,p as W,q as D,g as H,s as A,t as G,o as J,u as X,v as Y,x as Z,y as ee,z as te,A as oe,B as F,C as L,a as ne,D as ae,_ as le,d as re,E as ie,G as se,H as ue,I as T,f as g,J as ce,Q as de,K as fe}from"./index.53fbc196.js";var ve=q({name:"QToolbarTitle",props:{shrink:Boolean},setup(e,{slots:f}){const l=c(()=>"q-toolbar__title ellipsis"+(e.shrink===!0?" col-shrink":""));return()=>v("div",{class:l.value},k(f.default))}}),he=q({name:"QToolbar",props:{inset:Boolean},setup(e,{slots:f}){const l=c(()=>"q-toolbar row no-wrap items-center"+(e.inset===!0?" q-toolbar--inset":""));return()=>v("div",{class:l.value,role:"toolbar"},k(f.default))}}),me=q({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:f,emit:l}){const{proxy:{$q:n}}=H(),o=U(E,$);if(o===$)return console.error("QHeader needs to be child of QLayout"),$;const i=y(parseInt(e.heightHint,10)),s=y(!0),h=c(()=>e.reveal===!0||o.view.value.indexOf("H")>-1||n.platform.is.ios&&o.isContainer.value===!0),b=c(()=>{if(e.modelValue!==!0)return 0;if(h.value===!0)return s.value===!0?i.value:0;const t=i.value-o.scroll.value.position;return t>0?t:0}),u=c(()=>e.modelValue!==!0||h.value===!0&&s.value!==!0),x=c(()=>e.modelValue===!0&&u.value===!0&&e.reveal===!0),w=c(()=>"q-header q-layout__section--marginal "+(h.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(u.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),S=c(()=>{const t=o.rows.value.top,m={};return t[0]==="l"&&o.left.space===!0&&(m[n.lang.rtl===!0?"right":"left"]=`${o.left.size}px`),t[2]==="r"&&o.right.space===!0&&(m[n.lang.rtl===!0?"left":"right"]=`${o.right.size}px`),m});function r(t,m){o.update("header",t,m)}function p(t,m){t.value!==m&&(t.value=m)}function P({height:t}){p(i,t),r("size",t)}function V(t){x.value===!0&&p(s,!0),l("focusin",t)}z(()=>e.modelValue,t=>{r("space",t),p(s,!0),o.animate()}),z(b,t=>{r("offset",t)}),z(()=>e.reveal,t=>{t===!1&&p(s,e.modelValue)}),z(s,t=>{o.animate(),l("reveal",t)}),z(o.scroll,t=>{e.reveal===!0&&p(s,t.direction==="up"||t.position<=e.revealOffset||t.position-t.inflectionPoint<100)});const C={};return o.instances.header=C,e.modelValue===!0&&r("size",i.value),r("space",e.modelValue),r("offset",b.value),W(()=>{o.instances.header===C&&(o.instances.header=void 0,r("size",0),r("offset",0),r("space",!1))}),()=>{const t=D(f.default,[]);return e.elevated===!0&&t.push(v("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),t.push(v(O,{debounce:0,onResize:P})),v("header",{class:w.value,style:S.value,onFocusin:V},t)}}}),ge=q({name:"QPageContainer",setup(e,{slots:f}){const{proxy:{$q:l}}=H(),n=U(E,$);if(n===$)return console.error("QPageContainer needs to be child of QLayout"),$;A(G,!0);const o=c(()=>{const i={};return n.header.space===!0&&(i.paddingTop=`${n.header.size}px`),n.right.space===!0&&(i[`padding${l.lang.rtl===!0?"Left":"Right"}`]=`${n.right.size}px`),n.footer.space===!0&&(i.paddingBottom=`${n.footer.size}px`),n.left.space===!0&&(i[`padding${l.lang.rtl===!0?"Right":"Left"}`]=`${n.left.size}px`),i});return()=>v("div",{class:"q-page-container",style:o.value},k(f.default))}});const{passive:N}=Z,be=["both","horizontal","vertical"];var pe=q({name:"QScrollObserver",props:{axis:{type:String,validator:e=>be.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:f}){const l={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let n=null,o,i;z(()=>e.scrollTarget,()=>{b(),h()});function s(){n!==null&&n();const w=Math.max(0,ee(o)),S=te(o),r={top:w-l.position.top,left:S-l.position.left};if(e.axis==="vertical"&&r.top===0||e.axis==="horizontal"&&r.left===0)return;const p=Math.abs(r.top)>=Math.abs(r.left)?r.top<0?"up":"down":r.left<0?"left":"right";l.position={top:w,left:S},l.directionChanged=l.direction!==p,l.delta=r,l.directionChanged===!0&&(l.direction=p,l.inflectionPoint=l.position),f("scroll",{...l})}function h(){o=Y(i,e.scrollTarget),o.addEventListener("scroll",u,N),u(!0)}function b(){o!==void 0&&(o.removeEventListener("scroll",u,N),o=void 0)}function u(w){if(w===!0||e.debounce===0||e.debounce==="0")s();else if(n===null){const[S,r]=e.debounce?[setTimeout(s,e.debounce),clearTimeout]:[requestAnimationFrame(s),cancelAnimationFrame];n=()=>{r(S),n=null}}}const{proxy:x}=H();return z(()=>x.$q.lang.rtl,s),J(()=>{i=x.$el.parentNode,h()}),W(()=>{n!==null&&n(),b()}),Object.assign(x,{trigger:u,getPosition:()=>l}),X}}),ye=q({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:f,emit:l}){const{proxy:{$q:n}}=H(),o=y(null),i=y(n.screen.height),s=y(e.container===!0?0:n.screen.width),h=y({position:0,direction:"down",inflectionPoint:0}),b=y(0),u=y(oe.value===!0?0:F()),x=c(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),w=c(()=>e.container===!1?{minHeight:n.screen.height+"px"}:null),S=c(()=>u.value!==0?{[n.lang.rtl===!0?"left":"right"]:`${u.value}px`}:null),r=c(()=>u.value!==0?{[n.lang.rtl===!0?"right":"left"]:0,[n.lang.rtl===!0?"left":"right"]:`-${u.value}px`,width:`calc(100% + ${u.value}px)`}:null);function p(a){if(e.container===!0||document.qScrollPrevented!==!0){const d={position:a.position.top,direction:a.direction,directionChanged:a.directionChanged,inflectionPoint:a.inflectionPoint.top,delta:a.delta.top};h.value=d,e.onScroll!==void 0&&l("scroll",d)}}function P(a){const{height:d,width:_}=a;let Q=!1;i.value!==d&&(Q=!0,i.value=d,e.onScrollHeight!==void 0&&l("scrollHeight",d),C()),s.value!==_&&(Q=!0,s.value=_),Q===!0&&e.onResize!==void 0&&l("resize",a)}function V({height:a}){b.value!==a&&(b.value=a,C())}function C(){if(e.container===!0){const a=i.value>b.value?F():0;u.value!==a&&(u.value=a)}}let t=null;const m={instances:{},view:c(()=>e.view),isContainer:c(()=>e.container),rootRef:o,height:i,containerHeight:b,scrollbarWidth:u,totalWidth:c(()=>s.value+u.value),rows:c(()=>{const a=e.view.toLowerCase().split(" ");return{top:a[0].split(""),middle:a[1].split(""),bottom:a[2].split("")}}),header:L({size:0,offset:0,space:!1}),right:L({size:300,offset:0,space:!1}),footer:L({size:0,offset:0,space:!1}),left:L({size:300,offset:0,space:!1}),scroll:h,animate(){t!==null?clearTimeout(t):document.body.classList.add("q-body--layout-animate"),t=setTimeout(()=>{t=null,document.body.classList.remove("q-body--layout-animate")},155)},update(a,d,_){m[a][d]=_}};if(A(E,m),F()>0){let _=function(){a=null,d.classList.remove("hide-scrollbar")},Q=function(){if(a===null){if(d.scrollHeight>n.screen.height)return;d.classList.add("hide-scrollbar")}else clearTimeout(a);a=setTimeout(_,300)},B=function(M){a!==null&&M==="remove"&&(clearTimeout(a),_()),window[`${M}EventListener`]("resize",Q)},a=null;const d=document.body;z(()=>e.container!==!0?"add":"remove",B),e.container!==!0&&B("add"),ne(()=>{B("remove")})}return()=>{const a=ae(f.default,[v(pe,{onScroll:p}),v(O,{onResize:P})]),d=v("div",{class:x.value,style:w.value,ref:e.container===!0?void 0:o,tabindex:-1},a);return e.container===!0?v("div",{class:"q-layout-container overflow-hidden",ref:o},[v(O,{onResize:V}),v("div",{class:"absolute-full",style:S.value},[v("div",{class:"scroll",style:r.value},[d])])]):d}}});const we=re({name:"MainLayout",created(){this.$q.addressbarColor.set("#a2e3fa")},components:{},setup(){return{tab:y("")}}}),Se=fe("img",{src:j},null,-1);function ze(e,f,l,n,o,i){const s=ie("router-view");return se(),ue(ye,{view:"hHh lpR fFf"},{default:T(()=>[g(me,{elevated:"",class:"bg-primary text-white"},{default:T(()=>[g(he,{class:"hidden"},{default:T(()=>[g(ve,null,{default:T(()=>[g(I,null,{default:T(()=>[Se]),_:1}),ce(" Forever in our Hearts ")]),_:1}),g(de,{flat:"",round:"",dense:"",icon:"volume_up",class:"q-mr-xs"}),g(K,{modelValue:e.tab,"onUpdate:modelValue":f[0]||(f[0]=h=>e.tab=h),shrink:""},{default:T(()=>[g(R,{name:"tab1",label:"Sign in"}),g(R,{name:"tab2",label:"Invite People"}),g(R,{name:"tab3",label:"Contact Us"})]),_:1},8,["modelValue"])]),_:1})]),_:1}),g(ge,null,{default:T(()=>[g(s)]),_:1})]),_:1})}var Te=le(we,[["render",ze]]);export{Te as default};