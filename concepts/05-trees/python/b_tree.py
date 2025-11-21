"""
B-Tree Implementation in Python
"""

class BTreeNode:
    """Node for B-Tree"""
    def __init__(self, is_leaf=False):
        self.keys = []
        self.children = []
        self.is_leaf = is_leaf


class BTree:
    """B-Tree - Multi-way search tree"""
    
    def __init__(self, min_degree=3):
        self.root = BTreeNode(is_leaf=True)
        self.min_degree = min_degree  # Minimum degree (t)
        self.max_keys = 2 * min_degree - 1
        self.max_children = 2 * min_degree
    
    def search(self, key):
        """Search for key in B-Tree"""
        return self._search(self.root, key)
    
    def _search(self, node, key):
        """Recursive search"""
        i = 0
        while i < len(node.keys) and key > node.keys[i]:
            i += 1
        
        if i < len(node.keys) and node.keys[i] == key:
            return node
        
        if node.is_leaf:
            return None
        
        return self._search(node.children[i], key)
    
    def insert(self, key):
        """Insert key into B-Tree"""
        root = self.root
        
        # If root is full, split it
        if len(root.keys) == self.max_keys:
            new_root = BTreeNode(is_leaf=False)
            new_root.children.append(root)
            self._split_child(new_root, 0)
            self.root = new_root
        
        self._insert_non_full(self.root, key)
    
    def _insert_non_full(self, node, key):
        """Insert into non-full node"""
        i = len(node.keys) - 1
        
        if node.is_leaf:
            # Insert into leaf
            node.keys.append(0)
            while i >= 0 and key < node.keys[i]:
                node.keys[i + 1] = node.keys[i]
                i -= 1
            node.keys[i + 1] = key
        else:
            # Find child to insert into
            while i >= 0 and key < node.keys[i]:
                i -= 1
            i += 1
            
            # If child is full, split it
            if len(node.children[i].keys) == self.max_keys:
                self._split_child(node, i)
                if key > node.keys[i]:
                    i += 1
            
            self._insert_non_full(node.children[i], key)
    
    def _split_child(self, parent, index):
        """Split full child node"""
        full_child = parent.children[index]
        new_child = BTreeNode(is_leaf=full_child.is_leaf)
        
        # Move keys
        mid = self.min_degree - 1
        new_child.keys = full_child.keys[mid + 1:]
        full_child.keys = full_child.keys[:mid]
        
        # Move children if not leaf
        if not full_child.is_leaf:
            new_child.children = full_child.children[mid + 1:]
            full_child.children = full_child.children[:mid + 1]
        
        # Insert middle key into parent
        parent.keys.insert(index, full_child.keys[mid])
        parent.children.insert(index + 1, new_child)
    
    def traverse(self):
        """Inorder traversal"""
        result = []
        
        def traverse_node(node):
            if node:
                i = 0
                for i in range(len(node.keys)):
                    if not node.is_leaf:
                        traverse_node(node.children[i])
                    result.append(node.keys[i])
                if not node.is_leaf:
                    traverse_node(node.children[i + 1])
        
        traverse_node(self.root)
        return result
    
    def display_structure(self):
        """Display tree structure"""
        def display_node(node, level=0):
            indent = "  " * level
            if node.is_leaf:
                print(f"{indent}Leaf: {node.keys}")
            else:
                print(f"{indent}Internal: {node.keys}")
                for child in node.children:
                    display_node(child, level + 1)
        
        display_node(self.root)


# Example usage
if __name__ == "__main__":
    btree = BTree(min_degree=3)
    
    values = [10, 20, 5, 6, 12, 30, 7, 17]
    for val in values:
        btree.insert(val)
    
    print("B-Tree Inorder Traversal:")
    print(btree.traverse())
    
    print("\nB-Tree Structure:")
    btree.display_structure()
    
    print("\nSearch 12:", btree.search(12) is not None)
    print("Search 99:", btree.search(99) is not None)

