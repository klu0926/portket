import AlertMessage from './alertMessage.js'

class IndexModel {
  constructor() {
    this.landingImageUrl = '/api/resource/landing'
  }
  async getLandingImages() {
    try {
      const response = await fetch(this.landingImageUrl)
      if (!response) throw response
      return await response.json()
    } catch (err) {
      console.error('Fetch error:', err)
    }
  }
}

class IndexView {
  constructor() {
    this.banner = document.querySelector('#banner')
    this.bannerImage = document.querySelector('#banner-image')
    this.bannerTitle = document.querySelector('.banner-title')
  }
  async showRandomBannerImage(images) {
    if (!images) return
    this.bannerImage.style.display = 'none'
    this.bannerTitle.style.display = 'none'
    const randomIndex = Math.floor(Math.random() * images.length)
    this.bannerImage.src = images[randomIndex]
    this.bannerImage.onload = () => {
      this.banner.style.backgroundColor = 'white'
      this.bannerImage.style.display = 'block'
      this.bannerTitle.style.display = 'block'
      // fade in
      this.resetClass(this.bannerImage, 'fadeIn')
      this.resetClass(this.bannerTitle, 'fadeIn')
    }
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
    this.view.banner.addEventListener('click', () => this.showBannerImage())

    this.init()
  }
  async init() {
    this.AlertMessage = new AlertMessage()
    this.showBannerImage()
  }
  async showBannerImage() {
    const response = await this.model.getLandingImages()
    if (!response.ok) {
      this.alertMessage.showAlertMessage(`${response.action}: ${response.message}`)
    } else {
      this.view.showRandomBannerImage(response.data.images)
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const model = new IndexModel()
  const view = new IndexView()
  const controller = new IndexController(view, model)
})
