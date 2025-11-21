/**
 * Interview Questions: Arrays & Strings
 * Common interview questions with detailed solutions
 */

// ========== QUESTION 1: Two Sum ==========
/**
 * Problem: Given an array of integers nums and an integer target, 
 * return indices of the two numbers such that they add up to target.
 * 
 * Example:
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 * 
 * Approach: Use hash map to store complement of each number
 * Time: O(n), Space: O(n)
 */
function twoSum(nums, target) {
    const numMap = {};
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (complement in numMap) {
            return [numMap[complement], i];
        }
        numMap[nums[i]] = i;
    }
    return [];
}

// ========== QUESTION 2: Best Time to Buy and Sell Stock ==========
/**
 * Problem: You are given an array prices where prices[i] is the price 
 * of a stock on day i. Find the maximum profit.
 * 
 * Example:
 * Input: prices = [7,1,5,3,6,4]
 * Output: 5
 * 
 * Approach: Track minimum price and maximum profit
 * Time: O(n), Space: O(1)
 */
function maxProfit(prices) {
    if (prices.length === 0) {
        return 0;
    }

    let minPrice = prices[0];
    let maxProfit = 0;

    for (let i = 1; i < prices.length; i++) {
        maxProfit = Math.max(maxProfit, prices[i] - minPrice);
        minPrice = Math.min(minPrice, prices[i]);
    }

    return maxProfit;
}

// ========== QUESTION 3: Contains Duplicate ==========
/**
 * Problem: Given an integer array nums, return true if any value appears 
 * at least twice in the array, and return false if every element is distinct.
 * 
 * Example:
 * Input: nums = [1,2,3,1]
 * Output: true
 * 
 * Approach: Use set to track seen numbers
 * Time: O(n), Space: O(n)
 */
function containsDuplicate(nums) {
    const seen = new Set();
    for (const num of nums) {
        if (seen.has(num)) {
            return true;
        }
        seen.add(num);
    }
    return false;
}

// ========== QUESTION 4: Product of Array Except Self ==========
/**
 * Problem: Given an integer array nums, return an array answer such that 
 * answer[i] is equal to the product of all elements of nums except nums[i].
 * 
 * Example:
 * Input: nums = [1,2,3,4]
 * Output: [24,12,8,6]
 * 
 * Approach: Two passes - left products then right products
 * Time: O(n), Space: O(1) excluding output array
 */
function productExceptSelf(nums) {
    const n = nums.length;
    const result = new Array(n).fill(1);

    // Left pass: result[i] = product of all elements to the left
    for (let i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }

    // Right pass: multiply by product of all elements to the right
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }

    return result;
}

// ========== QUESTION 5: Maximum Subarray (Kadane's Algorithm) ==========
/**
 * Problem: Given an integer array nums, find the contiguous subarray 
 * (containing at least one number) which has the largest sum.
 * 
 * Example:
 * Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
 * Output: 6
 * Explanation: [4,-1,2,1] has the largest sum = 6.
 * 
 * Approach: Kadane's algorithm - track maximum sum ending at each position
 * Time: O(n), Space: O(1)
 */
function maxSubarray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}

// ========== QUESTION 6: Valid Anagram ==========
/**
 * Problem: Given two strings s and t, return true if t is an anagram of s.
 * 
 * Example:
 * Input: s = "anagram", t = "nagaram"
 * Output: true
 * 
 * Approach: Count character frequencies
 * Time: O(n), Space: O(1) - limited to 26 characters
 */
function isAnagram(s, t) {
    if (s.length !== t.length) {
        return false;
    }

    const count = {};
    for (const char of s) {
        count[char] = (count[char] || 0) + 1;
    }

    for (const char of t) {
        if (!count[char] || count[char] === 0) {
            return false;
        }
        count[char]--;
    }

    return true;
}

// ========== QUESTION 7: Group Anagrams ==========
/**
 * Problem: Given an array of strings strs, group the anagrams together.
 * 
 * Example:
 * Input: strs = ["eat","tea","tan","ate","nat","bat"]
 * Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
 * 
 * Approach: Use sorted string as key
 * Time: O(n * k log k) where k is max string length, Space: O(n * k)
 */
function groupAnagrams(strs) {
    const groups = {};
    for (const s of strs) {
        const key = s.split('').sort().join('');
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(s);
    }
    return Object.values(groups);
}

// ========== QUESTION 8: Longest Substring Without Repeating Characters ==========
/**
 * Problem: Given a string s, find the length of the longest substring 
 * without repeating characters.
 * 
 * Example:
 * Input: s = "abcabcbb"
 * Output: 3
 * Explanation: The answer is "abc", with the length of 3.
 * 
 * Approach: Sliding window with hash map
 * Time: O(n), Space: O(min(n, m)) where m is charset size
 */
function lengthOfLongestSubstring(s) {
    const charMap = {};
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        if (char in charMap && charMap[char] >= left) {
            left = charMap[char] + 1;
        }
        charMap[char] = right;
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

// Example usage and test cases
if (require.main === module) {
    console.log("=== ARRAYS & STRINGS INTERVIEW QUESTIONS ===\n");

    // Two Sum
    console.log("1. Two Sum:");
    console.log("   Input: [2,7,11,15], target=9");
    console.log(`   Output: [${twoSum([2, 7, 11, 15], 9).join(', ')}]`);

    // Max Profit
    console.log("\n2. Best Time to Buy and Sell Stock:");
    console.log("   Input: [7,1,5,3,6,4]");
    console.log(`   Output: ${maxProfit([7, 1, 5, 3, 6, 4])}`);

    // Contains Duplicate
    console.log("\n3. Contains Duplicate:");
    console.log("   Input: [1,2,3,1]");
    console.log(`   Output: ${containsDuplicate([1, 2, 3, 1])}`);

    // Product Except Self
    console.log("\n4. Product of Array Except Self:");
    console.log("   Input: [1,2,3,4]");
    console.log(`   Output: [${productExceptSelf([1, 2, 3, 4]).join(', ')}]`);

    // Maximum Subarray
    console.log("\n5. Maximum Subarray:");
    console.log("   Input: [-2,1,-3,4,-1,2,1,-5,4]");
    console.log(`   Output: ${maxSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])}`);

    // Valid Anagram
    console.log("\n6. Valid Anagram:");
    console.log("   Input: s='anagram', t='nagaram'");
    console.log(`   Output: ${isAnagram('anagram', 'nagaram')}`);

    // Group Anagrams
    console.log("\n7. Group Anagrams:");
    console.log("   Input: ['eat','tea','tan','ate','nat','bat']");
    console.log(`   Output:`, groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));

    // Longest Substring
    console.log("\n8. Longest Substring Without Repeating Characters:");
    console.log("   Input: 'abcabcbb'");
    console.log(`   Output: ${lengthOfLongestSubstring('abcabcbb')}`);
}

module.exports = {
    twoSum,
    maxProfit,
    containsDuplicate,
    productExceptSelf,
    maxSubarray,
    isAnagram,
    groupAnagrams,
    lengthOfLongestSubstring
};

