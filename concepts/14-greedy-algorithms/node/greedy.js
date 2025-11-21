/**
 * Greedy Algorithms in Node.js
 */

/**
 * Activity Selection Problem
 * Select maximum non-overlapping activities
 * Time: O(n log n), Space: O(1)
 */
function activitySelection(start, finish) {
    const n = start.length;
    const activities = finish.map((f, i) => [f, start[i], i]).sort((a, b) => a[0] - b[0]);

    const selected = [0];
    let lastFinish = activities[0][0];

    for (let i = 1; i < n; i++) {
        if (activities[i][1] >= lastFinish) {
            selected.push(activities[i][2]);
            lastFinish = activities[i][0];
        }
    }

    return selected;
}

/**
 * Fractional Knapsack Problem
 * Items can be taken partially
 * Time: O(n log n), Space: O(n)
 */
function fractionalKnapsack(weights, values, capacity) {
    const n = weights.length;
    const items = weights.map((w, i) => [values[i] / w, w, values[i], i])
        .sort((a, b) => b[0] - a[0]);

    let totalValue = 0;
    let remaining = capacity;

    for (const [ratio, weight, value] of items) {
        if (remaining >= weight) {
            totalValue += value;
            remaining -= weight;
        } else {
            totalValue += ratio * remaining;
            break;
        }
    }

    return totalValue;
}

/**
 * Minimum coins (greedy approach - works for certain coin systems)
 * Time: O(n), Space: O(1)
 */
function minimumCoins(coins, amount) {
    coins.sort((a, b) => b - a);
    let count = 0;
    let i = 0;

    while (amount > 0 && i < coins.length) {
        if (coins[i] <= amount) {
            const numCoins = Math.floor(amount / coins[i]);
            count += numCoins;
            amount -= numCoins * coins[i];
        }
        i++;
    }

    return amount === 0 ? count : -1;
}

/**
 * Interval Scheduling - Maximum non-overlapping intervals
 * Time: O(n log n), Space: O(1)
 */
function intervalScheduling(intervals) {
    intervals.sort((a, b) => a[1] - b[1]);

    const selected = [intervals[0]];
    let lastEnd = intervals[0][1];

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] >= lastEnd) {
            selected.push(intervals[i]);
            lastEnd = intervals[i][1];
        }
    }

    return selected;
}

/**
 * Huffman Coding - Optimal prefix-free encoding
 * Time: O(n log n), Space: O(n)
 */
function huffmanCoding(frequencies) {
    class Node {
        constructor(char, freq, left = null, right = null) {
            this.char = char;
            this.freq = freq;
            this.left = left;
            this.right = right;
        }
    }

    const heap = Object.entries(frequencies)
        .map(([char, freq]) => new Node(char, freq))
        .sort((a, b) => a.freq - b.freq);

    while (heap.length > 1) {
        const left = heap.shift();
        const right = heap.shift();
        const merged = new Node(null, left.freq + right.freq, left, right);
        heap.push(merged);
        heap.sort((a, b) => a.freq - b.freq);
    }

    const codes = {};

    function generateCodes(node, code = "") {
        if (node.char !== null) {
            codes[node.char] = code || "0";
        } else {
            generateCodes(node.left, code + "0");
            generateCodes(node.right, code + "1");
        }
    }

    if (heap.length > 0) {
        generateCodes(heap[0]);
    }

    return codes;
}

/**
 * Job Sequencing with Deadlines (Greedy)
 * Schedule jobs to maximize profit before deadlines
 * Each job: [job_id, profit, deadline]
 * Time: O(n²), Space: O(n)
 */
function jobSequencingWithDeadlines(jobs) {
    // Sort by profit (descending)
    jobs.sort((a, b) => b[1] - a[1]);

    // Find maximum deadline
    const maxDeadline = Math.max(...jobs.map(job => job[2]));

    // Initialize result array
    const result = new Array(maxDeadline + 1).fill(null);
    let totalProfit = 0;

    for (const job of jobs) {
        const [jobId, profit, deadline] = job;
        // Find latest free slot before deadline
        for (let j = deadline; j > 0; j--) {
            if (result[j] === null) {
                result[j] = jobId;
                totalProfit += profit;
                break;
            }
        }
    }

    // Get scheduled jobs (excluding null)
    const scheduled = result.filter(job => job !== null);
    return { scheduled, totalProfit };
}

