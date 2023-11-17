import randomId from './helpers/randomId.js'
let defaultCoverPositionY = getCoverPositionY()

document.addEventListener('DOMContentLoaded', () => {
  editMode()
  coverButtons()
  links()
  content()
})

function editMode() {
  // form
  const projectForm = document.querySelector('#project-form')
  const projectFormSubmit = document.querySelector('#project-form-submit')
  // edit nav bar
  const editBtn = document.querySelector('#edit-btn')
  const saveEditBtn = document.querySelector('#save-edit-btn')
  const cancelEditBtn = document.querySelector('#cancel-edit-btn')
  const editModeDisplay = document.querySelector('#edit-mode-display')
  // display
  const titleDisplay = document.querySelector('#project-title-display')
  const userAndDateDisplay = document.querySelector('#project-user-date-display')
  const linksDisplay = document.querySelector('#project-links-display')
  const descriptionDisplay = document.querySelector('#project-description-display')
  const skillsDisplay = document.querySelector('#project-skills-display')
  const contentDisplay = document.querySelector('#project-content-display')

  // input div
  const coverInputDiv = document.querySelector('#cover-input-div')
  const coverButtonDiv = document.querySelector('#cover-buttons-container')
  const titleInput = document.querySelector('#project-title-input-div')
  const dateInput = document.querySelector('#project-date-input-div')
  const linksInput = document.querySelector('#project-links-input-div')
  const descriptionInput = document.querySelector('#project-description-input-div')
  const skillsInput = document.querySelector('#project-skills-input-div')
  const contentInput = document.querySelector('#project-content-input-div')

  // item list
  const viewModeElements = [titleDisplay, userAndDateDisplay, linksDisplay, descriptionDisplay, skillsDisplay, contentDisplay]
  const editModeElements = [coverInputDiv, coverButtonDiv, titleInput, dateInput, linksInput, descriptionInput, skillsInput, contentInput]

  // hide all edit mode elements onload
  editModeElements.forEach((e) => {
    if (e && e.style) e.style.display = 'none'
  })

  // Enter edit mode
  editBtn.addEventListener('click', () => {
    // show
    saveEditBtn.style.display = 'flex'
    cancelEditBtn.style.display = 'flex'
    editModeElements.forEach((e) => {
      if (e && e.style) e.style.display = 'block'
    })
    // hide
    editBtn.style.display = 'none'
    viewModeElements.forEach((e) => {
      if (e && e.style) e.style.display = 'none'
    })
    // show edit mode animation
    editModeDisplay.style.display = 'flex'
    editModeDisplay.classList.add('show-animation')
    editModeDisplay.classList.remove('hide-animation')
    editModeDisplay.style.animationPlayState = 'running'
    // save default cover position
    defaultCoverPositionY = getCoverPositionY()
  })

  // Exit edit mode
  cancelEditBtn.addEventListener('click', () => {
    // reset form
    projectForm.reset()
    projectForm.classList.remove('was-validated')
    // show
    editBtn.style.display = 'flex'
    viewModeElements.forEach((e) => {
      if (e && e.style) e.style.display = 'block'
    })
    // hide
    saveEditBtn.style.display = 'none'
    cancelEditBtn.style.display = 'none'
    editModeElements.forEach((e) => {
      if (e && e.style) e.style.display = 'none'
    })
    // hide edit mode animation
    editModeDisplay.classList.remove('show-animation')
    editModeDisplay.classList.add('hide-animation')
    editModeDisplay.style.animationPlayState = 'running'

    // remove new link input
    const newLinkInputs = document.querySelectorAll('.new-link-input')
    newLinkInputs.forEach((e) => e.remove())

    // remove new content input
    const contentInputs = document.querySelectorAll('.new-content-input')
    contentInputs.forEach((e) => e.remove())

    // remove cover drag
    cancelCoverDrag()
  })

  // save
  saveEditBtn.addEventListener('click', () => {
    projectFormSubmit.click()
  })

  // form submit
  projectForm.addEventListener('submit', (event) => {
    projectForm.classList.add('was-validated')
    event.preventDefault()
    event.stopPropagation()
    // check form validity
    if (projectForm.checkValidity()) {
      // Generate content order list
      event.preventDefault()
      event.stopPropagation()
      const contents = contentInput.querySelectorAll('.content-input-div')

      // filter out undefined content
      const filteredContents = []
      contents.forEach((c) => {
        const texarea = c.querySelector('textarea')
        const image = c.querySelector('.inner-image-input')
        if (c.classList.contains('new-input')) return
        if (texarea && texarea.value === 'undefined') return
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
        projectForm.append(orderInput)
        projectForm.append(uuidInput)
      })
      projectForm.submit()
    }
  })
}

