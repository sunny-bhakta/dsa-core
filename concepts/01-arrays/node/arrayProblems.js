/**
 * Common Array Problems
 */

/**
 * Rotate array to the right by k steps
 * Time: O(n), Space: O(1)
 */
function rotateArray(arr, k) {
    const n = arr.length;
    k = k % n; // Handle k > n

    // Reverse entire array
    reverse(arr, 0, n - 1);
    // Reverse first k elements
    reverse(arr, 0, k - 1);
    // Reverse remaining elements
    reverse(arr, k, n - 1);

    return arr;
}

function reverse(arr, start, end) {
    while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start++;
        end--;
    }
}

/**
 * Kadane's Algorithm - Find maximum sum of contiguous subarray
 * Time: O(n), Space: O(1)
 */
function maxSubarraySum(arr) {
    let maxSum = arr[0];
    let currentSum = arr[0];

    for (let i = 1; i < arr.length; i++) {
        currentSum = Math.max(arr[i], currentSum + arr[i]);
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}

/**
 * Find two numbers that add up to target
 * Time: O(n), Space: O(n)
 */
function twoSum(arr, target) {
    const numMap = new Map();

    for (let i = 0; i < arr.length; i++) {
        const complement = target - arr[i];
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        numMap.set(arr[i], i);
    }

    return [];
}

/**
 * Merge two sorted arrays
 * Time: O(n + m), Space: O(n + m)
 */
function mergeSortedArrays(arr1, arr2) {
    const result = [];
    let i = 0, j = 0;

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            result.push(arr1[i]);
            i++;
        } else {
            result.push(arr2[j]);
            j++;
        }
    }

    // Add remaining elements
    while (i < arr1.length) {
        result.push(arr1[i]);
        i++;
    }

    while (j < arr2.length) {
        result.push(arr2[j]);
        j++;
    }

    return result;
}

/**
 * Remove duplicates from sorted array in-place
 * Time: O(n), Space: O(1)
 */
function removeDuplicates(arr) {
    if (arr.length === 0) return 0;

    let writeIndex = 1;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[writeIndex - 1]) {
            arr[writeIndex] = arr[i];
            writeIndex++;
        }
    }

    return writeIndex;
}

/**
 * Product of array except self without division
 * Time: O(n), Space: O(n)
 */
function productExceptSelf(arr) {
    const n = arr.length;
    const result = new Array(n).fill(1);

    // Left products
    let leftProduct = 1;
    for (let i = 0; i < n; i++) {
        result[i] = leftProduct;
        leftProduct *= arr[i];
    }

    // Right products
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= arr[i];
    }

    return result;
}

// Example usage
if (require.main === module) {
    // Rotate array
    const arr1 = [1, 2, 3, 4, 5];
    console.log("Rotate array:", rotateArray([...arr1], 2));

    // Max subarray sum
    const arr2 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
    console.log("Max subarray sum:", maxSubarraySum(arr2));

    // Two sum
    const arr3 = [2, 7, 11, 15];
    console.log("Two sum indices:", twoSum(arr3, 9));

    // Merge sorted arrays
    const arr4 = [1, 3, 5, 7];
    const arr5 = [2, 4, 6, 8];
    console.log("Merged arrays:", mergeSortedArrays(arr4, arr5));

    // Remove duplicates
    const arr6 = [1, 1, 2, 2, 3, 4, 4, 5];
    const newLength = removeDuplicates(arr6);
    console.log("After removing duplicates:", arr6.slice(0, newLength));

    // Product except self
    const arr7 = [1, 2, 3, 4];
    console.log("Product except self:", productExceptSelf(arr7));
}

module.exports = {
    rotateArray,
    maxSubarraySum,
    twoSum,
    mergeSortedArrays,
    removeDuplicates,
    productExceptSelf
};

