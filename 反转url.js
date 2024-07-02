// 不能用 split
const reverseUrl = (url) => {
    if (!url) {
        return
    }

    const pattern = /https?:\/\//
    const prefix = url.match(pattern)?.[0]

    if (prefix) {
        // www.google.com/dev-ops/bar
        url = url.slice(prefix.length)
    }

    // rab/spo-ved/moc.elgoog.www
    let reversed = ''
    for (let i = url.length - 1; i >= 0; i--) {
        reversed += url[i]
    }

    let result = ''
    let i = 0;
    let j = 0;

    const reverse = (left, right) => {
        let str = ''
        for (let i = right; i >= left; i--) {
            str += reversed[i]
        }
        return str
    }

    while (j < reversed.length) {
        if (reversed[j] === '/') {
            result += reverse(i, j - 1) + '/'
            j++
            i = j
        }
        else if (reversed[j] === '.') {
            result += reverse(i, j - 1) + '.'
            j++
            i = j
        }
        else {
            j++
        }
    }

    // 结尾
    result += reversed.slice(i, j)

    return prefix + result;
}

// http://bar/ops-dev/com.google.www

console.log(reverseUrl('http://www.google.com/dev-ops/bar'));