function coverButtons() {
  const coverChangeButton = document.querySelector('#cover-change-btn')
  const coverPositionButton = document.querySelector('#cover-position')
  const coverInput = document.querySelector('#cover-input')
  const coverImg = document.querySelector('#cover-img')
  const originalCover = coverImg.src
  const cancelEditBtn = document.querySelector('#cancel-edit-btn')
  const coverButtonsSetOne = document.querySelector('.cover-buttons-set-one')
  const coverButtonsSetTwo = document.querySelector('.cover-buttons-set-Two')
  const coverPositionDone = document.querySelector('#cover-done-position')
  const coverPositionCancel = document.querySelector('#cover-cancel-position')
  const coverDrag = document.querySelector('.cover-drag')
  const positionInput = document.querySelector('#cover-position-input')
  let defaultCoverPositionY = getCoverPositionY()
  let isDragging = false
  let initPositionY

  // Change Cover
  coverChangeButton.addEventListener('click', (event) => {
    coverInput.click()
  })
  // Preview cover on change
  coverInput.addEventListener('change', () => {
    if (coverInput.files && coverInput.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        coverImg.src = event.target.result
      }
      reader.readAsDataURL(coverInput.files[0])
    }
  })
  // cancel cover change
  cancelEditBtn.addEventListener('click', () => {
    coverImg.src = originalCover
  })

  // set cover Position
  coverPositionButton.addEventListener('click', () => {
    coverButtonsSetOne.style.display = 'none'
    coverButtonsSetTwo.style.display = 'flex'
    coverDrag.style.display = 'flex'
  })

  // save cover position
  coverPositionDone.addEventListener('click', () => {
    coverButtonsSetTwo.style.display = 'none'
    coverDrag.style.display = 'none'
    coverButtonsSetOne.style.display = 'flex'
    // record cover position to input
    positionInput.value = getCoverPositionY()
    defaultCoverPositionY = getCoverPositionY()
  })

  // cancel position
  coverPositionCancel.addEventListener('click', () => {
    coverButtonsSetTwo.style.display = 'none'
    coverDrag.style.display = 'none'
    coverButtonsSetOne.style.display = 'flex'
    coverImg.style.objectPosition = `center ${defaultCoverPositionY}%`
  })

  // reposition cover : mouse down
  coverDrag.addEventListener('mousedown', (event) => {
    initPositionY = getMousePositionY(event)
    isDragging = true
  })

  // drag
  document.addEventListener('mousemove', (event) => {
    if (isDragging) {
      event.stopPropagation()
      updateCoverPosition(event)
    }
  })

  // mouse up
  document.addEventListener('mouseup', () => {
    isDragging = false
  })

  // update cover css object position
  function updateCoverPosition(event) {
    const coverPosition = getCoverPositionY()
    let deltaY = initPositionY - getMousePositionY(event)
    const dampingFactor = 0.5
    let newCoverPosition = coverPosition + deltaY * dampingFactor
    newCoverPosition = Math.min(100, Math.max(0, newCoverPosition))
    // set cover position Y
    coverImg.style.objectPosition = `center ${newCoverPosition}%`
    // record cover position to input
    positionInput.value = getCoverPositionY()
    // update initial position (This is really important!)
    initPositionY = getMousePositionY(event)
  }
}

