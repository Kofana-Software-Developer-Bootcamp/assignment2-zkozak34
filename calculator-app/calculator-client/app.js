// 1) APP-Clock
function appClock() {
  const hour = document.querySelector('.app-hour')
  const minute = document.querySelector('.app-minute')
  const second = document.querySelector('.app-second')
  const setTime = () => {
    hour.textContent =
      new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()
    minute.textContent =
      new Date().getMinutes() < 10
        ? '0' + new Date().getMinutes()
        : new Date().getMinutes()
    second.textContent =
      new Date().getSeconds() < 10
        ? '0' + new Date().getSeconds()
        : new Date().getSeconds()
  }
  setTime()
  setInterval(setTime, 1000)
}
appClock()

// 2) Variables
const base_url = 'http://localhost:3000/'
let currentNumber = '0'
let memoryNumber = '0'
let responseNumber = '0'
let operator = ''
let currentDisplay = document.querySelector('.app-current')
let memoryDisplay = document.querySelector('.app-history')
const btnFunctions = document.querySelectorAll('.btn-function')
const btnOperations = document.querySelectorAll('.btn-operation')
const btnNumbers = document.querySelectorAll('.btn-number')
// 2.1) Global Function - Check max length in display
const checkDisplayLength = (display) => {
  switch (display) {
    case 'current':
      if (currentDisplay.textContent.length < 17) return true
      return false
    case 'history':
      if (memoryDisplay.textContent.length < 22) return true
      return false
    default:
      break
  }
}
// 2.2) Global function - Re render display
const reRender = () => {
  currentDisplay.textContent = parseFloat(currentNumber).toLocaleString()
}
// 3) Button Function
// 3.1) Number buttons
for (let i = 0; i < btnNumbers.length; i++) {
  const btn = btnNumbers[i]
  btn.addEventListener('click', () => {
    if (checkDisplayLength('current')) {
      if (currentNumber == '0') {
        currentNumber = btn.textContent.trim()
        reRender()
      } else {
        currentNumber += btn.textContent.trim()
        reRender()
      }
    }
  })
}
// 3.2) Function buttons
for (let i = 0; i < btnFunctions.length; i++) {
  const btn = btnFunctions[i]
  btn.addEventListener('click', () => {
    switch (btn.textContent) {
      case 'AC':
        if (currentNumber != '0') {
          currentNumber = '0'
          reRender()
        } else {
          memoryNumber = '0'
          memoryDisplay.textContent = ''
          operator = ''
          responseNumber = '0'
        }
        break
      case '-/+':
        currentNumber *= -1
        reRender()
        break
      case '%':
        currentNumber = currentNumber / 100
        reRender()
      default:
        break
    }
  })
}
// 3.3) Operation buttons
for (let i = 0; i < btnOperations.length; i++) {
  const btn = btnOperations[i]
  btn.addEventListener('click', () => {
    switch (btn.textContent.trim()) {
      case ',':
        if (!currentNumber.includes(',') && currentNumber != '0') {
          currentNumber += '.'
          reRender()
        }
        break
      case '+':
        checkOperator(btn.textContent)
        break
      case '-':
        checkOperator(btn.textContent)
        break
      case '/':
        checkOperator(btn.textContent)
        break
      case 'x':
        checkOperator(btn.textContent)
        break
      case '=':
        checkOperator(operator)
      default:
        break
    }
  })
}
const checkOperator = async (op) => {
  if (currentNumber == '0') {
    alert('İlk sayı 0 olamaz.')
  } else {
    if (currentNumber != '0' && memoryNumber == '0') {
      memoryNumber = currentNumber
      operator = op
      memoryDisplay.textContent = memoryNumber + operator
      currentNumber = '0'
      reRender()
    }
    if (currentNumber != '0' && memoryNumber != '0') {
      operator = op
      await selectOperation(operator, Math.round(memoryNumber), Math.round(currentNumber))
      memoryDisplay.textContent = memoryNumber + operator + currentNumber
      currentNumber = responseNumber
      reRender()
    }
  }
}
const selectOperation = async (op, intA, intB) => {
  switch (op) {
    case '+':
      await add(intA, intB)
      break
    case '/':
      await divide(intA, intB)
      break
    case 'x':
      await multiply(intA, intB)
      break
    case '-':
      await subtract(intA, intB)
      break
    default:
      break
  }
}
// API Request Methods
const add = async (intA, intB) => {
  let response = await fetch(base_url + `add?intA=${intA}&intB=${intB}`)
  if (response.ok) {
    let data = await response.json()
    responseNumber = data.toString()
  } else {
    console.log('Bağlantı hatası.')
  }
}
const divide = async (intA, intB) => {
  let response = await fetch(base_url + `divide?intA=${intA}&intB=${intB}`)
  if (response.ok) {
    let data = await response.json()
    responseNumber = data.toString()
  } else {
    console.log('Bağlantı hatası.')
  }
}
const multiply = async (intA, intB) => {
  let response = await fetch(base_url + `multiply?intA=${intA}&intB=${intB}`)
  if (response.ok) {
    let data = await response.json()
    responseNumber = data.toString()
  } else {
    console.log('Bağlantı hatası.')
  }
}
const subtract = async (intA, intB) => {
  let response = await fetch(base_url + `subtract?intA=${intA}&intB=${intB}`)
  if (response.ok) {
    let data = await response.json()
    responseNumber = data.toString()
  } else {
    console.log('Bağlantı hatası.')
  }
}
