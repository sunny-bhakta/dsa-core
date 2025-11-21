"""
Advanced Dynamic Programming Problems in Python
"""

def house_robber(houses):
    """
    House Robber - Maximum money without robbing adjacent houses
    Time: O(n), Space: O(1)
    """
    if not houses:
        return 0
    if len(houses) == 1:
        return houses[0]
    
    prev2 = houses[0]
    prev1 = max(houses[0], houses[1])
    
    for i in range(2, len(houses)):
        current = max(prev1, prev2 + houses[i])
        prev2 = prev1
        prev1 = current
    
    return prev1


def house_robber_circular(houses):
    """
    House Robber II - Circular arrangement
    Time: O(n), Space: O(1)
    """
    if not houses:
        return 0
    if len(houses) == 1:
        return houses[0]
    
    # Rob houses 0 to n-2 OR 1 to n-1
    return max(
        house_robber(houses[:-1]),
        house_robber(houses[1:])
    )


def unbounded_knapsack(weights, values, capacity):
    """
    Unbounded Knapsack - Items can be used multiple times
    Time: O(n * capacity), Space: O(capacity)
    """
    n = len(weights)
    dp = [0] * (capacity + 1)
    
    for w in range(1, capacity + 1):
        for i in range(n):
            if weights[i] <= w:
                dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    
    return dp[capacity]


def unique_paths(m, n):
    """
    Unique Paths - Count paths from top-left to bottom-right
    Time: O(m * n), Space: O(n)
    """
    dp = [1] * n
    
    for i in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j - 1]
    
    return dp[n - 1]


def unique_paths_with_obstacles(obstacle_grid):
    """
    Unique Paths II - With obstacles
    Time: O(m * n), Space: O(m * n)
    """
    m, n = len(obstacle_grid), len(obstacle_grid[0])
    
    if obstacle_grid[0][0] == 1 or obstacle_grid[m - 1][n - 1] == 1:
        return 0
    
    dp = [[0] * n for _ in range(m)]
    dp[0][0] = 1
    
    # First row
    for j in range(1, n):
        dp[0][j] = dp[0][j - 1] if obstacle_grid[0][j] == 0 else 0
    
    # First column
    for i in range(1, m):
        dp[i][0] = dp[i - 1][0] if obstacle_grid[i][0] == 0 else 0
    
    # Fill rest
    for i in range(1, m):
        for j in range(1, n):
            if obstacle_grid[i][j] == 0:
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    
    return dp[m - 1][n - 1]


def matrix_chain_multiplication(dims):
    """
    Matrix Chain Multiplication - Optimal parenthesization
    Time: O(n³), Space: O(n²)
    """
    n = len(dims) - 1
    dp = [[0] * n for _ in range(n)]
    
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = float('inf')
            
            for k in range(i, j):
                cost = dp[i][k] + dp[k + 1][j] + dims[i] * dims[k + 1] * dims[j + 1]
                dp[i][j] = min(dp[i][j], cost)
    
    return dp[0][n - 1]


def longest_common_substring_dp(s1, s2):
    """
    Longest Common Substring using DP
    Time: O(m * n), Space: O(m * n)
    """
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    max_len = 0
    end_index = 0
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i - 1] == s2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
                if dp[i][j] > max_len:
                    max_len = dp[i][j]
                    end_index = i
            else:
                dp[i][j] = 0
    
    return s1[end_index - max_len:end_index] if max_len > 0 else ""


def coin_change_ways(coins, amount):
    """
    Coin Change - Count ways to make amount
    Time: O(amount * len(coins)), Space: O(amount)
    """
    dp = [0] * (amount + 1)
    dp[0] = 1
    
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] += dp[i - coin]
    
    return dp[amount]


def edit_distance_dp(word1, word2):
    """
    Edit Distance (Levenshtein) - Minimum operations to transform
    Time: O(m * n), Space: O(min(m, n))
    """
    m, n = len(word1), len(word2)
    
    # Use smaller array for space optimization
    if m < n:
        word1, word2 = word2, word1
        m, n = n, m
    
    prev = list(range(n + 1))
    
    for i in range(1, m + 1):
        curr = [i] + [0] * n
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                curr[j] = prev[j - 1]
            else:
                curr[j] = 1 + min(prev[j], curr[j - 1], prev[j - 1])
        prev = curr
    
    return prev[n]


# Example usage
if __name__ == "__main__":
    # House Robber
    houses = [2, 7, 9, 3, 1]
    print("House Robber:", house_robber(houses))
    print("House Robber II (circular):", house_robber_circular([2, 3, 2]))
    
    # Unbounded Knapsack
    weights = [1, 3, 4, 5]
    values = [10, 40, 50, 70]
    capacity = 8
    print("\nUnbounded Knapsack:", unbounded_knapsack(weights, values, capacity))
    
    # Unique Paths
    print("\nUnique Paths (3x7):", unique_paths(3, 7))
    obstacle_grid = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
    print("Unique Paths with obstacles:", unique_paths_with_obstacles(obstacle_grid))
    
    # Matrix Chain Multiplication
    dims = [1, 2, 3, 4, 3]
    print("\nMatrix Chain Multiplication:", matrix_chain_multiplication(dims))
    
    # Coin Change Ways
    coins = [1, 2, 5]
    amount = 5
    print("\nCoin Change Ways:", coin_change_ways(coins, amount))
    
    # Edit Distance
    print("\nEdit Distance ('horse', 'ros'):", edit_distance_dp("horse", "ros"))

