const deliveryDateField = document.querySelector('#delivery-date')
const today = new Date()
const tomorrow = new Date(today.setDate(today.getDate() + 1))
const deliveryDate = tomorrow.toISOString().split('T')[0]

deliveryDateField.setAttribute('min', deliveryDate)
deliveryDateField.setAttribute('value', deliveryDate)