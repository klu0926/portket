document.addEventListener('DOMContentLoaded', () => {
  editMode()
  previewProjectCover()
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

  // input div
  const coverInputDiv = document.querySelector('#cover-input-div')
  const titleInput = document.querySelector('#project-title-input')

  // display
  const titleDisplay = document.querySelector('#project-title-display')

  // item list
  const editModeElements = [coverInputDiv, titleInput]
  const viewModeElements = [titleDisplay]

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

    // remove new social input
    const newSocialInputs = document.querySelectorAll('.new-social-input')
    newSocialInputs.forEach((e) => e.remove())
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
