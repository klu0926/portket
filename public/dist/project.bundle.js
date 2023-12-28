(()=>{"use strict";var t={183:(t,e,s)=>{s.d(e,{Z:()=>i});const i=class{constructor(){this.alertMessage=document.querySelector("#alert-message"),this.alertCloseBtn=document.querySelector("#alert-message-close-btn"),this.init()}init(){this.alertCloseBtn.addEventListener("click",(()=>{this.hideAlertMessage()}))}showAlertMessage(t){t||(t="Something went wrong."),this.alertMessage.querySelector(".alert-message-text").innerText=t,this.resetClass(this.alertMessage,"marginShake"),this.alertMessage.style.display="block"}hideAlertMessage(){this.alertMessage.style.display="none"}resetClass(t,e){t.classList.remove(e),setTimeout((()=>{t.classList.add(e)}),40)}}}},e={};function s(i){var a=e[i];if(void 0!==a)return a.exports;var o=e[i]={exports:{}};return t[i](o,o.exports,s),o.exports}s.d=(t,e)=>{for(var i in e)s.o(e,i)&&!s.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t=s(183);class e{constructor(){this.visitUrl="/api/visits",this.projectData=document.querySelector("#project-data"),this.visitId=this.projectData.dataset.visit}async putVisit(){try{if(void 0===this.visitId)throw new Error("Cant not find visitId");const t={method:"PUT",headers:{"Content-Type":"application/json"},body:""},e=`${this.visitUrl}/${this.visitId}`,s=await fetch(e,t);if(!s)throw s;return await s.json()}catch(t){return console.error("put visit error:",t),t}}}class i{constructor(){this.projects=document.querySelectorAll(".project-block"),this.socials=document.querySelectorAll(".social-box"),this.viewCountSpan=document.querySelector("#visit-count-span")}startFadeIn(){this.projects.forEach(((t,e)=>{t.style.animationDelay=.2*e+"s"})),this.socials.forEach(((t,e)=>{t.style.animationDelay=.2*e+"s"}))}updateViewCount(t){this.viewCountSpan.textContent=t}}class a{constructor(t,e){this.view=t,this.model=e,this.init()}init(){this.alertMessage=new t.Z,this.view.startFadeIn(),this.increaseVisitCount()}async increaseVisitCount(){try{const t=await this.model.putVisit();t.ok?this.view.updateViewCount(t.data.count):this.alertMessage.showAlertMessage(`${t.action}: ${t.message}`)}catch(t){console.log(t)}}}document.addEventListener("DOMContentLoaded",(()=>{const t=new i,s=new e;new a(t,s)}))})()})();