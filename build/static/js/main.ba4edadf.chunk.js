(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{221:function(e,t,a){},228:function(e,t,a){e.exports={skipLink:"navbar_skipLink__3rR5u"}},242:function(e,t,a){e.exports=a(458)},247:function(e,t,a){},406:function(e,t,a){},423:function(e,t,a){},424:function(e,t,a){},425:function(e,t,a){e.exports={home:"home_home__wf-cy",header:"home_header__3Kz3H"}},458:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(27),l=a.n(c),o=a(30),i=(a(247),a(228)),s=a.n(i),m=a(23),u=a(8),d=a(28),b=function(){var e=Object(m.useFirebase)(),t=Object(o.f)(),a=Object(d.b)(function(e){return!e.firebase.auth.isEmpty});return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:s.a.skipLink},r.a.createElement("a",{href:"#home"},"Skip to Main Content")),r.a.createElement("nav",{className:"navbar navbar-expand-sm navbar-light border-bottom justify-content-between"},r.a.createElement(u.b,{className:"navbar-brand",to:"/"},"react_starter_template"),r.a.createElement("div",{className:"navbar-nav"},r.a.createElement(u.b,{to:"/home",className:"nav-item nav-link active"},"Home"),a?r.a.createElement(r.a.Fragment,null,r.a.createElement(u.b,{to:"/admin",className:"nav-item nav-link "},"Account"),r.a.createElement("button",{variant:"outline-secondary",className:"nav-item nav-link ",onClick:function(){e.auth().signOut().then(function(){console.log("signed out"),t.push("/sign-in")}).catch(function(e){console.log(e)})}},"Logout")):r.a.createElement(u.b,{to:"/sign-in"},"Sign In"))))},p=a(146),f=a(19),h=a.n(f),E=a(50),g=a(6),v=a(40),N=a.n(v);a(459),a(401),a(403);N.a.initializeApp({apiKey:"AIzaSyAqqxQff_in9_UHAETeo7kBGIiLpjjMH4U",authDomain:"gotit-cbe1b.firebaseapp.com",databaseURL:"https://gotit-cbe1b.firebaseio.com",projectId:"gotit-cbe1b",storageBucket:"gotit-cbe1b.appspot.com",messagingSenderId:"913552603463",appId:"1:913552603463:web:5ee3606befba7deb2f7462",measurementId:"G-TF4470ZXNL"});N.a.auth(),N.a.firestore();var y=N.a.storage(),j=a(461),O=(a(406),a(63)),w=a.n(O),k=(w.a.create({baseURL:"http://localhost:5000/api"}),w.a.create({baseURL:"https://gotit-development.herokuapp.com/api"})),x=function(){var e=Object(d.b)(function(e){return e.firebase.auth}),t=Object(n.useState)(""),a=Object(g.a)(t,2),c=(a[0],a[1]),l=Object(n.useState)({imgUrl:""}),o=Object(g.a)(l,2),i=o[0],s=o[1],m=e.isEmpty?void 0:e.uid,u=Object(n.useState)(!1),b=Object(g.a)(u,2),f=b[0],v=b[1],N=Object(n.useState)(""),O=Object(g.a)(N,2),w=O[0],x=O[1],S=Object(n.useState)(""),C=Object(g.a)(S,2),L=C[0],_=C[1],F=Object(n.useState)([]),I=Object(g.a)(F,2),T=I[0],D=I[1],R=function(){var e=Object(E.a)(h.a.mark(function e(t){return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.post("/images",{imgUrl:t}).then(function(e){e.data.length>0?D(e.data):D([{name:"No Matches"}])});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),P=function(){var e=Object(E.a)(h.a.mark(function e(t){return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:""===t&&D([{name:"Error: not an image, the image file is a ".concat(typeof t)}]),y.ref("".concat(m,"/images/").concat(t.name)).put(t).on("state_changed",function(e){v(!f),console.log(e)},function(e){console.log(e)},Object(E.a)(h.a.mark(function e(){var a,n,r;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.ref("".concat(m,"/images")).child(t.name).getDownloadURL();case 2:a=e.sent,r={src:n=a||{},alt:t.name,innerTitle:w,innerDetails:L},s(function(e){return Object(p.a)({},r,e,{imgUrl:n})}),R(n);case 7:case"end":return e.stop()}},e)})));case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"image-upload container"},i.src&&r.a.createElement("div",null,r.a.createElement("img",{src:i.imgUrl,alt:i.alt,height:400,width:400})),f&&r.a.createElement(j.a,{animation:"border",role:"status"},r.a.createElement("span",{className:"sr-only"},"Loading...")),r.a.createElement("form",{onSubmit:P},r.a.createElement("input",{name:"setTitle",value:w,onChange:function(e){return x(e.target.value)},placeholder:"Title"}),r.a.createElement("textarea",{className:"input-group-text",name:"setTitle",value:L,onChange:function(e){return _(e.target.value)},placeholder:"Details"}),r.a.createElement("label",{htmlFor:"myfile"},"Select a file:"),r.a.createElement("input",{type:"file",id:"myfile",onChange:function(e){var t=e.target.files[0];c(t),P(t)},accept:"image/*"})),r.a.createElement("ul",null,r.a.createElement("p",null,"Results"),T.length>0&&T.map(function(e,t){return r.a.createElement("li",{key:t},e.name)})))},S=(a(423),function(e){var t=e.headingStyle,a=e.headingText;return r.a.createElement(t,{className:"heading"},a)}),C=a(462),L=a(463),_=(a(424),function(e){var t=e.headingStyle,a=e.headingText,n=e.buttonType,c=e.buttonText;return r.a.createElement("div",{className:"header"},r.a.createElement(C.a,{fluid:!0},r.a.createElement(S,{headingStyle:t,headingText:a}),r.a.createElement(L.a,{variant:n},c)))}),F=(a(425),function(){return r.a.createElement("main",{id:"home",className:"home"},r.a.createElement(_,{headingStyle:"h1",headingText:"Welcome",buttonType:"primary",buttonText:"Learn more"}),r.a.createElement(x,null))}),I=a(241);var T=function(e){var t=e.role,a=e.children,c=Object(I.a)(e,["role","children"]),l=Object(d.b)(function(e){return e.firebase.auth}),i=Object(n.useState)(!0),s=Object(g.a)(i,2),m=s[0],u=s[1];return void 0===t&&(t=!1),r.a.createElement(o.a,Object.assign({},c,{render:function(e){return l.isEmpty?m?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"alert alert-danger login-alert",role:"alert"},"Please login first!",r.a.createElement("button",{className:"btn-success alert-close-btn",onClick:function(){return u(!1)}},"X"))):r.a.createElement(F,e):a}}))},D=a(65),R=a(464),P=a(465),U=function(e){var t=e.heading,a=e.body,c=e.type,l=e.small,o=e.variant,i=e.confirmButtonText,s=e.handleConfirm,m=e.style,u=Object(n.useState)(!0),d=Object(g.a)(u,2),b=d[0],p=d[1];return b&&("alert"===c?r.a.createElement(R.a,{variant:o,onClose:function(){return p(!1)},style:m,dismissible:!0},r.a.createElement(R.a.Heading,null,t),r.a.createElement("p",null,a),i&&r.a.createElement(L.a,{variant:"outline-danger",onClick:s},i," ")):"toast"===c&&r.a.createElement(P.a,{onClose:function(){return p(!1)},style:m},r.a.createElement(P.a.Header,null,r.a.createElement("strong",{className:"mr-auto"},t.toUpperCase()),r.a.createElement("small",null,l)),r.a.createElement(P.a.Body,null,a)))},A=(a(221),function(){var e=Object(m.useFirebase)(),t=Object(o.f)(),a=Object(n.useState)(""),c=Object(g.a)(a,2),l=c[0],i=c[1],s=Object(n.useState)(""),d=Object(g.a)(s,2),b=d[0],p=d[1],f=Object(n.useState)([]),h=Object(g.a)(f,2),E=h[0],v=h[1],N=function(a){var n=l.length>=1?l:"",r=b.length>=1?b:"";e.login({provider:"email"===a?null:a,type:"popup",email:n,password:r}).then(function(){t.push("/admin")}).catch(function(e){e.code.includes("account-exists")&&v([].concat(Object(D.a)(E),["Account Exists"]))})};return r.a.createElement("div",{className:"login__page"},E.length>=1&&r.a.createElement(U,{type:"alert",variant:"danger",heading:"Error",body:E.map(function(e,t){return r.a.createElement("div",{key:t},e)})}),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"card col-md-4 col-md-offset-4"},r.a.createElement("div",{className:"login__card"},r.a.createElement("div",{className:"card-block"},r.a.createElement("form",{name:"userform",method:"post"},r.a.createElement("h3",null,"Log In "),r.a.createElement(u.b,{to:"sign-up"},"Sign up"),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"exampleInputEmail1"},"Email address"),r.a.createElement("input",{type:"email",className:"form-control",id:"exampleInputEmail1",placeholder:"Email",name:"email",required:!0,onChange:function(e){return i(e.target.value)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"exampleInputPassword1"},"Password"),r.a.createElement("input",{type:"password",className:"form-control",id:"exampleInputPassword1",placeholder:"Password",name:"password",required:!0,onChange:function(e){return p(e.target.value)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{type:"buton",className:"btn btn-primary btn-block",onClick:function(e){e.preventDefault(),N("email")}},"Login with Email")),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{type:"buton",className:"btn btn-block",onClick:function(e){e.preventDefault(),N("facebook")}},r.a.createElement("i",{className:"fa fa-facebook","aria-hidden":"true"}),"Login with Facebook"),r.a.createElement("button",{type:"button",className:"btn btn-block",onClick:function(e){e.preventDefault(),N("twitter")}},r.a.createElement("i",{className:"fa fa-twitter","aria-hidden":"true"}),"Login with Twitter"),r.a.createElement("button",{type:"button",className:"btn btn-block",onClick:function(e){e.preventDefault(),N("github")}},r.a.createElement("i",{className:"fa fa-github","aria-hidden":"true"}),"Login with Github"),r.a.createElement("button",{type:"button",className:"btn btn-block",onClick:function(e){e.preventDefault(),N("google")}},r.a.createElement("i",{className:"fa fa-google","aria-hidden":"true"}),"Login with Google")))))))))}),G=function(){var e=Object(m.useFirebase)(),t=Object(o.f)(),a=Object(n.useState)(""),c=Object(g.a)(a,2),l=c[0],i=c[1],s=Object(n.useState)(""),d=Object(g.a)(s,2),b=d[0],p=d[1],f=Object(n.useState)([]),h=Object(g.a)(f,2),E=h[0],v=h[1],N=function(a){var n=l.length>=1?l:"",r=b.length>=1?b:"";"email"===a?e.createUser({email:l,password:b}).then(function(){t.push("/home")}).catch(function(e){e.code.includes("account-exists")&&v([].concat(Object(D.a)(E),["Account Exists"]))}):e.login({provider:"email"===a?null:a,type:"popup",email:n,password:r}).then(function(){t.push("/home")}).catch(function(e){e.code.includes("account-exists")&&v([].concat(Object(D.a)(E),["Account Exists"]))})};return r.a.createElement("div",{className:"login__page"},E.length>=1&&r.a.createElement(U,{type:"alert",variant:"danger",heading:"Error",body:E.map(function(e,t){return r.a.createElement("div",{key:t},e)})}),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"card col-md-4 col-md-offset-4"},r.a.createElement("div",{className:"login__card"},r.a.createElement("div",{className:"card-block"},r.a.createElement("form",{name:"userform",method:"post"},r.a.createElement("h3",null,"Sign up "),r.a.createElement(u.b,{to:"sign-in"},"Log In"),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"exampleInputEmail1"},"Email address"),r.a.createElement("input",{type:"email",className:"form-control",id:"exampleInputEmail1",placeholder:"Email",name:"email",required:!0,onChange:function(e){return i(e.target.value)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"exampleInputPassword1"},"Password"),r.a.createElement("input",{type:"password",className:"form-control",id:"exampleInputPassword1",placeholder:"Password",name:"password",required:!0,onChange:function(e){return p(e.target.value)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{type:"buton",className:"btn btn-primary btn-block",onClick:function(e){e.preventDefault(),N("email")}},"Login with Email")),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{type:"buton",className:"btn btn-block",onClick:function(e){e.preventDefault(),N("facebook")}},r.a.createElement("i",{className:"fa fa-facebook","aria-hidden":"true"}),"Login with Facebook"),r.a.createElement("button",{type:"button",className:"btn btn-block",onClick:function(e){e.preventDefault(),N("twitter")}},r.a.createElement("i",{className:"fa fa-twitter","aria-hidden":"true"}),"Login with Twitter"),r.a.createElement("button",{type:"button",className:"btn btn-block",onClick:function(e){e.preventDefault(),N("github")}},r.a.createElement("i",{className:"fa fa-github","aria-hidden":"true"}),"Login with Github"),r.a.createElement("button",{type:"button",className:"btn btn-block",onClick:function(e){e.preventDefault(),N("google")}},r.a.createElement("i",{className:"fa fa-google","aria-hidden":"true"}),"Login with Google")))))))),r.a.createElement("h1",null,"Sign In"))},H=function(){return r.a.createElement("div",{className:""},"Admin")},q=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(b,null),r.a.createElement(o.c,null,r.a.createElement(T,{exact:!0,path:"/admin"},r.a.createElement(H,null)),r.a.createElement(o.a,{path:"/home",component:F}),r.a.createElement(o.a,{path:"/sign-in",component:A}),r.a.createElement(o.a,{path:"/sign-up",component:G})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var B=a(234),z=a(235),M=a(239),J=a(236),K=a(240),X=function(){return r.a.createElement("div",{id:"notfound"},r.a.createElement("div",{className:"notfound"},r.a.createElement("div",{className:"notfound-404"},r.a.createElement("h1",null,"404")),r.a.createElement(S,{headingStyle:"h1"},"Oops, The Page you are looking for can't be found!"),r.a.createElement(u.b,{to:"/"},r.a.createElement("span",{className:"arrow"}),"Return To Homepage")))},Q=function(e){function t(e){var a;return Object(B.a)(this,t),(a=Object(M.a)(this,Object(J.a)(t).call(this,e))).state={hasError:!1},a}return Object(K.a)(t,e),Object(z.a)(t,[{key:"componentDidCatch",value:function(e,t){}},{key:"render",value:function(){return this.state.hasError?r.a.createElement(X,null):this.props.children}}],[{key:"getDerivedStateFromError",value:function(e){return{hasError:!0}}}]),t}(r.a.Component),W=Object(o.g)(Q),Z=a(93),$=a(29),V=a(237),Y={},ee=Object($.c)({errors:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Y,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ERRORS":return t.payload;default:return e}},firebase:m.firebaseReducer,firestore:Z.firestoreReducer}),te=a(238),ae=Object(te.createLogger)(),ne=[V.a,ae],re=Object($.e)(ee,{},Object($.d)($.a.apply(void 0,ne))),ce=(a(457),{firebase:N.a,config:{userProfile:"users",useFirestoreForProfile:!0},dispatch:re.dispatch,createFirestoreInstance:Z.createFirestoreInstance});l.a.render(r.a.createElement(d.a,{store:re},r.a.createElement(m.ReactReduxFirebaseProvider,ce,r.a.createElement(u.a,{basename:"gotit"},r.a.createElement(W,null,r.a.createElement(q,null))))),document.getElementById("root"))}},[[242,1,2]]]);
//# sourceMappingURL=main.ba4edadf.chunk.js.map