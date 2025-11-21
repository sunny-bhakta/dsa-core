/**
 * Common Queue Problems
 */

/**
 * Implement queue using two stacks
 */
class QueueUsingStacks {
    constructor() {
        this.stack1 = [];
        this.stack2 = [];
    }

    /**
     * O(1)
     */
    enqueue(item) {
        this.stack1.push(item);
    }

    /**
     * O(n) amortized
     */
    dequeue() {
        if (this.stack2.length === 0) {
            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop());
            }
        }
        if (this.stack2.length === 0) {
            throw new Error("Queue is empty");
        }
        return this.stack2.pop();
    }

    front() {
        if (this.stack2.length === 0) {
            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop());
            }
        }
        if (this.stack2.length === 0) {
            throw new Error("Queue is empty");
        }
        return this.stack2[this.stack2.length - 1];
    }

    isEmpty() {
        return this.stack1.length === 0 && this.stack2.length === 0;
    }
}

/**
 * Find maximum in each sliding window
 * Time: O(n), Space: O(k)
 */
function slidingWindowMaximum(nums, k) {
    if (nums.length === 0) {
        return [];
    }

    const result = [];
    const dq = []; // Store indices

    for (let i = 0; i < nums.length; i++) {
        // Remove indices outside window
        while (dq.length > 0 && dq[0] <= i - k) {
            dq.shift();
        }

        // Remove indices with smaller values
        while (dq.length > 0 && nums[dq[dq.length - 1]] <= nums[i]) {
            dq.pop();
        }

        dq.push(i);

        // Add maximum to result when window is complete
        if (i >= k - 1) {
            result.push(nums[dq[0]]);
        }
    }

    return result;
}

/**
 * Find first non-repeating character in stream
 * Time: O(n), Space: O(n)
 */
function firstNonRepeatingChar(stream) {
    const queue = [];
    const count = {};
    const result = [];

    for (const char of stream) {
        count[char] = (count[char] || 0) + 1;
        queue.push(char);

        while (queue.length > 0 && count[queue[0]] > 1) {
            queue.shift();
        }

        result.push(queue.length > 0 ? queue[0] : '#');
    }

    return result;
}

/**
 * Level-order (BFS) tree traversal using queue
 * Time: O(n), Space: O(n)
 */
function levelOrderTraversal(root) {
    if (!root) {
        return [];
    }

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const level = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            level.push(node.val);

            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }

        result.push(level);
    }

    return result;
}

/**
 * BFS traversal of graph using queue
 * Time: O(V + E), Space: O(V)
 */
function bfsGraph(graph, start) {
    const visited = new Set();
    const queue = [start];
    visited.add(start);
    const result = [];

    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);

        for (const neighbor of graph[node] || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    return result;
}

/**
 * Design circular queue
 */
class MyCircularQueue {
    constructor(k) {
        this.capacity = k;
        this.items = new Array(k).fill(null);
        this.front = 0;
        this.rear = -1;
        this.size = 0;
    }

    enQueue(value) {
        if (this.isFull()) {
            return false;
        }
        this.rear = (this.rear + 1) % this.capacity;
        this.items[this.rear] = value;
        this.size++;
        return true;
    }

    deQueue() {
        if (this.isEmpty()) {
            return false;
        }
        this.items[this.front] = null;
        this.front = (this.front + 1) % this.capacity;
        this.size--;
        return true;
    }

    Front() {
        return this.isEmpty() ? -1 : this.items[this.front];
    }

    Rear() {
        return this.isEmpty() ? -1 : this.items[this.rear];
    }

    isEmpty() {
        return this.size === 0;
    }

    isFull() {
        return this.size === this.capacity;
    }
}

// Example usage
if (require.main === module) {
    // Queue using stacks
    console.log("--- Queue using Stacks ---");
    const q = new QueueUsingStacks();
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    console.log("Front:", q.front());
    console.log("Dequeue:", q.dequeue());

    // Sliding window maximum
    const nums = [1, 3, -1, -3, 5, 3, 6, 7];
    const k = 3;
    console.log("\nSliding window maximum:", slidingWindowMaximum(nums, k));

    // First non-repeating character
    const stream = "aabcbc";
    console.log("First non-repeating:", firstNonRepeatingChar(stream));

    // BFS Graph
    const graph = {
        'A': ['B', 'C'],
        'B': ['D', 'E'],
        'C': ['F'],
        'D': [],
        'E': [],
        'F': []
    };
    console.log("BFS traversal:", bfsGraph(graph, 'A'));
}

module.exports = {
    QueueUsingStacks,
    slidingWindowMaximum,
    firstNonRepeatingChar,
    levelOrderTraversal,
    bfsGraph,
    MyCircularQueue
};

