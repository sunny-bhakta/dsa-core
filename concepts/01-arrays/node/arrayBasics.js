/**
 * Array Basics in Node.js
 * JavaScript arrays are dynamic arrays
 */

class DynamicArray {
    /**
     * Implementation of a dynamic array
     */
    constructor(capacity = 10) {
        this.capacity = capacity;
        this.size = 0;
        this.data = new Array(capacity).fill(null);
    }

    /**
     * Get length of array
     */
    get length() {
        return this.size;
    }

    /**
     * Get element at index - O(1)
     */
    get(index) {
        if (index >= 0 && index < this.size) {
            return this.data[index];
        }
        throw new Error("Index out of range");
    }

    /**
     * Set element at index - O(1)
     */
    set(index, value) {
        if (index >= 0 && index < this.size) {
            this.data[index] = value;
        } else {
            throw new Error("Index out of range");
        }
    }

    /**
     * Add element at the end - O(1) amortized
     */
    append(value) {
        if (this.size >= this.capacity) {
            this._resize();
        }
        this.data[this.size] = value;
        this.size++;
    }

    /**
     * Insert element at index - O(n)
     */
    insert(index, value) {
        if (index < 0 || index > this.size) {
            throw new Error("Index out of range");
        }

        if (this.size >= this.capacity) {
            this._resize();
        }

        // Shift elements to the right
        for (let i = this.size; i > index; i--) {
            this.data[i] = this.data[i - 1];
        }

        this.data[index] = value;
        this.size++;
    }

    /**
     * Delete element at index - O(n)
     */
    delete(index) {
        if (index < 0 || index >= this.size) {
            throw new Error("Index out of range");
        }

        // Shift elements to the left
        for (let i = index; i < this.size - 1; i++) {
            this.data[i] = this.data[i + 1];
        }

        this.size--;
        this.data[this.size] = null;
    }

    /**
     * Double the capacity - O(n)
     */
    _resize() {
        this.capacity *= 2;
        const newData = new Array(this.capacity).fill(null);
        for (let i = 0; i < this.size; i++) {
            newData[i] = this.data[i];
        }
        this.data = newData;
    }

    /**
     * Linear search - O(n)
     */
    search(value) {
        for (let i = 0; i < this.size; i++) {
            if (this.data[i] === value) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Display array elements
     */
    display() {
        return this.data.slice(0, this.size);
    }
}

// Example usage
if (require.main === module) {
    // Using JavaScript's built-in array (dynamic array)
    const arr = [1, 2, 3, 4, 5];
    console.log("Original array:", arr);

    // Access element - O(1)
    console.log("Element at index 2:", arr[2]);

    // Append - O(1) amortized
    arr.push(6);
    console.log("After push:", arr);

    // Insert - O(n)
    arr.splice(0, 0, 0);
    console.log("After insert at index 0:", arr);

    // Delete - O(n)
    const index = arr.indexOf(3);
    if (index > -1) {
        arr.splice(index, 1);
    }
    console.log("After remove 3:", arr);

    // Search - O(n)
    const searchIndex = arr.indexOf(5);
    console.log("Index of 5:", searchIndex);

    // Custom DynamicArray
    console.log("\n--- Custom DynamicArray ---");
    const dynArr = new DynamicArray();
    for (let i = 0; i < 5; i++) {
        dynArr.append(i * 2);
    }
    console.log("Array:", dynArr.display());
    console.log("Length:", dynArr.length);
    console.log("Element at index 2:", dynArr.get(2));

    dynArr.insert(2, 99);
    console.log("After insert at index 2:", dynArr.display());

    dynArr.delete(1);
    console.log("After delete at index 1:", dynArr.display());
}

module.exports = DynamicArray;

