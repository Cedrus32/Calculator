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

//find percent...
function findPercent(a, b) {
    sum = (a / b) * 100;
    return sum;
}

//find percent of...
function findPercentOf(a, b) {
    sum = b * (a / 100);
    return sum;
}

//mark up...
function markUp(a, b) {
    sum = a * (1 + (b / 100));
    return sum;
}

function markDown(a, b) {
    sum = a * (1 - (b / 100));
    return sum;
}

//...percent switch...
function operateCent(operator, a, b) {
    console.log('enter operateCent');
    let x = Number(a);
    let y = Number(b);
    let op = operator;
    console.log({x});
    console.log({y});
    console.log({op});
    switch(operator) {
        case '/':
            findPercent(a, b);
            break;
        case 'x':
            findPercentOf(a, b);
            break;
        case '+':
            markUp(a, b);
            break;
        case '-':
        markDown(a, b);
    }

    //round sum
    sum = roundSum(sum);
    return sum;
}

//...add
function add(a, b) {
    sum = a + b;
    return sum;
}

//...subtract
function sub(a, b) {
    sum = a - b;
    return sum;
}

//...multiply
function mult(a, b) {
    sum = a * b;
    return sum;
}

//...divide
function div(a, b) {
    if (b === 0) {
        sum = 'error';
    } else {
        sum = a / b;
    }
    return sum;
}

//square root...
function sqrt(a, b) {
    sum = a ** (1/b);
    return sum;
}

//round sum
function roundSum(sum) {
    newSum = Math.round(sum * 100) / 100;
    return newSum;
}

//...math switch...
function operateFunct(operator, a, b) {
    let x = Number(a);
    let y = Number(b);
    let op = operator
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
            break;
        case '√':
            sqrt(x, y);
            break;
    }

    if (sum === 'error') {
        return sum;
    } else {
        //round sum
        sum = roundSum(sum);
        return sum;
    }
}


// ------------------------ //
// CALCULATOR FUNCTIONALITY //
// ------------------------ //

//get display elements
let a = '';
let decOn = false;
let mathValues = [];
let displayValues = [];
const displayFormula = document.querySelector('.formula');
const displayProduct = document.querySelector('.product');

//clear calculator...
function clearCalc() {
    a = '';
    displayFormula.textContent = ' ';
    displayProduct.textContent = ' ';
    mathValues = [];
    displayValues = [];
    sum = '';
    decOn = false;
}

//delete number...
function deleteNum() {
    a = a.slice(0, -1);
    displayFormula.textContent = displayValues.join(' ') + ' ' + a;
}

//scrub `=` when selecting [+/-]...
function scrubEqNeg() {
    //remove `=` from math array
    mathValues.pop();
    //make math value negative
    mathValues[0] *= -1;
    //update display array to math array (negative value)
    displayValues.splice(1);
    displayValues[0] = mathValues[0];
}

//toggle positive/negative value...
function toggleNeg() {
    if (mathValues[1] === '=') {
        scrubEqNeg();
        displayFormula.textContent = mathValues[0];
        displayProduct.textContent = '';
    } else {
        if (a === '') {
            a = '-'
        } else if (a === '-') {
            a = '';
        } else if (a !== '' && a !== '-') {
            a *= -1;
        }
        displayFormula.textContent = displayValues.join(' ') + ' ' + a;
    }
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

//scrub 'equals' when selecting another function...
function scrubEqFunct() {
    //remove '=' from math array
    mathValues.pop();
    //update display array to math array (sum)
    displayValues.splice(1);
    displayValues[0] = sum;
}

//log functions...
function logFuncts(button) {

    if (decOn === true) {
        decOn = false;
    }

    //if `=` button was previously selected,
    //scrub math array, show sum on formula display
    if (mathValues[1] === '=') {
        scrubEqFunct();
        displayFormula.textContent = sum;
        displayProduct.textContent = '';
    }
    //if a !== null, add a to arrays
    if (a !== '') {
        pushA2Arrays()
    }

    //add function to arrays
    mathValues.push(button.id);
    displayValues.push(button.id);
    //update display
    displayFormula.textContent = displayValues.join(' ');
    displayFormula.textContent += ' ';
    a = '';

    //if 2 functions selected sequentially
    //replace original function with second function (both arrays)
    if (mathValues.length === 3) {
        replaceOperators();
    }

    //when operating multiple numbers w/out hitting `=`
    //replace math array [0]/[1] with sum...
    if (mathValues.length > 3) {
        updateMathArrayFunct();
    }
}

//log decimal key
function logDec() {
    if (mathValues[1] === '=') {
        clearCalc();
        a += '0.';
        displayFormula.textContent += '0.';
    } else {
        //check in decimal previously selected
        if (decOn === true) {
            a += '';
            displayFormula.textContent += '';
        } else if (decOn === false) {
            a += '.';
            displayFormula.textContent += '.';
        }
    }
    decOn = true;
}

//push a to both arrays...
function pushA2Arrays() {
    a = Number(a);
    mathValues.push(a);
    displayValues.push(a);
}

//replace operators...
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

//update display/math values when percent is selected...
function updateMathArrayCent() {
    //evaluate percent
    operateCent(mathValues[1], mathValues[0], mathValues[2]);
    //display sum
    displayProduct.textContent = sum;
    //remove a & operator
    mathValues.shift();
    mathValues.shift();
    //reset a = sum
    mathValues[0] = sum;
    decOn = false;
}

//update display/math values when function in selected...
function updateMathArrayFunct() {
    //evaluate function
    operateFunct(mathValues[1], mathValues[0], mathValues[2]);
    //display sum
    displayProduct.textContent = sum;
    //remove a & operator
    mathValues.shift();
    mathValues.shift();
    //reset a = sum
    mathValues[0] = sum;
    decOn = false;
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

//work percentage key...
const buttonCent = document.querySelector('#cent');
console.log(buttonCent);
buttonCent.addEventListener('click', () => {
    //save a to both arrays
    pushA2Arrays()
    //evaluate percentage, update math array
    updateMathArrayCent();
    //include '=' in math array
    mathValues.push('=');
});

//work number keys...
const buttonNums = document.querySelectorAll('.num');
buttonNums.forEach(button => button.addEventListener('click', () => {
    if (displayProduct.textContent === 'error') {
        displayProduct.textContent = '';
    }
    logNums(button);
}));

//work function keys..
const buttonFuncts = document.querySelectorAll('.function');
buttonFuncts.forEach(button => button.addEventListener('click', () => {
    if (displayProduct.textContent === 'error') {
        displayProduct.textContent = '';
    }
    logFuncts(button);
}))

//work decimal key...
const buttonDec = document.querySelector('.dec');
buttonDec.addEventListener('click', () => {
    logDec();
});

//work math operations...
const buttonEquals = document.querySelector('.eq');
buttonEquals.addEventListener('click', () => {
    if (mathValues.length === 0 || (mathValues.length === 2 && a === '')) {
        displayProduct.textContent = 'error';
    } else {
        //add second value to both arrays
        pushA2Arrays()
        a = '';
        //evaluate function, update math array...
        updateMathArrayFunct();
        //include '=' in math array
        mathValues.push('=');
    }
});