function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

function isArray(obj) {
    return Array.isArray(obj);
}

const map = new Map()
function deepClone(obj) {
    if (typeof obj === 'object') {
        if (map.has(obj)) {
            return map.get(obj);
        }
        if (isArray(obj)) {
            const cloned = obj.map(item => deepClone(item))
            map.set(obj, cloned)
            return cloned;
        }
        if (isObject(obj)) {
            const cloned = {};
            Object.keys(obj).forEach(key => {
                cloned[key] = deepClone(obj[key])
            })
            map.set(obj, cloned)
            return cloned;
        }
    }
    return obj;
}

const a = {obj: 1, arr: [1, 2, {name: 3}]};
const b = [1, 2, {name: 3}];
const c = {foo: a, bar: b};

console.log(a === deepClone(a))
console.log(b === deepClone(b))

const d = deepClone(c)
console.log(d.foo === a)
console.log(d.bar === b)

d.foo.arr[0] = 'hello';
console.log(d.foo.arr);
console.log(a.arr);
