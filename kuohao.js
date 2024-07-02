function fn(str) {
    const map = {
        ']': '[',
        '}': '{',
        ')': '('
    };
    const stack = [];
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === ']' || char === ')' || char === '}') {
            const top = stack.pop();
            if (top !== map[char]) {
                return false;
            }
        }
        else {
            stack.push(char);
        }
    }
    return true;
}

console.log(fn('({[]})'))
console.log(fn('({[]}})'))