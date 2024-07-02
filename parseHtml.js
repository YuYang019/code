function parse(html) {
    let i = 0;

    const state = {
        TAG_START: 0,
        CLOSE_TAG_START: 1,
        TEXT: 2,
    }
    const stack = [];
    const result = [];
    let currentState = state.TEXT;

    while (i < html.length) {
        // 起始标签开始
        if (html[i] === '<' && html[i + 1] !== '/') {
            currentState = state.TAG_START;
            const newTag = {
                tagName: '',
                children: [],
            }
            if (stack.length) {
                const top = stack[stack.length - 1];
                top.children.push(newTag);
                stack.push(newTag);
            }
            else {
                result.push(newTag);
                stack.push(newTag);
            }
            i++;
        }
        // 结束标签开始
        else if (html[i] === '<' && html[i + 1] === '/') {
            currentState = state.CLOSE_TAG_START;
            i++;
        }
        // 标签结束
        else if (html[i] === '>') {
            if (currentState === state.CLOSE_TAG_START) {
                currentState = state.TEXT;
                stack.pop();
            }
            if (currentState === state.TAG_START) {
                currentState = state.TEXT;
            }
            i++;
        }
        else if (currentState === state.TAG_START) {
            const top = stack[stack.length - 1];
            top.tagName += html[i];
            i++;
        }
        else if (currentState === state.TEXT) {
            const top = stack[stack.length - 1];
            const lastItem = top.children[top.children.length - 1];
            if (typeof lastItem === 'string') {
                top.children[top.children.length - 1] += html[i];
            }
            else {
                top.children.push(html[i])
            }
            i++;
        }
        else {
            i++
        }
    }

    return result;
}

const input = '<div><div>6</div><h1> Title </h1><p>Some description. </p></div>';

console.log(JSON.stringify(parse(input)));