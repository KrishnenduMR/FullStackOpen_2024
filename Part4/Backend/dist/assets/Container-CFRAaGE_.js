import{u as y,c as m,a as j,b as C}from"./ThemeProvider-BTo_H3Ba.js";import{r as $,j as x}from"./index-CZn-nOzL.js";const w=["as","disabled"];function b(n,t){if(n==null)return{};var o={};for(var s in n)if({}.hasOwnProperty.call(n,s)){if(t.indexOf(s)>=0)continue;o[s]=n[s]}return o}function N(n){return!n||n.trim()==="#"}function B({tagName:n,disabled:t,href:o,target:s,rel:r,role:a,onClick:e,tabIndex:i=0,type:c}){n||(o!=null||s!=null||r!=null?n="a":n="button");const l={tagName:n};if(n==="button")return[{type:c||"button",disabled:t},l];const f=u=>{if((t||n==="a"&&N(o))&&u.preventDefault(),t){u.stopPropagation();return}e==null||e(u)},p=u=>{u.key===" "&&(u.preventDefault(),f(u))};return n==="a"&&(o||(o="#"),t&&(o=void 0)),[{role:a??"button",disabled:void 0,tabIndex:t?void 0:i,href:o,target:n==="a"?s:void 0,"aria-disabled":t||void 0,rel:n==="a"?r:void 0,onClick:f,onKeyDown:p},l]}const R=$.forwardRef((n,t)=>{let{as:o,disabled:s}=n,r=b(n,w);const[a,{tagName:e}]=B(Object.assign({tagName:o,disabled:s},r));return x.jsx(e,Object.assign({},r,a,{ref:t}))});R.displayName="Button";const h=$.forwardRef(({as:n,bsPrefix:t,variant:o="primary",size:s,active:r=!1,disabled:a=!1,className:e,...i},c)=>{const l=y(t,"btn"),[f,{tagName:p}]=B({tagName:n,disabled:a,...i}),u=p;return x.jsx(u,{...f,...i,ref:c,disabled:a,className:m(e,l,r&&"active",o&&`${l}-${o}`,s&&`${l}-${s}`,i.href&&a&&"disabled")})});h.displayName="Button";function v({as:n,bsPrefix:t,className:o,...s}){t=y(t,"col");const r=j(),a=C(),e=[],i=[];return r.forEach(c=>{const l=s[c];delete s[c];let f,p,u;typeof l=="object"&&l!=null?{span:f,offset:p,order:u}=l:f=l;const d=c!==a?`-${c}`:"";f&&e.push(f===!0?`${t}${d}`:`${t}${d}-${f}`),u!=null&&i.push(`order${d}-${u}`),p!=null&&i.push(`offset${d}-${p}`)}),[{...s,className:m(o,...e,...i)},{as:n,bsPrefix:t,spans:e}]}const D=$.forwardRef((n,t)=>{const[{className:o,...s},{as:r="div",bsPrefix:a,spans:e}]=v(n);return x.jsx(r,{...s,ref:t,className:m(o,!e.length&&a)})});D.displayName="Col";const O=$.forwardRef(({bsPrefix:n,fluid:t=!1,as:o="div",className:s,...r},a)=>{const e=y(n,"container"),i=typeof t=="string"?`-${t}`:"-fluid";return x.jsx(o,{ref:a,...r,className:m(s,t?`${e}${i}`:e)})});O.displayName="Container";export{h as B,D as C,O as a};
