function formatNumber(num) {
    // 分为整数和小数位（小数位不用加千分位）
    const [integer, decimal] = String(num).split('.');
    const arr = integer.split('').reverse();

    let result = '';
    // 为什么要倒排序？因为需要从是从个位开始加分号
    for (let i = 0; i < arr.length; i++) {
        if (i % 3 === 0 && i !== 0) {
            result = `${arr[i]},${result}`
        }
        else {
            result = `${arr[i]}${result}`;
        }
    }

    return decimal ? `${result}.${decimal}` : result;
}

console.log(formatNumber(1234567.2313));

console.log(formatNumber(1567.2313));

console.log(formatNumber(167));

// formatNumber(123) = 123
// formatNumber(1234567) = 1,234,567
// formatNumber(1234567.123124) = 1,234,567
// formatNumber(1234567.123124) = 1,234,567.123124