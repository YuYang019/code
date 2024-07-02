class Node {
    constructor() {
        this.next = null;
        this.value = null;
    }
}

function initList(arr) {
    let prevNode = null
    let head;
    for (let i = 0; i < arr.length; i++) {
        const node = new Node();
        node.value = arr[i];
        if (i === 0) {
            head = node;
        }
        if (prevNode) {
            prevNode.next = node;
        }
        prevNode = node;
    }
    return head;
}

function printList(head) {
    while (head) {
        console.log(head.value);
        head = head.next;
    }
}

const head = initList([1,2,3,4,5]);
// printList(head);

function delNode(head, k) {
    let prevLeft = head;
    let left = head;
    let right = head;

    // 先走 n 步
    for (let i = 0; i < k - 1; i++) {
        right = right.next;
    }

    // 同时走到底
    while (right.next) {
        right = right.next;
        prevLeft = left;
        left = left.next;
    }

    // 删除
    prevLeft.next = left.next;

    return head;
}

delNode(head, 3)
printList(head);