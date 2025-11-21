"""
Common Queue Problems
"""

from collections import deque

def queue_using_stacks():
    """
    Implement queue using two stacks
    """
    class QueueUsingStacks:
        def __init__(self):
            self.stack1 = []
            self.stack2 = []
        
        def enqueue(self, item):
            """O(1)"""
            self.stack1.append(item)
        
        def dequeue(self):
            """O(n) amortized"""
            if not self.stack2:
                while self.stack1:
                    self.stack2.append(self.stack1.pop())
            if not self.stack2:
                raise IndexError("Queue is empty")
            return self.stack2.pop()
        
        def front(self):
            if not self.stack2:
                while self.stack1:
                    self.stack2.append(self.stack1.pop())
            if not self.stack2:
                raise IndexError("Queue is empty")
            return self.stack2[-1]
        
        def is_empty(self):
            return len(self.stack1) == 0 and len(self.stack2) == 0
    
    return QueueUsingStacks


def sliding_window_maximum(nums, k):
    """
    Find maximum in each sliding window
    Time: O(n), Space: O(k)
    """
    if not nums:
        return []
    
    result = []
    dq = deque()  # Store indices
    
    for i in range(len(nums)):
        # Remove indices outside window
        while dq and dq[0] <= i - k:
            dq.popleft()
        
        # Remove indices with smaller values
        while dq and nums[dq[-1]] <= nums[i]:
            dq.pop()
        
        dq.append(i)
        
        # Add maximum to result when window is complete
        if i >= k - 1:
            result.append(nums[dq[0]])
    
    return result


def first_non_repeating_char(stream):
    """
    Find first non-repeating character in stream
    Time: O(n), Space: O(n)
    """
    from collections import deque, Counter
    
    queue = deque()
    count = Counter()
    result = []
    
    for char in stream:
        count[char] += 1
        queue.append(char)
        
        while queue and count[queue[0]] > 1:
            queue.popleft()
        
        result.append(queue[0] if queue else '#')
    
    return result


def level_order_traversal(root):
    """
    Level-order (BFS) tree traversal using queue
    Time: O(n), Space: O(n)
    """
    if not root:
        return []
    
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


def bfs_graph(graph, start):
    """
    BFS traversal of graph using queue
    Time: O(V + E), Space: O(V)
    """
    visited = set()
    queue = deque([start])
    visited.add(start)
    result = []
    
    while queue:
        node = queue.popleft()
        result.append(node)
        
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return result


def design_circular_queue(k):
    """
    Design circular queue
    """
    class MyCircularQueue:
        def __init__(self, k):
            self.capacity = k
            self.items = [None] * k
            self.front = 0
            self.rear = -1
            self.size = 0
        
        def enQueue(self, value):
            if self.isFull():
                return False
            self.rear = (self.rear + 1) % self.capacity
            self.items[self.rear] = value
            self.size += 1
            return True
        
        def deQueue(self):
            if self.isEmpty():
                return False
            self.items[self.front] = None
            self.front = (self.front + 1) % self.capacity
            self.size -= 1
            return True
        
        def Front(self):
            return -1 if self.isEmpty() else self.items[self.front]
        
        def Rear(self):
            return -1 if self.isEmpty() else self.items[self.rear]
        
        def isEmpty(self):
            return self.size == 0
        
        def isFull(self):
            return self.size == self.capacity
    
    return MyCircularQueue


# Example usage
if __name__ == "__main__":
    # Queue using stacks
    print("--- Queue using Stacks ---")
    q = queue_using_stacks()()
    q.enqueue(1)
    q.enqueue(2)
    q.enqueue(3)
    print("Front:", q.front())
    print("Dequeue:", q.dequeue())
    
    # Sliding window maximum
    nums = [1, 3, -1, -3, 5, 3, 6, 7]
    k = 3
    print("\nSliding window maximum:", sliding_window_maximum(nums, k))
    
    # First non-repeating character
    stream = "aabcbc"
    print("First non-repeating:", first_non_repeating_char(stream))
    
    # BFS Graph
    graph = {
        'A': ['B', 'C'],
        'B': ['D', 'E'],
        'C': ['F'],
        'D': [],
        'E': [],
        'F': []
    }
    print("BFS traversal:", bfs_graph(graph, 'A'))

