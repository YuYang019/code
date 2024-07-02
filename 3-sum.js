function threeSum(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            for (let k = j + 1; k < arr.length; k++) {
                if (arr[i] + arr[j] + arr[k] === target) {
                    return [arr[i], arr[j], arr[k]]
                }
            }
        }
    }
}

// 递增数列
function threeSum2(arr, target) {
    if (arr.length < 3) {
        return;
    }

    for (let i = 0; i < arr.length - 2; i++) {
        let j = i + 1;
        let k = arr.length - 1;
        while (j < k) {
            const sum = arr[i] + arr[j] + arr[k];
            if (sum > target) {
                k--;
            }
            if (sum === target) {
                return [arr[i], arr[j], arr[k]];
            }
            if (sum < target) {
                j++;
            }
        }
    }
}

console.log(threeSum([3,9,12,7,19,5], 15));

console.log(threeSum2([1,3,9,12,19,21], 33));