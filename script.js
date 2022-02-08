// -------------- //
// MATH FUNCTIONS //
// -------------- //

// ...add -- WORKING with whole nums (+/-) && decimals (+/-) && 2+ inputs
function add(...nums) {
    let sum = nums.reduce((total, number) => {
        return total += number;
    });
    return sum;
}

// ...sub -- WORKING with whole nums (+/-) && decimals (+/-) && 2+ inputs
function sub(...nums) {
    let sum = nums.reduce((total, number) => {
        return total -= number;
    });
    return sum;
}

// function multiply() {
    
// }

// function divide() {
    
// }

// ------- //
// TESTING //
// ------- //

// addTest = add(-5, -1.5);
// console.log({addTest});

// subTest = sub(10, -.5, 15);
// console.log({subTest});