"""
Common Array Problems
"""

def rotate_array(arr, k):
    """
    Rotate array to the right by k steps
    Time: O(n), Space: O(1)
    """
    n = len(arr)
    k = k % n  # Handle k > n
    
    # Reverse entire array
    arr.reverse()
    # Reverse first k elements
    arr[:k] = reversed(arr[:k])
    # Reverse remaining elements
    arr[k:] = reversed(arr[k:])
    
    return arr


def max_subarray_sum(arr):
    """
    Kadane's Algorithm - Find maximum sum of contiguous subarray
    Time: O(n), Space: O(1)
    """
    max_sum = current_sum = arr[0]
    
    for num in arr[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    
    return max_sum


def two_sum(arr, target):
    """
    Find two numbers that add up to target
    Time: O(n), Space: O(n)
    """
    num_map = {}
    
    for i, num in enumerate(arr):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    
    return []


def merge_sorted_arrays(arr1, arr2):
    """
    Merge two sorted arrays
    Time: O(n + m), Space: O(n + m)
    """
    result = []
    i, j = 0, 0
    
    while i < len(arr1) and j < len(arr2):
        if arr1[i] <= arr2[j]:
            result.append(arr1[i])
            i += 1
        else:
            result.append(arr2[j])
            j += 1
    
    # Add remaining elements
    result.extend(arr1[i:])
    result.extend(arr2[j:])
    
    return result


def remove_duplicates(arr):
    """
    Remove duplicates from sorted array in-place
    Time: O(n), Space: O(1)
    """
    if not arr:
        return 0
    
    write_index = 1
    
    for i in range(1, len(arr)):
        if arr[i] != arr[write_index - 1]:
            arr[write_index] = arr[i]
            write_index += 1
    
    return write_index


def product_except_self(arr):
    """
    Product of array except self without division
    Time: O(n), Space: O(n)
    """
    n = len(arr)
    result = [1] * n
    
    # Left products
    left_product = 1
    for i in range(n):
        result[i] = left_product
        left_product *= arr[i]
    
    # Right products
    right_product = 1
    for i in range(n - 1, -1, -1):
        result[i] *= right_product
        right_product *= arr[i]
    
    return result


# Example usage
if __name__ == "__main__":
    # Rotate array
    arr1 = [1, 2, 3, 4, 5]
    print("Rotate array:", rotate_array(arr1.copy(), 2))
    
    # Max subarray sum
    arr2 = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
    print("Max subarray sum:", max_subarray_sum(arr2))
    
    # Two sum
    arr3 = [2, 7, 11, 15]
    print("Two sum indices:", two_sum(arr3, 9))
    
    # Merge sorted arrays
    arr4 = [1, 3, 5, 7]
    arr5 = [2, 4, 6, 8]
    print("Merged arrays:", merge_sorted_arrays(arr4, arr5))
    
    # Remove duplicates
    arr6 = [1, 1, 2, 2, 3, 4, 4, 5]
    new_length = remove_duplicates(arr6)
    print("After removing duplicates:", arr6[:new_length])
    
    # Product except self
    arr7 = [1, 2, 3, 4]
    print("Product except self:", product_except_self(arr7))

