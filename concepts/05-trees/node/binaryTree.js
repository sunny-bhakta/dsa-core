/**
 * Binary Tree Implementation in Node.js
 */

class TreeNode {
    /**
     * Node class for binary tree
     */
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class BinaryTree {
    /**
     * Binary Tree Implementation
     */
    constructor(root = null) {
        this.root = root;
    }

    /**
     * Inorder: Left, Root, Right - O(n)
     */
    inorderTraversal(root = null) {
        if (root === null) {
            root = this.root;
        }

        const result = [];

        function inorder(node) {
            if (node) {
                inorder(node.left);
                result.push(node.val);
                inorder(node.right);
            }
        }

        inorder(root);
        return result;
    }

    /**
     * Preorder: Root, Left, Right - O(n)
     */
    preorderTraversal(root = null) {
        if (root === null) {
            root = this.root;
        }

        const result = [];

        function preorder(node) {
            if (node) {
                result.push(node.val);
                preorder(node.left);
                preorder(node.right);
            }
        }

        preorder(root);
        return result;
    }

    /**
     * Postorder: Left, Right, Root - O(n)
     */
    postorderTraversal(root = null) {
        if (root === null) {
            root = this.root;
        }

        const result = [];

        function postorder(node) {
            if (node) {
                postorder(node.left);
                postorder(node.right);
                result.push(node.val);
            }
        }

        postorder(root);
        return result;
    }

    /**
     * Level-order (BFS) - O(n)
     */
    levelOrderTraversal(root = null) {
        if (root === null) {
            root = this.root;
        }

        if (!root) {
            return [];
        }

        const result = [];
        const queue = [root];

        while (queue.length > 0) {
            const levelSize = queue.length;
            const level = [];

            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift();
                level.push(node.val);

                if (node.left) {
                    queue.push(node.left);
                }
                if (node.right) {
                    queue.push(node.right);
                }
            }

            result.push(level);
        }

        return result;
    }

    /**
     * Maximum depth/height - O(n)
     */
    maxDepth(root = null) {
        if (root === null) {
            root = this.root;
        }

        if (!root) {
            return 0;
        }

        return 1 + Math.max(this.maxDepth(root.left), this.maxDepth(root.right));
    }

    /**
     * Check if tree is balanced - O(n)
     */
    isBalanced(root = null) {
        if (root === null) {
            root = this.root;
        }

        function checkBalance(node) {
            if (!node) {
                return [0, true];
            }

            const [leftHeight, leftBalanced] = checkBalance(node.left);
            const [rightHeight, rightBalanced] = checkBalance(node.right);

            const balanced = (leftBalanced && rightBalanced &&
                Math.abs(leftHeight - rightHeight) <= 1);

            return [Math.max(leftHeight, rightHeight) + 1, balanced];
        }

        const [, balanced] = checkBalance(root);
        return balanced;
    }
}

class BinarySearchTree {
    /**
     * Binary Search Tree Implementation
     */
    constructor() {
        this.root = null;
    }

    /**
     * Insert value - O(log n) average, O(n) worst
     */
    insert(val) {
        this.root = this._insert(this.root, val);
    }

    _insert(node, val) {
        if (!node) {
            return new TreeNode(val);
        }

        if (val < node.val) {
            node.left = this._insert(node.left, val);
        } else if (val > node.val) {
            node.right = this._insert(node.right, val);
        }

        return node;
    }

    /**
     * Search for value - O(log n) average, O(n) worst
     */
    search(val) {
        return this._search(this.root, val);
    }

    _search(node, val) {
        if (!node || node.val === val) {
            return node;
        }

        if (val < node.val) {
            return this._search(node.left, val);
        }
        return this._search(node.right, val);
    }

    /**
     * Delete value - O(log n) average, O(n) worst
     */
    delete(val) {
        this.root = this._delete(this.root, val);
    }

    _delete(node, val) {
        if (!node) {
            return node;
        }

        if (val < node.val) {
            node.left = this._delete(node.left, val);
        } else if (val > node.val) {
            node.right = this._delete(node.right, val);
        } else {
            if (!node.left) {
                return node.right;
            } else if (!node.right) {
                return node.left;
            }

            // Node with two children
            const minNode = this._minValueNode(node.right);
            node.val = minNode.val;
            node.right = this._delete(node.right, minNode.val);
        }

        return node;
    }

    _minValueNode(node) {
        let current = node;
        while (current.left) {
            current = current.left;
        }
        return current;
    }

    /**
     * Validate BST - O(n)
     */
    isValid() {
        function validate(node, minVal = -Infinity, maxVal = Infinity) {
            if (!node) {
                return true;
            }

            if (node.val <= minVal || node.val >= maxVal) {
                return false;
            }

            return (validate(node.left, minVal, node.val) &&
                validate(node.right, node.val, maxVal));
        }

        return validate(this.root);
    }

    /**
     * Find LCA of two nodes - O(log n)
     */
    lowestCommonAncestor(p, q) {
        let node = this.root;

        while (node) {
            if (p < node.val && q < node.val) {
                node = node.left;
            } else if (p > node.val && q > node.val) {
                node = node.right;
            } else {
                return node.val;
            }
        }

        return null;
    }
}

// Example usage
if (require.main === module) {
    // Binary Tree
    console.log("--- Binary Tree ---");
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);

    const tree = new BinaryTree(root);
    console.log("Inorder:", tree.inorderTraversal());
    console.log("Preorder:", tree.preorderTraversal());
    console.log("Postorder:", tree.postorderTraversal());
    console.log("Level-order:", tree.levelOrderTraversal());
    console.log("Max depth:", tree.maxDepth());

    // BST
    console.log("\n--- Binary Search Tree ---");
    const bst = new BinarySearchTree();
    [5, 3, 7, 2, 4, 6, 8].forEach(val => bst.insert(val));

    console.log("Inorder:", new BinaryTree(bst.root).inorderTraversal());
    console.log("Search 4:", bst.search(4) !== null);
    console.log("Is valid BST:", bst.isValid());
    console.log("LCA of 2 and 4:", bst.lowestCommonAncestor(2, 4));
}

module.exports = { TreeNode, BinaryTree, BinarySearchTree };

