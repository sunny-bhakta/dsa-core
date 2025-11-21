"""
Interview Questions: Trees & Binary Search Trees
Common interview questions with detailed solutions
"""

class TreeNode:
    """Node for binary tree"""
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


# ========== QUESTION 1: Maximum Depth of Binary Tree ==========
"""
Problem: Given the root of a binary tree, return its maximum depth.

Example:
Input: root = [3,9,20,null,null,15,7]
Output: 3

Approach: Recursive DFS
Time: O(n), Space: O(h) where h is height
"""
def max_depth(root):
    """
    Maximum Depth of Binary Tree
    """
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))


# ========== QUESTION 2: Same Tree ==========
"""
Problem: Given the roots of two binary trees p and q, check if they are the same.

Example:
Input: p = [1,2,3], q = [1,2,3]
Output: true

Approach: Recursive comparison
Time: O(n), Space: O(h)
"""
def is_same_tree(p, q):
    """
    Same Tree
    """
    if not p and not q:
        return True
    if not p or not q:
        return False
    if p.val != q.val:
        return False
    return is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right)


# ========== QUESTION 3: Invert Binary Tree ==========
"""
Problem: Invert a binary tree (mirror it).

Example:
Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]

Approach: Recursive swap left and right
Time: O(n), Space: O(h)
"""
def invert_tree(root):
    """
    Invert Binary Tree
    """
    if not root:
        return None
    
    # Swap left and right
    root.left, root.right = root.right, root.left
    
    # Recursively invert subtrees
    invert_tree(root.left)
    invert_tree(root.right)
    
    return root


# ========== QUESTION 4: Validate Binary Search Tree ==========
"""
Problem: Determine if a binary tree is a valid BST.

Example:
Input: root = [2,1,3]
Output: true

Approach: Check bounds for each node
Time: O(n), Space: O(h)
"""
def is_valid_bst(root):
    """
    Validate Binary Search Tree
    """
    def validate(node, min_val, max_val):
        if not node:
            return True
        if node.val <= min_val or node.val >= max_val:
            return False
        return (validate(node.left, min_val, node.val) and
                validate(node.right, node.val, max_val))
    
    return validate(root, float('-inf'), float('inf'))


# ========== QUESTION 5: Lowest Common Ancestor ==========
"""
Problem: Find the lowest common ancestor (LCA) of two nodes in a BST.

Example:
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6

Approach: Use BST property - LCA is first node where paths diverge
Time: O(h), Space: O(1)
"""
def lowest_common_ancestor(root, p, q):
    """
    Lowest Common Ancestor in BST
    """
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left
        elif p.val > root.val and q.val > root.val:
            root = root.right
        else:
            return root
    return None


# ========== QUESTION 6: Binary Tree Level Order Traversal ==========
"""
Problem: Return the level order traversal of a binary tree.

Example:
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]

Approach: BFS using queue
Time: O(n), Space: O(n)
"""
def level_order(root):
    """
    Binary Tree Level Order Traversal
    """
    if not root:
        return []
    
    result = []
    queue = [root]
    
    while queue:
        level_size = len(queue)
        level = []
        
        for _ in range(level_size):
            node = queue.pop(0)
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(level)
    
    return result


# Example usage
if __name__ == "__main__":
    print("=== TREES INTERVIEW QUESTIONS ===\n")
    
    # Create sample trees
    # Tree: [3,9,20,null,null,15,7]
    root1 = TreeNode(3)
    root1.left = TreeNode(9)
    root1.right = TreeNode(20)
    root1.right.left = TreeNode(15)
    root1.right.right = TreeNode(7)
    
    # Maximum Depth
    print("1. Maximum Depth of Binary Tree:")
    print(f"   Input: [3,9,20,null,null,15,7]")
    print(f"   Output: {max_depth(root1)}")
    
    # Same Tree
    print("\n2. Same Tree:")
    tree1 = TreeNode(1, TreeNode(2), TreeNode(3))
    tree2 = TreeNode(1, TreeNode(2), TreeNode(3))
    print(f"   Output: {is_same_tree(tree1, tree2)}")
    
    # Invert Tree
    print("\n3. Invert Binary Tree:")
    root3 = TreeNode(4)
    root3.left = TreeNode(2)
    root3.right = TreeNode(7)
    root3.left.left = TreeNode(1)
    root3.left.right = TreeNode(3)
    root3.right.left = TreeNode(6)
    root3.right.right = TreeNode(9)
    invert_tree(root3)
    print("   Tree inverted (mirrored)")
    
    # Validate BST
    print("\n4. Validate Binary Search Tree:")
    bst = TreeNode(2)
    bst.left = TreeNode(1)
    bst.right = TreeNode(3)
    print(f"   Output: {is_valid_bst(bst)}")
    
    # Level Order
    print("\n5. Binary Tree Level Order Traversal:")
    print(f"   Input: [3,9,20,null,null,15,7]")
    print(f"   Output: {level_order(root1)}")

