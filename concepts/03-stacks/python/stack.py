"""
Stack Implementation in Python
"""

class Stack:
    """Array-based Stack Implementation"""
    
    def __init__(self):
        self.items = []
    
    def push(self, item):
        """Add element to top - O(1)"""
        self.items.append(item)
    
    def pop(self):
        """Remove and return top element - O(1)"""
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.items.pop()
    
    def peek(self):
        """Return top element without removing - O(1)"""
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.items[-1]
    
    def is_empty(self):
        """Check if stack is empty - O(1)"""
        return len(self.items) == 0
    
    def size(self):
        """Return size of stack - O(1)"""
        return len(self.items)
    
    def display(self):
        """Display all elements"""
        return self.items.copy()


class StackNode:
    """Node for linked list-based stack"""
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedStack:
    """Linked List-based Stack Implementation"""
    
    def __init__(self):
        self.top = None
        self.size = 0
    
    def push(self, item):
        """Add element to top - O(1)"""
        new_node = StackNode(item)
        new_node.next = self.top
        self.top = new_node
        self.size += 1
    
    def pop(self):
        """Remove and return top element - O(1)"""
        if self.is_empty():
            raise IndexError("Stack is empty")
        data = self.top.data
        self.top = self.top.next
        self.size -= 1
        return data
    
    def peek(self):
        """Return top element without removing - O(1)"""
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.top.data
    
    def is_empty(self):
        """Check if stack is empty - O(1)"""
        return self.top is None
    
    def size(self):
        """Return size of stack - O(1)"""
        return self.size


class MinStack:
    """Stack that supports getMin() in O(1)"""
    
    def __init__(self):
        self.stack = []
        self.min_stack = []
    
    def push(self, val):
        """Push element - O(1)"""
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
    
    def pop(self):
        """Pop element - O(1)"""
        if not self.stack:
            raise IndexError("Stack is empty")
        val = self.stack.pop()
        if val == self.min_stack[-1]:
            self.min_stack.pop()
        return val
    
    def top(self):
        """Get top element - O(1)"""
        if not self.stack:
            raise IndexError("Stack is empty")
        return self.stack[-1]
    
    def get_min(self):
        """Get minimum element - O(1)"""
        if not self.min_stack:
            raise IndexError("Stack is empty")
        return self.min_stack[-1]


# Example usage
if __name__ == "__main__":
    # Array-based Stack
    print("--- Array-based Stack ---")
    stack = Stack()
    stack.push(1)
    stack.push(2)
    stack.push(3)
    print("Stack:", stack.display())
    print("Top:", stack.peek())
    print("Pop:", stack.pop())
    print("After pop:", stack.display())
    
    # Linked Stack
    print("\n--- Linked Stack ---")
    linked_stack = LinkedStack()
    linked_stack.push(10)
    linked_stack.push(20)
    linked_stack.push(30)
    print("Size:", linked_stack.size())
    print("Top:", linked_stack.peek())
    print("Pop:", linked_stack.pop())
    
    # Min Stack
    print("\n--- Min Stack ---")
    min_stack = MinStack()
    min_stack.push(3)
    min_stack.push(1)
    min_stack.push(5)
    print("Min:", min_stack.get_min())
    min_stack.pop()
    print("After pop, Min:", min_stack.get_min())

