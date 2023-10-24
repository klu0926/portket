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
    if (!projectForm.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
    projectForm.classList.add('was-validated')
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

function content() {
  const textSampleDiv = document.querySelector('#text-sample-div')
  const textInputs = document.querySelectorAll('.content-text-input')

  // text input events
  textInputs.forEach((i) => addTextInputEvent(i))
  function addTextInputEvent(input) {
    input.addEventListener('input', () => {
      // auto height
      input.style.height = 'auto'
      input.style.height = input.scrollHeight + 'px'
    })
  }
  // content insert
  function insertAfter(newNode, targetNode) {
    if (targetNode.nextSibling) {
      targetNode.parentNode.insertBefore(newNode, targetNode.nextSibling)
    } else {
      targetNode.parentNode.appendChild(newNode)
    }
  }
  // input click
  document.addEventListener('click', (event) => {
    const target = event.target
    const textInputs = document.querySelectorAll('.content-text-input')

    textInputs.forEach((input) => {
      if (input !== target) {
        input.setAttribute('placeholder', '')
        input.parentNode.querySelector('.input-div-tool-btn').style.display = 'none'
      } else {
        input.setAttribute('placeholder', ' Enter text here...')
        input.parentNode.querySelector('.input-div-tool-btn').style.display = 'flex'
      }
    })
  })

  // mouse hover
  document.addEventListener('mouseover', (event) => {
    const target = event.target
    const textInputs = document.querySelectorAll('.content-text-input')

    textInputs.forEach((input) => {
      if (input !== target) {
        input.parentNode.querySelector('.input-div-tool-btn').style.display = 'none'
      } else {
        input.parentNode.querySelector('.input-div-tool-btn').style.display = 'flex'
      }
    })
  })

  // key press
  document.addEventListener('keydown', (event) => {
    const target = event.target
    const targetParent = target.parentNode
    let targetName = ''
    console.log('keypress', event.key)

    if (target.tagName === 'TEXTAREA') {
      if (target.classList.contains('content-text-input')) {
        targetName = 'text'
      }
      // enter new text input
      if (targetName === 'text' && event.key === 'Enter') {
        event.preventDefault()
        event.stopPropagation()
        const newTextInputDiv = textSampleDiv.cloneNode(true)
        const newInput = newTextInputDiv.querySelector('textarea')
        addTextInputEvent(newInput)
        newTextInputDiv.style.display = 'block'
        newInput.id = ''
        newInput.removeAttribute('disabled')
        insertAfter(newTextInputDiv, targetParent)
        newInput.focus()
        newInput.click()
      }
      // delete text input
      if (targetName === 'text' && event.key === 'Backspace') {
        const beforeInputDiv = target.parentNode.previousElementSibling
        // delete current input
        if (target.value === '' && beforeInputDiv) {
          target.parentNode.remove()
          beforeInputDiv.querySelector('textarea').focus()
          beforeInputDiv.querySelector('.input-div-tool-btn').style.display = 'flex'
        }
      }
    }
  })
}
