function getValue(data, expression) {
    const arr = expression.split('.');
    let value;
    while (arr.length) {
        const key = arr.shift().trim();
        value = data[key];
        data = value;
    }
    return value;
}

function render2(template, data) {
    const state = {
        // 普通
        NORMAL: 0,
        // 表达式
        EXPRESSION: 1,
    }

    let result = '';
    let index = 0;
    let currentState = state.NORMAL;
    let exp = '';

    const isExpressionStart = (char, nextChar) => {
        return char === '{' && nextChar === '{';
    };
    const isExpressionEnd = (char, nextChar) => {
        return char === '}' && nextChar === '}';
    };

    while (index < template.length) {
        const char = template[index];
        const nextChar = template[index + 1];

        if (isExpressionStart(char, nextChar)) {
            index += 2;
            currentState = state.EXPRESSION;
            continue;
        }

        if (isExpressionEnd(char, nextChar)) {
            const value = getValue(data, exp);
            result += value;
            index += 2;
            exp = '';
            currentState = state.NORMAL;
            continue;
        }

        if (currentState === state.NORMAL) {
            result += char;
            index++;
        }

        if (currentState === state.EXPRESSION) {
            exp += char;
            index++;
        }
    }

    return result;
}

const result = render2('<div>{{ content }}, my name is {{ user.name }}</div>', { 
    content:'hello',
    user: {
        name: 'John'
    }
});

console.log(result);