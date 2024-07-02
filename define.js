const a = [1,2,3]

Object.defineProperty(a, 0, {
    enumerable: true,
    configurable: true,
    get(...args) {
        console.log(args)
    },
    set(...args) {
        console.log(args)
    },
})

a[0] = 1