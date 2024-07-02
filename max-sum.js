// nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出：6
// 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。

function max(arr) {
    let result = -Number.MAX_SAFE_INTEGER;
    let temp = 0;

    for (let i = 0; i < arr.length - 1; i++) {
        temp = arr[i];
        for (let j = i + 1; j < arr.length; j++) {
            temp += arr[j];
            result = temp > result ? temp : result;
        }
    }

    return result;
}

// dp[i] = Math.max(dp[i - 1] + num[i], num[i])

function max2(arr) {
    if (arr.length < 0) {
        return;
    }

    const dp = [arr[0]];
    let max = -Number.MAX_SAFE_INTEGER;

    for (let i = 1; i < arr.length; i++) {
        dp[i] = Math.max(dp[i - 1] + arr[i], arr[i]);
        max = Math.max(dp[i], max);
    }
    console.log(dp);

    return max;
}