Array.prototype.myReduce = function(callback, initVal) {
    let arr = this;
    let result = initVal;

    if (!initVal) {
        result = arr[0];
        arr = arr.slice(1);
    }

    // 累加是在回调里面操作的，外部只做调用，不做加法
    arr.forEach((item, index) => {
        result = callback(result, item)
    })

    return result;
};

const result = [1,2,3,4].myReduce((prev, next) => {
    return prev + next;
}, 10);

console.log(result);