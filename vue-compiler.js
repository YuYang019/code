
const state = {
    text: 0,

    tagStart: 1, // <
    inTagName: 2, // div
    tagEnd: 3, // >

    closeTagStart: 4, // </
    inCloseTagName: 5, // div
    closeTagEnd: 6, // >

    expStart: 7, // {{
    inExp: 8,  // data.name
    expEnd: 9, // }}
}

function parse(str) {
    const stack = [];
    const result = [];

    str = str.trim();

    let currentState = state.text;
    let i = 0;
    let sectionStart = 0;

    while (i < str.length) {
        switch (currentState) {
            case state.text:
                stateText();
                break;
            case state.tagStart:
                stateTagStart();
                break;
            case state.inTagName:
                stateInTagName();
                break;
            case state.tagEnd:
                stateTagEnd();
                break;
            case state.closeTagStart:
                stateCloseTagStart();
                break;
            case state.inCloseTagName:
                stateInCloseTagName();
                break;
            case state.closeTagEnd:
                stateCloseTagEnd();
                break;
            case state.expStart:
                stateExpStart();
                break;
            case state.inExp:
                stateInExp();
                break;
            case state.expEnd:
                stateExpEnd();
                break;
        }
    }

    function stateText() {
        if (str[i] === '<') {
            currentState = state.tagStart;
            i++;
            sectionStart = i;
        }
        else if (str[i] === '{' && str[i + 1] === '{') {
            currentState = state.expStart;
            i += 2;
            sectionStart = i;
        }
        else {
            if (stack.length) {
                const top = stack[stack.length - 1];
                if (
                    !top.children.length
                    || top.children[top.children.length - 1].type !== 'Text'
                ) {
                    const textNode = {
                        type: 'Text',
                        content: str[i],
                    }
                    top.children.push(textNode);
                }
                else {
                    top.children[top.children.length - 1].content += str[i];
                }
            }
            else {
                const textNode = {
                    type: 'Text',
                    content: str[i],
                }
                if (!result.length || result[result.length - 1].type !== 'Text') {
                    result.push(textNode);
                }
                if (result.length && result[result.length - 1].type === 'Text') {
                    result[result.length - 1].content += str[i];
                }
            }
            i++;
        }
    }

    function stateTagStart() {
        if (/\w/.test(str[i])) {
            currentState = state.inTagName;
            i++;

            const node = {
                type: 'Element',
                tagName: '',
                children: [],
            };

            stack.push(node);
        }
        if (str[i] === '/') {
            currentState = state.closeTagStart;
            i++;
            sectionStart = i;
        }
    }

    function stateInTagName() {
        if (str[i] === '>') {
            currentState = state.tagEnd;

            const tagName = str.slice(sectionStart, i);
            stack[stack.length - 1].tagName = tagName;
        }
        else {
            i++;
        }
    }

    function stateTagEnd() {
        currentState = state.text;
        sectionStart = 0;
        i++;
    }

    function stateCloseTagStart() {
        if (/\w/.test(str[i])) {
            currentState = state.inCloseTagName;
            i++;
        }
    }

    function stateInCloseTagName() {
        if (str[i] === '>') {
            currentState = state.closeTagEnd;

            const tagName = str.slice(sectionStart, i);
            const top = stack.pop();
            if (top.tagName !== tagName) {
                console.error(`Tag ${tagName}) is not closed`);
            }
            if (stack.length) {
                stack[stack.length - 1].children.push(top);
            }
            else {
                result.push(top);
            }
        }
        else {
            i++;
        }
    }

    function stateCloseTagEnd() {
        currentState = state.text;
        sectionStart = 0;
        i++;
    }

    function stateExpStart() {
        if (/\s|\w|\.|\d/.test(str[i])) {
            currentState = state.inExp;

            const node = {
                type: 'Expression',
                content: str[i],
            }

            stack[stack.length - 1].children.push(node);

            i++;
        }
    }

    function stateInExp() {
        if (str[i] === '}' && str[i + 1] === '}') {
            currentState = state.expEnd;
            i += 2;
        }
        else {
            const children = stack[stack.length - 1].children;
            children[children.length - 1].content += str[i];
            i++;
        }
    }

    function stateExpEnd() {
        currentState = state.text;
        i++;
    }

    return result;
}

function createElement() {}

function createText() {}

function render(ctx) {
    return createElement('div', null, [
        createText('123123'),
        createElement('span', null, [
            createText('my name is '),
            createText(ctx.data.name),
            createText(' hello'),
        ]),
    ])
}

function codegen(ast) {
    let content = '';

    content += 'function render(ctx) { \n return ';

    const generate = (data) => {
        for (const node of data) {
            if (node.type === 'Text') {
                content += `createText('${node.content}'), \n`;
            }
            if (node.type === 'Element') {
                content += `createElement('${node.tagName}', null, [`;
                if (!node.children.length) {
                    content += '])';
                }
                else {
                    content += '\n';
                    generate(node.children);
                    content += '\n ])';
                }
            }
            if (node.type === 'Expression') {
                content += `createText(ctx.${node.content}), \n`;
            }
        }
    }

    generate(ast);

    return content;
}

const input = '<div>123123 <span>my name is {{data.name}} hello</span></div>'

const ast = parse(input)
console.log(JSON.stringify(ast));

console.log(codegen(ast));