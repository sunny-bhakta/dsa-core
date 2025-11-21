"""
Interview Questions: Dynamic Programming
Common interview questions with detailed solutions
"""

# ========== QUESTION 1: Climbing Stairs ==========
"""
Problem: You are climbing a staircase. It takes n steps to reach the top.
Each time you can either climb 1 or 2 steps. How many distinct ways?

Example:
Input: n = 3
Output: 3
Explanation: 1+1+1, 1+2, 2+1

Approach: DP - similar to Fibonacci
Time: O(n), Space: O(1)
"""
def climb_stairs(n):
    """
    Climbing Stairs
    """
    if n <= 2:
        return n
    
    prev2, prev1 = 1, 2
    for i in range(3, n + 1):
        current = prev1 + prev2
        prev2, prev1 = prev1, current
    
    return prev1


# ========== QUESTION 2: Coin Change ==========
"""
Problem: Given coins and amount, return fewest coins needed.

Example:
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1

Approach: DP - dp[i] = min coins for amount i
Time: O(amount * len(coins)), Space: O(amount)
"""
def coin_change(coins, amount):
    """
    Coin Change - Minimum coins
    """
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1


# ========== QUESTION 3: Longest Increasing Subsequence ==========
"""
Problem: Find length of longest strictly increasing subsequence.

Example:
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: [2,3,7,18] or [2,5,7,18]

Approach: DP with binary search optimization
Time: O(n log n), Space: O(n)
"""
def length_of_lis(nums):
    """
    Longest Increasing Subsequence
    """
    if not nums:
        return 0
    
    dp = [1] * len(nums)
    
    for i in range(1, len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    
    return max(dp)


# ========== QUESTION 4: Edit Distance ==========
"""
Problem: Find minimum operations to convert word1 to word2.
Operations: insert, delete, replace

Example:
Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: horse -> rorse -> rose -> ros

Approach: 2D DP
Time: O(m * n), Space: O(m * n)
"""
def min_distance(word1, word2):
    """
    Edit Distance (Levenshtein)
    """
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    # Base cases
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    
    # Fill DP table
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],      # delete
                    dp[i][j-1],      # insert
                    dp[i-1][j-1]     # replace
                )
    
    return dp[m][n]


# ========== QUESTION 5: House Robber ==========
"""
Problem: Rob houses, can't rob two adjacent houses. Maximize profit.

Example:
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (2), house 3 (9), house 5 (1)

Approach: DP - dp[i] = max profit up to house i
Time: O(n), Space: O(1)
"""
def rob(nums):
    """
    House Robber
    """
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    
    prev2, prev1 = nums[0], max(nums[0], nums[1])
    
    for i in range(2, len(nums)):
        current = max(prev1, prev2 + nums[i])
        prev2, prev1 = prev1, current
    
    return prev1


# ========== QUESTION 6: Unique Paths ==========
"""
Problem: Robot at top-left, can move down or right. 
How many unique paths to bottom-right?

Example:
Input: m = 3, n = 7
Output: 28

Approach: DP - dp[i][j] = paths to (i,j)
Time: O(m * n), Space: O(n)
"""
def unique_paths(m, n):
    """
    Unique Paths
    """
    dp = [1] * n
    
    for i in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j-1]
    
    return dp[n-1]


# Example usage
if __name__ == "__main__":
    print("=== DYNAMIC PROGRAMMING INTERVIEW QUESTIONS ===\n")
    
    # Climbing Stairs
    print("1. Climbing Stairs:")
    print(f"   Input: n=3")
    print(f"   Output: {climb_stairs(3)}")
    
    # Coin Change
    print("\n2. Coin Change:")
    print(f"   Input: coins=[1,2,5], amount=11")
    print(f"   Output: {coin_change([1, 2, 5], 11)}")
    
    # Longest Increasing Subsequence
    print("\n3. Longest Increasing Subsequence:")
    print(f"   Input: [10,9,2,5,3,7,101,18]")
    print(f"   Output: {length_of_lis([10,9,2,5,3,7,101,18])}")
    
    # Edit Distance
    print("\n4. Edit Distance:")
    print(f"   Input: word1='horse', word2='ros'")
    print(f"   Output: {min_distance('horse', 'ros')}")
    
    # House Robber
    print("\n5. House Robber:")
    print(f"   Input: [2,7,9,3,1]")
    print(f"   Output: {rob([2,7,9,3,1])}")
    
    # Unique Paths
    print("\n6. Unique Paths:")
    print(f"   Input: m=3, n=7")
    print(f"   Output: {unique_paths(3, 7)}")

