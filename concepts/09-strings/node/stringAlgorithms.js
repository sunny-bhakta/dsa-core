/**
 * String Algorithms in Node.js
 */

/**
 * Naive pattern matching
 * Time: O(nm), Space: O(1)
 */
function naivePatternMatching(text, pattern) {
    const n = text.length;
    const m = pattern.length;
    const result = [];

    for (let i = 0; i <= n - m; i++) {
        let j = 0;
        while (j < m && text[i + j] === pattern[j]) {
            j++;
        }
        if (j === m) {
            result.push(i);
        }
    }

    return result;
}

/**
 * KMP (Knuth-Morris-Pratt) pattern matching
 * Time: O(n + m), Space: O(m)
 */
function kmpPatternMatching(text, pattern) {
    function buildLPS(pattern) {
        const m = pattern.length;
        const lps = new Array(m).fill(0);
        let length = 0;
        let i = 1;

        while (i < m) {
            if (pattern[i] === pattern[length]) {
                length++;
                lps[i] = length;
                i++;
            } else {
                if (length !== 0) {
                    length = lps[length - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
        return lps;
    }

    const n = text.length;
    const m = pattern.length;
    if (m === 0) {
        return [];
    }

    const lps = buildLPS(pattern);
    const result = [];
    let i = 0, j = 0;

    while (i < n) {
        if (text[i] === pattern[j]) {
            i++;
            j++;
        }

        if (j === m) {
            result.push(i - j);
            j = lps[j - 1];
        } else if (i < n && text[i] !== pattern[j]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }

    return result;
}

/**
 * Rabin-Karp pattern matching
 * Time: O(n + m) average, O(nm) worst, Space: O(1)
 */
function rabinKarp(text, pattern, base = 256, mod = 101) {
    const n = text.length;
    const m = pattern.length;
    if (m === 0 || m > n) {
        return [];
    }

    let patternHash = 0;
    let windowHash = 0;
    let h = 1;

    for (let i = 0; i < m - 1; i++) {
        h = (h * base) % mod;
    }

    for (let i = 0; i < m; i++) {
        patternHash = (base * patternHash + text.charCodeAt(i)) % mod;
        windowHash = (base * windowHash + text.charCodeAt(i)) % mod;
    }

    const result = [];

    for (let i = 0; i <= n - m; i++) {
        if (patternHash === windowHash) {
            if (text.substring(i, i + m) === pattern) {
                result.push(i);
            }
        }

        if (i < n - m) {
            windowHash = (base * (windowHash - text.charCodeAt(i) * h) +
                text.charCodeAt(i + m)) % mod;
            if (windowHash < 0) {
                windowHash += mod;
            }
        }
    }

    return result;
}

/**
 * Find longest palindromic substring
 * Time: O(n²), Space: O(1)
 */
function longestPalindromicSubstring(s) {
    if (s.length === 0) {
        return "";
    }

    let start = 0;
    let maxLen = 1;

    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            if (right - left + 1 > maxLen) {
                start = left;
                maxLen = right - left + 1;
            }
            left--;
            right++;
        }
    }

    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i); // Odd length
        expandAroundCenter(i, i + 1); // Even length
    }

    return s.substring(start, start + maxLen);
}

/**
 * Check if two strings are anagrams
 * Time: O(n), Space: O(1) - limited charset
 */
function isAnagram(s1, s2) {
    if (s1.length !== s2.length) {
        return false;
    }

    const count = new Array(26).fill(0);

    for (const char of s1) {
        count[char.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }

    for (const char of s2) {
        const idx = char.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
        count[idx]--;
        if (count[idx] < 0) {
            return false;
        }
    }

    return true;
}

/**
 * Find longest common substring
 * Time: O(nm), Space: O(nm)
 */
function longestCommonSubstring(s1, s2) {
    const m = s1.length;
    const n = s2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    let maxLen = 0;
    let endIndex = 0;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                if (dp[i][j] > maxLen) {
                    maxLen = dp[i][j];
                    endIndex = i;
                }
            } else {
                dp[i][j] = 0;
            }
        }
    }

    return maxLen > 0 ? s1.substring(endIndex - maxLen, endIndex) : "";
}

// Example usage
if (require.main === module) {
    const text = "ABABDABACDABABCABCABC";
    const pattern = "ABCABC";

    console.log("Naive matching:", naivePatternMatching(text, pattern));
    console.log("KMP matching:", kmpPatternMatching(text, pattern));
    console.log("Rabin-Karp matching:", rabinKarp(text, pattern));

    console.log("\nLongest palindromic substring:", longestPalindromicSubstring("babad"));
    console.log("Is anagram:", isAnagram("listen", "silent"));
    console.log("Longest common substring:", longestCommonSubstring("ABABC", "BABCA"));
}

module.exports = {
    naivePatternMatching,
    kmpPatternMatching,
    rabinKarp,
    longestPalindromicSubstring,
    isAnagram,
    longestCommonSubstring
};

