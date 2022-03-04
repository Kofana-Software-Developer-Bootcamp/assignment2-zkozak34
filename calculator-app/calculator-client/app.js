// Variables
let currentNumber = "0";
let historyNumber = "0";
let memoryNumber = "0";
let historyOperator = "";
const base_url = "http://localhost:3000/";

// 1) APP-Clock
const hour = document.querySelector(".app-hour");
const minute = document.querySelector(".app-minute");
const second = document.querySelector(".app-second");
const setTime = () => {
  hour.textContent = new Date().getHours() < 10 ? "0" + new Date().getHours() : new Date().getHours();
  minute.textContent = new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes();
  second.textContent = new Date().getSeconds() < 10 ? "0" + new Date().getSeconds() : new Date().getSeconds();
};
setTime();
setInterval(setTime, 1000);

// 2) APP-Buttons
let historyDisplay = document.querySelector(".app-history");
let currentDisplay = document.querySelector(".app-current");
const btnFunctions = document.querySelectorAll(".btn-function");
const btnOperations = document.querySelectorAll(".btn-operation");
const btnNumbers = document.querySelectorAll(".btn-number");
// 2.1) Display check max length
//// return true : not yet max length - return false : max length
const checkDisplayLength = (display) => {
  switch (display) {
    case "current":
      if (currentDisplay.textContent.length < 17) return true;
      return false;
    case "history":
      if (historyDisplay.textContent.length < 22) return true;
      return false;
    default:
      break;
  }
};
// 3) Button function
// Global Function
const reRender = () => {
  currentDisplay.textContent = parseFloat(currentNumber).toLocaleString();
};
// 3.1) Number buttons
for (let i = 0; i < btnNumbers.length; i++) {
  const btn = btnNumbers[i];
  btn.addEventListener("click", (e) => {
    if (checkDisplayLength("current")) {
      if (currentDisplay.textContent == "0") {
        currentNumber = btn.textContent;
        reRender();
      } else {
        currentDisplay.textContent = "0";
        currentNumber += btn.textContent;
        reRender();
      }
    }
  });
}
// 3.2) Function buttons
for (let i = 0; i < btnFunctions.length; i++) {
  const btn = btnFunctions[i];
  btn.addEventListener("click", () => {
    switch (btn.textContent) {
      case "AC":
        if (currentNumber == "" && currentDisplay.textContent == "0") {
          historyNumber = "0";
          historyDisplay.textContent = "";
          historyOperator = "";
        }
        currentNumber = "";
        currentDisplay.textContent = "0";
        break;
      case "-/+":
        currentNumber *= -1;
        reRender();
        break;
      case "%":
        currentNumber = currentNumber / 100;
        reRender();
        break;
      default:
        break;
    }
  });
}
// 3.3) Operation buttons
// 1. mevcut değeri ve operatoru, old değişkenine ata aynı zamanda current display i 0'la
// 2. ikinci değer girildikten = eşit butonu basıldığında sunucuya sayıları gönder
// 3. history display de girilen değerleri / current display de sonucu gönster
// Zortladığım bölüm: server'den sonuç geldikten sonra, o sonuç ile işleme devam edebilme özelliği
for (let i = 0; i < btnOperations.length; i++) {
  const btn = btnOperations[i];
  btn.addEventListener("click", () => {
    switch (btn.textContent.toLowerCase()) {
      case ",":
        if (!currentNumber.includes(",")) {
          currentNumber += ".";
          reRender();
        }
        break;
      case "+":
        btnOperationHandle("+");
        break;
      case "-":
        btnOperationHandle("-");
        break;
      case "/":
        btnOperationHandle("/");
        break;
      case "x":
        btnOperationHandle("x");
        break;
      case "=":
        historyDisplay.textContent += currentDisplay.textContent;
        selectOperator(historyOperator, historyNumber, currentNumber);
      default:
        break;
    }
  });
}

// API Request Methods
const add = (intA, intB) => {
  fetch(base_url + `add?intA=${intA}&intB=${intB}`)
    .then((response) => response.text())
    .then((data) => {
      currentNumber = data;
      memoryNumber = data;
      reRender();
    })
    .catch((error) => console.log(error));
};
const divide = async (intA, intB) => {
  await fetch(base_url + `divide?intA=${intA}&intB=${intB}`)
    .then((response) => response.text())
    .then((data) => {
      currentNumber = data;
      memoryNumber = data;
      reRender();
    })
    .catch((error) => console.log(error));
};
const multiply = (intA, intB) => {
  fetch(base_url + `multiply?intA=${intA}&intB=${intB}`)
    .then((response) => response.text())
    .then((data) => {
      currentNumber = data;
      memoryNumber = data;
      reRender();
    })
    .catch((error) => console.log(error));
};
const subtract = (intA, intB) => {
  fetch(base_url + `subtract?intA=${intA}&intB=${intB}`)
    .then((response) => response.text())
    .then((data) => {
      currentNumber = data;
      memoryNumber = data;
      reRender();
    })
    .catch((error) => console.log(error));
};
const selectOperator = (op, intA, intB) => {
  switch (op) {
    case "+":
      return add(intA, intB);
    case "/":
      return divide(intA, intB);
    case "x":
      return multiply(intA, intB);
    case "-":
      return subtract(intA, intB);
    default:
      break;
  }
};
const btnOperationHandle = (op) => {
  if (currentNumber == 0) {
    alert("İlk sayı 0 olamaz.");
  } else {
    if (historyNumber == "0") {
      // 1.adım
      historyNumber = currentNumber;
      historyOperator = op;
      currentDisplay.textContent = "0";
      currentNumber = 0;
      historyDisplay.textContent = historyNumber + historyOperator;
    } else if (memoryNumber != "0") {
      historyNumber = memoryNumber;
      historyOperator = op;
      currentDisplay.textContent = "0";
      currentNumber = 0;
      historyDisplay.textContent = historyNumber + historyOperator;
    } else if (historyNumber != "0") {
      historyDisplay.textContent = historyNumber + historyOperator + currentNumber;
      selectOperator(op, historyNumber, currentNumber);
    }
  }
};
