"""
Circular Linked List Implementation in Python
"""

class CircularListNode:
    """Node for circular linked list"""
    def __init__(self, val=0):
        self.val = val
        self.next = None


class CircularLinkedList:
    """Circular Linked List Implementation"""
    
    def __init__(self):
        self.head = None
        self.size = 0
    
    def append(self, val):
        """Add node at the end - O(n)"""
        new_node = CircularListNode(val)
        
        if not self.head:
            self.head = new_node
            new_node.next = self.head
        else:
            current = self.head
            while current.next != self.head:
                current = current.next
            current.next = new_node
            new_node.next = self.head
        
        self.size += 1
    
    def prepend(self, val):
        """Add node at the beginning - O(1)"""
        new_node = CircularListNode(val)
        
        if not self.head:
            self.head = new_node
            new_node.next = self.head
        else:
            current = self.head
            while current.next != self.head:
                current = current.next
            current.next = new_node
            new_node.next = self.head
            self.head = new_node
        
        self.size += 1
    
    def delete(self, val):
        """Delete first occurrence - O(n)"""
        if not self.head:
            return False
        
        # If head is to be deleted
        if self.head.val == val:
            if self.head.next == self.head:
                self.head = None
            else:
                current = self.head
                while current.next != self.head:
                    current = current.next
                current.next = self.head.next
                self.head = self.head.next
            self.size -= 1
            return True
        
        # Find and delete node
        current = self.head
        while current.next != self.head:
            if current.next.val == val:
                current.next = current.next.next
                self.size -= 1
                return True
            current = current.next
        
        return False
    
    def search(self, val):
        """Search for value - O(n)"""
        if not self.head:
            return -1
        
        current = self.head
        index = 0
        
        while True:
            if current.val == val:
                return index
            current = current.next
            index += 1
            if current == self.head:
                break
        
        return -1
    
    def display(self):
        """Display all elements"""
        if not self.head:
            return []
        
        result = []
        current = self.head
        
        while True:
            result.append(current.val)
            current = current.next
            if current == self.head:
                break
        
        return result
    
    def josephus_problem(self, k):
        """
        Josephus Problem - Eliminate every kth person
        Returns the last remaining person
        """
        if not self.head or k <= 0:
            return None
        
        current = self.head
        
        while self.size > 1:
            # Move k-1 steps
            for _ in range(k - 1):
                current = current.next
            
            # Delete next node
            current.next = current.next.next
            self.size -= 1
            current = current.next
        
        self.head = current
        return current.val


class CircularDoublyLinkedList:
    """Circular Doubly Linked List"""
    
    def __init__(self):
        self.head = None
        self.size = 0
    
    def append(self, val):
        """Add node at the end - O(1)"""
        new_node = CircularListNode(val)
        new_node.prev = new_node
        new_node.next = new_node
        
        if not self.head:
            self.head = new_node
        else:
            last = self.head.prev
            last.next = new_node
            new_node.prev = last
            new_node.next = self.head
            self.head.prev = new_node
        
        self.size += 1
    
    def prepend(self, val):
        """Add node at the beginning - O(1)"""
        new_node = CircularListNode(val)
        new_node.prev = new_node
        new_node.next = new_node
        
        if not self.head:
            self.head = new_node
        else:
            last = self.head.prev
            new_node.next = self.head
            new_node.prev = last
            self.head.prev = new_node
            last.next = new_node
            self.head = new_node
        
        self.size += 1
    
    def display_forward(self):
        """Display from head to tail"""
        if not self.head:
            return []
        
        result = []
        current = self.head
        
        while True:
            result.append(current.val)
            current = current.next
            if current == self.head:
                break
        
        return result
    
    def display_backward(self):
        """Display from tail to head"""
        if not self.head:
            return []
        
        result = []
        current = self.head.prev
        
        while True:
            result.append(current.val)
            current = current.prev
            if current == self.head.prev:
                break
        
        return result


# Example usage
if __name__ == "__main__":
    # Circular Singly Linked List
    print("--- Circular Singly Linked List ---")
    cll = CircularLinkedList()
    for i in range(1, 6):
        cll.append(i)
    
    print("List:", cll.display())
    print("Size:", cll.size)
    print("Search 3:", cll.search(3))
    
    cll.prepend(0)
    print("After prepend 0:", cll.display())
    
    cll.delete(3)
    print("After delete 3:", cll.display())
    
    # Josephus Problem
    print("\n--- Josephus Problem (k=3) ---")
    josephus = CircularLinkedList()
    for i in range(1, 8):
        josephus.append(i)
    print("Initial:", josephus.display())
    print("Last remaining:", josephus.josephus_problem(3))
    
    # Circular Doubly Linked List
    print("\n--- Circular Doubly Linked List ---")
    cdll = CircularDoublyLinkedList()
    for i in range(1, 6):
        cdll.append(i)
    
    print("Forward:", cdll.display_forward())
    print("Backward:", cdll.display_backward())

