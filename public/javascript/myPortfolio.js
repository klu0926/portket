document.addEventListener('DOMContentLoaded', () => {
  previewPortfolioCover()
  previewPortfolioAvatar()
  editMode()
  socials()
})

function editMode() {
  // info form
  const infoFormSubmit = document.querySelector('#info-submit-btn')
  const infoForm = document.querySelector('#info-form')
  // edit nav bar
  const editPortfolioBtn = document.querySelector('#edit-portfolio-btn')
  const savePortfolioBtn = document.querySelector('#save-portfolio-btn')
  const cancelPortfolioBtn = document.querySelector('#cancel-portfolio-btn')
  const editModeDisplay = document.querySelector('#edit-mode-display')
  // input div
  const coverInputDiv = document.querySelector('#cover-input-div')
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
  const editModeElements = [coverInputDiv, nameInputDiv, titleInputDiv, socialInputDiv, avatarInputDiv, projectBlocker, descriptionInputDiv, contactInputDiv, skillInputDiv]

  const viewModeElements = [nameDisplay, titleDisplay, socialDisplay, addProjectBtn, descriptionDisplay, contactDisplay, skillDisplay]

  // hide all edit mode elements onload
  editModeElements.forEach((e) => {
    if (e && e.style) e.style.display = 'none'
  })

  // Enter edit mode
  editPortfolioBtn.addEventListener('click', () => {
    // show
    savePortfolioBtn.style.display = 'flex'
    cancelPortfolioBtn.style.display = 'flex'
    editModeElements.forEach((e) => {
      if (e && e.style) e.style.display = 'block'
    })
    // hide
    editPortfolioBtn.style.display = 'none'
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
  cancelPortfolioBtn.addEventListener('click', () => {
    // reset form
    infoForm.reset()
    infoForm.classList.remove('was-validated')
    // show
    editPortfolioBtn.style.display = 'flex'
    viewModeElements.forEach((e) => {
      if (e && e.style) e.style.display = 'block'
    })
    // hide
    savePortfolioBtn.style.display = 'none'
    cancelPortfolioBtn.style.display = 'none'
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
  savePortfolioBtn.addEventListener('click', () => {
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
  const coverInputDiv = document.querySelector('#cover-input-div')
  const coverInput = document.querySelector('#cover-input')
  const coverImg = document.querySelector('#cover-img')
  const originalCover = coverImg.src
  const cancelPortfolioBtn = document.querySelector('#cancel-portfolio-btn')
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
  cancelPortfolioBtn.addEventListener('click', () => {
    coverImg.src = originalCover
  })
}

function previewPortfolioAvatar() {
  const avatarInputDiv = document.querySelector('#avatar-input-div')
  const avatarInput = document.querySelector('#avatar-input')
  const avatarImg = document.querySelector('#avatar-img')
  const originalAvatar = avatarImg.src
  const cancelPortfolioBtn = document.querySelector('#cancel-portfolio-btn')

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
  cancelPortfolioBtn.addEventListener('click', () => {
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
