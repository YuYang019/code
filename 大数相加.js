const isNumber = () => {}

function addDecimal(a, b) {
    while (a.length < b.length) {
        a = a + '0'
    }
    while (b.length < a.length) {
        b = b + '0'
    }

    let carry = 0
    let result = ''

    for (let i = a.length - 1; i >= 0; i--) {
        const sum = parseInt(a[i]) + parseInt(b[i]) + carry
        const num = sum % 10
        carry = Math.floor(sum / 10)
        result = `${num}${result}`
    }

    return {
        carry, result
    }
}

function addInteger(a, b, carry) {
    while (a.length < b.length) {
        a = '0' + a
    }
    while (a.length > b.length) {
        b = '0' + b
    }

    let result = ''
    for (let i = a.length - 1; i >= 0; i--) {
        const sum = parseInt(a[i]) + parseInt(b[i]) + carry
        const num = sum % 10
        carry = Math.floor(sum / 10)
        result = `${num}${result}`
    }

    return result
}

function isValidNum(num) {
    const pattern = /^-?\d+\.?\d+$/
    return typeof num === 'number' || (typeof num === 'string' && pattern.test(num))
}

function formatNum(num) {
    if (typeof num === 'number') {
        return num.toString()
    }
    return num
}

function isNegative(num) {
    return num.startsWith('-')
}

// -1.12 + -1.2 / -1.12 + 3.11

function minus(num1, nums2) {
    
}

function add(num1, num2) {
    if (!isValidNum(num1) || !isValidNum(num2)) {
        return
    }

    num1 = formatNum(num1)
    num2 = formatNum(num2)

    const [integer1, decimal1] = num1.split('.')
    const [integer2, decimal2] = num2.split('.')

    let decimalCarry = 0
    let decimal = ''
    if (decimal1 && decimal2) {
        const {carry, result} = addDecimal(decimal1, decimal2)
        decimal = result
        decimalCarry = carry
    }
    else if (decimal1){
        decimal = decimal1
    }
    else if (decimal2) {
        decimal = decimal2
    }

    let integer = ''
    if (integer1 && integer2) {
        integer = addInteger(integer1, integer2, decimalCarry)
    }
    else if (integer1){
        integer = integer1
    }
    else if (integer2) {
        integer = integer2
    }

    return `${integer}${decimal ? `.${decimal}` : ''}`;
}

console.log(add('1234567.1234567', '9876543.23456'))
console.log(add('-1234567.1234567', '-9876543.23456'))
console.log(add('-1234567.1234567', '9876543.23456'))
console.log(add('12', '9876543.23456'))

// 11111110.3580167