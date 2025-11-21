/**
 * Circular Linked List Implementation in Node.js
 */

class CircularListNode {
    /**
     * Node for circular linked list
     */
    constructor(val = 0) {
        this.val = val;
        this.next = null;
    }
}

class CircularLinkedList {
    /**
     * Circular Linked List Implementation
     */
    constructor() {
        this.head = null;
        this.size = 0;
    }

    /**
     * Add node at the end - O(n)
     */
    append(val) {
        const newNode = new CircularListNode(val);

        if (!this.head) {
            this.head = newNode;
            newNode.next = this.head;
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            current.next = newNode;
            newNode.next = this.head;
        }

        this.size++;
    }

    /**
     * Add node at the beginning - O(1)
     */
    prepend(val) {
        const newNode = new CircularListNode(val);

        if (!this.head) {
            this.head = newNode;
            newNode.next = this.head;
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            current.next = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }

        this.size++;
    }

    /**
     * Delete first occurrence - O(n)
     */
    delete(val) {
        if (!this.head) {
            return false;
        }

        // If head is to be deleted
        if (this.head.val === val) {
            if (this.head.next === this.head) {
                this.head = null;
            } else {
                let current = this.head;
                while (current.next !== this.head) {
                    current = current.next;
                }
                current.next = this.head.next;
                this.head = this.head.next;
            }
            this.size--;
            return true;
        }

        // Find and delete node
        let current = this.head;
        while (current.next !== this.head) {
            if (current.next.val === val) {
                current.next = current.next.next;
                this.size--;
                return true;
            }
            current = current.next;
        }

        return false;
    }

    /**
     * Search for value - O(n)
     */
    search(val) {
        if (!this.head) {
            return -1;
        }

        let current = this.head;
        let index = 0;

        while (true) {
            if (current.val === val) {
                return index;
            }
            current = current.next;
            index++;
            if (current === this.head) {
                break;
            }
        }

        return -1;
    }

    /**
     * Display all elements
     */
    display() {
        if (!this.head) {
            return [];
        }

        const result = [];
        let current = this.head;

        while (true) {
            result.push(current.val);
            current = current.next;
            if (current === this.head) {
                break;
            }
        }

        return result;
    }

    /**
     * Josephus Problem - Eliminate every kth person
     * Returns the last remaining person
     */
    josephusProblem(k) {
        if (!this.head || k <= 0) {
            return null;
        }

        let current = this.head;

        while (this.size > 1) {
            // Move k-1 steps
            for (let i = 0; i < k - 1; i++) {
                current = current.next;
            }

            // Delete next node
            current.next = current.next.next;
            this.size--;
            current = current.next;
        }

        this.head = current;
        return current.val;
    }
}

class CircularDoublyListNode {
    /**
     * Node for circular doubly linked list
     */
    constructor(val = 0) {
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class CircularDoublyLinkedList {
    /**
     * Circular Doubly Linked List
     */
    constructor() {
        this.head = null;
        this.size = 0;
    }

    /**
     * Add node at the end - O(1)
     */
    append(val) {
        const newNode = new CircularDoublyListNode(val);
        newNode.prev = newNode;
        newNode.next = newNode;

        if (!this.head) {
            this.head = newNode;
        } else {
            const last = this.head.prev;
            last.next = newNode;
            newNode.prev = last;
            newNode.next = this.head;
            this.head.prev = newNode;
        }

        this.size++;
    }

    /**
     * Add node at the beginning - O(1)
     */
    prepend(val) {
        const newNode = new CircularDoublyListNode(val);
        newNode.prev = newNode;
        newNode.next = newNode;

        if (!this.head) {
            this.head = newNode;
        } else {
            const last = this.head.prev;
            newNode.next = this.head;
            newNode.prev = last;
            this.head.prev = newNode;
            last.next = newNode;
            this.head = newNode;
        }

        this.size++;
    }

    /**
     * Display from head to tail
     */
    displayForward() {
        if (!this.head) {
            return [];
        }

        const result = [];
        let current = this.head;

        while (true) {
            result.push(current.val);
            current = current.next;
            if (current === this.head) {
                break;
            }
        }

        return result;
    }

    /**
     * Display from tail to head
     */
    displayBackward() {
        if (!this.head) {
            return [];
        }

        const result = [];
        let current = this.head.prev;

        while (true) {
            result.push(current.val);
            current = current.prev;
            if (current === this.head.prev) {
                break;
            }
        }

        return result;
    }
}

// Example usage
if (require.main === module) {
    // Circular Singly Linked List
    console.log("--- Circular Singly Linked List ---");
    const cll = new CircularLinkedList();
    for (let i = 1; i <= 5; i++) {
        cll.append(i);
    }

    console.log("List:", cll.display());
    console.log("Size:", cll.size);
    console.log("Search 3:", cll.search(3));

    cll.prepend(0);
    console.log("After prepend 0:", cll.display());

    cll.delete(3);
    console.log("After delete 3:", cll.display());

    // Josephus Problem
    console.log("\n--- Josephus Problem (k=3) ---");
    const josephus = new CircularLinkedList();
    for (let i = 1; i <= 7; i++) {
        josephus.append(i);
    }
    console.log("Initial:", josephus.display());
    console.log("Last remaining:", josephus.josephusProblem(3));

    // Circular Doubly Linked List
    console.log("\n--- Circular Doubly Linked List ---");
    const cdll = new CircularDoublyLinkedList();
    for (let i = 1; i <= 5; i++) {
        cdll.append(i);
    }

    console.log("Forward:", cdll.displayForward());
    console.log("Backward:", cdll.displayBackward());
}

module.exports = { CircularLinkedList, CircularDoublyLinkedList };
