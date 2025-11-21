"""
Two Pointers Problems in Python
"""

def two_sum_sorted(arr, target):
    """
    Two sum in sorted array
    Time: O(n), Space: O(1)
    """
    left, right = 0, len(arr) - 1
    
    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    
    return []


def three_sum(arr, target):
    """
    Three sum - find triplets that sum to target
    Time: O(n²), Space: O(1)
    """
    arr.sort()
    result = []
    
    for i in range(len(arr) - 2):
        if i > 0 and arr[i] == arr[i - 1]:
            continue
        
        left, right = i + 1, len(arr) - 1
        
        while left < right:
            current_sum = arr[i] + arr[left] + arr[right]
            if current_sum == target:
                result.append([arr[i], arr[left], arr[right]])
                while left < right and arr[left] == arr[left + 1]:
                    left += 1
                while left < right and arr[right] == arr[right - 1]:
                    right -= 1
                left += 1
                right -= 1
            elif current_sum < target:
                left += 1
            else:
                right -= 1
    
    return result


def remove_duplicates(arr):
    """
    Remove duplicates from sorted array in-place
    Time: O(n), Space: O(1)
    """
    if not arr:
        return 0
    
    write_index = 1
    
    for read_index in range(1, len(arr)):
        if arr[read_index] != arr[write_index - 1]:
            arr[write_index] = arr[read_index]
            write_index += 1
    
    return write_index


def container_with_most_water(heights):
    """
    Container with most water
    Time: O(n), Space: O(1)
    """
    left, right = 0, len(heights) - 1
    max_water = 0
    
    while left < right:
        width = right - left
        height = min(heights[left], heights[right])
        max_water = max(max_water, width * height)
        
        if heights[left] < heights[right]:
            left += 1
        else:
            right -= 1
    
    return max_water


def is_palindrome(s):
    """
    Check if string is palindrome (alphanumeric only)
    Time: O(n), Space: O(1)
    """
    left, right = 0, len(s) - 1
    
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        
        if s[left].lower() != s[right].lower():
            return False
        
        left += 1
        right -= 1
    
    return True


def merge_sorted_arrays(arr1, m, arr2, n):
    """
    Merge two sorted arrays in-place
    Time: O(m + n), Space: O(1)
    """
    i, j, k = m - 1, n - 1, m + n - 1
    
    while i >= 0 and j >= 0:
        if arr1[i] > arr2[j]:
            arr1[k] = arr1[i]
            i -= 1
        else:
            arr1[k] = arr2[j]
            j -= 1
        k -= 1
    
    while j >= 0:
        arr1[k] = arr2[j]
        j -= 1
        k -= 1


# Example usage
if __name__ == "__main__":
    print("Two sum sorted:", two_sum_sorted([2, 7, 11, 15], 9))
    print("Three sum:", three_sum([-1, 0, 1, 2, -1, -4], 0))
    
    arr = [1, 1, 2, 2, 3, 4, 4, 5]
    new_len = remove_duplicates(arr)
    print("Remove duplicates:", arr[:new_len])
    
    print("Container with most water:", container_with_most_water([1, 8, 6, 2, 5, 4, 8, 3, 7]))
    print("Is palindrome:", is_palindrome("A man, a plan, a canal: Panama"))

