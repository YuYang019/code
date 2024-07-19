function decode(str) {
    str = `[${str}]`

    const stack = []

    for (let i = 0; i < str.length; i++) {
        const char = str[i]
        if (char === ']') {
            let temp = ''
            while (stack.length) {
                const top = stack.pop()
                if (top === '[') {
                    break
                }
                else if (/[0-9]/.test(top)) {
                    // 数字
                    temp = temp.repeat(parseInt(top))
                }
                else {
                    // 非数字
                    temp = `${top}${temp}`
                }
            }
            stack.push(temp)
        }
        else {
            stack.push(char)
        }
    }

    return stack.join('')
}

console.log(decode('3[a2[c]]')) // accaccacc