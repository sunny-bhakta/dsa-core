"""
Searching Algorithms in Python
"""

def linear_search(arr, target):
    """
    Linear Search - O(n)
    Works on any array
    """
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1


def binary_search(arr, target):
    """
    Binary Search - O(log n)
    Requires sorted array
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1


def binary_search_recursive(arr, target, left=0, right=None):
    """
    Binary Search (Recursive) - O(log n)
    """
    if right is None:
        right = len(arr) - 1
    
    if left > right:
        return -1
    
    mid = (left + right) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)


def ternary_search(arr, target):
    """
    Ternary Search - O(log₃ n)
    Requires sorted array
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid1 = left + (right - left) // 3
        mid2 = right - (right - left) // 3
        
        if arr[mid1] == target:
            return mid1
        if arr[mid2] == target:
            return mid2
        
        if target < arr[mid1]:
            right = mid1 - 1
        elif target > arr[mid2]:
            left = mid2 + 1
        else:
            left = mid1 + 1
            right = mid2 - 1
    
    return -1


def interpolation_search(arr, target):
    """
    Interpolation Search - O(log log n) average, O(n) worst
    Requires sorted, uniformly distributed array
    """
    left, right = 0, len(arr) - 1
    
    while left <= right and arr[left] <= target <= arr[right]:
        if left == right:
            if arr[left] == target:
                return left
            return -1
        
        pos = left + int(((right - left) / (arr[right] - arr[left])) * (target - arr[left]))
        
        if arr[pos] == target:
            return pos
        elif arr[pos] < target:
            left = pos + 1
        else:
            right = pos - 1
    
    return -1


def exponential_search(arr, target):
    """
    Exponential Search - O(log n)
    Useful for unbounded arrays
    """
    if arr[0] == target:
        return 0
    
    n = len(arr)
    i = 1
    
    while i < n and arr[i] <= target:
        i *= 2
    
    return binary_search_recursive(arr, target, i // 2, min(i, n - 1))


def jump_search(arr, target):
    """
    Jump Search - O(√n)
    Requires sorted array
    """
    n = len(arr)
    step = int(n ** 0.5)
    prev = 0
    
    while arr[min(step, n) - 1] < target:
        prev = step
        step += int(n ** 0.5)
        if prev >= n:
            return -1
    
    for i in range(prev, min(step, n)):
        if arr[i] == target:
            return i
    
    return -1


# Example usage
if __name__ == "__main__":
    sorted_arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
    unsorted_arr = [64, 34, 25, 12, 22, 11, 90]
    
    print("Sorted array:", sorted_arr)
    print("Binary search for 7:", binary_search(sorted_arr, 7))
    print("Ternary search for 11:", ternary_search(sorted_arr, 11))
    print("Interpolation search for 13:", interpolation_search(sorted_arr, 13))
    print("Exponential search for 15:", exponential_search(sorted_arr, 15))
    print("Jump search for 9:", jump_search(sorted_arr, 9))
    
    print("\nUnsorted array:", unsorted_arr)
    print("Linear search for 25:", linear_search(unsorted_arr, 25))

