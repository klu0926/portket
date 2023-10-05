document.addEventListener('DOMContentLoaded', () => {
  const loaderBar = document.querySelector('.loader-bar')
  let loaderPercent = 0
  let loaderInterval = null
  const loaderAmount = 0.3
  const loaderTime = 10

  // Reset loader on DOM loaded
  loaderReset()

  // start unload, and before unloading is completed
  window.addEventListener('beforeunload', () => {
    loaderStart()
  })

  // unload completed
  window.addEventListener('unload', () => {
    loaderComplete()
  })

  function loaderStart() {
    if (loaderInterval === null) {
      loaderInterval = setInterval(() => {
        if (loaderPercent >= 87) {
          clearInterval(loaderInterval)
          loaderInterval = null
        }
        loaderBar.style.width = (loaderPercent += loaderAmount).toString() + '%'
      }, loaderTime)
    }
  }

  function loaderReset() {
    loaderPercent = 0
    loaderBar.style.width = '0%'
    if (loaderInterval) {
      clearInterval(loaderInterval)
      loaderInterval = null
    }
  }

  function loaderComplete() {
    loaderPercent = 100
    loaderBar.style.width = loaderPercent + '%'
    if (loaderInterval) {
      clearInterval(loaderInterval)
      loaderInterval = null
    }
  }
})
