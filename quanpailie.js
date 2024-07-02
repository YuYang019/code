// 输入 [['A', 'B', ...], [1, 2], ['a', 'b'], ...]
// 输出 ['A1a', 'A1b', ....]

function fn(arr) {
    const len = arr.length;
    // 1、未知数量，递归
    // 2、将多个全排列，简化成两两的全排列
    // 3、排列组合，就是双指针，两两组合
    if (len >= 2) {
        const newArr = [];
        const arr1 = arr[0];
        const arr2 = arr[1];
        for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr2.length; j++) {
                newArr.push(arr1[i] + arr2[j]);
            }
        }
        return fn([newArr, ...arr.slice(2)])
    }
    else {
        return arr[0]
    }
}

console.log(fn([['A','B'], ['a','b', 'c', 'd'], [1, 2]]));
