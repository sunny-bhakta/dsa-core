/**
 * Queue Implementation in Node.js
 */

class Queue {
    /**
     * Array-based Queue Implementation
     */
    constructor() {
        this.items = [];
    }

    /**
     * Add element to rear - O(1)
     */
    enqueue(item) {
        this.items.push(item);
    }

    /**
     * Remove and return front element - O(1)
     */
    dequeue() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        return this.items.shift();
    }

    /**
     * Return front element without removing - O(1)
     */
    front() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        return this.items[0];
    }

    /**
     * Check if queue is empty - O(1)
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Return size of queue - O(1)
     */
    size() {
        return this.items.length;
    }

    /**
     * Display all elements
     */
    display() {
        return [...this.items];
    }
}

class QueueNode {
    /**
     * Node for linked list-based queue
     */
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedQueue {
    /**
     * Linked List-based Queue Implementation
     */
    constructor() {
        this.frontNode = null;
        this.rearNode = null;
        this.size = 0;
    }

    /**
     * Add element to rear - O(1)
     */
    enqueue(item) {
        const newNode = new QueueNode(item);
        if (this.isEmpty()) {
            this.frontNode = this.rearNode = newNode;
        } else {
            this.rearNode.next = newNode;
            this.rearNode = newNode;
        }
        this.size++;
    }

    /**
     * Remove and return front element - O(1)
     */
    dequeue() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        const data = this.frontNode.data;
        this.frontNode = this.frontNode.next;
        if (this.frontNode === null) {
            this.rearNode = null;
        }
        this.size--;
        return data;
    }

    /**
     * Return front element without removing - O(1)
     */
    front() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        return this.frontNode.data;
    }

    /**
     * Check if queue is empty - O(1)
     */
    isEmpty() {
        return this.frontNode === null;
    }

    /**
     * Return size of queue - O(1)
     */
    size() {
        return this.size;
    }
}

class CircularQueue {
    /**
     * Circular Queue Implementation
     */
    constructor(capacity) {
        this.capacity = capacity;
        this.items = new Array(capacity).fill(null);
        this.front = 0;
        this.rear = -1;
        this.size = 0;
    }

    /**
     * Add element - O(1)
     */
    enqueue(item) {
        if (this.isFull()) {
            throw new Error("Queue is full");
        }
        this.rear = (this.rear + 1) % this.capacity;
        this.items[this.rear] = item;
        this.size++;
    }

    /**
     * Remove and return element - O(1)
     */
    dequeue() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        const item = this.items[this.front];
        this.items[this.front] = null;
        this.front = (this.front + 1) % this.capacity;
        this.size--;
        return item;
    }

    /**
     * Return front element - O(1)
     */
    front() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        return this.items[this.front];
    }

    /**
     * Check if empty - O(1)
     */
    isEmpty() {
        return this.size === 0;
    }

    /**
     * Check if full - O(1)
     */
    isFull() {
        return this.size === this.capacity;
    }
}

class PriorityQueue {
    /**
     * Priority Queue using array (min-heap simulation)
     */
    constructor() {
        this.items = [];
    }

    /**
     * Add element with priority - O(n)
     */
    enqueue(item, priority) {
        this.items.push({ item, priority });
        this.items.sort((a, b) => a.priority - b.priority);
    }

    /**
     * Remove highest priority element - O(1)
     */
    dequeue() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        return this.items.shift().item;
    }

    /**
     * Check if empty - O(1)
     */
    isEmpty() {
        return this.items.length === 0;
    }
}

class Deque {
    /**
     * Double-ended Queue
     */
    constructor() {
        this.items = [];
    }

    /**
     * Add to front - O(n)
     */
    addFront(item) {
        this.items.unshift(item);
    }

    /**
     * Add to rear - O(1)
     */
    addRear(item) {
        this.items.push(item);
    }

    /**
     * Remove from front - O(n)
     */
    removeFront() {
        if (this.isEmpty()) {
            throw new Error("Deque is empty");
        }
        return this.items.shift();
    }

    /**
     * Remove from rear - O(1)
     */
    removeRear() {
        if (this.isEmpty()) {
            throw new Error("Deque is empty");
        }
        return this.items.pop();
    }

    /**
     * Check if empty - O(1)
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Return size - O(1)
     */
    size() {
        return this.items.length;
    }
}

// Example usage
if (require.main === module) {
    // Simple Queue
    console.log("--- Simple Queue ---");
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    console.log("Queue:", queue.display());
    console.log("Front:", queue.front());
    console.log("Dequeue:", queue.dequeue());
    console.log("After dequeue:", queue.display());

    // Linked Queue
    console.log("\n--- Linked Queue ---");
    const linkedQueue = new LinkedQueue();
    linkedQueue.enqueue(10);
    linkedQueue.enqueue(20);
    linkedQueue.enqueue(30);
    console.log("Size:", linkedQueue.size());
    console.log("Front:", linkedQueue.front());
    console.log("Dequeue:", linkedQueue.dequeue());

    // Circular Queue
    console.log("\n--- Circular Queue ---");
    const circularQueue = new CircularQueue(5);
    for (let i = 0; i < 5; i++) {
        circularQueue.enqueue(i);
    }
    console.log("Front:", circularQueue.front());
    console.log("Dequeue:", circularQueue.dequeue());
    circularQueue.enqueue(99);

    // Priority Queue
    console.log("\n--- Priority Queue ---");
    const pq = new PriorityQueue();
    pq.enqueue("Task 1", 3);
    pq.enqueue("Task 2", 1);
    pq.enqueue("Task 3", 2);
    console.log("Dequeue:", pq.dequeue()); // Task 2 (priority 1)

    // Deque
    console.log("\n--- Deque ---");
    const dq = new Deque();
    dq.addRear(1);
    dq.addRear(2);
    dq.addFront(0);
    console.log("Remove front:", dq.removeFront());
    console.log("Remove rear:", dq.removeRear());
}

module.exports = { Queue, LinkedQueue, CircularQueue, PriorityQueue, Deque };

