function merge(a, b) {

    a = a.sort((a, b) => a - b)
    b = b.sort((a, b) => a - b)

    const res = []

    let i = 0
    let j = 0

    while (i < a.length && j < b.length) {
        if (a[i] <= b[j]) {
            res.push(a[i])
            i++
        }
        else {
            res.push(b[j])
            j++
        }
    }

    if (i === a.length && j !== b.length) {
        res.push(...b.slice(j))
    }
    if (j === b.length && i !== a.length) {
        res.push(...a.slice(i))
    }

    return res
}

console.log(merge([5,8,5,1,88], [19,7,6,5]))