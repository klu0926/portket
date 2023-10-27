document.addEventListener('DOMContentLoaded', () => {
  editMode()
  previewProjectCover()
  links()
  content()
})

function editMode() {
  // form
  const projectForm = document.querySelector('#project-form')
  const projectFormSubmit = document.querySelector('#project-form-submit')
  const orderInput = document.querySelector('#order-input')
  // edit nav bar
  const editBtn = document.querySelector('#edit-btn')
  const saveEditBtn = document.querySelector('#save-edit-btn')
  const cancelEditBtn = document.querySelector('#cancel-edit-btn')
  const editModeDisplay = document.querySelector('#edit-mode-display')

  // display
  const titleDisplay = document.querySelector('#project-title-display')
  const ussrAndDateDisplay = document.querySelector('#project-user-date-display')
  const linksDisplay = document.querySelector('#project-links-display')
  const descriptionDisplay = document.querySelector('#project-description-display')
  const skillsDisplay = document.querySelector('#project-skills-display')
  const contentDisplay = document.querySelector('#project-content-display')

  // input div
  const coverInputDiv = document.querySelector('#cover-input-div')
  const titleInput = document.querySelector('#project-title-input-div')
  const dateInput = document.querySelector('#project-date-input-div')
  const linksInput = document.querySelector('#project-links-input-div')
  const descriptionInput = document.querySelector('#project-description-input-div')
  const skillsInput = document.querySelector('#project-skills-input-div')
  const contentInput = document.querySelector('#project-content-input-div')

  // item list
  const viewModeElements = [titleDisplay, ussrAndDateDisplay, linksDisplay, descriptionDisplay, skillsDisplay, contentDisplay]
  const editModeElements = [coverInputDiv, titleInput, dateInput, linksInput, descriptionInput, skillsInput]

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
      contents.forEach((c) => {
        const input = document.createElement('input')
        input.type = 'text'
        input.name = 'order'
        input.classList.add('none')
        if (c.classList.contains('data-text')) {
          input.value = 'text'
          console.log('input value text', input.value)
        } else if (c.classList.contains('data-image')) {
          input.value = 'image'
        }
        projectForm.append(input)
      })
      projectForm.submit()
    }
  })
}

function previewProjectCover() {
  const coverInputDiv = document.querySelector('#cover-input-div')
  const coverInput = document.querySelector('#cover-input')
  const coverImg = document.querySelector('#cover-img')
  const originalCover = coverImg.src
  const cancelEditBtn = document.querySelector('#cancel-edit-btn')
  // add
  coverInputDiv.addEventListener('click', (event) => {
    coverInput.click()
  })
  // change
  coverInput.addEventListener('change', () => {
    if (coverInput.files && coverInput.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        coverImg.src = event.target.result
      }
      reader.readAsDataURL(coverInput.files[0])
    }
  })
  // cancel
  cancelEditBtn.addEventListener('click', () => {
    coverImg.src = originalCover
  })
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
    const buttonContainer = newLinkInput.querySelector('.button-container')
    const button = buttonContainer.querySelector('.add-button')
    button.removeAttribute('id')
    button.classList.remove('add-button')
    button.classList.add('remove-button')
    removeBtnFunction(button)
    linksContainer.append(newLinkInput)
  })
}

//-----------Content-------------//
function content() {
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
            display.style.display = 'block'
            imageDiv.querySelector('.content-image-input').style.display = 'none'
          }
          reader.readAsDataURL(input.files[0])
        }
      })
    })
    // delete image button
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation()
      if (confirm('Do you want to delete this image?')) imageDiv.remove()
    })
  }

  // Setup : option container
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
      if (textarea && textarea.value.length === 0) {
        const lastElement = parent.previousElementSibling
        parent.remove()
        if (lastElement) {
          insertAfter(newImageInput(), lastElement)
        } else {
          mainContentContainer.append(newImageInput())
        }
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
      targetNode.parentNode.appendChild(newNode)
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
  textInputs.forEach((i) => textInputSetup(i))
  toolButtons.forEach((b) => toolBtnSetup(b))
  imageInputs.forEach((i) => imageInputSetup(i))
  optionContainerSetup(inputOptionContainer)

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
        event.preventDefault() // default Arrow up move to the start
        let element = null
        if (event.key === 'ArrowUp') {
          element = targetParent.previousElementSibling
        } else if (event.key === 'ArrowDown') {
          element = targetParent.nextElementSibling
        }
        if (!element) return
        const textInput = element.querySelector('.content-text-input')
        if (!textInput) return
        const selectionEnd = target.selectionEnd
        focusAndSelect(textInput, selectionEnd)
      }
    }
  })
}
