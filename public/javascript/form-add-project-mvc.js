import AlertMessage from './alertMessage.js'

// MODEL
class AddProjectModel {
  constructor() {}
}

// VIEW
class AddProjectView {
  constructor() {
    // nav
    this.editButton = document.querySelector('#edit-btn')
    // project form
    this.addProjectBtn = document.querySelector('#add-project-btn')
    this.projectFormContainer = document.querySelector('#form-project-container')
    this.projectFormCloseBtn = document.querySelector('#form-project-container-close')
    this.projectForm = document.querySelector('#form-project')

    // project form links
    this.linksContainer = document.querySelector('.link-row-container')
    this.addLinkBtn = document.querySelector('.link-add-btn')
    this.projectFormResetBtn = document.querySelector('#projectFormReset')
    this.linkInputSample = document.querySelector('#new-link-input-sample')
    this.removeLinkBtns = document.querySelectorAll('.link-remove-btn')

    //project cover
    this.coverDisplay = document.querySelector('#form-project-cover-display')
    this.coverImage = document.querySelector('#form-project-cover-image')
    this.coverInput = document.querySelector('#form-project-cover-input')

    //loading-indicator
    this.projectLoadingDisplay = document.querySelector('#project-loading-indicator')
    this.projectSubmitText = document.querySelector('#project-submit-text')
  }
  // nav
  disableEditButton() {
    this.editButton.disabled = true
    this.editButton.classList.add('nav-edit-btn-disable')
  }
  enableEditButton() {
    this.editButton.disabled = false
    this.editButton.classList.remove('nav-edit-btn-disable')
  }
  // form
  showProjectForm() {
    this.projectFormContainer.style.display = 'block'
    this.disableEditButton()
  }
  hideProjectForm() {
    this.projectFormContainer.style.display = 'none'
    this.enableEditButton()
  }
  resetForm() {
    this.projectForm.reset()
    this.projectForm.classList.remove('was-validated')
    this.resetCoverImage()
  }
  // link
  addNewLink() {
    const newLinkRow = this.linkInputSample.cloneNode(true)
    newLinkRow.classList.remove('none')
    const inputs = newLinkRow.querySelectorAll('input')
    inputs.forEach((i) => {
      i.removeAttribute('disabled')
      i.setAttribute('required', 'true')
    })
    this.linksContainer.append(newLinkRow)
    // add remove link row button listener
    const removeBtn = newLinkRow.querySelector('.link-remove-btn')
    removeBtn.addEventListener('click', (e) => this.removeLinkRow(e))
  }
  removeLinkRow(event) {
    const linkRow = event.target.closest('.link-row')
    if (linkRow) linkRow.remove()
  }
  // cover
  resetCoverImage() {
    this.coverImage.src = ''
    this.coverImage.style.display = 'none'
  }
  previewImageOnInputChange(input, image) {
    if (input.files && input.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        image.src = event.target.result
        image.style.display = 'block'
      }
      reader.readAsDataURL(input.files[0])
    }
  }
}
// CONTROLLER
class AddProjectController {
  constructor(view, model) {
    this.view = view
    this.model = model
    this.init()
  }
  init() {
    this.alertMessage = new AlertMessage()
    // submit
    this.view.projectForm.addEventListener('submit', (e) => this.handleFormSubmit(e, this.view.projectForm))
    // form show / hide
    this.view.projectFormResetBtn.addEventListener('click', () => this.view.resetForm())
    this.view.addProjectBtn.addEventListener('click', () => this.openForm())
    this.view.projectFormCloseBtn.addEventListener('click', () => this.closeForm())
    // link
    this.view.addLinkBtn.addEventListener('click', () => this.view.addNewLink())
    this.view.removeLinkBtns.forEach((b) => {
      b.addEventListener('click', (e) => this.view.removeLinkRow(e))
    })
    // cover
    this.view.coverDisplay.addEventListener('click', () => this.view.coverInput.click())
    this.view.coverInput.addEventListener('change', () => this.previewCoverImage())
  }
  openForm() {
    this.view.showProjectForm()
  }
  closeForm() {
    this.view.hideProjectForm()
    this.view.resetForm()
    this.alertMessage.hideAlertMessage()
  }
  handleFormSubmit(event, form) {
    form.classList.add('was-validated')
    event.preventDefault()
    event.stopPropagation()
    if (form.checkValidity()) {
      // show loading icon
      this.view.projectSubmitText.style.display = 'none'
      this.view.projectLoadingDisplay.style.display = 'flex'
      form.submit()
    } else {
      this.alertMessage.showAlertMessage('Missing form information.')
    }
  }
  previewCoverImage() {
    this.view.previewImageOnInputChange(this.view.coverInput, this.view.coverImage)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const model = new AddProjectView()
  const view = new AddProjectView()
  const controller = new AddProjectController(view, model)
})
