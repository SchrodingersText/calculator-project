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

    // case "=":
    //     resultText.innerText = firstOperand;   
    //     break;
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
    } else if (value === "." && !decimalToggle) {
        return;
    } else displayText.innerText += value;
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
                arrFromDisplay[arrFromDisplay.length - 2],
                arrFromDisplay[arrFromDisplay.length - 1]);
    } else {
        operate(arrFromDisplay[0], arrFromDisplay[1], arrFromDisplay[2]);
    }
};

operatorButtons.forEach(button => button.addEventListener("click", clickOperatorButton));

const clearAllButton = document.querySelector("button.clear");
clearAllButton.addEventListener("click", () => {
    displayText.innerText = "";
    resultText.innerText = "";
    equalsToggle = true;
    decimalToggle = true;
});

const decimalButton = document.querySelector("button.decimal");
decimalButton.addEventListener("click", () => decimalToggle = false);

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
        console.log(pressedKey)
    } else if (pressedKey.key === "." && decimalToggle) {
        displayClickedValue(pressedKey.key);
        decimalToggle = false;
    } else if (buttonValues.slice(0, 10).includes(pressedKey.key)) {
        displayClickedValue(pressedKey.key)
    }
});