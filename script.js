"use strict";

var input = document.getElementById("input"),
    number = document.querySelectorAll(".numbers div"),
    operator = document.querySelectorAll(".operators div"),
    result = document.getElementById("result"),
    clear = document.getElementById("clear"),
    resultDisplayed = false;

// adding click handlers
for (var i=0; i<number.length; i++) {
    number[i].addEventListener("click", function(e) {
        // storing current input string and its last char in vars
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];
        // if result isnt displayed, keep adding
        if (resultDisplayed === false) {
            input.innerHTML += e.target.innerHTML;
        } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" ||
        lastChar === "×" || lastChar === "÷") {
            // if result is displayed and user pressed an operator
            // we keep on adding to the string for the next operation
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;
        } else {
            // if result is displayed and user pressed a number
            // we clear the input string and add the new input to start the new operation
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;
        }
    });
}

// adding click handlers to number buttons
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function(e) {
        // storing current input string and its last char in vars
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];
        // if last char is an operator, replace it with  the currently pressed one
        if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
        } else if (currentString.length == 0) {
            // if first key pressed is an operator, do nothing
            console.log("enter a number first");
        } else {
            // else just add the operator to the input
            input.innerHTML += e.target.innerHTML;
        }
    });
}

// on click of equal button
result.addEventListener("click", function() {
    // this is the string that will be processing
    var inputString = input.innerHTML;
    // create an array of numbers
    var numbers = inputString.split(/\D/g);
    // create an array of operator
    // 1st replace all numbers and dots with emprty string and split
    var operators = inputString.split(/\d/g).filter(Boolean)
    console.log(inputString);
    console.log(operators);
    console.log(numbers);
    console.log("----------");
    // 2nd loop through array and do one operation at a time
    // divide, multiply, subtract, addition
    // as we move we alterning the original numbers and operators array
    // the last element remaining is the result
    var divide = operators.indexOf("÷");
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }
    var multiply = operators.indexOf("×");
    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
    }
    var subtract = operators.indexOf("-");
    while (subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }
    var add = operators.indexOf("+");
    while (add != -1) {
        // using parseFloat is necessary
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }
    input.innerHTML = numbers[0]; // displaying the result
    resultDisplayed = true; // turning flag if result is displayed
});

// clearing the input on press of clear
clear.addEventListener("click", function() {
    input.innerHTML = "";
})