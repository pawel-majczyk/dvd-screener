(function(e){function t(t){for(var i,a,s=t[0],c=t[1],u=t[2],l=0,d=[];l<s.length;l++)a=s[l],r[a]&&d.push(r[a][0]),r[a]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(e[i]=c[i]);h&&h(t);while(d.length)d.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],i=!0,a=1;a<n.length;a++){var c=n[a];0!==r[c]&&(i=!1)}i&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var i={},r={app:0},o=[];function a(e){return s.p+"assets/js/"+({about:"about"}[e]||e)+"."+{about:"81d5fcfe"}[e]+".js"}function s(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n=r[e];if(0!==n)if(n)t.push(n[2]);else{var i=new Promise(function(t,i){n=r[e]=[t,i]});t.push(n[2]=i);var o,c=document.createElement("script");c.charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.src=a(e),o=function(t){c.onerror=c.onload=null,clearTimeout(u);var n=r[e];if(0!==n){if(n){var i=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src,a=new Error("Loading chunk "+e+" failed.\n("+i+": "+o+")");a.type=i,a.request=o,n[1](a)}r[e]=void 0}};var u=setTimeout(function(){o({type:"timeout",target:c})},12e4);c.onerror=c.onload=o,document.head.appendChild(c)}return Promise.all(t)},s.m=e,s.c=i,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(n,i,function(t){return e[t]}.bind(null,i));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/dvd-screener/",s.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var h=u;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"3b67":function(e,t,n){"use strict";var i=n("6be5"),r=n.n(i);r.a},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d");var i=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("dvdNavigation"),n("router-view")],1)},o=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("nav",{staticClass:"main"},[n("router-link",{attrs:{to:"/"}},[e._v("\n    Home\n  ")]),n("router-link",{attrs:{to:"/about"}},[e._v("\n    About\n  ")])],1)},s=[],c=n("2877"),u={},l=Object(c["a"])(u,a,s,!1,null,null,null);l.options.__file="dvdNavigation.vue";var h=l.exports,d={components:{dvdNavigation:h},data:function(){return{dvdText:"dvd-text"}}},f=d,p=(n("5c0b"),Object(c["a"])(f,r,o,!1,null,null,null));p.options.__file="App.vue";var v=p.exports,b=n("8c4f"),g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("DVDScreensaver")},y=[],m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("canvas",{ref:"view",staticClass:"dvd"})},w=[],x=(n("ac6a"),n("d225")),j=n("b0b4"),O=n("308d"),_=n("6bb5"),k=n("4e2b"),C=n("013f"),S=n("912c"),P=n("be40"),E=n.n(P),M=1,z=1,T=1/8,D=4,R=function(e){function t(e,n){var i;return Object(x["a"])(this,t),i=Object(O["a"])(this,Object(_["a"])(t).call(this,n)),i.state={velocity:{x:z,y:M},screen:e,isBouncing:!1,color:{list:[0,120,240,360],current:0,nextIndex:1,isChanging:!1}},i.sprite=S["Sprite"].from(E.a),i.sprite.width=i.state.screen.width*T,i.sprite.height=i.state.screen.width*T,i.addChild(i.sprite),i.replaceRedFilter=new S["filters"].ColorMatrixFilter,i.sprite.filters=[i.replaceRedFilter],i.replaceRedFilter.hue(i.state.color.current),i.setStartingPosition(),i}return Object(k["a"])(t,e),Object(j["a"])(t,[{key:"setStartingPosition",value:function(){this.position.x=Math.floor(Math.random()*(this.state.screen.width-this.sprite.width)),this.position.y=Math.floor(Math.random()*(this.state.screen.height-this.sprite.height))}},{key:"updatePosition",value:function(e){this.position.x+=this.state.velocity.x*e,this.position.y+=this.state.velocity.y*e,this.bounceCheck()}},{key:"setNewSize",value:function(e){this.sprite.width=e*T,this.sprite.height=e*T}},{key:"bounceCheck",value:function(){var e=this.position,t=this.sprite,n=this.state.screen,i=!1;e.x<n.x&&(e.x=0,i="x"),e.x>n.width-t.width&&(e.x=n.width-t.width,i="x"),e.y<n.y&&(i="y",e.y=0),e.y>n.height-t.height&&(i="y",e.y=n.height-t.height),i&&(this.changeVelocity(i,-1),this.changeColor())}},{key:"changeVelocity",value:function(e,t){this.state.velocity[e]=this.state.velocity[e]*t}},{key:"changeColor",value:function(){var e=this,t=this.state.color;t.isChanging=!0,t.current<t.list[t.nextIndex]?(t.current+=D,this.replaceRedFilter.hue(t.current),setTimeout(function(){e.changeColor()},10)):(t.nextIndex===t.list.length-1&&(t.current=0,t.nextIndex=0),t.nextIndex+=1,t.isChanging=!1)}},{key:"update",value:function(e){this.updatePosition(e)}}]),t}(S["Container"]),$=function(e){function t(e){var n;Object(x["a"])(this,t),n=Object(O["a"])(this,Object(_["a"])(t).call(this,e)),n.renderer.autoResize=!0,n.ticker.add(n.update,Object(C["a"])(Object(C["a"])(n)));var i=new R(n.screen);return n.stage.addChild(i),n}return Object(k["a"])(t,e),Object(j["a"])(t,[{key:"newSize",value:function(e,t){this.renderer.resize(e,t),this.stage.children.forEach(function(t){return t.setNewSize(e)})}},{key:"update",value:function(e){this.stage.children.forEach(function(t){return t.update(e)})}}]),t}(S["Application"]),F={data:function(){return{game:void 0}},mounted:function(){var e=this,t=this.$refs.view,n=t.getBoundingClientRect(),i=n.width,r=n.height;this.game=new $({view:t,width:i,height:r,backgroundColor:1121046,antialias:!0}),document.addEventListener("click",function(){document.body.requestPointerLock()}),window.addEventListener("resize",function(){e.game.newSize(window.innerWidth,window.innerHeight)})},destroyed:function(){this.game.destroy()}},I=F,N=(n("3b67"),Object(c["a"])(I,m,w,!1,null,null,null));N.options.__file="DVDScreensaver.vue";var V=N.exports,A={name:"Screensaver",components:{DVDScreensaver:V}},L=A,H=Object(c["a"])(L,g,y,!1,null,null,null);H.options.__file="dvdHome.vue";var q=H.exports;i["a"].use(b["a"]);var B=new b["a"]({routes:[{path:"/",name:"home",component:q},{path:"/about",name:"about",component:function(){return n.e("about").then(n.bind(null,"5c28"))}},{path:"*",redirect:"/"}]});i["a"].config.productionTip=!1,new i["a"]({router:B,render:function(e){return e(v)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var i=n("5e27"),r=n.n(i);r.a},"5e27":function(e,t,n){},"6be5":function(e,t,n){},be40:function(e,t,n){e.exports=n.p+"assets/img/dvd-logo.b5539066.png"}});
//# sourceMappingURL=app.da5dd7e3.js.map