function partition(arr) {
    const pivotIndex = 0
    const pivot = arr[pivotIndex]

    let i = pivotIndex + 1
    let j = arr.length - 1

    const swap = (left, right) => {
        const temp = arr[left]
        arr[left] = arr[right]
        arr[right] = temp
    }

    while (i < j) {
        if (arr[j] < pivot) {
            swap(i, j)
            i++
        }
        else {
            j--
        }
    }

    swap(pivotIndex, i)

    return arr
}

console.log(partition([4,0,5,6,1,2,68,3,42]))