function grabRedPackages(total, count) {
    const min = 0.01
    const result = new Array(count).fill(0)

    let remain = total

    // count = 5
    // (0, (total / count), 2 * total/count);

    // count = 4
    // (0, remain / (count - 1), 2 * remain / (count - 1))

    const avg = total / count;
    if (avg < 0.01) {
        return;
    }

    for (let i = 0; i < count - 1; i++) {
        // 保证最后一个红包金额大于 0.01，减掉 0.01 把空间余出来
        let money = Math.max(parseFloat((Math.random() * 2 * (remain / (count - i))).toFixed(2)) - 0.01, 0.01)
        result[i] = money
        remain -= money
    }

    result[count - 1] = parseFloat(remain.toFixed(2))

    console.log('sum', result.reduce((pre, curr) => pre + curr, 0))

    return result
}

console.log(grabRedPackages(3, 3))