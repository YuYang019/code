function trapWater(heights) {
    let sum = 0;
    // 找两边最长的高度
    for (let i = 0; i < heights.length; i++) {
        let leftMax = 0;
        // 为什么是 <= 而不是 = ？
        for (let j = 0; j <= i; j++) {
            leftMax = Math.max(heights[j], leftMax);
        }

        let rightMax = 0;
        for (let k = i; k < heights.length; k++) {
            rightMax = Math.max(heights[k], rightMax);
        }
        // 两边最长取相对短的一边
        sum += Math.min(leftMax, rightMax) - heights[i];
    }
    return sum;
}

function trapWater2(heights) {
    let sum = 0;
    let res = [];

    let i = 0;
    let j = heights.length - 1;
    let leftMax = 0;
    let rightMax = 0;

    while (i < j) {
        leftMax = Math.max(leftMax, heights[i]);
        rightMax = Math.max(rightMax, heights[j]);

        // 以左侧为准时候，其实不需要关心右边最大究竟是不是【距离最近】的
        // 因为不论是不是最近的，水位总是以最短的那一边来计算，同时右边一定有一个兜底的长板
        if (leftMax <= rightMax) {
            res[i] = leftMax - heights[i]
            i++
        }
        else {
            res[j] = rightMax - heights[j]
            j--
        }
    }

    console.log(res);

    return res.reduce((a, b) => a + b, 0);
}

console.log(trapWater2([0,1,0,2,1,0,1,3,2,1,2,1]));