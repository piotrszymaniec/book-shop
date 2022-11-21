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

let validationResult = true
const submitBtn = document.querySelector('#submit')
submitBtn.setAttribute('disabled', '')

//validation
const clientName = document.querySelector("#client-name")
validationResult = validationResult && validateField(clientName, /\w{4,}/)
const clientSurname = document.querySelector("#client-surname")
validationResult = validationResult && validateField(clientSurname, /\w{5,}/)

const deliveryStreet = document.querySelector("#delivery-street")
validationResult = validationResult && validateField(deliveryStreet, /^[^\W\d_]+\.?(?:[- '’][^\W\d_]+\.?)*$/)
const deliveryHouse = document.querySelector("#delivery-house")

const deliveryFlat = document.querySelector("#delivery-flat-number")
validationResult = validationResult && validateField(deliveryFlat, /\d+\[-]{,1}\d+/)
// const packAs = document.querySelector("")


function validateField(field, pattern) {
  field.addEventListener('blur', () => {
    // let msgEl = createElement('div', 'validation-message', 'The field is invalid')
    const result = pattern.test(field.value)
    console.log(field, ' result ', result);
    if (!result) {
      field.classList.add("invalid")
      // insertAfter(msgEl, field)
      // msgEl = document.body.insertt("afterend",);
    } else {
      field.classList.remove("invalid")
      // document.body.removeChild(msgEl)
    }
    return result
  })
}

if (validationResult) {
  submitBtn.removeAttribute('disabled')
}

// fields.array.forEach(element => {
//   element.addEventListener('blur', () => {
//     validateField(element,)
//   })
// });