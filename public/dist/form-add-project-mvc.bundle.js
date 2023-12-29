(()=>{"use strict";var e={183:(e,t,i)=>{i.d(t,{Z:()=>s});const s=class{constructor(){this.alertMessage=document.querySelector("#alert-message"),this.alertCloseBtn=document.querySelector("#alert-message-close-btn"),this.init()}init(){this.alertCloseBtn.addEventListener("click",(()=>{this.hideAlertMessage()}))}showAlertMessage(e){e||(e="Something went wrong."),this.alertMessage.querySelector(".alert-message-text").innerText=e,this.resetClass(this.alertMessage,"marginShake"),this.alertMessage.style.display="block"}hideAlertMessage(){this.alertMessage.style.display="none"}resetClass(e,t){e.classList.remove(t),setTimeout((()=>{e.classList.add(t)}),40)}}}},t={};function i(s){var r=t[s];if(void 0!==r)return r.exports;var o=t[s]={exports:{}};return e[s](o,o.exports,i),o.exports}i.d=(e,t)=>{for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e=i(183);class t{constructor(){this.editButton=document.querySelector("#edit-btn"),this.addProjectBtn=document.querySelector("#add-project-btn"),this.projectFormContainer=document.querySelector("#form-project-container"),this.projectFormCloseBtn=document.querySelector("#form-project-container-close"),this.projectForm=document.querySelector("#form-project"),this.linksContainer=document.querySelector(".link-row-container"),this.addLinkBtn=document.querySelector(".link-add-btn"),this.projectFormResetBtn=document.querySelector("#projectFormReset"),this.linkInputSample=document.querySelector("#new-link-input-sample"),this.removeLinkBtns=document.querySelectorAll(".link-remove-btn"),this.coverDisplay=document.querySelector("#form-project-cover-display"),this.coverImage=document.querySelector("#form-project-cover-image"),this.coverInput=document.querySelector("#form-project-cover-input"),this.projectLoadingDisplay=document.querySelector("#project-loading-indicator"),this.projectSubmitText=document.querySelector("#project-submit-text")}disableEditButton(){this.editButton.disabled=!0,this.editButton.classList.add("nav-edit-btn-disable")}enableEditButton(){this.editButton.disabled=!1,this.editButton.classList.remove("nav-edit-btn-disable")}showProjectForm(){this.projectFormContainer.style.display="block",this.disableEditButton()}hideProjectForm(){this.projectFormContainer.style.display="none",this.enableEditButton()}resetForm(){this.projectForm.reset(),this.projectForm.classList.remove("was-validated"),this.resetCoverImage()}addNewLink(){const e=this.linkInputSample.cloneNode(!0);e.classList.remove("none"),e.querySelectorAll("input").forEach((e=>{e.removeAttribute("disabled"),e.setAttribute("required","true")})),this.linksContainer.append(e),e.querySelector(".link-remove-btn").addEventListener("click",(e=>this.removeLinkRow(e)))}removeLinkRow(e){const t=e.target.closest(".link-row");t&&t.remove()}resetCoverImage(){this.coverImage.src="",this.coverImage.style.display="none"}previewImageOnInputChange(e,t){if(e.files&&e.files[0]){const i=new FileReader;i.onload=e=>{t.src=e.target.result,t.style.display="block"},i.readAsDataURL(e.files[0])}}}class s{constructor(e,t){this.view=e,this.model=t,this.init()}init(){this.alertMessage=new e.Z,this.view.projectForm.addEventListener("submit",(e=>this.handleFormSubmit(e,this.view.projectForm))),this.view.projectFormResetBtn.addEventListener("click",(()=>this.view.resetForm())),this.view.addProjectBtn.addEventListener("click",(()=>this.openForm())),this.view.projectFormCloseBtn.addEventListener("click",(()=>this.closeForm())),this.view.addLinkBtn.addEventListener("click",(()=>this.view.addNewLink())),this.view.removeLinkBtns.forEach((e=>{e.addEventListener("click",(e=>this.view.removeLinkRow(e)))})),this.view.coverDisplay.addEventListener("click",(()=>this.view.coverInput.click())),this.view.coverInput.addEventListener("change",(()=>this.previewCoverImage()))}openForm(){this.view.showProjectForm()}closeForm(){this.view.hideProjectForm(),this.view.resetForm(),this.alertMessage.hideAlertMessage()}handleFormSubmit(e,t){t.classList.add("was-validated"),e.preventDefault(),e.stopPropagation(),t.checkValidity()?(this.view.projectSubmitText.style.display="none",this.view.projectLoadingDisplay.style.display="flex",t.submit()):this.alertMessage.showAlertMessage("Missing form information.")}previewCoverImage(){this.view.previewImageOnInputChange(this.view.coverInput,this.view.coverImage)}}document.addEventListener("DOMContentLoaded",(()=>{const e=new t,i=new t;new s(i,e)}))})()})();