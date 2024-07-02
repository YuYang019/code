function throttle(fn, time, immediate) {
    let lastTime = 0;
    let hasCall = false;
    let timeout = null;

    return (...args) => {
        const startTime = Date.now();
        const diffTime = startTime - lastTime;

        if (immediate && !hasCall) {
            lastTime = startTime;
            hasCall = true;
            fn(...args);
        }

        // 如果在时间段内连续触发，只执行一次
        if (diffTime < time) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                lastTime = Date.now();
                fn(...args);
            }, time);
        }
        // 超出时间段，直接触发
        else if (diffTime >= time) {
            lastTime = startTime;
            fn(...args);
        }
    }
}

// 重复执行，只执行最后一次
function debounce(fn, time) {
    let timeout = null;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn(...args);
        }, time)
    }
}