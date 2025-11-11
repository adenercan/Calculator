let screenInput = "0";
let isCalculated = false;

const themeBtn = document.querySelector("#changeTheme");
const calculator = document.querySelector(".calculator");
const page = document.querySelector(".page");
const display = document.querySelector("#screenInput");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const calculate = document.querySelector("#calculate");
const clearBtn = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const percentage = document.querySelector("#percentage");

themeBtn.addEventListener("click", changeTheme);
deleteBtn.addEventListener("click", del);
numbers.forEach(button => button.addEventListener("click", numberClick));
clearBtn.addEventListener("click", clear);
operators.forEach(button => button.addEventListener("click", operatorClick));
calculate.addEventListener("click", calculateResult);
percentage.addEventListener("click", addPercentage);

function changeTheme(){
    calculator.classList.toggle("lightTheme");
    page.classList.toggle("lightTheme");

    if(calculator.classList.contains("lightTheme") && page.classList.contains("lightTheme")){
        themeBtn.textContent = "🌙";
    }
    else{
        themeBtn.textContent = "☀️";
    }
}

function del(){
    if(screenInput.length > 1){
        screenInput = screenInput.slice(0, -1);
    }
    else{
        screenInput = "0";
    }
    
    render();
}

function render(){
    display.value = screenInput;
}

function numberClick(e){
    const number = e.target.textContent;
    const lastNumber = screenInput.trim().slice(-1);
    if( number === "." && lastNumber.includes(".")){
        return;
    }

    if(screenInput === "0" || isCalculated === true){
        screenInput = number;
        isCalculated = false;
    }else if(screenInput === "-" || screenInput === "+"){
        screenInput += number;
    }
    else{
        screenInput += number;
        render();
    }
    display.value = screenInput;
}

function clear(){
    screenInput ="0";
    isCalculated = false;
    openParanthesesCount = 0;
    render();
}

function operatorClick(e) {
    const clickedOperator = e.target.textContent;
    const op = ["+", "-", "*", "/"];

    if (clickedOperator === "=") {
        return;
    }

    if (screenInput === "0" && (clickedOperator === "/" || clickedOperator === "*")) {
        return; // Hiçbir şey yapma
    }

    const lastChar = screenInput.trim().slice(-1);

    if (op.includes(lastChar)) {

        let newScreenInput = screenInput.trim().slice(0, -1);
        screenInput = newScreenInput + ` ${clickedOperator} `;
        
    } 
    else {
        isCalculated = false; 

    if (screenInput === "0") {
        screenInput = ` ${clickedOperator} `;
    } 
    else {
        screenInput += ` ${clickedOperator} `;
    }
    }

   
    render();
}

function calculateResult(){
    if(isCalculated === true){
        return;
    }
    try {
        const result = new Function('return ' + screenInput)();
        screenInput = String(result);
        isCalculated = true;
    } catch (error) {
        screenInput = "Error";
        isCalculated = true;
    }

    render();
}

function addPercentage(){
    if(screenInput === "0" || screenInput === "Error"){
        return;
    }

    const parts = screenInput.split(' ');
//  26 - 36 = "26", "-", "36"
    let lastPart = parts.pop();

    if(lastPart === "" || ["+", "-", "/", "*"].includes(lastPart)){
        parts.push(lastPart);
        return;
    }

    let numberValue = lastPart; 
    numberValue = numberValue / 100;
    lastPart = String(numberValue);
    parts.push(lastPart);
    screenInput = parts.join(' ');
    render();
}
