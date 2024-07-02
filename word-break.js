// 单词拆分

// s = "leetcode", wordDict = ["leet", "code"] true
// s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"] false

// dp[i] = dp[i - j] && ss.has(sub) / sub = str.slice(j, i)
// 对于

function fn(str, dict) {}

function wordBreak(s, wordDict) {
    const ss = new Set<string>(wordDict)
    const n = s.length
    const f = new Array<boolean>(n + 10).fill(false)
    f[0] = true
    for (let i = 1; i <= n; i++) {
        for (let j = i; j >= 1 && !f[i]; j--) {
            const sub = s.substring(j - 1, i)
            if (ss.has(sub)) f[i] = f[j - 1]
        }
    }
    return f[n]
}

console.log(fn)