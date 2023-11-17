import randomId from './helpers/randomId.js'

class MyProjectModel {
  constructor() {}
}

class MyProjectView {
  constructor() {
    // form
    this.projectForm = document.querySelector('#project-form')
    this.projectFormSubmit = document.querySelector('#project-form-submit')
    // edit nav bar
    this.editBtn = document.querySelector('#edit-btn')
    this.saveEditBtn = document.querySelector('#save-edit-btn')
    this.cancelEditBtn = document.querySelector('#cancel-edit-btn')
    this.editModeDisplay = document.querySelector('#edit-mode-display')
    // display
    this.titleDisplay = document.querySelector('#project-title-display')
    this.userAndDateDisplay = document.querySelector('#project-user-date-display')
    this.linksDisplay = document.querySelector('#project-links-display')
    this.descriptionDisplay = document.querySelector('#project-description-display')
    this.skillsDisplay = document.querySelector('#project-skills-display')
    this.contentDisplay = document.querySelector('#project-content-display')
    // cover buttons
    this.coverChangeButton = document.querySelector('#cover-change-btn')
    this.coverPositionButton = document.querySelector('#cover-position')
    this.coverInput = document.querySelector('#cover-input')
    this.coverImg = document.querySelector('#cover-img')
    this.originalCover = this.coverImg.src
    this.coverButtonsSetOne = document.querySelector('.cover-buttons-set-one')
    this.coverButtonsSetTwo = document.querySelector('.cover-buttons-set-two')
    this.coverPositionDone = document.querySelector('#cover-done-position')
    this.coverPositionCancel = document.querySelector('#cover-cancel-position')
    this.coverDrag = document.querySelector('.cover-drag')
    this.positionInput = document.querySelector('#cover-position-input')
    this.isDragging = false
    this.initPositionY
    // input div
    this.coverInputDiv = document.querySelector('#cover-input-div')
    this.coverButtonDiv = document.querySelector('#cover-buttons-container')
    this.titleInput = document.querySelector('#project-title-input-div')
    this.dateInput = document.querySelector('#project-date-input-div')
    this.linksInput = document.querySelector('#project-links-input-div')
    this.descriptionInput = document.querySelector('#project-description-input-div')
    this.skillsInput = document.querySelector('#project-skills-input-div')
    this.contentInput = document.querySelector('#project-content-input-div')
    // links
    this.addLinksBtn = document.querySelector('#add-link-button')
    this.linksContainer = document.querySelector('#project-links-input-container')
    this.linkSample = document.querySelector('#project-links-input-sample')
    this.removeLinksBtns = document.querySelectorAll('.remove-link-button')
    // content
    this.firstInput = document.querySelector('.first-input')
    this.firstInput.dataset.uuid = randomId(10)
    this.mainContentContainer = document.querySelector('#project-content-input-container')
    this.textSampleDiv = document.querySelector('#text-sample-div')
    this.textInputs = document.querySelectorAll('.content-text-input')
    this.toolButtons = document.querySelectorAll('.input-div-tool-btn')
    this.imageSampleDiv = document.querySelector('#image-sample-div')
    this.imageInputs = document.querySelectorAll('.content-image-input-div')
    this.inputOptionContainer = document.querySelector('#input-option-container')
    this.currentToolButton = null
    // item list
    this.viewModeElements = [this.titleDisplay, this.userAndDateDisplay, this.linksDisplay, this.descriptionDisplay, this.skillsDisplay, this.contentDisplay]
    this.editModeElements = [this.coverInputDiv, this.coverButtonDiv, this.titleInput, this.dateInput, this.linksInput, this.descriptionInput, this.skillsInput, this.contentInput]
    // default cover
    this.defaultCoverPositionY = this.getCoverPositionY()
    // init
    this.init()
  }
  init() {
    this.hideAllEditModeElements()
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
    // save default cover position
    this.defaultCoverPositionY = this.getCoverPositionY()
  }
  exitEditMode() {
    // reset form
    this.projectForm.reset()
    this.projectForm.classList.remove('was-validated')
    // show
    this.editBtn.style.display = 'flex'
    this.viewModeElements.forEach((e) => {
      if (e && e.style) e.style.display = 'block'
    })
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

    // remove new link input
    const newLinkInputs = document.querySelectorAll('.new-link-input')
    newLinkInputs.forEach((e) => e.remove())
    // remove new content input
    const contentInputs = document.querySelectorAll('.new-content-input')
    contentInputs.forEach((e) => e.remove())
    // remove cover drag
    this.cancelCoverDrag()
  }
  // Cover
  getCoverPositionY() {
    const coverImg = document.querySelector('#cover-img')
    const defaultPotion = 50
    if (!coverImg) {
      console.error('getCoverPosition: Missing coverImg element')
      return defaultPotion
    }
    const objectPosition = coverImg.style.objectPosition
    const emptySpace = objectPosition.indexOf(' ')
    const objectPositionArray = [...objectPosition]
    return Number(objectPositionArray.slice(emptySpace, -1).join('').trim())
  }
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
  showCoverButtonsSetTwo() {
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
  cancelCoverDrag() {
    this.coverButtonsSetTwo.style.display = 'none'
    this.coverDrag.style.display = 'none'
    this.coverButtonsSetOne.style.display = 'flex'
    this.coverImg.style.objectPosition = `center ${this.defaultCoverPositionY}%`
  }
  // links
  removeClosestLinkInput(removeButton) {
    const input = removeButton.closest('.project-links-input-flex')
    if (input) input.remove()
  }
  createLinkInput() {
    const newLinkInput = this.linkSample.cloneNode(true)
    newLinkInput.classList.add('new-link-input')
    const inputs = newLinkInput.querySelectorAll('input')
    inputs.forEach((i) => {
      i.removeAttribute('disabled')
      i.setAttribute('required', 'true')
    })
    const buttonContainer = newLinkInput.querySelector('.project-link-button-container')
    const button = buttonContainer.querySelector('.add-button')
    button.removeAttribute('id')
    button.classList.remove('add-button')
    button.classList.add('remove-button')
    button.addEventListener('click', () => this.removeClosestLinkInput(button))
    this.linksContainer.append(newLinkInput)
  }
  // content : text
  textInputSetup(input) {
    const baseHeight = 28
    input.style.height = 'auto'
    input.style.height = Math.max(baseHeight, input.scrollHeight) + 'px'
    input.addEventListener('input', () => {
      // auto height for input
      input.style.height = 'auto'
      input.style.height = input.scrollHeight + 'px'
      // hide tool button
      const toolButtons = document.querySelectorAll('.input-div-tool-btn')
      toolButtons.forEach((b) => (b.style.opacity = '0'))
    })
    input.addEventListener('focus', () => {
      const inputs = document.querySelectorAll('.content-text-input')
      inputs.forEach((i) => {
        if (i === input) {
          i.setAttribute('placeholder', 'Enter text here...')
        } else {
          i.setAttribute('placeholder', '')
        }
      })
      const btn = input.parentElement.querySelector('.input-div-tool-btn')
      this.toggleToolButtons(btn)
    })
  }
  //content: image
  imageInputSetup(imageDiv) {
    const input = imageDiv.querySelector('.inner-image-input')
    const display = imageDiv.querySelector('.content-image-input-display')
    const deleteButton = imageDiv.querySelector('.content-image-delete-btn')

    imageDiv.addEventListener('click', (event) => {
      // add file
      if (input) input.click()
      // change
      input.addEventListener('change', () => {
        if (input.files && input.files[0]) {
          const reader = new FileReader()
          reader.onload = (event) => {
            display.src = event.target.result
            display.classList.remove('none')
            imageDiv.dataset.uuid = randomId(10) // generate new Id
            const imageInputBox = imageDiv.querySelector('.content-image-input')
            if (imageInputBox) imageInputBox.style.display = 'none'
          }
          reader.readAsDataURL(input.files[0])
        }
      })
    })
    // delete image button
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation()
      const beforeInputDiv = event.target.parentNode.previousElementSibling
      if (confirm('Do you want to delete this image?')) {
        imageDiv.remove()
        // add text input if none exist
        if (!beforeInputDiv) {
          mainContentContainer.append(newTextInput())
        }
      }
    })
  }
  // content : insert option container
  optionContainerSetup(optionContainer) {
    const inputOptionText = optionContainer.querySelector('#input-option-text')
    const inputOptionImage = optionContainer.querySelector('#input-option-image')
    // text button
    inputOptionText.addEventListener('click', (event) => {
      this.insertAfter(this.newTextInput(), this.currentToolButton.parentElement)
    })

    // image button
    inputOptionImage.addEventListener('click', (event) => {
      const parent = this.currentToolButton.parentElement
      const textArea = parent.querySelector('textarea')
      // replace current text input with image input
      if (textArea && textArea.value.length === 0) {
        const lastElement = parent.previousElementSibling
        if (lastElement) {
          this.insertAfter(this.newImageInput(), lastElement)
        } else {
          this.insertAfter(this.newImageInput(), parent)
        }
        parent.remove()
      } else {
        this.insertAfter(this.newImageInput(), parent)
      }
    })
  }
  // content
  contentSetup() {
    this.textInputs.forEach((i) => this.textInputSetup(i))
    this.toolButtons.forEach((b) => this.toolBtnSetup(b))
    this.imageInputs.forEach((i) => this.imageInputSetup(i))
    this.optionContainerSetup(this.inputOptionContainer)
  }
  //content : input option / tool button(+)
  toolBtnSetup(toolBtn) {
    toolBtn.addEventListener('click', (event) => {
      if (!this.inputOptionContainer) return
      event.stopPropagation() // prevent clicking to body
      this.currentToolButton = toolBtn
      const buttonRect = toolBtn.getBoundingClientRect()
      // Adjust for the window's scroll position
      const x = buttonRect.left + window.scrollX
      const y = buttonRect.bottom + window.scrollY
      this.inputOptionContainer.style.display = 'flex'
      this.inputOptionContainer.style.top = y + 'px'
      this.inputOptionContainer.style.left = x + 'px'
    })
  }
  toggleToolButtons(button) {
    if (!button) return
    const buttons = document.querySelectorAll('.input-div-tool-btn')
    buttons.forEach((b) => {
      if (b === button) {
        b.style.opacity = '100'
      } else {
        b.style.opacity = '0'
      }
    })
  }
  toggleToolButtonsOnMouseOver(event) {
    const target = event.target
    // hover tool btn
    if (target.classList.contains('input-div-tool-btn')) {
      const toolButtons = document.querySelectorAll('.input-div-tool-btn')
      toolButtons.forEach((btn) => {
        if (target === btn) this.toggleToolButtons(btn)
      })
    } else if (target.classList.contains('content-input-div')) {
      // hover input div
      const inputDivs = document.querySelectorAll('.content-input-div')
      inputDivs.forEach((div) => {
        const toolButton = div.querySelector('.input-div-tool-btn')
        if (target === div) this.toggleToolButtons(toolButton)
      })
    }
  }
  hideInputOption() {
    if (this.inputOptionContainer) this.inputOptionContainer.style.display = 'none'
  }
  // content : helpers
  insertAfter(newNode, targetNode) {
    if (targetNode.nextSibling) {
      targetNode.parentNode.insertBefore(newNode, targetNode.nextSibling)
    }
    const textArea = newNode.querySelector('textarea')
    if (textArea) textArea.focus()
    const imageInput = newNode.querySelector('.inner-image-input')
    if (imageInput) imageInput.click()
  }
  newTextInput() {
    const newTextInputDiv = this.textSampleDiv.cloneNode(true)
    const newInput = newTextInputDiv.querySelector('textarea')
    const toolBtn = newTextInputDiv.querySelector('.input-div-tool-btn')
    this.textInputSetup(newInput)
    this.toolBtnSetup(toolBtn)
    newTextInputDiv.style.display = 'block'
    newTextInputDiv.id = ''
    newTextInputDiv.dataset.uuid = randomId(10)
    newInput.removeAttribute('disabled')
    return newTextInputDiv
  }
  focusAndSelect(textArea, range) {
    if (!textArea) return
    if (!range) range = textArea.value.length
    const len = textArea.value.length
    if (range > len) {
      textArea.setSelectionRange(len, len)
    } else {
      textArea.setSelectionRange(range, range)
    }
    textArea.focus()
  }
  newImageInput() {
    const newImageInputDiv = this.imageSampleDiv.cloneNode(true)
    const newInput = newImageInputDiv.querySelector('input')
    const toolBtn = newImageInputDiv.querySelector('.input-div-tool-btn')
    this.imageInputSetup(newImageInputDiv)
    this.toolBtnSetup(toolBtn)
    newImageInputDiv.style.display = 'block'
    newImageInputDiv.id = ''
    newInput.removeAttribute('disabled')
    return newImageInputDiv
  }
  contentKeydownHandler(event) {
    const target = event.target
    const targetParent = target.parentNode
    console.log(event.key)
    // In textArea
    if (target.classList.contains('content-text-input')) {
      // Remove 'new-input' after enter a character value (eg: 'a' ';')
      if (event.key.length === 1) {
        targetParent.classList.remove('new-input')
      }
      // Enter : new text input
      if (event.key === 'Enter') {
        if (target.selectionEnd !== target.value.length) return
        event.preventDefault()
        event.stopPropagation()
        const newInput = this.newTextInput()
        this.insertAfter(newInput, targetParent)
      }
      // Backspace : delete text input
      if (event.key === 'Backspace') {
        const beforeInputDiv = target.parentNode.previousElementSibling
        if (!beforeInputDiv) return
        const textArea = beforeInputDiv.querySelector('textarea')
        // delete current input
        if (target.value === '') {
          event.preventDefault()
          target.parentNode.remove()
          this.focusAndSelect(textArea)
          return
        }
        // move to previous input
        if (target.selectionEnd === 0) {
          event.preventDefault()
          this.focusAndSelect(textArea)
          return
        }
      }
      // Up/Down arrows:
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        let selectTarget = null
        if (!isFinite(target.selectionStart)) return
        // move to prev input
        if (target.selectionStart === 0 && event.key === 'ArrowUp') {
          event.preventDefault()
          selectTarget = targetParent.previousElementSibling
        }
        // move to next input
        if (target.selectionStart === target.value.length && event.key === 'ArrowDown') {
          event.preventDefault()
          selectTarget = targetParent.nextElementSibling
        }
        // focus on new input
        if (!selectTarget) return
        const selectTargetInput = selectTarget.querySelector('.content-text-input')
        if (!selectTargetInput) return
        const selectionEnd = target.selectionStart
        this.focusAndSelect(selectTargetInput, selectionEnd)
      }
    }
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
}
// CONTROLLER
class MyProjectController {
  constructor(view, model) {
    this.view = view
    this.model = model
    this.init()
  }
  init() {
    // navbar
    this.view.editBtn.addEventListener('click', () => this.onEditBtnClick())
    this.view.cancelEditBtn.addEventListener('click', () => this.onCancelBtnClick())
    // form
    this.view.saveEditBtn.addEventListener('click', (e) => this.handleFormSubmit(e, this.view.projectForm))
    // cover
    this.view.coverChangeButton.addEventListener('click', () => this.view.coverInput.click())
    this.view.coverInput.addEventListener('click', () => this.view.coverInput.click())
    this.view.coverPositionButton.addEventListener('click', () => this.view.showCoverButtonsSetTwo())
    this.view.coverPositionDone.addEventListener('click', () => {
      this.view.showCoverButtonsSetOne()
      this.view.setCoverPosition()
    })
    this.view.coverPositionCancel.addEventListener('click', () => {
      this.view.showCoverButtonsSetOne()
      this.view.resetCover()
    })
    this.view.coverDrag.addEventListener('mousedown', (e) => {
      this.view.startDragEventHandler(e, this.getMousePositionY(e))
    })
    this.view.coverDrag.addEventListener('mousemove', (e) => {
      this.view.dragCoverPositionEventHandler(e, this.getMousePositionY(e))
    })
    this.view.coverDrag.addEventListener('mouseup', () => this.view.stopDrag())
    // links
    this.view.addLinksBtn.addEventListener('click', () => this.view.createLinkInput())
    this.view.removeLinksBtns.forEach((b) => {
      b.addEventListener('click', () => this.view.removeClosestLinkInput(b))
    })
    // content
    document.addEventListener('click', () => this.view.hideInputOption())
    document.addEventListener('mouseover', (e) => this.view.toggleToolButtonsOnMouseOver(e))
    document.addEventListener('keydown', (e) => this.view.contentKeydownHandler(e))
    // preview image on change
    this.view.coverInput.addEventListener('change', () => this.previewCoverImage())
  }
  onEditBtnClick() {
    this.view.enterEditMode()
    this.view.contentSetup()
  }
  onCancelBtnClick() {
    this.view.resetCover()
    this.view.exitEditMode()
  }
  previewCoverImage() {
    this.view.previewImageOnInputChange(this.view.coverInput, this.view.coverImg)
  }
  handleFormSubmit(event, form) {
    form.classList.add('was-validated')
    event.preventDefault()
    event.stopPropagation()
    // check form validity
    if (form.checkValidity()) {
      // Generate content order list
      event.preventDefault()
      event.stopPropagation()
      const contents = this.view.contentInput.querySelectorAll('.content-input-div')
      // filter out undefined content
      const filteredContents = []
      contents.forEach((c) => {
        const textArea = c.querySelector('textarea')
        const image = c.querySelector('.inner-image-input')
        if (c.classList.contains('new-input')) return
        if (textArea && textArea.value === 'undefined') return
        if (image && image.files.length === 0 && !image.dataset.original) return
        filteredContents.push(c)
      })
      filteredContents.forEach((c) => {
        const orderInput = document.createElement('input')
        const uuidInput = document.createElement('input')
        orderInput.type = 'text'
        orderInput.name = 'order'
        uuidInput.type = 'text'
        uuidInput.name = 'uuid'
        orderInput.classList.add('none')
        uuidInput.classList.add('none')
        if (c.classList.contains('data-text')) {
          orderInput.value = 'text'
        } else if (c.classList.contains('data-image')) {
          orderInput.value = 'image'
        }
        uuidInput.value = c.dataset.uuid
        form.append(orderInput)
        form.append(uuidInput)
      })
      form.submit()
    }
  }
  getMousePositionY(event) {
    return event.clientY + window.scrollY
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const model = new MyProjectModel()
  const view = new MyProjectView()
  const controller = new MyProjectController(view, model)
})
