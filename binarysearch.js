class Node {
    constructor(value) {
        this.value = value;
        this.left = [];
        this.right = [];
    }
}

class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr);
    }

    buildTree(arr) {
        arr = [...new Set(this.sortArray(arr))];
        let node = this.makeTree(arr, 0, arr.length-1);
        let mid = parseInt(arr.length / 2);
        return this.prettyPrint(node);
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
let tree = new Tree(array);

console.log(tree);