(()=>{class e{}class a{constructor(){this.navbarAvatarImg=document.querySelector("#navbar-avatar-img"),this.navbarAvatarMenu=document.querySelector("#navbar-avatar-div-menu"),this.body=document.querySelector("body"),this.hamburgerMenu=document.querySelector("#hamburger-menu"),this.bodyDisableCover=document.querySelector("#body-disable-cover")}showHamburgerMenu(){this.body.style.overflowY="hidden",this.bodyDisableCover.style.display="block",this.hamburgerMenu.classList.add("show-menu")}hideHamburgerMenu(){this.body.style.overflowY="scroll",this.bodyDisableCover.style.display="none",this.hamburgerMenu.classList.remove("show-menu")}toggleNavbarAvatarMenu(e){if(!this.navbarAvatarImg||!this.navbarAvatarMenu||!e)return;e!==this.navbarAvatarImg?(e=>{e&&(e.classList.contains("hide")||this.navbarAvatarMenu.classList.add("hide"))})(e):(e=>{e&&(this.navbarAvatarMenu.classList.contains("hide")?this.navbarAvatarMenu.classList.remove("hide"):this.navbarAvatarMenu.classList.add("hide"))})(e)}}class r{constructor(e,a){this.view=e,this.model=a,this.init()}init(){document.addEventListener("click",(e=>this.hamburgerMenuToggle(e)))}hamburgerMenuToggle(e){if(!e.target)return;const a=e.target.id;"hamburger"===a||"hamburger-i"===a?this.view.showHamburgerMenu():"hamburger-in-menu"!==a&&"hamburger-in-menu-i"!==a&&"body-disable-cover"!==a||this.view.hideHamburgerMenu()}}document.addEventListener("DOMContentLoaded",(()=>{const t=new e,s=new a;new r(s,t)}))})();