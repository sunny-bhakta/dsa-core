/**
 * Interview Questions: Dynamic Programming
 * Common interview questions with detailed solutions
 */

// ========== QUESTION 1: Climbing Stairs ==========
/**
 * Problem: You are climbing a staircase. It takes n steps to reach the top.
 * Each time you can either climb 1 or 2 steps. How many distinct ways?
 * 
 * Example:
 * Input: n = 3
 * Output: 3
 * 
 * Approach: DP - similar to Fibonacci
 * Time: O(n), Space: O(1)
 */
function climbStairs(n) {
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

// ========== QUESTION 2: Coin Change ==========
/**
 * Problem: Given coins and amount, return fewest coins needed.
 * 
 * Example:
 * Input: coins = [1,2,5], amount = 11
 * Output: 3
 * 
 * Approach: DP - dp[i] = min coins for amount i
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

// ========== QUESTION 3: Longest Increasing Subsequence ==========
/**
 * Problem: Find length of longest strictly increasing subsequence.
 * 
 * Example:
 * Input: nums = [10,9,2,5,3,7,101,18]
 * Output: 4
 * 
 * Approach: DP
 * Time: O(n²), Space: O(n)
 */
function lengthOfLIS(nums) {
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

// ========== QUESTION 4: Edit Distance ==========
/**
 * Problem: Find minimum operations to convert word1 to word2.
 * Operations: insert, delete, replace
 * 
 * Example:
 * Input: word1 = "horse", word2 = "ros"
 * Output: 3
 * 
 * Approach: 2D DP
 * Time: O(m * n), Space: O(m * n)
 */
function minDistance(word1, word2) {
    const m = word1.length;
    const n = word2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

    // Base cases
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }

    // Fill DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],      // delete
                    dp[i][j - 1],      // insert
                    dp[i - 1][j - 1]  // replace
                );
            }
        }
    }

    return dp[m][n];
}

// ========== QUESTION 5: House Robber ==========
/**
 * Problem: Rob houses, can't rob two adjacent houses. Maximize profit.
 * 
 * Example:
 * Input: nums = [2,7,9,3,1]
 * Output: 12
 * 
 * Approach: DP
 * Time: O(n), Space: O(1)
 */
function rob(nums) {
    if (nums.length === 0) {
        return 0;
    }
    if (nums.length === 1) {
        return nums[0];
    }

    let prev2 = nums[0];
    let prev1 = Math.max(nums[0], nums[1]);

    for (let i = 2; i < nums.length; i++) {
        const current = Math.max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

// ========== QUESTION 6: Unique Paths ==========
/**
 * Problem: Robot at top-left, can move down or right. 
 * How many unique paths to bottom-right?
 * 
 * Example:
 * Input: m = 3, n = 7
 * Output: 28
 * 
 * Approach: DP
 * Time: O(m * n), Space: O(n)
 */
function uniquePaths(m, n) {
    const dp = new Array(n).fill(1);

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] += dp[j - 1];
        }
    }

    return dp[n - 1];
}

// Example usage
if (require.main === module) {
    console.log("=== DYNAMIC PROGRAMMING INTERVIEW QUESTIONS ===\n");

    // Climbing Stairs
    console.log("1. Climbing Stairs:");
    console.log("   Input: n=3");
    console.log(`   Output: ${climbStairs(3)}`);

    // Coin Change
    console.log("\n2. Coin Change:");
    console.log("   Input: coins=[1,2,5], amount=11");
    console.log(`   Output: ${coinChange([1, 2, 5], 11)}`);

    // Longest Increasing Subsequence
    console.log("\n3. Longest Increasing Subsequence:");
    console.log("   Input: [10,9,2,5,3,7,101,18]");
    console.log(`   Output: ${lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])}`);

    // Edit Distance
    console.log("\n4. Edit Distance:");
    console.log("   Input: word1='horse', word2='ros'");
    console.log(`   Output: ${minDistance('horse', 'ros')}`);

    // House Robber
    console.log("\n5. House Robber:");
    console.log("   Input: [2,7,9,3,1]");
    console.log(`   Output: ${rob([2, 7, 9, 3, 1])}`);

    // Unique Paths
    console.log("\n6. Unique Paths:");
    console.log("   Input: m=3, n=7");
    console.log(`   Output: ${uniquePaths(3, 7)}`);
}

module.exports = {
    climbStairs,
    coinChange,
    lengthOfLIS,
    minDistance,
    rob,
    uniquePaths
};

