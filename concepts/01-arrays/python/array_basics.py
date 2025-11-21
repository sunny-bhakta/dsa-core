"""
Array Basics in Python
Python lists are dynamic arrays
"""

class DynamicArray:
    """Implementation of a dynamic array"""
    
    def __init__(self, capacity=10):
        self.capacity = capacity
        self.size = 0
        self.data = [None] * capacity
    
    def __len__(self):
        return self.size
    
    def __getitem__(self, index):
        if 0 <= index < self.size:
            return self.data[index]
        raise IndexError("Index out of range")
    
    def __setitem__(self, index, value):
        if 0 <= index < self.size:
            self.data[index] = value
        else:
            raise IndexError("Index out of range")
    
    def append(self, value):
        """Add element at the end - O(1) amortized"""
        if self.size >= self.capacity:
            self._resize()
        self.data[self.size] = value
        self.size += 1
    
    def insert(self, index, value):
        """Insert element at index - O(n)"""
        if index < 0 or index > self.size:
            raise IndexError("Index out of range")
        
        if self.size >= self.capacity:
            self._resize()
        
        # Shift elements to the right
        for i in range(self.size, index, -1):
            self.data[i] = self.data[i - 1]
        
        self.data[index] = value
        self.size += 1
    
    def delete(self, index):
        """Delete element at index - O(n)"""
        if index < 0 or index >= self.size:
            raise IndexError("Index out of range")
        
        # Shift elements to the left
        for i in range(index, self.size - 1):
            self.data[i] = self.data[i + 1]
        
        self.size -= 1
        self.data[self.size] = None
    
    def _resize(self):
        """Double the capacity - O(n)"""
        self.capacity *= 2
        new_data = [None] * self.capacity
        for i in range(self.size):
            new_data[i] = self.data[i]
        self.data = new_data
    
    def search(self, value):
        """Linear search - O(n)"""
        for i in range(self.size):
            if self.data[i] == value:
                return i
        return -1
    
    def display(self):
        """Display array elements"""
        return [self.data[i] for i in range(self.size)]


# Example usage
if __name__ == "__main__":
    # Using Python's built-in list (dynamic array)
    arr = [1, 2, 3, 4, 5]
    print("Original array:", arr)
    
    # Access element - O(1)
    print("Element at index 2:", arr[2])
    
    # Append - O(1) amortized
    arr.append(6)
    print("After append:", arr)
    
    # Insert - O(n)
    arr.insert(0, 0)
    print("After insert at index 0:", arr)
    
    # Delete - O(n)
    arr.remove(3)
    print("After remove 3:", arr)
    
    # Search - O(n)
    index = arr.index(5)
    print("Index of 5:", index)
    
    # Custom DynamicArray
    print("\n--- Custom DynamicArray ---")
    dyn_arr = DynamicArray()
    for i in range(5):
        dyn_arr.append(i * 2)
    print("Array:", dyn_arr.display())
    print("Length:", len(dyn_arr))
    print("Element at index 2:", dyn_arr[2])
    
    dyn_arr.insert(2, 99)
    print("After insert at index 2:", dyn_arr.display())
    
    dyn_arr.delete(1)
    print("After delete at index 1:", dyn_arr.display())

