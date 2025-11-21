"""
Interview Questions: Arrays & Strings
Common interview questions with detailed solutions
"""

# ========== QUESTION 1: Two Sum ==========
"""
Problem: Given an array of integers nums and an integer target, 
return indices of the two numbers such that they add up to target.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Approach: Use hash map to store complement of each number
Time: O(n), Space: O(n)
"""
def two_sum(nums, target):
    """
    Two Sum - Find two numbers that add up to target
    """
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []


# ========== QUESTION 2: Best Time to Buy and Sell Stock ==========
"""
Problem: You are given an array prices where prices[i] is the price 
of a stock on day i. Find the maximum profit.

Example:
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.

Approach: Track minimum price and maximum profit
Time: O(n), Space: O(1)
"""
def max_profit(prices):
    """
    Best Time to Buy and Sell Stock
    """
    if not prices:
        return 0
    
    min_price = prices[0]
    max_profit = 0
    
    for price in prices[1:]:
        max_profit = max(max_profit, price - min_price)
        min_price = min(min_price, price)
    
    return max_profit


# ========== QUESTION 3: Contains Duplicate ==========
"""
Problem: Given an integer array nums, return true if any value appears 
at least twice in the array, and return false if every element is distinct.

Example:
Input: nums = [1,2,3,1]
Output: true

Approach: Use set to track seen numbers
Time: O(n), Space: O(n)
"""
def contains_duplicate(nums):
    """
    Contains Duplicate
    """
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False


# ========== QUESTION 4: Product of Array Except Self ==========
"""
Problem: Given an integer array nums, return an array answer such that 
answer[i] is equal to the product of all elements of nums except nums[i].

Example:
Input: nums = [1,2,3,4]
Output: [24,12,8,6]

Approach: Two passes - left products then right products
Time: O(n), Space: O(1) excluding output array
"""
def product_except_self(nums):
    """
    Product of Array Except Self
    """
    n = len(nums)
    result = [1] * n
    
    # Left pass: result[i] = product of all elements to the left
    for i in range(1, n):
        result[i] = result[i-1] * nums[i-1]
    
    # Right pass: multiply by product of all elements to the right
    right_product = 1
    for i in range(n-1, -1, -1):
        result[i] *= right_product
        right_product *= nums[i]
    
    return result


# ========== QUESTION 5: Maximum Subarray (Kadane's Algorithm) ==========
"""
Problem: Given an integer array nums, find the contiguous subarray 
(containing at least one number) which has the largest sum.

Example:
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.

Approach: Kadane's algorithm - track maximum sum ending at each position
Time: O(n), Space: O(1)
"""
def max_subarray(nums):
    """
    Maximum Subarray (Kadane's Algorithm)
    """
    max_sum = current_sum = nums[0]
    
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    
    return max_sum


# ========== QUESTION 6: Valid Anagram ==========
"""
Problem: Given two strings s and t, return true if t is an anagram of s.

Example:
Input: s = "anagram", t = "nagaram"
Output: true

Approach: Count character frequencies
Time: O(n), Space: O(1) - limited to 26 characters
"""
def is_anagram(s, t):
    """
    Valid Anagram
    """
    if len(s) != len(t):
        return False
    
    count = {}
    for char in s:
        count[char] = count.get(char, 0) + 1
    
    for char in t:
        if char not in count or count[char] == 0:
            return False
        count[char] -= 1
    
    return True


# ========== QUESTION 7: Group Anagrams ==========
"""
Problem: Given an array of strings strs, group the anagrams together.

Example:
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Approach: Use sorted string as key
Time: O(n * k log k) where k is max string length, Space: O(n * k)
"""
def group_anagrams(strs):
    """
    Group Anagrams
    """
    groups = {}
    for s in strs:
        key = ''.join(sorted(s))
        if key not in groups:
            groups[key] = []
        groups[key].append(s)
    return list(groups.values())


# ========== QUESTION 8: Longest Substring Without Repeating Characters ==========
"""
Problem: Given a string s, find the length of the longest substring 
without repeating characters.

Example:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Approach: Sliding window with hash map
Time: O(n), Space: O(min(n, m)) where m is charset size
"""
def length_of_longest_substring(s):
    """
    Longest Substring Without Repeating Characters
    """
    char_map = {}
    left = 0
    max_length = 0
    
    for right, char in enumerate(s):
        if char in char_map and char_map[char] >= left:
            left = char_map[char] + 1
        char_map[char] = right
        max_length = max(max_length, right - left + 1)
    
    return max_length


# Example usage and test cases
if __name__ == "__main__":
    print("=== ARRAYS & STRINGS INTERVIEW QUESTIONS ===\n")
    
    # Two Sum
    print("1. Two Sum:")
    print(f"   Input: [2,7,11,15], target=9")
    print(f"   Output: {two_sum([2,7,11,15], 9)}")
    
    # Max Profit
    print("\n2. Best Time to Buy and Sell Stock:")
    print(f"   Input: [7,1,5,3,6,4]")
    print(f"   Output: {max_profit([7,1,5,3,6,4])}")
    
    # Contains Duplicate
    print("\n3. Contains Duplicate:")
    print(f"   Input: [1,2,3,1]")
    print(f"   Output: {contains_duplicate([1,2,3,1])}")
    
    # Product Except Self
    print("\n4. Product of Array Except Self:")
    print(f"   Input: [1,2,3,4]")
    print(f"   Output: {product_except_self([1,2,3,4])}")
    
    # Maximum Subarray
    print("\n5. Maximum Subarray:")
    print(f"   Input: [-2,1,-3,4,-1,2,1,-5,4]")
    print(f"   Output: {max_subarray([-2,1,-3,4,-1,2,1,-5,4])}")
    
    # Valid Anagram
    print("\n6. Valid Anagram:")
    print(f"   Input: s='anagram', t='nagaram'")
    print(f"   Output: {is_anagram('anagram', 'nagaram')}")
    
    # Group Anagrams
    print("\n7. Group Anagrams:")
    print(f"   Input: ['eat','tea','tan','ate','nat','bat']")
    print(f"   Output: {group_anagrams(['eat','tea','tan','ate','nat','bat'])}")
    
    # Longest Substring
    print("\n8. Longest Substring Without Repeating Characters:")
    print(f"   Input: 'abcabcbb'")
    print(f"   Output: {length_of_longest_substring('abcabcbb')}")

