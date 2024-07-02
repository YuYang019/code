function fn(data) {
    const path = [];

    const search = (node, level) => {
        if (!node) {
            return;
        }
        if (level === path.length) {
            path.push(node.val);
        }
        node.left && fn(node.left, level + 1);
        node.right && fn(node.right, level + 1);
    }

    search(data, 0);

    return path;
}

fn(root);