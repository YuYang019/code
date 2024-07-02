// 找到下一个排列
// 比当前数字大，同时又要尽可能的小

// 1、从后往前，找到第一个降序分界点
// 2、从分界点往右找，找到比分界点左侧大的最小数字，交换
// 3、再把包括分界点的右侧改成升序

function nextStr(str) {
    const arr = str.split('').map(item => parseInt(item, 10))
    const len = arr.length

    let index = len - 1
    while (arr[index] <= arr[index - 1]) {
        index--
    }

    let leftNum = arr[index - 1]
    let right = len - 1
    while (arr[right] <= leftNum) {
        right--
    }

    arr[index - 1] = arr[right]
    arr[right] = leftNum

    let i = index;
    let j = len - 1;
    while (i < j) {
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
        i++
        j--
    }

    return arr.join('')
}

console.log('output', nextStr('124321'))  // 131224