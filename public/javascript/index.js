import AlertMessage from './alertMessage.js'

class IndexModel {}

class IndexView {
  constructor() {
    this.banner = document.querySelector('#banner')
    this.bannerImage = document.querySelector('#banner-image')
    this.bannerTitle = document.querySelector('.banner-title')
  }
  resetClass(element, elementClass) {
    element.classList.remove(elementClass)
    setTimeout(() => {
      element.classList.add(elementClass)
    }, 40)
  }
}
class IndexController {
  constructor(view, model) {
    this.view = view
    this.model = model
    this.init()
  }
  async init() {
    this.AlertMessage = new AlertMessage()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const model = new IndexModel()
  const view = new IndexView()
  const controller = new IndexController(view, model)
})
