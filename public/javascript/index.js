class IndexModel {
  constructor() {
    this.landingImageUrl = '/resource/landing'
    this.landingImageUrlData = null
  }
  async fetchBannerImages() {
    try {
      const landingImageUrl = '/resource/landing'
      const response = await fetch(landingImageUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      } else {
        const data = await response.json()
        this.landingImageUrlData = data.images
      }
    } catch (err) {
      console.error('Fetch error:', err)
    }
  }
  async getBannerImages() {
    try {
      if (!this.landingImageUrlData) {
        await this.fetchBannerImages()
      }
      return this.landingImageUrlData
    } catch {
      console.error('Fetch error:', err)
    }
    return this.landingImageUrlData
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
    this.showBannerImage()
  }
  async showBannerImage() {
    const images = await this.model.getBannerImages()
    this.view.showRandomBannerImage(images)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const model = new IndexModel()
  const view = new IndexView()
  const controller = new IndexController(view, model)
})
