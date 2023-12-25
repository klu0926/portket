class MainModel {}
class MainView {
  constructor() {
    this.navbarAvatarImg = document.querySelector('#navbar-avatar-img')
    this.navbarAvatarMenu = document.querySelector('#navbar-avatar-div-menu')
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
    document.addEventListener('click', (e) => {
      // avatar menu toggle
      this.view.toggleNavbarAvatarMenu(e.target)
    })
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const model = new MainModel()
  const view = new MainView()
  const controller = new MainController(view, model)
})
