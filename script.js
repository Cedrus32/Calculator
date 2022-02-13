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


// ------------------------ //
// CALCULATOR FUNCTIONALITY //
// ------------------------ //

//get display elements
let a = '';
let mathValues = [];
let displayValues = [];
const displayFormula = document.querySelector('.formula');
const displayProduct = document.querySelector('.product');

function clearCalc() {
    a = '';
    displayFormula.textContent = ' ';
    displayProduct.textContent = ' ';
    mathValues = [];
    displayValues = [];
    sum = '';
}

//delete number...
function deleteNum() {
    a = a.slice(0, -1);
    displayFormula.textContent = displayValues.join(' ') + ' ' + a;
}

//toggle positive/negative value
function toggleNeg() {
    if (a === '') {
        a = '-'
    } else if (a === '-') {
        a = '';
    } else if (a !== '' && a !== '-') {
        a *= -1;
    }
    displayFormula.textContent = displayValues.join(' ') + ' ' + a;
}

//log numbers...
function logNums(button) {
    //if entering a number after getting sum
    if (mathValues[1] === '=') {
        clearCalc();
    }
    //concat a, update displayFormula
    a += button.id;
    displayFormula.textContent += button.id;
}

//** if `=` button is selected
//...scrub 'equals' check...
function scrubEqCheck() {
    //remove '=' from math array
    mathValues.pop();
    //update display array to math array (sum)
    displayValues.splice(1);
    displayValues[0] = sum;
}

//log functions...
function logFuncts(button) {
    //if `=` button was previously selected,
    //scrub math array, show sum on formula display
    if (mathValues[1] === '=') {
        scrubEqCheck();
        displayFormula.textContent = sum;
        displayProduct.textContent = '';
    }
    //if a != null, add a to arrays
    if (a != '') {
        pushA2Arrays()
    }

    //add function to arrays
    mathValues.push(button.id);
    displayValues.push(button.id);
    //update display
    displayFormula.textContent = displayValues.join(' ');
    displayFormula.textContent += ' ';
    a = '';

    //** if 2 functions selected sequentially
    //replace original function with second function (both arrays)
    if (mathValues.length === 3) {
        replaceOperators();
    }

    //** when operating multiple numbers w/out hitting `=`
    //replace math array [0]/[1] with sum...
    if (mathValues.length > 3) {
        updateMathArray();
    }
}

function pushA2Arrays() {
    a = Number(a);
    mathValues.push(a);
    displayValues.push(a);
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
function updateMathArray() {
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

// ---------------- //
// BUTTON LISTENERS //
// ---------------- //

//clear display & displayValues
const buttonClear = document.querySelector('#clear');
buttonClear.addEventListener('click', () => {
    clearCalc();
});

//delete
const buttonDel = document.querySelector('#del');
buttonDel.addEventListener('click', () => {
    deleteNum();
});

//toggle positive/negative
const buttonPosNeg = document.querySelector('#pos-neg');
buttonPosNeg.addEventListener('click', () => {
    toggleNeg();
});

//get & store number IDs --> send to display...
const buttonNums = document.querySelectorAll('.num');
buttonNums.forEach(button => button.addEventListener('click', () => {
    if (displayProduct.textContent === 'error') {
        displayProduct.textContent = '';
    }
    logNums(button);
}));

//get & store function IDs --> send to display...
const buttonFuncts = document.querySelectorAll('.function');
buttonFuncts.forEach(button => button.addEventListener('click', () => {
    if (displayProduct.textContent === 'error') {
        displayProduct.textContent = '';
    }
    logFuncts(button);
}))

//select `=`, run math operation...
const buttonEquals = document.querySelector('.eq');
buttonEquals.addEventListener('click', () => {
    if (mathValues.length === 0 || (mathValues.length === 2 && a === '')) {
        displayProduct.textContent = 'error';
    } else {
        //add second value to math array
        pushA2Arrays()
        a = '';
        //update math array...
        updateMathArray();
        //include '=' in math array
        mathValues.push('=');
    }
});