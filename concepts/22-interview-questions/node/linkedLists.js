/**
 * Interview Questions: Linked Lists
 * Common interview questions with detailed solutions
 */

class ListNode {
    /**
     * Node for linked list
     */
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// ========== QUESTION 1: Reverse Linked List ==========
/**
 * Problem: Reverse a singly linked list.
 * 
 * Example:
 * Input: 1->2->3->4->5->NULL
 * Output: 5->4->3->2->1->NULL
 * 
 * Approach: Iterative - use three pointers
 * Time: O(n), Space: O(1)
 */
function reverseLinkedList(head) {
    let prev = null;
    let current = head;

    while (current) {
        const nextTemp = current.next;
        current.next = prev;
        prev = current;
        current = nextTemp;
    }

    return prev;
}

function reverseLinkedListRecursive(head) {
    /**
     * Reverse Linked List (Recursive)
     * Time: O(n), Space: O(n) due to recursion stack
     */
    if (!head || !head.next) {
        return head;
    }

    const reversedHead = reverseLinkedListRecursive(head.next);
    head.next.next = head;
    head.next = null;

    return reversedHead;
}

// ========== QUESTION 2: Merge Two Sorted Lists ==========
/**
 * Problem: Merge two sorted linked lists and return the sorted list.
 * 
 * Example:
 * Input: list1 = [1,2,4], list2 = [1,3,4]
 * Output: [1,1,2,3,4,4]
 * 
 * Approach: Use dummy node and compare nodes
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

// ========== QUESTION 3: Linked List Cycle ==========
/**
 * Problem: Given head, determine if the linked list has a cycle.
 * 
 * Example:
 * Input: head = [3,2,0,-4], pos = 1 (cycle at index 1)
 * Output: true
 * 
 * Approach: Floyd's Cycle Detection (Tortoise and Hare)
 * Time: O(n), Space: O(1)
 */
function hasCycle(head) {
    if (!head || !head.next) {
        return false;
    }

    let slow = head;
    let fast = head.next;

    while (fast && fast.next) {
        if (slow === fast) {
            return true;
        }
        slow = slow.next;
        fast = fast.next.next;
    }

    return false;
}

// ========== QUESTION 4: Remove Nth Node From End ==========
/**
 * Problem: Remove the nth node from the end of the list.
 * 
 * Example:
 * Input: head = [1,2,3,4,5], n = 2
 * Output: [1,2,3,5]
 * 
 * Approach: Two pointers - move fast pointer n steps ahead
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

// ========== QUESTION 5: Add Two Numbers ==========
/**
 * Problem: You are given two non-empty linked lists representing two 
 * non-negative integers. Add them and return the sum as a linked list.
 * 
 * Example:
 * Input: l1 = [2,4,3], l2 = [5,6,4]
 * Output: [7,0,8]
 * Explanation: 342 + 465 = 807
 * 
 * Approach: Simulate addition with carry
 * Time: O(max(n, m)), Space: O(max(n, m))
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

// ========== QUESTION 6: Intersection of Two Linked Lists ==========
/**
 * Problem: Find the node where two linked lists intersect.
 * 
 * Example:
 * Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]
 * Output: Intersected at '8'
 * 
 * Approach: Two pointers - switch lists when reaching end
 * Time: O(n + m), Space: O(1)
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

// Helper function to create linked list from array
function createLinkedList(arr) {
    if (arr.length === 0) {
        return null;
    }
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// Helper function to print linked list
function printLinkedList(head) {
    const result = [];
    while (head) {
        result.push(head.val.toString());
        head = head.next;
    }
    return result.length > 0 ? result.join('->') : 'NULL';
}

// Example usage
if (require.main === module) {
    console.log("=== LINKED LISTS INTERVIEW QUESTIONS ===\n");

    // Reverse Linked List
    console.log("1. Reverse Linked List:");
    const head1 = createLinkedList([1, 2, 3, 4, 5]);
    console.log(`   Input: ${printLinkedList(head1)}`);
    const reversedHead = reverseLinkedList(createLinkedList([1, 2, 3, 4, 5]));
    console.log(`   Output: ${printLinkedList(reversedHead)}`);

    // Merge Two Sorted Lists
    console.log("\n2. Merge Two Sorted Lists:");
    const l1 = createLinkedList([1, 2, 4]);
    const l2 = createLinkedList([1, 3, 4]);
    console.log(`   Input: ${printLinkedList(l1)} and ${printLinkedList(l2)}`);
    const merged = mergeTwoSortedLists(createLinkedList([1, 2, 4]), createLinkedList([1, 3, 4]));
    console.log(`   Output: ${printLinkedList(merged)}`);

    // Linked List Cycle
    console.log("\n3. Linked List Cycle:");
    // Create cycle: 3->2->0->-4->2 (cycle)
    const cycleHead = new ListNode(3);
    cycleHead.next = new ListNode(2);
    cycleHead.next.next = new ListNode(0);
    cycleHead.next.next.next = new ListNode(-4);
    cycleHead.next.next.next.next = cycleHead.next; // Create cycle
    console.log(`   Has cycle: ${hasCycle(cycleHead)}`);

    // Remove Nth Node From End
    console.log("\n4. Remove Nth Node From End (n=2):");
    const head4 = createLinkedList([1, 2, 3, 4, 5]);
    console.log(`   Input: ${printLinkedList(head4)}`);
    const removed = removeNthFromEnd(createLinkedList([1, 2, 3, 4, 5]), 2);
    console.log(`   Output: ${printLinkedList(removed)}`);

    // Add Two Numbers
    console.log("\n5. Add Two Numbers:");
    const l1_add = createLinkedList([2, 4, 3]);
    const l2_add = createLinkedList([5, 6, 4]);
    console.log(`   Input: ${printLinkedList(l1_add)} + ${printLinkedList(l2_add)}`);
    const sumList = addTwoNumbers(l1_add, l2_add);
    console.log(`   Output: ${printLinkedList(sumList)}`);
}

module.exports = {
    ListNode,
    reverseLinkedList,
    reverseLinkedListRecursive,
    mergeTwoSortedLists,
    hasCycle,
    removeNthFromEnd,
    addTwoNumbers,
    getIntersectionNode,
    createLinkedList,
    printLinkedList
};

