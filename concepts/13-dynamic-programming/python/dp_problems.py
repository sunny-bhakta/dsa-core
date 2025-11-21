"""
Dynamic Programming Problems in Python
"""

def fibonacci(n, memo=None):
    """
    Fibonacci using memoization (Top-down)
    Time: O(n), Space: O(n)
    """
    if memo is None:
        memo = {}
    
    if n in memo:
        return memo[n]
    
    if n <= 1:
        return n
    
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
    return memo[n]


def fibonacci_tabulation(n):
    """
    Fibonacci using tabulation (Bottom-up)
    Time: O(n), Space: O(1)
    """
    if n <= 1:
        return n
    
    prev2, prev1 = 0, 1
    
    for i in range(2, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current
    
    return prev1


def climbing_stairs(n):
    """
    Climbing Stairs - ways to reach top
    Time: O(n), Space: O(1)
    """
    if n <= 2:
        return n
    
    prev2, prev1 = 1, 2
    
    for i in range(3, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current
    
    return prev1


def coin_change(coins, amount):
    """
    Coin Change - minimum coins needed
    Time: O(amount * len(coins)), Space: O(amount)
    """
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1


def longest_common_subsequence(text1, text2):
    """
    Longest Common Subsequence
    Time: O(m * n), Space: O(m * n)
    """
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    
    return dp[m][n]


def edit_distance(word1, word2):
    """
    Edit Distance (Levenshtein)
    Time: O(m * n), Space: O(m * n)
    """
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(
                    dp[i - 1][j],      # delete
                    dp[i][j - 1],      # insert
                    dp[i - 1][j - 1]   # replace
                )
    
    return dp[m][n]


def longest_increasing_subsequence(nums):
    """
    Longest Increasing Subsequence
    Time: O(n²), Space: O(n)
    """
    if not nums:
        return 0
    
    dp = [1] * len(nums)
    
    for i in range(1, len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    
    return max(dp)


def knapsack_01(weights, values, capacity):
    """
    0/1 Knapsack Problem
    Time: O(n * capacity), Space: O(capacity)
    """
    n = len(weights)
    dp = [0] * (capacity + 1)
    
    for i in range(n):
        for w in range(capacity, weights[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    
    return dp[capacity]


# Example usage
if __name__ == "__main__":
    print("Fibonacci(10):", fibonacci(10))
    print("Fibonacci tabulation(10):", fibonacci_tabulation(10))
    print("Climbing stairs(5):", climbing_stairs(5))
    print("Coin change:", coin_change([1, 3, 4], 6))
    print("LCS:", longest_common_subsequence("ABCDGH", "AEDFHR"))
    print("Edit distance:", edit_distance("horse", "ros"))
    print("LIS:", longest_increasing_subsequence([10, 9, 2, 5, 3, 7, 101, 18]))
    print("0/1 Knapsack:", knapsack_01([1, 3, 4, 5], [1, 4, 5, 7], 7))

