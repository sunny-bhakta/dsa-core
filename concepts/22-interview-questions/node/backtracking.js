/**
 * Interview Questions: Backtracking
 * Common interview questions with detailed solutions
 */

// ========== QUESTION 1: Generate Parentheses ==========
/**
 * Problem: Generate all combinations of n pairs of well-formed parentheses.
 * 
 * Example:
 * Input: n = 3
 * Output: ["((()))","(()())","(())()","()(())","()()()"]
 * 
 * Approach: Backtracking - add '(' or ')' when valid
 * Time: O(4^n / √n), Space: O(n)
 */
function generateParenthesis(n) {
    const result = [];

    function backtrack(current, openCount, closeCount) {
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }

        if (openCount < n) {
            backtrack(current + '(', openCount + 1, closeCount);
        }
        if (closeCount < openCount) {
            backtrack(current + ')', openCount, closeCount + 1);
        }
    }

    backtrack('', 0, 0);
    return result;
}

// ========== QUESTION 2: Combination Sum ==========
/**
 * Problem: Find all unique combinations that sum to target.
 * Numbers can be reused.
 * 
 * Example:
 * Input: candidates = [2,3,6,7], target = 7
 * Output: [[2,2,3],[7]]
 * 
 * Approach: Backtracking with sorting
 * Time: O(2^target), Space: O(target)
 */
function combinationSum(candidates, target) {
    const result = [];
    candidates.sort((a, b) => a - b);

    function backtrack(remaining, combination, start) {
        if (remaining === 0) {
            result.push([...combination]);
            return;
        }

        for (let i = start; i < candidates.length; i++) {
            if (candidates[i] > remaining) {
                break;
            }
            combination.push(candidates[i]);
            backtrack(remaining - candidates[i], combination, i);
            combination.pop();
        }
    }

    backtrack(target, [], 0);
    return result;
}

// ========== QUESTION 3: Subsets ==========
/**
 * Problem: Return all possible subsets (power set).
 * 
 * Example:
 * Input: nums = [1,2,3]
 * Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 * 
 * Approach: Backtracking - include or exclude each element
 * Time: O(2^n), Space: O(n)
 */
function subsets(nums) {
    const result = [];

    function backtrack(start, current) {
        result.push([...current]);

        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    }

    backtrack(0, []);
    return result;
}

// ========== QUESTION 4: Permutations ==========
/**
 * Problem: Return all permutations of array.
 * 
 * Example:
 * Input: nums = [1,2,3]
 * Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 * 
 * Approach: Backtracking - swap elements
 * Time: O(n!), Space: O(n)
 */
function permutations(nums) {
    const result = [];

    function backtrack(start) {
        if (start === nums.length) {
            result.push([...nums]);
            return;
        }

        for (let i = start; i < nums.length; i++) {
            [nums[start], nums[i]] = [nums[i], nums[start]];
            backtrack(start + 1);
            [nums[start], nums[i]] = [nums[i], nums[start]];
        }
    }

    backtrack(0);
    return result;
}

// Example usage
if (require.main === module) {
    console.log("=== BACKTRACKING INTERVIEW QUESTIONS ===\n");

    // Generate Parentheses
    console.log("1. Generate Parentheses (n=3):");
    console.log(`   Output:`, generateParenthesis(3));

    // Combination Sum
    console.log("\n2. Combination Sum:");
    console.log("   Input: candidates=[2,3,6,7], target=7");
    console.log(`   Output:`, combinationSum([2, 3, 6, 7], 7));

    // Subsets
    console.log("\n3. Subsets:");
    console.log("   Input: [1,2,3]");
    console.log(`   Output:`, subsets([1, 2, 3]));

    // Permutations
    console.log("\n4. Permutations:");
    console.log("   Input: [1,2,3]");
    console.log(`   Output:`, permutations([1, 2, 3]));
}

module.exports = {
    generateParenthesis,
    combinationSum,
    subsets,
    permutations
};

