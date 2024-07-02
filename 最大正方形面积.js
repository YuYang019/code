const input = [
    ["1","0","1","0","0"],
    ["1","0","1","1","1"],
    ["1","1","1","1","1"],
    ["1","0","1","1","1"]
]

function getMaxArea(arr) {
    let maxEdge = 0;

    const row = arr.length;
    const col = arr[0].length;

    const dp = [];
    for (let i = 0; i < row; i++) {
        dp[i] = []
    }

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (arr[i][j] === '1') {
                if (i === 0 || j === 0) {
                    dp[i][j] = 1
                }
                else {
                    dp[i][j] = Math.min(dp[i-1][j], dp[i-1][j-1], dp[i][j-1]) + 1;
                }
                maxEdge = Math.max(dp[i][j], maxEdge);
            }
            else {
                dp[i][j] = 0;
            }
        }
    }

    return maxEdge * maxEdge;
}

console.log(getMaxArea(input))