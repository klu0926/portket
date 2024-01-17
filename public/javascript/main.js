import AlertMessage from './alertMessage.js'

class MainModel {
  constructor() {
    this.getProjectsUrl = '/api/projects'
    this.currentUserData = document.querySelector('#current-user-data')
    this.currentUserId = this.currentUserData.dataset.id
  }
  async getProjects(currentUserId = this.currentUserId) {
    try {
      const url = `${this.getProjectsUrl}?userId=${currentUserId}`
      const response = await fetch(url)
      return await response.json()
    } catch (err) {
      console.log('err', err)
      return err
    }
  }
}
class MainView {
  constructor() {
    this.navbarAvatarImg = document.querySelector('#navbar-avatar-img')
    this.navbarAvatarMenu = document.querySelector('#navbar-avatar-div-menu')
    // hamburger menu related
    this.body = document.querySelector('body')
    this.hamburgerMenu = document.querySelector('#hamburger-menu')
    this.hamburgerMenuProjectsContainer = document.querySelector('#hamburger-menu-my-projects-container')
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
  renderHamburgerMenuProjects(projects) {
    const container = this.hamburgerMenuProjectsContainer
    if (container) {
      container.innerHTML = ''
      let content = ''
      for (let i = 0; i < projects.length; i++) {
        const projectLink = `
      <a href="/projects/${projects[i].id}" class="hamburger-menu-link" aria-label="project">
          <div class="hamburger-menu-link-content">
            <i class="fa-regular fa-file-lines navbar-links-icon"></i>
            <span class="hamburger-menu-text">${projects[i].title}</span>
          </div>
          </a>`
        content += projectLink
      }
      container.innerHTML = content
    }
  }
}
class MainController {
  constructor(view, model) {
    this.view = view
    this.model = model
    this.alertMessage = new AlertMessage()
    this.init()
  }
  init() {
    document.addEventListener('click', (e) => this.hamburgerMenuToggle(e))
  }
  async hamburgerMenuToggle(event) {
    if (!event.target) return
    const id = event.target.id
    if (id === 'hamburger' || id === 'hamburger-i') {
      this.view.showHamburgerMenu()

      // fetch user project
      if (this.model.currentUserId) {
        try {
          const response = await this.model.getProjects()
          if (!response.ok) {
            this.alertMessage.showAlertMessage(`${response.action}: ${response.message}`)
          } else {
            // render project to menu
            this.view.renderHamburgerMenuProjects(response.data.projects)
          }
        } catch (err) {
          this.alertMessage.showAlertMessage(`${err.name}: ${err.message}`)
        }
      }
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
