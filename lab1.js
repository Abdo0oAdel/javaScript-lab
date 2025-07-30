// 1- Create a function that accepts a variable and returns its type
function getType(variable) {
    return typeof variable;
}

// 2- Create functions for addition, subtraction, multiplication, and division
function add(number1, number2) {
    return number1 + number2; 
}

function subtract(number1, number2) {
    return number1 - number2; 
}

function multiply(number1, number2) {
    return number1 * number2; 
}

function divide(number1, number2) {
    return number1 / number2; 
}

// 3- Create a function that checks if a value is NaN.
function isNaNValue(value) {
    return isNaN(value);
}

// 4- Create a function that returns true if a number is even and false if odd
function isEven(number) {
    return number % 2 === 0;
}

// 5- Create a function to concatenate two strings with a space in between
function concatenateStrings(str1, str2) {
    return str1 + ' ' + str2;
}

// 6- Create a function that takes a string and returns its uppercase version
function toUpperCase(str) {
    return str.toUpperCase();
}

// 7- Create a function that takes a string and an index then returns the character at a given index in the string
function getCharacterAtIndex(str, index) {
    return str.charAt(index);
}

// 8- Create a functions greet() that takes a name of a person and then returns “Hello , name”
function greet(name) {
    return `Hello , ${name}`;
}

// 9- Create a function that checks if a value is null or undefined
function isNullOrUndefined(value) {
    if (value === null) {
        return "value is null";
    } else if (value === undefined) {
        return "value is undefined";
    } else {
        return "value is neither null nor undefined";
    }
}
    
// 10- Create a function that generates a random number between two values.
function getRandomNumber(firstNum, secondNum) {
    return Math.floor(Math.random() * (secondNum - firstNum)) + firstNum;
}

// 11- Create a function that takes a number , checks its value and return “Positive” or “Negative” or “Zero”
function checkNumberValue(num) {
    if (num > 0) {
        return "Positive";
    } else if (num < 0) {
        return "Negative";
    } else {
        return "Zero";
    }
}
let expression = "2 + a"; // Example expression
// 12- Create a function that safely evaluates a mathematical expression and handles errors gracefully.
function safeEvaluate(expression) {  
   return eval(expression);
}