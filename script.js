const add = function (num1, num2) {
    return num1 + num2;
};

const subtract = function (num1, num2) {
    return num1 - num2;
};

const multiply = function (num1, num2) {
    return num1 * num2;
};

const divide = function (num1, num2) {
    if (num1 === 0 && num2 === 0) return "Error";
    return num1 / num2;
};

let firstOperand;   // use an event listener to assign a user-entered value (clicked buttons) to these variables?

let operator;

let secondOperand;

const operate = function (firstOperand, operator, secondOperand) {
   switch (operator) {
    case "+":
        return add(firstOperand, secondOperand);
        break;

    case "-":
        return subtract(firstOperand, secondOperand);
        break;

    case "*":
        return multiply(firstOperand, secondOperand);
        break;
    
    case "/":
        return divide(firstOperand, secondOperand);
        break;
   }
};
