document.addEventListener('DOMContentLoaded', () => {
  // project-block fade in
  const blocks = document.querySelectorAll('.project-block')
  const socials = document.querySelectorAll('.social-icon')

  blocks.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.2}s`
  })
  console.log(socials)
  socials.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.2}s`
  })
})
