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
    this.handleImageLoaded()
  }
  handleImageLoaded() {
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
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const model = new IndexModel()
  const view = new IndexView()
  const controller = new IndexController(view, model)
})
