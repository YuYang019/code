function intersection(a, b) {
    const result = [];
    const map = {};

    a.forEach(item => {
        map[item] = true;
    });

    b.forEach(item => {
        if (map[item]) {
            result.push(item);
        }
    });

    return result;
}

console.log(intersection([1, 2, 2, 3], [2, 2, 4, 5]));