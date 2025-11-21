/**
 * Advanced Dynamic Programming Problems in Node.js
 */

/**
 * House Robber - Maximum money without robbing adjacent houses
 * Time: O(n), Space: O(1)
 */
function houseRobber(houses) {
    if (houses.length === 0) {
        return 0;
    }
    if (houses.length === 1) {
        return houses[0];
    }

    let prev2 = houses[0];
    let prev1 = Math.max(houses[0], houses[1]);

    for (let i = 2; i < houses.length; i++) {
        const current = Math.max(prev1, prev2 + houses[i]);
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

/**
 * House Robber II - Circular arrangement
 * Time: O(n), Space: O(1)
 */
function houseRobberCircular(houses) {
    if (houses.length === 0) {
        return 0;
    }
    if (houses.length === 1) {
        return houses[0];
    }

    // Rob houses 0 to n-2 OR 1 to n-1
    return Math.max(
        houseRobber(houses.slice(0, -1)),
        houseRobber(houses.slice(1))
    );
}

/**
 * Unbounded Knapsack - Items can be used multiple times
 * Time: O(n * capacity), Space: O(capacity)
 */
function unboundedKnapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = new Array(capacity + 1).fill(0);

    for (let w = 1; w <= capacity; w++) {
        for (let i = 0; i < n; i++) {
            if (weights[i] <= w) {
                dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
            }
        }
    }

    return dp[capacity];
}

/**
 * Unique Paths - Count paths from top-left to bottom-right
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

/**
 * Unique Paths II - With obstacles
 * Time: O(m * n), Space: O(m * n)
 */
function uniquePathsWithObstacles(obstacleGrid) {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;

    if (obstacleGrid[0][0] === 1 || obstacleGrid[m - 1][n - 1] === 1) {
        return 0;
    }

    const dp = Array(m).fill().map(() => Array(n).fill(0));
    dp[0][0] = 1;

    // First row
    for (let j = 1; j < n; j++) {
        dp[0][j] = obstacleGrid[0][j] === 0 ? dp[0][j - 1] : 0;
    }

    // First column
    for (let i = 1; i < m; i++) {
        dp[i][0] = obstacleGrid[i][0] === 0 ? dp[i - 1][0] : 0;
    }

    // Fill rest
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (obstacleGrid[i][j] === 0) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
    }

    return dp[m - 1][n - 1];
}

/**
 * Matrix Chain Multiplication - Optimal parenthesization
 * Time: O(n³), Space: O(n²)
 */
function matrixChainMultiplication(dims) {
    const n = dims.length - 1;
    const dp = Array(n).fill().map(() => Array(n).fill(0));

    for (let length = 2; length <= n; length++) {
        for (let i = 0; i < n - length + 1; i++) {
            const j = i + length - 1;
            dp[i][j] = Infinity;

            for (let k = i; k < j; k++) {
                const cost = dp[i][k] + dp[k + 1][j] + dims[i] * dims[k + 1] * dims[j + 1];
                dp[i][j] = Math.min(dp[i][j], cost);
            }
        }
    }

    return dp[0][n - 1];
}

/**
 * Coin Change - Count ways to make amount
 * Time: O(amount * len(coins)), Space: O(amount)
 */
function coinChangeWays(coins, amount) {
    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1;

    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }

    return dp[amount];
}

/**
 * Edit Distance (Levenshtein) - Minimum operations to transform
 * Time: O(m * n), Space: O(min(m, n))
 */
function editDistanceDP(word1, word2) {
    let m = word1.length;
    let n = word2.length;

    // Use smaller array for space optimization
    if (m < n) {
        [word1, word2] = [word2, word1];
        [m, n] = [n, m];
    }

    let prev = Array.from({ length: n + 1 }, (_, i) => i);

    for (let i = 1; i <= m; i++) {
        const curr = [i];
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                curr[j] = prev[j - 1];
            } else {
                curr[j] = 1 + Math.min(prev[j], curr[j - 1], prev[j - 1]);
            }
        }
        prev = curr;
    }

    return prev[n];
}

// Example usage
if (require.main === module) {
    // House Robber
    const houses = [2, 7, 9, 3, 1];
    console.log("House Robber:", houseRobber(houses));
    console.log("House Robber II (circular):", houseRobberCircular([2, 3, 2]));

    // Unbounded Knapsack
    const weights = [1, 3, 4, 5];
    const values = [10, 40, 50, 70];
    const capacity = 8;
    console.log("\nUnbounded Knapsack:", unboundedKnapsack(weights, values, capacity));

    // Unique Paths
    console.log("\nUnique Paths (3x7):", uniquePaths(3, 7));
    const obstacleGrid = [[0, 0, 0], [0, 1, 0], [0, 0, 0]];
    console.log("Unique Paths with obstacles:", uniquePathsWithObstacles(obstacleGrid));

    // Matrix Chain Multiplication
    const dims = [1, 2, 3, 4, 3];
    console.log("\nMatrix Chain Multiplication:", matrixChainMultiplication(dims));

    // Coin Change Ways
    const coins = [1, 2, 5];
    const amount = 5;
    console.log("\nCoin Change Ways:", coinChangeWays(coins, amount));

    // Edit Distance
    console.log("\nEdit Distance ('horse', 'ros'):", editDistanceDP("horse", "ros"));
}

module.exports = {
    houseRobber,
    houseRobberCircular,
    unboundedKnapsack,
    uniquePaths,
    uniquePathsWithObstacles,
    matrixChainMultiplication,
    coinChangeWays,
    editDistanceDP
};

