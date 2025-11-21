/**
 * Boyer-Moore String Matching Algorithm in Node.js
 */

/**
 * Boyer-Moore Pattern Matching
 * Time: O(nm) worst, O(n) best, Space: O(m)
 * Uses bad character rule and good suffix rule
 */
function boyerMoore(text, pattern) {
    if (!pattern) {
        return [];
    }

    const n = text.length;
    const m = pattern.length;
    const result = [];

    // Preprocess bad character rule
    const badChar = buildBadCharTable(pattern);

    let s = 0; // Shift of pattern with respect to text
    while (s <= n - m) {
        let j = m - 1;

        // Keep reducing index j while characters match
        while (j >= 0 && pattern[j] === text[s + j]) {
            j--;
        }

        // If pattern found
        if (j < 0) {
            result.push(s);
            // Shift pattern to next possible position
            s += (s + m < n) ? (m - (badChar.get(text[s + m]) || -1)) : 1;
        } else {
            // Shift pattern to align bad character
            s += Math.max(1, j - (badChar.get(text[s + j]) || -1));
        }
    }

    return result;
}

/**
 * Build bad character table
 * Stores last occurrence of each character
 */
function buildBadCharTable(pattern) {
    const table = new Map();
    for (let i = 0; i < pattern.length; i++) {
        table.set(pattern[i], i);
    }
    return table;
}

/**
 * Enhanced Boyer-Moore with good suffix rule
 * Time: O(nm) worst, O(n) best, Space: O(m)
 */
function boyerMooreEnhanced(text, pattern) {
    if (!pattern) {
        return [];
    }

    const n = text.length;
    const m = pattern.length;
    const result = [];

    // Preprocess both rules
    const badChar = buildBadCharTable(pattern);
    const goodSuffix = buildGoodSuffixTable(pattern);

    let s = 0;
    while (s <= n - m) {
        let j = m - 1;

        while (j >= 0 && pattern[j] === text[s + j]) {
            j--;
        }

        if (j < 0) {
            result.push(s);
            s += (m > 1) ? goodSuffix[0] : 1;
        } else {
            const badCharShift = j - (badChar.get(text[s + j]) || -1);
            const goodSuffixShift = goodSuffix[j + 1];
            s += Math.max(badCharShift, goodSuffixShift);
        }
    }

    return result;
}

/**
 * Build good suffix table
 * Stores shift values for good suffix rule
 */
function buildGoodSuffixTable(pattern) {
    const m = pattern.length;
    const table = new Array(m + 1).fill(0);

    // Simplified good suffix rule
    for (let i = 0; i < m; i++) {
        table[i] = m;
    }

    // Find longest suffix that matches prefix
    let i = m;
    let j = m + 1;
    const border = new Array(m + 1).fill(0);
    border[i] = j;

    while (i > 0) {
        while (j <= m && pattern[i - 1] !== pattern[j - 1]) {
            if (table[j] === 0) {
                table[j] = j - i;
            }
            j = border[j];
        }
        i--;
        j--;
        border[i] = j;
    }

    j = border[0];
    for (let i = 0; i <= m; i++) {
        if (table[i] === 0) {
            table[i] = j;
        }
        if (i === j) {
            j = border[j];
        }
    }

    return table;
}

// Example usage
if (require.main === module) {
    const text = "ABAAABCD";
    const pattern = "ABC";

    console.log("Boyer-Moore Pattern Matching:");
    console.log(`Text: ${text}`);
    console.log(`Pattern: ${pattern}`);
    console.log(`Matches:`, boyerMoore(text, pattern));

    const text2 = "THIS IS A TEST TEXT";
    const pattern2 = "TEST";
    console.log(`\nText: ${text2}`);
    console.log(`Pattern: ${pattern2}`);
    console.log(`Matches:`, boyerMoore(text2, pattern2));

    console.log(`\nEnhanced Boyer-Moore:`);
    console.log(`Matches:`, boyerMooreEnhanced(text, pattern));
}

module.exports = {
    boyerMoore,
    boyerMooreEnhanced
};

