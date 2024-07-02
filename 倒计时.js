function countdown(second) {
    const interval = 1000
    const startTime = Date.now()

    let timer = null
    let count = 0

    const tick = () => {
        const currentTime = Date.now()
        // 计数器，currentTime - startTime 代表实际间隔，一般 >= interval
        // count * interval 代表理想间隔，相减就是误差
        const diff = (currentTime - startTime) - (count * interval)
        const nextTime = interval - diff

        console.log('当前倒计时', second - count, '偏差', diff, 'ms', 'nextTime', nextTime)

        count++

        // 问题，耗时超过10秒，会卡住
        let sum = 0;
        for (let i = 0; i < 10000000000; i++) {
            sum += i;
        }

        if (count > second) {
            clearTimeout(timer)
        }
        else {
            timer = setTimeout(() => tick(), Math.max(0, nextTime))
        }

    }

    tick()
}

countdown(10)