"""
Advanced Hashing Methods in Python
"""

class MultiplicationHashTable:
    """Hash Table using Multiplication Method"""
    
    def __init__(self, capacity=16, A=0.6180339887):
        """
        Multiplication method: h(k) = floor(m * (k * A mod 1))
        A is typically (√5 - 1) / 2 ≈ 0.618
        """
        self.capacity = capacity
        self.A = A  # Multiplicative constant
        self.table = [None] * capacity
        self.size = 0
    
    def _hash(self, key):
        """Multiplication hash function"""
        if isinstance(key, int):
            fractional = (key * self.A) % 1
            return int(self.capacity * fractional)
        # For strings, convert to integer first
        key_int = sum(ord(c) * (31 ** i) for i, c in enumerate(str(key)))
        fractional = (key_int * self.A) % 1
        return int(self.capacity * fractional)
    
    def put(self, key, value):
        """Insert/Update - O(1) average"""
        index = self._hash(key)
        self.table[index] = (key, value)
        self.size += 1
    
    def get(self, key):
        """Get value - O(1) average"""
        index = self._hash(key)
        if self.table[index] and self.table[index][0] == key:
            return self.table[index][1]
        return None


class QuadraticProbingHashTable:
    """Hash Table with Quadratic Probing"""
    
    def __init__(self, capacity=16):
        self.capacity = capacity
        self.table = [None] * capacity
        self.size = 0
        self.DELETED = object()
    
    def _hash(self, key):
        """Primary hash function"""
        if isinstance(key, int):
            return key % self.capacity
        hash_val = 0
        for char in str(key):
            hash_val = (hash_val * 31 + ord(char)) % self.capacity
        return hash_val
    
    def _quadratic_probe(self, key):
        """Quadratic probing: (h(k) + i²) mod m"""
        index = self._hash(key)
        i = 0
        
        while i < self.capacity:
            probe_index = (index + i * i) % self.capacity
            if (self.table[probe_index] is None or 
                self.table[probe_index] == self.DELETED or
                self.table[probe_index][0] == key):
                return probe_index
            i += 1
        
        return -1  # Table full
    
    def put(self, key, value):
        """Insert/Update - O(1) average"""
        index = self._quadratic_probe(key)
        if index == -1:
            return False
        
        if self.table[index] is None or self.table[index] == self.DELETED:
            self.size += 1
        
        self.table[index] = (key, value)
        return True
    
    def get(self, key):
        """Get value - O(1) average"""
        index = self._hash(key)
        i = 0
        
        while i < self.capacity:
            probe_index = (index + i * i) % self.capacity
            if self.table[probe_index] is None:
                return None
            if (self.table[probe_index] != self.DELETED and 
                self.table[probe_index][0] == key):
                return self.table[probe_index][1]
            i += 1
        
        return None
    
    def remove(self, key):
        """Remove key - O(1) average"""
        index = self._hash(key)
        i = 0
        
        while i < self.capacity:
            probe_index = (index + i * i) % self.capacity
            if self.table[probe_index] is None:
                return False
            if (self.table[probe_index] != self.DELETED and 
                self.table[probe_index][0] == key):
                self.table[probe_index] = self.DELETED
                self.size -= 1
                return True
            i += 1
        
        return False


class DoubleHashingHashTable:
    """Hash Table with Double Hashing"""
    
    def __init__(self, capacity=16):
        self.capacity = capacity
        self.table = [None] * capacity
        self.size = 0
        self.DELETED = object()
    
    def _hash1(self, key):
        """Primary hash function"""
        if isinstance(key, int):
            return key % self.capacity
        hash_val = 0
        for char in str(key):
            hash_val = (hash_val * 31 + ord(char)) % self.capacity
        return hash_val
    
    def _hash2(self, key):
        """Secondary hash function: h2(k) = 1 + (k mod (m-1))"""
        if isinstance(key, int):
            return 1 + (key % (self.capacity - 1))
        key_int = sum(ord(c) for c in str(key))
        return 1 + (key_int % (self.capacity - 1))
    
    def _double_hash_probe(self, key):
        """Double hashing: (h1(k) + i * h2(k)) mod m"""
        hash1 = self._hash1(key)
        hash2 = self._hash2(key)
        i = 0
        
        while i < self.capacity:
            probe_index = (hash1 + i * hash2) % self.capacity
            if (self.table[probe_index] is None or 
                self.table[probe_index] == self.DELETED or
                self.table[probe_index][0] == key):
                return probe_index
            i += 1
        
        return -1  # Table full
    
    def put(self, key, value):
        """Insert/Update - O(1) average"""
        index = self._double_hash_probe(key)
        if index == -1:
            return False
        
        if self.table[index] is None or self.table[index] == self.DELETED:
            self.size += 1
        
        self.table[index] = (key, value)
        return True
    
    def get(self, key):
        """Get value - O(1) average"""
        hash1 = self._hash1(key)
        hash2 = self._hash2(key)
        i = 0
        
        while i < self.capacity:
            probe_index = (hash1 + i * hash2) % self.capacity
            if self.table[probe_index] is None:
                return None
            if (self.table[probe_index] != self.DELETED and 
                self.table[probe_index][0] == key):
                return self.table[probe_index][1]
            i += 1
        
        return None
    
    def remove(self, key):
        """Remove key - O(1) average"""
        hash1 = self._hash1(key)
        hash2 = self._hash2(key)
        i = 0
        
        while i < self.capacity:
            probe_index = (hash1 + i * hash2) % self.capacity
            if self.table[probe_index] is None:
                return False
            if (self.table[probe_index] != self.DELETED and 
                self.table[probe_index][0] == key):
                self.table[probe_index] = self.DELETED
                self.size -= 1
                return True
            i += 1
        
        return False


# Example usage
if __name__ == "__main__":
    # Multiplication Method
    print("--- Multiplication Hash Method ---")
    mult_ht = MultiplicationHashTable(capacity=10)
    mult_ht.put(10, "ten")
    mult_ht.put(20, "twenty")
    mult_ht.put(30, "thirty")
    print("Get 10:", mult_ht.get(10))
    print("Get 20:", mult_ht.get(20))
    
    # Quadratic Probing
    print("\n--- Quadratic Probing ---")
    quad_ht = QuadraticProbingHashTable(capacity=10)
    quad_ht.put(5, "five")
    quad_ht.put(15, "fifteen")  # Will probe
    quad_ht.put(25, "twenty-five")  # Will probe
    print("Get 5:", quad_ht.get(5))
    print("Get 15:", quad_ht.get(15))
    print("Get 25:", quad_ht.get(25))
    quad_ht.remove(15)
    print("After removing 15, get 15:", quad_ht.get(15))
    
    # Double Hashing
    print("\n--- Double Hashing ---")
    double_ht = DoubleHashingHashTable(capacity=10)
    double_ht.put(7, "seven")
    double_ht.put(17, "seventeen")  # Will probe
    double_ht.put(27, "twenty-seven")  # Will probe
    print("Get 7:", double_ht.get(7))
    print("Get 17:", double_ht.get(17))
    print("Get 27:", double_ht.get(27))
    double_ht.remove(17)
    print("After removing 17, get 17:", double_ht.get(17))

