// 从对象隐式原型，不断向上找，判断是否存在构造函数的原型
function instance_of (obj, constructor) {
    const prototype = constructor.prototype
    let proto = obj.__proto__

    while (proto) {
        if (proto === prototype) {
            return true
        }
        proto = proto.__proto__
    }

    return false
}

instance_of({}, Object)

