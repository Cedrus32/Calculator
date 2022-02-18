// ------ //
// THEMES //
// ------ //

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

//...find percent
function findPercent(a, b) {
    if (b === 0) {
        sum = 'error';
    } else {
        sum = (a / b) * 100;
    }
    return sum;
}

//...find percent of
function findPercentOf(a, b) {
    sum = b * (a / 100);
    return sum;
}

//...mark up
function markUp(a, b) {
    sum = a * (1 + (b / 100));
    return sum;
}

//...mark down
function markDown(a, b) {
    sum = a * (1 - (b / 100));
    return sum;
}

//...percent switch...
function operateCent(operator, a, b) {
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

    if (sum === 'error') {
        return sum;
    } else {
        sum = roundSum(sum);
        return sum;
    }
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

//...square root
function root(a, b) {
    if (a < 0) {
        a *= -1;
        sum = (a ** (1/b)) * -1;
    } else {
        sum = a ** (1/b);
    }
    return sum;
}

//...math switch...
function operateFunct(operator, a, b) {
    switch (operator) {
        case '+':
            add(a, b);
            break;
        case '-':
            sub(a, b);
            break;
        case 'x':
            mult(a, b);
            break;
        case '/':
            div(a, b);
            break;
        case '√':
            root(a, b);
            break;
    }

    if (sum === 'error') {
        return sum;
    } else {
        sum = roundSum(sum);
        return sum;
    }
}

//...round sum...
function roundSum(sum) {
    newSum = Math.round(sum * 100) / 100;
    return newSum;
}


// -------------------- //
// CALCULATOR FUNCTIONS //
// -------------------- //

//get display elements
let a = '';
let decOn = false;
let mathValues = [];
let displayValues = [];
const displayFormula = document.querySelector('.formula');
const displayProduct = document.querySelector('.product');
displayFormula.textContent = ' ';
displayProduct.textContent = ' ';

//...scrub `=` from mathArray when selecting [+/-]...
//...update displayValues...
function scrubEqNeg() {
    //remove `=` from math array
    mathValues.pop();
    //make math value negative
    mathValues[0] *= -1;
    //update display array to math array (negative value)
    displayValues.splice(1);
    displayValues[0] = mathValues[0];
}

//...scrub `=` from mathArray when selecting [function]...
//...update displayValues...
function scrubEqFunct() {
    //remove '=' from math array
    mathValues.pop();
    //update display array to math array (sum)
    displayValues.splice(1);
    displayValues[0] = mathValues[0];
}

//...push `a` to both arrays...
function pushA2Arrays() {
    a = Number(a);
    mathValues.push(a);
    displayValues.push(a);
}

//...push `function` to both arrays...
function pushFunct2Arrays(button) {
    mathValues.push(button.id);
    displayValues.push(button.id);
}

//...replace operators...
function replaceOps() {
    let lastMathVal = mathValues.length - 1;
    let lastDisplayVal = displayValues.length - 1;

    //replace/remove last function in mathValues
    mathValues[lastMathVal - 1] = mathValues[lastMathVal];
    mathValues.pop();
    //replace/remove last function in displayValues
    displayValues[lastDisplayVal - 1] = displayValues[lastDisplayVal];
    displayValues.pop();
    //update display
    displayFormula.textContent = displayValues.join(' ') + ' ';
}

//...throw 'exceeds memory' error...
function exceedsMem() {
    displayFormula.classList.add('exceeds-mem');
    displayFormula.textContent = 'calculator memory exceeded';
    displayProduct.textContent = 'error';
}

//...update display/math values when selecting [%]...
function updateMathArrayCent() {
    //evaluate percent
    sum = operateCent(mathValues[1], mathValues[0], mathValues[2]);

    //check sum length
    if (String(sum).length > 11) {
        exceedsMem();
    } else {
        //display sum
        displayProduct.textContent = sum;
        //remove `a` & `function`
        mathValues.shift();
        mathValues.shift();
        //reset a = sum
        mathValues[0] = sum;
        //reset decOn
        decOn = false;
    }
}

//...find sum...
//...update mathValues & display...
function updateMathArrayFunct() {
    //evaluate function
    operateFunct(mathValues[1], mathValues[0], mathValues[2]);
    //check sum length
    if (String(sum).length > 11) {
        exceedsMem();
    } else {
         //display sum
        displayProduct.textContent = sum;
        //remove `a` & `function`
        mathValues.shift();
        mathValues.shift();
        //reset a = sum
        mathValues[0] = sum;
        //reset decOn
        decOn = false;
    }
}


// ------------- //
// KEY FUNCTIONS //
// ------------- //

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

//todo delete when number is manually entered negative (3 -> [+/-])     ** ([+/-] --> 3 WORKS)

//toggle positive/negative value...
function toggleNeg() {

    //reset displayFormula class (remove red)
    if (displayFormula.textContent !== 'calculator memory exceeded') {
        displayFormula.classList.remove('exceeds-mem');
    }

    //check for error message
    if (displayProduct.textContent === 'error' ) {
        displayProduct.textContent = 'error';
    } else {
        //srub `=` from mathValues, update display
        if (mathValues[1] === '=') {
            scrubEqNeg();
            displayFormula.textContent = mathValues[0];
            displayProduct.textContent = ' ';
        } else {
            let mathValuesLast = mathValues.length - 1;
            if (typeof mathValues[mathValuesLast] === 'number') {
                //when modifying sum after [=] and `=` scrub (modifying in array, not mem)
                //save last math value to `a`, remove last value from both arrays
                a = mathValues[mathValuesLast];
                mathValues.pop();
                displayValues.pop();
                //modify `a`, save to both arrays
                a *= -1;
                mathValues.push(a);
                displayValues.push(mathValues[mathValuesLast]);
                a = '';
            } else if (a === '') {
                //when selecting initial number before [=] (modifying in mem, non array)
                a = '-'
            } else if (a === '-') {
                //when selecting initial number before [=] (modifying in mem, not array)
                a = '';
            } else if (a !== '') {
                //when selecting additional number before [=] (modyifying in mem, not array)
                a *= -1;
            }
            //update display
            displayFormula.textContent = displayValues.join(' ') + ' ' + a;
        }
    }
}

//log percent...
function logPercent() {
    //check for error
    if (mathValues.length === 0) {
        displayFormula.textContent = ' ';
        displayProduct.textContent = 'error';
    } else {
        //add `a` to both arrays
        pushA2Arrays()
        a = '';
        //evaluate `%`, update mathValues
        updateMathArrayCent();
        //include '=' in math array
        mathValues.push('=');
    }
}

//log numbers...
function logNums(button) {

    //reset displayFormula class (removes red)
    displayFormula.classList.remove('exceeds-mem');

    //check for error message, clear calculator
    if (mathValues[1] === '=' || displayProduct.textContent === 'error' || 
        displayFormula.textContent === 'calculator memory exceeded') {
        clearCalc();
        displayProduct.textContent = ' ';
    }

    //concat `a`, update display
    a += button.id;
    displayFormula.textContent += button.id;

    //control display length
    if (displayFormula.textContent.length > 28) {
        runEquals();
    }
}

//log functions...
function logFuncts(button) {
    
    //check for error message
    if ((mathValues.length === 0 && a === '') ||
        (displayProduct.textContent === 'error' && mathValues[1] !== '=')) {
        displayProduct.textContent = 'error';
    } else {
        //reset decOn
        if (decOn === true) {
            decOn = false;
        }

        //scrub `=` from mathValues, update display
        if (mathValues[1] === '=') {
            scrubEqFunct();
            displayFormula.textContent = displayValues;
            displayProduct.textContent = ' ';
        }

        //add `a` to both arrays
        if (a !== '') {
            pushA2Arrays()
        }

        //check for /0 when selecting sequential `functions`
        if (displayValues[displayValues.length - 2] === '/' &&
            displayValues[displayValues.length - 1] === 0) {
            displayValues.pop();
            displayProduct.textContent = 'error';
        } else {
            //add `function` to both arrays
            pushFunct2Arrays(button);
            //update display
            displayFormula.textContent = displayValues.join(' ');
            displayFormula.textContent += ' ';
            a = '';

            //if 2 functions selected sequentially...
            //replace original `function` with new `function` in both arrays
            if (mathValues.length === 3) {
                replaceOps();
            }

            //when operating sequential functions...
            //replace mathValues [0]/[1] with sum
            if (mathValues.length > 3) {
                updateMathArrayFunct();
            }
        }
    }
}

//log decimal key
function logDec() {
    //set initial `a` after [=]
    if (mathValues[1] === '=') {
        clearCalc();
        a += '0.';
        displayFormula.textContent += '0.';
    } else {
        //check if decimal previously selected
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

//run equals...
function runEquals() {
    //check for error
    if (mathValues.length === 0 || (mathValues.length === 2 && a === '')) {
        displayProduct.textContent = 'error';
    } else {
        //add `a` value to both arrays
        pushA2Arrays()
        a = '';
        //evaluate `function`, update mathValues...
        updateMathArrayFunct();
        //include '=' in math array
        mathValues.push('=');
    }
}


// ---------------- //
// BUTTON LISTENERS //
// ---------------- //

//clear button
const buttonClear = document.querySelector('#clear');
buttonClear.addEventListener('click', () => {
    clearCalc();
});

//delete button
const buttonDel = document.querySelector('#del');
buttonDel.addEventListener('click', () => {
    deleteNum();
});

//positive/negative button
const buttonPosNeg = document.querySelector('.pos-neg');
buttonPosNeg.addEventListener('click', () => {
    toggleNeg();
});

//percent button
const buttonCent = document.querySelector('.cent');
buttonCent.addEventListener('click', () => {
    logPercent();
});

//number buttons
const buttonNums = document.querySelectorAll('.num');
buttonNums.forEach(button => button.addEventListener('click', () => {
    logNums(button);
}));

//function buttons
const buttonFuncts = document.querySelectorAll('.function');
buttonFuncts.forEach(button => button.addEventListener('click', () => {
    logFuncts(button);
}))

//decimal button
const buttonDec = document.querySelector('.dec');
buttonDec.addEventListener('click', () => {
    logDec();
});

//equal button
const buttonEquals = document.querySelector('.eq');
buttonEquals.addEventListener('click', () => {
    runEquals();
});


// ------------ //
// KEY LISTENER //
// ------------ //

// initiate key function...
function initKey(key) {
    let keyType = key.classList[1];
    let keyID = key.id;

    //check key type
    switch (true) {
        case (keyType === 'clear-del' && keyID === 'clear'):
            clearCalc();
            break;
        case (keyType === 'clear-del' && keyID === 'del'):
            deleteNum();
            break;
        case (keyType === 'num'):
            logNums(key);
            break;
        case (keyType === 'function'):
            logFuncts(key);
            break;
        case (keyType === 'dec'):
            logDec();
            break;
        case (keyType === 'eq'):
            runEquals();
    }
}

//get key value and matching element...
function getKey(key) {
    const keyLogged = document.querySelector(`.key[data-key='${key.key}']`);
    const keyAlt = key.key;
    const buttonMult = document.querySelector('#x');
    switch (true) {
        case (keyAlt === 'Enter'):
            runEquals();
            break;
        case (keyAlt === '*'):
            logFuncts(buttonMult);
            break;
        case (keyAlt === 'Escape'):
            clearCalc();
        default:
            initKey(keyLogged);
    }
}

//listen for keydown...
window.addEventListener('keydown', getKey);