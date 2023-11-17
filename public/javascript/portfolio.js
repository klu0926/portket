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
  constructor(view) {
    this.view = view
    // init
    this.init()
  }
  init() {
    this.view.startFadeIn()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const view = new PortfolioView()
  const controller = new PortfolioController(view)
})
