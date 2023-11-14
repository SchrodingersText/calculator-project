const displayText = document.querySelector("p.display-text");
const resultText = document.querySelector("p.result-text");

const add = function (num1, num2) {;
    return +(num1) + +(num2);
};

const subtract = function (num1, num2) {
    return +(num1) - +(num2);
};

const multiply = function (num1, num2) {
    return +(num1) * +(num2);
};

const divide = function (num1, num2) {
    if (num1 > 0 && num2 > 0) {
        return +(num1) / +(num2);
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
    
    case "÷":
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
    if (["+", "-", "x", "÷"].includes(value)) {
        displayText.innerText += ` ${value} `;
    } else if (["+", "-", "x", "÷"].includes(lastTextCharacter)) {
        displayText.innerText += ` ${value}`;
    } else displayText.innerText += value;
};

const operatorButtons = document.querySelectorAll("button.operators");
operatorButtons.forEach(button => button.addEventListener("click", () => {
    let arrFromDisplay = displayText.innerText.split(" ");
    let operationResult = resultText.innerText;
    if (arrFromDisplay[2] === undefined) {
        return;
    } else if (arrFromDisplay.length > 4) {
        operate(operationResult, arrFromDisplay[arrFromDisplay.length - 3], arrFromDisplay[arrFromDisplay.length - 2]);
        console.log(operationResult)
    } else {
        operate(arrFromDisplay[0], arrFromDisplay[1], arrFromDisplay[2]);
    }
}))
