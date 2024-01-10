class MainModel {}
class MainView {
  constructor() {
    this.navbarAvatarImg = document.querySelector('#navbar-avatar-img')
    this.navbarAvatarMenu = document.querySelector('#navbar-avatar-div-menu')
    // hamburger menu related
    this.body = document.querySelector('body')
    this.hamburgerMenu = document.querySelector('#hamburger-menu')
    this.bodyDisableCover = document.querySelector('#body-disable-cover')
  }
  showHamburgerMenu() {
    this.body.style.overflowY = 'hidden'
    this.bodyDisableCover.style.display = 'block'
    this.hamburgerMenu.classList.add('show-menu')
  }
  hideHamburgerMenu() {
    this.body.style.overflowY = 'scroll'
    this.bodyDisableCover.style.display = 'none'
    this.hamburgerMenu.classList.remove('show-menu')
  }
  toggleNavbarAvatarMenu(target) {
    if (!this.navbarAvatarImg || !this.navbarAvatarMenu || !target) return
    const hide = (e) => {
      if (!e) return
      if (!e.classList.contains('hide')) {
        this.navbarAvatarMenu.classList.add('hide')
      }
    }
    const toggle = (e) => {
      if (!e) return
      if (!this.navbarAvatarMenu.classList.contains('hide')) {
        this.navbarAvatarMenu.classList.add('hide')
      } else {
        this.navbarAvatarMenu.classList.remove('hide')
      }
    }

    if (target !== this.navbarAvatarImg) {
      // not avatar
      hide(target)
    } else {
      // on avatar
      toggle(target)
    }
  }
}
class MainController {
  constructor(view, model) {
    this.view = view
    this.model = model
    this.init()
  }
  init() {
    document.addEventListener('click', (e) => this.hamburgerMenuToggle(e))
  }
  hamburgerMenuToggle(event) {
    if (!event.target) return
    const id = event.target.id
    if (id === 'hamburger' || id === 'hamburger-i') {
      this.view.showHamburgerMenu()
    } else if (id === 'hamburger-in-menu' || id === 'hamburger-in-menu-i' || id === 'body-disable-cover') {
      this.view.hideHamburgerMenu()
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const model = new MainModel()
  const view = new MainView()
  const controller = new MainController(view, model)
})
