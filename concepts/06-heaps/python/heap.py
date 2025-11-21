"""
Heap Implementation in Python
"""

class MinHeap:
    """Min Heap Implementation"""
    
    def __init__(self):
        self.heap = []
    
    def parent(self, i):
        """Get parent index"""
        return (i - 1) // 2
    
    def left_child(self, i):
        """Get left child index"""
        return 2 * i + 1
    
    def right_child(self, i):
        """Get right child index"""
        return 2 * i + 2
    
    def swap(self, i, j):
        """Swap two elements"""
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]
    
    def insert(self, val):
        """Insert value - O(log n)"""
        self.heap.append(val)
        self._heapify_up(len(self.heap) - 1)
    
    def _heapify_up(self, i):
        """Move element up to maintain heap property"""
        while i > 0 and self.heap[self.parent(i)] > self.heap[i]:
            self.swap(i, self.parent(i))
            i = self.parent(i)
    
    def extract_min(self):
        """Extract minimum - O(log n)"""
        if not self.heap:
            return None
        
        if len(self.heap) == 1:
            return self.heap.pop()
        
        min_val = self.heap[0]
        self.heap[0] = self.heap.pop()
        self._heapify_down(0)
        
        return min_val
    
    def _heapify_down(self, i):
        """Move element down to maintain heap property"""
        smallest = i
        left = self.left_child(i)
        right = self.right_child(i)
        
        if left < len(self.heap) and self.heap[left] < self.heap[smallest]:
            smallest = left
        
        if right < len(self.heap) and self.heap[right] < self.heap[smallest]:
            smallest = right
        
        if smallest != i:
            self.swap(i, smallest)
            self._heapify_down(smallest)
    
    def peek(self):
        """Get minimum without removing - O(1)"""
        return self.heap[0] if self.heap else None
    
    def size(self):
        """Get heap size - O(1)"""
        return len(self.heap)
    
    def is_empty(self):
        """Check if empty - O(1)"""
        return len(self.heap) == 0
    
    def build_heap(self, arr):
        """Build heap from array - O(n)"""
        self.heap = arr[:]
        for i in range(len(self.heap) // 2 - 1, -1, -1):
            self._heapify_down(i)


class MaxHeap:
    """Max Heap Implementation"""
    
    def __init__(self):
        self.heap = []
    
    def parent(self, i):
        return (i - 1) // 2
    
    def left_child(self, i):
        return 2 * i + 1
    
    def right_child(self, i):
        return 2 * i + 2
    
    def swap(self, i, j):
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]
    
    def insert(self, val):
        """Insert value - O(log n)"""
        self.heap.append(val)
        self._heapify_up(len(self.heap) - 1)
    
    def _heapify_up(self, i):
        while i > 0 and self.heap[self.parent(i)] < self.heap[i]:
            self.swap(i, self.parent(i))
            i = self.parent(i)
    
    def extract_max(self):
        """Extract maximum - O(log n)"""
        if not self.heap:
            return None
        
        if len(self.heap) == 1:
            return self.heap.pop()
        
        max_val = self.heap[0]
        self.heap[0] = self.heap.pop()
        self._heapify_down(0)
        
        return max_val
    
    def _heapify_down(self, i):
        largest = i
        left = self.left_child(i)
        right = self.right_child(i)
        
        if left < len(self.heap) and self.heap[left] > self.heap[largest]:
            largest = left
        
        if right < len(self.heap) and self.heap[right] > self.heap[largest]:
            largest = right
        
        if largest != i:
            self.swap(i, largest)
            self._heapify_down(largest)
    
    def peek(self):
        """Get maximum without removing - O(1)"""
        return self.heap[0] if self.heap else None


# Example usage
if __name__ == "__main__":
    # Min Heap
    print("--- Min Heap ---")
    min_heap = MinHeap()
    for val in [3, 1, 6, 5, 2, 4]:
        min_heap.insert(val)
    
    print("Heap:", min_heap.heap)
    print("Extract min:", min_heap.extract_min())
    print("After extraction:", min_heap.heap)
    
    # Max Heap
    print("\n--- Max Heap ---")
    max_heap = MaxHeap()
    for val in [3, 1, 6, 5, 2, 4]:
        max_heap.insert(val)
    
    print("Heap:", max_heap.heap)
    print("Extract max:", max_heap.extract_max())
    print("After extraction:", max_heap.heap)
    
    # Build heap from array
    print("\n--- Build Heap ---")
    arr = [4, 10, 3, 5, 1]
    heap = MinHeap()
    heap.build_heap(arr)
    print("Built heap:", heap.heap)

