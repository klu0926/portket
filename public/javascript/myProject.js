document.addEventListener('DOMContentLoaded', () => {
  editMode()
  previewProjectCover()
  links()
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

  // input div
  const coverInputDiv = document.querySelector('#cover-input-div')
  const titleInput = document.querySelector('#project-title-input-div')
  const dateInput = document.querySelector('#project-date-input-div')
  const linksInput = document.querySelector('#project-links-input-div')

  // item list
  const viewModeElements = [titleDisplay, ussrAndDateDisplay, linksDisplay]
  const editModeElements = [coverInputDiv, titleInput, dateInput, linksInput]

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
