// -------------- //
// MATH FUNCTIONS //
// -------------- //

//...add
//WORKING with whole nums (+/-) && decimals (+/-) && 2+ inputs
function add(...nums) {
    let sum = nums.reduce((total, number) => {
        return total += number;
    });
    return sum;
}

//...sub
//WORKING with whole nums (+/-) && decimals (+/-) && 2+ inputs
function sub(...nums) {
    let sum = nums.reduce((total, number) => {
        return total -= number;
    });
    return sum;
}

//...mult
//WORKING with whole nums (+/-) && decimals (+/-) && 2+ inputs
function mult(...nums) {
    let sum = nums.reduce((total, number) => {
        return total *= number;
    });
    return sum;
}

//...div
//WORKING with whole nums (+/-) && decimals (+/-) && 2+ inputs && 'error' with 0 denominator
//NOT WORKING with 0 denominator mid-array
function div(...nums) {
    let sum = nums.reduce((total, number) => {
        if (number === 0) {
            return 'error';
        }
        return total /= number;
    });
    return sum;
}

// ------- //
// TESTING //
// ------- //

// addTest = add(-5, -1.5);
// console.log({addTest});

// subTest = sub(10, -.5, 15);
// console.log({subTest});

// multTest = mult(2, 2.5, 5);
// console.log({multTest});

// divTest = div(2, 0, 2);
// console.log({divTest});