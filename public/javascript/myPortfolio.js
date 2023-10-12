document.addEventListener('DOMContentLoaded', () => {
  editUserAvatar()
  editMode()
})

function editUserAvatar() {
  const avatarContainer = document.querySelector('#avatar-container')
  const avatarForm = document.querySelector('#avatar-form')
  const avatarInput = document.querySelector('#avatar-input')
  avatarContainer.addEventListener('click', (event) => {
    avatarInput.click()
  })

  avatarInput.addEventListener('change', () => {
    avatarForm.submit()
  })
}

function editMode() {
  const editPortfolioBtn = document.querySelector('#edit-portfolio-btn')
  const savePortfolioBtn = document.querySelector('#save-portfolio-btn')
  const cancelPortfolioBtn = document.querySelector('#cancel-portfolio-btn')
  const editModeDisplay = document.querySelector('#edit-mode-display')

  editPortfolioBtn.addEventListener('click', () => {
    // show
    savePortfolioBtn.style.display = 'flex'
    cancelPortfolioBtn.style.display = 'flex'
    // hide
    editPortfolioBtn.style.display = 'none'
    // play edit mode animation
    editModeDisplay.style.display = 'flex'
    editModeDisplay.style.animationPlayState = 'running'
  })

  cancelPortfolioBtn.addEventListener('click', () => {
    // show
    editPortfolioBtn.style.display = 'flex'
    // hide
    savePortfolioBtn.style.display = 'none'
    cancelPortfolioBtn.style.display = 'none'
    // reset edit mode animation
    editModeDisplay.style.display = 'none'
    editModeDisplay.style.animationPlayState = 'paused'
  })
}
