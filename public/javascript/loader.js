class LoaderModel {
  constructor() {}
}

class LoaderView {
  constructor() {
    // image loader
    this.imageLoadDivs = document.querySelectorAll('.image-load')
    // top loader
    this.loaderContainer = document.querySelector('.loader-container')
    this.loaderBar = document.querySelector('.loader-bar')
    this.init()
  }
  init() {
    this.handleImageLoaded()
  }
  handleImageLoaded() {
    this.imageLoadDivs.forEach((d) => {
      const image = d.querySelector('img')
      if (!image) return
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

class LoaderController {
  constructor(model, view) {
    this.view = view
    this.model = model
    this.loaderPercent = 0
    this.loaderInterval = null
    this.loaderAmount = 0.5
    this.loaderTime = 10
    this.init()
  }
  init() {
    this.loaderReset()
    window.addEventListener('beforeunload', () => this.loaderStart())
  }
  loaderStart() {
    if (this.loaderInterval === null) {
      this.view.loaderContainer.style.opacity = '1'
      this.loaderInterval = setInterval(() => {
        if (this.loaderPercent >= 87) {
          clearInterval(this.loaderInterval)
          this.loaderInterval = null
        }
        this.view.loaderBar.style.width = (this.loaderPercent += this.loaderAmount).toString() + '%'
      }, this.loaderTime)
    }
  }
  loaderReset() {
    this.loaderPercent = 0
    this.view.loaderBar.style.width = '0%'
    if (this.loaderInterval) {
      clearInterval(this.loaderInterval)
      this.loaderInterval = null
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const model = new LoaderModel()
  const view = new LoaderView()
  const controller = new LoaderController(model, view)
})
