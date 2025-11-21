/**
 * Hash Table Implementation in Node.js
 */

class HashNode {
    /**
     * Node for chaining
     */
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class HashTable {
    /**
     * Hash Table with Chaining
     */
    constructor(capacity = 10, loadFactor = 0.75) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.size = 0;
        this.buckets = new Array(capacity).fill(null);
    }

    /**
     * Hash function - division method
     */
    _hash(key) {
        if (typeof key === 'number') {
            return key % this.capacity;
        }
        // For strings
        let hashVal = 0;
        for (const char of String(key)) {
            hashVal = (hashVal * 31 + char.charCodeAt(0)) % this.capacity;
        }
        return hashVal;
    }

    /**
     * Resize and rehash - O(n)
     */
    _resize() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;

        for (const bucket of oldBuckets) {
            let current = bucket;
            while (current) {
                this.put(current.key, current.value);
                current = current.next;
            }
        }
    }

    /**
     * Insert/Update - O(1) average, O(n) worst
     */
    put(key, value) {
        const index = this._hash(key);

        // Check if key exists
        let current = this.buckets[index];
        while (current) {
            if (current.key === key) {
                current.value = value;
                return;
            }
            current = current.next;
        }

        // Insert new node
        const newNode = new HashNode(key, value);
        newNode.next = this.buckets[index];
        this.buckets[index] = newNode;
        this.size++;

        // Check load factor
        if (this.size > this.capacity * this.loadFactor) {
            this._resize();
        }
    }

    /**
     * Get value - O(1) average, O(n) worst
     */
    get(key) {
        const index = this._hash(key);
        let current = this.buckets[index];

        while (current) {
            if (current.key === key) {
                return current.value;
            }
            current = current.next;
        }

        return null;
    }

    /**
     * Remove key - O(1) average, O(n) worst
     */
    remove(key) {
        const index = this._hash(key);
        let current = this.buckets[index];
        let prev = null;

        while (current) {
            if (current.key === key) {
                if (prev) {
                    prev.next = current.next;
                } else {
                    this.buckets[index] = current.next;
                }
                this.size--;
                return true;
            }
            prev = current;
            current = current.next;
        }

        return false;
    }

    /**
     * Check if key exists - O(1) average
     */
    contains(key) {
        return this.get(key) !== null;
    }

    get length() {
        return this.size;
    }
}

class HashTableOpenAddressing {
    /**
     * Hash Table with Linear Probing
     */
    constructor(capacity = 10) {
        this.capacity = capacity;
        this.size = 0;
        this.keys = new Array(capacity).fill(null);
        this.values = new Array(capacity).fill(null);
        this.DELETED = Symbol('DELETED');
    }

    _hash(key) {
        if (typeof key === 'number') {
            return key % this.capacity;
        }
        let hashVal = 0;
        for (const char of String(key)) {
            hashVal = (hashVal * 31 + char.charCodeAt(0)) % this.capacity;
        }
        return hashVal;
    }

    _probe(key) {
        let index = this._hash(key);
        const initialIndex = index;

        while (this.keys[index] !== null &&
            this.keys[index] !== this.DELETED &&
            this.keys[index] !== key) {
            index = (index + 1) % this.capacity;
            if (index === initialIndex) {
                return -1;
            }
        }
        return index;
    }

    put(key, value) {
        if (this.size >= this.capacity) {
            return false;
        }

        const index = this._probe(key);
        if (index === -1) {
            return false;
        }

        if (this.keys[index] === null || this.keys[index] === this.DELETED) {
            this.size++;
        }

        this.keys[index] = key;
        this.values[index] = value;
        return true;
    }

    get(key) {
        let index = this._hash(key);
        const initialIndex = index;

        while (this.keys[index] !== null) {
            if (this.keys[index] === key) {
                return this.values[index];
            }
            index = (index + 1) % this.capacity;
            if (index === initialIndex) {
                break;
            }
        }

        return null;
    }

    remove(key) {
        let index = this._hash(key);
        const initialIndex = index;

        while (this.keys[index] !== null) {
            if (this.keys[index] === key) {
                this.keys[index] = this.DELETED;
                this.values[index] = null;
                this.size--;
                return true;
            }
            index = (index + 1) % this.capacity;
            if (index === initialIndex) {
                break;
            }
        }

        return false;
    }
}

// Example usage
if (require.main === module) {
    // Chaining
    console.log("--- Hash Table with Chaining ---");
    const ht = new HashTable();
    ht.put("apple", 1);
    ht.put("banana", 2);
    ht.put("cherry", 3);

    console.log("Get 'apple':", ht.get("apple"));
    console.log("Contains 'banana':", ht.contains("banana"));
    console.log("Size:", ht.length);

    ht.remove("banana");
    console.log("After removing 'banana', contains:", ht.contains("banana"));

    // Open Addressing
    console.log("\n--- Hash Table with Open Addressing ---");
    const ht2 = new HashTableOpenAddressing();
    ht2.put(1, "one");
    ht2.put(2, "two");
    ht2.put(11, "eleven");

    console.log("Get 1:", ht2.get(1));
    console.log("Get 11:", ht2.get(11));
    ht2.remove(1);
    console.log("After removing 1, get 1:", ht2.get(1));
}

module.exports = { HashTable, HashTableOpenAddressing };

