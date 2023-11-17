class IndexView {
  constructor() {
    this.banner = document.querySelector('#banner')
    this.bannerImage = document.querySelector('#banner-image')
  }
  async bannerSlidShow() {
    try {
      const landingImageUrl = '/resource/landing'
      const response = await fetch(landingImageUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      } else {
        const data = await response.json()
        const randomIndex = Math.floor(Math.random() * data.images.length)
        this.bannerImage.src = data.images[randomIndex]
        this.bannerImage.onload = () => {
          this.banner.style.backgroundColor = 'white'
          this.bannerImage.style.display = 'block'
        }
      }
    } catch (err) {
      console.error('Fetch error:', err)
    }
  }
}

class IndexController {
  constructor(view) {
    this.view = view
    this.init()
  }
  init() {
    this.view.bannerSlidShow()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const view = new IndexView()
  const controller = new IndexController(view)
})