/**
 * Weighted Job Scheduling (DP approach)
 * Each job: [start, end, profit]
 * Find maximum profit subset of non-overlapping jobs
 * Time: O(n²), Space: O(n)
 */
function weightedJobScheduling(jobs) {
    // Sort by end time
    jobs.sort((a, b) => a[1] - b[1]);
    const n = jobs.length;

    // DP[i] = maximum profit using jobs[0..i]
    const dp = new Array(n).fill(0);
    dp[0] = jobs[0][2];

    for (let i = 1; i < n; i++) {
        // Profit including current job
        let profitIncluding = jobs[i][2];

        // Find last job that doesn't conflict
        for (let j = i - 1; j >= 0; j--) {
            if (jobs[j][1] <= jobs[i][0]) {
                profitIncluding += dp[j];
                break;
            }
        }

        // Maximum of including or excluding current job
        dp[i] = Math.max(profitIncluding, dp[i - 1]);
    }

    return dp[n - 1];
}

/**
 * Job Scheduling - Earliest Deadline First (EDF)
 * Schedule jobs to minimize maximum lateness
 * Each job: [job_id, processing_time, deadline]
 * Time: O(n log n), Space: O(n)
 */
function jobSchedulingEarliestDeadline(jobs) {
    // Sort by deadline
    jobs.sort((a, b) => a[2] - b[2]);

    const schedule = [];
    let currentTime = 0;
    let maxLateness = 0;

    for (const job of jobs) {
        const [jobId, processingTime, deadline] = job;
        const finishTime = currentTime + processingTime;
        const lateness = Math.max(0, finishTime - deadline);
        maxLateness = Math.max(maxLateness, lateness);

        schedule.push([jobId, currentTime, finishTime, lateness]);
        currentTime = finishTime;
    }

    return { schedule, maxLateness };
}

// Example usage
if (require.main === module) {
    const start = [1, 3, 0, 5, 8, 5];
    const finish = [2, 4, 6, 7, 9, 9];
    console.log("Activity Selection:", activitySelection(start, finish));

    const weights = [10, 20, 30];
    const values = [60, 100, 120];
    const capacity = 50;
    console.log("Fractional Knapsack value:", fractionalKnapsack(weights, values, capacity));

    const coins = [1, 5, 10, 25];
    const amount = 67;
    console.log("Minimum coins:", minimumCoins(coins, amount));

    const intervals = [[1, 3], [2, 5], [4, 7], [6, 9], [8, 10]];
    console.log("Interval Scheduling:", intervalScheduling(intervals));

    const frequencies = { 'a': 5, 'b': 9, 'c': 12, 'd': 13, 'e': 16, 'f': 45 };
    console.log("Huffman Codes:", huffmanCoding(frequencies));

    // Job Sequencing with Deadlines
    console.log("\n--- Job Sequencing with Deadlines ---");
    const jobs = [
        ['a', 20, 2], ['b', 15, 2], ['c', 10, 1],
        ['d', 5, 3], ['e', 1, 3]
    ];
    const { scheduled, totalProfit } = jobSequencingWithDeadlines(jobs);
    console.log(`Scheduled jobs: [${scheduled.join(', ')}], Total profit: ${totalProfit}`);

    // Weighted Job Scheduling
    console.log("\n--- Weighted Job Scheduling ---");
    const weightedJobs = [
        [1, 3, 5], [2, 5, 6], [4, 6, 5],
        [6, 7, 4], [5, 8, 11], [7, 9, 2]
    ];
    const maxProfit = weightedJobScheduling(weightedJobs);
    console.log(`Maximum profit: ${maxProfit}`);

    // Earliest Deadline First
    console.log("\n--- Earliest Deadline First ---");
    const edfJobs = [
        ['J1', 2, 6], ['J2', 1, 4], ['J3', 3, 5],
        ['J4', 2, 7], ['J5', 1, 3]
    ];
    const { schedule, maxLateness } = jobSchedulingEarliestDeadline(edfJobs);
    console.log("Schedule:", schedule);
    console.log(`Maximum lateness: ${maxLateness}`);
}

module.exports = {
    activitySelection,
    fractionalKnapsack,
    minimumCoins,
    intervalScheduling,
    huffmanCoding,
    jobSequencingWithDeadlines,
    weightedJobScheduling,
    jobSchedulingEarliestDeadline
};

