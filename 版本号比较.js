function compare(a, b) {
    const aArr = a.split('.');
    const bArr = b.split('.');

    if (aArr.length < bArr.length) {
        const diff = bArr.length - aArr.length;
        for (let i = 0; i < diff; i++) {
            aArr.push(0);
        }
    }
    else {
        const diff = aArr.length - bArr.length;
        for (let i = 0; i < diff; i++) {
            bArr.push(0);
        }
    }

    for (let i = 0; i < aArr.length; i++) {
        const aNum = parseInt(aArr[i], 10);
        const bNum = parseInt(bArr[i], 10);

        if (aNum > bNum) {
            return true;
        }
        if (aNum < bNum) {
            return false;
        }
        if (aNum === bNum) {
            continue;
        }
    }
}

console.log(compare('1', '1.1.3'))