/**
 * Advanced String Problems in Node.js
 */

/**
 * Compress string using character counts
 * Example: "aabcccccaaa" -> "a2b1c5a3"
 * Time: O(n), Space: O(n)
 */
function stringCompression(s) {
    if (!s) {
        return "";
    }

    const compressed = [];
    let count = 1;

    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
            count++;
        } else {
            compressed.push(s[i - 1] + count);
            count = 1;
        }
    }

    compressed.push(s[s.length - 1] + count);
    const result = compressed.join('');

    return result.length < s.length ? result : s;
}

/**
 * Optimized compression - only compress if beneficial
 * Time: O(n), Space: O(n)
 */
function stringCompressionOptimized(s) {
    if (!s) {
        return "";
    }

    // First pass: calculate compressed length
    let compressedLength = 0;
    let count = 1;

    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
            count++;
        } else {
            compressedLength += 1 + String(count).length;
            count = 1;
        }
    }
    compressedLength += 1 + String(count).length;

    if (compressedLength >= s.length) {
        return s;
    }

    // Second pass: build compressed string
    const result = [];
    count = 1;

    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
            count++;
        } else {
            result.push(s[i - 1]);
            result.push(String(count));
            count = 1;
        }
    }

    result.push(s[s.length - 1]);
    result.push(String(count));

    return result.join('');
}

/**
 * Word Break Problem - Check if string can be segmented
 * Time: O(n²), Space: O(n)
 */
function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const n = s.length;
    const dp = new Array(n + 1).fill(false);
    dp[0] = true; // Empty string

    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[n];
}

/**
 * Word Break - Find all possible segmentations
 * Time: O(2^n) worst case, Space: O(2^n)
 */
function wordBreakAllSolutions(s, wordDict) {
    const wordSet = new Set(wordDict);
    const memo = new Map();

    function backtrack(start) {
        if (memo.has(start)) {
            return memo.get(start);
        }

        if (start === s.length) {
            return [""];
        }

        const result = [];
        for (let end = start + 1; end <= s.length; end++) {
            const word = s.substring(start, end);
            if (wordSet.has(word)) {
                const rest = backtrack(end);
                for (const r of rest) {
                    if (r) {
                        result.push(word + " " + r);
                    } else {
                        result.push(word);
                    }
                }
            }
        }

        memo.set(start, result);
        return result;
    }

    return backtrack(0);
}

/**
 * Regular Expression Matching
 * Supports '.' (any char) and '*' (zero or more of preceding)
 * Time: O(m * n), Space: O(m * n)
 */
function regularExpressionMatching(s, p) {
    const m = s.length;
    const n = p.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(false));
    dp[0][0] = true;

    // Handle patterns like a*, a*b*, a*b*c*
    for (let j = 2; j <= n; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 2];
        }
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[j - 1] === s[i - 1] || p[j - 1] === '.') {
                dp[i][j] = dp[i - 1][j - 1];
            } else if (p[j - 1] === '*') {
                // Zero occurrences
                dp[i][j] = dp[i][j - 2];
                // One or more occurrences
                if (p[j - 2] === s[i - 1] || p[j - 2] === '.') {
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                }
            } else {
                dp[i][j] = false;
            }
        }
    }

    return dp[m][n];
}

/**
 * Wildcard Matching
 * Supports '?' (single char) and '*' (any sequence)
 * Time: O(m * n), Space: O(m * n)
 */
function wildcardMatching(s, p) {
    const m = s.length;
    const n = p.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(false));
    dp[0][0] = true;

    // Handle leading '*'
    for (let j = 1; j <= n; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 1];
        }
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[j - 1] === s[i - 1] || p[j - 1] === '?') {
                dp[i][j] = dp[i - 1][j - 1];
            } else if (p[j - 1] === '*') {
                // Match zero or more characters
                dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
            } else {
                dp[i][j] = false;
            }
        }
    }

    return dp[m][n];
}

/**
 * Longest Palindromic Subsequence (LPS)
 * Time: O(n²), Space: O(n²)
 */
