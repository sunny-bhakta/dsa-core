/**
 * Advanced Tree Implementations in Node.js
 */

class AVLNode {
    /**
     * Node for AVL Tree
     */
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    /**
     * AVL Tree - Self-balancing Binary Search Tree
     */
    constructor() {
        this.root = null;
    }

    /**
     * Get height of node
     */
    getHeight(node) {
        if (!node) {
            return 0;
        }
        return node.height;
    }

    /**
     * Get balance factor
     */
    getBalance(node) {
        if (!node) {
            return 0;
        }
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    /**
     * Right rotation
     */
    rightRotate(y) {
        const x = y.left;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
        x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));

        return x;
    }

    /**
     * Left rotation
     */
    leftRotate(x) {
        const y = x.right;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
        y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));

        return y;
    }

    /**
     * Insert value with balancing
     */
    insert(val) {
        this.root = this._insert(this.root, val);
    }

    _insert(node, val) {
        if (!node) {
            return new AVLNode(val);
        }

        if (val < node.val) {
            node.left = this._insert(node.left, val);
        } else if (val > node.val) {
            node.right = this._insert(node.right, val);
        } else {
            return node; // Duplicate values not allowed
        }

        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
        const balance = this.getBalance(node);

        // Left Left Case
        if (balance > 1 && val < node.left.val) {
            return this.rightRotate(node);
        }

        // Right Right Case
        if (balance < -1 && val > node.right.val) {
            return this.leftRotate(node);
        }

        // Left Right Case
        if (balance > 1 && val > node.left.val) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }

        // Right Left Case
        if (balance < -1 && val < node.right.val) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }

        return node;
    }

    /**
     * Inorder traversal
     */
    inorder() {
        const result = [];

        function traverse(node) {
            if (node) {
                traverse(node.left);
                result.push(node.val);
                traverse(node.right);
            }
        }

        traverse(this.root);
        return result;
    }
}

class SegmentTree {
    /**
     * Segment Tree for Range Queries
     */
    constructor(arr) {
        this.n = arr.length;
        this.size = 1;
        while (this.size < this.n) {
            this.size *= 2;
        }
        this.tree = new Array(2 * this.size).fill(0);
        this.build(arr);
    }

    /**
     * Build segment tree
     */
    build(arr) {
        for (let i = 0; i < this.n; i++) {
            this.tree[this.size + i] = arr[i];
        }
        for (let i = this.size - 1; i > 0; i--) {
            this.tree[i] = this.tree[2 * i] + this.tree[2 * i + 1];
        }
    }

    /**
     * Update value at index
     */
    update(index, value) {
        index += this.size;
        this.tree[index] = value;
        index = Math.floor(index / 2);
        while (index) {
            this.tree[index] = this.tree[2 * index] + this.tree[2 * index + 1];
            index = Math.floor(index / 2);
        }
    }

    /**
     * Query sum in range [l, r)
     */
    query(l, r) {
        l += this.size;
        r += this.size;
        let result = 0;

        while (l < r) {
            if (l % 2 === 1) {
                result += this.tree[l];
                l++;
            }
            if (r % 2 === 1) {
                r--;
                result += this.tree[r];
            }
            l = Math.floor(l / 2);
            r = Math.floor(r / 2);
        }

        return result;
    }
}

class FenwickTree {
    /**
     * Fenwick Tree (Binary Indexed Tree) for Prefix Sum
     */
    constructor(n) {
        this.n = n;
        this.tree = new Array(n + 1).fill(0);
    }

    /**
     * Update value at index
     */
    update(index, delta) {
        index++;
        while (index <= this.n) {
            this.tree[index] += delta;
            index += index & -index;
        }
    }

    /**
     * Query prefix sum from 0 to index
     */
    query(index) {
        index++;
        let result = 0;
        while (index > 0) {
            result += this.tree[index];
            index -= index & -index;
        }
        return result;
    }

    /**
     * Query sum in range [l, r]
     */
    rangeQuery(l, r) {
        return this.query(r) - this.query(l - 1);
    }
}

class SuffixTreeNode {
    /**
     * Node for Suffix Tree
     */
    constructor() {
        this.children = {};
        this.start = -1;
        this.end = -1;
        this.suffixLink = null;
    }
}

class SuffixTree {
    /**
     * Suffix Tree - Compact representation of all suffixes
     */
    constructor(text) {
        this.text = text + '$';
        this.root = new SuffixTreeNode();
        this.build();
    }

    /**
     * Build suffix tree using Ukkonen's algorithm (simplified)
     */
    build() {
        // Simplified implementation - full Ukkonen's is complex
        const n = this.text.length;
        for (let i = 0; i < n; i++) {
            this._insertSuffix(i);
        }
    }

    /**
     * Insert suffix starting at index
     */
    _insertSuffix(start) {
        let node = this.root;
        let i = start;

        while (i < this.text.length) {
            const char = this.text[i];
            if (!(char in node.children)) {
                node.children[char] = new SuffixTreeNode();
                node.children[char].start = i;
                node.children[char].end = this.text.length - 1;
                return;
            }

            const child = node.children[char];
            // Simplified - would need edge splitting in full implementation
            node = child;
            i++;
        }
    }

    /**
     * Search for pattern in suffix tree
     */
    search(pattern) {
        let node = this.root;
        let i = 0;

        while (i < pattern.length) {
            if (!(pattern[i] in node.children)) {
                return false;
            }
            node = node.children[pattern[i]];
            i++;
        }

        return true;
    }
}

// Example usage
if (require.main === module) {
    // AVL Tree
    console.log("--- AVL Tree ---");
    const avl = new AVLTree();
    [10, 20, 30, 40, 50, 25].forEach(val => avl.insert(val));
    console.log("AVL Tree inorder:", avl.inorder());
    console.log("Root value:", avl.root.val);
    console.log("Balance factor:", avl.getBalance(avl.root));

    // Segment Tree
    console.log("\n--- Segment Tree ---");
    const arr = [1, 3, 5, 7, 9, 11];
    const segTree = new SegmentTree(arr);
    console.log("Array:", arr);
    console.log("Sum [1, 4]:", segTree.query(1, 5));
    segTree.update(2, 10);
    console.log("After update index 2 to 10, Sum [1, 4]:", segTree.query(1, 5));

    // Fenwick Tree
    console.log("\n--- Fenwick Tree ---");
    const arr2 = [1, 3, 5, 7, 9, 11];
    const fenwick = new FenwickTree(arr2.length);
    arr2.forEach((val, i) => fenwick.update(i, val));
    console.log("Array:", arr2);
    console.log("Prefix sum [0, 3]:", fenwick.rangeQuery(0, 3));
    console.log("Prefix sum [2, 5]:", fenwick.rangeQuery(2, 5));

    // Suffix Tree
    console.log("\n--- Suffix Tree ---");
    const suffixTree = new SuffixTree("banana");
    console.log("Search 'ana':", suffixTree.search("ana"));
    console.log("Search 'ban':", suffixTree.search("ban"));
    console.log("Search 'xyz':", suffixTree.search("xyz"));
}

module.exports = { AVLTree, SegmentTree, FenwickTree, SuffixTree };


