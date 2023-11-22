class AlertMessage {
  constructor() {
    this.alertMessage = document.querySelector('#alert-message')
    this.alertCloseBtn = document.querySelector('#alert-message-close-btn')
    this.init()
  }
  init(){
    this.alertCloseBtn.addEventListener('click', () => {
      this.hideAlertMessage()
    })
  }
  showAlertMessage(message) {
    if (!message) message = 'Something went wrong.'
    this.alertMessage.querySelector('.alert-message-text').innerText = message
    this.resetClass(this.alertMessage, 'marginShake')
    this.alertMessage.style.display = 'block'
  }
  hideAlertMessage() {
    this.alertMessage.style.display = 'none'
  }
  // helper
  resetClass(element, elementClass) {
    element.classList.remove(elementClass)
    setTimeout(() => {
      element.classList.add(elementClass)
    }, 40)
  }
}
export default AlertMessage
