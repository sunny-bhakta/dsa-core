"""
Advanced Tree Implementations in Python
"""

class AVLNode:
    """Node for AVL Tree"""
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None
        self.height = 1


class AVLTree:
    """AVL Tree - Self-balancing Binary Search Tree"""
    
    def __init__(self):
        self.root = None
    
    def get_height(self, node):
        """Get height of node"""
        if not node:
            return 0
        return node.height
    
    def get_balance(self, node):
        """Get balance factor"""
        if not node:
            return 0
        return self.get_height(node.left) - self.get_height(node.right)
    
    def right_rotate(self, y):
        """Right rotation"""
        x = y.left
        T2 = x.right
        
        x.right = y
        y.left = T2
        
        y.height = 1 + max(self.get_height(y.left), self.get_height(y.right))
        x.height = 1 + max(self.get_height(x.left), self.get_height(x.right))
        
        return x
    
    def left_rotate(self, x):
        """Left rotation"""
        y = x.right
        T2 = y.left
        
        y.left = x
        x.right = T2
        
        x.height = 1 + max(self.get_height(x.left), self.get_height(x.right))
        y.height = 1 + max(self.get_height(y.left), self.get_height(y.right))
        
        return y
    
    def insert(self, val):
        """Insert value with balancing"""
        self.root = self._insert(self.root, val)
    
    def _insert(self, node, val):
        if not node:
            return AVLNode(val)
        
        if val < node.val:
            node.left = self._insert(node.left, val)
        elif val > node.val:
            node.right = self._insert(node.right, val)
        else:
            return node  # Duplicate values not allowed
        
        node.height = 1 + max(self.get_height(node.left), self.get_height(node.right))
        balance = self.get_balance(node)
        
        # Left Left Case
        if balance > 1 and val < node.left.val:
            return self.right_rotate(node)
        
        # Right Right Case
        if balance < -1 and val > node.right.val:
            return self.left_rotate(node)
        
        # Left Right Case
        if balance > 1 and val > node.left.val:
            node.left = self.left_rotate(node.left)
            return self.right_rotate(node)
        
        # Right Left Case
        if balance < -1 and val < node.right.val:
            node.right = self.right_rotate(node.right)
            return self.left_rotate(node)
        
        return node
    
    def inorder(self):
        """Inorder traversal"""
        result = []
        
        def traverse(node):
            if node:
                traverse(node.left)
                result.append(node.val)
                traverse(node.right)
        
        traverse(self.root)
        return result


class SegmentTree:
    """Segment Tree for Range Queries"""
    
    def __init__(self, arr):
        self.n = len(arr)
        self.size = 1
        while self.size < self.n:
            self.size *= 2
        self.tree = [0] * (2 * self.size)
        self.build(arr)
    
    def build(self, arr):
        """Build segment tree"""
        for i in range(self.n):
            self.tree[self.size + i] = arr[i]
        for i in range(self.size - 1, 0, -1):
            self.tree[i] = self.tree[2 * i] + self.tree[2 * i + 1]
    
    def update(self, index, value):
        """Update value at index"""
        index += self.size
        self.tree[index] = value
        index //= 2
        while index:
            self.tree[index] = self.tree[2 * index] + self.tree[2 * index + 1]
            index //= 2
    
    def query(self, l, r):
        """Query sum in range [l, r)"""
        l += self.size
        r += self.size
        result = 0
        
        while l < r:
            if l % 2 == 1:
                result += self.tree[l]
                l += 1
            if r % 2 == 1:
                r -= 1
                result += self.tree[r]
            l //= 2
            r //= 2
        
        return result


class FenwickTree:
    """Fenwick Tree (Binary Indexed Tree) for Prefix Sum"""
    
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)
    
    def update(self, index, delta):
        """Update value at index"""
        index += 1
        while index <= self.n:
            self.tree[index] += delta
            index += index & -index
    
    def query(self, index):
        """Query prefix sum from 0 to index"""
        index += 1
        result = 0
        while index > 0:
            result += self.tree[index]
            index -= index & -index
        return result
    
    def range_query(self, l, r):
        """Query sum in range [l, r]"""
        return self.query(r) - self.query(l - 1)


class SuffixTreeNode:
    """Node for Suffix Tree"""
    def __init__(self):
        self.children = {}
        self.start = -1
        self.end = -1
        self.suffix_link = None


class SuffixTree:
    """Suffix Tree - Compact representation of all suffixes"""
    
    def __init__(self, text):
        self.text = text + '$'
        self.root = SuffixTreeNode()
        self.build()
    
    def build(self):
        """Build suffix tree using Ukkonen's algorithm (simplified)"""
        # Simplified implementation - full Ukkonen's is complex
        n = len(self.text)
        for i in range(n):
            self._insert_suffix(i)
    
    def _insert_suffix(self, start):
        """Insert suffix starting at index"""
        node = self.root
        i = start
        
        while i < len(self.text):
            char = self.text[i]
            if char not in node.children:
                node.children[char] = SuffixTreeNode()
                node.children[char].start = i
                node.children[char].end = len(self.text) - 1
                return
            
            child = node.children[char]
            # Simplified - would need edge splitting in full implementation
            node = child
            i += 1
    
    def search(self, pattern):
        """Search for pattern in suffix tree"""
        node = self.root
        i = 0
        
        while i < len(pattern):
            if pattern[i] not in node.children:
                return False
            node = node.children[pattern[i]]
            i += 1
        
        return True


# Example usage
if __name__ == "__main__":
    # AVL Tree
    print("--- AVL Tree ---")
    avl = AVLTree()
    for val in [10, 20, 30, 40, 50, 25]:
        avl.insert(val)
    print("AVL Tree inorder:", avl.inorder())
    print("Root value:", avl.root.val)
    print("Balance factor:", avl.get_balance(avl.root))
    
    # Segment Tree
    print("\n--- Segment Tree ---")
    arr = [1, 3, 5, 7, 9, 11]
    seg_tree = SegmentTree(arr)
    print("Array:", arr)
    print("Sum [1, 4]:", seg_tree.query(1, 5))
    seg_tree.update(2, 10)
    print("After update index 2 to 10, Sum [1, 4]:", seg_tree.query(1, 5))
    
    # Fenwick Tree
    print("\n--- Fenwick Tree ---")
    arr2 = [1, 3, 5, 7, 9, 11]
    fenwick = FenwickTree(len(arr2))
    for i, val in enumerate(arr2):
        fenwick.update(i, val)
    print("Array:", arr2)
    print("Prefix sum [0, 3]:", fenwick.range_query(0, 3))
    print("Prefix sum [2, 5]:", fenwick.range_query(2, 5))
    
    # Suffix Tree
    print("\n--- Suffix Tree ---")
    suffix_tree = SuffixTree("banana")
    print("Search 'ana':", suffix_tree.search("ana"))
    print("Search 'ban':", suffix_tree.search("ban"))
    print("Search 'xyz':", suffix_tree.search("xyz"))


