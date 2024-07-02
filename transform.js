function transform(obj) {
    const result = {};
    Object.keys(obj).forEach(k => {
        const arr = k.split('.');
        // 为了不影响结果值，需要用临时变量存储，做更新
        let temp = result;
        for (let i = 0; i < arr.length; i++) {
            const prop = arr[i];
            // 最后一层，赋值
            if (i === arr.length - 1) {
                temp[prop] = obj[k]
            }
            else {
                if (!temp[prop]) {
                    temp[prop] = {}
                }
                temp = temp[prop]
            }
        }
    });
    return result;
}

console.log(transform({
    'B.D.E': 3,
    'A': 1,
    'B.C': 2,
    'CC.DD.EE': 4,
}));