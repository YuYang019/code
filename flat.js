function flat(arr, maxLevel) {
    const result = [];
    const stack = arr.slice();
    let level = 0;

    // [1,2, [2,3, [5]], 4]

    // 右边是栈顶，左边是栈底
    // 不断处理栈顶的数组，使其减层
    while (stack.length) {
        const val = stack.pop();
        if (Array.isArray(val) && level < maxLevel) {
            level++;
            stack.push(...val)
        }
        else {
            level = 0;
            result.unshift(val)
        }
    }

    return result;
}

function flat2(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (Array.isArray(item)) {
            result = result.concat(flat2(item))
        }
        else {
            result.push(item);
        }
    }

    return result;
}

// console.log(flat([1, [2, [4]], 3, [3, [4, [5]]]], 2));
console.log(flat([1, [2, [4]], 3, [3, [4, [5]]]], 2));