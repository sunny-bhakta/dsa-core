/**
 * Interview Questions: Trees & Binary Search Trees
 * Common interview questions with detailed solutions
 */

class TreeNode {
    /**
     * Node for binary tree
     */
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// ========== QUESTION 1: Maximum Depth of Binary Tree ==========
/**
 * Problem: Given the root of a binary tree, return its maximum depth.
 * 
 * Example:
 * Input: root = [3,9,20,null,null,15,7]
 * Output: 3
 * 
 * Approach: Recursive DFS
 * Time: O(n), Space: O(h) where h is height
 */
function maxDepth(root) {
    if (!root) {
        return 0;
    }
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// ========== QUESTION 2: Same Tree ==========
/**
 * Problem: Given the roots of two binary trees p and q, check if they are the same.
 * 
 * Example:
 * Input: p = [1,2,3], q = [1,2,3]
 * Output: true
 * 
 * Approach: Recursive comparison
 * Time: O(n), Space: O(h)
 */
function isSameTree(p, q) {
    if (!p && !q) {
        return true;
    }
    if (!p || !q) {
        return false;
    }
    if (p.val !== q.val) {
        return false;
    }
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// ========== QUESTION 3: Invert Binary Tree ==========
/**
 * Problem: Invert a binary tree (mirror it).
 * 
 * Example:
 * Input: root = [4,2,7,1,3,6,9]
 * Output: [4,7,2,9,6,3,1]
 * 
 * Approach: Recursive swap left and right
 * Time: O(n), Space: O(h)
 */
function invertTree(root) {
    if (!root) {
        return null;
    }

    // Swap left and right
    [root.left, root.right] = [root.right, root.left];

    // Recursively invert subtrees
    invertTree(root.left);
    invertTree(root.right);

    return root;
}

// ========== QUESTION 4: Validate Binary Search Tree ==========
/**
 * Problem: Determine if a binary tree is a valid BST.
 * 
 * Example:
 * Input: root = [2,1,3]
 * Output: true
 * 
 * Approach: Check bounds for each node
 * Time: O(n), Space: O(h)
 */
function isValidBST(root) {
    function validate(node, minVal, maxVal) {
        if (!node) {
            return true;
        }
        if (node.val <= minVal || node.val >= maxVal) {
            return false;
        }
        return validate(node.left, minVal, node.val) &&
               validate(node.right, node.val, maxVal);
    }

    return validate(root, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
}

// ========== QUESTION 5: Lowest Common Ancestor ==========
/**
 * Problem: Find the lowest common ancestor (LCA) of two nodes in a BST.
 * 
 * Example:
 * Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
 * Output: 6
 * 
 * Approach: Use BST property - LCA is first node where paths diverge
 * Time: O(h), Space: O(1)
 */
function lowestCommonAncestor(root, p, q) {
    while (root) {
        if (p.val < root.val && q.val < root.val) {
            root = root.left;
        } else if (p.val > root.val && q.val > root.val) {
            root = root.right;
        } else {
            return root;
        }
    }
    return null;
}

// ========== QUESTION 6: Binary Tree Level Order Traversal ==========
/**
 * Problem: Return the level order traversal of a binary tree.
 * 
 * Example:
 * Input: root = [3,9,20,null,null,15,7]
 * Output: [[3],[9,20],[15,7]]
 * 
 * Approach: BFS using queue
 * Time: O(n), Space: O(n)
 */
function levelOrder(root) {
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

// Example usage
if (require.main === module) {
    console.log("=== TREES INTERVIEW QUESTIONS ===\n");

    // Create sample trees
    // Tree: [3,9,20,null,null,15,7]
    const root1 = new TreeNode(3);
    root1.left = new TreeNode(9);
    root1.right = new TreeNode(20);
    root1.right.left = new TreeNode(15);
    root1.right.right = new TreeNode(7);

    // Maximum Depth
    console.log("1. Maximum Depth of Binary Tree:");
    console.log("   Input: [3,9,20,null,null,15,7]");
    console.log(`   Output: ${maxDepth(root1)}`);

    // Same Tree
    console.log("\n2. Same Tree:");
    const tree1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
    const tree2 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
    console.log(`   Output: ${isSameTree(tree1, tree2)}`);

    // Invert Tree
    console.log("\n3. Invert Binary Tree:");
    const root3 = new TreeNode(4);
    root3.left = new TreeNode(2);
    root3.right = new TreeNode(7);
    root3.left.left = new TreeNode(1);
    root3.left.right = new TreeNode(3);
    root3.right.left = new TreeNode(6);
    root3.right.right = new TreeNode(9);
    invertTree(root3);
    console.log("   Tree inverted (mirrored)");

    // Validate BST
    console.log("\n4. Validate Binary Search Tree:");
    const bst = new TreeNode(2);
    bst.left = new TreeNode(1);
    bst.right = new TreeNode(3);
    console.log(`   Output: ${isValidBST(bst)}`);

    // Level Order
    console.log("\n5. Binary Tree Level Order Traversal:");
    console.log("   Input: [3,9,20,null,null,15,7]");
    console.log(`   Output:`, levelOrder(root1));
}

module.exports = {
    TreeNode,
    maxDepth,
    isSameTree,
    invertTree,
    isValidBST,
    lowestCommonAncestor,
    levelOrder
};

