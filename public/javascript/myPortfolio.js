document.addEventListener('DOMContentLoaded', () => {
  editUserAvatar()
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
