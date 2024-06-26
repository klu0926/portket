import AlertMessage from './alertMessage.js'
class PortfolioModel {
  constructor() {
    this.visitUrl = '/api/visits'
    this.userData = document.querySelector('#user-data')
    this.visitId = this.userData.dataset.visit
  }
  async putVisit() {
    try {
      if (this.visitId === undefined) throw new Error('Cant not find visitId')
      // increase visit count
      const requestOption = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: '',
      }
      const response = await fetch(`${this.visitUrl}/${this.visitId}`, requestOption)
      if (!response) throw response
      const json = await response.json()
      return json
    } catch (err) {
      console.error('put visit error:', err)
      return err
    }
  }
}

class PortfolioView {
  constructor() {
    this.projects = document.querySelectorAll('.project-block')
    this.socials = document.querySelectorAll('.social-box')
    this.viewCountSpan = document.querySelector('#visit-count-span')
    this.projectCountSpan = document.querySelector('#project-count-span')
    this.projectSkillsShowMoreBtn = document.querySelectorAll('.skills-show-more-btn')
  }
  startFadeIn() {
    this.projects.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.2}s`
    })
    this.socials.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.2}s`
    })
  }
  updateViewCount(count) {
    this.viewCountSpan.textContent = count
  }
  toggleMoreProjectSkills(showMoreBtn) {
    const skillsBlock = showMoreBtn.parentElement
    if (!skillsBlock || !skillsBlock.classList.contains('project-block-skills')) {
      console.error('cant not find skillsBlock')
      return
    }
    const HEIGHT = 52
    const height = skillsBlock.style.height
    if (height === 'auto') {
      skillsBlock.style.height = HEIGHT + 'px'
      showMoreBtn.textContent = 'more'
    } else {
      skillsBlock.style.height = 'auto'
      showMoreBtn.textContent = 'hide'
    }
  }
}

class PortfolioController {
  constructor(view, model) {
    this.view = view
    this.model = model
    // init
    this.init()
  }
  init() {
    this.alertMessage = new AlertMessage()
    this.view.startFadeIn()
    this.increaseVisitCount()
    this.view.projectSkillsShowMoreBtn.forEach((b) => {
      b.addEventListener('click', (e) => this.showMoreProjectSkills(e))
    })
  }
  async increaseVisitCount() {
    const response = await this.model.putVisit()
    if (!response.ok) {
      this.alertMessage.showAlertMessage(`${response.method}: ${response.message}`)
    } else {
      this.view.updateViewCount(response.data.count)
    }
  }
  showMoreProjectSkills(event) {
    event.stopPropagation()
    event.preventDefault()
    this.view.toggleMoreProjectSkills(event.target)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const view = new PortfolioView()
  const model = new PortfolioModel()
  const controller = new PortfolioController(view, model)
})
