"""
Common Linked List Problems
"""

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def reverse_linked_list(head):
    """
    Reverse a linked list iteratively
    Time: O(n), Space: O(1)
    """
    prev = None
    current = head
    
    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node
    
    return prev


def reverse_linked_list_recursive(head):
    """
    Reverse a linked list recursively
    Time: O(n), Space: O(n) - recursion stack
    """
    if not head or not head.next:
        return head
    
    reversed_head = reverse_linked_list_recursive(head.next)
    head.next.next = head
    head.next = None
    
    return reversed_head


def merge_two_sorted_lists(l1, l2):
    """
    Merge two sorted linked lists
    Time: O(n + m), Space: O(1)
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


def remove_nth_from_end(head, n):
    """
    Remove nth node from end of list
    Time: O(n), Space: O(1)
    """
    dummy = ListNode(0)
    dummy.next = head
    first = second = dummy
    
    # Move first pointer n+1 steps ahead
    for _ in range(n + 1):
        first = first.next
    
    # Move both pointers until first reaches end
    while first:
        first = first.next
        second = second.next
    
    # Remove the node
    second.next = second.next.next
    
    return dummy.next


def detect_cycle(head):
    """
    Detect cycle using Floyd's cycle detection
    Time: O(n), Space: O(1)
    """
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    
    return False


def find_cycle_start(head):
    """
    Find the start of cycle if exists
    Time: O(n), Space: O(1)
    """
    slow = fast = head
    
    # Find meeting point
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            break
    else:
        return None  # No cycle
    
    # Find cycle start
    slow = head
    while slow != fast:
        slow = slow.next
        fast = fast.next
    
    return slow


def get_intersection_node(headA, headB):
    """
    Find intersection node of two linked lists
    Time: O(m + n), Space: O(1)
    """
    if not headA or not headB:
        return None
    
    ptrA, ptrB = headA, headB
    
    while ptrA != ptrB:
        ptrA = ptrA.next if ptrA else headB
        ptrB = ptrB.next if ptrB else headA
    
    return ptrA


def is_palindrome(head):
    """
    Check if linked list is palindrome
    Time: O(n), Space: O(1)
    """
    if not head or not head.next:
        return True
    
    # Find middle
    slow = fast = head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next
    
    # Reverse second half
    second_half = reverse_linked_list(slow.next)
    first_half = head
    
    # Compare
    while second_half:
        if first_half.val != second_half.val:
            return False
        first_half = first_half.next
        second_half = second_half.next
    
    return True


def add_two_numbers(l1, l2):
    """
    Add two numbers represented as linked lists
    Time: O(max(m, n)), Space: O(max(m, n))
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


def list_to_array(head):
    """Helper function to convert list to array"""
    result = []
    while head:
        result.append(head.val)
        head = head.next
    return result


# Example usage
if __name__ == "__main__":
    # Create test lists
    def create_list(arr):
        dummy = ListNode(0)
        current = dummy
        for val in arr:
            current.next = ListNode(val)
            current = current.next
        return dummy.next
    
    # Reverse list
    list1 = create_list([1, 2, 3, 4, 5])
    reversed_list = reverse_linked_list(list1)
    print("Reversed:", list_to_array(reversed_list))
    
    # Merge two sorted lists
    list2 = create_list([1, 3, 5])
    list3 = create_list([2, 4, 6])
    merged = merge_two_sorted_lists(list2, list3)
    print("Merged:", list_to_array(merged))
    
    # Remove nth from end
    list4 = create_list([1, 2, 3, 4, 5])
    removed = remove_nth_from_end(list4, 2)
    print("After removing 2nd from end:", list_to_array(removed))
    
    # Palindrome check
    list5 = create_list([1, 2, 2, 1])
    print("Is palindrome:", is_palindrome(list5))
    
    # Add two numbers
    num1 = create_list([2, 4, 3])
    num2 = create_list([5, 6, 4])
    result = add_two_numbers(num1, num2)
    print("Add two numbers:", list_to_array(result))

