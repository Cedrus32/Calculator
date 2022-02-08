// -------------- //
// MATH FUNCTIONS //
// -------------- //

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

// ------- //
// TESTING //
// ------- //

// addTest = add(-5, -1.5);
// console.log({addTest});

// subTest = sub(10, -.5, 15);
// console.log({subTest});

// multTest = mult(2, 2.5);
// console.log({multTest});

// divTest = div(0, 2);
// console.log({divTest});

// let mathTest = add(1, 5);
// console.log({mathTest});
// mathTest = sub(mathTest, 3);
// console.log({mathTest});
// mathTest = mult(mathTest, 2);
// console.log({mathTest});
// mathTest = div(mathTest, 2);
// console.log({mathTest});