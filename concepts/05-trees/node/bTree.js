/**
 * B-Tree Implementation in Node.js
 */

class BTreeNode {
    /**
     * Node for B-Tree
     */
    constructor(isLeaf = false) {
        this.keys = [];
        this.children = [];
        this.isLeaf = isLeaf;
    }
}

class BTree {
    /**
     * B-Tree - Multi-way search tree
     */
    constructor(minDegree = 3) {
        this.root = new BTreeNode(true);
        this.minDegree = minDegree; // Minimum degree (t)
        this.maxKeys = 2 * minDegree - 1;
        this.maxChildren = 2 * minDegree;
    }

    /**
     * Search for key in B-Tree
     */
    search(key) {
        return this._search(this.root, key);
    }

    _search(node, key) {
        let i = 0;
        while (i < node.keys.length && key > node.keys[i]) {
            i++;
        }

        if (i < node.keys.length && node.keys[i] === key) {
            return node;
        }

        if (node.isLeaf) {
            return null;
        }

        return this._search(node.children[i], key);
    }

    /**
     * Insert key into B-Tree
     */
    insert(key) {
        const root = this.root;

        // If root is full, split it
        if (root.keys.length === this.maxKeys) {
            const newRoot = new BTreeNode(false);
            newRoot.children.push(root);
            this._splitChild(newRoot, 0);
            this.root = newRoot;
        }

        this._insertNonFull(this.root, key);
    }

    _insertNonFull(node, key) {
        let i = node.keys.length - 1;

        if (node.isLeaf) {
            // Insert into leaf
            node.keys.push(0);
            while (i >= 0 && key < node.keys[i]) {
                node.keys[i + 1] = node.keys[i];
                i--;
            }
            node.keys[i + 1] = key;
        } else {
            // Find child to insert into
            while (i >= 0 && key < node.keys[i]) {
                i--;
            }
            i++;

            // If child is full, split it
            if (node.children[i].keys.length === this.maxKeys) {
                this._splitChild(node, i);
                if (key > node.keys[i]) {
                    i++;
                }
            }

            this._insertNonFull(node.children[i], key);
        }
    }

    _splitChild(parent, index) {
        const fullChild = parent.children[index];
        const newChild = new BTreeNode(fullChild.isLeaf);

        // Move keys
        const mid = this.minDegree - 1;
        newChild.keys = fullChild.keys.slice(mid + 1);
        fullChild.keys = fullChild.keys.slice(0, mid);

        // Move children if not leaf
        if (!fullChild.isLeaf) {
            newChild.children = fullChild.children.slice(mid + 1);
            fullChild.children = fullChild.children.slice(0, mid + 1);
        }

        // Insert middle key into parent
        parent.keys.splice(index, 0, fullChild.keys[mid]);
        parent.children.splice(index + 1, 0, newChild);
    }

    /**
     * Inorder traversal
     */
    traverse() {
        const result = [];

        const traverseNode = (node) => {
            if (node) {
                let i = 0;
                for (i = 0; i < node.keys.length; i++) {
                    if (!node.isLeaf) {
                        traverseNode(node.children[i]);
                    }
                    result.push(node.keys[i]);
                }
                if (!node.isLeaf) {
                    traverseNode(node.children[i]);
                }
            }
        };

        traverseNode(this.root);
        return result;
    }

    /**
     * Display tree structure
     */
    displayStructure() {
        const displayNode = (node, level = 0) => {
            const indent = "  ".repeat(level);
            if (node.isLeaf) {
                console.log(`${indent}Leaf: [${node.keys.join(', ')}]`);
            } else {
                console.log(`${indent}Internal: [${node.keys.join(', ')}]`);
                for (const child of node.children) {
                    displayNode(child, level + 1);
                }
            }
        };

        displayNode(this.root);
    }
}

// Example usage
if (require.main === module) {
    const btree = new BTree(3);

    const values = [10, 20, 5, 6, 12, 30, 7, 17];
    values.forEach(val => btree.insert(val));

    console.log("B-Tree Inorder Traversal:");
    console.log(btree.traverse());

    console.log("\nB-Tree Structure:");
    btree.displayStructure();

    console.log("\nSearch 12:", btree.search(12) !== null);
    console.log("Search 99:", btree.search(99) !== null);
}

module.exports = { BTree };

