import{r as B,j as s,L as h}from"./index-DXCOnjWZ.js";import{a as j,C as $,B as w}from"./Container-4D1wr2S1.js";import{u as R,a as g,b as C,c as E}from"./ThemeProvider-UJHJfo8x.js";const i=B.forwardRef(({bsPrefix:c,className:l,as:f="div",...a},m)=>{const r=R(c,"row"),p=g(),u=C(),x=`${r}-cols`,n=[];return p.forEach(e=>{const o=a[e];delete a[e];let t;o!=null&&typeof o=="object"?{cols:t}=o:t=o;const d=e!==u?`-${e}`:"";t!=null&&n.push(`${x}${d}-${t}`)}),s.jsx(f,{ref:m,...a,className:E(l,r,...n)})});i.displayName="Row";function y(){return s.jsx(j,{children:s.jsx(i,{children:s.jsxs($,{children:[s.jsx("h1",{children:"Welcome to the Home Page!"}),s.jsx(w,{as:h,to:"/bloglist",children:"Go to Blog List"})]})})})}export{y as default};
