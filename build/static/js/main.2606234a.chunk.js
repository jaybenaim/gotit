(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{220:function(e,t,a){},227:function(e,t,a){e.exports={skipLink:"navbar_skipLink__3rR5u"}},243:function(e,t,a){e.exports=a(460)},248:function(e,t,a){},423:function(e,t,a){},425:function(e,t,a){},426:function(e,t,a){},427:function(e,t,a){e.exports={home:"home_home__wf-cy",header:"home_header__3Kz3H"}},460:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(26),o=a.n(c),l=a(29),i=(a(248),a(227)),u=a.n(i),s=a(22),m=a(8),d=a(27),f=function(){var e=Object(s.useFirebase)(),t=Object(l.f)(),a=Object(d.b)(function(e){return!e.firebase.auth.isEmpty});return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:u.a.skipLink},r.a.createElement("a",{href:"#home"},"Skip to Main Content")),r.a.createElement("nav",{className:"navbar navbar-expand-sm navbar-light border-bottom justify-content-between"},r.a.createElement(m.b,{className:"navbar-brand",to:"/"},"react_starter_template"),r.a.createElement("div",{className:"navbar-nav"},r.a.createElement(m.b,{to:"/home",className:"nav-item nav-link active"},"Home"),a?r.a.createElement(r.a.Fragment,null,r.a.createElement(m.b,{to:"/admin",className:"nav-item nav-link "},"Account"),r.a.createElement("button",{variant:"outline-secondary",className:"nav-item nav-link ",onClick:function(){e.auth().signOut().then(function(){console.log("signed out"),t.push("/sign-in")}).catch(function(e){console.log(e)})}},"Logout")):r.a.createElement(m.b,{to:"/sign-in"},"Sign In"))))},b=a(242),p=a(40),h=a.n(p),g=a(95),E=a(5),v=a(90),y=a.n(v),j=(y.a.create({baseURL:"http://localhost:5000/api"}),a(39)),w=a.n(j);a(461),a(418),a(420);w.a.initializeApp({apiKey:"AIzaSyAqqxQff_in9_UHAETeo7kBGIiLpjjMH4U",authDomain:"gotit-cbe1b.firebaseapp.com",databaseURL:"https://gotit-cbe1b.firebaseio.com",projectId:"gotit-cbe1b",storageBucket:"gotit-cbe1b.appspot.com",messagingSenderId:"913552603463",appId:"1:913552603463:web:5ee3606befba7deb2f7462",measurementId:"G-TF4470ZXNL"});w.a.auth(),w.a.firestore();var O=w.a.storage(),N=a(463),k=(a(423),a(230)),x=a.n(k);a(424);function S(e,t){var a;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(a=function(e,t){if(!e)return;if("string"===typeof e)return C(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return C(e,t)}(e))||t&&e&&"number"===typeof e.length){a&&(e=a);var n=0,r=function(){};return{s:r,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,o=!0,l=!1;return{s:function(){a=e[Symbol.iterator]()},n:function(){var e=a.next();return o=e.done,e},e:function(e){l=!0,c=e},f:function(){try{o||null==a.return||a.return()}finally{if(l)throw c}}}}function C(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var _=function(){var e=Object(d.b)(function(e){return e.firebase.auth}),t=Object(n.useState)(""),a=Object(E.a)(t,2),c=a[0],o=a[1],l=Object(n.useState)({imgUrl:""}),i=Object(E.a)(l,2),u=i[0],s=i[1],m=Object(n.useState)(""),f=Object(E.a)(m,2),p=f[0],v=f[1],j=e.isEmpty?void 0:e.uid,w=Object(n.useState)(""),k=Object(E.a)(w,2),C=k[0],_=k[1],I=Object(n.useState)(""),T=Object(E.a)(I,2),L=T[0],F=T[1],A=Object(n.useState)([]),D=Object(E.a)(A,2),P=D[0],R=D[1],U=Object(n.useState)(!1),G=Object(E.a)(U,2),H=G[0],M=G[1],q=function(){var e=Object(g.a)(h.a.mark(function e(t){var a,n,r,c,o,l,i;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t,e.next=4,y.a.post("https://api.clarifai.com/v2/models/".concat("aaa03c23b3724a16a56b629203edc62c","/outputs"),{inputs:[{data:{image:{url:a}}}],model:{output_info:{output_config:{max_concepts:40,min_value:.987}}}},{headers:{Authorization:"Key ".concat("549a5d61efb24ea4b53939b4eaabdde8")}});case 4:if(n=e.sent,(r=n.data.outputs[0].data.concepts).length>0){c=[],o=S(r);try{for(o.s();!(l=o.n()).done;)i=l.value,c.push({name:i.name,value:i.value})}catch(u){o.e(u)}finally{o.f()}R(r)}case 7:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),B=function(){var e=Object(g.a)(h.a.mark(function e(t){var a;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t&&t.preventDefault(),""===c&&R([{name:"Error: not an image, the image file is a ".concat(typeof c)}]),!p){e.next=6;break}return a=Math.floor(1e6*Math.random()),e.next=6,O.ref("".concat(j,"/images/temp_").concat(a)).putString(p,"data_url").then(function(){var e=Object(g.a)(h.a.mark(function e(t){var n,r,o;return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("uploaded base64 image"),console.log(t),e.next=4,O.ref("".concat(j,"/images")).child("temp_".concat(a)).getDownloadURL();case 4:n=e.sent,o={src:r=n||{},alt:c.name,innerTitle:C,innerDetails:L},s(function(e){return Object(b.a)({},o,e,{imgUrl:r})}),q(r);case 9:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()).catch(function(e){return console.log(e)});case 6:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"image-upload container"},u.src&&r.a.createElement("div",null,r.a.createElement("img",{src:u.imgUrl,alt:u.alt,height:400,width:400})),r.a.createElement("form",{onSubmit:B},r.a.createElement("input",{name:"setTitle",value:C,onChange:function(e){return _(e.target.value)},placeholder:"Title"}),r.a.createElement("textarea",{className:"input-group-text",name:"setTitle",value:L,onChange:function(e){return F(e.target.value)},placeholder:"Details"}),r.a.createElement("input",{type:"file",onChange:function(e){var t=e.target.files[0];o(t)},capture:"camera"}),r.a.createElement(N.a,{type:"submit"},"Add")),r.a.createElement(N.a,{onClick:function(){M(!H)}},"Take photo"),H&&r.a.createElement(x.a,{onTakePhoto:function(e){!function(e){v(e),B()}(e)},onCameraStop:function(){},imageType:"jpg",isFullscreen:!0,idealFacingMode:"environment",isSilentMode:!0}),r.a.createElement("ul",null,r.a.createElement("p",null,"Results"),P.length>0&&P.map(function(e,t){return r.a.createElement("li",{key:t},e.name)})))},I=(a(425),function(e){var t=e.headingStyle,a=e.headingText;return r.a.createElement(t,{className:"heading"},a)}),T=a(464),L=(a(426),function(e){var t=e.headingStyle,a=e.headingText,n=e.buttonType,c=e.buttonText;return r.a.createElement("div",{className:"header"},r.a.createElement(T.a,{fluid:!0},r.a.createElement(I,{headingStyle:t,headingText:a}),r.a.createElement(N.a,{variant:n},c)))}),F=(a(427),function(){return r.a.createElement("main",{id:"home",className:"home"},r.a.createElement(L,{headingStyle:"h1",headingText:"Welcome",buttonType:"primary",buttonText:"Learn more"}),r.a.createElement(_,null))}),A=a(241);var D=function(e){var t=e.role,a=e.children,c=Object(A.a)(e,["role","children"]),o=Object(d.b)(function(e){return e.firebase.auth}),i=Object(n.useState)(!0),u=Object(E.a)(i,2),s=u[0],m=u[1];return void 0===t&&(t=!1),r.a.createElement(l.a,Object.assign({},c,{render:function(e){return o.isEmpty?s?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"alert alert-danger login-alert",role:"alert"},"Please login first!",r.a.createElement("button",{className:"btn-success alert-close-btn",onClick:function(){return m(!1)}},"X"))):r.a.createElement(F,e):a}}))},P=a(63),R=a(465),U=a(466),G=function(e){var t=e.heading,a=e.body,c=e.type,o=e.small,l=e.variant,i=e.confirmButtonText,u=e.handleConfirm,s=e.style,m=Object(n.useState)(!0),d=Object(E.a)(m,2),f=d[0],b=d[1];return f&&("alert"===c?r.a.createElement(R.a,{variant:l,onClose:function(){return b(!1)},style:s,dismissible:!0},r.a.createElement(R.a.Heading,null,t),r.a.createElement("p",null,a),i&&r.a.createElement(N.a,{variant:"outline-danger",onClick:u},i," ")):"toast"===c&&r.a.createElement(U.a,{onClose:function(){return b(!1)},style:s},r.a.createElement(U.a.Header,null,r.a.createElement("strong",{className:"mr-auto"},t.toUpperCase()),r.a.createElement("small",null,o)),r.a.createElement(U.a.Body,null,a)))},H=(a(220),function(){var e=Object(s.useFirebase)(),t=Object(l.f)(),a=Object(n.useState)(""),c=Object(E.a)(a,2),o=c[0],i=c[1],u=Object(n.useState)(""),d=Object(E.a)(u,2),f=d[0],b=d[1],p=Object(n.useState)([]),h=Object(E.a)(p,2),g=h[0],v=h[1],y=function(a){var n=o.length>=1?o:"",r=f.length>=1?f:"";e.login({provider:"email"===a?null:a,type:"popup",email:n,password:r}).then(function(){t.push("/admin")}).catch(function(e){e.code.includes("account-exists")&&v([].concat(Object(P.a)(g),["Account Exists"]))})};return r.a.createElement("div",{className:"login__page"},g.length>=1&&r.a.createElement(G,{type:"alert",variant:"danger",heading:"Error",body:g.map(function(e,t){return r.a.createElement("div",{key:t},e)})}),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"card col-md-4 col-md-offset-4"},r.a.createElement("div",{className:"login__card"},r.a.createElement("div",{className:"card-block"},r.a.createElement("form",{name:"userform",method:"post"},r.a.createElement("h3",null,"Log In "),r.a.createElement(m.b,{to:"sign-up"},"Sign up"),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"exampleInputEmail1"},"Email address"),r.a.createElement("input",{type:"email",className:"form-control",id:"exampleInputEmail1",placeholder:"Email",name:"email",required:!0,onChange:function(e){return i(e.target.value)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"exampleInputPassword1"},"Password"),r.a.createElement("input",{type:"password",className:"form-control",id:"exampleInputPassword1",placeholder:"Password",name:"password",required:!0,onChange:function(e){return b(e.target.value)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{type:"buton",className:"btn btn-primary btn-block",onClick:function(e){e.preventDefault(),y("email")}},"Login with Email")),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{type:"buton",className:"btn btn-block",onClick:function(e){e.preventDefault(),y("facebook")}},r.a.createElement("i",{className:"fa fa-facebook","aria-hidden":"true"}),"Login with Facebook"),r.a.createElement("button",{type:"button",className:"btn btn-block",onClick:function(e){e.preventDefault(),y("twitter")}},r.a.createElement("i",{className:"fa fa-twitter","aria-hidden":"true"}),"Login with Twitter"),r.a.createElement("button",{type:"button",className:"btn btn-block",onClick:function(e){e.preventDefault(),y("github")}},r.a.createElement("i",{className:"fa fa-github","aria-hidden":"true"}),"Login with Github"),r.a.createElement("button",{type:"button",className:"btn btn-block",onClick:function(e){e.preventDefault(),y("google")}},r.a.createElement("i",{className:"fa fa-google","aria-hidden":"true"}),"Login with Google")))))))))}),M=function(){var e=Object(s.useFirebase)(),t=Object(l.f)(),a=Object(n.useState)(""),c=Object(E.a)(a,2),o=c[0],i=c[1],u=Object(n.useState)(""),d=Object(E.a)(u,2),f=d[0],b=d[1],p=Object(n.useState)([]),h=Object(E.a)(p,2),g=h[0],v=h[1],y=function(a){var n=o.length>=1?o:"",r=f.length>=1?f:"";"email"===a?e.createUser({email:o,password:f}).then(function(){t.push("/home")}).catch(function(e){e.code.includes("account-exists")&&v([].concat(Object(P.a)(g),["Account Exists"]))}):e.login({provider:"email"===a?null:a,type:"popup",email:n,password:r}).then(function(){t.push("/home")}).catch(function(e){e.code.includes("account-exists")&&v([].concat(Object(P.a)(g),["Account Exists"]))})};return r.a.createElement("div",{className:"login__page"},g.length>=1&&r.a.createElement(G,{type:"alert",variant:"danger",heading:"Error",body:g.map(function(e,t){return r.a.createElement("div",{key:t},e)})}),r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"card col-md-4 col-md-offset-4"},r.a.createElement("div",{className:"login__card"},r.a.createElement("div",{className:"card-block"},r.a.createElement("form",{name:"userform",method:"post"},r.a.createElement("h3",null,"Sign up "),r.a.createElement(m.b,{to:"sign-in"},"Log In"),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"exampleInputEmail1"},"Email address"),r.a.createElement("input",{type:"email",className:"form-control",id:"exampleInputEmail1",placeholder:"Email",name:"email",required:!0,onChange:function(e){return i(e.target.value)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"exampleInputPassword1"},"Password"),r.a.createElement("input",{type:"password",className:"form-control",id:"exampleInputPassword1",placeholder:"Password",name:"password",required:!0,onChange:function(e){return b(e.target.value)}})),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{type:"buton",className:"btn btn-primary btn-block",onClick:function(e){e.preventDefault(),y("email")}},"Login with Email")),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{type:"buton",className:"btn btn-block",onClick:function(e){e.preventDefault(),y("facebook")}},r.a.createElement("i",{className:"fa fa-facebook","aria-hidden":"true"}),"Login with Facebook"),r.a.createElement("button",{type:"button",className:"btn btn-block",onClick:function(e){e.preventDefault(),y("twitter")}},r.a.createElement("i",{className:"fa fa-twitter","aria-hidden":"true"}),"Login with Twitter"),r.a.createElement("button",{type:"button",className:"btn btn-block",onClick:function(e){e.preventDefault(),y("github")}},r.a.createElement("i",{className:"fa fa-github","aria-hidden":"true"}),"Login with Github"),r.a.createElement("button",{type:"button",className:"btn btn-block",onClick:function(e){e.preventDefault(),y("google")}},r.a.createElement("i",{className:"fa fa-google","aria-hidden":"true"}),"Login with Google")))))))),r.a.createElement("h1",null,"Sign In"))},q=function(){return r.a.createElement("div",{className:""},"Admin")},B=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(f,null),r.a.createElement(l.c,null,r.a.createElement(D,{exact:!0,path:"/admin"},r.a.createElement(q,null)),r.a.createElement(l.a,{path:"/home",component:F}),r.a.createElement(l.a,{path:"/sign-in",component:H}),r.a.createElement(l.a,{path:"/sign-up",component:M})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var z=a(234),K=a(235),J=a(239),X=a(236),$=a(240),Q=function(){return r.a.createElement("div",{id:"notfound"},r.a.createElement("div",{className:"notfound"},r.a.createElement("div",{className:"notfound-404"},r.a.createElement("h1",null,"404")),r.a.createElement(I,{headingStyle:"h1"},"Oops, The Page you are looking for can't be found!"),r.a.createElement(m.b,{to:"/"},r.a.createElement("span",{className:"arrow"}),"Return To Homepage")))},W=function(e){function t(e){var a;return Object(z.a)(this,t),(a=Object(J.a)(this,Object(X.a)(t).call(this,e))).state={hasError:!1},a}return Object($.a)(t,e),Object(K.a)(t,[{key:"componentDidCatch",value:function(e,t){}},{key:"render",value:function(){return this.state.hasError?r.a.createElement(Q,null):this.props.children}}],[{key:"getDerivedStateFromError",value:function(e){return{hasError:!0}}}]),t}(r.a.Component),Z=Object(l.g)(W),V=a(92),Y=a(28),ee=a(237),te={},ae=Object(Y.c)({errors:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:te,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ERRORS":return t.payload;default:return e}},firebase:s.firebaseReducer,firestore:V.firestoreReducer}),ne=a(238),re=Object(ne.createLogger)(),ce=[ee.a,re],oe=Object(Y.e)(ae,{},Object(Y.d)(Y.a.apply(void 0,ce))),le=(a(459),{firebase:w.a,config:{userProfile:"users",useFirestoreForProfile:!0},dispatch:oe.dispatch,createFirestoreInstance:V.createFirestoreInstance});o.a.render(r.a.createElement(d.a,{store:oe},r.a.createElement(s.ReactReduxFirebaseProvider,le,r.a.createElement(m.a,{basename:"gotit"},r.a.createElement(Z,null,r.a.createElement(B,null))))),document.getElementById("root"))}},[[243,1,2]]]);
//# sourceMappingURL=main.2606234a.chunk.js.map