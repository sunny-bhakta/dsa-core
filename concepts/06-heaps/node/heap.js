/**
 * Heap Implementation in Node.js
 */

class MinHeap {
    /**
     * Min Heap Implementation
     */
    constructor() {
        this.heap = [];
    }

    parent(i) {
        return Math.floor((i - 1) / 2);
    }

    leftChild(i) {
        return 2 * i + 1;
    }

    rightChild(i) {
        return 2 * i + 2;
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    /**
     * Insert value - O(log n)
     */
    insert(val) {
        this.heap.push(val);
        this._heapifyUp(this.heap.length - 1);
    }

    _heapifyUp(i) {
        while (i > 0 && this.heap[this.parent(i)] > this.heap[i]) {
            this.swap(i, this.parent(i));
            i = this.parent(i);
        }
    }

    /**
     * Extract minimum - O(log n)
     */
    extractMin() {
        if (this.heap.length === 0) {
            return null;
        }

        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const minVal = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._heapifyDown(0);

        return minVal;
    }

    _heapifyDown(i) {
        let smallest = i;
        const left = this.leftChild(i);
        const right = this.rightChild(i);

        if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
            smallest = left;
        }

        if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
            smallest = right;
        }

        if (smallest !== i) {
            this.swap(i, smallest);
            this._heapifyDown(smallest);
        }
    }

    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    /**
     * Build heap from array - O(n)
     */
    buildHeap(arr) {
        this.heap = [...arr];
        for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
            this._heapifyDown(i);
        }
    }
}

class MaxHeap {
    /**
     * Max Heap Implementation
     */
    constructor() {
        this.heap = [];
    }

    parent(i) {
        return Math.floor((i - 1) / 2);
    }

    leftChild(i) {
        return 2 * i + 1;
    }

    rightChild(i) {
        return 2 * i + 2;
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    /**
     * Insert value - O(log n)
     */
    insert(val) {
        this.heap.push(val);
        this._heapifyUp(this.heap.length - 1);
    }

    _heapifyUp(i) {
        while (i > 0 && this.heap[this.parent(i)] < this.heap[i]) {
            this.swap(i, this.parent(i));
            i = this.parent(i);
        }
    }

    /**
     * Extract maximum - O(log n)
     */
    extractMax() {
        if (this.heap.length === 0) {
            return null;
        }

        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const maxVal = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._heapifyDown(0);

        return maxVal;
    }

    _heapifyDown(i) {
        let largest = i;
        const left = this.leftChild(i);
        const right = this.rightChild(i);

        if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
            largest = left;
        }

        if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
            largest = right;
        }

        if (largest !== i) {
            this.swap(i, largest);
            this._heapifyDown(largest);
        }
    }

    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }
}

// Example usage
if (require.main === module) {
    // Min Heap
    console.log("--- Min Heap ---");
    const minHeap = new MinHeap();
    [3, 1, 6, 5, 2, 4].forEach(val => minHeap.insert(val));

    console.log("Heap:", minHeap.heap);
    console.log("Extract min:", minHeap.extractMin());
    console.log("After extraction:", minHeap.heap);

    // Max Heap
    console.log("\n--- Max Heap ---");
    const maxHeap = new MaxHeap();
    [3, 1, 6, 5, 2, 4].forEach(val => maxHeap.insert(val));

    console.log("Heap:", maxHeap.heap);
    console.log("Extract max:", maxHeap.extractMax());
    console.log("After extraction:", maxHeap.heap);

    // Build heap from array
    console.log("\n--- Build Heap ---");
    const arr = [4, 10, 3, 5, 1];
    const heap = new MinHeap();
    heap.buildHeap(arr);
    console.log("Built heap:", heap.heap);
}

module.exports = { MinHeap, MaxHeap };

