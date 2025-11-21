/**
 * Stack Implementation in Node.js
 */

class Stack {
    /**
     * Array-based Stack Implementation
     */
    constructor() {
        this.items = [];
    }

    /**
     * Add element to top - O(1)
     */
    push(item) {
        this.items.push(item);
    }

    /**
     * Remove and return top element - O(1)
     */
    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items.pop();
    }

    /**
     * Return top element without removing - O(1)
     */
    peek() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items[this.items.length - 1];
    }

    /**
     * Check if stack is empty - O(1)
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Return size of stack - O(1)
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

class StackNode {
    /**
     * Node for linked list-based stack
     */
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedStack {
    /**
     * Linked List-based Stack Implementation
     */
    constructor() {
        this.top = null;
        this.size = 0;
    }

    /**
     * Add element to top - O(1)
     */
    push(item) {
        const newNode = new StackNode(item);
        newNode.next = this.top;
        this.top = newNode;
        this.size++;
    }

    /**
     * Remove and return top element - O(1)
     */
    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        const data = this.top.data;
        this.top = this.top.next;
        this.size--;
        return data;
    }

    /**
     * Return top element without removing - O(1)
     */
    peek() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.top.data;
    }

    /**
     * Check if stack is empty - O(1)
     */
    isEmpty() {
        return this.top === null;
    }

    /**
     * Return size of stack - O(1)
     */
    size() {
        return this.size;
    }
}

class MinStack {
    /**
     * Stack that supports getMin() in O(1)
     */
    constructor() {
        this.stack = [];
        this.minStack = [];
    }

    /**
     * Push element - O(1)
     */
    push(val) {
        this.stack.push(val);
        if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(val);
        }
    }

    /**
     * Pop element - O(1)
     */
    pop() {
        if (this.stack.length === 0) {
            throw new Error("Stack is empty");
        }
        const val = this.stack.pop();
        if (val === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }
        return val;
    }

    /**
     * Get top element - O(1)
     */
    top() {
        if (this.stack.length === 0) {
            throw new Error("Stack is empty");
        }
        return this.stack[this.stack.length - 1];
    }

    /**
     * Get minimum element - O(1)
     */
    getMin() {
        if (this.minStack.length === 0) {
            throw new Error("Stack is empty");
        }
        return this.minStack[this.minStack.length - 1];
    }
}

// Example usage
if (require.main === module) {
    // Array-based Stack
    console.log("--- Array-based Stack ---");
    const stack = new Stack();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    console.log("Stack:", stack.display());
    console.log("Top:", stack.peek());
    console.log("Pop:", stack.pop());
    console.log("After pop:", stack.display());

    // Linked Stack
    console.log("\n--- Linked Stack ---");
    const linkedStack = new LinkedStack();
    linkedStack.push(10);
    linkedStack.push(20);
    linkedStack.push(30);
    console.log("Size:", linkedStack.size());
    console.log("Top:", linkedStack.peek());
    console.log("Pop:", linkedStack.pop());

    // Min Stack
    console.log("\n--- Min Stack ---");
    const minStack = new MinStack();
    minStack.push(3);
    minStack.push(1);
    minStack.push(5);
    console.log("Min:", minStack.getMin());
    minStack.pop();
    console.log("After pop, Min:", minStack.getMin());
}

module.exports = { Stack, LinkedStack, MinStack };

