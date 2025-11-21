/**
 * Common Linked List Problems
 */

class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

/**
 * Reverse a linked list iteratively
 * Time: O(n), Space: O(1)
 */
function reverseLinkedList(head) {
    let prev = null;
    let current = head;

    while (current) {
        const nextNode = current.next;
        current.next = prev;
        prev = current;
        current = nextNode;
    }

    return prev;
}

/**
 * Reverse a linked list recursively
 * Time: O(n), Space: O(n) - recursion stack
 */
function reverseLinkedListRecursive(head) {
    if (!head || !head.next) {
        return head;
    }

    const reversedHead = reverseLinkedListRecursive(head.next);
    head.next.next = head;
    head.next = null;

    return reversedHead;
}

/**
 * Merge two sorted linked lists
 * Time: O(n + m), Space: O(1)
 */
function mergeTwoSortedLists(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;

    while (l1 && l2) {
        if (l1.val <= l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }

    current.next = l1 || l2;

    return dummy.next;
}

/**
 * Remove nth node from end of list
 * Time: O(n), Space: O(1)
 */
function removeNthFromEnd(head, n) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let first = dummy;
    let second = dummy;

    // Move first pointer n+1 steps ahead
    for (let i = 0; i <= n; i++) {
        first = first.next;
    }

    // Move both pointers until first reaches end
    while (first) {
        first = first.next;
        second = second.next;
    }

    // Remove the node
    second.next = second.next.next;

    return dummy.next;
}

/**
 * Detect cycle using Floyd's cycle detection
 * Time: O(n), Space: O(1)
 */
function detectCycle(head) {
    let slow = head;
    let fast = head;

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
 * Find the start of cycle if exists
 * Time: O(n), Space: O(1)
 */
function findCycleStart(head) {
    let slow = head;
    let fast = head;

    // Find meeting point
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            break;
        }
    }

    if (!fast || !fast.next) {
        return null; // No cycle
    }

    // Find cycle start
    slow = head;
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }

    return slow;
}

/**
 * Find intersection node of two linked lists
 * Time: O(m + n), Space: O(1)
 */
function getIntersectionNode(headA, headB) {
    if (!headA || !headB) {
        return null;
    }

    let ptrA = headA;
    let ptrB = headB;

    while (ptrA !== ptrB) {
        ptrA = ptrA ? ptrA.next : headB;
        ptrB = ptrB ? ptrB.next : headA;
    }

    return ptrA;
}

/**
 * Check if linked list is palindrome
 * Time: O(n), Space: O(1)
 */
function isPalindrome(head) {
    if (!head || !head.next) {
        return true;
    }

    // Find middle
    let slow = head;
    let fast = head;
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // Reverse second half
    let secondHalf = reverseLinkedList(slow.next);
    let firstHalf = head;

    // Compare
    while (secondHalf) {
        if (firstHalf.val !== secondHalf.val) {
            return false;
        }
        firstHalf = firstHalf.next;
        secondHalf = secondHalf.next;
    }

    return true;
}

/**
 * Add two numbers represented as linked lists
 * Time: O(max(m, n)), Space: O(max(m, n))
 */
function addTwoNumbers(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;

    while (l1 || l2 || carry) {
        const val1 = l1 ? l1.val : 0;
        const val2 = l2 ? l2.val : 0;

        const total = val1 + val2 + carry;
        carry = Math.floor(total / 10);
        current.next = new ListNode(total % 10);
        current = current.next;

        l1 = l1 ? l1.next : null;
        l2 = l2 ? l2.next : null;
    }

    return dummy.next;
}

/**
 * Helper function to convert list to array
 */
function listToArray(head) {
    const result = [];
    while (head) {
        result.push(head.val);
        head = head.next;
    }
    return result;
}

/**
 * Helper function to create list from array
 */
function createList(arr) {
    const dummy = new ListNode(0);
    let current = dummy;
    for (const val of arr) {
        current.next = new ListNode(val);
        current = current.next;
    }
    return dummy.next;
}

// Example usage
if (require.main === module) {
    // Reverse list
    const list1 = createList([1, 2, 3, 4, 5]);
    const reversedList = reverseLinkedList(list1);
    console.log("Reversed:", listToArray(reversedList));

    // Merge two sorted lists
    const list2 = createList([1, 3, 5]);
    const list3 = createList([2, 4, 6]);
    const merged = mergeTwoSortedLists(list2, list3);
    console.log("Merged:", listToArray(merged));

    // Remove nth from end
    const list4 = createList([1, 2, 3, 4, 5]);
    const removed = removeNthFromEnd(list4, 2);
    console.log("After removing 2nd from end:", listToArray(removed));

    // Palindrome check
    const list5 = createList([1, 2, 2, 1]);
    console.log("Is palindrome:", isPalindrome(list5));

    // Add two numbers
    const num1 = createList([2, 4, 3]);
    const num2 = createList([5, 6, 4]);
    const result = addTwoNumbers(num1, num2);
    console.log("Add two numbers:", listToArray(result));
}

module.exports = {
    ListNode,
    reverseLinkedList,
    reverseLinkedListRecursive,
    mergeTwoSortedLists,
    removeNthFromEnd,
    detectCycle,
    findCycleStart,
    getIntersectionNode,
    isPalindrome,
    addTwoNumbers
};

