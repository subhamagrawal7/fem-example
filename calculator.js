let runningTotal=0;
let buffer="0";
let previousOperator = null;
const screen = document.querySelector('.row1');

document.querySelector('.calc-buttons').addEventListener("click",function(event){
  buttonClick(event.target.innerText);
});

function buttonClick(value) {
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    display();
}

function handleNumber(value) {
    if(buffer === "0"){
        buffer = value;
    } 
    else{
        buffer = buffer + value;
    }
}

function handleSymbol(value) {
    switch(value)
    {
        case 'C':
        buffer = "0";
        runningTotal = 0;
        previousOperator = null;
        break;
        case '=':
        if(previousOperator === null){
            // need two numbers to do math
            return;
        }
        doOperation(parseInt(buffer));
        previousOperator = null;
        buffer = "" + runningTotal;
        runningTotal = 0;
        break;
        case '←':
        if(buffer.length === 1){
            buffer = "0";
        }
        else{
            buffer = buffer.substring(0,buffer.length - 1);
        }
        break;
        default:
        handleMath(value);
        break;
    }
}

function handleMath(value) {
    const input1 = parseInt(buffer);
    if(runningTotal === 0){ //Storing value before any operation
        runningTotal = input1;
    }
    else{
        doOperation(input1);
    }
    previousOperator = value;
    buffer = "0";
}

function doOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal+=intBuffer;
    }
    else if(previousOperator === '×'){
        runningTotal*=intBuffer;
    }
    else if(previousOperator === '-'){
        runningTotal-=intBuffer;
    }
    else {
        runningTotal/=intBuffer;
    }
}

function display() {
    screen.innerText = buffer;
}