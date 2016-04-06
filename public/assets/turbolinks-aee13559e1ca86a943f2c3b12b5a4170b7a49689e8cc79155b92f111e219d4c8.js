(function(){var e,t,n,r,i,o,a,s,l,u,c,d,f,p,h,m,v,g,y,b,x,w,E,T,C,k,A,S,N,D,R,L,_,j,H,M,P,I,O,q,F,$,W,B,z,U,X,Y,V,G,K,J,Q,Z,ee,te,ne=[].indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(t in this&&this[t]===e)return t;return-1},re={}.hasOwnProperty,ie=function(e,t){function n(){this.constructor=e}for(var r in t)re.call(t,r)&&(e[r]=t[r]);return n.prototype=t.prototype,e.prototype=new n,e.__super__=t.prototype,e},oe=[].slice,ae=function(e,t){return function(){return e.apply(t,arguments)}};j={},f=10,K=!1,O=null,y=null,L=null,F=null,ee=null,r={BEFORE_CHANGE:"page:before-change",FETCH:"page:fetch",RECEIVE:"page:receive",CHANGE:"page:change",UPDATE:"page:update",LOAD:"page:load",RESTORE:"page:restore",BEFORE_UNLOAD:"page:before-unload",EXPIRE:"page:expire"},T=function(e){var t;return e=new n(e),U(),d(),null!=O&&O.start(),K&&(t=J(e.absolute))?(C(t),k(e,null,!1)):k(e,V)},J=function(e){var t;return t=j[e],t&&!t.transitionCacheDisabled?t:void 0},x=function(e){return null==e&&(e=!0),K=e},b=function(e){return null==e&&(e=!0),u?e?null!=O?O:O=new o("html"):(null!=O&&O.uninstall(),O=null):void 0},k=function(e,t,n){return null==n&&(n=!0),Q(r.FETCH,{url:e.absolute}),null!=ee&&ee.abort(),ee=new XMLHttpRequest,ee.open("GET",e.withoutHashForIE10compatibility(),!0),ee.setRequestHeader("Accept","text/html, application/xhtml+xml, application/xml"),ee.setRequestHeader("X-XHR-Referer",F),ee.onload=function(){var n;return Q(r.RECEIVE,{url:e.absolute}),(n=I())?($(e),W(),p.apply(null,E(n)),_(),"function"==typeof t&&t(),Q(r.LOAD)):document.location.href=g()||e.absolute},O&&n&&(ee.onprogress=function(){return function(e){var t;return t=e.lengthComputable?e.loaded/e.total*100:O.value+(100-O.value)/10,O.advanceTo(t)}}(this)),ee.onloadend=function(){return ee=null},ee.onerror=function(){return document.location.href=e.absolute},ee.send()},C=function(e){return null!=ee&&ee.abort(),p(e.title,e.body),q(e),Q(r.RESTORE)},d=function(){var e;return e=new n(y.url),j[e.absolute]={url:e.relative,body:document.body,title:document.title,positionY:window.pageYOffset,positionX:window.pageXOffset,cachedAt:(new Date).getTime(),transitionCacheDisabled:null!=document.querySelector("[data-no-transition-cache]")},m(f)},M=function(e){return null==e&&(e=f),/^[\d]+$/.test(e)?f=parseInt(e):void 0},m=function(e){var t,n,i,o,a,s;for(i=Object.keys(j),t=i.map(function(e){return j[e].cachedAt}).sort(function(e,t){return t-e}),s=[],o=0,a=i.length;a>o;o++)n=i[o],j[n].cachedAt<=t[e]&&(Q(r.EXPIRE,j[n]),s.push(delete j[n]));return s},p=function(t,n,i,o){return Q(r.BEFORE_UNLOAD),document.title=t,document.documentElement.replaceChild(n,document.body),null!=i&&e.update(i),G(),o&&w(),y=window.history.state,null!=O&&O.done(),Q(r.CHANGE),Q(r.UPDATE)},w=function(){var e,t,n,r,i,o,a,s,l,u,c,d;for(o=Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])')),a=0,l=o.length;l>a;a++)if(i=o[a],""===(c=i.type)||"text/javascript"===c){for(t=document.createElement("script"),d=i.attributes,s=0,u=d.length;u>s;s++)e=d[s],t.setAttribute(e.name,e.value);i.hasAttribute("async")||(t.async=!1),t.appendChild(document.createTextNode(i.innerHTML)),r=i.parentNode,n=i.nextSibling,r.removeChild(i),r.insertBefore(t,n)}},X=function(e){return e.innerHTML=e.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/gi,""),e},G=function(){var e,t;return e=(t=document.querySelectorAll("input[autofocus], textarea[autofocus]"))[t.length-1],e&&document.activeElement!==e?e.focus():void 0},$=function(e){return(e=new n(e)).absolute!==F?window.history.pushState({turbolinks:!0,url:e.absolute},"",e.absolute):void 0},W=function(){var e,t;return(e=ee.getResponseHeader("X-XHR-Redirected-To"))?(e=new n(e),t=e.hasNoHash()?document.location.hash:"",window.history.replaceState(window.history.state,"",e.href+t)):void 0},g=function(){var e;return null!=(e=ee.getResponseHeader("Location"))&&new n(e).crossOrigin()?e:void 0},U=function(){return F=document.location.href},z=function(){return window.history.replaceState({turbolinks:!0,url:document.location.href},"",document.location.href)},B=function(){return y=window.history.state},_=function(){var e;return navigator.userAgent.match(/Firefox/)&&!(e=new n).hasNoHash()?(window.history.replaceState(y,"",e.withoutHash()),document.location.hash=e.hash):void 0},q=function(e){return window.scrollTo(e.positionX,e.positionY)},V=function(){return document.location.hash?document.location.href=document.location.href:window.scrollTo(0,0)},h=function(e){var t,n,r;if(null==e||"object"!=typeof e)return e;t=new e.constructor;for(n in e)r=e[n],t[n]=h(r);return t},P=function(e){var t,n;return t=(null!=(n=document.cookie.match(new RegExp(e+"=(\\w+)")))?n[1].toUpperCase():void 0)||"",document.cookie=e+"=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/",t},Q=function(e,t){var n;return"undefined"!=typeof Prototype&&Event.fire(document,e,t,!0),n=document.createEvent("Events"),t&&(n.data=t),n.initEvent(e,!0,!0),document.dispatchEvent(n)},H=function(e){return!Q(r.BEFORE_CHANGE,{url:e})},I=function(){var e,t,n,r,i,o;return t=function(){var e;return 400<=(e=ee.status)&&600>e},o=function(){var e;return null!=(e=ee.getResponseHeader("Content-Type"))&&e.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/)},r=function(e){var t,n,r,i,o;for(i=e.querySelector("head").childNodes,o=[],n=0,r=i.length;r>n;n++)t=i[n],null!=("function"==typeof t.getAttribute?t.getAttribute("data-turbolinks-track"):void 0)&&o.push(t.getAttribute("src")||t.getAttribute("href"));return o},e=function(e){var t;return L||(L=r(document)),t=r(e),t.length!==L.length||i(t,L).length!==L.length},i=function(e,t){var n,r,i,o,a;for(e.length>t.length&&(o=[t,e],e=o[0],t=o[1]),a=[],r=0,i=e.length;i>r;r++)n=e[r],ne.call(t,n)>=0&&a.push(n);return a},!t()&&o()&&(n=v(ee.responseText),n&&!e(n))?n:void 0},E=function(t){var n;return n=t.querySelector("title"),[null!=n?n.textContent:void 0,X(t.querySelector("body")),e.get(t).token,"runScripts"]},e={get:function(e){var t;return null==e&&(e=document),{node:t=e.querySelector('meta[name="csrf-token"]'),token:null!=t&&"function"==typeof t.getAttribute?t.getAttribute("content"):void 0}},update:function(e){var t;return t=this.get(),null!=t.token&&null!=e&&t.token!==e?t.node.setAttribute("content",e):void 0}},v=function(e){var t;return t=document.documentElement.cloneNode(),t.innerHTML=e,t.head=t.querySelector("head"),t.body=t.querySelector("body"),t},n=function(){function e(t){return this.original=null!=t?t:document.location.href,this.original.constructor===e?this.original:void this._parse()}return e.prototype.withoutHash=function(){return this.href.replace(this.hash,"").replace("#","")},e.prototype.withoutHashForIE10compatibility=function(){return this.withoutHash()},e.prototype.hasNoHash=function(){return 0===this.hash.length},e.prototype.crossOrigin=function(){return this.origin!==(new e).origin},e.prototype._parse=function(){var e;return(null!=this.link?this.link:this.link=document.createElement("a")).href=this.original,e=this.link,this.href=e.href,this.protocol=e.protocol,this.host=e.host,this.hostname=e.hostname,this.port=e.port,this.pathname=e.pathname,this.search=e.search,this.hash=e.hash,this.origin=[this.protocol,"//",this.hostname].join(""),0!==this.port.length&&(this.origin+=":"+this.port),this.relative=[this.pathname,this.search,this.hash].join(""),this.absolute=this.href},e}(),i=function(e){function t(e){return this.link=e,this.link.constructor===t?this.link:(this.original=this.link.href,this.originalElement=this.link,this.link=this.link.cloneNode(!1),void t.__super__.constructor.apply(this,arguments))}return ie(t,e),t.HTML_EXTENSIONS=["html"],t.allowExtensions=function(){var e,n,r,i;for(n=1<=arguments.length?oe.call(arguments,0):[],r=0,i=n.length;i>r;r++)e=n[r],t.HTML_EXTENSIONS.push(e);return t.HTML_EXTENSIONS},t.prototype.shouldIgnore=function(){return this.crossOrigin()||this._anchored()||this._nonHtml()||this._optOut()||this._target()},t.prototype._anchored=function(){return(this.hash.length>0||"#"===this.href.charAt(this.href.length-1))&&this.withoutHash()===(new n).withoutHash()},t.prototype._nonHtml=function(){return this.pathname.match(/\.[a-z]+$/g)&&!this.pathname.match(new RegExp("\\.(?:"+t.HTML_EXTENSIONS.join("|")+")?$","g"))},t.prototype._optOut=function(){var e,t;for(t=this.originalElement;!e&&t!==document;)e=null!=t.getAttribute("data-no-turbolink"),t=t.parentNode;return e},t.prototype._target=function(){return 0!==this.link.target.length},t}(n),t=function(){function e(e){this.event=e,this.event.defaultPrevented||(this._extractLink(),this._validForTurbolinks()&&(H(this.link.absolute)||Z(this.link.href),this.event.preventDefault()))}return e.installHandlerLast=function(t){return t.defaultPrevented?void 0:(document.removeEventListener("click",e.handle,!1),document.addEventListener("click",e.handle,!1))},e.handle=function(t){return new e(t)},e.prototype._extractLink=function(){var e;for(e=this.event.target;e.parentNode&&"A"!==e.nodeName;)e=e.parentNode;return"A"===e.nodeName&&0!==e.href.length?this.link=new i(e):void 0},e.prototype._validForTurbolinks=function(){return null!=this.link&&!(this.link.shouldIgnore()||this._nonStandardClick())},e.prototype._nonStandardClick=function(){return this.event.which>1||this.event.metaKey||this.event.ctrlKey||this.event.shiftKey||this.event.altKey},e}(),o=function(){function e(e){this.elementSelector=e,this._trickle=ae(this._trickle,this),this.value=0,this.content="",this.speed=300,this.opacity=.99,this.install()}var t;return t="turbolinks-progress-bar",e.prototype.install=function(){return this.element=document.querySelector(this.elementSelector),this.element.classList.add(t),this.styleElement=document.createElement("style"),document.head.appendChild(this.styleElement),this._updateStyle()},e.prototype.uninstall=function(){return this.element.classList.remove(t),document.head.removeChild(this.styleElement)},e.prototype.start=function(){return this.advanceTo(5)},e.prototype.advanceTo=function(e){var t;if(e>(t=this.value)&&100>=t){if(this.value=e,this._updateStyle(),100===this.value)return this._stopTrickle();if(this.value>0)return this._startTrickle()}},e.prototype.done=function(){return this.value>0?(this.advanceTo(100),this._reset()):void 0},e.prototype._reset=function(){var e;return e=this.opacity,setTimeout(function(e){return function(){return e.opacity=0,e._updateStyle()}}(this),this.speed/2),setTimeout(function(t){return function(){return t.value=0,t.opacity=e,t._withSpeed(0,function(){return t._updateStyle(!0)})}}(this),this.speed)},e.prototype._startTrickle=function(){return this.trickling?void 0:(this.trickling=!0,setTimeout(this._trickle,this.speed))},e.prototype._stopTrickle=function(){return delete this.trickling},e.prototype._trickle=function(){return this.trickling?(this.advanceTo(this.value+Math.random()/2),setTimeout(this._trickle,this.speed)):void 0},e.prototype._withSpeed=function(e,t){var n,r;return n=this.speed,this.speed=e,r=t(),this.speed=n,r},e.prototype._updateStyle=function(e){return null==e&&(e=!1),e&&this._changeContentToForceRepaint(),this.styleElement.textContent=this._createCSSRule()},e.prototype._changeContentToForceRepaint=function(){return this.content=""===this.content?" ":""},e.prototype._createCSSRule=function(){return""+this.elementSelector+"."+t+"::before {\n  content: '"+this.content+"';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: "+this.opacity+";\n  width: "+this.value+"%;\n  transition: width "+this.speed+"ms ease-out, opacity "+this.speed/2+"ms ease-in;\n  transform: translate3d(0,0,0);\n}"},e}(),c=function(e){return setTimeout(e,500)},N=function(){return document.addEventListener("DOMContentLoaded",function(){return Q(r.CHANGE),Q(r.UPDATE)},!0)},R=function(){return"undefined"!=typeof jQuery?jQuery(document).on("ajaxSuccess",function(e,t){return jQuery.trim(t.responseText)?Q(r.UPDATE):void 0}):void 0},D=function(e){var t,r;return(null!=(r=e.state)?r.turbolinks:void 0)?(t=j[new n(e.state.url).absolute])?(d(),C(t)):Z(e.target.location.href):void 0},S=function(){return z(),B(),document.addEventListener("click",t.installHandlerLast,!0),window.addEventListener("hashchange",function(){return z(),B()},!1),c(function(){return window.addEventListener("popstate",D,!1)})},A=void 0!==window.history.state||navigator.userAgent.match(/Firefox\/2[6|7]/),l=window.history&&window.history.pushState&&window.history.replaceState&&A,a=!navigator.userAgent.match(/CriOS\//),Y="GET"===(te=P("request_method"))||""===te,u=l&&a&&Y,s=document.addEventListener&&document.createEvent,s&&(N(),R()),u?(Z=T,S()):Z=function(e){return document.location.href=e},this.Turbolinks={visit:Z,pagesCached:M,enableTransitionCache:x,enableProgressBar:b,allowLinkExtensions:i.allowExtensions,supported:u,EVENTS:h(r)}}).call(this);