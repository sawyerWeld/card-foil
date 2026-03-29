"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const l={foil:`repeating-linear-gradient(
    110deg,
    transparent 0%,
    rgba(255, 200, 50, 0.25) 8%,
    rgba(100, 220, 255, 0.18) 16%,
    rgba(200, 100, 255, 0.15) 24%,
    rgba(100, 255, 150, 0.18) 32%,
    rgba(255, 150, 50, 0.15) 40%,
    transparent 50%
  )`,etched:`repeating-linear-gradient(
    115deg,
    transparent 0%,
    rgba(255, 255, 255, 0.2) 10%,
    rgba(210, 220, 235, 0.18) 20%,
    rgba(170, 185, 205, 0.16) 30%,
    rgba(255, 255, 255, 0.12) 40%,
    transparent 52%
  )`,galaxy:`repeating-linear-gradient(
    105deg,
    transparent 0%,
    rgba(92, 64, 255, 0.26) 10%,
    rgba(67, 196, 255, 0.2) 18%,
    rgba(232, 100, 255, 0.18) 28%,
    rgba(54, 78, 184, 0.24) 38%,
    transparent 52%
  )`,"oil-slick":`repeating-linear-gradient(
    112deg,
    rgba(10, 10, 10, 0.04) 0%,
    rgba(255, 112, 67, 0.22) 10%,
    rgba(255, 214, 102, 0.16) 18%,
    rgba(67, 233, 123, 0.18) 28%,
    rgba(68, 160, 255, 0.2) 36%,
    rgba(170, 72, 255, 0.22) 44%,
    rgba(10, 10, 10, 0.04) 56%
  )`},c=2,p=15;function u(n){const t=Number(n);return Number.isFinite(t)?Math.min(Math.max(t,0),c):1}function d(n){return typeof getComputedStyle=="function"?getComputedStyle(n):null}class h{constructor(t,{finish:e="foil",intensity:i=1,tilt:s=!0,specular:r=!0,shimmer:a=!0}={}){if(!t)throw new TypeError("CardFoil requires a target element.");if(typeof document>"u")throw new Error("CardFoil can only run in a browser-like environment.");this.el=t,this.finish="foil",this.intensity=1,this.tilt=!0,this.specular=!0,this.shimmer=!0,this._initialStyle={position:t.style.position,display:t.style.display,transform:t.style.transform,transition:t.style.transition},this._addedHostClass=!1;const o=d(t);(!o||o.position==="static")&&(t.style.position="relative"),(!o||o.display==="inline")&&(t.style.display="inline-block"),t.classList&&(t.classList.add("cf-host"),this._addedHostClass=!0),this._foil=document.createElement("div"),this._foil.className="cf-overlay",t.appendChild(this._foil),this._spec=null,this._onMove=this._onMove.bind(this),this._onLeave=this._onLeave.bind(this),t.addEventListener("mousemove",this._onMove),t.addEventListener("mouseleave",this._onLeave),this.setFinish(e),this.setIntensity(i),this.setTilt(s),this.setSpecular(r),this.setShimmer(a)}_ensureSpecular(){return this._spec?this._spec:(this._spec=document.createElement("div"),this._spec.className="cf-specular",this.el.appendChild(this._spec),this._spec)}_getBaseTransform(){return this._initialStyle.transform||""}_applyTilt(t,e){const i=(e-.5)*-30,s=(t-.5)*(p*2),r=`perspective(600px) rotateX(${i}deg) rotateY(${s}deg)`,a=this._getBaseTransform();this.el.style.transform=a?`${a} ${r}`:r,this.el.style.transition="transform 0.05s linear"}_onMove(t){const e=this.el.getBoundingClientRect(),i=(t.clientX-e.left)/e.width,s=(t.clientY-e.top)/e.height;if(this._foil.style.backgroundPosition=`${i*100}% ${s*100}%`,this.tilt&&this._applyTilt(i,s),this.specular){const r=this._ensureSpecular();r.style.opacity="1",r.style.background=`radial-gradient(circle at ${i*100}% ${s*100}%, rgba(255,255,255,0.35) 0%, transparent 55%)`}}_onLeave(){this._foil.style.backgroundPosition="",this.tilt&&(this.el.style.transform=this._getBaseTransform(),this.el.style.transition="transform 0.4s ease"),this._spec&&(this._spec.style.opacity="0")}setFinish(t){const e=l[t]?t:this.finish;return this.finish=e,this._foil.style.setProperty("--cf-gradient",l[e]),this}setIntensity(t){return this.intensity=u(t),this._foil.style.opacity=String(this.intensity),this}setTilt(t){return this.tilt=!!t,this.tilt||(this.el.style.transform=this._getBaseTransform(),this.el.style.transition=this._initialStyle.transition),this}setSpecular(t){return this.specular=!!t,!this.specular&&this._spec&&(this._spec.style.opacity="0"),this.specular&&this._ensureSpecular(),this}setShimmer(t){return this.shimmer=!!t,this._foil.classList.toggle("cf-shimmer",this.shimmer),this}destroy(){var t;this.el.removeEventListener("mousemove",this._onMove),this.el.removeEventListener("mouseleave",this._onLeave),this._foil.remove(),(t=this._spec)==null||t.remove(),this._addedHostClass&&this.el.classList&&this.el.classList.remove("cf-host"),this.el.style.position=this._initialStyle.position,this.el.style.display=this._initialStyle.display,this.el.style.transform=this._initialStyle.transform,this.el.style.transition=this._initialStyle.transition}}exports.CardFoil=h;exports.default=h;
