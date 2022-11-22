import { createElement, insertAfter } from "./util.js"
const deliveryDateField = document.querySelector('#delivery-date')
const today = new Date()
const tomorrow = new Date(today.setDate(today.getDate() + 1))
const deliveryDay = tomorrow.toISOString().split('T')[0]

deliveryDateField.setAttribute('min', deliveryDay)
deliveryDateField.setAttribute('value', deliveryDay)
const order = sessionStorage.getItem('CLIENT_ORDER')

if (order) {
  const clientOrder = JSON.parse(order)
}

const submitBtn = document.querySelector('#submit')
submitBtn.setAttribute('disabled', '')

//validation
const form = document.querySelector("form")
const clientName = document.querySelector("#client-name")
const clientSurname = document.querySelector("#client-surname")
const deliveryStreet = document.querySelector("#delivery-street")
const deliveryHouse = document.querySelector("#delivery-house")
const deliveryFlat = document.querySelector("#delivery-flat-number")

let validationResult = true
function validateField(field, pattern) {
  field.addEventListener('blur', ({ target }) => {
    const result = pattern.test(target.value)
    updateValidationResult(result)
    if (!result) {
      target.classList.add("invalid")
    } else {
      target.classList.remove("invalid")
    }
    return result
  })
}

function updateValidationResult(value) {
  validationResult = validationResult && value
  if (validationResult) {
    submitBtn.removeAttribute('disabled')
  }
}
const v1 = validateField(clientName, /\w{4,}/)
const v2 = validateField(clientSurname, /\w{5,}/)
const v3 = validateField(deliveryStreet, /^[^\W\d_]{5,}\.?(?:[- '’][^\W\d_]{5,}\.?)*$/)
const v4 = validateField(deliveryHouse, /[1-9]+[\d]*/)
const v5 = validateField(deliveryFlat, /\d+[\-]{0,1}\d*/)