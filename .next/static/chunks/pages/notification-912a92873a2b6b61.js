(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[695],{5225:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/notification",function(){return t(6874)}])},7274:function(e,s,t){"use strict";t.d(s,{Z:function(){return c}});var a=t(5893),n=t(4539),l=t(2515),i=t(1415),r=t(7294);function c(e){let{isOpen:s=!1,maxWidth:t="max-w-md",closeModal:c,children:o}=e;return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(n.u,{appear:!0,show:s,as:r.Fragment,children:(0,a.jsxs)(l.V,{as:"div",className:"relative z-10",onClose:c,children:[(0,a.jsx)(n.u.Child,{as:r.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,a.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-25"})}),(0,a.jsx)("div",{className:"fixed inset-0 overflow-y-auto",children:(0,a.jsx)("div",{className:"flex min-h-full items-center justify-center p-4 text-center dark:text-light",children:(0,a.jsx)(n.u.Child,{as:r.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:(0,a.jsxs)(l.V.Panel,{className:"relative w-full ".concat(t," transform rounded-2xl bg-white dark:bg-dark p-4 px-6 text-left align-middle shadow-xl transition-all"),children:[(0,a.jsx)("button",{type:"button",className:"absolute right-4 top-4 focus:outline-none",onClick:c,children:(0,a.jsx)(i.Z,{className:"w-6 h-6"})}),(0,a.jsx)("div",{className:"",children:o})]})})})})]})})})}},468:function(e,s,t){"use strict";t.d(s,{Z:function(){return n}});var a=t(5893);function n(e){let{color:s="primary-500",height:t="10",width:n="10"}=e;return(0,a.jsx)("div",{className:"flex flex-grow justify-center items-center text-".concat(s),children:(0,a.jsx)("div",{children:(0,a.jsxs)("svg",{className:"animate-spin h-".concat(t," w-").concat(n," text-").concat(s),xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,a.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,a.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]})})})}},7514:function(e,s,t){"use strict";var a=t(5893);t(7294);var n=t(3144),l=t(1163),i=t(9473);s.Z=function(e){let{appointment:s}=e,t=(0,l.useRouter)(),{user:r}=(0,i.v9)(e=>e.auth);return(0,a.jsxs)("div",{className:"w-full",children:[(0,a.jsxs)("div",{className:"flex items-center gap-3",children:[(0,a.jsx)("div",{className:"relative w-16 h-16 bg-gray-100 shrink-0 overflow-hidden border rounded-full",children:(0,a.jsx)(n.Z,{src:s.business_name.business_avatar,alt:"",fill:!0,className:"object-cover"})}),(0,a.jsxs)("div",{className:"w-full",children:[(0,a.jsx)("p",{className:"text-lg font-semibold",children:s.business_name.business_name.slice(0,30)}),(0,a.jsx)("p",{className:"text-xs",children:s.business_name.business_tagline}),(0,a.jsx)("div",{className:"flex py-2",children:(0,a.jsxs)("p",{className:"text-sm text-white rounded-full px-2 ".concat((()=>{let e=s.result.status;switch(e){case"Rejected":case"Cancelled":return"bg-red-500";case"Pending":return"bg-yellow-500";case"Completed":return"bg-purple-500";default:return"bg-green-500"}})()),children:["Status: ",s.result.status.trim()]})})]})]}),(0,a.jsxs)("div",{className:"w-full border-b text-sm",children:[(0,a.jsx)("p",{className:"text-lg",children:"Service"}),(0,a.jsxs)("div",{className:"flex justify-between",children:[(0,a.jsx)("p",{children:"Name :"}),(0,a.jsx)("p",{children:s.result.service_name.trim()})]}),(0,a.jsxs)("div",{className:"flex justify-between",children:[(0,a.jsx)("p",{children:"Person Name :"}),(0,a.jsx)("p",{children:s.result.service_person_name.trim()})]})]}),(0,a.jsxs)("div",{className:"w-full mt-2 border-b text-sm",children:[(0,a.jsx)("p",{className:"text-lg",children:"Appointment Date & Time"}),(0,a.jsxs)("div",{className:"flex justify-between",children:[(0,a.jsx)("p",{children:"Date :"}),(0,a.jsx)("p",{children:s.result.date.trim()})]}),(0,a.jsxs)("div",{className:"flex justify-between",children:[(0,a.jsx)("p",{children:"Time :"}),(0,a.jsx)("p",{children:s.result.time.trim()})]})]}),(0,a.jsxs)("div",{className:"w-full mt-2 border-b text-sm",children:[(0,a.jsx)("p",{className:"text-lg",children:"Payment"}),(0,a.jsxs)("div",{className:"flex justify-between",children:[(0,a.jsx)("p",{children:"Price :"}),(0,a.jsxs)("p",{children:[" \xa3 ",s.result.service_charges]})]}),(0,a.jsxs)("div",{className:"flex justify-between",children:[(0,a.jsx)("p",{children:"Payment Method :"}),(0,a.jsx)("p",{children:"Cash"})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"text-lg mt-2",children:"Comment"}),(0,a.jsx)("div",{className:"text-xs",children:null==s?void 0:s.comment})]}),(0,a.jsx)("div",{className:"py-2 mt-3",children:(0,a.jsx)("button",{onClick:()=>t.push("/chat/message?to=".concat(s.business_name.usr_id,"&from=").concat(r._id,"&business_id=").concat(s.business_name._id,"&business_name=").concat(s.business_name.business_name.trim())),className:"border-2 border-primary-500 rounded-md text-primary-500 w-full text-center",children:"SEND MESSAGE"})})]})}},6874:function(e,s,t){"use strict";t.r(s);var a=t(5893),n=t(4104),l=t(7294),i=t(381),r=t.n(i),c=t(7274),o=t(9473),d=t(468),x=t(4379),m=t(1163),u=t(7514);s.default=function(){let e=(0,m.useRouter)(),s=(0,o.I0)(),{user:t}=(0,o.v9)(e=>e.auth),{notifications:i,isLoading:h}=(0,o.v9)(e=>e.notifications),[p,f]=(0,l.useState)(!1),[j,v]=(0,l.useState)();(0,l.useEffect)(()=>{t||e.push("/login")},[t]);let w=async t=>{"Appointment"===t.screen&&await n.Z.get("/api/v1/appointment/".concat(t.service_id)).then(e=>{var s;v(null==e?void 0:null===(s=e.data)||void 0===s?void 0:s.data),f(!0)}),"Chat"===t.screen&&e.push("/chat"),await n.Z.get("/api/v1/notification/view?id=".concat(t._id)).then(e=>{s((0,x.TH)({}))})};return h&&!i?(0,a.jsx)(d.Z,{}):(0,a.jsxs)("div",{className:"flex w-full flex-col flex-grow items-center p-4 lg:p-8",children:[(0,a.jsx)(c.Z,{maxWidth:"max-w-lg",isOpen:p,closeModal:()=>f(!1),children:(0,a.jsx)(u.Z,{appointment:j})}),(0,a.jsxs)("div",{className:"flex flex-col items-center flex-grow w-full max-w-4xl bg-white rounded-lg shadow-md",children:[(0,a.jsx)("p",{className:"w-full text-center text-lg font-semibold py-2 mb-3",children:"Notifications"}),(0,a.jsx)("div",{className:"w-full border-b max-w-xl mx-8"}),(0,a.jsxs)("div",{className:"flex flex-col h-0 flex-grow w-full overflow-y-auto scrollboxbody p-4 lg:p-8",children:[(0,a.jsx)("div",{children:[...i].sort((e,s)=>new Date(e.creationDate)<new Date(s.creationDate)?1:-1).map((e,s)=>(0,a.jsxs)("div",{onClick:()=>w(e),className:" ".concat(e.open?"bg-gray-50":"bg-primary-200"," bg-gray-50 truncate p-4 my-1 rounded-md cursor-pointer hover:scale-[1.02] transition duration-300"),children:[(0,a.jsx)("p",{className:"whitespace-pre-wrap",children:null==e?void 0:e.body}),(0,a.jsx)("p",{className:"text-xs text-gray-400",children:r()(null==e?void 0:e.creationDate).format("MMM Do YY")})]},s))}),!i&&(0,a.jsxs)("div",{className:"flex flex-col flex-grow items-center justify-center",children:[(0,a.jsx)("p",{className:"text-primary-500 text-2xl font-semibold py-2",children:"Oops!"}),(0,a.jsx)("p",{className:"font-medium",children:"No Appointment Available. Search business and make appointment"})]})]})]})]})}},1415:function(e,s,t){"use strict";var a=t(7294);let n=a.forwardRef(function({title:e,titleId:s,...t},n){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true",ref:n,"aria-labelledby":s},t),e?a.createElement("title",{id:s},e):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"}))});s.Z=n}},function(e){e.O(0,[774,888,179],function(){return e(e.s=5225)}),_N_E=e.O()}]);