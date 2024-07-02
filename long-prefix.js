// 最长前缀

function fn(arr) {
    const firstWord = arr[0];
    const count = arr.length;
    // 以第一个单词作为循环基础，每次循环取当前字符，和剩下单词的当前字符进行比较
    // 一列列对比
    for (let i = 0; i < firstWord.length; i++) {
        const char = firstWord[i];
        for (let j = 1; j < count; j++) {
            const word = arr[j];
            if (word[i] !== char || i === word.length) {
                return firstWord.slice(0, i);
            }
        }
    }
    return firstWord;
}

console.log(fn(['flower', 'flow', 'flight']));