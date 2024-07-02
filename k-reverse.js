// k 个一组反转

function initList(len) {
    const startNode = {
        value: 0,
    };

    let i = 0
    let temp = startNode;
    while (i < len) {
        const nextNode = {value: i + 1}
        temp.next = nextNode;
        temp = temp.next;
        i++;
    }

    return startNode;
}

function printList(node) {
    let temp = node;
    while (temp) {
        console.log(temp.value);
        temp = temp.next;
    }
}

const node = initList(6);
// printList(node);

// 反转链表 1->2->3->4
function reverse(head) {
    let prev = null;
    let curr = head
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

// 反转 [a, b) 之间的链表，前闭后开
function reverse(a, b) {
    let prev = null;
    let curr = a;
    while (curr !== b) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

// 思路：既然是k个一组，先反转k个，反转之后拿尾部和剩下链表继续反转，递归
// 1,2,3,4,5,6  k = 2
// 2,1,4,3,6,5
function run(head, k) {
    if (!head) {
        return head;
    }

    let a = head;
    let b = head;
    for (let i = 0; i < k; i++) {
        if (!b) {
            return head;
        }
        b = b.next;
    }

    const newHead = reverse(a, b);

    // 反转之后，a 相当于尾部，继续连接下一端点
    a.next = run(b, k);

    return newHead;
}

const head2 = run(node, 2);
printList(head2);