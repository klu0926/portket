let defaultCoverPositionY = getCoverPositionY()

document.addEventListener('DOMContentLoaded', () => {
  previewPortfolioCover()
  coverButtons()
  previewPortfolioAvatar()
  editMode()
  socials()
})

function editMode() {
  // info form
  const infoFormSubmit = document.querySelector('#info-submit-btn')
  const infoForm = document.querySelector('#info-form')
  // edit nav bar
  const editBtn = document.querySelector('#edit-btn')
  const saveEditBtn = document.querySelector('#save-edit-btn')
  const cancelEditBtn = document.querySelector('#cancel-edit-btn')
  const editModeDisplay = document.querySelector('#edit-mode-display')
  // input div
  const coverInputDiv = document.querySelector('#cover-input-div')
  const coverButtonDiv = document.querySelector('#cover-buttons-container')
  const avatarInputDiv = document.querySelector('#avatar-input-div')
  const nameInputDiv = document.querySelector('#name-input-div')
  const titleInputDiv = document.querySelector('#title-input-div')
  const socialInputDiv = document.querySelector('#social-input-div')
  const descriptionInputDiv = document.querySelector('#description-input-div')
  const contactInputDiv = document.querySelector('#contact-input-div')
  const skillInputDiv = document.querySelector('#skill-input-div')

  // display
  const nameDisplay = document.querySelector('#name-display')
  const titleDisplay = document.querySelector('#title-display')
  const socialDisplay = document.querySelector('#social-display')
  const descriptionDisplay = document.querySelector('#description-display')
  const contactDisplay = document.querySelector('#contact-display')
  const skillDisplay = document.querySelector('#skill-display')

  // project btn
  const addProjectBtn = document.querySelector('#add-project-btn')
  const projectBlocker = document.querySelector('#project-blocker')

  // items list
  const editModeElements = [coverInputDiv, coverButtonDiv, nameInputDiv, titleInputDiv, socialInputDiv, avatarInputDiv, projectBlocker, descriptionInputDiv, contactInputDiv, skillInputDiv]

  const viewModeElements = [nameDisplay, titleDisplay, socialDisplay, addProjectBtn, descriptionDisplay, contactDisplay, skillDisplay]

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
    infoForm.reset()
    infoForm.classList.remove('was-validated')
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
    infoFormSubmit.click()
  })

  // form submit
  infoForm.addEventListener('submit', (event) => {
    if (!infoForm.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
    infoForm.classList.add('was-validated')
  })
}

function previewPortfolioCover() {
  const coverInput = document.querySelector('#cover-input')
  const coverImg = document.querySelector('#cover-img')
  const originalCover = coverImg.src
  const cancelEditBtn = document.querySelector('#cancel-edit-btn')

  // change
  coverInput.addEventListener('change', () => {
    if (coverInput.files && coverInput.files[0]) {
      console.log('coverInput file', coverInput.files)
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

function previewPortfolioAvatar() {
  const avatarInputDiv = document.querySelector('#avatar-input-div')
  const avatarInput = document.querySelector('#avatar-input')
  const avatarImg = document.querySelector('#avatar-img')
  const originalAvatar = avatarImg.src
  const cancelEditBtn = document.querySelector('#cancel-edit-btn')

  // add
  avatarInputDiv.addEventListener('click', (event) => {
    avatarInput.click()
  })
  // change
  avatarInput.addEventListener('change', () => {
    if (avatarInput.files && avatarInput.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        avatarImg.src = event.target.result
      }
      reader.readAsDataURL(avatarInput.files[0])
    }
  })
  // cancel
  cancelEditBtn.addEventListener('click', () => {
    avatarImg.src = originalAvatar
  })
}

function socials() {
  const addSocialBtn = document.querySelector('#add-social')
  const socialInputContainer = document.querySelector('#social-input-container')
  const removeSocialBtns = document.querySelectorAll('.remove-social')

  // remove button event
  function addRemoveInputEvent(element) {
    element.addEventListener('click', (event) => {
      const input = event.target.closest('.new-social-input')
      if (input) input.remove()
    })
  }
  removeSocialBtns.forEach((btn) => {
    addRemoveInputEvent(btn)
  })

  // add social input
  addSocialBtn.addEventListener('click', () => {
    const newSocialInput = document.createElement('div')
    newSocialInput.innerHTML = document.querySelector('.social-input-sample').innerHTML
    newSocialInput.classList.add('new-social-input')
    newSocialInput.querySelector('.form-select').removeAttribute('disabled')
    newSocialInput.querySelector('#socials-link').removeAttribute('disabled')
    socialInputContainer.append(newSocialInput)

    // add new remove btn event
    const removeSocialBtn = newSocialInput.querySelector('.remove-social')
    addRemoveInputEvent(removeSocialBtn)
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
