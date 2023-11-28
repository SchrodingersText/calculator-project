const displayText = document.querySelector("p.display-text");
const resultText = document.querySelector("p.result-text");

let equalsToggle = true;
let decimalToggle = true;

const add = function (num1, num2) {
    return Math.round(((+num1 + +num2) + Number.EPSILON) * 1000) / 1000;
};

const subtract = function (num1, num2) {
    return Math.round(((num1 - num2) + Number.EPSILON) * 1000) / 1000;
};

const multiply = function (num1, num2) {
    return Math.round(((num1 * num2) + Number.EPSILON) * 1000) /1000;
};

const divide = function (num1, num2) {
    if (num1 > 0 && num2 > 0) {
        return Math.round(((num1 / num2) + Number.EPSILON) * 1000) /1000;
    } else return "lmao";
};

const operate = function (firstOperand, operator, secondOperand) {
   switch (operator) {
    case "+":
        resultText.innerText = add(firstOperand, secondOperand);
        break;

    case "-":
        resultText.innerText = subtract(firstOperand, secondOperand);
        break;

    case "x":
        resultText.innerText = multiply(firstOperand, secondOperand);
        break;
    
    case "/":
        resultText.innerText = divide(firstOperand, secondOperand);
        break;
   }
};

const displayableButtons = document.querySelectorAll("button.displayable");
displayableButtons.forEach(button => button.addEventListener("click", () => {
    displayClickedValue(button.innerText);
}));
const displayClickedValue = function (value) {
    let lastTextCharacter = displayText.innerText.slice(-1); 
    if (["+", "-", "x", "/"].includes(value)) {
        displayText.innerText += ` ${value} `;
    } else if (["+", "-", "x", "/"].includes(lastTextCharacter)) {
        displayText.innerText += ` ${value}`;
        equalsToggle = true; 
        isNegative = false; 
    } else if (value === "." && !decimalToggle) {
        return;
    } else {
        displayText.innerText += value;
        equalsToggle = true;
    }
};

const equalsButton = document.querySelector("button.equals");
const clickEqualsButton = function () {
    let arrFromDisplay = displayText.innerText.split(" ");
    if (equalsToggle) {
        if (arrFromDisplay.length <4) {
            operate(arrFromDisplay[0], arrFromDisplay[1], arrFromDisplay[2]);
        } else {
            operate(resultText.innerText, 
                arrFromDisplay[arrFromDisplay.length - 2], 
                arrFromDisplay[arrFromDisplay.length - 1]);
            equalsToggle = false;
        }
    }
};
equalsButton.addEventListener("click", clickEqualsButton);

const operatorButtons = document.querySelectorAll("button.operators");
const clickOperatorButton = function () {
    let arrFromDisplay = displayText.innerText.split(" ");
    let operationResult = resultText.innerText;
    decimalToggle = true;
    
    if (arrFromDisplay[2] === undefined) {
        return;
    } else if (arrFromDisplay.length > 4) {
        operate(operationResult, 
                arrFromDisplay[arrFromDisplay.length - 3], 
                arrFromDisplay[arrFromDisplay.length - 2]);
    } else {
        operate(arrFromDisplay[0], arrFromDisplay[1], arrFromDisplay[2]);
    }
};
operatorButtons.forEach(button => button.addEventListener("click", clickOperatorButton));

const clearAllButton = document.querySelector("button.clear");
const clickClearAll = function () {
    displayText.innerText = "";
    resultText.innerText = "";
    equalsToggle = true;
    decimalToggle = true;
    isNegative = false;
}
clearAllButton.addEventListener("click", clickClearAll);

const backspaceButton = document.querySelector("button.backspace");
const clickBackspace = function () {
    displayText.innerText = displayText.innerText.slice(0, -1);
};
backspaceButton.addEventListener("click", clickBackspace)

const decimalButton = document.querySelector("button.decimal");
decimalButton.addEventListener("click", () => decimalToggle = false);

const signButton = document.querySelector("button.pos-neg");
let isNegative = false;

const clickSignButton = function () {
    let arrFromDisplay = displayText.innerText.split(" ");
    if (["+", "-", "x", "/"].includes(arrFromDisplay[arrFromDisplay.length - 1])) {
        return;
    } else if (!isNegative) {
        isNegative = true;
        arrFromDisplay[arrFromDisplay.length - 1] = `-${arrFromDisplay[arrFromDisplay.length - 1]}`;
        displayText.innerText = arrFromDisplay.join(" ");
    } else {
        isNegative = false;
        arrFromDisplay[arrFromDisplay.length - 1] = arrFromDisplay[arrFromDisplay.length - 1].slice(1);
        displayText.innerText = arrFromDisplay.join(" ");
    }
}
signButton.addEventListener("click", () => {
    if (displayText.innerText.length > 0) clickSignButton()
});

document.addEventListener("keydown", (pressedKey) => {
    const buttonValues = [
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        ".", "+", "-", "x", "/", "="
    ];
    if (buttonValues.slice(-5, -1).includes(pressedKey.key)) {
        clickOperatorButton()
        displayClickedValue(pressedKey.key);
        decimalToggle = true;
    } else if (pressedKey.key === "=" || pressedKey.key === "Enter") {
        clickEqualsButton()
    } else if (pressedKey.key === "." && decimalToggle) {
        displayClickedValue(pressedKey.key);
        decimalToggle = false;
    } else if (buttonValues.slice(0, 10).includes(pressedKey.key)) {
        displayClickedValue(pressedKey.key);
        equalsToggle = true; 
    } else if (pressedKey.key === "Backspace") {
        clickBackspace();
    } else if (pressedKey.key === "q") {
        clickClearAll()
    } else if (pressedKey.key === "s" && displayText.innerText.length > 0) {
        clickSignButton()
    }
});