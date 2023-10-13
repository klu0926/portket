document.addEventListener('DOMContentLoaded', () => {
  previewAvatar()
  editMode()
})

function previewAvatar() {
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
  const avatarInputDiv = document.querySelector('#avatar-input-div')
  const nameInputDiv = document.querySelector('#name-input-div')
  const titleInputDiv = document.querySelector('#title-input-div')
  const socialInputDiv = document.querySelector('#social-input-div')
  // display
  const nameDisplay = document.querySelector('#name-display')
  const titleDisplay = document.querySelector('#title-display')
  const socialDisplay = document.querySelector('#social-display')
  // project btn
  const addProjectBtn = document.querySelector('#add-project-btn')
  const projectBlocker = document.querySelector('#project-blocker')

  // items list
  const editModeItems = [nameInputDiv, titleInputDiv, socialInputDiv, avatarInputDiv, projectBlocker]
  const viewModeItems = [nameDisplay, titleDisplay, socialDisplay, addProjectBtn]

  editPortfolioBtn.addEventListener('click', () => {
    // show
    savePortfolioBtn.style.display = 'flex'
    cancelPortfolioBtn.style.display = 'flex'
    editModeItems.forEach((e) => {
      e.style.display = 'block'
    })
    // hide
    editPortfolioBtn.style.display = 'none'
    viewModeItems.forEach((e) => (e.style.display = 'none'))
    viewModeItems.forEach((e) => {
      e.style.display = 'none'
    })
    // show edit mode animation
    editModeDisplay.style.display = 'flex'
    editModeDisplay.classList.add('show-animation')
    editModeDisplay.classList.remove('hide-animation')
    editModeDisplay.style.animationPlayState = 'running'
  })

  cancelPortfolioBtn.addEventListener('click', () => {
    // show
    editPortfolioBtn.style.display = 'flex'
    viewModeItems.forEach((e) => {
      e.style.display = 'block'
    })
    // hide
    savePortfolioBtn.style.display = 'none'
    cancelPortfolioBtn.style.display = 'none'
    editModeItems.forEach((e) => {
      e.style.display = 'none'
    })
    // hide edit mode animation
    editModeDisplay.classList.remove('show-animation')
    editModeDisplay.classList.add('hide-animation')
    editModeDisplay.style.animationPlayState = 'running'
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
