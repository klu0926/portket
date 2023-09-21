const portfolioLoaded = () => {
  // project-block fade in
  const projects = document.querySelectorAll('.project-block')
  const socials = document.querySelectorAll('.social-box')
  if (!projects || !socials) return
  projects.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.2}s`
  })
  socials.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.2}s`
  })
}
portfolioLoaded()
