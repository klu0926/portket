const deleteForm = document.querySelector('#delete-form')
const submit = deleteForm.querySelector('button')

submit.addEventListener('click', (e) => handleFormSubmit(e, deleteForm))

function handleFormSubmit(event, form) {
  form.classList.add('was-validated')
  event.preventDefault()
  event.stopPropagation()
  if (form.checkValidity()) {
    form.submit()
  }
}