function longestPalindromicSubsequence(s) {
    const n = s.length;
    const dp = Array(n).fill().map(() => Array(n).fill(0));

    // Every single character is a palindrome of length 1
    for (let i = 0; i < n; i++) {
        dp[i][i] = 1;
    }

    // Check for substrings of length 2 and more
    for (let length = 2; length <= n; length++) {
        for (let i = 0; i < n - length + 1; i++) {
            const j = i + length - 1;
            if (s[i] === s[j]) {
                dp[i][j] = length > 2 ? 2 + dp[i + 1][j - 1] : 2;
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[0][n - 1];
}

/**
 * Minimum insertions to make string palindrome
 * Time: O(n²), Space: O(n²)
 */
function minimumInsertionsForPalindrome(s) {
    const n = s.length;
    const dp = Array(n).fill().map(() => Array(n).fill(0));

    for (let length = 2; length <= n; length++) {
        for (let i = 0; i < n - length + 1; i++) {
            const j = i + length - 1;
            if (s[i] === s[j]) {
                dp[i][j] = length > 2 ? dp[i + 1][j - 1] : 0;
            } else {
                dp[i][j] = 1 + Math.min(dp[i + 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[0][n - 1];
}

// Example usage
if (require.main === module) {
    // String Compression
    console.log("--- String Compression ---");
    const s1 = "aabcccccaaa";
    console.log(`Original: ${s1}`);
    console.log(`Compressed: ${stringCompression(s1)}`);
    console.log(`Optimized: ${stringCompressionOptimized(s1)}`);

    const s2 = "abcdef";
    console.log(`\nOriginal: ${s2}`);
    console.log(`Compressed: ${stringCompression(s2)}`); // Returns original (not beneficial)

    // Word Break
    console.log("\n--- Word Break ---");
    const s3 = "leetcode";
    const wordDict = ["leet", "code"];
    console.log(`String: ${s3}, Dict: ${wordDict.join(', ')}`);
    console.log(`Can be segmented: ${wordBreak(s3, wordDict)}`);

    const s4 = "catsanddog";
    const wordDict2 = ["cat", "cats", "and", "sand", "dog"];
    console.log(`\nString: ${s4}, Dict: ${wordDict2.join(', ')}`);
    console.log(`All solutions:`, wordBreakAllSolutions(s4, wordDict2));

    // Regular Expression Matching
    console.log("\n--- Regular Expression Matching ---");
    console.log(`'aa' matches 'a': ${regularExpressionMatching('aa', 'a')}`);
    console.log(`'aa' matches 'a*': ${regularExpressionMatching('aa', 'a*')}`);
    console.log(`'ab' matches '.*': ${regularExpressionMatching('ab', '.*')}`);
    console.log(`'aab' matches 'c*a*b': ${regularExpressionMatching('aab', 'c*a*b')}`);

    // Wildcard Matching
    console.log("\n--- Wildcard Matching ---");
    console.log(`'aa' matches 'a': ${wildcardMatching('aa', 'a')}`);
    console.log(`'aa' matches '*': ${wildcardMatching('aa', '*')}`);
    console.log(`'adceb' matches '*a*b': ${wildcardMatching('adceb', '*a*b')}`);
    console.log(`'acdcb' matches 'a*c?b': ${wildcardMatching('acdcb', 'a*c?b')}`);

    // Longest Palindromic Subsequence
    console.log("\n--- Longest Palindromic Subsequence ---");
    const s5 = "bbbab";
    console.log(`String: ${s5}`);
    console.log(`LPS length: ${longestPalindromicSubsequence(s5)}`);

    // Minimum Insertions for Palindrome
    console.log("\n--- Minimum Insertions for Palindrome ---");
    const s6 = "ab";
    console.log(`String: ${s6}`);
    console.log(`Minimum insertions: ${minimumInsertionsForPalindrome(s6)}`);
}

module.exports = {
    stringCompression,
    stringCompressionOptimized,
    wordBreak,
    wordBreakAllSolutions,
    regularExpressionMatching,
    wildcardMatching,
    longestPalindromicSubsequence,
    minimumInsertionsForPalindrome
};


