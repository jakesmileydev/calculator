"use strict";

const displayEl = document.querySelector(".display");
const messageEl = document.querySelector(".message");

const allNumEl = document.querySelectorAll(".num");
const allOperatorEl = document.querySelectorAll(".operator");

const equalsBtnEl = document.querySelector(".equals");
const backBtnEl = document.querySelector(".back");
const clearBtnEl = document.querySelector(".clear");
const decimalBtnEl = document.querySelector(".decimal");

let num1 = "";
let num2 = "";
let operator = null;
let operatorString = "";
let lastPressed = null;

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  if (b === 0) {
    return "cannot divide by zero...";
  }
  return a / b;
};

/////////////////////////////////////////////
// Event Listeners

// Number buttons
for (let i = 0; i < allNumEl.length; i++) {
  allNumEl[i].addEventListener("click", function () {
    if (operator) {
      num2 += this.textContent;
      displayEl.textContent = num2;
    } else {
      num1 += this.textContent;
      displayEl.textContent = num1;
    }
    lastPressed = "number";
  });
}
decimalBtnEl.addEventListener("click", function () {
  if (!displayEl.textContent.includes(".") && lastPressed === "number") {
    if (operator) {
      num2 += this.textContent;
      displayEl.textContent = num2;
    } else {
      num1 += this.textContent;
      displayEl.textContent = num1;
    }
    lastPressed = "number";
  }
});
// Operator buttons
for (let i = 0; i < allOperatorEl.length; i++) {
  allOperatorEl[i].addEventListener("click", function () {
    num2 = "";
    if (allOperatorEl[i].classList.contains("multiply")) {
      operator = "multiply";
      operatorString = "x";
    } else if (allOperatorEl[i].classList.contains("divide")) {
      operator = "divide";
      operatorString = "÷";
    } else if (allOperatorEl[i].classList.contains("subtract")) {
      operator = "subtract";
      operatorString = "-";
    } else if (allOperatorEl[i].classList.contains("add")) {
      operator = "add";
      operatorString = "+";
    }
    messageEl.textContent = num1 + " " + operatorString;
    lastPressed = "operator";
  });
}

backBtnEl.addEventListener("click", function () {
  if (lastPressed === "equals") {
    num1 = displayEl.textContent;
    messageEl.textContent = "";
    // num2 = "";
    // operator = null;
  } else {
    displayEl.textContent = displayEl.textContent.slice(
      0,
      displayEl.textContent.length - 1
    );
    if (operator) {
      num2 = displayEl.textContent;
    } else {
      num1 = displayEl.textContent;
    }
  }
});

equalsBtnEl.addEventListener("click", function () {
  if (num2 !== "") {
    let result;
    const a = Number(num1);
    const b = Number(num2);

    if (operator === "add") {
      result = add(a, b);
    } else if (operator === "subtract") {
      result = subtract(a, b);
    } else if (operator === "multiply") {
      result = multiply(a, b);
    } else if (operator === "divide") {
      result = divide(a, b);
    }
    result = Number(result.toFixed(8));
    displayEl.textContent = result;
    messageEl.textContent = `${a} ${operatorString} ${b} =`;
    num1 = result;
    lastPressed = "equals";
  }
});

clearBtnEl.addEventListener("click", function () {
  num1 = "";
  num2 = "";
  operator = null;
  operatorString = "";
  lastPressed = null;

  displayEl.textContent = "0";
  messageEl.textContent = "";
  lastPressed = "clear";
});
