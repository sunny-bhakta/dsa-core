"""
Hash Table Implementation in Python
"""

class HashNode:
    """Node for chaining"""
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.next = None


class HashTable:
    """Hash Table with Chaining"""
    
    def __init__(self, capacity=10, load_factor=0.75):
        self.capacity = capacity
        self.load_factor = load_factor
        self.size = 0
        self.buckets = [None] * capacity
    
    def _hash(self, key):
        """Hash function - division method"""
        if isinstance(key, int):
            return key % self.capacity
        # For strings
        hash_val = 0
        for char in str(key):
            hash_val = (hash_val * 31 + ord(char)) % self.capacity
        return hash_val
    
    def _resize(self):
        """Resize and rehash - O(n)"""
        old_buckets = self.buckets
        self.capacity *= 2
        self.buckets = [None] * self.capacity
        self.size = 0
        
        for bucket in old_buckets:
            current = bucket
            while current:
                self.put(current.key, current.value)
                current = current.next
    
    def put(self, key, value):
        """Insert/Update - O(1) average, O(n) worst"""
        index = self._hash(key)
        
        # Check if key exists
        current = self.buckets[index]
        while current:
            if current.key == key:
                current.value = value
                return
            current = current.next
        
        # Insert new node
        new_node = HashNode(key, value)
        new_node.next = self.buckets[index]
        self.buckets[index] = new_node
        self.size += 1
        
        # Check load factor
        if self.size > self.capacity * self.load_factor:
            self._resize()
    
    def get(self, key):
        """Get value - O(1) average, O(n) worst"""
        index = self._hash(key)
        current = self.buckets[index]
        
        while current:
            if current.key == key:
                return current.value
            current = current.next
        
        return None
    
    def remove(self, key):
        """Remove key - O(1) average, O(n) worst"""
        index = self._hash(key)
        current = self.buckets[index]
        prev = None
        
        while current:
            if current.key == key:
                if prev:
                    prev.next = current.next
                else:
                    self.buckets[index] = current.next
                self.size -= 1
                return True
            prev = current
            current = current.next
        
        return False
    
    def contains(self, key):
        """Check if key exists - O(1) average"""
        return self.get(key) is not None
    
    def __len__(self):
        return self.size


class HashTableOpenAddressing:
    """Hash Table with Linear Probing"""
    
    def __init__(self, capacity=10):
        self.capacity = capacity
        self.size = 0
        self.keys = [None] * capacity
        self.values = [None] * capacity
        self.DELETED = object()  # Marker for deleted entries
    
    def _hash(self, key):
        """Hash function"""
        if isinstance(key, int):
            return key % self.capacity
        hash_val = 0
        for char in str(key):
            hash_val = (hash_val * 31 + ord(char)) % self.capacity
        return hash_val
    
    def _probe(self, key):
        """Linear probing"""
        index = self._hash(key)
        initial_index = index
        
        while (self.keys[index] is not None and 
               self.keys[index] != self.DELETED and
               self.keys[index] != key):
            index = (index + 1) % self.capacity
            if index == initial_index:  # Table is full
                return -1
        return index
    
    def put(self, key, value):
        """Insert/Update - O(1) average"""
        if self.size >= self.capacity:
            return False
        
        index = self._probe(key)
        if index == -1:
            return False
        
        if self.keys[index] is None or self.keys[index] == self.DELETED:
            self.size += 1
        
        self.keys[index] = key
        self.values[index] = value
        return True
    
    def get(self, key):
        """Get value - O(1) average"""
        index = self._hash(key)
        initial_index = index
        
        while self.keys[index] is not None:
            if self.keys[index] == key:
                return self.values[index]
            index = (index + 1) % self.capacity
            if index == initial_index:
                break
        
        return None
    
    def remove(self, key):
        """Remove key - O(1) average"""
        index = self._hash(key)
        initial_index = index
        
        while self.keys[index] is not None:
            if self.keys[index] == key:
                self.keys[index] = self.DELETED
                self.values[index] = None
                self.size -= 1
                return True
            index = (index + 1) % self.capacity
            if index == initial_index:
                break
        
        return False


# Example usage
if __name__ == "__main__":
    # Chaining
    print("--- Hash Table with Chaining ---")
    ht = HashTable()
    ht.put("apple", 1)
    ht.put("banana", 2)
    ht.put("cherry", 3)
    
    print("Get 'apple':", ht.get("apple"))
    print("Contains 'banana':", ht.contains("banana"))
    print("Size:", len(ht))
    
    ht.remove("banana")
    print("After removing 'banana', contains:", ht.contains("banana"))
    
    # Open Addressing
    print("\n--- Hash Table with Open Addressing ---")
    ht2 = HashTableOpenAddressing()
    ht2.put(1, "one")
    ht2.put(2, "two")
    ht2.put(11, "eleven")  # Will probe
    
    print("Get 1:", ht2.get(1))
    print("Get 11:", ht2.get(11))
    ht2.remove(1)
    print("After removing 1, get 1:", ht2.get(1))

