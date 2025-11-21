"""
Red-Black Tree Implementation in Python
"""

class RBNode:
    """Node for Red-Black Tree"""
    RED = True
    BLACK = False
    
    def __init__(self, val):
        self.val = val
        self.color = RBNode.RED
        self.left = None
        self.right = None
        self.parent = None


class RedBlackTree:
    """Red-Black Tree - Self-balancing BST"""
    
    def __init__(self):
        self.nil = RBNode(0)
        self.nil.color = RBNode.BLACK
        self.root = self.nil
    
    def left_rotate(self, x):
        """Left rotation"""
        y = x.right
        x.right = y.left
        
        if y.left != self.nil:
            y.left.parent = x
        
        y.parent = x.parent
        
        if x.parent == self.nil:
            self.root = y
        elif x == x.parent.left:
            x.parent.left = y
        else:
            x.parent.right = y
        
        y.left = x
        x.parent = y
    
    def right_rotate(self, x):
        """Right rotation"""
        y = x.left
        x.left = y.right
        
        if y.right != self.nil:
            y.right.parent = x
        
        y.parent = x.parent
        
        if x.parent == self.nil:
            self.root = y
        elif x == x.parent.right:
            x.parent.right = y
        else:
            x.parent.left = y
        
        y.right = x
        x.parent = y
    
    def insert(self, val):
        """Insert value with RB tree properties"""
        z = RBNode(val)
        z.left = self.nil
        z.right = self.nil
        
        y = self.nil
        x = self.root
        
        while x != self.nil:
            y = x
            if z.val < x.val:
                x = x.left
            else:
                x = x.right
        
        z.parent = y
        
        if y == self.nil:
            self.root = z
        elif z.val < y.val:
            y.left = z
        else:
            y.right = z
        
        z.color = RBNode.RED
        self._insert_fixup(z)
    
    def _insert_fixup(self, z):
        """Fix RB tree properties after insertion"""
        while z.parent.color == RBNode.RED:
            if z.parent == z.parent.parent.left:
                y = z.parent.parent.right
                if y.color == RBNode.RED:
                    z.parent.color = RBNode.BLACK
                    y.color = RBNode.BLACK
                    z.parent.parent.color = RBNode.RED
                    z = z.parent.parent
                else:
                    if z == z.parent.right:
                        z = z.parent
                        self.left_rotate(z)
                    z.parent.color = RBNode.BLACK
                    z.parent.parent.color = RBNode.RED
                    self.right_rotate(z.parent.parent)
            else:
                y = z.parent.parent.left
                if y.color == RBNode.RED:
                    z.parent.color = RBNode.BLACK
                    y.color = RBNode.BLACK
                    z.parent.parent.color = RBNode.RED
                    z = z.parent.parent
                else:
                    if z == z.parent.left:
                        z = z.parent
                        self.right_rotate(z)
                    z.parent.color = RBNode.BLACK
                    z.parent.parent.color = RBNode.RED
                    self.left_rotate(z.parent.parent)
        
        self.root.color = RBNode.BLACK
    
    def search(self, val):
        """Search for value"""
        x = self.root
        while x != self.nil:
            if val == x.val:
                return x
            elif val < x.val:
                x = x.left
            else:
                x = x.right
        return None
    
    def inorder(self):
        """Inorder traversal"""
        result = []
        
        def traverse(node):
            if node != self.nil:
                traverse(node.left)
                result.append((node.val, "RED" if node.color == RBNode.RED else "BLACK"))
                traverse(node.right)
        
        traverse(self.root)
        return result
    
    def get_black_height(self):
        """Get black height of tree"""
        def count_black(node):
            if node == self.nil:
                return 0
            left_black = count_black(node.left)
            if left_black == -1:
                return -1
            right_black = count_black(node.right)
            if right_black == -1:
                return -1
            
            if left_black != right_black:
                return -1
            
            return left_black + (0 if node.color == RBNode.RED else 1)
        
        return count_black(self.root)


# Example usage
if __name__ == "__main__":
    rbt = RedBlackTree()
    
    values = [7, 3, 18, 10, 22, 8, 11, 26]
    for val in values:
        rbt.insert(val)
    
    print("Red-Black Tree Inorder Traversal (value, color):")
    print(rbt.inorder())
    
    print("\nSearch 10:", rbt.search(10) is not None)
    print("Search 99:", rbt.search(99) is not None)
    
    print("\nBlack Height:", rbt.get_black_height())

