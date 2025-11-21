"""
Sliding Window Problems in Python
"""

def max_sum_subarray(arr, k):
    """
    Maximum sum of subarray of size k
    Time: O(n), Space: O(1)
    """
    if len(arr) < k:
        return 0
    
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    for i in range(k, len(arr)):
        window_sum = window_sum - arr[i - k] + arr[i]
        max_sum = max(max_sum, window_sum)
    
    return max_sum


def longest_substring_k_distinct(s, k):
    """
    Longest substring with at most k distinct characters
    Time: O(n), Space: O(k)
    """
    if not s or k == 0:
        return 0
    
    char_count = {}
    left = 0
    max_len = 0
    
    for right in range(len(s)):
        char_count[s[right]] = char_count.get(s[right], 0) + 1
        
        while len(char_count) > k:
            char_count[s[left]] -= 1
            if char_count[s[left]] == 0:
                del char_count[s[left]]
            left += 1
        
        max_len = max(max_len, right - left + 1)
    
    return max_len


def longest_substring_no_repeat(s):
    """
    Longest substring without repeating characters
    Time: O(n), Space: O(min(n, m)) where m is charset size
    """
    char_index = {}
    left = 0
    max_len = 0
    
    for right in range(len(s)):
        if s[right] in char_index and char_index[s[right]] >= left:
            left = char_index[s[right]] + 1
        
        char_index[s[right]] = right
        max_len = max(max_len, right - left + 1)
    
    return max_len


def min_window_substring(s, t):
    """
    Minimum window substring containing all characters of t
    Time: O(|s| + |t|), Space: O(|s| + |t|)
    """
    if not s or not t:
        return ""
    
    required = {}
    for char in t:
        required[char] = required.get(char, 0) + 1
    
    left = 0
    formed = 0
    window_counts = {}
    min_len = float('inf')
    min_left = 0
    
    for right in range(len(s)):
        char = s[right]
        window_counts[char] = window_counts.get(char, 0) + 1
        
        if char in required and window_counts[char] == required[char]:
            formed += 1
        
        while left <= right and formed == len(required):
            if right - left + 1 < min_len:
                min_len = right - left + 1
                min_left = left
            
            char = s[left]
            window_counts[char] -= 1
            if char in required and window_counts[char] < required[char]:
                formed -= 1
            left += 1
    
    return "" if min_len == float('inf') else s[min_left:min_left + min_len]


def subarray_sum_equals_k(nums, k):
    """
    Count subarrays with sum equals k
    Time: O(n), Space: O(n)
    """
    count = 0
    prefix_sum = 0
    sum_count = {0: 1}
    
    for num in nums:
        prefix_sum += num
        if prefix_sum - k in sum_count:
            count += sum_count[prefix_sum - k]
        sum_count[prefix_sum] = sum_count.get(prefix_sum, 0) + 1
    
    return count


# Example usage
if __name__ == "__main__":
    print("Max sum subarray of size 3:", max_sum_subarray([1, 4, 2, 10, 23, 3, 1, 0, 20], 4))
    print("Longest substring with 2 distinct:", longest_substring_k_distinct("araaci", 2))
    print("Longest substring no repeat:", longest_substring_no_repeat("abcabcbb"))
    print("Min window substring:", min_window_substring("ADOBECODEBANC", "ABC"))
    print("Subarray sum equals k:", subarray_sum_equals_k([1, 1, 1], 2))

