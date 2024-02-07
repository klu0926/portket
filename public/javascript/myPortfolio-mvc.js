import AlertMessage from './alertMessage.js'

// Model
class MyPortfolioModel {
  constructor() {
    this.projectsUrl = '/api/projects'
  }
  async deleteProject(projectId) {
    try {
      if (projectId === undefined) throw new Error('No projectId')
      // delete project
      const requestOption = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: '',
      }
      const response = await fetch(`${this.projectsUrl}/${projectId}`, requestOption)
      if (!response) throw response
      const json = await response.json()
      return json
    } catch (err) {
      console.error('Delete Project error:', err)
      return err
    }
  }
}
// VIEW
class MyPortfolioView {
  constructor() {
    // info form
    this.infoForm = document.querySelector('#info-form')
    // edit navbar
    this.editBtn = document.querySelector('#edit-btn')
    this.saveEditBtn = document.querySelector('#save-edit-btn')
    this.cancelEditBtn = document.querySelector('#cancel-edit-btn')
    this.editModeDisplay = document.querySelector('#edit-mode-display')
    this.loadingBtn = document.querySelector('#loading-btn')
    // input Div
    this.coverInputDiv = document.querySelector('#cover-input-div')
    this.coverButtonDiv = document.querySelector('#portfolio-cover-buttons-container')
    this.avatarInputDiv = document.querySelector('#avatar-input-div')
    this.nameInputDiv = document.querySelector('#name-input-div')
    this.titleInputDiv = document.querySelector('#title-input-div')
    this.socialInputDiv = document.querySelector('#social-input-div')
    this.descriptionInputDiv = document.querySelector('#description-input-div')
    this.contactInputDiv = document.querySelector('#contact-input-div')
    this.skillInputContainer = document.querySelector('#skill-input-container')
    // display
    this.nameDisplay = document.querySelector('#name-display')
    this.titleDisplay = document.querySelector('#title-display')
    this.socialDisplay = document.querySelector('#social-display')
    this.descriptionDisplay = document.querySelector('#description-display')
    this.contactDisplay = document.querySelector('#contact-display')
    this.skillDisplay = document.querySelector('#skill-display')
    this.statisticDiv = document.querySelector('#statistic')
    // skill & tool tips
    this.skillInputs = document.querySelectorAll('.skill-input')
    this.skillToolTip = document.querySelector('#skill-tooltip')
    this.skillToolTipName = document.querySelector('#skill-tooltip-name')
    this.skillToolTipImageDiv = document.querySelector('#skill-tooltip-img-div')
    this.skillToolTipImage = document.querySelector('#skill-tooltip-img')
    this.skillToolTipDescription = document.querySelector('#skill-tooltip-description')
    // project
    this.addProjectBtn = document.querySelector('#add-project-btn')
    this.projectBlocker = document.querySelector('#project-blocker')
    this.deleteProjectBtns = document.querySelectorAll('.delete-project-btn')
    // (no hide show needed)
    // cover
    this.coverImg = document.querySelector('#cover-img')
    this.coverInput = document.querySelector('#cover-input')
    this.originalCover = this.coverImg.src
    this.coverChangeButton = document.querySelector('#cover-change-btn')
    this.coverPositionButton = document.querySelector('#cover-position')
    this.coverButtonsSetOne = document.querySelector('.portfolio-cover-buttons-set-one')
    this.coverButtonsSetTwo = document.querySelector('.portfolio-cover-buttons-set-two')
    this.coverPositionDone = document.querySelector('#cover-done-position')
    this.coverPositionCancel = document.querySelector('#cover-cancel-position')
    this.coverDrag = document.querySelector('#portfolio-cover-drag')
    this.positionInput = document.querySelector('#cover-position-input')
    this.defaultCoverPositionY = this.getCoverPositionY()
    this.isDragging = false
    this.initPositionY
    // avatar (no hide show needed)
    this.avatarInput = document.querySelector('#avatar-input')
    this.avatarImg = document.querySelector('#avatar-img')
    this.originalAvatar = this.avatarImg.src
    // social
    this.addSocialBtn = document.querySelector('#add-social')
    this.socialInputContainer = document.querySelector('#social-input-container')
    this.removeSocialBtns = document.querySelectorAll('.remove-social')

    // edit mode elements
    this.editModeElements = [
      this.coverInputDiv,
      this.coverButtonDiv,
      this.nameInputDiv,
      this.titleInputDiv,
      this.socialInputDiv,
      this.avatarInputDiv,
      this.projectBlocker,
      this.descriptionInputDiv,
      this.contactInputDiv,
      this.skillInputContainer,
    ]
    // view mode elements
    this.viewModeElements = [
      this.nameDisplay,
      this.titleDisplay,
      this.socialDisplay,
      this.addProjectBtn,
      this.descriptionDisplay,
      this.contactDisplay,
      this.skillDisplay,
      this.statisticDiv,
    ]
    // init
    this.init()
  }
  init() {
    this.hideAllEditModeElements()
    // skill tool tips load
    this.skillToolTipImage.addEventListener('load', () => {
      this.skillToolTipImageDiv.classList.toggle('loaded')
    })
  }
  hideAllEditModeElements() {
    this.editModeElements.forEach((e) => {
      if (e && e.style) e.style.display = 'none'
    })
  }
  enterEditMode() {
    // show
    this.saveEditBtn.style.display = 'flex'
    this.cancelEditBtn.style.display = 'flex'
    this.editModeElements.forEach((e) => {
      if (e && e.style) e.style.display = 'block'
    })
    // hide
    this.editBtn.style.display = 'none'
    this.viewModeElements.forEach((e) => {
      if (e && e.style) e.style.display = 'none'
    })
    // show edit mode animation
    this.editModeDisplay.style.display = 'flex'
    this.editModeDisplay.classList.add('show-animation')
    this.editModeDisplay.classList.remove('hide-animation')
    this.editModeDisplay.style.animationPlayState = 'running'
  }
  exitEditMode() {
    // reset form
    this.infoForm.reset()
    this.infoForm.classList.remove('was-validated')
    // show
    this.viewModeElements.forEach((e) => {
      if (e && e.style) e.style.display = 'block'
    })
    this.statisticDiv.style.display = 'flex'
    this.editBtn.style.display = 'flex'
    this.nameDisplay.display = 'flex'
    // hide
    this.saveEditBtn.style.display = 'none'
    this.cancelEditBtn.style.display = 'none'
    this.editModeElements.forEach((e) => {
      if (e && e.style) e.style.display = 'none'
    })
    // hide edit mode animation
    this.editModeDisplay.classList.remove('show-animation')
    this.editModeDisplay.classList.add('hide-animation')
    this.editModeDisplay.style.animationPlayState = 'running'
    // remove new social input
    const newSocialInputs = document.querySelectorAll('.new-social-input')
    newSocialInputs.forEach((e) => e.remove())
    // cover buttons reset
    this.showCoverButtonsSetOne()
    this.resetCover()
  }
  getCoverPositionY() {
    const objectPosition = this.coverImg.style.objectPosition
    const emptySpace = objectPosition.indexOf(' ')
    const objectPositionArray = [...objectPosition]
    return Number(objectPositionArray.slice(emptySpace, -1).join('').trim())
  }
  // Cover
  resetCover() {
    this.coverImg.src = this.originalCover
    this.positionInput.value = this.defaultCoverPositionY
    this.resetCoverPosition()
  }
  resetCoverPosition() {
    this.coverImg.style.objectPosition = `center ${this.defaultCoverPositionY}%`
  }
  showCoverButtonsSetOne() {
    this.coverButtonsSetTwo.style.display = 'none'
    this.coverDrag.style.display = 'none'
    this.coverButtonsSetOne.style.display = 'flex'
  }
  showCoverButtonsSetTwoAndDrag() {
    this.coverButtonsSetOne.style.display = 'none'
    this.coverButtonsSetTwo.style.display = 'flex'
    this.coverDrag.style.display = 'flex'
  }
  setCoverPosition() {
    this.defaultCoverPositionY = this.getCoverPositionY()
    this.positionInput.value = this.defaultCoverPositionY
  }
  startDragEventHandler(event, mousePositionY) {
    this.initPositionY = mousePositionY
    this.isDragging = true
  }
  dragCoverPositionEventHandler(event, mousePositionY) {
    const maxY = 100
    const minY = 0
    if (this.isDragging) {
      event.stopPropagation()
      const coverPosition = this.getCoverPositionY()
      let deltaY = this.initPositionY - mousePositionY
      const dampingFactor = 0.5
      let newCoverPosition = coverPosition + deltaY * dampingFactor
      newCoverPosition = Math.min(maxY, Math.max(minY, newCoverPosition))
      // set cover position Y
      this.coverImg.style.objectPosition = `center ${newCoverPosition}%`
      // record cover position to input
      this.positionInput.value = this.getCoverPositionY()
      // update initial position (This is really important!)
      this.initPositionY = mousePositionY
    }
  }
  stopDrag() {
    this.isDragging = false
  }
  // Avatar
  resetAvatar() {
    this.avatarImg.src = this.originalAvatar
  }
  // social
  createSocialInput() {
    const newSocialInput = document.createElement('div')
    newSocialInput.innerHTML = document.querySelector('.social-input-sample').innerHTML
    newSocialInput.classList.add('new-social-input')
    newSocialInput.querySelector('.form-select').removeAttribute('disabled')
    newSocialInput.querySelector('#socials-link').removeAttribute('disabled')
    this.socialInputContainer.append(newSocialInput)
    // remove btn
    const remove = newSocialInput.querySelector('.remove-social')
    remove.addEventListener('click', (e) => this.removeClosestSocialInput(remove))
  }
  removeClosestSocialInput(element) {
    const input = element.closest('.new-social-input')
    if (input) input.remove()
  }
  // preview image change
  previewImageOnInputChange(input, image) {
    if (input.files && input.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        image.src = event.target.result
      }
      reader.readAsDataURL(input.files[0])
    }
  }
  // skill
  showSkillToolTip(event) {
    let target = event.target
    if (target.classList.contains('skill-label') || target.classList.contains('skill-checkbox')) {
      target = target.parentElement
    }
    if (target.classList.contains('skill-input')) {
      // toggle load
      this.skillToolTipImageDiv.classList.remove('loaded')

      // data
      this.skillToolTipName.innerText = target.getAttribute('data-name')
      this.skillToolTipImage.src = target.getAttribute('data-icon')
      this.skillToolTipDescription.innerText = target.getAttribute('data-des')
    }
    this.skillToolTip.style.opacity = '1'
  }
  hideSkillToolTip() {
    this.skillToolTip.style.opacity = '0'
  }
  showLoadingBtn() {
    this.saveEditBtn.classList.add('hide')
    this.cancelEditBtn.classList.add('hide')
    this.loadingBtn.classList.remove('hide')
  }
}

