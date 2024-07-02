// 输入 45dss 返回 ['广东省', '深圳市']
const cityData = [
    {
        id: 'axzx',
        name: '广东省',
        children: [
            {
                id: 'sdsd',
                name: '深圳市',
                children: [
                    {
                        id: '45dss',
                        name: '南山区',
                    },
                    {
                        id: 'sdsd11',
                        name: '福田区',
                        children: [
                            {
                                id: 'ddrr2',
                                name: 'A街道',
                            },
                        ],
                    },
                ],
            },
            {
                id: '2323d',
                name: '东莞市',
                children: [
                    {
                        id: 'xxs2',
                        name: 'A区',
                    },
                    {
                        id: 'kklio2',
                        name: 'B区',
                    },
                ],
            },
        ],
    },
];

function findParents(data, nodeId) {
    let result = []; // 用于存储父级节点的数组

    function search(nodes, id, parents) {
        // 遍历当前层的每个节点
        for (let node of nodes) {
            // 判断当前节点是否是目标节点
            if (node.id === id) {
                result = parents; // 将当前路径保存到结果数组中
                return true; // 找到目标，停止搜索
            }
            // 否则，如果当前节点有子节点，继续向下搜索
            if (node.children && node.children.length > 0) {
                // 在父级节点列表中添加当前节点
                const newParents = parents.concat(node.name);
                // 这里是精髓，如果返回 true，可以让函数立即返回
                // 不再进行接下来的 let ... of 遍历，减少计算
                if (search(node.children, id, newParents)) {
                    return true; // 子树中找到目标，停止搜索
                }
            }
        }
        return false; // 当前子树中未找到目标
    }

    search(data, nodeId, []); // 从根节点开始搜索
    return result; // 返回所有父级节点组成的数组
}

function findParentsBFS(data, targetId) {
    const queue = data.map(root => ({ node: root, path: [] })); // 初始化队列

    // 只要队列不为空，就继续搜索
    while (queue.length) {
        const { node, path } = queue.shift(); // 获取队列的第一个元素

        // 检查当前节点是否是目标节点
        if (node.id === targetId) {
            return path; // 返回目标节点的所有父节点
        }

        // 如果不是目标节点且存在子节点，加入队列继续查找
        if (node.children) {
            for (const child of node.children) {
                queue.push({
                    node: child,
                    path: [...path, node.name], // 把当前节点名加入路径
                });
            }
        }
    }

    return []; // 如果未找到节点，则返回空数组
}

// findParentPath(cityData, '45dss', []);
console.log(findParents(cityData, 'ddrr2'));
console.log(findParentsBFS(cityData, 'xxs2'));

// bfs(cityData, '45dss');