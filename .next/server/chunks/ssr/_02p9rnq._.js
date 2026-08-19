module.exports=[147283,(a,b,c)=>{b.exports=a.r(496665)},288376,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.useCanvasIdentifier=void 0;var d=a.r(572131);c.useCanvasIdentifier=function(a){var b=(0,d.useState)(0),c=b[0],e=b[1],f=(0,d.useCallback)(function(){e(function(a){return a+1})},[]);return void 0!==a?[a,f]:[(0,d.useMemo)(function(){return"react-unity-webgl-canvas-0"},[c]),f]}},569013,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.isBrowserEnvironment=void 0,c.isBrowserEnvironment=!1},171339,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.useUnityLoader=void 0;var d=a.r(572131),e=a.r(569013);c.useUnityLoader=function(a){var b=(0,d.useState)("Loading"),c=b[0],f=b[1];return(0,d.useEffect)(function(){if(!1!==e.isBrowserEnvironment){if(null===a)return void f("Idle");var b=window.document.querySelector('script[src="'.concat(a,'"]'));null===b?((b=window.document.createElement("script")).type="text/javascript",b.src=a,b.async=!0,b.setAttribute("data-status","loading"),window.document.body.appendChild(b),b.addEventListener("load",function(){return null==b?void 0:b.setAttribute("data-status","loaded")}),b.addEventListener("error",function(){return null==b?void 0:b.setAttribute("data-status","error")})):f("loaded"===b.getAttribute("data-status")?"Loaded":"Error");var c=function(a){return f("load"===a.type?"Loaded":"Error")};return b.addEventListener("load",c),b.addEventListener("error",c),function(){null!==b&&(b.removeEventListener("load",c),b.removeEventListener("error",c),b.remove())}}},[a]),c}},545641,(a,b,c)=>{"use strict";var d=a.e&&a.e.__awaiter||function(a,b,c,d){return new(c||(c=Promise))(function(e,f){function g(a){try{i(d.next(a))}catch(a){f(a)}}function h(a){try{i(d.throw(a))}catch(a){f(a)}}function i(a){var b;a.done?e(a.value):((b=a.value)instanceof c?b:new c(function(a){a(b)})).then(g,h)}i((d=d.apply(a,b||[])).next())})},e=a.e&&a.e.__generator||function(a,b){var c,d,e,f={label:0,sent:function(){if(1&e[0])throw e[1];return e[1]},trys:[],ops:[]},g=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return g.next=h(0),g.throw=h(1),g.return=h(2),"function"==typeof Symbol&&(g[Symbol.iterator]=function(){return this}),g;function h(h){return function(i){var j=[h,i];if(c)throw TypeError("Generator is already executing.");for(;g&&(g=0,j[0]&&(f=0)),f;)try{if(c=1,d&&(e=2&j[0]?d.return:j[0]?d.throw||((e=d.return)&&e.call(d),0):d.next)&&!(e=e.call(d,j[1])).done)return e;switch(d=0,e&&(j=[2&j[0],e.value]),j[0]){case 0:case 1:e=j;break;case 4:return f.label++,{value:j[1],done:!1};case 5:f.label++,d=j[1],j=[0];continue;case 7:j=f.ops.pop(),f.trys.pop();continue;default:if(!(e=(e=f.trys).length>0&&e[e.length-1])&&(6===j[0]||2===j[0])){f=0;continue}if(3===j[0]&&(!e||j[1]>e[0]&&j[1]<e[3])){f.label=j[1];break}if(6===j[0]&&f.label<e[1]){f.label=e[1],e=j;break}if(e&&f.label<e[2]){f.label=e[2],f.ops.push(j);break}e[2]&&f.ops.pop(),f.trys.pop();continue}j=b.call(a,f)}catch(a){j=[6,a],d=0}finally{c=e=0}if(5&j[0])throw j[1];return{value:j[0]?j[1]:void 0,done:!0}}}};Object.defineProperty(c,"__esModule",{value:!0}),c.Unity=void 0;var f=a.r(572131),g=a.r(288376),h=a.r(171339);c.Unity=(0,f.forwardRef)(function(a,b){var c=(0,f.useState)(null),i=c[0],j=c[1],k=(0,f.useState)(null),l=k[0],m=k[1],n=(0,g.useCanvasIdentifier)(a.id),o=n[0],p=n[1],q=(0,h.useUnityLoader)(a.unityProvider.loaderUrl),r=(0,f.useCallback)(function(b){a.unityProvider.setLoadingProgression(b),1===b&&a.unityProvider.setIsLoaded(!0)},[a.unityProvider]);return(0,f.useEffect)(function(){return d(void 0,void 0,void 0,function(){var b,c,d,f,g;return e(this,function(e){switch(e.label){case 0:if(!i||l||"Loaded"!==q)return[2];console.log("React Unity WebGL: Initializing Unity instance..."),a.unityProvider.setUnityInstance(null),m(null),a.unityProvider.setLoadingProgression(0),null==(g=(f=a.unityProvider).setIsLoaded)||g.call(f,!1),a.unityProvider.setInitialisationError(void 0),p(),Object.keys(b={companyName:a.unityProvider.companyName,productName:a.unityProvider.productName,productVersion:a.unityProvider.productVersion,dataUrl:a.unityProvider.dataUrl,frameworkUrl:a.unityProvider.frameworkUrl,codeUrl:a.unityProvider.codeUrl,workerUrl:a.unityProvider.workerUrl,memoryUrl:a.unityProvider.memoryUrl,symbolsUrl:a.unityProvider.symbolsUrl,streamingAssetsUrl:a.unityProvider.streamingAssetsUrl,devicePixelRatio:a.devicePixelRatio,webglContextAttributes:a.unityProvider.webglContextAttributes,cacheControl:a.unityProvider.cacheControl,autoSyncPersistentDataPath:a.unityProvider.autoSyncPersistentDataPath,matchWebGLToCanvasSize:a.matchWebGLToCanvasSize,disabledCanvasEvents:a.disabledCanvasEvents,showBanner:a.unityProvider.showBanner,print:a.unityProvider.print,printErr:a.unityProvider.printErr}).forEach(function(a){(null===b[a]||void 0===b[a])&&delete b[a]}),e.label=1;case 1:return e.trys.push([1,3,,4]),[4,window.createUnityInstance(i,b,r)];case 2:return m(c=e.sent()),a.unityProvider.setUnityInstance(c),[3,4];case 3:return console.error("React Unity WebGL: Error initializing Unity instance:",d=e.sent()),a.unityProvider.setInitialisationError(d),[3,4];case 4:return[2]}})}),function(){d(void 0,void 0,void 0,function(){var b,c,d;return e(this,function(e){switch(e.label){case 0:if(!l||!i)return[2];return console.log("React Unity WebGL: Detaching Unity instance..."),a.unityProvider.setUnityInstance(null),m(null),a.unityProvider.setLoadingProgression(0),null==(d=(c=a.unityProvider).setIsLoaded)||d.call(c,!1),a.unityProvider.setInitialisationError(void 0),(b=document.createElement("canvas")).id=i.id,b.setAttribute("react-unity-webgl-role","cleanup"),b.style.display="none",document.body.appendChild(b),l.Module.canvas=b,m(null),[4,l.Quit()];case 1:return e.sent(),document.body.removeChild(b),[2]}})})}},[i,l,q,a.unityProvider]),(0,f.useImperativeHandle)(b,function(){return i}),(0,f.createElement)("canvas",{ref:j,id:o,style:a.style,className:a.className,tabIndex:a.tabIndex})})},515879,(a,b,c)=>{"use strict";var d=a.e&&a.e.__spreadArray||function(a,b,c){if(c||2==arguments.length)for(var d,e=0,f=b.length;e<f;e++)!d&&e in b||(d||(d=Array.prototype.slice.call(b,0,e)),d[e]=b[e]);return a.concat(d||Array.prototype.slice.call(b))};Object.defineProperty(c,"__esModule",{value:!0}),c.useEventSystem=void 0;var e=a.r(572131),f=a.r(569013),g=[];!0===f.isBrowserEnvironment&&(window.dispatchReactUnityEvent=function(a){for(var b=[],c=1;c<arguments.length;c++)b[c-1]=arguments[c];var e=void 0;return g.forEach(function(c){e=c.apply(void 0,d([a],b,!1))}),e}),c.useEventSystem=function(){var a=(0,e.useRef)([]),b=(0,e.useCallback)(function(b,c){a.current=d(d([],a.current,!0),[{eventName:b,callback:c}],!1)},[a]),c=(0,e.useCallback)(function(b,c){a.current=a.current.filter(function(a){return a.eventName!==b&&a.callback!==c})},[a]),f=(0,e.useCallback)(function(b){for(var c=[],d=1;d<arguments.length;d++)c[d-1]=arguments[d];var e=a.current.find(function(a){return a.eventName===b});if(void 0!==e)return e.callback.apply(e,c)},[a]);return(0,e.useEffect)(function(){return g.push(f),function(){g.splice(g.indexOf(f),1)}},[f]),{addEventListener:b,removeEventListener:c}}},789106,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.useUnityContext=void 0;var d=a.r(572131),e=a.r(515879);c.useUnityContext=function(a){var b=(0,d.useState)(null),c=b[0],f=b[1],g=(0,d.useState)(0),h=g[0],i=g[1],j=(0,d.useState)(!1),k=j[0],l=j[1],m=(0,d.useState)(),n=m[0],o=m[1],p=(0,e.useEventSystem)(),q=(0,d.useRef)({companyName:a.companyName,productName:a.productName,productVersion:a.productVersion,codeUrl:a.codeUrl,dataUrl:a.dataUrl,frameworkUrl:a.frameworkUrl,loaderUrl:a.loaderUrl,memoryUrl:a.memoryUrl,symbolsUrl:a.symbolsUrl,streamingAssetsUrl:a.streamingAssetsUrl,workerUrl:a.workerUrl,webglContextAttributes:a.webglContextAttributes,cacheControl:a.cacheControl,autoSyncPersistentDataPath:a.autoSyncPersistentDataPath,showBanner:a.showBanner,print:a.print,printErr:a.printErr,setUnityInstance:f,setLoadingProgression:i,setIsLoaded:l,setInitialisationError:o}),r=(0,d.useCallback)(function(a){return null==c?void 0:c.SetFullscreen(+!!a)},[c]),s=(0,d.useCallback)(function(){var a;return null==(a=null==c?void 0:c.Module.canvas)?void 0:a.requestPointerLock()},[c]),t=(0,d.useCallback)(function(a,b,d){return null==c?void 0:c.SendMessage(a,b,d)},[c]),u=(0,d.useCallback)(function(a,b){var d;return null==(d=null==c?void 0:c.Module.canvas)?void 0:d.toDataURL(a,b)},[c]),v=(0,d.useCallback)(function(){var a;return null!=(a=null==c?void 0:c.Quit())?a:Promise.reject()},[c]),w=(0,d.useCallback)(function(){var a;return null==(a=null==c?void 0:c.GetMetricsInfo)?void 0:a.call(c)},[c]);return{unityProvider:q.current,loadingProgression:h,isLoaded:k,initialisationError:n,requestFullscreen:r,requestPointerLock:s,sendMessage:t,takeScreenshot:u,unload:v,getMetricsInfo:w,addEventListener:p.addEventListener,removeEventListener:p.removeEventListener,UNSAFE__unityInstance:c}}},699040,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.useUnityMetricsInfo=void 0;var d=a.r(572131);c.useUnityMetricsInfo=function(a,b){var c=(0,d.useState)({}),e=c[0],f=c[1];return(0,d.useEffect)(function(){var c=setInterval(function(){var b=a();void 0!==b&&f(b)},b.interval||1e3);return function(){clearInterval(c)}},[a,b.interval]),e}},574093,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),c.useUnityMetricsInfo=c.useUnityContext=c.Unity=void 0;var d=a.r(545641);Object.defineProperty(c,"Unity",{enumerable:!0,get:function(){return d.Unity}});var e=a.r(789106);Object.defineProperty(c,"useUnityContext",{enumerable:!0,get:function(){return e.useUnityContext}});var f=a.r(699040);Object.defineProperty(c,"useUnityMetricsInfo",{enumerable:!0,get:function(){return f.useUnityMetricsInfo}})},941490,a=>{"use strict";var b=a.i(187924),c=a.i(572131),d=a.i(147283),e=a.i(574093);function f(){let{unityProvider:a,isLoaded:c,loadingProgression:d}=(0,e.useUnityContext)({loaderUrl:"/Unity/Build/V2.5-Build.loader.js",dataUrl:"/Unity/Build/V2.5-Build.data.br",frameworkUrl:"/Unity/Build/V2.5-Build.framework.js.br",codeUrl:"/Unity/Build/V2.5-Build.wasm.br",streamingAssetsUrl:"StreamingAssets",companyName:"DefaultCompany",productName:"Athernix",productVersion:"0.1.0"});return(0,b.jsxs)("div",{className:"relative w-full h-full flex justify-center items-center bg-black overflow-hidden",children:[!c&&(0,b.jsx)("div",{className:"absolute z-10 flex flex-col items-center",children:(0,b.jsx)("div",{className:"w-[200px] h-[10px] rounded-[5px] mt-[10px]",style:{background:"rgba(255,255,255,0.2)"},children:(0,b.jsx)("div",{className:"h-full rounded-[5px] transition-all duration-200",style:{width:`${Math.round(100*d)}%`,background:"#FF006E"}})})}),(0,b.jsx)(e.Unity,{unityProvider:a,style:{width:"100%",height:"100%",background:"#000"},tabIndex:-1})]})}a.s(["default",0,function(){let[a,e]=(0,c.useState)(!1),[g,h]=(0,c.useState)(""),i=(0,c.useRef)(!1),j=a=>{let b=document.getElementById(a);b&&b.scrollIntoView({behavior:"smooth"})},k=a=>{h(a),e(!0),document.body.style.overflow="hidden"};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(d.default,{src:"https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js",onLoad:()=>{!i.current&&window.THREE&&(i.current=!0,a("c1",{count:28e3,camZ:9,size:.038,opacity:.92,colA:"#FF006E",colB:"#FF6B00",colC:"#FFD700",place(a,b,c){let d,e,f,g=a/c;if(g<.55){let a=Math.floor(6*Math.random())/6,b=3.2*(1-.7*a);d=(Math.random()-.5)*b*2,e=-2.2+4*a+(Math.random()-.5)*.12,f=(Math.random()-.5)*b*1.4}else if(g<.78){let a=Math.random()*Math.PI,b=1.5+(Math.random()-.5)*.22;d=Math.cos(a)*b,e=1.8+Math.sin(a)*b,f=(Math.random()-.5)*.5}else{let a=2+2.5*Math.random(),b=Math.random()*Math.PI*2,c=Math.acos(2*Math.random()-1);d=a*Math.sin(c)*Math.cos(b),e=a*Math.sin(c)*Math.sin(b)*.6,f=a*Math.cos(c)*.6}b[3*a]=d,b[3*a+1]=e,b[3*a+2]=f},animate(a,b,c,d,e){for(let f=0;f<e;f++){let e=d[3*f],g=d[3*f+1];b[3*f]=c[3*f]+.04*Math.sin(.5*a+e),b[3*f+1]=c[3*f+1]+.04*Math.cos(.4*a+g),b[3*f+2]=c[3*f+2]+.025*Math.sin(.6*a+e)}}}),a("c2",{count:26e3,camZ:8.5,size:.036,opacity:.9,colA:"#FF6B00",colB:"#FFD700",colC:"#FF006E",place(a,b,c){let d,e,f,g=a/c;if(g<.65){let a=2.8+(Math.random()-.5)*.18,b=Math.random()*Math.PI*2,c=Math.acos(2*Math.random()-1);d=a*Math.sin(c)*Math.cos(b),e=a*Math.sin(c)*Math.sin(b),f=a*Math.cos(c)}else if(g<.82){let a=(Math.random()-.5)*Math.PI,b=Math.random()*Math.PI*2;d=2.82*Math.cos(a)*Math.cos(b),e=2.82*Math.sin(a),f=2.82*Math.cos(a)*Math.sin(b)}else{let a=3.6+.8*Math.random(),b=Math.random()*Math.PI*2;d=Math.cos(b)*a,e=(Math.random()-.5)*1.2,f=Math.sin(b)*a}b[3*a]=d,b[3*a+1]=e,b[3*a+2]=f},animate(a,b,c,d,e){for(let f=0;f<e;f++){let e=d[3*f],g=d[3*f+1],h=d[3*f+2],i=c[3*f]*c[3*f]+c[3*f+2]*c[3*f+2];if(i>12){let d=Math.atan2(c[3*f+2],c[3*f])+.18*a,e=Math.sqrt(i);b[3*f]=Math.cos(d)*e,b[3*f+2]=Math.sin(d)*e,b[3*f+1]=c[3*f+1]+.05*Math.sin(.6*a+g)}else b[3*f]=c[3*f]+.03*Math.sin(.4*a+e),b[3*f+1]=c[3*f+1]+.03*Math.cos(.35*a+g),b[3*f+2]=c[3*f+2]+.02*Math.sin(.5*a+h)}}}),a("c3",{count:3e4,camZ:9,size:.034,opacity:.88,colA:"#FFD700",colB:"#FF006E",colC:"#FF6B00",place(a,b,c){let d,e,f,g=a/c;if(g<.38){let a=Math.random()*Math.PI*2,b=Math.acos(2*Math.random()-1),c=1.6+.28*Math.sin(5*a);d=-1.1+c*Math.sin(b)*Math.cos(a)*.75,e=c*Math.sin(b)*Math.sin(a)*.62,f=c*Math.cos(b)*.82}else if(g<.76){let a=Math.random()*Math.PI*2,b=Math.acos(2*Math.random()-1),c=1.6+.28*Math.sin(5*a);d=1.1-c*Math.sin(b)*Math.cos(a)*.75,e=c*Math.sin(b)*Math.sin(a)*.62,f=c*Math.cos(b)*.82}else{let a=Math.random(),b=a*Math.PI*12,c=2.2+1.2*a,g=(Math.random()-.5)*.3;d=Math.cos(b)*(c+g),e=(a-.5)*4.5+(Math.random()-.5)*.2,f=Math.sin(b)*(c+g)}b[3*a]=d,b[3*a+1]=e,b[3*a+2]=f},animate(a,b,c,d,e){for(let f=0;f<e;f++){let g=d[3*f],h=d[3*f+1],i=d[3*f+2];if(f/e>.76){let d=1+.06*Math.sin(1.2*a+i);b[3*f]=c[3*f]*d,b[3*f+1]=c[3*f+1]+.08*Math.sin(.5*a+g),b[3*f+2]=c[3*f+2]*d}else{let d=1+.025*Math.sin(.8*a);b[3*f]=c[3*f]*d+.03*Math.sin(.5*a+g),b[3*f+1]=c[3*f+1]*d+.03*Math.cos(.4*a+h),b[3*f+2]=c[3*f+2]*d+.02*Math.sin(.6*a+i)}}}}));function a(a,b){let c=document.getElementById(a);if(!c)return;let d=c.offsetWidth||520,e=c.offsetHeight||520,f=new window.THREE.WebGLRenderer({canvas:c,antialias:!0,alpha:!0});f.setSize(d,e),f.setPixelRatio(Math.min(window.devicePixelRatio,2)),f.setClearColor(0,0);let g=new window.THREE.Scene,h=new window.THREE.PerspectiveCamera(60,d/e,.1,200);h.position.set(0,0,b.camZ||8);let i=b.count||25e3,j=new Float32Array(3*i),k=new Float32Array(3*i),l=new Float32Array(3*i),m=new window.THREE.Color(b.colA),n=new window.THREE.Color(b.colB),o=new window.THREE.Color(b.colC);for(let a=0;a<i;a++){let c,d,e;b.place(a,j,i);let f=a/i;if(f<.5){let a=2*f;c=m.r+(n.r-m.r)*a,d=m.g+(n.g-m.g)*a,e=m.b+(n.b-m.b)*a}else{let a=(f-.5)*2;c=n.r+(o.r-n.r)*a,d=n.g+(o.g-n.g)*a,e=n.b+(o.b-n.b)*a}k[3*a]=c,k[3*a+1]=d,k[3*a+2]=e,l[3*a]=100*Math.random(),l[3*a+1]=100*Math.random(),l[3*a+2]=Math.random()*Math.PI*2}let p=new window.THREE.BufferGeometry;p.setAttribute("position",new window.THREE.BufferAttribute(j.slice(),3)),p.setAttribute("color",new window.THREE.BufferAttribute(k,3));let q=new window.THREE.PointsMaterial({size:b.size||.04,vertexColors:!0,transparent:!0,opacity:b.opacity||.9,blending:window.THREE.AdditiveBlending,depthWrite:!1,sizeAttenuation:!0}),r=new window.THREE.Points(p,q),s=new window.THREE.Group;s.add(r),g.add(s);let t=j.slice(),u=0,v=0;c.addEventListener("mousemove",a=>{let b=c.getBoundingClientRect();u=((a.clientX-b.left)/b.width-.5)*2,v=-(2*((a.clientY-b.top)/b.height-.5))});let w=new window.THREE.Clock;!function a(){requestAnimationFrame(a);let c=w.getElapsedTime(),d=p.attributes.position.array;b.animate&&b.animate(c,d,t,l,i),p.attributes.position.needsUpdate=!0,s.rotation.y+=.003,s.rotation.x+=.001,s.rotation.y+=.002*u,s.rotation.x+=.001*v,f.render(g,h)}(),new ResizeObserver(()=>{let a=c.offsetWidth,b=c.offsetHeight;f.setSize(a,b),h.aspect=a/b,h.updateProjectionMatrix()}).observe(c)}}}),(0,b.jsx)("style",{dangerouslySetInnerHTML:{__html:`
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
      `}}),(0,b.jsxs)("nav",{className:"atx-nav",children:[(0,b.jsx)("a",{href:"#",className:"atx-logo",children:"ATHERNIX"}),(0,b.jsxs)("ul",{className:"atx-links",children:[(0,b.jsxs)("li",{className:"atx-has-drop",children:[(0,b.jsxs)("button",{className:"atx-drop-btn",children:["MÓDULOS ",(0,b.jsx)("span",{className:"atx-chevron",children:"▾"})]}),(0,b.jsxs)("div",{className:"atx-dropdown",children:[(0,b.jsxs)("a",{onClick:()=>j("historia"),children:[(0,b.jsx)("span",{className:"dd-dot",style:{background:"#FF006E"}}),"HISTORIA_VIVA_VR"]}),(0,b.jsxs)("a",{onClick:()=>j("svirtual"),children:[(0,b.jsx)("span",{className:"dd-dot",style:{background:"#FF6B00"}}),"SVIRTUAL_TOURS"]}),(0,b.jsxs)("a",{onClick:()=>j("mente"),children:[(0,b.jsx)("span",{className:"dd-dot",style:{background:"#FFD700"}}),"MENTELIBRE_VR"]})]})]}),(0,b.jsx)("li",{children:(0,b.jsx)("a",{className:"atx-active",children:"ACERCA DE NOSOTROS"})})]}),(0,b.jsxs)("div",{className:"atx-right",children:[(0,b.jsx)("a",{href:"#",className:"atx-cta-sec",children:"INICIAR SESIÓN"}),(0,b.jsx)("a",{href:"#",className:"atx-cta-pri",children:"REGISTRO"})]})]}),(0,b.jsxs)("section",{className:"hero-intro",children:[(0,b.jsx)("p",{className:"eyebrow",children:"[ PLATAFORMA_XR // EL_SALVADOR // 2026 ]"}),(0,b.jsxs)("h1",{children:[(0,b.jsx)("span",{className:"line1",children:"MÓDULOS"}),(0,b.jsx)("span",{className:"line2",children:"ATHERNIX"})]}),(0,b.jsx)("p",{className:"sub",children:"TRES EJES · UNA PLATAFORMA · IMPACTO REAL"}),(0,b.jsxs)("div",{className:"atx-hero-indicators",children:[(0,b.jsxs)("div",{className:"ind-item",onClick:()=>j("historia"),children:[(0,b.jsx)("span",{className:"ind-arrow",children:"↓"})," 01_HISTORIA"]}),(0,b.jsxs)("div",{className:"ind-item",onClick:()=>j("svirtual"),children:[(0,b.jsx)("span",{className:"ind-arrow",children:"↓"})," 02_TURISMO"]}),(0,b.jsxs)("div",{className:"ind-item",onClick:()=>j("mente"),children:[(0,b.jsx)("span",{className:"ind-arrow",children:"↓"})," 03_SALUD"]})]}),(0,b.jsxs)("div",{className:"scroll-down",onClick:()=>j("historia"),children:[(0,b.jsx)("div",{className:"s-line"}),(0,b.jsx)("span",{className:"s-lbl",children:"EXPLORAR"})]})]}),(0,b.jsx)("div",{className:"grad-line"}),(0,b.jsx)("div",{className:"mq",children:(0,b.jsxs)("div",{className:"mq-t",children:[(0,b.jsxs)("span",{className:"mqi",children:["HISTORIA VIVA VR ",(0,b.jsx)("span",{children:"✦"})]}),(0,b.jsxs)("span",{className:"mqi",children:["SVIRTUAL TOURS ",(0,b.jsx)("span",{children:"✦"})]}),(0,b.jsxs)("span",{className:"mqi",children:["MENTELIBRE VR ",(0,b.jsx)("span",{children:"✦"})]}),(0,b.jsxs)("span",{className:"mqi",children:["EJE CULTURAL ",(0,b.jsx)("span",{children:"✦"})]}),(0,b.jsxs)("span",{className:"mqi",children:["EJE TURISMO ",(0,b.jsx)("span",{children:"✦"})]}),(0,b.jsxs)("span",{className:"mqi",children:["ATHERNIX XR ",(0,b.jsx)("span",{children:"✦"})]})]})}),(0,b.jsx)("section",{className:"sec-historia",id:"historia",children:(0,b.jsxs)("div",{className:"module",children:[(0,b.jsxs)("div",{className:"module-canvas-wrap",children:[(0,b.jsx)("div",{className:"canvas-glow",style:{background:"radial-gradient(var(--pink),transparent 70%)"}}),(0,b.jsx)("canvas",{id:"c1"})]}),(0,b.jsxs)("div",{className:"module-text",children:[(0,b.jsx)("p",{className:"mod-num mono",children:"01 / 03"}),(0,b.jsx)("p",{className:"mod-tag mono",style:{color:"var(--pink)"},children:"EJE_CULTURAL"}),(0,b.jsxs)("h2",{className:"mod-title",children:["HISTORIA",(0,b.jsx)("br",{}),(0,b.jsx)("span",{className:"grad-text",children:"VIVA VR"})]}),(0,b.jsx)("p",{className:"mod-desc",children:"Módulo educativo inmersivo que revitaliza la enseñanza de la historia salvadoreña."}),(0,b.jsxs)("button",{onClick:()=>k("HISTORIA VIVA VR"),className:"mod-launch-btn",children:["INICIAR JUEGO ",(0,b.jsx)("span",{className:"btn-arrow",children:"→"})]})]}),(0,b.jsx)("div",{className:"atx-section-nav-anchor",onClick:()=>j("svirtual"),children:"SIGUIENTE EJE [02] ↓"})]})}),(0,b.jsx)("div",{className:"grad-line"}),(0,b.jsx)("section",{className:"sec-svirtual",id:"svirtual",children:(0,b.jsxs)("div",{className:"module reverse",children:[(0,b.jsxs)("div",{className:"module-canvas-wrap",children:[(0,b.jsx)("div",{className:"canvas-glow",style:{background:"radial-gradient(var(--orange),transparent 70%)"}}),(0,b.jsx)("canvas",{id:"c2"})]}),(0,b.jsxs)("div",{className:"module-text",children:[(0,b.jsx)("p",{className:"mod-num mono",children:"02 / 03"}),(0,b.jsx)("p",{className:"mod-tag mono",style:{color:"var(--orange)"},children:"EJE_TURISMO"}),(0,b.jsxs)("h2",{className:"mod-title",children:["SVIRTUAL",(0,b.jsx)("br",{}),(0,b.jsx)("span",{className:"grad-text",children:"TOURS"})]}),(0,b.jsx)("p",{className:"mod-desc",children:"Dinamiza la economía mediante turismo digital guiado por entornos interactivos."}),(0,b.jsxs)("button",{onClick:()=>k("SVIRTUAL TOURS"),className:"mod-launch-btn",children:["INICIAR JUEGO ",(0,b.jsx)("span",{className:"btn-arrow",children:"→"})]})]}),(0,b.jsx)("div",{className:"atx-section-nav-anchor",onClick:()=>j("mente"),children:"SIGUIENTE EJE [03] ↓"})]})}),(0,b.jsx)("div",{className:"grad-line"}),(0,b.jsx)("section",{className:"sec-mente",id:"mente",children:(0,b.jsxs)("div",{className:"module",children:[(0,b.jsxs)("div",{className:"module-canvas-wrap",children:[(0,b.jsx)("div",{className:"canvas-glow",style:{background:"radial-gradient(var(--yellow),transparent 70%)"}}),(0,b.jsx)("canvas",{id:"c3"})]}),(0,b.jsxs)("div",{className:"module-text",children:[(0,b.jsx)("p",{className:"mod-num mono",children:"03 / 03"}),(0,b.jsx)("p",{className:"mod-tag mono",style:{color:"var(--yellow)"},children:"EJE_SALUD_MENTAL"}),(0,b.jsxs)("h2",{className:"mod-title",children:["MENTE",(0,b.jsx)("span",{className:"grad-text",children:"LIBRE"}),(0,b.jsx)("br",{}),"VR"]}),(0,b.jsx)("p",{className:"mod-desc",children:"Entornos virtuales controlados y adaptativos para el apoyo terapéutico."}),(0,b.jsxs)("button",{onClick:()=>k("MENTELIBRE VR"),className:"mod-launch-btn",children:["INICIAR JUEGO ",(0,b.jsx)("span",{className:"btn-arrow",children:"→"})]})]}),(0,b.jsx)("div",{className:"atx-section-nav-anchor",onClick:()=>j("historia"),children:"VOLVER AL INICIO [↑]"})]})}),(0,b.jsxs)("footer",{className:"atx-footer",children:[(0,b.jsxs)("div",{className:"atx-footer-inner",children:[(0,b.jsxs)("div",{className:"atx-footer-brand",children:[(0,b.jsx)("span",{className:"footer-logo",children:"ATHERNIX"}),(0,b.jsx)("p",{children:"NEO VORTEX LABS · EL SALVADOR · 2026"})]}),(0,b.jsx)("div",{className:"atx-footer-links",children:(0,b.jsxs)("div",{className:"atx-footer-col",children:[(0,b.jsx)("h4",{children:"MÓDULOS"}),(0,b.jsx)("a",{onClick:()=>j("historia"),children:"HISTORIA VIVA"}),(0,b.jsx)("a",{onClick:()=>j("svirtual"),children:"SVIRTUAL TOURS"}),(0,b.jsx)("a",{onClick:()=>j("mente"),children:"MENTELIBRE VR"})]})})]}),(0,b.jsx)("div",{className:"atx-footer-bottom",children:(0,b.jsx)("span",{children:"© 2026 ATHERNIX · TODOS LOS DERECHOS RESERVADOS"})})]}),a&&(0,b.jsxs)("div",{className:"atx-game-overlay",children:[(0,b.jsxs)("div",{className:"atx-game-header",children:[(0,b.jsxs)("div",{className:"game-title-panel",children:["NEXUS_CORE // MÓDULO CORRIENDO: ",(0,b.jsx)("span",{children:g})]}),(0,b.jsx)("button",{className:"atx-back-btn",onClick:()=>{e(!1),document.body.style.overflow="auto"},children:"← REGRESAR A MÓDULOS"})]}),(0,b.jsx)("div",{className:"atx-iframe-wrapper",children:(0,b.jsx)(f,{})})]})]})}],941490)}];

//# sourceMappingURL=_02p9rnq._.js.map