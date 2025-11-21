/**
 * Advanced Hashing Methods in Node.js
 */

/**
 * Hash Table using Multiplication Method
 * Multiplication method: h(k) = floor(m * (k * A mod 1))
 * A is typically (√5 - 1) / 2 ≈ 0.618
 */
class MultiplicationHashTable {
    constructor(capacity = 16, A = 0.6180339887) {
        this.capacity = capacity;
        this.A = A; // Multiplicative constant
        this.table = new Array(capacity).fill(null);
        this.size = 0;
    }

    /**
     * Multiplication hash function
     */
    _hash(key) {
        let keyInt;
        if (typeof key === 'number') {
            keyInt = key;
        } else {
            // For strings, convert to integer first
            keyInt = String(key).split('').reduce((acc, c, i) => 
                acc + c.charCodeAt(0) * Math.pow(31, i), 0);
        }
        const fractional = (keyInt * this.A) % 1;
        return Math.floor(this.capacity * fractional);
    }

    /**
     * Insert/Update - O(1) average
     */
    put(key, value) {
        const index = this._hash(key);
        this.table[index] = [key, value];
        this.size++;
    }

    /**
     * Get value - O(1) average
     */
    get(key) {
        const index = this._hash(key);
        if (this.table[index] && this.table[index][0] === key) {
            return this.table[index][1];
        }
        return null;
    }
}

/**
 * Hash Table with Quadratic Probing
 */
class QuadraticProbingHashTable {
    constructor(capacity = 16) {
        this.capacity = capacity;
        this.table = new Array(capacity).fill(null);
        this.size = 0;
        this.DELETED = Symbol('DELETED');
    }

    /**
     * Primary hash function
     */
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

    /**
     * Quadratic probing: (h(k) + i²) mod m
     */
    _quadraticProbe(key) {
        const index = this._hash(key);
        let i = 0;

        while (i < this.capacity) {
            const probeIndex = (index + i * i) % this.capacity;
            if (this.table[probeIndex] === null ||
                this.table[probeIndex] === this.DELETED ||
                (this.table[probeIndex] && this.table[probeIndex][0] === key)) {
                return probeIndex;
            }
            i++;
        }

        return -1; // Table full
    }

    /**
     * Insert/Update - O(1) average
     */
    put(key, value) {
        const index = this._quadraticProbe(key);
        if (index === -1) {
            return false;
        }

        if (this.table[index] === null || this.table[index] === this.DELETED) {
            this.size++;
        }

        this.table[index] = [key, value];
        return true;
    }

    /**
     * Get value - O(1) average
     */
    get(key) {
        const index = this._hash(key);
        let i = 0;

        while (i < this.capacity) {
            const probeIndex = (index + i * i) % this.capacity;
            if (this.table[probeIndex] === null) {
                return null;
            }
            if (this.table[probeIndex] !== this.DELETED &&
                this.table[probeIndex][0] === key) {
                return this.table[probeIndex][1];
            }
            i++;
        }

        return null;
    }

    /**
     * Remove key - O(1) average
     */
    remove(key) {
        const index = this._hash(key);
        let i = 0;

        while (i < this.capacity) {
            const probeIndex = (index + i * i) % this.capacity;
            if (this.table[probeIndex] === null) {
                return false;
            }
            if (this.table[probeIndex] !== this.DELETED &&
                this.table[probeIndex][0] === key) {
                this.table[probeIndex] = this.DELETED;
                this.size--;
                return true;
            }
            i++;
        }

        return false;
    }
}

/**
 * Hash Table with Double Hashing
 */
class DoubleHashingHashTable {
    constructor(capacity = 16) {
        this.capacity = capacity;
        this.table = new Array(capacity).fill(null);
        this.size = 0;
        this.DELETED = Symbol('DELETED');
    }

    /**
     * Primary hash function
     */
    _hash1(key) {
        if (typeof key === 'number') {
            return key % this.capacity;
        }
        let hashVal = 0;
        for (const char of String(key)) {
            hashVal = (hashVal * 31 + char.charCodeAt(0)) % this.capacity;
        }
        return hashVal;
    }

