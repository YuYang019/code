// 岛屿最大面积

// 给定一个包含了一些 0 和 1 的非空二维数组 grid。
// 一个岛屿是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在水平或者竖直方向上相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。
// 找到给定的二维数组中最大的岛屿面积。(如果没有岛屿，则返回面积为 0。)

const data = [
    [0,0,1,0,0,0,0,1,0,0,0,0,0],
    [0,0,1,0,0,0,0,1,1,1,0,0,0],
    [0,1,1,0,1,0,0,0,0,0,0,0,0],
    [0,1,0,0,1,1,0,0,1,0,1,0,0],
    [0,1,0,0,1,1,0,0,1,1,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,1,1,0,0,0,0]
]

const isInArea = (data, i, j) => {
    return i > 0 && i < data.length && j > 0 && j < data[0].length;
}

const getArea = (data, i, j) => {
    if (!isInArea(data, i, j)) {
        return 0;
    }
    if (data[i][j] !== 1) {
        return 0;
    }
    data[i][j] = 2;
    return 1
        + getArea(data, i - 1, j)
        + getArea(data, i + 1, j)
        + getArea(data, i, j + 1)
        + getArea(data, i, j - 1)
}

function fn(data) {
    let maxArea = 0;

    // 遍历矩阵
    // 每个位置的面积，比较取最大
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            const area = getArea(data, i, j);
            maxArea = Math.max(area, maxArea);
        }
    }

    return maxArea;
}

console.log(fn(data));