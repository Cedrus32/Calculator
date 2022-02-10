// ------ //
// THEMES //
// ------ //

//TODO for finished, light is default
//TODO for testing, dark is default...
//TODO .html --> <link ... light.css>
//TODO .html --> <link ... dark.css>
//TODO .js --> toggle dark

function switchTheme(src) {
    const themeCSS = document.querySelectorAll('.theme-CSS');
    themeCSS[1].href = src;
}

const themeButtons = document.querySelectorAll('.theme');
themeButtons[0].addEventListener('click', () => {
    switchTheme('./light.css');
});

themeButtons[1].addEventListener('click', () => {
    switchTheme('./dark.css');
});

// ------ //
// KEYPAD //
// ------ //

//TODO store button.id in array --> to pass to display & functions

const buttonNums = document.querySelectorAll('.num');
buttonNums.forEach(button => button.addEventListener('click', () => {
    console.log(button.id);
}));

const buttonFuncts = document.querySelectorAll('.function');
buttonFuncts.forEach(button => button.addEventListener('click', () => {
    console.log(button.id);
}))

// -------------- //
// MATH FUNCTIONS //
// -------------- //

//TODO hook up `funct` buttons to functions
//TODO clear arrays when 'clear' button is clicked

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

//TODO hookup to buttons (don't worry about invalid args or case)
//TODO clean up if...else statements
//TODO check input against an array of keywords?
function operate(operator, a, b) {
    if (operator === 'add') {
        add(a, b);
    } else if (operator === 'subtract') {
        sub(a, b);
    } else if (operator === 'multiply') {
        mult(a, b);
    } else if (operator === 'divide') {
        div(a, b);
    }
    return sum;
}

// ------- //
// TESTING //
// ------- //

