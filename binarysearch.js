class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr);
        this.inOrderValues = [];
        this.preOrderValues = [];
        this.postOrderValues = [];
    }
    root = this.root;
    buildTree(arr) {
        arr = [...new Set(this.sortArray(arr))];
        let node = this.makeTree(arr, 0, arr.length-1);
        return node;
    }
    insert(num, root = this.root) {
        if(root === null) {
            return new Node(num);
        }
        root.value < num
            ? (root.right = this.insert(num, root.right))
            : (root.left = this.insert(num, root.left));
        return root;
    }
    delete(num, root = this.root) {
        if (root === null) {
            return root;
        }
        if (root.value > num) {
            root.left = this.delete(num, root.left);
        } else if (root.value < num) {
            root.right = this.delete(num, root.right);
        } else {
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            } else {
                const smallestNode = (root) => {
                    let min = root.value;
                    let newMin = root;
                    while (newMin.left !== null) {
                        min = root.left.value;
                        newMin = root.left;
                    }
                    return min;
                }

                root.value = smallestNode(root.right);
                root.right = this.delete(root.value, root.right);
                // root.value = this.smallestNode(root);
                // root.right = this.delete(root.right, root.value);
            }
            
        }

        this.prettyPrint(this.root);
        return root;
    }
    // smallestNode(root) {
    //     let smallest = root.value;
    //     while (root !== null) {
    //         if (root === null) {
    //             break;
    //         } else {
                
    //         }
    //         smallest = root;
    //         root = root.left;
    //     }
    //     this.prettyPrint(this.root);
    //     return smallest;
    // }
    find(num, root = this.root) {
        if(root === null) {
            return false;
        }
        if (root.value === num) {
            return root;
        }
        if (root.value > num) {
            return this.find(num, root.left);
        } else if (root.value < num) {
            return this.find(num, root.right);
        }
        return root;
    }
    levelOrder(root = this.root) {
        const queue = [];
        const result = [];

        if (root === null) {
            return;
        }
        queue.push(root);
        while (queue.length > 0) {
            let current = queue.shift(root);
            result.push(current.value);
            if (current.left !== null) {
                queue.push(current.left);
            }
            if (current.right !== null) {
                queue.push(current.right);
            }
        }
        return result;
    }
    inOrder(root = this.root) {
        if (root === null) {
            return;
        }
        
        if (root.left !== null) {
            this.inOrder(root.left);
        }

        if (root.value !== undefined) {
            this.inOrderValues.push(root.value);
        }

        if (root.right !== null) {
            this.inOrder(root.right);
        }

        return this.inOrderValues;
    }
    preOrder(root = this.root) {
        if (root === null) {
            return;
        }

        if (root.value !== undefined) {
            this.preOrderValues.push(root.value);
        }
        
        if (root.left !== null) {
            this.preOrder(root.left);
        }

        if (root.right !== null) {
            this.preOrder(root.right);
        }

        return this.preOrderValues;
    }
    postOrder(root = this.root) {
        if (root === null) {
            return;
        }
        
        if (root.left !== null) {
            this.postOrder(root.left);
        }

        if (root.right !== null) {
            this.postOrder(root.right);
        }

        if (root.value !== undefined) {
            this.postOrderValues.push(root.value);
        }

        return this.postOrderValues;
    }
    height(root = this.root) {
        if (root === null) {
            return -1;
        } else {
            let left = this.height(root.left);
            let right = this.height(root.right);

            return Math.max(left, right) + 1;
        }
    }
    depth(node, edges = 0, root = this.root) {
        if (root === null) {
            return;
        }

        if (root.value === node) {
            return edges;
        }

        if (root.value > node) {
            return this.depth(node, (edges + 1), root.left);
        } else {
            return this.depth(node, (edges + 1), root.right);
        }
    }
    isBalanced(root = this.root) {
        if (root === null) {
            return false;
        }
        let left = root.left;
        let right = root.right;

        if (Math.abs(this.height(left) - this.height(right)) > 1) {
            return false;
        } else {
            return true;
        }
    }
    rebalance(root = this.root) {
        this.prettyPrint(root);

        let treeFix = this.levelOrder();
        treeFix.sort((a, b) => a - b);
        this.root = this.buildTree(treeFix);
        
        return this.isBalanced();
    }
    prettyPrint = (node, prefix = "", isLeft = true) =>  {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "|   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
    makeTree(arr, start, end) {
        if (start > end) {
            return null;
        }
        
        const mid = parseInt((start + end) / 2);
        let node = new Node(arr[mid]);
        node.left = this.makeTree(arr, start, mid - 1);
        node.right = this.makeTree(arr, mid + 1, end);
        return node;
    }
    sortArray(arr) {
        if (arr.length <= 1) {
            return arr;
        }

        const mid = parseInt(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);

        return merge(
            this.sortArray(left),
            this.sortArray(right)
        );

        function merge(left, right) {
            let result = [];
            let leftIndex = 0;
            let rightIndex = 0;

            while (leftIndex < left.length && rightIndex < right.length) {
                if (left[leftIndex] < right[rightIndex]) {
                    result.push(left[leftIndex]);
                    leftIndex++;
                } else {
                    result.push(right[rightIndex]);
                    rightIndex++;
                }
            }

            return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
        }
    }
}



// let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// let array = [1, 2, 3, 4, 5, 6, 7];
// let t1 = new Tree(array);
// let root = t1.root;

// let newNum = 6;
// let oldNum = 5;
// console.log(t1.isBalanced());
// t1.delete(1);
// t1.delete(8);
// t1.insert(10000);
// t1.delete(4);
// console.log(t1.isBalanced());
// t1.rebalance();
// console.log(t1.isBalanced());

// root = t1.root;
// console.log(t1.find(oldNum));
// console.log(t1.levelOrder());
// console.log(t1.inOrder());
// console.log(t1.preOrder());
// console.log(t1.postOrder());
// console.log(root.right.right.right);
// console.log(t1.height(root.right.right.right));
// console.log(root.right);
// console.log(t1.height(root.right));
// console.log(t1.depth(oldNum));
// console.log(t1.depth(324));
// console.log(t1.depth(7));
// console.log(t1.depth(8));

// 1. Create a bst from random numbers
let array = [1, 9, 69, 420, 1098, 1444, 2386, 4, 21, 8218];
let balancedTree = new Tree(array);
let root = balancedTree.root;
// 2. Confirm tree is balanced with isBalanced()
balancedTree.prettyPrint(root);
console.log(balancedTree.isBalanced());
// 3. Print out elements in level, pre, post, and in order
console.log(balancedTree.levelOrder());
console.log(balancedTree.preOrder())
console.log(balancedTree.postOrder())
console.log(balancedTree.inOrder())
// 4. Unbalance tree
console.log(balancedTree.find(69));
balancedTree.insert(101);
balancedTree.insert(898);
balancedTree.insert(999);
balancedTree.prettyPrint(root);
// 5. Confirm tree is unbalanced with isBalanced()
console.log(balancedTree.isBalanced());
// 6. Balance tree with rebalance
console.log(balancedTree.rebalance());
root = balancedTree.root;
balancedTree.prettyPrint(root);
// 7. Confirm tree is balanced with isBalanced()
console.log(balancedTree.isBalanced());
// 8. Print out elements in level, pre, post, and in order
console.log(balancedTree.levelOrder());
console.log(balancedTree.preOrder())
console.log(balancedTree.postOrder())
console.log(balancedTree.inOrder())
