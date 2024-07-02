function caculate(str) {
    const arr = str.split('')
    const stack_ops = [] // 存储运算符
    const stack_num = [] // 存储数字
    const len = str.length

    let index = 0

    while (index < len) {
        const item = arr[index]

        if (/[0-9]/.test(item)) {
            // 数字
            let num = ''
            // 找到后面的数字
            while (index < len && /[0-9]/.test(arr[index])) {
                num += arr[index]
                index++
            }
            index--

            stack_num.push(Number(num))
            console.log('push', num)

            // 没有操作符，不处理
            if (stack_ops.length === 0) {
                index++
                continue
            }

            const op =  stack_ops.pop();
            num = stack_num.pop()

            if (op === '+') {
                num = num
            }
            if (op === '-') {
                num = -num
            }
            if (op === '*') {
                num = num * stack_num.pop()
            }
            if (op === '/') {
                num = stack_num.pop() / num
            }

            stack_num.push(num)
            index++
        }
        else {
            // 操作符
            stack_ops.push(item)
            index++
        }
    }

    console.log(stack_num)

    return stack_num.reduce((a, b) => a + b, 0)
}

console.log(caculate('612+2*8-5'))