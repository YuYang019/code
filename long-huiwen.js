// 最长回文

// 中心扩散，从某个字符向两边展开，偶数情况是以两个为中心展开，奇数为一个
function fn2(str) {

    const find = (i, j) => {
        let left = i;
        let right = j;
        while (left <= right && left >= 0 && right < str.length && str[left] === str[right]) {
            left--;
            right++;
        }
        return str.slice(left + 1, right);
    }

    let result = '';
    for (let i = 0; i < str.length; i++) {
        const evenResult = find(i, i);
        const oddResult = find(i, i + 1);
        const temp = oddResult.length > evenResult.length ? oddResult : evenResult;
        result = temp.length > result.length ? temp : result;
    }

    return result;
}

console.log(fn2('jkhaa123321aalkjasf'));
