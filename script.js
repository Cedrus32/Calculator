// ------ //
// THEMES //
// ------ //

//TODO -- add different coloring to [+/-] [%] [√] (not keyboard enabled)

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
    if (b === 0) {
        sum = 'error';
    } else {
        sum = (a / b) * 100;
    }
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
        //round sum
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

//square root...
function sqrt(a, b) {
    sum = a ** (1/b);
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
            sqrt(a, b);
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

//round sum
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

//scrub 'equals' when selecting another function...
function scrubEqFunct() {
    //remove '=' from math array
    mathValues.pop();
    //update display array to math array (sum)
    displayValues.splice(1);
    displayValues[0] = mathValues[0];
}

//push a to both arrays...
function pushA2Arrays() {
    a = Number(a);
    mathValues.push(a);
    displayValues.push(a);
}

//push function to both arrays...
function pushFunct2Arrays(button) {
    mathValues.push(button.id);
    displayValues.push(button.id);
}

//replace operators...
function shiftArrays() {
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
    sum = operateCent(mathValues[1], mathValues[0], mathValues[2]);
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

//TODO stop [+/-] from logging '-' after 0 / 1 -> %

//** -------------------- */
//toggle positive/negative value...
function toggleNeg() {
    if (displayProduct.textContent === 'error' ) {
        displayProduct.textContent = 'error';
    } else {
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
} //** -------------------- */

//** -------------------- */
//log percent based on preceding math function...
function logPercent() {
    if (mathValues.length === 0) {
        displayFormula.textContent = '';
        displayProduct.textContent = 'error';
    } else {
        //save a to both arrays
        pushA2Arrays()
        a = '';
        //evaluate percentage, update math array
        updateMathArrayCent();
        //include '=' in math array
        mathValues.push('=');
    }

    console.log('END OF logPercent()');
    console.log({mathValues});
    console.log({displayValues});

} //** -------------------- */

//log numbers...
function logNums(button) {

    //if entering a number after getting sum
    if (mathValues[1] === '=' || displayProduct.textContent === 'error') {
        clearCalc();
    }

    //concat a, update displayFormula
    a += button.id;
    displayFormula.textContent += button.id;
}

//** -------------------- */
//log functions...
function logFuncts(button) {
    
    if ((mathValues.length === 0 && a === '') || displayProduct.textContent === 'error' ) {
        displayProduct.textContent = 'error';
    } else {
        //reset decOn
        if (decOn === true) {
            decOn = false;
        }

        //if `=` button was previously selected,
        //scrub math array, show sum on formula display
        if (mathValues[1] === '=') {
            scrubEqFunct();
            displayFormula.textContent = displayValues;
            displayProduct.textContent = '';
        }

        //if a !== null, add A to arrays
        if (a !== '') {
            pushA2Arrays()
        }

        if (displayValues[2] === 0) {
            displayValues.pop();
            displayProduct.textContent = 'error';
        } else {
            //add FUNCTION to arrays
            pushFunct2Arrays(button);
            //update display
            displayFormula.textContent = displayValues.join(' ');
            displayFormula.textContent += ' ';
            a = '';

            //if 2 functions selected sequentially
            //replace original function with second function (both arrays)
            if (mathValues.length === 3) {
                shiftArrays();
            }

            //when operating multiple numbers w/out hitting `=`
            //replace math array [0]/[1] with sum...
            if (mathValues.length > 3) {
                updateMathArrayFunct();
            }
        }
    }

    console.log('END OF logFuncts()');
    console.log({mathValues});
    console.log({displayValues});

} //** -------------------- */

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

//** -------------------- */
//run equals...
function runEquals() {
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

        console.log('END OF runEquals()');
        console.log({mathValues});
        console.log({displayValues});

    }
} //** -------------------- */

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


// // ------------ //
// // KEY LISTENER //
// // ------------ //

// // initiate key function
// function initKey(key) {
//     switch(key) {
//         case ''
//     }
// }

// //get key value and matching element
// function getKey(key) {
//     let keyValue = key.key;
//     const keyLogged = document.querySelector(`.key[data-key='${keyValue}']`);
//     initKey(keyLogged);
// }

// //listen for keydown...
// window.addEventListener('keydown', getKey);