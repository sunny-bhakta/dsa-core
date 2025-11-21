/**
 * Linked List Implementation in Node.js
 */

class ListNode {
    /**
     * Node class for singly linked list
     */
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

class SinglyLinkedList {
    /**
     * Singly Linked List Implementation
     */
    constructor() {
        this.head = null;
        this.size = 0;
    }

    /**
     * Add node at the end - O(n)
     */
    append(val) {
        const newNode = new ListNode(val);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }

    /**
     * Add node at the beginning - O(1)
     */
    prepend(val) {
        const newNode = new ListNode(val);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }

    /**
     * Insert node at index - O(n)
     */
    insertAt(index, val) {
        if (index < 0 || index > this.size) {
            throw new Error("Index out of range");
        }

        if (index === 0) {
            this.prepend(val);
            return;
        }

        const newNode = new ListNode(val);
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }

        newNode.next = current.next;
        current.next = newNode;
        this.size++;
    }

    /**
     * Delete first occurrence of value - O(n)
     */
    delete(val) {
        if (!this.head) {
            return false;
        }

        if (this.head.val === val) {
            this.head = this.head.next;
            this.size--;
            return true;
        }

        let current = this.head;
        while (current.next) {
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
        let current = this.head;
        let index = 0;
        while (current) {
            if (current.val === val) {
                return index;
            }
            current = current.next;
            index++;
        }
        return -1;
    }

    /**
     * Reverse linked list - O(n)
     */
    reverse() {
        let prev = null;
        let current = this.head;

        while (current) {
            const nextNode = current.next;
            current.next = prev;
            prev = current;
            current = nextNode;
        }

        this.head = prev;
    }

    /**
     * Find middle element using two pointers - O(n)
     */
    findMiddle() {
        let slow = this.head;
        let fast = this.head;

        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
        }

        return slow ? slow.val : null;
    }

    /**
     * Detect cycle using Floyd's algorithm - O(n)
     */
    hasCycle() {
        let slow = this.head;
        let fast = this.head;

        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow === fast) {
                return true;
            }
        }

        return false;
    }

    /**
     * Display all elements
     */
    display() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.val);
            current = current.next;
        }
        return result;
    }
}

class DoublyListNode {
    /**
     * Node class for doubly linked list
     */
    constructor(val = 0, prev = null, next = null) {
        this.val = val;
        this.prev = prev;
        this.next = next;
    }
}

class DoublyLinkedList {
    /**
     * Doubly Linked List Implementation
     */
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    /**
     * Add node at the end - O(1)
     */
    append(val) {
        const newNode = new DoublyListNode(val);

        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.size++;
    }

    /**
     * Add node at the beginning - O(1)
     */
    prepend(val) {
        const newNode = new DoublyListNode(val);

        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }

        this.size++;
    }

    /**
     * Delete first occurrence - O(n)
     */
    delete(val) {
        let current = this.head;

        while (current) {
            if (current.val === val) {
                if (current.prev) {
                    current.prev.next = current.next;
                } else {
                    this.head = current.next;
                }

                if (current.next) {
                    current.next.prev = current.prev;
                } else {
                    this.tail = current.prev;
                }

                this.size--;
                return true;
            }

            current = current.next;
        }

        return false;
    }

    /**
     * Display from head to tail
     */
    displayForward() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.val);
            current = current.next;
        }
        return result;
    }

    /**
     * Display from tail to head
     */
    displayBackward() {
        const result = [];
        let current = this.tail;
        while (current) {
            result.push(current.val);
            current = current.prev;
        }
        return result;
    }
}

// Example usage
if (require.main === module) {
    // Singly Linked List
    console.log("--- Singly Linked List ---");
    const sll = new SinglyLinkedList();
    sll.append(1);
    sll.append(2);
    sll.append(3);
    sll.prepend(0);
    console.log("List:", sll.display());
    console.log("Middle:", sll.findMiddle());

    sll.reverse();
    console.log("Reversed:", sll.display());

    console.log("Search 2:", sll.search(2));
    sll.delete(2);
    console.log("After delete 2:", sll.display());

    // Doubly Linked List
    console.log("\n--- Doubly Linked List ---");
    const dll = new DoublyLinkedList();
    dll.append(1);
    dll.append(2);
    dll.append(3);
    dll.prepend(0);
    console.log("Forward:", dll.displayForward());
    console.log("Backward:", dll.displayBackward());

    dll.delete(2);
    console.log("After delete 2 - Forward:", dll.displayForward());
}

module.exports = { ListNode, SinglyLinkedList, DoublyListNode, DoublyLinkedList };

