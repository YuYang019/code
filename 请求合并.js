// 设计：type Request = (ids: string[]) => Promise<Record<string, unknown>[]>
// 提供 type ApiRequest = Request 用于发起网络请求

// 调用 test1 方法后，仅调用一次 ApiRequest，入参为 [1, 2]
async function test1() {
    request([1, 2]).then(res => console.log(res)); // => [{id: 1}, {id: 2}]
    request([1, 2]).then(res => console.log(res)); // => [{id: 1}, {id: 2}]
}

// 调用 test2 方法后，仅调用一次 ApiRequest，入参为 [1, 2, 3]
async function test2() {
    request([1, 2]).then(res => console.log(res)); // => [{id: 1}, {id: 2}]
    request([1, 2]).then(res => console.log(res)); // => [{id: 1}, {id: 2}]
    request([1, 2, 3]).then(res => console.log(res)); // => [{id: 1}, {id: 2}, {id: 3}]
}

// 调用 test3 方法后，分别堵塞调用两次 ApiRequest，入参为 [1, 2] 和 [3]
async function test3() {
    await request([1, 2]).then(res => console.log(res)); // => [{id: 1}, {id: 2}]
    request([1, 2]).then(res => console.log(res)); // => [{id: 1}, {id: 2}]
    request([1, 2, 3]).then(res => console.log(res)); // => [{id: 1}, {id: 2}, {id: 3}]
}

// 面试的时候没写出来，卡在几个点
// 1、怎么做请求合并？一开始想的是用 join，判断相同 key，但这样不行
// 2、究竟什么时候发起请求，合并之后怎么处理之前的请求
// 3、对于 test3，怎么做参数过滤？

let timer = null
const requestIds = []
const pendingTasks = []
const cache = {}

function createPromise() {
    let resolve = null
    let reject = null
    const promise = new Promise((_resolve, _reject) => {
        resolve = _resolve
        reject = _reject
    })
    return {
        resolve,
        reject,
        promise
    }
}

function request(ids) {
    const {resolve, reject, promise} =  createPromise()

    ids.forEach(id => {
        // 参数里没有，且没有缓存，则加入请求队列
        if (!requestIds.includes(id) && !cache[id]) {
            requestIds.push(id)
        }
    })

    const startRequest = async () => {
        console.log('start request', requestIds)

        requestIds.forEach(id => {
            cache[id] = {id}
        })

        pendingTasks.forEach(task => {
            const {ids, resolve} = task;
            const res = ids.map(id => cache[id])
            resolve(res)
        })

        requestIds.length = 0
        pendingTasks.length = 0
    }

    pendingTasks.push({
        ids,
        resolve,
        reject,
    })

    clearTimeout(timer)

    timer = setTimeout(startRequest, 0)

    return promise
}

// test1()

// test2()

test3()