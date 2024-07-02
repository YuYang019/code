// Monkey('Alan').eat('Banana').sleep(4).eat('Apple').sleep(5).eat('Pear');

function Monkey(name) {
    const queue = [];

    const createTask = (task) => {
        return () => new Promise(resolve => {
            task(resolve)
        })
    }

    queue.push(createTask(resolve => {
        console.log(`My name is ${name}`);
        resolve();
    }))

    const methods = {
        eat(name) {
            queue.push(createTask(resolve => {
                console.log(`Eat ${name}`);
                resolve();
            }));
            return methods;
        },
        sleep(second) {
            queue.push(createTask(resolve => {
                setTimeout(() => {
                    resolve()
                }, second * 1000);
            }));
            return methods;
        },
    }

    const runQueue = () => {
        queue.reduce((prev, next) => {
            return prev.then(next)
        }, Promise.resolve())
    }

    setTimeout(runQueue, 0);

    return methods;
}

Monkey('Alan').eat('Banana').sleep(2).eat('Apple').sleep(3).eat('Pear');