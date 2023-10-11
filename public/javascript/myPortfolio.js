document.addEventListener('DOMContentLoaded', () => {
  editUserAvatar()
  editName()
  editTitle()
  addSocial()
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

function editName() {
  const nameDisplay = document.querySelector('#name-display')
  const nameInputDiv = document.querySelector('#name-input-div')
  const nameInputCancel = document.querySelector('#name-cancel')
  const nameForm = document.querySelector('#name-form')

  nameDisplay.addEventListener('click', () => {
    nameInputDiv.style.display = 'block'
    nameDisplay.style.display = 'none'
  })

  nameInputCancel.addEventListener('click', () => {
    nameInputDiv.style.display = 'none'
    nameDisplay.style.display = 'inline-block'
  })

  nameForm.addEventListener('submit', (event) => {
    if (!nameForm.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
    nameForm.classList.add('was-validated')
  })
}

function editTitle() {
  const titleDisplay = document.querySelector('#title-display')
  const titleInputDiv = document.querySelector('#title-input-div')
  const titleInputCancel = document.querySelector('#title-cancel')
  const titleForm = document.querySelector('#title-form')

  titleDisplay.addEventListener('click', () => {
    titleInputDiv.style.display = 'block'
    titleDisplay.style.display = 'none'
  })

  titleInputCancel.addEventListener('click', () => {
    titleInputDiv.style.display = 'none'
    titleDisplay.style.display = 'inline-block'
  })

  titleForm.addEventListener('submit', (event) => {
    if (!titleForm.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
    titleForm.classList.add('was-validated')
  })
}

function addSocial() {
  const socialAddForm = document.querySelector('#social-add-form')
  socialAddForm.addEventListener('submit', (event) => {
    if (!socialAddForm.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
    socialAddForm.classList.add('was-validated')
  })
}
