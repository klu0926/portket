document.addEventListener('DOMContentLoaded', () => {
  // project form
  const addProjectBtn = document.querySelector('#add-project-btn')
  const projectFormContainer = document.querySelector('#form-project-container')
  const projectFormCloseBtn = document.querySelector('#form-project-container-close')
  const projectForm = document.querySelector('#form-project')

  // project form links
  const linksContainer = document.querySelector('.link-row-container')
  const linkRows = document.querySelectorAll('.link-row')
  const addLinkBtn = document.querySelector('.link-add-btn')
  const projectFormResetBtn = document.querySelector('#projectFormReset')

  //project cover
  const coverDisplay = document.querySelector('#form-project-cover-display')
  const coverInput = document.querySelector('#form-project-cover-input')

  //loading-indicator
  const projectLoadingDisplay = document.querySelector('#project-loading-indicator')
  const projectSubmitText = document.querySelector('#project-submit-text')

  // open from
  addProjectBtn.addEventListener('click', () => {
    projectFormContainer.style.display = 'block'
  })

  // close form
  projectFormCloseBtn.addEventListener('click', () => {
    projectFormContainer.style.display = 'none'
  })

  // Add link row
  addLinkBtn.addEventListener('click', () => {
    const newLinkRow = document.createElement('div')
    newLinkRow.className = 'link-row'
    newLinkRow.innerHTML = linkRows[0].innerHTML
    linksContainer.append(newLinkRow)

    // add remove link row button listener
    newLinkRow.querySelector('.link-remove-btn').addEventListener('click', () => {
      newLinkRow.remove()
    })
  })

  // Remove Link row
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('link-remove-btn')) {
      const linkRow = event.target.closest('.link-row')
      if (linkRow) linkRow.remove()
    }
  })

  // From validate (using bootstrap)
  projectForm.addEventListener('submit', (event) => {
    if (!projectForm.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      // show loading icon
      projectSubmitText.style.display = 'none'
      projectLoadingDisplay.style.display = 'flex'
    }
    projectForm.classList.add('was-validated')
  })

  // Reset form
  projectFormResetBtn.addEventListener('click', () => {
    projectForm.reset()
    projectForm.classList.remove('was-validated')

    previewCover() // reset preview cover
  })

  coverDisplay.addEventListener('click', (event) => {
    coverInput.click()
  })

  // cover input preview on change
  coverInput.addEventListener('change', (event) => {
    previewCover()
  })
})

// Helper functions

// preview image (function)
function previewCover() {
  const coverInput = document.querySelector('#form-project-cover-input')
  const projectFormCover = document.querySelector('#form-project-cover-display')

  if (coverInput.files && coverInput.files[0]) {
    const reader = new FileReader()
    reader.onload = (event) => {
      projectFormCover.style.backgroundImage = `url(${event.target.result})`
    }
    reader.readAsDataURL(coverInput.files[0])
  }
}
