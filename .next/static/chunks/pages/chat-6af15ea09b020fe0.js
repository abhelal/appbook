(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[180],{813:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/chat",function(){return s(3585)}])},468:function(e,t,s){"use strict";s.d(t,{Z:function(){return n}});var l=s(5893);function n(e){let{color:t="primary-500",height:s="10",width:n="10"}=e;return(0,l.jsx)("div",{className:"flex flex-grow justify-center items-center text-".concat(t),children:(0,l.jsx)("div",{children:(0,l.jsxs)("svg",{className:"animate-spin h-".concat(s," w-").concat(n," text-").concat(t),xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,l.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,l.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]})})})}},935:function(e,t,s){"use strict";var l=s(6809),n=s.n(l);let i=n()("https://api.app-book.co.uk");t.Z=i},3585:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return f}});var l=s(5893),n=s(7294);let i=n.forwardRef(function({title:e,titleId:t,...s},l){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:l,"aria-labelledby":t},s),e?n.createElement("title",{id:t},e):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"}))});var a=s(4104),r=s(3144),c=s(6367),o=s(9473),d=s(468),u=s(935);let m=n.forwardRef(function({title:e,titleId:t,...s},l){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",ref:l,"aria-labelledby":t},s),e?n.createElement("title",{id:t},e):null,n.createElement("path",{fillRule:"evenodd",d:"M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z",clipRule:"evenodd"}))});var x=s(1163);function f(){var e,t,s;let{user:f}=(0,o.v9)(e=>e.auth),v=(0,x.useRouter)(),[h,w]=(0,n.useState)(!1),[p,j]=(0,n.useState)(),[b,g]=(0,n.useState)(!1);return((0,n.useEffect)(()=>{(async function(){u.Z.on("connect",()=>{let e={userId:f._id,socketId:u.Z.id,isOnline:!0};u.Z.emit("set-online",e)}),g(!0),await a.Z.get("/api/v1/chat/all-users/messages").then(e=>j(e.data.data)),g(!1)})()},[]),b)?(0,l.jsx)(d.Z,{}):(0,l.jsx)("div",{className:"flex w-full flex-grow justify-center p-4",children:(0,l.jsxs)("div",{className:"flex flex-col w-full justify-start items-center max-w-4xl bg-white rounded-md pb-8 shadow-lg text-gray-500",children:[(0,l.jsxs)("div",{className:"flex justify-between w-full max-w-xl items-center p-3 pb-2",children:[(0,l.jsx)("button",{onClick:()=>v.push("/"),children:(0,l.jsx)(m,{className:"w-6 h-5 text-primary-500"})}),(0,l.jsx)("div",{className:"tex-lg font-semibold",children:"CHAT"}),(0,l.jsx)("button",{onClick:()=>w(!h),children:(0,l.jsx)(i,{className:"w-6 h-6 ".concat(h?"text-primary-500":"")})})]}),(0,l.jsx)("p",{className:"border-b w-full max-w-xl mb-3"}),(0,l.jsxs)("div",{className:"w-full flex flex-col h-0 flex-grow overflow-y-auto scrollboxmenu px-8",children:[null==p?void 0:p.map((n,i)=>{var a,o,d,u;return(0,l.jsxs)("div",{className:"grid grid-cols-12 border-b py-2 hover:bg-gray-50",children:[(0,l.jsx)("div",{onClick:()=>{var t,s,l;return v.push("/chat/message?to=".concat((0,c.m)(n,f)._id,"&from=").concat(f._id,"&business_id=").concat(null===(t=n.business_id)||void 0===t?void 0:t._id,"&business_name=").concat(null!==(e=null==n?void 0:null===(s=n.business_id)||void 0===s?void 0:s.business_name)&&void 0!==e?e:null===(l=(0,c.m)(n,f))||void 0===l?void 0:l.full_name))},className:"col-span-11 px-3 cursor-pointer",children:(0,l.jsxs)("div",{className:"flex gap-3 justify-between items-center w-full",children:[(0,l.jsx)("div",{className:"relative flex justify-center items-center shrink-0 w-14 h-14 border bg-gray-100 rounded-full overflow-hidden",children:(0,l.jsx)(r.Z,{src:null!==(t=null==n?void 0:null===(a=n.business_id)||void 0===a?void 0:a.business_avatar)&&void 0!==t?t:null==n?void 0:null===(o=n.from)||void 0===o?void 0:o.avatar,alt:"avatar",fill:!0,className:"object-cover"})}),(0,l.jsxs)("div",{className:"w-full h-12",children:[(0,l.jsx)("div",{className:"text-sm font-semibold max-w-[6rem] lg:max-w-xs truncate",children:null!==(s=null==n?void 0:null===(d=n.business_id)||void 0===d?void 0:d.business_name)&&void 0!==s?s:null===(u=(0,c.m)(n,f))||void 0===u?void 0:u.full_name}),(0,l.jsx)("div",{className:"flex text-xs truncate max-w-xl",children:n.message})]}),(0,l.jsx)("div",{className:"shrink-0 whitespace-nowrap text-xs",children:n.time})]})}),(0,l.jsx)("div",{className:"col-span-1 flex justify-center items-center",children:h&&(0,l.jsx)("button",{className:"text-red-500 text-xs",children:"Delete"})})]},i)}),(null==p?void 0:p.length)<1?(0,l.jsxs)("div",{className:"flex flex-col flex-grow items-center justify-center",children:[(0,l.jsx)("p",{className:"text-primary-500 text-2xl font-semibold py-2",children:"Oops!"}),(0,l.jsx)("p",{className:"font-medium",children:"You do not have any message"})]}):null]})]})})}},6367:function(e,t,s){"use strict";function l(e,t){return e.to._id===t._id?e.from:e.to}function n(e){let t=e.reduce((e,t)=>{let s=new Date(t.createdAt).toDateString();return e[s]||(e[s]=[]),e[s].push(t),e},{}),s=Object.keys(t).map(e=>({date:e,chats:t[e]})),l=s.sort((e,t)=>Number(new Date(t.date))-Number(new Date(e.date)));return l}s.d(t,{g:function(){return n},m:function(){return l}})},7020:function(){}},function(e){e.O(0,[809,774,888,179],function(){return e(e.s=813)}),_N_E=e.O()}]);