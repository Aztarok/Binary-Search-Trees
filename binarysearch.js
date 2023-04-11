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
        this.prettyPrint(this.root);
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
            }
            root.value = this.smallestNode(root);
            root.right = this.delete(root.right, root.value);
        }

        this.prettyPrint(this.root);
        return root;
    }
    smallestNode(root) {
        let smallest = root.value;
        while (root !== null) {
            smallest = root.value;
            root = root.left;
        }
        this.prettyPrint(this.root);
        return smallest;
    }
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



let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// let array = [1, 2, 3, 4, 5, 6, 7];
let t1 = new Tree(array);
let root = t1.root;

let newNum = 6;
let oldNum = 67;
// t1.insert(newNum);
// t1.delete(oldNum);

root = t1.root;
console.log(t1.find(oldNum));
console.log(t1.levelOrder());