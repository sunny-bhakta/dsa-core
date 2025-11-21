/**
 * Dynamic Programming Problems in Node.js
 */

/**
 * Fibonacci using memoization (Top-down)
 * Time: O(n), Space: O(n)
 */
function fibonacci(n, memo = {}) {
    if (n in memo) {
        return memo[n];
    }

    if (n <= 1) {
        return n;
    }

    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

/**
 * Fibonacci using tabulation (Bottom-up)
 * Time: O(n), Space: O(1)
 */
function fibonacciTabulation(n) {
    if (n <= 1) {
        return n;
    }

    let prev2 = 0;
    let prev1 = 1;

    for (let i = 2; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

/**
 * Climbing Stairs - ways to reach top
 * Time: O(n), Space: O(1)
 */
function climbingStairs(n) {
    if (n <= 2) {
        return n;
    }

    let prev2 = 1;
    let prev1 = 2;

    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

/**
 * Coin Change - minimum coins needed
 * Time: O(amount * len(coins)), Space: O(amount)
 */
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }

    return dp[amount] !== Infinity ? dp[amount] : -1;
}

/**
 * Longest Common Subsequence
 * Time: O(m * n), Space: O(m * n)
 */
function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
}

/**
 * Edit Distance (Levenshtein)
 * Time: O(m * n), Space: O(m * n)
 */
function editDistance(word1, word2) {
    const m = word1.length;
    const n = word2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],      // delete
                    dp[i][j - 1],      // insert
                    dp[i - 1][j - 1]   // replace
                );
            }
        }
    }

    return dp[m][n];
}

/**
 * Longest Increasing Subsequence
 * Time: O(n²), Space: O(n)
 */
function longestIncreasingSubsequence(nums) {
    if (nums.length === 0) {
        return 0;
    }

    const dp = new Array(nums.length).fill(1);

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp);
}

/**
 * 0/1 Knapsack Problem
 * Time: O(n * capacity), Space: O(capacity)
 */
function knapsack01(weights, values, capacity) {
    const n = weights.length;
    const dp = new Array(capacity + 1).fill(0);

    for (let i = 0; i < n; i++) {
        for (let w = capacity; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }

    return dp[capacity];
}

// Example usage
if (require.main === module) {
    console.log("Fibonacci(10):", fibonacci(10));
    console.log("Fibonacci tabulation(10):", fibonacciTabulation(10));
    console.log("Climbing stairs(5):", climbingStairs(5));
    console.log("Coin change:", coinChange([1, 3, 4], 6));
    console.log("LCS:", longestCommonSubsequence("ABCDGH", "AEDFHR"));
    console.log("Edit distance:", editDistance("horse", "ros"));
    console.log("LIS:", longestIncreasingSubsequence([10, 9, 2, 5, 3, 7, 101, 18]));
    console.log("0/1 Knapsack:", knapsack01([1, 3, 4, 5], [1, 4, 5, 7], 7));
}

module.exports = {
    fibonacci,
    fibonacciTabulation,
    climbingStairs,
    coinChange,
    longestCommonSubsequence,
    editDistance,
    longestIncreasingSubsequence,
    knapsack01
};

