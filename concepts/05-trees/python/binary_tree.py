"""
Binary Tree Implementation in Python
"""

class TreeNode:
    """Node class for binary tree"""
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class BinaryTree:
    """Binary Tree Implementation"""
    
    def __init__(self, root=None):
        self.root = root
    
    def inorder_traversal(self, root=None):
        """Inorder: Left, Root, Right - O(n)"""
        if root is None:
            root = self.root
        
        result = []
        
        def inorder(node):
            if node:
                inorder(node.left)
                result.append(node.val)
                inorder(node.right)
        
        inorder(root)
        return result
    
    def preorder_traversal(self, root=None):
        """Preorder: Root, Left, Right - O(n)"""
        if root is None:
            root = self.root
        
        result = []
        
        def preorder(node):
            if node:
                result.append(node.val)
                preorder(node.left)
                preorder(node.right)
        
        preorder(root)
        return result
    
    def postorder_traversal(self, root=None):
        """Postorder: Left, Right, Root - O(n)"""
        if root is None:
            root = self.root
        
        result = []
        
        def postorder(node):
            if node:
                postorder(node.left)
                postorder(node.right)
                result.append(node.val)
        
        postorder(root)
        return result
    
    def level_order_traversal(self, root=None):
        """Level-order (BFS) - O(n)"""
        if root is None:
            root = self.root
        
        if not root:
            return []
        
        from collections import deque
        result = []
        queue = deque([root])
        
        while queue:
            level_size = len(queue)
            level = []
            
            for _ in range(level_size):
                node = queue.popleft()
                level.append(node.val)
                
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            
            result.append(level)
        
        return result
    
    def max_depth(self, root=None):
        """Maximum depth/height - O(n)"""
        if root is None:
            root = self.root
        
        if not root:
            return 0
        
        return 1 + max(self.max_depth(root.left), self.max_depth(root.right))
    
    def is_balanced(self, root=None):
        """Check if tree is balanced - O(n)"""
        if root is None:
            root = self.root
        
        def check_balance(node):
            if not node:
                return 0, True
            
            left_height, left_balanced = check_balance(node.left)
            right_height, right_balanced = check_balance(node.right)
            
            balanced = (left_balanced and right_balanced and 
                       abs(left_height - right_height) <= 1)
            
            return max(left_height, right_height) + 1, balanced
        
        _, balanced = check_balance(root)
        return balanced


class BinarySearchTree:
    """Binary Search Tree Implementation"""
    
    def __init__(self):
        self.root = None
    
    def insert(self, val):
        """Insert value - O(log n) average, O(n) worst"""
        self.root = self._insert(self.root, val)
    
    def _insert(self, node, val):
        if not node:
            return TreeNode(val)
        
        if val < node.val:
            node.left = self._insert(node.left, val)
        elif val > node.val:
            node.right = self._insert(node.right, val)
        
        return node
    
    def search(self, val):
        """Search for value - O(log n) average, O(n) worst"""
        return self._search(self.root, val)
    
    def _search(self, node, val):
        if not node or node.val == val:
            return node
        
        if val < node.val:
            return self._search(node.left, val)
        return self._search(node.right, val)
    
    def delete(self, val):
        """Delete value - O(log n) average, O(n) worst"""
        self.root = self._delete(self.root, val)
    
    def _delete(self, node, val):
        if not node:
            return node
        
        if val < node.val:
            node.left = self._delete(node.left, val)
        elif val > node.val:
            node.right = self._delete(node.right, val)
        else:
            if not node.left:
                return node.right
            elif not node.right:
                return node.left
            
            # Node with two children
            min_node = self._min_value_node(node.right)
            node.val = min_node.val
            node.right = self._delete(node.right, min_node.val)
        
        return node
    
    def _min_value_node(self, node):
        current = node
        while current.left:
            current = current.left
        return current
    
    def is_valid(self):
        """Validate BST - O(n)"""
        def validate(node, min_val=float('-inf'), max_val=float('inf')):
            if not node:
                return True
            
            if node.val <= min_val or node.val >= max_val:
                return False
            
            return (validate(node.left, min_val, node.val) and
                   validate(node.right, node.val, max_val))
        
        return validate(self.root)
    
    def lowest_common_ancestor(self, p, q):
        """Find LCA of two nodes - O(log n)"""
        node = self.root
        
        while node:
            if p < node.val and q < node.val:
                node = node.left
            elif p > node.val and q > node.val:
                node = node.right
            else:
                return node.val
        
        return None


# Example usage
if __name__ == "__main__":
    # Binary Tree
    print("--- Binary Tree ---")
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.left.left = TreeNode(4)
    root.left.right = TreeNode(5)
    
    tree = BinaryTree(root)
    print("Inorder:", tree.inorder_traversal())
    print("Preorder:", tree.preorder_traversal())
    print("Postorder:", tree.postorder_traversal())
    print("Level-order:", tree.level_order_traversal())
    print("Max depth:", tree.max_depth())
    
    # BST
    print("\n--- Binary Search Tree ---")
    bst = BinarySearchTree()
    for val in [5, 3, 7, 2, 4, 6, 8]:
        bst.insert(val)
    
    print("Inorder:", BinaryTree(bst.root).inorder_traversal())
    print("Search 4:", bst.search(4) is not None)
    print("Is valid BST:", bst.is_valid())
    print("LCA of 2 and 4:", bst.lowest_common_ancestor(2, 4))

