import AlertMessage from './alertMessage.js'

class IndexModel {}

class IndexView {
  constructor() {
    this.banner = document.querySelector('#banner')
    this.bannerImage = document.querySelector('#banner-image')
    this.bannerTitle = document.querySelector('.banner-title')
    this.imageLoadDivs = document.querySelectorAll('.image-load')
    this.init()
  }
  init() {
    console.log('imageload', this.imageLoadDivs)
    this.handleImageLoaded()
  }
  handleImageLoaded() {
    console.log('handle load')
    this.imageLoadDivs.forEach((d) => {
      const image = d.querySelector('img')

      if (image.complete) {
        d.classList.add('loaded')
      } else {
        image.addEventListener('load', () => {
          d.classList.add('loaded')
        })
      }
    })
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
