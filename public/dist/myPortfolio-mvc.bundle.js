(()=>{"use strict";var t={183:(t,e,i)=>{i.d(e,{Z:()=>s});const s=class{constructor(){this.alertMessage=document.querySelector("#alert-message"),this.alertCloseBtn=document.querySelector("#alert-message-close-btn"),this.init()}init(){this.alertCloseBtn.addEventListener("click",(()=>{this.hideAlertMessage()}))}showAlertMessage(t,e){t||(t="Something went wrong."),this.alertMessage.querySelector(".alert-message-text").innerText=t,this.resetClass(this.alertMessage,"marginShake"),this.alertMessage.style.display="block"}hideAlertMessage(){this.alertMessage.style.display="none"}resetClass(t,e){t.classList.remove(e),setTimeout((()=>{t.classList.add(e)}),40)}}}},e={};function i(s){var o=e[s];if(void 0!==o)return o.exports;var n=e[s]={exports:{}};return t[s](n,n.exports,i),n.exports}i.d=(t,e)=>{for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t=i(183);class e{constructor(){this.projectsUrl="/api/projects"}async deleteProject(t){try{if(void 0===t)throw new Error("No projectId");const e={method:"DELETE",headers:{"Content-Type":"application/json"},body:""},i=await fetch(`${this.projectsUrl}/${t}`,e);if(!i)throw i;return await i.json()}catch(t){return console.error("Delete Project error:",t),t}}}class s{constructor(){this.infoForm=document.querySelector("#info-form"),this.editBtn=document.querySelector("#edit-btn"),this.saveEditBtn=document.querySelector("#save-edit-btn"),this.cancelEditBtn=document.querySelector("#cancel-edit-btn"),this.editModeDisplay=document.querySelector("#edit-mode-display"),this.loadingBtn=document.querySelector("#loading-btn"),this.coverInputDiv=document.querySelector("#cover-input-div"),this.coverButtonDiv=document.querySelector("#portfolio-cover-buttons-container"),this.avatarInputDiv=document.querySelector("#avatar-input-div"),this.nameInputDiv=document.querySelector("#name-input-div"),this.titleInputDiv=document.querySelector("#title-input-div"),this.socialInputDiv=document.querySelector("#social-input-div"),this.descriptionInputDiv=document.querySelector("#description-input-div"),this.contactInputDiv=document.querySelector("#contact-input-div"),this.skillInputDiv=document.querySelector("#skill-input-div"),this.nameDisplay=document.querySelector("#name-display"),this.titleDisplay=document.querySelector("#title-display"),this.socialDisplay=document.querySelector("#social-display"),this.descriptionDisplay=document.querySelector("#description-display"),this.contactDisplay=document.querySelector("#contact-display"),this.skillDisplay=document.querySelector("#skill-display"),this.statisticDiv=document.querySelector("#statistic"),this.skillInputs=document.querySelectorAll(".skill-input"),this.skillToolTip=document.querySelector("#skill-tooltip"),this.skillToolTipName=document.querySelector("#skill-tooltip-name"),this.skillToolTipImageDiv=document.querySelector("#skill-tooltip-img-div"),this.skillToolTipImage=document.querySelector("#skill-tooltip-img"),this.skillToolTipDescription=document.querySelector("#skill-tooltip-description"),this.addProjectBtn=document.querySelector("#add-project-btn"),this.projectBlocker=document.querySelector("#project-blocker"),this.deleteProjectBtns=document.querySelectorAll(".delete-project-btn"),this.coverImg=document.querySelector("#cover-img"),this.coverInput=document.querySelector("#cover-input"),this.originalCover=this.coverImg.src,this.coverChangeButton=document.querySelector("#cover-change-btn"),this.coverPositionButton=document.querySelector("#cover-position"),this.coverButtonsSetOne=document.querySelector(".cover-buttons-set-one"),this.coverButtonsSetTwo=document.querySelector(".cover-buttons-set-two"),this.coverPositionDone=document.querySelector("#cover-done-position"),this.coverPositionCancel=document.querySelector("#cover-cancel-position"),this.coverDrag=document.querySelector("#portfolio-cover-drag"),this.positionInput=document.querySelector("#cover-position-input"),this.defaultCoverPositionY=this.getCoverPositionY(),this.isDragging=!1,this.initPositionY,this.avatarInput=document.querySelector("#avatar-input"),this.avatarImg=document.querySelector("#avatar-img"),this.originalAvatar=this.avatarImg.src,this.addSocialBtn=document.querySelector("#add-social"),this.socialInputContainer=document.querySelector("#social-input-container"),this.removeSocialBtns=document.querySelectorAll(".remove-social"),this.editModeElements=[this.coverInputDiv,this.coverButtonDiv,this.nameInputDiv,this.titleInputDiv,this.socialInputDiv,this.avatarInputDiv,this.projectBlocker,this.descriptionInputDiv,this.contactInputDiv,this.skillInputDiv],this.viewModeElements=[this.nameDisplay,this.titleDisplay,this.socialDisplay,this.addProjectBtn,this.descriptionDisplay,this.contactDisplay,this.skillDisplay,this.statisticDiv],this.init()}init(){this.hideAllEditModeElements(),this.skillToolTipImage.addEventListener("load",(()=>{this.skillToolTipImageDiv.classList.toggle("loaded")}))}hideAllEditModeElements(){this.editModeElements.forEach((t=>{t&&t.style&&(t.style.display="none")}))}enterEditMode(){this.saveEditBtn.style.display="flex",this.cancelEditBtn.style.display="flex",this.editModeElements.forEach((t=>{t&&t.style&&(t.style.display="block")})),this.editBtn.style.display="none",this.viewModeElements.forEach((t=>{t&&t.style&&(t.style.display="none")})),this.editModeDisplay.style.display="flex",this.editModeDisplay.classList.add("show-animation"),this.editModeDisplay.classList.remove("hide-animation"),this.editModeDisplay.style.animationPlayState="running"}exitEditMode(){this.infoForm.reset(),this.infoForm.classList.remove("was-validated"),this.viewModeElements.forEach((t=>{t&&t.style&&(t.style.display="block")})),this.statisticDiv.style.display="flex",this.editBtn.style.display="flex",this.saveEditBtn.style.display="none",this.cancelEditBtn.style.display="none",this.editModeElements.forEach((t=>{t&&t.style&&(t.style.display="none")})),this.editModeDisplay.classList.remove("show-animation"),this.editModeDisplay.classList.add("hide-animation"),this.editModeDisplay.style.animationPlayState="running",document.querySelectorAll(".new-social-input").forEach((t=>t.remove())),this.showCoverButtonsSetOne(),this.resetCover()}getCoverPositionY(){const t=this.coverImg.style.objectPosition,e=t.indexOf(" "),i=[...t];return Number(i.slice(e,-1).join("").trim())}resetCover(){this.coverImg.src=this.originalCover,this.positionInput.value=this.defaultCoverPositionY,this.resetCoverPosition()}resetCoverPosition(){this.coverImg.style.objectPosition=`center ${this.defaultCoverPositionY}%`}showCoverButtonsSetOne(){this.coverButtonsSetTwo.style.display="none",this.coverDrag.style.display="none",this.coverButtonsSetOne.style.display="flex"}showCoverButtonsSetTwoAndDrag(){this.coverButtonsSetOne.style.display="none",this.coverButtonsSetTwo.style.display="flex",this.coverDrag.style.display="flex"}setCoverPosition(){this.defaultCoverPositionY=this.getCoverPositionY(),this.positionInput.value=this.defaultCoverPositionY}startDragEventHandler(t,e){this.initPositionY=e,this.isDragging=!0}dragCoverPositionEventHandler(t,e){if(this.isDragging){t.stopPropagation();let i=this.getCoverPositionY()+.5*(this.initPositionY-e);i=Math.min(100,Math.max(0,i)),this.coverImg.style.objectPosition=`center ${i}%`,this.positionInput.value=this.getCoverPositionY(),this.initPositionY=e}}stopDrag(){this.isDragging=!1}resetAvatar(){this.avatarImg.src=this.originalAvatar}createSocialInput(){const t=document.createElement("div");t.innerHTML=document.querySelector(".social-input-sample").innerHTML,t.classList.add("new-social-input"),t.querySelector(".form-select").removeAttribute("disabled"),t.querySelector("#socials-link").removeAttribute("disabled"),this.socialInputContainer.append(t);const e=t.querySelector(".remove-social");e.addEventListener("click",(t=>this.removeClosestSocialInput(e)))}removeClosestSocialInput(t){const e=t.closest(".new-social-input");e&&e.remove()}previewImageOnInputChange(t,e){if(t.files&&t.files[0]){const i=new FileReader;i.onload=t=>{e.src=t.target.result},i.readAsDataURL(t.files[0])}}showSkillToolTip(t){let e=t.target;if((e.classList.contains("skill-label")||e.classList.contains("skill-checkbox"))&&(e=e.parentElement),e.classList.contains("skill-input")){this.skillToolTipImageDiv.classList.remove("loaded"),this.skillToolTipName.innerText=e.getAttribute("data-name"),this.skillToolTipImage.src=e.getAttribute("data-icon"),this.skillToolTipDescription.innerText=e.getAttribute("data-des");const t=parseInt(window.getComputedStyle(this.skillInputDiv).height),i=(parseInt(window.getComputedStyle(this.skillInputDiv).width),parseInt(window.getComputedStyle(this.skillToolTip).height)),s=parseInt(window.getComputedStyle(this.skillToolTip).width),o=e.getBoundingClientRect(),n=e.getBoundingClientRect();let l=o.top+window.scrollY-i-t,r=n.right+window.scrollX-s;window.innerWidth>1800?r-=s:window.innerHeight>1500&&(r-=s/2),this.skillToolTip.style.top=l+"px",this.skillToolTip.style.left=r+"px",this.skillToolTip.style.opacity="1"}}hideSkillToolTip(){this.skillToolTip.style.opacity="0"}showLoadingBtn(){this.saveEditBtn.classList.add("hide"),this.cancelEditBtn.classList.add("hide"),this.loadingBtn.classList.remove("hide")}}class o{constructor(t,e){this.view=t,this.model=e,this.init()}init(){this.alertMessage=new t.Z,this.view.editBtn.addEventListener("click",(t=>this.enterEditMode(t))),this.view.cancelEditBtn.addEventListener("click",(()=>this.existEditMode())),this.view.saveEditBtn.addEventListener("click",(t=>this.handleFormSubmit(t,this.view.infoForm))),this.view.coverChangeButton.addEventListener("click",(()=>this.view.coverInput.click())),this.view.coverPositionButton.addEventListener("click",(()=>this.view.showCoverButtonsSetTwoAndDrag())),this.view.coverPositionDone.addEventListener("click",(()=>{this.view.showCoverButtonsSetOne(),this.view.setCoverPosition()})),this.view.coverPositionCancel.addEventListener("click",(()=>{this.view.showCoverButtonsSetOne(),this.view.resetCoverPosition()})),this.view.coverDrag.addEventListener("mousedown",(t=>{this.view.startDragEventHandler(t,this.getUserMouseY(t))})),this.view.coverDrag.addEventListener("mousemove",(t=>{this.view.dragCoverPositionEventHandler(t,this.getUserMouseY(t))})),this.view.coverDrag.addEventListener("mouseup",(()=>this.view.stopDrag())),this.view.avatarInputDiv.addEventListener("click",(()=>this.view.avatarInput.click())),this.view.addSocialBtn.addEventListener("click",(()=>this.view.createSocialInput())),this.view.removeSocialBtns.forEach((t=>{t.addEventListener("click",(()=>this.view.removeClosestSocialInput(t)))})),this.view.skillInputs.forEach((t=>{t.addEventListener("mouseover",(t=>this.showSkillToolTip(t))),t.addEventListener("mouseout",(()=>this.view.hideSkillToolTip()))})),this.view.coverInput.addEventListener("change",(()=>this.previewCoverImage())),this.view.avatarInput.addEventListener("change",(()=>this.previewAvatarImage())),this.view.deleteProjectBtns.forEach((t=>{t.addEventListener("click",(t=>this.deleteProject(t)))}))}enterEditMode(t){this.view.enterEditMode(t)}existEditMode(){this.view.resetCover(),this.view.resetAvatar(),this.view.exitEditMode(),this.alertMessage.hideAlertMessage()}handleFormSubmit(t,e){e.classList.add("was-validated"),t.preventDefault(),t.stopPropagation(),e.checkValidity()?(this.view.showLoadingBtn(),e.submit()):this.alertMessage.showAlertMessage("Missing form information.")}previewCoverImage(){this.view.previewImageOnInputChange(this.view.coverInput,this.view.coverImg)}previewAvatarImage(){this.view.previewImageOnInputChange(this.view.avatarInput,this.view.avatarImg)}getUserMouseY(t){return t.clientY+window.scrollY}showSkillToolTip(t){this.view.showSkillToolTip(t)}async deleteProject(t){const e=t.target;if(e.classList.contains("delete-project-btn")){const t=e.dataset.project,i=await this.model.deleteProject(t);i.ok?location.reload():this.alertMessage.showAlertMessage(`${i.method}: ${i.message}`)}}}document.addEventListener("DOMContentLoaded",(()=>{const t=new s,i=new e;new o(t,i)}))})()})();