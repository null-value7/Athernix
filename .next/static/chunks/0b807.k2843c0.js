(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,3303,(e,t,a)=>{t.exports=e.r(479520)},318757,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.useCanvasIdentifier=void 0;var r=e.r(271645);a.useCanvasIdentifier=function(e){var t=(0,r.useState)(0),a=t[0],n=t[1],o=(0,r.useCallback)(function(){n(function(e){return e+1})},[]);return void 0!==e?[e,o]:[(0,r.useMemo)(function(){return"react-unity-webgl-canvas-0"},[a]),o]}},44944,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.isBrowserEnvironment=void 0,a.isBrowserEnvironment="u">typeof window&&"u">typeof document},565662,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.useUnityLoader=void 0;var r=e.r(271645),n=e.r(44944);a.useUnityLoader=function(e){var t=(0,r.useState)("Loading"),a=t[0],o=t[1];return(0,r.useEffect)(function(){if(!1!==n.isBrowserEnvironment){if(null===e)return void o("Idle");var t=window.document.querySelector('script[src="'.concat(e,'"]'));null===t?((t=window.document.createElement("script")).type="text/javascript",t.src=e,t.async=!0,t.setAttribute("data-status","loading"),window.document.body.appendChild(t),t.addEventListener("load",function(){return null==t?void 0:t.setAttribute("data-status","loaded")}),t.addEventListener("error",function(){return null==t?void 0:t.setAttribute("data-status","error")})):o("loaded"===t.getAttribute("data-status")?"Loaded":"Error");var a=function(e){return o("load"===e.type?"Loaded":"Error")};return t.addEventListener("load",a),t.addEventListener("error",a),function(){null!==t&&(t.removeEventListener("load",a),t.removeEventListener("error",a),t.remove())}}},[e]),a}},973345,(e,t,a)=>{"use strict";var r=e.e&&e.e.__awaiter||function(e,t,a,r){return new(a||(a=Promise))(function(n,o){function i(e){try{l(r.next(e))}catch(e){o(e)}}function s(e){try{l(r.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?n(e.value):((t=e.value)instanceof a?t:new a(function(e){e(t)})).then(i,s)}l((r=r.apply(e,t||[])).next())})},n=e.e&&e.e.__generator||function(e,t){var a,r,n,o={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]},i=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return i.next=s(0),i.throw=s(1),i.return=s(2),"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(s){return function(l){var c=[s,l];if(a)throw TypeError("Generator is already executing.");for(;i&&(i=0,c[0]&&(o=0)),o;)try{if(a=1,r&&(n=2&c[0]?r.return:c[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,c[1])).done)return n;switch(r=0,n&&(c=[2&c[0],n.value]),c[0]){case 0:case 1:n=c;break;case 4:return o.label++,{value:c[1],done:!1};case 5:o.label++,r=c[1],c=[0];continue;case 7:c=o.ops.pop(),o.trys.pop();continue;default:if(!(n=(n=o.trys).length>0&&n[n.length-1])&&(6===c[0]||2===c[0])){o=0;continue}if(3===c[0]&&(!n||c[1]>n[0]&&c[1]<n[3])){o.label=c[1];break}if(6===c[0]&&o.label<n[1]){o.label=n[1],n=c;break}if(n&&o.label<n[2]){o.label=n[2],o.ops.push(c);break}n[2]&&o.ops.pop(),o.trys.pop();continue}c=t.call(e,o)}catch(e){c=[6,e],r=0}finally{a=n=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}};Object.defineProperty(a,"__esModule",{value:!0}),a.Unity=void 0;var o=e.r(271645),i=e.r(318757),s=e.r(565662);a.Unity=(0,o.forwardRef)(function(e,t){var a=(0,o.useState)(null),l=a[0],c=a[1],d=(0,o.useState)(null),p=d[0],u=d[1],m=(0,i.useCanvasIdentifier)(e.id),x=m[0],h=m[1],f=(0,s.useUnityLoader)(e.unityProvider.loaderUrl),b=(0,o.useCallback)(function(t){e.unityProvider.setLoadingProgression(t),1===t&&e.unityProvider.setIsLoaded(!0)},[e.unityProvider]);return(0,o.useEffect)(function(){return r(void 0,void 0,void 0,function(){var t,a,r,o,i;return n(this,function(n){switch(n.label){case 0:if(!l||p||"Loaded"!==f)return[2];console.log("React Unity WebGL: Initializing Unity instance..."),e.unityProvider.setUnityInstance(null),u(null),e.unityProvider.setLoadingProgression(0),null==(i=(o=e.unityProvider).setIsLoaded)||i.call(o,!1),e.unityProvider.setInitialisationError(void 0),h(),Object.keys(t={companyName:e.unityProvider.companyName,productName:e.unityProvider.productName,productVersion:e.unityProvider.productVersion,dataUrl:e.unityProvider.dataUrl,frameworkUrl:e.unityProvider.frameworkUrl,codeUrl:e.unityProvider.codeUrl,workerUrl:e.unityProvider.workerUrl,memoryUrl:e.unityProvider.memoryUrl,symbolsUrl:e.unityProvider.symbolsUrl,streamingAssetsUrl:e.unityProvider.streamingAssetsUrl,devicePixelRatio:e.devicePixelRatio,webglContextAttributes:e.unityProvider.webglContextAttributes,cacheControl:e.unityProvider.cacheControl,autoSyncPersistentDataPath:e.unityProvider.autoSyncPersistentDataPath,matchWebGLToCanvasSize:e.matchWebGLToCanvasSize,disabledCanvasEvents:e.disabledCanvasEvents,showBanner:e.unityProvider.showBanner,print:e.unityProvider.print,printErr:e.unityProvider.printErr}).forEach(function(e){(null===t[e]||void 0===t[e])&&delete t[e]}),n.label=1;case 1:return n.trys.push([1,3,,4]),[4,window.createUnityInstance(l,t,b)];case 2:return u(a=n.sent()),e.unityProvider.setUnityInstance(a),[3,4];case 3:return console.error("React Unity WebGL: Error initializing Unity instance:",r=n.sent()),e.unityProvider.setInitialisationError(r),[3,4];case 4:return[2]}})}),function(){r(void 0,void 0,void 0,function(){var t,a,r;return n(this,function(n){switch(n.label){case 0:if(!p||!l)return[2];return console.log("React Unity WebGL: Detaching Unity instance..."),e.unityProvider.setUnityInstance(null),u(null),e.unityProvider.setLoadingProgression(0),null==(r=(a=e.unityProvider).setIsLoaded)||r.call(a,!1),e.unityProvider.setInitialisationError(void 0),(t=document.createElement("canvas")).id=l.id,t.setAttribute("react-unity-webgl-role","cleanup"),t.style.display="none",document.body.appendChild(t),p.Module.canvas=t,u(null),[4,p.Quit()];case 1:return n.sent(),document.body.removeChild(t),[2]}})})}},[l,p,f,e.unityProvider]),(0,o.useImperativeHandle)(t,function(){return l}),(0,o.createElement)("canvas",{ref:c,id:x,style:e.style,className:e.className,tabIndex:e.tabIndex})})},941885,(e,t,a)=>{"use strict";var r=e.e&&e.e.__spreadArray||function(e,t,a){if(a||2==arguments.length)for(var r,n=0,o=t.length;n<o;n++)!r&&n in t||(r||(r=Array.prototype.slice.call(t,0,n)),r[n]=t[n]);return e.concat(r||Array.prototype.slice.call(t))};Object.defineProperty(a,"__esModule",{value:!0}),a.useEventSystem=void 0;var n=e.r(271645),o=e.r(44944),i=[];!0===o.isBrowserEnvironment&&(window.dispatchReactUnityEvent=function(e){for(var t=[],a=1;a<arguments.length;a++)t[a-1]=arguments[a];var n=void 0;return i.forEach(function(a){n=a.apply(void 0,r([e],t,!1))}),n}),a.useEventSystem=function(){var e=(0,n.useRef)([]),t=(0,n.useCallback)(function(t,a){e.current=r(r([],e.current,!0),[{eventName:t,callback:a}],!1)},[e]),a=(0,n.useCallback)(function(t,a){e.current=e.current.filter(function(e){return e.eventName!==t&&e.callback!==a})},[e]),o=(0,n.useCallback)(function(t){for(var a=[],r=1;r<arguments.length;r++)a[r-1]=arguments[r];var n=e.current.find(function(e){return e.eventName===t});if(void 0!==n)return n.callback.apply(n,a)},[e]);return(0,n.useEffect)(function(){return i.push(o),function(){i.splice(i.indexOf(o),1)}},[o]),{addEventListener:t,removeEventListener:a}}},667509,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.useUnityContext=void 0;var r=e.r(271645),n=e.r(941885);a.useUnityContext=function(e){var t=(0,r.useState)(null),a=t[0],o=t[1],i=(0,r.useState)(0),s=i[0],l=i[1],c=(0,r.useState)(!1),d=c[0],p=c[1],u=(0,r.useState)(),m=u[0],x=u[1],h=(0,n.useEventSystem)(),f=(0,r.useRef)({companyName:e.companyName,productName:e.productName,productVersion:e.productVersion,codeUrl:e.codeUrl,dataUrl:e.dataUrl,frameworkUrl:e.frameworkUrl,loaderUrl:e.loaderUrl,memoryUrl:e.memoryUrl,symbolsUrl:e.symbolsUrl,streamingAssetsUrl:e.streamingAssetsUrl,workerUrl:e.workerUrl,webglContextAttributes:e.webglContextAttributes,cacheControl:e.cacheControl,autoSyncPersistentDataPath:e.autoSyncPersistentDataPath,showBanner:e.showBanner,print:e.print,printErr:e.printErr,setUnityInstance:o,setLoadingProgression:l,setIsLoaded:p,setInitialisationError:x}),b=(0,r.useCallback)(function(e){return null==a?void 0:a.SetFullscreen(+!!e)},[a]),g=(0,r.useCallback)(function(){var e;return null==(e=null==a?void 0:a.Module.canvas)?void 0:e.requestPointerLock()},[a]),v=(0,r.useCallback)(function(e,t,r){return null==a?void 0:a.SendMessage(e,t,r)},[a]),y=(0,r.useCallback)(function(e,t){var r;return null==(r=null==a?void 0:a.Module.canvas)?void 0:r.toDataURL(e,t)},[a]),w=(0,r.useCallback)(function(){var e;return null!=(e=null==a?void 0:a.Quit())?e:Promise.reject()},[a]),E=(0,r.useCallback)(function(){var e;return null==(e=null==a?void 0:a.GetMetricsInfo)?void 0:e.call(a)},[a]);return{unityProvider:f.current,loadingProgression:s,isLoaded:d,initialisationError:m,requestFullscreen:b,requestPointerLock:g,sendMessage:v,takeScreenshot:y,unload:w,getMetricsInfo:E,addEventListener:h.addEventListener,removeEventListener:h.removeEventListener,UNSAFE__unityInstance:a}}},45075,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.useUnityMetricsInfo=void 0;var r=e.r(271645);a.useUnityMetricsInfo=function(e,t){var a=(0,r.useState)({}),n=a[0],o=a[1];return(0,r.useEffect)(function(){var a=setInterval(function(){var t=e();void 0!==t&&o(t)},t.interval||1e3);return function(){clearInterval(a)}},[e,t.interval]),n}},564812,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.useUnityMetricsInfo=a.useUnityContext=a.Unity=void 0;var r=e.r(973345);Object.defineProperty(a,"Unity",{enumerable:!0,get:function(){return r.Unity}});var n=e.r(667509);Object.defineProperty(a,"useUnityContext",{enumerable:!0,get:function(){return n.useUnityContext}});var o=e.r(45075);Object.defineProperty(a,"useUnityMetricsInfo",{enumerable:!0,get:function(){return o.useUnityMetricsInfo}})},66893,e=>{"use strict";var t=e.i(843476),a=e.i(271645),r=e.i(3303),n=e.i(564812);function o(){let{unityProvider:e,isLoaded:a,loadingProgression:r}=(0,n.useUnityContext)({loaderUrl:"/Unity/Build/V2.5-Build.loader.js",dataUrl:"/Unity/Build/V2.5-Build.data.br",frameworkUrl:"/Unity/Build/V2.5-Build.framework.js.br",codeUrl:"/Unity/Build/V2.5-Build.wasm.br",streamingAssetsUrl:"StreamingAssets",companyName:"DefaultCompany",productName:"Athernix",productVersion:"0.1.0"});return(0,t.jsxs)("div",{className:"relative w-full h-full flex justify-center items-center bg-black overflow-hidden",children:[!a&&(0,t.jsx)("div",{className:"absolute z-10 flex flex-col items-center",children:(0,t.jsx)("div",{className:"w-[200px] h-[10px] rounded-[5px] mt-[10px]",style:{background:"rgba(255,255,255,0.2)"},children:(0,t.jsx)("div",{className:"h-full rounded-[5px] transition-all duration-200",style:{width:`${Math.round(100*r)}%`,background:"#FF006E"}})})}),(0,t.jsx)(n.Unity,{unityProvider:e,style:{width:"100%",height:"100%",background:"#000"},tabIndex:-1})]})}e.s(["default",0,function(){let[e,n]=(0,a.useState)(!1),[i,s]=(0,a.useState)(""),l=(0,a.useRef)(!1),c=e=>{let t=document.getElementById(e);t&&t.scrollIntoView({behavior:"smooth"})},d=e=>{s(e),n(!0),document.body.style.overflow="hidden"};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.default,{src:"https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js",onLoad:()=>{!l.current&&window.THREE&&(l.current=!0,e("c1",{count:28e3,camZ:9,size:.038,opacity:.92,colA:"#FF006E",colB:"#FF6B00",colC:"#FFD700",place(e,t,a){let r,n,o,i=e/a;if(i<.55){let e=Math.floor(6*Math.random())/6,t=3.2*(1-.7*e);r=(Math.random()-.5)*t*2,n=-2.2+4*e+(Math.random()-.5)*.12,o=(Math.random()-.5)*t*1.4}else if(i<.78){let e=Math.random()*Math.PI,t=1.5+(Math.random()-.5)*.22;r=Math.cos(e)*t,n=1.8+Math.sin(e)*t,o=(Math.random()-.5)*.5}else{let e=2+2.5*Math.random(),t=Math.random()*Math.PI*2,a=Math.acos(2*Math.random()-1);r=e*Math.sin(a)*Math.cos(t),n=e*Math.sin(a)*Math.sin(t)*.6,o=e*Math.cos(a)*.6}t[3*e]=r,t[3*e+1]=n,t[3*e+2]=o},animate(e,t,a,r,n){for(let o=0;o<n;o++){let n=r[3*o],i=r[3*o+1];t[3*o]=a[3*o]+.04*Math.sin(.5*e+n),t[3*o+1]=a[3*o+1]+.04*Math.cos(.4*e+i),t[3*o+2]=a[3*o+2]+.025*Math.sin(.6*e+n)}}}),e("c2",{count:26e3,camZ:8.5,size:.036,opacity:.9,colA:"#FF6B00",colB:"#FFD700",colC:"#FF006E",place(e,t,a){let r,n,o,i=e/a;if(i<.65){let e=2.8+(Math.random()-.5)*.18,t=Math.random()*Math.PI*2,a=Math.acos(2*Math.random()-1);r=e*Math.sin(a)*Math.cos(t),n=e*Math.sin(a)*Math.sin(t),o=e*Math.cos(a)}else if(i<.82){let e=(Math.random()-.5)*Math.PI,t=Math.random()*Math.PI*2;r=2.82*Math.cos(e)*Math.cos(t),n=2.82*Math.sin(e),o=2.82*Math.cos(e)*Math.sin(t)}else{let e=3.6+.8*Math.random(),t=Math.random()*Math.PI*2;r=Math.cos(t)*e,n=(Math.random()-.5)*1.2,o=Math.sin(t)*e}t[3*e]=r,t[3*e+1]=n,t[3*e+2]=o},animate(e,t,a,r,n){for(let o=0;o<n;o++){let n=r[3*o],i=r[3*o+1],s=r[3*o+2],l=a[3*o]*a[3*o]+a[3*o+2]*a[3*o+2];if(l>12){let r=Math.atan2(a[3*o+2],a[3*o])+.18*e,n=Math.sqrt(l);t[3*o]=Math.cos(r)*n,t[3*o+2]=Math.sin(r)*n,t[3*o+1]=a[3*o+1]+.05*Math.sin(.6*e+i)}else t[3*o]=a[3*o]+.03*Math.sin(.4*e+n),t[3*o+1]=a[3*o+1]+.03*Math.cos(.35*e+i),t[3*o+2]=a[3*o+2]+.02*Math.sin(.5*e+s)}}}),e("c3",{count:3e4,camZ:9,size:.034,opacity:.88,colA:"#FFD700",colB:"#FF006E",colC:"#FF6B00",place(e,t,a){let r,n,o,i=e/a;if(i<.38){let e=Math.random()*Math.PI*2,t=Math.acos(2*Math.random()-1),a=1.6+.28*Math.sin(5*e);r=-1.1+a*Math.sin(t)*Math.cos(e)*.75,n=a*Math.sin(t)*Math.sin(e)*.62,o=a*Math.cos(t)*.82}else if(i<.76){let e=Math.random()*Math.PI*2,t=Math.acos(2*Math.random()-1),a=1.6+.28*Math.sin(5*e);r=1.1-a*Math.sin(t)*Math.cos(e)*.75,n=a*Math.sin(t)*Math.sin(e)*.62,o=a*Math.cos(t)*.82}else{let e=Math.random(),t=e*Math.PI*12,a=2.2+1.2*e,i=(Math.random()-.5)*.3;r=Math.cos(t)*(a+i),n=(e-.5)*4.5+(Math.random()-.5)*.2,o=Math.sin(t)*(a+i)}t[3*e]=r,t[3*e+1]=n,t[3*e+2]=o},animate(e,t,a,r,n){for(let o=0;o<n;o++){let i=r[3*o],s=r[3*o+1],l=r[3*o+2];if(o/n>.76){let r=1+.06*Math.sin(1.2*e+l);t[3*o]=a[3*o]*r,t[3*o+1]=a[3*o+1]+.08*Math.sin(.5*e+i),t[3*o+2]=a[3*o+2]*r}else{let r=1+.025*Math.sin(.8*e);t[3*o]=a[3*o]*r+.03*Math.sin(.5*e+i),t[3*o+1]=a[3*o+1]*r+.03*Math.cos(.4*e+s),t[3*o+2]=a[3*o+2]*r+.02*Math.sin(.6*e+l)}}}}));function e(e,t){let a=document.getElementById(e);if(!a)return;let r=a.offsetWidth||520,n=a.offsetHeight||520,o=new window.THREE.WebGLRenderer({canvas:a,antialias:!0,alpha:!0});o.setSize(r,n),o.setPixelRatio(Math.min(window.devicePixelRatio,2)),o.setClearColor(0,0);let i=new window.THREE.Scene,s=new window.THREE.PerspectiveCamera(60,r/n,.1,200);s.position.set(0,0,t.camZ||8);let l=t.count||25e3,c=new Float32Array(3*l),d=new Float32Array(3*l),p=new Float32Array(3*l),u=new window.THREE.Color(t.colA),m=new window.THREE.Color(t.colB),x=new window.THREE.Color(t.colC);for(let e=0;e<l;e++){let a,r,n;t.place(e,c,l);let o=e/l;if(o<.5){let e=2*o;a=u.r+(m.r-u.r)*e,r=u.g+(m.g-u.g)*e,n=u.b+(m.b-u.b)*e}else{let e=(o-.5)*2;a=m.r+(x.r-m.r)*e,r=m.g+(x.g-m.g)*e,n=m.b+(x.b-m.b)*e}d[3*e]=a,d[3*e+1]=r,d[3*e+2]=n,p[3*e]=100*Math.random(),p[3*e+1]=100*Math.random(),p[3*e+2]=Math.random()*Math.PI*2}let h=new window.THREE.BufferGeometry;h.setAttribute("position",new window.THREE.BufferAttribute(c.slice(),3)),h.setAttribute("color",new window.THREE.BufferAttribute(d,3));let f=new window.THREE.PointsMaterial({size:t.size||.04,vertexColors:!0,transparent:!0,opacity:t.opacity||.9,blending:window.THREE.AdditiveBlending,depthWrite:!1,sizeAttenuation:!0}),b=new window.THREE.Points(h,f),g=new window.THREE.Group;g.add(b),i.add(g);let v=c.slice(),y=0,w=0;a.addEventListener("mousemove",e=>{let t=a.getBoundingClientRect();y=((e.clientX-t.left)/t.width-.5)*2,w=-(2*((e.clientY-t.top)/t.height-.5))});let E=new window.THREE.Clock;!function e(){requestAnimationFrame(e);let a=E.getElapsedTime(),r=h.attributes.position.array;t.animate&&t.animate(a,r,v,p,l),h.attributes.position.needsUpdate=!0,g.rotation.y+=.003,g.rotation.x+=.001,g.rotation.y+=.002*y,g.rotation.x+=.001*w,o.render(i,s)}(),new ResizeObserver(()=>{let e=a.offsetWidth,t=a.offsetHeight;o.setSize(e,t),s.aspect=e/t,s.updateProjectionMatrix()}).observe(a)}}}),(0,t.jsx)("style",{dangerouslySetInnerHTML:{__html:`
        :root{
          --pink:#FF006E;
          --orange:#FF6B00;
          --yellow:#FFD700;
          --bg:#08000a;
        }
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{
          font-family:'Plus Jakarta Sans',sans-serif;
          background:var(--bg);
          color:#fff;
          overflow-x:hidden;
        }
        .mono{font-family:'JetBrains Mono',monospace}

        /* ══ NAVIGATION ══ */
        .atx-nav {
          position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
          width: 90%; max-width: 1160px; padding: 10px 20px;
          background: rgba(5, 0, 8, .35); backdrop-filter: blur(48px) saturate(200%); -webkit-backdrop-filter: blur(48px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, .055); border-radius: 100px; z-index: 9999;
          display: flex; justify-content: space-between; align-items: center;
          box-shadow: 0 8px 40px rgba(0, 0, 0, .5), inset 0 1px 0 rgba(255, 255, 255, .06);
        }
        .atx-logo {
          font-family: 'Bebas Neue', 'Plus Jakarta Sans', sans-serif; font-size: 20px; letter-spacing: .14em;
          background: linear-gradient(90deg, #FF006E, #FFD700); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          text-decoration: none; flex-shrink: 0;
        }
        .atx-links { display: flex; gap: 2px; list-style: none; align-items: center; }
        .atx-links li { position: relative; }
        .atx-links a, .atx-links .atx-drop-btn {
          font-size: 8px; letter-spacing: .18em; color: rgba(255, 255, 255, .38); text-decoration: none;
          font-family: 'JetBrains Mono', monospace; transition: color .25s; background: transparent; border: none;
          cursor: pointer; padding: 7px 15px; display: flex; align-items: center; gap: 5px; border-radius: 100px;
        }
        .atx-links a:hover, .atx-links .atx-drop-btn:hover { color: rgba(255, 255, 255, .85); }
        .atx-links a.atx-active { color: #FF6B00; }
        .atx-chevron { font-size: 7px; opacity: .4; transition: transform .22s; }
        .atx-links li:hover .atx-chevron { transform: rotate(180deg); }
        
        .atx-dropdown {
          position: absolute; top: calc(100% + 10px); left: 50%; transform: translateX(-50%) translateY(-4px);
          background: rgba(5, 0, 8, .75); backdrop-filter: blur(60px) saturate(200%); -webkit-backdrop-filter: blur(60px) saturate(200%);
          border: 1px solid rgba(255, 255, 255, .07); border-radius: 18px; padding: 8px; min-width: 240px;
          opacity: 0; pointer-events: none; transition: opacity .22s, transform .22s;
          box-shadow: 0 24px 64px rgba(0, 0, 0, .6), inset 0 1px 0 rgba(255, 255, 255, .05);
        }
        .atx-links li.atx-has-drop:hover .atx-dropdown { opacity: 1; pointer-events: all; transform: translateX(-50%) translateY(0); }
        .atx-dropdown a {
          font-size: 8px; letter-spacing: .15em; color: rgba(255, 255, 255, .32); padding: 10px 16px;
          display: flex; align-items: center; gap: 10px; border-radius: 12px; transition: all .18s; cursor: pointer;
        }
        .atx-dropdown a:hover { color: rgba(255, 255, 255, .85); background: rgba(255, 107, 0, .07); }
        .atx-dropdown a .dd-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; box-shadow: 0 0 6px currentColor; }

        .atx-right { display: flex; gap: 8px; align-items: center; flex-shrink: 0; }
        .atx-cta-sec {
          font-size: 8px; font-family: 'JetBrains Mono', monospace; letter-spacing: .15em; padding: 9px 20px;
          background: rgba(255, 255, 255, .04); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, .1);
          border-radius: 100px; color: rgba(255, 255, 255, .55); text-decoration: none; transition: all .3s;
        }
        .atx-cta-sec:hover { background: rgba(255, 255, 255, .07); border-color: rgba(255, 107, 0, .45); color: rgba(255, 255, 255, .9); }
        .atx-cta-pri {
          font-size: 8px; font-family: 'JetBrains Mono', monospace; letter-spacing: .15em; padding: 9px 20px;
          background: linear-gradient(135deg, #FF006E, #FF6B00); border: 1px solid rgba(255, 255, 255, .1);
          border-radius: 100px; color: #fff; text-decoration: none; transition: all .3s;
          position: relative; overflow: hidden; display: inline-block;
        }
        .atx-cta-pri:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(255, 0, 110, .35); }

        /* ── HERO INTERFACE ── */
        .hero-intro{
          height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; position:relative; overflow:hidden; padding-top: 90px;
        }
        .hero-intro h1{ font-size:clamp(3rem,10vw,9rem); font-weight:800; letter-spacing:-.04em; line-height:.9; }
        .hero-intro h1 .line1{ display:block; color:transparent; -webkit-text-stroke:1.5px rgba(255,255,255,.12); }
        .hero-intro h1 .line2{
          display:block; background:linear-gradient(135deg,var(--pink) 0%,var(--yellow) 50%,var(--orange) 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; filter:drop-shadow(0 0 60px rgba(255,107,0,.3));
        }
        .hero-intro .eyebrow{ font-family:'JetBrains Mono',monospace; font-size:9px; letter-spacing:.5em; color:var(--orange); margin-bottom:24px; opacity:.8; }
        .hero-intro .sub{ font-family:'JetBrains Mono',monospace; font-size:9px; letter-spacing:.4em; color:rgba(255,255,255,.22); margin-top:32px; }
        
        /* 🚀 INDICADORES ADICIONALES (FLECHAS HERO) 🚀 */
        .atx-hero-indicators { display: flex; gap: 40px; margin-top: 40px; z-index: 5; }
        .ind-item {
          font-family: 'JetBrains Mono', monospace; font-size: 8px; letter-spacing: 0.2em; color: rgba(255,255,255,0.3);
          cursor: pointer; transition: all 0.3s; display: flex; align-items: center; gap: 8px;
        }
        .ind-item:hover { color: var(--pink); transform: translateY(-2px); }
        .ind-arrow { font-size: 10px; color: var(--orange); }

        .scroll-down{ position:absolute; bottom:40px; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:8px; cursor: pointer; }
        .s-line{ width:1px; height:48px; background:linear-gradient(to bottom,var(--orange),transparent); animation:sline 2s infinite }
        @keyframes sline{0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}51%{transform:scaleY(1);transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}
        .s-lbl{font-family:'JetBrains Mono',monospace; font-size:7px; letter-spacing:.3em; color:rgba(255,255,255,.18)}
        .grad-line{height:1px; background:linear-gradient(90deg,transparent,var(--orange),var(--pink),transparent); opacity:.2}

        /* ── SECCIONES DE M\xd3DULOS ── */
        .module{
          min-height:100vh; display:grid; grid-template-columns:1fr 1fr; align-items:center; max-width:1200px; margin:0 auto; padding:120px 48px; gap:80px; position: relative;
        }
        .module.reverse{direction:rtl} .module.reverse > *{direction:ltr}
        .module-canvas-wrap{ position:relative; width:100%; aspect-ratio:1/1; max-width:520px; }
        .module-canvas-wrap canvas{ width:100%!important; height:100%!important; border-radius:24px; border:1px solid rgba(255,107,0,.12); }
        .canvas-glow{ position:absolute; inset:-30px; border-radius:50px; pointer-events:none; filter:blur(60px); opacity:.18; }

        .mod-num{ font-family:'JetBrains Mono',monospace; font-size:8px; letter-spacing:.5em; opacity:.28; margin-bottom:12px; }
        .mod-tag{ font-family:'JetBrains Mono',monospace; font-size:8px; letter-spacing:.45em; margin-bottom:18px; }
        .mod-title{ font-size:clamp(2.6rem,5vw,5rem); font-weight:800; line-height:.92; letter-spacing:-.04em; margin-bottom:24px; }
        .grad-text{ background:linear-gradient(135deg,var(--pink),var(--yellow),var(--orange)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
        .mod-desc{ font-size:13px; line-height:2; color:rgba(255,255,255,.45); font-weight:300; max-width:420px; margin-bottom:28px; }
        
        /* 🚀 FLECHAS INDICADORAS ENTRE SECCIONES 🚀 */
        .atx-section-nav-anchor {
          position: absolute; bottom: 30px; right: 48px; display: flex; gap: 15px; 
          font-family: 'JetBrains Mono', monospace; font-size: 7px; letter-spacing: 0.2em; 
          color: rgba(255,255,255,0.2); cursor: pointer; transition: color 0.3s;
        }
        .atx-section-nav-anchor:hover { color: var(--yellow); }

        .mod-launch-btn {
          display: inline-flex; align-items: center; gap: 10px; margin-top: 32px; padding: 14px 36px;
          background: linear-gradient(135deg, #FF006E, #FF6B00); border: 1px solid rgba(255, 255, 255, .12);
          border-radius: 100px; font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: .22em; font-weight: 700;
          color: #fff; text-decoration: none; transition: all .35s; cursor: pointer;
        }
        .mod-launch-btn:hover { transform: translateY(-3px); box-shadow: 0 18px 48px rgba(255, 0, 110, .42); }
        .mod-launch-btn .btn-arrow { font-size: 11px; transition: transform .3s; }
        .mod-launch-btn:hover .btn-arrow { transform: translateX(5px); }

        .sec-historia{background:radial-gradient(ellipse at 60% 50%,rgba(255,0,110,.055),transparent 65%)}
        .sec-svirtual{background:radial-gradient(ellipse at 40% 50%,rgba(255,107,0,.055),transparent 65%)}
        .sec-mente{background:radial-gradient(ellipse at 60% 50%,rgba(255,215,0,.04),transparent 65%)}

        /* MARQUEE */
        .mq{overflow:hidden; padding:16px 0; border-top:1px solid rgba(255,107,0,.07); border-bottom:1px solid rgba(255,107,0,.07)}
        .mq-t{display:flex; white-space:nowrap; animation:mqa 30s linear infinite}
        @keyframes mqa{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .mqi{display:inline-flex; align-items:center; gap:16px; padding:0 26px; font-size:9px; letter-spacing:.2em; font-family:'JetBrains Mono',monospace; color:rgba(255,255,255,.22)}
        .mqi span{color:var(--orange)}

        /* FOOTER */
        .atx-footer { position: relative; padding: 56px 48px 44px; background: rgba(4, 0, 6, .6); border-top: 1px solid rgba(255, 255, 255, .04); }
        .atx-footer-inner { max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: flex-end; gap: 40px; flex-wrap: wrap; }
        .atx-footer-brand .footer-logo { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: .12em; background: linear-gradient(90deg, #FF006E, #FFD700); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .atx-footer-brand p { font-family: 'JetBrains Mono', monospace; font-size: 7px; letter-spacing: .35em; color: rgba(255, 255, 255, .18); }
        .atx-footer-links { display: flex; gap: 32px; }
        .atx-footer-col h4 { font-family: 'JetBrains Mono', monospace; font-size: 7px; letter-spacing: .4em; color: rgba(255, 107, 0, .55); margin-bottom: 14px; }
        .atx-footer-col a { display: block; font-family: 'JetBrains Mono', monospace; font-size: 7px; letter-spacing: .18em; color: rgba(255, 255, 255, .22); text-decoration: none; margin-bottom: 8px; cursor: pointer;}
        .atx-footer-bottom { max-width: 1100px; margin: 28px auto 0; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, .04); display: flex; justify-content: space-between; }
        .atx-footer-bottom span { font-family: 'JetBrains Mono', monospace; font-size: 7px; letter-spacing: .25em; color: rgba(255, 255, 255, .14); }

        @media(max-width:900px){
          .module{grid-template-columns:1fr; padding:80px 24px; gap:48px}
          .module.reverse{direction:ltr}
          .atx-links, .atx-cta-sec, .atx-hero-indicators { display: none !important; }
        }

        /* ══ 🌐 CAPA FLOTANTE DEL IFRAME (MODAL VORTEX) ══ */
        .atx-game-overlay {
          position: fixed; inset: 0; width: 100vw; height: 100vh; background: #050008; z-index: 99999;
          display: flex; flex-direction: column; animation: overlayFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes overlayFade { from { opacity: 0; transform: scale(1.02); } to { opacity: 1; transform: scale(1); } }
        
        .atx-game-header {
          width: 100%; height: 60px; background: rgba(8, 0, 10, 0.9); backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 107, 0, 0.15); display: flex; justify-content: space-between; align-items: center; padding: 0 30px;
        }
        .game-title-panel { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.3em; color: #FFF; }
        .game-title-panel span { color: var(--pink); font-weight: bold; }
        
        /* BOT\xd3N DE REGRESO */
        .atx-back-btn {
          background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 0, 110, 0.4); border-radius: 100px;
          padding: 8px 22px; font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #FFF; letter-spacing: 0.15em;
          cursor: pointer; transition: all 0.3s; display: flex; align-items: center; gap: 8px;
        }
        .atx-back-btn:hover {
          background: linear-gradient(135deg, rgba(255, 0, 110, 0.2), rgba(255, 107, 0, 0.2));
          border-color: var(--yellow); box-shadow: 0 0 20px rgba(255, 0, 110, 0.25); transform: translateX(-3px);
        }

        .atx-iframe-wrapper { flex: 1; width: 100%; height: calc(100% - 60px); background: #000; }
        .atx-iframe-wrapper iframe { width: 100%; height: 100%; border: none; }
      `}}),(0,t.jsxs)("nav",{className:"atx-nav",children:[(0,t.jsx)("a",{href:"#",className:"atx-logo",children:"ATHERNIX"}),(0,t.jsxs)("ul",{className:"atx-links",children:[(0,t.jsxs)("li",{className:"atx-has-drop",children:[(0,t.jsxs)("button",{className:"atx-drop-btn",children:["MÓDULOS ",(0,t.jsx)("span",{className:"atx-chevron",children:"▾"})]}),(0,t.jsxs)("div",{className:"atx-dropdown",children:[(0,t.jsxs)("a",{onClick:()=>c("historia"),children:[(0,t.jsx)("span",{className:"dd-dot",style:{background:"#FF006E"}}),"HISTORIA_VIVA_VR"]}),(0,t.jsxs)("a",{onClick:()=>c("svirtual"),children:[(0,t.jsx)("span",{className:"dd-dot",style:{background:"#FF6B00"}}),"SVIRTUAL_TOURS"]}),(0,t.jsxs)("a",{onClick:()=>c("mente"),children:[(0,t.jsx)("span",{className:"dd-dot",style:{background:"#FFD700"}}),"MENTELIBRE_VR"]})]})]}),(0,t.jsx)("li",{children:(0,t.jsx)("a",{className:"atx-active",children:"ACERCA DE NOSOTROS"})})]}),(0,t.jsxs)("div",{className:"atx-right",children:[(0,t.jsx)("a",{href:"#",className:"atx-cta-sec",children:"INICIAR SESIÓN"}),(0,t.jsx)("a",{href:"#",className:"atx-cta-pri",children:"REGISTRO"})]})]}),(0,t.jsxs)("section",{className:"hero-intro",children:[(0,t.jsx)("p",{className:"eyebrow",children:"[ PLATAFORMA_XR // EL_SALVADOR // 2026 ]"}),(0,t.jsxs)("h1",{children:[(0,t.jsx)("span",{className:"line1",children:"MÓDULOS"}),(0,t.jsx)("span",{className:"line2",children:"ATHERNIX"})]}),(0,t.jsx)("p",{className:"sub",children:"TRES EJES · UNA PLATAFORMA · IMPACTO REAL"}),(0,t.jsxs)("div",{className:"atx-hero-indicators",children:[(0,t.jsxs)("div",{className:"ind-item",onClick:()=>c("historia"),children:[(0,t.jsx)("span",{className:"ind-arrow",children:"↓"})," 01_HISTORIA"]}),(0,t.jsxs)("div",{className:"ind-item",onClick:()=>c("svirtual"),children:[(0,t.jsx)("span",{className:"ind-arrow",children:"↓"})," 02_TURISMO"]}),(0,t.jsxs)("div",{className:"ind-item",onClick:()=>c("mente"),children:[(0,t.jsx)("span",{className:"ind-arrow",children:"↓"})," 03_SALUD"]})]}),(0,t.jsxs)("div",{className:"scroll-down",onClick:()=>c("historia"),children:[(0,t.jsx)("div",{className:"s-line"}),(0,t.jsx)("span",{className:"s-lbl",children:"EXPLORAR"})]})]}),(0,t.jsx)("div",{className:"grad-line"}),(0,t.jsx)("div",{className:"mq",children:(0,t.jsxs)("div",{className:"mq-t",children:[(0,t.jsxs)("span",{className:"mqi",children:["HISTORIA VIVA VR ",(0,t.jsx)("span",{children:"✦"})]}),(0,t.jsxs)("span",{className:"mqi",children:["SVIRTUAL TOURS ",(0,t.jsx)("span",{children:"✦"})]}),(0,t.jsxs)("span",{className:"mqi",children:["MENTELIBRE VR ",(0,t.jsx)("span",{children:"✦"})]}),(0,t.jsxs)("span",{className:"mqi",children:["EJE CULTURAL ",(0,t.jsx)("span",{children:"✦"})]}),(0,t.jsxs)("span",{className:"mqi",children:["EJE TURISMO ",(0,t.jsx)("span",{children:"✦"})]}),(0,t.jsxs)("span",{className:"mqi",children:["ATHERNIX XR ",(0,t.jsx)("span",{children:"✦"})]})]})}),(0,t.jsx)("section",{className:"sec-historia",id:"historia",children:(0,t.jsxs)("div",{className:"module",children:[(0,t.jsxs)("div",{className:"module-canvas-wrap",children:[(0,t.jsx)("div",{className:"canvas-glow",style:{background:"radial-gradient(var(--pink),transparent 70%)"}}),(0,t.jsx)("canvas",{id:"c1"})]}),(0,t.jsxs)("div",{className:"module-text",children:[(0,t.jsx)("p",{className:"mod-num mono",children:"01 / 03"}),(0,t.jsx)("p",{className:"mod-tag mono",style:{color:"var(--pink)"},children:"EJE_CULTURAL"}),(0,t.jsxs)("h2",{className:"mod-title",children:["HISTORIA",(0,t.jsx)("br",{}),(0,t.jsx)("span",{className:"grad-text",children:"VIVA VR"})]}),(0,t.jsx)("p",{className:"mod-desc",children:"Módulo educativo inmersivo que revitaliza la enseñanza de la historia salvadoreña."}),(0,t.jsxs)("button",{onClick:()=>d("HISTORIA VIVA VR"),className:"mod-launch-btn",children:["INICIAR JUEGO ",(0,t.jsx)("span",{className:"btn-arrow",children:"→"})]})]}),(0,t.jsx)("div",{className:"atx-section-nav-anchor",onClick:()=>c("svirtual"),children:"SIGUIENTE EJE [02] ↓"})]})}),(0,t.jsx)("div",{className:"grad-line"}),(0,t.jsx)("section",{className:"sec-svirtual",id:"svirtual",children:(0,t.jsxs)("div",{className:"module reverse",children:[(0,t.jsxs)("div",{className:"module-canvas-wrap",children:[(0,t.jsx)("div",{className:"canvas-glow",style:{background:"radial-gradient(var(--orange),transparent 70%)"}}),(0,t.jsx)("canvas",{id:"c2"})]}),(0,t.jsxs)("div",{className:"module-text",children:[(0,t.jsx)("p",{className:"mod-num mono",children:"02 / 03"}),(0,t.jsx)("p",{className:"mod-tag mono",style:{color:"var(--orange)"},children:"EJE_TURISMO"}),(0,t.jsxs)("h2",{className:"mod-title",children:["SVIRTUAL",(0,t.jsx)("br",{}),(0,t.jsx)("span",{className:"grad-text",children:"TOURS"})]}),(0,t.jsx)("p",{className:"mod-desc",children:"Dinamiza la economía mediante turismo digital guiado por entornos interactivos."}),(0,t.jsxs)("button",{onClick:()=>d("SVIRTUAL TOURS"),className:"mod-launch-btn",children:["INICIAR JUEGO ",(0,t.jsx)("span",{className:"btn-arrow",children:"→"})]})]}),(0,t.jsx)("div",{className:"atx-section-nav-anchor",onClick:()=>c("mente"),children:"SIGUIENTE EJE [03] ↓"})]})}),(0,t.jsx)("div",{className:"grad-line"}),(0,t.jsx)("section",{className:"sec-mente",id:"mente",children:(0,t.jsxs)("div",{className:"module",children:[(0,t.jsxs)("div",{className:"module-canvas-wrap",children:[(0,t.jsx)("div",{className:"canvas-glow",style:{background:"radial-gradient(var(--yellow),transparent 70%)"}}),(0,t.jsx)("canvas",{id:"c3"})]}),(0,t.jsxs)("div",{className:"module-text",children:[(0,t.jsx)("p",{className:"mod-num mono",children:"03 / 03"}),(0,t.jsx)("p",{className:"mod-tag mono",style:{color:"var(--yellow)"},children:"EJE_SALUD_MENTAL"}),(0,t.jsxs)("h2",{className:"mod-title",children:["MENTE",(0,t.jsx)("span",{className:"grad-text",children:"LIBRE"}),(0,t.jsx)("br",{}),"VR"]}),(0,t.jsx)("p",{className:"mod-desc",children:"Entornos virtuales controlados y adaptativos para el apoyo terapéutico."}),(0,t.jsxs)("button",{onClick:()=>d("MENTELIBRE VR"),className:"mod-launch-btn",children:["INICIAR JUEGO ",(0,t.jsx)("span",{className:"btn-arrow",children:"→"})]})]}),(0,t.jsx)("div",{className:"atx-section-nav-anchor",onClick:()=>c("historia"),children:"VOLVER AL INICIO [↑]"})]})}),(0,t.jsxs)("footer",{className:"atx-footer",children:[(0,t.jsxs)("div",{className:"atx-footer-inner",children:[(0,t.jsxs)("div",{className:"atx-footer-brand",children:[(0,t.jsx)("span",{className:"footer-logo",children:"ATHERNIX"}),(0,t.jsx)("p",{children:"NEO VORTEX LABS · EL SALVADOR · 2026"})]}),(0,t.jsx)("div",{className:"atx-footer-links",children:(0,t.jsxs)("div",{className:"atx-footer-col",children:[(0,t.jsx)("h4",{children:"MÓDULOS"}),(0,t.jsx)("a",{onClick:()=>c("historia"),children:"HISTORIA VIVA"}),(0,t.jsx)("a",{onClick:()=>c("svirtual"),children:"SVIRTUAL TOURS"}),(0,t.jsx)("a",{onClick:()=>c("mente"),children:"MENTELIBRE VR"})]})})]}),(0,t.jsx)("div",{className:"atx-footer-bottom",children:(0,t.jsx)("span",{children:"© 2026 ATHERNIX · TODOS LOS DERECHOS RESERVADOS"})})]}),e&&(0,t.jsxs)("div",{className:"atx-game-overlay",children:[(0,t.jsxs)("div",{className:"atx-game-header",children:[(0,t.jsxs)("div",{className:"game-title-panel",children:["NEXUS_CORE // MÓDULO CORRIENDO: ",(0,t.jsx)("span",{children:i})]}),(0,t.jsx)("button",{className:"atx-back-btn",onClick:()=>{n(!1),document.body.style.overflow="auto"},children:"← REGRESAR A MÓDULOS"})]}),(0,t.jsx)("div",{className:"atx-iframe-wrapper",children:(0,t.jsx)(o,{})})]})]})}],66893)}]);