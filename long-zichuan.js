// 最长无重复子串

// 双指针，用 map 记录字符是否出现过
function fn(str) {
    if (!str || str.length <= 1) {
        return str;
    }

    let maxStart = 0;
    let maxEnd = 0;
    let maxLen = 0;
    let map = {};

    for (let i = 0; i < str.length; i++) {
        map = {};
        map[str[i]] = true;
        for (let j = i + 1; j < str.length; j++) {
            if (str[i] === str[j] || map[str[j]]) {
                break;
            }
            map[str[j]] = true;
            if (str[i] !== str[j] && j - i + 1 > maxLen) {
                maxStart = i;
                maxEnd = j;
                maxLen = j - i + 1;
            }
        }
    }

    return str.slice(maxStart, maxEnd + 1);
}

console.log(fn('asa1aaaa1ljllkf'));