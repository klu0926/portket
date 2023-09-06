document.addEventListener('DOMContentLoaded', () => {
  // project-block fade in
  const elements = document.querySelectorAll('.project-block')

  elements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.2}s`
  })
})
