"""
Queue Implementation in Python
"""

from collections import deque

class Queue:
    """Array-based Queue Implementation"""
    
    def __init__(self):
        self.items = []
    
    def enqueue(self, item):
        """Add element to rear - O(1)"""
        self.items.append(item)
    
    def dequeue(self):
        """Remove and return front element - O(1)"""
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.items.pop(0)
    
    def front(self):
        """Return front element without removing - O(1)"""
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.items[0]
    
    def is_empty(self):
        """Check if queue is empty - O(1)"""
        return len(self.items) == 0
    
    def size(self):
        """Return size of queue - O(1)"""
        return len(self.items)
    
    def display(self):
        """Display all elements"""
        return self.items.copy()


class QueueNode:
    """Node for linked list-based queue"""
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedQueue:
    """Linked List-based Queue Implementation"""
    
    def __init__(self):
        self.front_node = None
        self.rear_node = None
        self.size = 0
    
    def enqueue(self, item):
        """Add element to rear - O(1)"""
        new_node = QueueNode(item)
        if self.is_empty():
            self.front_node = self.rear_node = new_node
        else:
            self.rear_node.next = new_node
            self.rear_node = new_node
        self.size += 1
    
    def dequeue(self):
        """Remove and return front element - O(1)"""
        if self.is_empty():
            raise IndexError("Queue is empty")
        data = self.front_node.data
        self.front_node = self.front_node.next
        if self.front_node is None:
            self.rear_node = None
        self.size -= 1
        return data
    
    def front(self):
        """Return front element without removing - O(1)"""
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.front_node.data
    
    def is_empty(self):
        """Check if queue is empty - O(1)"""
        return self.front_node is None
    
    def size(self):
        """Return size of queue - O(1)"""
        return self.size


class CircularQueue:
    """Circular Queue Implementation"""
    
    def __init__(self, capacity):
        self.capacity = capacity
        self.items = [None] * capacity
        self.front = 0
        self.rear = -1
        self.size = 0
    
    def enqueue(self, item):
        """Add element - O(1)"""
        if self.is_full():
            raise OverflowError("Queue is full")
        self.rear = (self.rear + 1) % self.capacity
        self.items[self.rear] = item
        self.size += 1
    
    def dequeue(self):
        """Remove and return element - O(1)"""
        if self.is_empty():
            raise IndexError("Queue is empty")
        item = self.items[self.front]
        self.items[self.front] = None
        self.front = (self.front + 1) % self.capacity
        self.size -= 1
        return item
    
    def front(self):
        """Return front element - O(1)"""
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.items[self.front]
    
    def is_empty(self):
        """Check if empty - O(1)"""
        return self.size == 0
    
    def is_full(self):
        """Check if full - O(1)"""
        return self.size == self.capacity


class PriorityQueue:
    """Priority Queue using list (min-heap simulation)"""
    
    def __init__(self):
        self.items = []
    
    def enqueue(self, item, priority):
        """Add element with priority - O(n)"""
        self.items.append((priority, item))
        self.items.sort(key=lambda x: x[0])
    
    def dequeue(self):
        """Remove highest priority element - O(1)"""
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.items.pop(0)[1]
    
    def is_empty(self):
        """Check if empty - O(1)"""
        return len(self.items) == 0


class Deque:
    """Double-ended Queue"""
    
    def __init__(self):
        self.items = []
    
    def add_front(self, item):
        """Add to front - O(n)"""
        self.items.insert(0, item)
    
    def add_rear(self, item):
        """Add to rear - O(1)"""
        self.items.append(item)
    
    def remove_front(self):
        """Remove from front - O(n)"""
        if self.is_empty():
            raise IndexError("Deque is empty")
        return self.items.pop(0)
    
    def remove_rear(self):
        """Remove from rear - O(1)"""
        if self.is_empty():
            raise IndexError("Deque is empty")
        return self.items.pop()
    
    def is_empty(self):
        """Check if empty - O(1)"""
        return len(self.items) == 0
    
    def size(self):
        """Return size - O(1)"""
        return len(self.items)


# Example usage
if __name__ == "__main__":
    # Simple Queue
    print("--- Simple Queue ---")
    queue = Queue()
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    print("Queue:", queue.display())
    print("Front:", queue.front())
    print("Dequeue:", queue.dequeue())
    print("After dequeue:", queue.display())
    
    # Linked Queue
    print("\n--- Linked Queue ---")
    linked_queue = LinkedQueue()
    linked_queue.enqueue(10)
    linked_queue.enqueue(20)
    linked_queue.enqueue(30)
    print("Size:", linked_queue.size())
    print("Front:", linked_queue.front())
    print("Dequeue:", linked_queue.dequeue())
    
    # Circular Queue
    print("\n--- Circular Queue ---")
    circular_queue = CircularQueue(5)
    for i in range(5):
        circular_queue.enqueue(i)
    print("Front:", circular_queue.front())
    print("Dequeue:", circular_queue.dequeue())
    circular_queue.enqueue(99)
    
    # Priority Queue
    print("\n--- Priority Queue ---")
    pq = PriorityQueue()
    pq.enqueue("Task 1", 3)
    pq.enqueue("Task 2", 1)
    pq.enqueue("Task 3", 2)
    print("Dequeue:", pq.dequeue())  # Task 2 (priority 1)
    
    # Deque
    print("\n--- Deque ---")
    dq = Deque()
    dq.add_rear(1)
    dq.add_rear(2)
    dq.add_front(0)
    print("Remove front:", dq.remove_front())
    print("Remove rear:", dq.remove_rear())

