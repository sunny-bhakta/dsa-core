"""
Linked List Implementation in Python
"""

class ListNode:
    """Node class for singly linked list"""
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class SinglyLinkedList:
    """Singly Linked List Implementation"""
    
    def __init__(self):
        self.head = None
        self.size = 0
    
    def append(self, val):
        """Add node at the end - O(n)"""
        new_node = ListNode(val)
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node
        self.size += 1
    
    def prepend(self, val):
        """Add node at the beginning - O(1)"""
        new_node = ListNode(val)
        new_node.next = self.head
        self.head = new_node
        self.size += 1
    
    def insert_at(self, index, val):
        """Insert node at index - O(n)"""
        if index < 0 or index > self.size:
            raise IndexError("Index out of range")
        
        if index == 0:
            self.prepend(val)
            return
        
        new_node = ListNode(val)
        current = self.head
        for _ in range(index - 1):
            current = current.next
        
        new_node.next = current.next
        current.next = new_node
        self.size += 1
    
    def delete(self, val):
        """Delete first occurrence of value - O(n)"""
        if not self.head:
            return False
        
        if self.head.val == val:
            self.head = self.head.next
            self.size -= 1
            return True
        
        current = self.head
        while current.next:
            if current.next.val == val:
                current.next = current.next.next
                self.size -= 1
                return True
            current = current.next
        
        return False
    
    def search(self, val):
        """Search for value - O(n)"""
        current = self.head
        index = 0
        while current:
            if current.val == val:
                return index
            current = current.next
            index += 1
        return -1
    
    def reverse(self):
        """Reverse linked list - O(n)"""
        prev = None
        current = self.head
        
        while current:
            next_node = current.next
            current.next = prev
            prev = current
            current = next_node
        
        self.head = prev
    
    def find_middle(self):
        """Find middle element using two pointers - O(n)"""
        slow = fast = self.head
        
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        
        return slow.val if slow else None
    
    def has_cycle(self):
        """Detect cycle using Floyd's algorithm - O(n)"""
        slow = fast = self.head
        
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                return True
        
        return False
    
    def display(self):
        """Display all elements"""
        result = []
        current = self.head
        while current:
            result.append(current.val)
            current = current.next
        return result


class DoublyListNode:
    """Node class for doubly linked list"""
    def __init__(self, val=0, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next


class DoublyLinkedList:
    """Doubly Linked List Implementation"""
    
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0
    
    def append(self, val):
        """Add node at the end - O(1)"""
        new_node = DoublyListNode(val)
        
        if not self.head:
            self.head = self.tail = new_node
        else:
            new_node.prev = self.tail
            self.tail.next = new_node
            self.tail = new_node
        
        self.size += 1
    
    def prepend(self, val):
        """Add node at the beginning - O(1)"""
        new_node = DoublyListNode(val)
        
        if not self.head:
            self.head = self.tail = new_node
        else:
            new_node.next = self.head
            self.head.prev = new_node
            self.head = new_node
        
        self.size += 1
    
    def delete(self, val):
        """Delete first occurrence - O(n)"""
        current = self.head
        
        while current:
            if current.val == val:
                if current.prev:
                    current.prev.next = current.next
                else:
                    self.head = current.next
                
                if current.next:
                    current.next.prev = current.prev
                else:
                    self.tail = current.prev
                
                self.size -= 1
                return True
            
            current = current.next
        
        return False
    
    def display_forward(self):
        """Display from head to tail"""
        result = []
        current = self.head
        while current:
            result.append(current.val)
            current = current.next
        return result
    
    def display_backward(self):
        """Display from tail to head"""
        result = []
        current = self.tail
        while current:
            result.append(current.val)
            current = current.prev
        return result


# Example usage
if __name__ == "__main__":
    # Singly Linked List
    print("--- Singly Linked List ---")
    sll = SinglyLinkedList()
    sll.append(1)
    sll.append(2)
    sll.append(3)
    sll.prepend(0)
    print("List:", sll.display())
    print("Middle:", sll.find_middle())
    
    sll.reverse()
    print("Reversed:", sll.display())
    
    print("Search 2:", sll.search(2))
    sll.delete(2)
    print("After delete 2:", sll.display())
    
    # Doubly Linked List
    print("\n--- Doubly Linked List ---")
    dll = DoublyLinkedList()
    dll.append(1)
    dll.append(2)
    dll.append(3)
    dll.prepend(0)
    print("Forward:", dll.display_forward())
    print("Backward:", dll.display_backward())
    
    dll.delete(2)
    print("After delete 2 - Forward:", dll.display_forward())

