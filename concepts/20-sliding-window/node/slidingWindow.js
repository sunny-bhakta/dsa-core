/**
 * Sliding Window Problems in Node.js
 */

/**
 * Maximum sum of subarray of size k
 * Time: O(n), Space: O(1)
 */
function maxSumSubarray(arr, k) {
    if (arr.length < k) {
        return 0;
    }

    let windowSum = arr.slice(0, k).reduce((a, b) => a + b, 0);
    let maxSum = windowSum;

    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum;
}

/**
 * Longest substring with at most k distinct characters
 * Time: O(n), Space: O(k)
 */
function longestSubstringKDistinct(s, k) {
    if (!s || k === 0) {
        return 0;
    }

    const charCount = {};
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        charCount[s[right]] = (charCount[s[right]] || 0) + 1;

        while (Object.keys(charCount).length > k) {
            charCount[s[left]]--;
            if (charCount[s[left]] === 0) {
                delete charCount[s[left]];
            }
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}

/**
 * Longest substring without repeating characters
 * Time: O(n), Space: O(min(n, m)) where m is charset size
 */
function longestSubstringNoRepeat(s) {
    const charIndex = {};
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        if (s[right] in charIndex && charIndex[s[right]] >= left) {
            left = charIndex[s[right]] + 1;
        }

        charIndex[s[right]] = right;
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}

/**
 * Minimum window substring containing all characters of t
 * Time: O(|s| + |t|), Space: O(|s| + |t|)
 */
function minWindowSubstring(s, t) {
    if (!s || !t) {
        return "";
    }

    const required = {};
    for (const char of t) {
        required[char] = (required[char] || 0) + 1;
    }

    let left = 0;
    let formed = 0;
    const windowCounts = {};
    let minLen = Infinity;
    let minLeft = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        windowCounts[char] = (windowCounts[char] || 0) + 1;

        if (char in required && windowCounts[char] === required[char]) {
            formed++;
        }

        while (left <= right && formed === Object.keys(required).length) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minLeft = left;
            }

            const char = s[left];
            windowCounts[char]--;
            if (char in required && windowCounts[char] < required[char]) {
                formed--;
            }
            left++;
        }
    }

    return minLen === Infinity ? "" : s.substring(minLeft, minLeft + minLen);
}

/**
 * Count subarrays with sum equals k
 * Time: O(n), Space: O(n)
 */
function subarraySumEqualsK(nums, k) {
    let count = 0;
    let prefixSum = 0;
    const sumCount = { 0: 1 };

    for (const num of nums) {
        prefixSum += num;
        if (prefixSum - k in sumCount) {
            count += sumCount[prefixSum - k];
        }
        sumCount[prefixSum] = (sumCount[prefixSum] || 0) + 1;
    }

    return count;
}

// Example usage
if (require.main === module) {
    console.log("Max sum subarray of size 3:", maxSumSubarray([1, 4, 2, 10, 23, 3, 1, 0, 20], 4));
    console.log("Longest substring with 2 distinct:", longestSubstringKDistinct("araaci", 2));
    console.log("Longest substring no repeat:", longestSubstringNoRepeat("abcabcbb"));
    console.log("Min window substring:", minWindowSubstring("ADOBECODEBANC", "ABC"));
    console.log("Subarray sum equals k:", subarraySumEqualsK([1, 1, 1], 2));
}

module.exports = {
    maxSumSubarray,
    longestSubstringKDistinct,
    longestSubstringNoRepeat,
    minWindowSubstring,
    subarraySumEqualsK
};

