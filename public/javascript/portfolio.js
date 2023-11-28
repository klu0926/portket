class PortfolioModel {
  constructor() {
    this.visitUrl = '/visits/'
  }
  async putVisits(visitId) {
    try {
      // this increase visit count
      const requestData = {
        visitId,
      }
      const requestOption = {
        method: 'PUT',
        header: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          visitId,
        }),
      }
      const response = await fetch(this.visitUrl, requestOption)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      console.log('PUT visit all done!')
    } catch (err) {
      console.error('Fetch error:', err)
    }
  }
}

class PortfolioView {
  constructor() {
    this.projects = document.querySelectorAll('.project-block')
    this.socials = document.querySelectorAll('.social-box')
  }
  startFadeIn() {
    this.projects.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.2}s`
    })
    this.socials.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.2}s`
    })
  }
}

class PortfolioController {
  constructor(view, model) {
    this.view = view
    this.model = model
    this.userData = document.querySelector('#user-data')
    this.userId = this.userData.dataset.id
    // init
    this.init()
  }
  init() {
    this.view.startFadeIn()
    this.increaseVisitCount()
  }
  increaseVisitCount() {
    console.log(this.userId)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const view = new PortfolioView()
  const model = new PortfolioModel()
  const controller = new PortfolioController(view, model)
})
