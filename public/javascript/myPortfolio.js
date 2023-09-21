document.addEventListener('DOMContentLoaded', () => {
  const addProjectBtn = document.querySelector('#add-project-btn')
  const projectForm = document.querySelector('#form-project')
  const projectFormCloseBtn = document.querySelector('#form-project-close')

  if (!addProjectBtn) {
    console.error('Can not find add project btn')
    return
  }
  if (!projectForm) {
    console.error('Can not find project form')
    return
  }
  if (!projectFormCloseBtn) {
    console.error('Can not find project form close btn')
    return
  }

  addProjectBtn.addEventListener('click', () => {
    projectForm.style.display = 'block'
  })
  projectFormCloseBtn.addEventListener('click', () => {
    projectForm.style.display = 'none'
  })
})
