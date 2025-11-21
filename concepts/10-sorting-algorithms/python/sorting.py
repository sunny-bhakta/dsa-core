"""
Sorting Algorithms in Python
"""

def bubble_sort(arr):
    """
    Bubble Sort - O(n²) worst, O(n) best
    Stable, in-place
    """
    n = len(arr)
    arr = arr.copy()
    
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    
    return arr


def selection_sort(arr):
    """
    Selection Sort - O(n²)
    Not stable, in-place
    """
    arr = arr.copy()
    n = len(arr)
    
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr


def insertion_sort(arr):
    """
    Insertion Sort - O(n²) worst, O(n) best
    Stable, in-place
    """
    arr = arr.copy()
    
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    
    return arr


def merge_sort(arr):
    """
    Merge Sort - O(n log n)
    Stable, not in-place
    """
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)


def merge(left, right):
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


def quick_sort(arr):
    """
    Quick Sort - O(n log n) average, O(n²) worst
    Not stable, in-place
    """
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)


def heap_sort(arr):
    """
    Heap Sort - O(n log n)
    Not stable, in-place
    """
    def heapify(arr, n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2
        
        if left < n and arr[left] > arr[largest]:
            largest = left
        
        if right < n and arr[right] > arr[largest]:
            largest = right
        
        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify(arr, n, largest)
    
    arr = arr.copy()
    n = len(arr)
    
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    
    return arr


def counting_sort(arr, max_val=None):
    """
    Counting Sort - O(n + k) where k is range
    Stable, not in-place
    """
    if not arr:
        return []
    
    if max_val is None:
        max_val = max(arr)
    
    count = [0] * (max_val + 1)
    
    for num in arr:
        count[num] += 1
    
    result = []
    for i in range(len(count)):
        result.extend([i] * count[i])
    
    return result


# Example usage
if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    
    print("Original:", arr)
    print("Bubble Sort:", bubble_sort(arr))
    print("Selection Sort:", selection_sort(arr))
    print("Insertion Sort:", insertion_sort(arr))
    print("Merge Sort:", merge_sort(arr))
    print("Quick Sort:", quick_sort(arr))
    print("Heap Sort:", heap_sort(arr))
    print("Counting Sort:", counting_sort([4, 2, 2, 8, 3, 3, 1]))

