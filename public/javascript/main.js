import AlertMessage from './alertMessage.js'

class MainModel {
  constructor() {
    this.getProjectsUrl = '/api/projects'
    this.getUsersUrl = '/api/users'
    this.currentUserData = document.querySelector('#current-user-data')
    this.currentUserId = this.currentUserData.dataset.id
  }
  async getProjects(userId = this.currentUserId) {
    try {
      const url = `${this.getProjectsUrl}?userId=${userId}`
      const response = await fetch(url)
      return await response.json()
    } catch (err) {
      return err
    }
  }
  async getUsers(limit = 10, sort = 'visit') {
    try {
      const url = `${this.getUsersUrl}?limit=${limit}&sort=${sort}`
      const response = await fetch(url)
      return await response.json()
    } catch (err) {
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
    this.bodyDisableCover = document.querySelector('#body-disable-cover')
    this.hamburgerMenuProjectsContainer = document.querySelector('#hamburger-menu-my-projects-container')
    this.hamburgerMenuTopUsersContainer = document.querySelector('#hamburger-menu-top-user-container')
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
  renderMenuLink(container, data, display = 'name', page) {
    container.innerHTML = ''
    let content = ''
    // return if no data
    if (!data || data.length === 0) return
    // populate container
    for (let i = 0; i < data.length; i++) {
      // avatar or icon
      let icon = ''
      if (page === 'projects') {
        icon = '<i class="fa-regular fa-file-lines navbar-links-icon"></i>'
      } else if (page === 'users') {
        icon = `<div class="hamburger-menu-avatar-div">
            <img id="navbar-avatar-img" class="navbar-avatar-img" src=${data[i].avatarSmall} alt="avatar"/>
          </div>`
      }
      // build the whole link
      const projectLink = `
      <a href="/${page}/${data[i].id}" class="hamburger-menu-link" aria-label="project">
          <div class="hamburger-menu-link-content">
            ${icon}
            <span class="hamburger-menu-text" title=${data[i][display]}>${data[i][display]}</span>
          </div>
          </a>`
      content += projectLink
    }
    container.innerHTML = content
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

      // render current user projects
      if (this.model.currentUserId) {
        const container = this.view.hamburgerMenuProjectsContainer
        this.renderMenuContainer(container, 100, 'time', 'title', 'projects')
      }
      // render top visited users
      ;(() => {
        const container = this.view.hamburgerMenuTopUsersContainer
        this.renderMenuContainer(container, 5, 'visit', 'name', 'users')
      })()
    } else if (id === 'hamburger-in-menu' || id === 'hamburger-in-menu-i' || id === 'body-disable-cover') {
      this.view.hideHamburgerMenu()
    }
  }
  async renderMenuContainer(container, limit = 5, sort = 'time', name = 'name', table) {
    try {
      let response = ''
      if (table === 'users') {
        response = await this.model.getUsers(limit, sort)
      } else if (table === 'projects') {
        response = await this.model.getProjects()
      } else {
        console.error('missing renderMenuContainer "page"')
      }
      if (!response.ok) {
        this.alertMessage.showAlertMessage(`${response.action}: ${response.message}`)
      } else {
        const data = response.data[table]
        this.view.renderMenuLink(container, data, name, table)
      }
    } catch (err) {
      console.log(err)
      this.alertMessage.showAlertMessage(`${err.name}: ${err.message}`)
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const model = new MainModel()
  const view = new MainView()
  const controller = new MainController(view, model)
})
