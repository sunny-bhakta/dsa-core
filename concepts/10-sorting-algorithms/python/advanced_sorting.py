"""
Advanced Sorting Algorithms in Python
"""

def radix_sort(arr):
    """
    Radix Sort - Sort by individual digits
    Time: O(d(n + k)) where d is digits, Space: O(n + k)
    Works for non-negative integers
    """
    if not arr:
        return []
    
    # Find maximum number to know number of digits
    max_val = max(arr)
    
    # Do counting sort for every digit
    exp = 1
    while max_val // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10
    
    return arr


def counting_sort_by_digit(arr, exp):
    """Counting sort for a specific digit"""
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    
    # Store count of occurrences
    for i in range(n):
        index = (arr[i] // exp) % 10
        count[index] += 1
    
    # Change count to position
    for i in range(1, 10):
        count[i] += count[i - 1]
    
    # Build output array
    for i in range(n - 1, -1, -1):
        index = (arr[i] // exp) % 10
        output[count[index] - 1] = arr[i]
        count[index] -= 1
    
    # Copy output to arr
    for i in range(n):
        arr[i] = output[i]


def bucket_sort(arr):
    """
    Bucket Sort - Distribute elements into buckets
    Time: O(n + k) average, O(n²) worst, Space: O(n)
    Works best for uniformly distributed data
    """
    if not arr:
        return []
    
    # Find min and max
    min_val = min(arr)
    max_val = max(arr)
    
    # Number of buckets
    num_buckets = len(arr)
    bucket_range = (max_val - min_val) / num_buckets if max_val != min_val else 1
    
    # Create buckets
    buckets = [[] for _ in range(num_buckets)]
    
    # Distribute elements into buckets
    for num in arr:
        index = int((num - min_val) / bucket_range)
        if index >= num_buckets:
            index = num_buckets - 1
        buckets[index].append(num)
    
    # Sort individual buckets and concatenate
    result = []
    for bucket in buckets:
        if bucket:
            # Use insertion sort for buckets
            insertion_sort_bucket(bucket)
            result.extend(bucket)
    
    return result


def insertion_sort_bucket(bucket):
    """Insertion sort for bucket"""
    for i in range(1, len(bucket)):
        key = bucket[i]
        j = i - 1
        while j >= 0 and bucket[j] > key:
            bucket[j + 1] = bucket[j]
            j -= 1
        bucket[j + 1] = key


def tim_sort(arr):
    """
    Tim Sort - Hybrid stable sorting algorithm
    Time: O(n log n), Space: O(n)
    Used in Python's built-in sort
    Combines merge sort and insertion sort
    """
    # Simplified version - full Tim Sort is complex
    # This is a merge sort implementation (Tim Sort uses similar approach)
    if len(arr) <= 1:
        return arr
    
    # Use insertion sort for small arrays
    if len(arr) <= 32:
        return insertion_sort_simple(arr)
    
    mid = len(arr) // 2
    left = tim_sort(arr[:mid])
    right = tim_sort(arr[mid:])
    
    return merge_tim(left, right)


def insertion_sort_simple(arr):
    """Simple insertion sort for small arrays"""
    arr = arr.copy()
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr


def merge_tim(left, right):
    """Merge two sorted arrays"""
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result


# Example usage
if __name__ == "__main__":
    # Radix Sort
    arr1 = [170, 45, 75, 90, 802, 24, 2, 66]
    print("Radix Sort:")
    print("Original:", arr1)
    print("Sorted:", radix_sort(arr1.copy()))
    
    # Bucket Sort
    arr2 = [0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434]
    print("\nBucket Sort:")
    print("Original:", arr2)
    print("Sorted:", bucket_sort(arr2))
    
    # Tim Sort
    arr3 = [64, 34, 25, 12, 22, 11, 90]
    print("\nTim Sort:")
    print("Original:", arr3)
    print("Sorted:", tim_sort(arr3))

