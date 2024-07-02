const template = '你好，<div @click="sayHello" class="name"><p>hello, my name is {{ name }}</p></div>  <span>111</span>'

const result = [{
    type: 'Element',
    tag: 'div',
    props: {
        onClick: 'sayHello',
        class: 'name'
    },
    children: [
        {
            type: 'Element',
            tag: 'p',
            children: [
                'hello, my name is ',
                {
                    type: 'Expression',
                    content: 'name'
                }
            ]
        }
    ],
}]

function parse(str) {

    const state = {
        text: 1,
        startTag: 2,
        attr: 3,
        endTag: 4,
        exp: 5,
    };

    let index = 0
    let currentState = state.text
    const stack = []
    const res = []

    let section = ''
    let props = {}

    while (index < str.length) {
        switch (currentState) {
            case state.text:
                stateText()
                break;
            case state.startTag:
                stateStartTag()
                break;
            case state.attr:
                stateAttr()
                break;
            case state.endTag:
                stateEndTag()
                break;
            case state.exp:
                stateExp()
                break;
            default:
                break;
        }
    }

    function addText() {
        if (!section.length) {
            return;
        }
        if (stack.length) {
            const top = stack[stack.length - 1]
            top.children.push(section)
        }
        else {
            // 文字不存在嵌套，直接加到结果数组
            res.push(section)
        }
        section = ''
    }

    function stateText() {
        if (str[index] === '<' && str[index + 1] === '/') {
            currentState = state.endTag;
            addText()
            index += 2
        }
        else if (str[index] === '<' && str[index + 1] !== '/') {
            currentState = state.startTag
            addText()
            index++
        }
        else if (str[index] === '{' && str[index + 1] === '{') {
            currentState = state.exp
            addText()
            index += 2
        }
        else {
            section += str[index]
            index++
        }
    }

    function stateStartTag() {
        if (str[index] === '>') {
            currentState = state.text
            const node = {
                type: 'Element',
                tag: section,
                props: {...props},
                children: []
            }
            section = ''
            props = {}

            // 存在嵌套关系，需要放到父级中
            if (stack.length) {
                stack[stack.length - 1].children.push(node)
            }
            stack.push(node)

            index++
        }
        else if (/[a-z]/.test(str[index])) {
            section += str[index]
            index++
        }
        else if (/\s/.test(str[index])) {
            currentState = state.attr
            index++
        }
        else {
            index++
        }
    }

    function stateAttr() {
        // ' @click="sayHello" class="name"  '
        let temp = ''
        while (str[index] !== '>') {
            temp += str[index]
            index++
        }

        const pattern = /([@\w]+)="(\w+)"/g
        let match
        while (match = pattern.exec(temp)) {
            const key = match[1]
            const value = match[2]
            props[key] = value
        }

        currentState = state.startTag
    }

    function stateEndTag() {
        if (/[a-z]/.test(str[index])) {
            section += str[index]
            index++
        }
        else if (str[index] === '>') {
            const top = stack.pop()
            if (top.tag !== section) {
                console.log('标签不匹配', top.tag, section)
            }
            if (stack.length === 0) {
                res.push(top)
            }
            currentState = state.text
            section = ''
            index++
        }
        else {
            index++
        }
    }

    function stateExp() {
        if (str[index] === '}' && str[index + 1] === '}') {
            currentState = state.text
            index += 2

            const node = {
                type: 'Expression',
                content: section,
            }

            if (stack.length) {
                stack[stack.length - 1].children.push(node)
            }
            else {
                // exp 不存在嵌套，直接加到结果数组
                res.push(node)
            }

            section = ''
        }
        else if (/\w/.test(str[index])) {
            section += str[index]
            index++
        }
        else {
            index++
        }
    }

    return res
}

console.log(JSON.stringify(parse(template)))