// CONTROLLER
class MyPortfolioController {
  constructor(view, model) {
    this.view = view
    this.model = model
    // init
    this.init()
  }
  init() {
    this.alertMessage = new AlertMessage()
    // navbar
    this.view.editBtn.addEventListener('click', (e) => this.enterEditMode(e))
    this.view.cancelEditBtn.addEventListener('click', () => this.existEditMode())
    this.view.saveEditBtn.addEventListener('click', (e) => this.handleFormSubmit(e, this.view.infoForm))
    // cover
    this.view.coverChangeButton.addEventListener('click', () => this.view.coverInput.click())
    this.view.coverPositionButton.addEventListener('click', () => this.view.showCoverButtonsSetTwoAndDrag())
    this.view.coverPositionDone.addEventListener('click', () => {
      this.view.showCoverButtonsSetOne()
      this.view.setCoverPosition()
    })
    this.view.coverPositionCancel.addEventListener('click', () => {
      this.view.showCoverButtonsSetOne()
      this.view.resetCoverPosition()
    })
    this.view.coverDrag.addEventListener('mousedown', (e) => {
      this.view.startDragEventHandler(e, this.getUserMouseY(e))
    })
    this.view.coverDrag.addEventListener('mousemove', (e) => {
      this.view.dragCoverPositionEventHandler(e, this.getUserMouseY(e))
    })
    this.view.coverDrag.addEventListener('mouseup', () => this.view.stopDrag())
    // avatar
    this.view.avatarInputDiv.addEventListener('click', () => this.view.avatarInput.click())
    // social
    this.view.addSocialBtn.addEventListener('click', () => this.view.createSocialInput())
    this.view.removeSocialBtns.forEach((b) => {
      b.addEventListener('click', () => this.view.removeClosestSocialInput(b))
    })
    // skill
    this.view.skillInputs.forEach((i) => {
      i.addEventListener('mouseover', (e) => this.showSkillToolTip(e))
    })
    // preview image on change
    this.view.coverInput.addEventListener('change', () => this.previewCoverImage())
    this.view.avatarInput.addEventListener('change', () => this.previewAvatarImage())
    // delete project
    this.view.deleteProjectBtns.forEach((b) => {
      b.addEventListener('click', (e) => this.deleteProject(e))
    })
  }
  enterEditMode(e) {
    this.view.enterEditMode(e)
  }
  existEditMode() {
    this.view.resetCover()
    this.view.resetAvatar()
    this.view.exitEditMode()
    this.alertMessage.hideAlertMessage()
  }
  handleFormSubmit(event, form) {
    form.classList.add('was-validated')
    event.preventDefault()
    event.stopPropagation()
    if (form.checkValidity()) {
      // show loading btn
      this.view.showLoadingBtn()
      // submit
      form.submit()
    } else {
      this.alertMessage.showAlertMessage('Missing form information.')
    }
  }
  previewCoverImage() {
    this.view.previewImageOnInputChange(this.view.coverInput, this.view.coverImg)
  }
  previewAvatarImage() {
    this.view.previewImageOnInputChange(this.view.avatarInput, this.view.avatarImg)
  }
  getUserMouseY(event) {
    return event.clientY + window.scrollY
  }
  showSkillToolTip(event) {
    this.view.showSkillToolTip(event)
  }
  async deleteProject(event) {
    const deleteBtn = event.target
    if (deleteBtn.classList.contains('delete-project-btn')) {
      const projectId = deleteBtn.dataset.project
      const response = await this.model.deleteProject(projectId)
      if (!response.ok) {
        this.alertMessage.showAlertMessage(`${response.method}: ${response.message}`)
      } else {
        location.reload()
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const view = new MyPortfolioView()
  const model = new MyPortfolioModel()
  const controller = new MyPortfolioController(view, model)
})
