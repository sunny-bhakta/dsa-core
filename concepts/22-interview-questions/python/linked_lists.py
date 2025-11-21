"""
Interview Questions: Linked Lists
Common interview questions with detailed solutions
"""

class ListNode:
    """Node for linked list"""
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


# ========== QUESTION 1: Reverse Linked List ==========
"""
Problem: Reverse a singly linked list.

Example:
Input: 1->2->3->4->5->NULL
Output: 5->4->3->2->1->NULL

Approach: Iterative - use three pointers
Time: O(n), Space: O(1)
"""
def reverse_linked_list(head):
    """
    Reverse Linked List (Iterative)
    """
    prev = None
    current = head
    
    while current:
        next_temp = current.next
        current.next = prev
        prev = current
        current = next_temp
    
    return prev


def reverse_linked_list_recursive(head):
    """
    Reverse Linked List (Recursive)
    Time: O(n), Space: O(n) due to recursion stack
    """
    if not head or not head.next:
        return head
    
    reversed_head = reverse_linked_list_recursive(head.next)
    head.next.next = head
    head.next = None
    
    return reversed_head


# ========== QUESTION 2: Merge Two Sorted Lists ==========
"""
Problem: Merge two sorted linked lists and return the sorted list.

Example:
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]

Approach: Use dummy node and compare nodes
Time: O(n + m), Space: O(1)
"""
def merge_two_sorted_lists(l1, l2):
    """
    Merge Two Sorted Lists
    """
    dummy = ListNode(0)
    current = dummy
    
    while l1 and l2:
        if l1.val <= l2.val:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next
    
    current.next = l1 if l1 else l2
    return dummy.next


# ========== QUESTION 3: Linked List Cycle ==========
"""
Problem: Given head, determine if the linked list has a cycle.

Example:
Input: head = [3,2,0,-4], pos = 1 (cycle at index 1)
Output: true

Approach: Floyd's Cycle Detection (Tortoise and Hare)
Time: O(n), Space: O(1)
"""
def has_cycle(head):
    """
    Linked List Cycle Detection (Floyd's Algorithm)
    """
    if not head or not head.next:
        return False
    
    slow = head
    fast = head.next
    
    while fast and fast.next:
        if slow == fast:
            return True
        slow = slow.next
        fast = fast.next.next
    
    return False


# ========== QUESTION 4: Remove Nth Node From End ==========
"""
Problem: Remove the nth node from the end of the list.

Example:
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]

Approach: Two pointers - move fast pointer n steps ahead
Time: O(n), Space: O(1)
"""
def remove_nth_from_end(head, n):
    """
    Remove Nth Node From End
    """
    dummy = ListNode(0)
    dummy.next = head
    first = dummy
    second = dummy
    
    # Move first pointer n+1 steps ahead
    for i in range(n + 1):
        first = first.next
    
    # Move both pointers until first reaches end
    while first:
        first = first.next
        second = second.next
    
    # Remove the node
    second.next = second.next.next
    return dummy.next


# ========== QUESTION 5: Add Two Numbers ==========
"""
Problem: You are given two non-empty linked lists representing two 
non-negative integers. Add them and return the sum as a linked list.

Example:
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807

Approach: Simulate addition with carry
Time: O(max(n, m)), Space: O(max(n, m))
"""
def add_two_numbers(l1, l2):
    """
    Add Two Numbers
    """
    dummy = ListNode(0)
    current = dummy
    carry = 0
    
    while l1 or l2 or carry:
        val1 = l1.val if l1 else 0
        val2 = l2.val if l2 else 0
        
        total = val1 + val2 + carry
        carry = total // 10
        current.next = ListNode(total % 10)
        current = current.next
        
        l1 = l1.next if l1 else None
        l2 = l2.next if l2 else None
    
    return dummy.next


# ========== QUESTION 6: Intersection of Two Linked Lists ==========
"""
Problem: Find the node where two linked lists intersect.

Example:
Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]
Output: Intersected at '8'

Approach: Two pointers - switch lists when reaching end
Time: O(n + m), Space: O(1)
"""
def get_intersection_node(headA, headB):
    """
    Intersection of Two Linked Lists
    """
    if not headA or not headB:
        return None
    
    ptrA = headA
    ptrB = headB
    
    while ptrA != ptrB:
        ptrA = ptrA.next if ptrA else headB
        ptrB = ptrB.next if ptrB else headA
    
    return ptrA


# Helper function to create linked list from array
def create_linked_list(arr):
    """Helper to create linked list from array"""
    if not arr:
        return None
    head = ListNode(arr[0])
    current = head
    for val in arr[1:]:
        current.next = ListNode(val)
        current = current.next
    return head


# Helper function to print linked list
def print_linked_list(head):
    """Helper to print linked list"""
    result = []
    while head:
        result.append(str(head.val))
        head = head.next
    return "->".join(result) if result else "NULL"


# Example usage
if __name__ == "__main__":
    print("=== LINKED LISTS INTERVIEW QUESTIONS ===\n")
    
    # Reverse Linked List
    print("1. Reverse Linked List:")
    head1 = create_linked_list([1, 2, 3, 4, 5])
    print(f"   Input: {print_linked_list(head1)}")
    reversed_head = reverse_linked_list(create_linked_list([1, 2, 3, 4, 5]))
    print(f"   Output: {print_linked_list(reversed_head)}")
    
    # Merge Two Sorted Lists
    print("\n2. Merge Two Sorted Lists:")
    l1 = create_linked_list([1, 2, 4])
    l2 = create_linked_list([1, 3, 4])
    print(f"   Input: {print_linked_list(l1)} and {print_linked_list(l2)}")
    merged = merge_two_sorted_lists(create_linked_list([1, 2, 4]), create_linked_list([1, 3, 4]))
    print(f"   Output: {print_linked_list(merged)}")
    
    # Linked List Cycle
    print("\n3. Linked List Cycle:")
    # Create cycle: 3->2->0->-4->2 (cycle)
    cycle_head = ListNode(3)
    cycle_head.next = ListNode(2)
    cycle_head.next.next = ListNode(0)
    cycle_head.next.next.next = ListNode(-4)
    cycle_head.next.next.next.next = cycle_head.next  # Create cycle
    print(f"   Has cycle: {has_cycle(cycle_head)}")
    
    # Remove Nth Node From End
    print("\n4. Remove Nth Node From End (n=2):")
    head4 = create_linked_list([1, 2, 3, 4, 5])
    print(f"   Input: {print_linked_list(head4)}")
    removed = remove_nth_from_end(create_linked_list([1, 2, 3, 4, 5]), 2)
    print(f"   Output: {print_linked_list(removed)}")
    
    # Add Two Numbers
    print("\n5. Add Two Numbers:")
    l1 = create_linked_list([2, 4, 3])
    l2 = create_linked_list([5, 6, 4])
    print(f"   Input: {print_linked_list(l1)} + {print_linked_list(l2)}")
    sum_list = add_two_numbers(l1, l2)
    print(f"   Output: {print_linked_list(sum_list)}")

