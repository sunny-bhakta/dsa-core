/**
 * Two Pointers Problems in Node.js
 */

/**
 * Two sum in sorted array
 * Time: O(n), Space: O(1)
 */
function twoSumSorted(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        const currentSum = arr[left] + arr[right];
        if (currentSum === target) {
            return [left, right];
        } else if (currentSum < target) {
            left++;
        } else {
            right--;
        }
    }

    return [];
}

/**
 * Three sum - find triplets that sum to target
 * Time: O(n²), Space: O(1)
 */
function threeSum(arr, target) {
    arr.sort((a, b) => a - b);
    const result = [];

    for (let i = 0; i < arr.length - 2; i++) {
        if (i > 0 && arr[i] === arr[i - 1]) {
            continue;
        }

        let left = i + 1;
        let right = arr.length - 1;

        while (left < right) {
            const currentSum = arr[i] + arr[left] + arr[right];
            if (currentSum === target) {
                result.push([arr[i], arr[left], arr[right]]);
                while (left < right && arr[left] === arr[left + 1]) {
                    left++;
                }
                while (left < right && arr[right] === arr[right - 1]) {
                    right--;
                }
                left++;
                right--;
            } else if (currentSum < target) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}

/**
 * Remove duplicates from sorted array in-place
 * Time: O(n), Space: O(1)
 */
function removeDuplicates(arr) {
    if (arr.length === 0) {
        return 0;
    }

    let writeIndex = 1;

    for (let readIndex = 1; readIndex < arr.length; readIndex++) {
        if (arr[readIndex] !== arr[writeIndex - 1]) {
            arr[writeIndex] = arr[readIndex];
            writeIndex++;
        }
    }

    return writeIndex;
}

/**
 * Container with most water
 * Time: O(n), Space: O(1)
 */
function containerWithMostWater(heights) {
    let left = 0;
    let right = heights.length - 1;
    let maxWater = 0;

    while (left < right) {
        const width = right - left;
        const height = Math.min(heights[left], heights[right]);
        maxWater = Math.max(maxWater, width * height);

        if (heights[left] < heights[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxWater;
}

/**
 * Check if string is palindrome (alphanumeric only)
 * Time: O(n), Space: O(1)
 */
function isPalindrome(s) {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        while (left < right && !/[a-zA-Z0-9]/.test(s[left])) {
            left++;
        }
        while (left < right && !/[a-zA-Z0-9]/.test(s[right])) {
            right--;
        }

        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}

/**
 * Merge two sorted arrays in-place
 * Time: O(m + n), Space: O(1)
 */
function mergeSortedArrays(arr1, m, arr2, n) {
    let i = m - 1;
    let j = n - 1;
    let k = m + n - 1;

    while (i >= 0 && j >= 0) {
        if (arr1[i] > arr2[j]) {
            arr1[k] = arr1[i];
            i--;
        } else {
            arr1[k] = arr2[j];
            j--;
        }
        k--;
    }

    while (j >= 0) {
        arr1[k] = arr2[j];
        j--;
        k--;
    }
}

// Example usage
if (require.main === module) {
    console.log("Two sum sorted:", twoSumSorted([2, 7, 11, 15], 9));
    console.log("Three sum:", threeSum([-1, 0, 1, 2, -1, -4], 0));

    const arr = [1, 1, 2, 2, 3, 4, 4, 5];
    const newLen = removeDuplicates(arr);
    console.log("Remove duplicates:", arr.slice(0, newLen));

    console.log("Container with most water:", containerWithMostWater([1, 8, 6, 2, 5, 4, 8, 3, 7]));
    console.log("Is palindrome:", isPalindrome("A man, a plan, a canal: Panama"));
}

module.exports = {
    twoSumSorted,
    threeSum,
    removeDuplicates,
    containerWithMostWater,
    isPalindrome,
    mergeSortedArrays
};

