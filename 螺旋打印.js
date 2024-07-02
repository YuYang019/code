// 打印螺旋矩阵

// 设置上下左右边界点，然后循环打印

const data = [
    [1,2,3,4],
    [12,13,14,5],
    [11,16,15,6],
    [10,9,8,7],
]

function printData(data) {
    let top = 0;
    let bottom = data.length - 1;
    let left = 0;
    let right = data[0].length - 1;

    while (true) {
        for (let i = left; i <= right; i++) {
            console.log('上', data[top][i]);
        }

        if (++top > bottom) {
            break;
        }

        for (let j = top; j <= bottom; j++) {
            console.log('右', data[j][right]);
        }

        if (--right < left) {
            break;
        }

        for (let i = right; i >= left; i--) {
            console.log('下', data[bottom][i]);
        }

        if (--bottom < top) {
            break;
        }

        for (let j = bottom; j >= top; j--) {
            console.log('左', data[j][left])
        }

        if (++left > right) {
            break;
        }
    }
}

printData(data);