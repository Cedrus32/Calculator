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

//...math switch...
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
let mathValues = [];
let displayValues = [];
const displayFormula = document.querySelector('.formula');
const displayProduct = document.querySelector('.product');

//** if `=` button is selected
//...scrub 'equals' check...
function scrubEqCheck() {
    console.log('scrub = ...')
    //remove '=' from math array
    mathValues.pop();
    //update display array to math array (sum)
    displayValues.splice(1);
    displayValues[0] = sum;
    //update formula display (sum) & answer display ('')
    displayFormula.textContent = displayValues;
    displayProduct.textContent = '';
}

//** if 2 functions selected sequentially
//...replace operators...
function replaceOperators() {
    //replace/remove functions (operatorValues)
    mathValues[1] = mathValues[2];
    mathValues.pop();
    //replace/remove functions (displayValues)
    displayValues[1] = displayValues[2];
    displayValues.pop();
    //update display
    displayFormula.textContent = displayValues.join(' ');
}

//** cacluate sum & update math array
//...update display/math values...
function updateValues() {
    //evaluate function
    operate(mathValues[1], mathValues[0], mathValues[2]);
    //display sum
    displayProduct.textContent = sum;
    //remove a & operator
    mathValues.shift();
    mathValues.shift();
    //reset a = sum
    mathValues[0] = sum;
}

//run math operation...
const buttonEquals = document.querySelector('.eq');
buttonEquals.addEventListener('click', () => {
    console.log('click = ...')
    //add second value to math array
    a = Number(a);
    mathValues.push(a);
    displayValues.push(a);
    a = '';
    //update math array...
    updateValues();
    //include '=' in math array
    mathValues.push('=');
});

//clear display & displayValues
const buttonClear = document.querySelector('#clear');
buttonClear.addEventListener('click', () => {
    a = '';
    b = '';
    displayFormula.textContent = ' ';
    displayProduct.textContent = ' ';
    mathValues = [];
    displayValues = [];
    sum = '';
});

//run calculator...
let a = '';
// let b = '';
let operator = '';
function runCalc(button) {

    //**happens if `=` button was previously selected
    //update math array, move to formula display
    if (mathValues[1] === '=') {
        scrubEqCheck();
    }

    //get button.classList
    let buttonClasses = button.classList;

    //get values for display & operations
    if (buttonClasses[1] === 'num') {
        a += button.id;
        displayFormula.textContent += button.id;
    } else if (buttonClasses[1] === 'function') {
        console.log('enter function');
        //add a to arrays
        if (a != '') {
            a = Number(a);
            mathValues.push(a);
            displayValues.push(a);
        }
        //add function to arrays -- WORKING -- mathValues is correct
        mathValues.push(button.id);
        displayValues.push(button.id);
        //update display
        displayFormula.textContent = displayValues.join(' ');
        displayFormula.textContent += ' ';
        a = '';
    }

    //** happens if 2 functions selected sequentially
    //replace original function with second function (both arrays)
    if (mathValues.length === 3) {
        replaceOperators();
    }

    //** happens when operating multiple numbers w/out hitting `=`
    //replace math array [0]/[1] with sum...
    if (mathValues.length > 3) {
        updateValues();
    }
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