function links() {
  const addLinksBtn = document.querySelector('#add-link-button')
  const linksContainer = document.querySelector('#project-links-input-container')
  const linkSample = document.querySelector('#project-links-input-sample')
  const removeLinksBtns = document.querySelectorAll('.remove-link-button')

  function removeBtnFunction(btn) {
    btn.addEventListener('click', (event) => {
      const input = event.target.closest('.project-links-input-flex')
      if (input) input.remove()
    })
  }

  removeLinksBtns.forEach((btn) => {
    removeBtnFunction(btn)
  })

  addLinksBtn.addEventListener('click', (event) => {
    const newLinkInput = linkSample.cloneNode(true)
    newLinkInput.classList.add('new-link-input')
    const inputs = newLinkInput.querySelectorAll('input')
    inputs.forEach((i) => {
      i.removeAttribute('disabled')
      i.setAttribute('required', 'true')
    })
    const buttonContainer = newLinkInput.querySelector('.project-link-button-container')
    const addButton = buttonContainer.querySelector('.add-button')
    addButton.removeAttribute('id')
    addButton.classList.remove('add-button')
    addButton.classList.add('remove-button')
    removeBtnFunction(addButton)
    linksContainer.append(newLinkInput)
  })
}

//-----------Content-------------//
function content() {
  // edit nav bar
  const editBtn = document.querySelector('#edit-btn')
  const saveEditBtn = document.querySelector('#save-edit-btn')
  const cancelEditBtn = document.querySelector('#cancel-edit-btn')
  const editModeDisplay = document.querySelector('#edit-mode-display')
  // content
  const mainContentContainer = document.querySelector('#project-content-input-container')
  const textSampleDiv = document.querySelector('#text-sample-div')
  const textInputs = document.querySelectorAll('.content-text-input')
  const toolButtons = document.querySelectorAll('.input-div-tool-btn')
  const imageSampleDiv = document.querySelector('#image-sample-div')
  const imageInputs = document.querySelectorAll('.content-image-input-div')
  const inputOptionContainer = document.querySelector('#input-option-container')
  let currentToolButton = null

  // Setup: Text input
  function textInputSetup(input) {
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
      toggleToolButtons(btn)
    })
  }

  // Setup : image input
  function imageInputSetup(imageDiv) {
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

  // Setup : insert option container
  function optionContainerSetup(optionContainer) {
    const inputOptionText = optionContainer.querySelector('#input-option-text')
    const inputOptionImage = optionContainer.querySelector('#input-option-image')
    // text button
    inputOptionText.addEventListener('click', (event) => {
      insertAfter(newTextInput(), currentToolButton.parentElement)
    })

    // image button
    inputOptionImage.addEventListener('click', (event) => {
      const parent = currentToolButton.parentElement
      const textarea = parent.querySelector('textarea')
      // replace current text input with image input
      if (textarea && textarea.value.length === 0) {
        const lastElement = parent.previousElementSibling
        if (lastElement) {
          insertAfter(newImageInput(), lastElement)
        } else {
          insertAfter(newImageInput(), parent)
        }
        parent.remove()
      } else {
        insertAfter(newImageInput(), parent)
      }
    })
  }

  // Setup: Tool-btn
  function toolBtnSetup(toolBtn) {
    toolBtn.addEventListener('click', (event) => {
      if (!inputOptionContainer) return
      event.stopPropagation() // prevent clicking to body
      currentToolButton = toolBtn
      const buttonRect = toolBtn.getBoundingClientRect()
      // Adjust for the window's scroll position
      const x = buttonRect.left + window.scrollX
      const y = buttonRect.bottom + window.scrollY
      inputOptionContainer.style.display = 'flex'
      inputOptionContainer.style.top = y + 'px'
      inputOptionContainer.style.left = x + 'px'
    })
  }

  // Helper: Toggle tool buttons
  function toggleToolButtons(button) {
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

  // Helper: Content input insert
  function insertAfter(newNode, targetNode) {
    if (targetNode.nextSibling) {
      targetNode.parentNode.insertBefore(newNode, targetNode.nextSibling)
    } else {
      console.error('insertAfter: target has no next Sibling')
      return
    }
    const textArea = newNode.querySelector('textarea')
    if (textArea) textArea.focus()
    const imageInput = newNode.querySelector('.inner-image-input')
    if (imageInput) imageInput.click()
  }

  // Helper: Create new Text input
  function newTextInput() {
    const newTextInputDiv = textSampleDiv.cloneNode(true)
    const newInput = newTextInputDiv.querySelector('textarea')
    const toolBtn = newTextInputDiv.querySelector('.input-div-tool-btn')
    textInputSetup(newInput)
    toolBtnSetup(toolBtn)
    newTextInputDiv.style.display = 'block'
    newTextInputDiv.id = ''
    newTextInputDiv.dataset.uuid = randomId(10)
    newInput.removeAttribute('disabled')
    return newTextInputDiv
  }

  // Helper: Focus and select input
  function focusAndSelect(textArea, range) {
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

  // Helper : Create new Image input
  function newImageInput() {
    const newImageInputDiv = imageSampleDiv.cloneNode(true)
    const newInput = newImageInputDiv.querySelector('input')
    const toolBtn = newImageInputDiv.querySelector('.input-div-tool-btn')
    imageInputSetup(newImageInputDiv)
    toolBtnSetup(toolBtn)
    newImageInputDiv.style.display = 'block'
    newImageInputDiv.id = ''
    newInput.removeAttribute('disabled')
    return newImageInputDiv
  }

  // START SETUP
  const firstInput = document.querySelector('.first-input')
  firstInput.dataset.uuid = randomId(10)
  editBtn.addEventListener('click', () => {
    textInputs.forEach((i) => textInputSetup(i))
    toolButtons.forEach((b) => toolBtnSetup(b))
    imageInputs.forEach((i) => imageInputSetup(i))
    optionContainerSetup(inputOptionContainer)
  })

  // EVENT
  // on click
  document.addEventListener('click', (event) => {
    // hide option container
    if (inputOptionContainer) inputOptionContainer.style.display = 'none'
  })

  // on mouse hover
  document.addEventListener('mouseover', (event) => {
    const target = event.target
    // show/hide tool-btn
    // hover tool btn
    if (target.classList.contains('input-div-tool-btn')) {
      const toolButtons = document.querySelectorAll('.input-div-tool-btn')
      toolButtons.forEach((btn) => {
        if (target === btn) toggleToolButtons(btn)
      })
    } else if (target.classList.contains('content-input-div')) {
      // hover input div
      const inputDivs = document.querySelectorAll('.content-input-div')
      inputDivs.forEach((div) => {
        const toolButton = div.querySelector('.input-div-tool-btn')
        if (target === div) toggleToolButtons(toolButton)
      })
    }
  })

  // on key press
  document.addEventListener('keydown', (event) => {
    const target = event.target
    const targetParent = target.parentNode

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
        const newInput = newTextInput()
        insertAfter(newInput, targetParent)
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
          focusAndSelect(textArea)
          return
        }
        // move to previous input
        if (target.selectionEnd === 0) {
          event.preventDefault()
          focusAndSelect(textArea)
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
        focusAndSelect(selectTargetInput, selectionEnd)
      }
    }
  })
}

// -------------------- Helper ------------------------ //
function cancelCoverDrag() {
  const coverChangeButton = document.querySelector('#cover-change-btn')
  //const coverPositionButton = document.querySelector('#cover-position')
  const coverImg = document.querySelector('#cover-img')
  const coverButtonsSetOne = document.querySelector('.cover-buttons-set-one')
  const coverButtonsSetTwo = document.querySelector('.cover-buttons-set-Two')
  const coverDrag = document.querySelector('.cover-drag')
  coverButtonsSetTwo.style.display = 'none'
  coverDrag.style.display = 'none'
  coverButtonsSetOne.style.display = 'flex'
  coverImg.style.objectPosition = `center ${defaultCoverPositionY}%`
}

// get mouse Y
function getMousePositionY(event) {
  return event.clientY + window.scrollY
}

// get cover css object position
function getCoverPositionY() {
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
