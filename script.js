// ------ //
// THEMES //
// ------ //

//TODO for finished, light is default
//TODO for testing, dark is default...
//TODO .html --> <link ... light.css>
//TODO .html --> <link ... dark.css>
//TODO .js --> toggle dark

//...switch theme...
function switchTheme(src) {
    const themeCSS = document.querySelectorAll('.theme-CSS');
    themeCSS[1].href = src;
}

//switch to light theme...
const themeButtons = document.querySelectorAll('.theme');
themeButtons[0].addEventListener('click', () => {
    switchTheme('./light.css');
});

//switch to dark theme...
themeButtons[1].addEventListener('click', () => {
    switchTheme('./dark.css');
});


// -------------- //
// MATH FUNCTIONS //
// -------------- //

let sum;

//...add
//WORKING with whole nums (+/-) && decimals (+/-) && 2+ inputs
function add(a, b) {
    let nums = [a, b];
    sum = nums.reduce((total, number) => {
        return total += number;
    });
    nums = [sum];
    return sum;
}

//...sub
//WORKING with whole nums (+/-) && decimals (+/-) && 2+ inputs
function sub(a, b) {
    let nums = [a, b];
    sum = nums.reduce((total, number) => {
        return total -= number;
    });
    nums = [sum];
    return sum;
}

//...mult
//WORKING with whole nums (+/-) && decimals (+/-) && 2+ inputs
function mult(a, b) {
    let nums = [a, b];
    sum = nums.reduce((total, number) => {
        return total *= number;
    });
    nums = [sum];
    return sum;
}

//...div
//WORKING with whole nums (+/-) && decimals (+/-) && 2+ inputs && 'error' with 0 denominator
//NOT WORKING with 0 denominator mid-array
function div(a, b) {
    let nums = [a, b]
    sum = nums.reduce((total, number) => {
        if (number === 0) {
            return 'error';
        }
        return total /= number;
    });
    nums = [sum];
    return sum;
}

function operate(operator, a, b) {
    let x = Number(a);
    let y = Number(b)
    switch (operator) {
        case '+':
            add(x, y);
            break;
        case '-':
            sub(x, y);
            break;
        case 'x':
            mult(x, y);
            break;
        case '/':
            div(x, y);
    }
    return sum;
}


// -------------- //
// RUN CALCULATOR //
// -------------- //

//get display elements
let displayValues = [];
const displayFormula = document.querySelector('.formula');
const displayProduct = document.querySelector('.product');

//update display...
function updateValues() {
    //evaluate function
    operate(displayValues[1], displayValues[0], displayValues[2]);
    //display sum
    displayProduct.textContent = sum;
    //remove a & operator
    displayValues.shift();
    displayValues.shift();
    //reset a = sum
    displayValues[0] = sum;
    console.log(displayValues);
}

//run math operation...
const buttonEquals = document.querySelector('.eq');
buttonEquals.addEventListener('click', () => {
    //add second value to displayValues
    displayValues.push(a);
    a = '';
   updateValues();
});

//clear display & displayValues
const buttonClear = document.querySelector('#clear');
buttonClear.addEventListener('click', () => {
    a = '';
    b = '';
    displayFormula.textContent = '';
    displayProduct.textContent = '';
    displayValues = [];
    sum = '';
    console.log(displayValues);
});

//run calculator...
let a = '';
let b = '';
let operator = '';
function runCalc(button) {

    //get button.classList
    let buttonClasses = button.classList;

    //get values for display & operations
    //if num, concat
    if (buttonClasses[1] === 'num') {
        a += button.id;
        displayFormula.textContent += button.id;
        console.log(a);
    // else if function, add a & operator to displayValues
    } else if (buttonClasses[1] === 'function') {
        if (a != '') {
            displayValues.push(a);
        }
        displayValues.push(button.id);
        displayFormula.textContent += ` ${button.id} `;
        a = '';
    }



    //manage how many values operating at a time
    //if length > 3, replace [0]/[1] with sum...
    if (displayValues.length > 3) {
        console.log(displayValues);
        updateValues();
    }

    console.log(displayValues);
}

//get & store number IDs --> send to display...
const buttonNums = document.querySelectorAll('.num');
buttonNums.forEach(button => button.addEventListener('click', () => {
    runCalc(button);
}));

//get & store function IDs --> send to display...
const buttonFuncts = document.querySelectorAll('.function');
buttonFuncts.forEach(button => button.addEventListener('click', () => {
    runCalc(button);
}))


// ------- //
// TESTING //
// ------- //

