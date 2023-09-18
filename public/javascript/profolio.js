document.addEventListener('DOMContentLoaded', () => {
  // project-block fade in
  const blocks = document.querySelectorAll('.project-block')
  const socials = document.querySelectorAll('.social-box')

  blocks.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.2}s`
  })
  socials.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.2}s`
  })
})
