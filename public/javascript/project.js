import AlertMessage from './alertMessage.js'

class ProjectModel {
  constructor() {
    this.visitUrl = '/api/visits'
    this.projectData = document.querySelector('#project-data')
    this.visitId = this.projectData.dataset.visit
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
      const url = `${this.visitUrl}/${this.visitId}`
      const response = await fetch(url, requestOption)
      if (!response) throw response
      return await response.json()
    } catch (err) {
      console.error('put visit error:', err)
      return err
    }
  }
}

class ProjectView {
  constructor() {
    this.projects = document.querySelectorAll('.project-block')
    this.socials = document.querySelectorAll('.social-box')
    this.viewCountSpan = document.querySelector('#visit-count-span')
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
}
class ProjectController {
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
  }
  async increaseVisitCount() {
    try {
      const response = await this.model.putVisit()
      if (!response.ok) {
        this.alertMessage.showAlertMessage(`${response.action}: ${response.message}`)
      } else {
        this.view.updateViewCount(response.data.count)
      }
    } catch (err) {
      console.log(err)
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const view = new ProjectView()
  const model = new ProjectModel()
  const controller = new ProjectController(view, model)
})
