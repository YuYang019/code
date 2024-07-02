
function request(value, delay) {
    return () => new Promise(resolve => {
        console.log('begin', value);
        setTimeout(() => {
            resolve(value);
        }, delay);
    })
}

function sendRequest(list, limit) {
    return new Promise(resolve => {
        const result = [];
        let index = 0;
        let count = 0;

        const startRequest = (i) => {
            const request = list[i];
            request().then(res => {
                result[i] = res;
                count--;
                run();
                if (count === 0 && index >= list.length) {
                    resolve(result);
                }
            })
        }

        const run = () => {
            while (count < limit && index < list.length) {
                startRequest(index);
                count++;
                index++;
            }
        }

        run();
    });
}

sendRequest([
    request(1, 1000),
    request(5, 5000),
    request(3, 3000),
    request(2, 2000),
    request(4, 4000),
], 1).then(res => {console.log(res)})