function MyPromise(callback) {
    this.state = 'pending';
    this.result = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    this.resolve = (res) => {
        if (this.state === 'pending') {
            this.state = 'fulfilled';
            this.result = res;
            this.onFulfilledCallbacks.forEach(cb => cb(res))
        }
    };

    this.reject = (reason) => {
        if (this.state === 'pending') {
            this.state = 'rejected';
            this.result = reason;
            this.onRejectedCallbacks.forEach(cb => cb(reason))
        }
    };

    try {
        callback(this.resolve, this.reject);
    } catch (err) {
        this.reject(err);
    }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
    const newPromise = new MyPromise((resolve, reject) => {
        if (this.state === 'pending') {
            // 还是 pending 状态，需要将 then 的回调函数存起来（then是异步执行，所以要考虑 pending 的情况）
            this.onFulfilledCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        if (typeof onFulfilled !== 'function') {
                            resolve(this.result)
                        }
                        else {
                            const res = onFulfilled(this.result)
                            resolve(res)
                        }
                    } catch (err) {
                        reject(err)
                    }
                })
            });
            this.onRejectedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        if (typeof onRejected !== 'function') {
                            reject(this.result)
                        }
                        else {
                            const res = onRejected(this.result)
                            // 这里是 resolve，catch 里面如果正常返回，还是能 then 的
                            resolve(res)
                        }
                    } catch (err) {
                        reject(err)
                    }
                })
            });
        }
        if (this.state === 'fulfilled') {
            setTimeout(() => {
                try {
                    if (typeof onFulfilled !== 'function') {
                        resolve(this.result)
                    }
                    else {
                        const res = onFulfilled(this.result)
                        resolve(res)
                    }
                } catch (err) {
                    reject(err)
                }
            })
        }
        if (this.state === 'rejected') {
            setTimeout(() => {
                try {
                    if (typeof onRejected !== 'function') {
                        reject(this.result)
                    }
                    else {
                        const res = onRejected(this.result)
                        resolve(res)
                    }
                } catch (err) {
                    reject(err)
                }
            })
        }
    });

    return newPromise;
}

MyPromise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
}

new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    }, 1000);
})
.then(res => {
    console.log(res)
    return 1
})
.then(res => {
    console.log(res)
    throw new Error('error')
})
.catch((err) => {
    console.log(err)
    return 2
})
.then(res => {
    console.log(res)
});

// setTimeout(() => {
//     console.log(1)

//     Promise.resolve().then(() => {
//         console.log(3);

//         Promise.resolve().then(() => {
//             console.log(4);

//             setTimeout(() => {
//                 console.log(5)
//             }, 0)
//         })
//     })
// }, 0)

// setTimeout(() => {
//     console.log(2)
// }, 0)