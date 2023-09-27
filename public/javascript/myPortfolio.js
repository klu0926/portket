document.addEventListener('DOMContentLoaded', () => {
  // project form
  const addProjectBtn = document.querySelector('#add-project-btn')
  const projectForm = document.querySelector('#form-project')
  const projectFormCloseBtn = document.querySelector('#form-project-close')

  // project form links
  const linksContainer = document.querySelector('.link-row-container')
  const linkRows = document.querySelectorAll('.link-row')
  const addLinkBtn = document.querySelector('.link-add-btn')
  const removeLinkBtnArray = document.querySelectorAll('.link-remove-btn')

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
  // open add project form
  addProjectBtn.addEventListener('click', () => {
    projectForm.style.display = 'block'
  })

  // close add project form
  projectFormCloseBtn.addEventListener('click', () => {
    projectForm.style.display = 'none'
  })

  // Add links
  addLinkBtn.addEventListener('click', () => {

    const newLinkRow = document.createElement('div')
    newLinkRow.className = 'link-row'
    newLinkRow.innerHTML = linkRows[0].innerHTML
    linksContainer.append(newLinkRow)

    console.log(document.querySelectorAll('.link-row').length)
  })
})
