/**
 * Red-Black Tree Implementation in Node.js
 */

class RBNode {
    /**
     * Node for Red-Black Tree
     */
    static RED = true;
    static BLACK = false;

    constructor(val) {
        this.val = val;
        this.color = RBNode.RED;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

class RedBlackTree {
    /**
     * Red-Black Tree - Self-balancing BST
     */
    constructor() {
        this.nil = new RBNode(0);
        this.nil.color = RBNode.BLACK;
        this.root = this.nil;
    }

    /**
     * Left rotation
     */
    leftRotate(x) {
        const y = x.right;
        x.right = y.left;

        if (y.left !== this.nil) {
            y.left.parent = x;
        }

        y.parent = x.parent;

        if (x.parent === this.nil) {
            this.root = y;
        } else if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }

        y.left = x;
        x.parent = y;
    }

    /**
     * Right rotation
     */
    rightRotate(x) {
        const y = x.left;
        x.left = y.right;

        if (y.right !== this.nil) {
            y.right.parent = x;
        }

        y.parent = x.parent;

        if (x.parent === this.nil) {
            this.root = y;
        } else if (x === x.parent.right) {
            x.parent.right = y;
        } else {
            x.parent.left = y;
        }

        y.right = x;
        x.parent = y;
    }

    /**
     * Insert value with RB tree properties
     */
    insert(val) {
        const z = new RBNode(val);
        z.left = this.nil;
        z.right = this.nil;

        let y = this.nil;
        let x = this.root;

        while (x !== this.nil) {
            y = x;
            if (z.val < x.val) {
                x = x.left;
            } else {
                x = x.right;
            }
        }

        z.parent = y;

        if (y === this.nil) {
            this.root = z;
        } else if (z.val < y.val) {
            y.left = z;
        } else {
            y.right = z;
        }

        z.color = RBNode.RED;
        this._insertFixup(z);
    }

    /**
     * Fix RB tree properties after insertion
     */
    _insertFixup(z) {
        while (z.parent.color === RBNode.RED) {
            if (z.parent === z.parent.parent.left) {
                const y = z.parent.parent.right;
                if (y.color === RBNode.RED) {
                    z.parent.color = RBNode.BLACK;
                    y.color = RBNode.BLACK;
                    z.parent.parent.color = RBNode.RED;
                    z = z.parent.parent;
                } else {
                    if (z === z.parent.right) {
                        z = z.parent;
                        this.leftRotate(z);
                    }
                    z.parent.color = RBNode.BLACK;
                    z.parent.parent.color = RBNode.RED;
                    this.rightRotate(z.parent.parent);
                }
            } else {
                const y = z.parent.parent.left;
                if (y.color === RBNode.RED) {
                    z.parent.color = RBNode.BLACK;
                    y.color = RBNode.BLACK;
                    z.parent.parent.color = RBNode.RED;
                    z = z.parent.parent;
                } else {
                    if (z === z.parent.left) {
                        z = z.parent;
                        this.rightRotate(z);
                    }
                    z.parent.color = RBNode.BLACK;
                    z.parent.parent.color = RBNode.RED;
                    this.leftRotate(z.parent.parent);
                }
            }
        }

        this.root.color = RBNode.BLACK;
    }

    /**
     * Search for value
     */
    search(val) {
        let x = this.root;
        while (x !== this.nil) {
            if (val === x.val) {
                return x;
            } else if (val < x.val) {
                x = x.left;
            } else {
                x = x.right;
            }
        }
        return null;
    }

    /**
     * Inorder traversal
     */
    inorder() {
        const result = [];

        const traverse = (node) => {
            if (node !== this.nil) {
                traverse(node.left);
                result.push([node.val, node.color === RBNode.RED ? "RED" : "BLACK"]);
                traverse(node.right);
            }
        };

        traverse(this.root);
        return result;
    }

    /**
     * Get black height of tree
     */
    getBlackHeight() {
        const countBlack = (node) => {
            if (node === this.nil) {
                return 0;
            }
            const leftBlack = countBlack(node.left);
            if (leftBlack === -1) {
                return -1;
            }
            const rightBlack = countBlack(node.right);
            if (rightBlack === -1) {
                return -1;
            }

            if (leftBlack !== rightBlack) {
                return -1;
            }

            return leftBlack + (node.color === RBNode.RED ? 0 : 1);
        };

        return countBlack(this.root);
    }
}

// Example usage
if (require.main === module) {
    const rbt = new RedBlackTree();

    const values = [7, 3, 18, 10, 22, 8, 11, 26];
    values.forEach(val => rbt.insert(val));

    console.log("Red-Black Tree Inorder Traversal (value, color):");
    console.log(rbt.inorder());

    console.log("\nSearch 10:", rbt.search(10) !== null);
    console.log("Search 99:", rbt.search(99) !== null);

    console.log("\nBlack Height:", rbt.getBlackHeight());
}

module.exports = { RedBlackTree };