    /**
     * Secondary hash function: h2(k) = 1 + (k mod (m-1))
     */
    _hash2(key) {
        let keyInt;
        if (typeof key === 'number') {
            keyInt = key;
        } else {
            keyInt = String(key).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
        }
        return 1 + (keyInt % (this.capacity - 1));
    }

    /**
     * Double hashing: (h1(k) + i * h2(k)) mod m
     */
    _doubleHashProbe(key) {
        const hash1 = this._hash1(key);
        const hash2 = this._hash2(key);
        let i = 0;

        while (i < this.capacity) {
            const probeIndex = (hash1 + i * hash2) % this.capacity;
            if (this.table[probeIndex] === null ||
                this.table[probeIndex] === this.DELETED ||
                (this.table[probeIndex] && this.table[probeIndex][0] === key)) {
                return probeIndex;
            }
            i++;
        }

        return -1; // Table full
    }

    /**
     * Insert/Update - O(1) average
     */
    put(key, value) {
        const index = this._doubleHashProbe(key);
        if (index === -1) {
            return false;
        }

        if (this.table[index] === null || this.table[index] === this.DELETED) {
            this.size++;
        }

        this.table[index] = [key, value];
        return true;
    }

    /**
     * Get value - O(1) average
     */
    get(key) {
        const hash1 = this._hash1(key);
        const hash2 = this._hash2(key);
        let i = 0;

        while (i < this.capacity) {
            const probeIndex = (hash1 + i * hash2) % this.capacity;
            if (this.table[probeIndex] === null) {
                return null;
            }
            if (this.table[probeIndex] !== this.DELETED &&
                this.table[probeIndex][0] === key) {
                return this.table[probeIndex][1];
            }
            i++;
        }

        return null;
    }

    /**
     * Remove key - O(1) average
     */
    remove(key) {
        const hash1 = this._hash1(key);
        const hash2 = this._hash2(key);
        let i = 0;

        while (i < this.capacity) {
            const probeIndex = (hash1 + i * hash2) % this.capacity;
            if (this.table[probeIndex] === null) {
                return false;
            }
            if (this.table[probeIndex] !== this.DELETED &&
                this.table[probeIndex][0] === key) {
                this.table[probeIndex] = this.DELETED;
                this.size--;
                return true;
            }
            i++;
        }

        return false;
    }
}

// Example usage
if (require.main === module) {
    // Multiplication Method
    console.log("--- Multiplication Hash Method ---");
    const multHt = new MultiplicationHashTable(10);
    multHt.put(10, "ten");
    multHt.put(20, "twenty");
    multHt.put(30, "thirty");
    console.log("Get 10:", multHt.get(10));
    console.log("Get 20:", multHt.get(20));

    // Quadratic Probing
    console.log("\n--- Quadratic Probing ---");
    const quadHt = new QuadraticProbingHashTable(10);
    quadHt.put(5, "five");
    quadHt.put(15, "fifteen"); // Will probe
    quadHt.put(25, "twenty-five"); // Will probe
    console.log("Get 5:", quadHt.get(5));
    console.log("Get 15:", quadHt.get(15));
    console.log("Get 25:", quadHt.get(25));
    quadHt.remove(15);
    console.log("After removing 15, get 15:", quadHt.get(15));

    // Double Hashing
    console.log("\n--- Double Hashing ---");
    const doubleHt = new DoubleHashingHashTable(10);
    doubleHt.put(7, "seven");
    doubleHt.put(17, "seventeen"); // Will probe
    doubleHt.put(27, "twenty-seven"); // Will probe
    console.log("Get 7:", doubleHt.get(7));
    console.log("Get 17:", doubleHt.get(17));
    console.log("Get 27:", doubleHt.get(27));
    doubleHt.remove(17);
    console.log("After removing 17, get 17:", doubleHt.get(17));
}

module.exports = {
    MultiplicationHashTable,
    QuadraticProbingHashTable,
    DoubleHashingHashTable
};

