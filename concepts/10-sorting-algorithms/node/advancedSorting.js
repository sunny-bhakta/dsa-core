/**
 * Advanced Sorting Algorithms in Node.js
 */

/**
 * Radix Sort - Sort by individual digits
 * Time: O(d(n + k)) where d is digits, Space: O(n + k)
 * Works for non-negative integers
 */
function radixSort(arr) {
    if (arr.length === 0) {
        return [];
    }

    // Find maximum number to know number of digits
    const maxVal = Math.max(...arr);

    // Do counting sort for every digit
    let exp = 1;
    while (Math.floor(maxVal / exp) > 0) {
        countingSortByDigit(arr, exp);
        exp *= 10;
    }

    return arr;
}

function countingSortByDigit(arr, exp) {
    const n = arr.length;
    const output = new Array(n).fill(0);
    const count = new Array(10).fill(0);

    // Store count of occurrences
    for (let i = 0; i < n; i++) {
        const index = Math.floor((arr[i] / exp) % 10);
        count[index]++;
    }

    // Change count to position
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build output array
    for (let i = n - 1; i >= 0; i--) {
        const index = Math.floor((arr[i] / exp) % 10);
        output[count[index] - 1] = arr[i];
        count[index]--;
    }

    // Copy output to arr
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

/**
 * Bucket Sort - Distribute elements into buckets
 * Time: O(n + k) average, O(n²) worst, Space: O(n)
 * Works best for uniformly distributed data
 */
function bucketSort(arr) {
    if (arr.length === 0) {
        return [];
    }

    // Find min and max
    const minVal = Math.min(...arr);
    const maxVal = Math.max(...arr);

    // Number of buckets
    const numBuckets = arr.length;
    const bucketRange = (maxVal !== minVal) ? (maxVal - minVal) / numBuckets : 1;

    // Create buckets
    const buckets = Array(numBuckets).fill().map(() => []);

    // Distribute elements into buckets
    for (const num of arr) {
        let index = Math.floor((num - minVal) / bucketRange);
        if (index >= numBuckets) {
            index = numBuckets - 1;
        }
        buckets[index].push(num);
    }

    // Sort individual buckets and concatenate
    const result = [];
    for (const bucket of buckets) {
        if (bucket.length > 0) {
            // Use insertion sort for buckets
            insertionSortBucket(bucket);
            result.push(...bucket);
        }
    }

    return result;
}

function insertionSortBucket(bucket) {
    for (let i = 1; i < bucket.length; i++) {
        const key = bucket[i];
        let j = i - 1;
        while (j >= 0 && bucket[j] > key) {
            bucket[j + 1] = bucket[j];
            j--;
        }
        bucket[j + 1] = key;
    }
}

/**
 * Tim Sort - Hybrid stable sorting algorithm
 * Time: O(n log n), Space: O(n)
 * Used in Python's built-in sort
 * Combines merge sort and insertion sort
 */
function timSort(arr) {
    // Simplified version - full Tim Sort is complex
    // This is a merge sort implementation (Tim Sort uses similar approach)
    if (arr.length <= 1) {
        return arr;
    }

    // Use insertion sort for small arrays
    if (arr.length <= 32) {
        return insertionSortSimple(arr);
    }

    const mid = Math.floor(arr.length / 2);
    const left = timSort(arr.slice(0, mid));
    const right = timSort(arr.slice(mid));

    return mergeTim(left, right);
}

function insertionSortSimple(arr) {
    const result = [...arr];
    for (let i = 1; i < result.length; i++) {
        const key = result[i];
        let j = i - 1;
        while (j >= 0 && result[j] > key) {
            result[j + 1] = result[j];
            j--;
        }
        result[j + 1] = key;
    }
    return result;
}

function mergeTim(left, right) {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Example usage
if (require.main === module) {
    // Radix Sort
    const arr1 = [170, 45, 75, 90, 802, 24, 2, 66];
    console.log("Radix Sort:");
    console.log("Original:", arr1);
    console.log("Sorted:", radixSort([...arr1]));

    // Bucket Sort
    const arr2 = [0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434];
    console.log("\nBucket Sort:");
    console.log("Original:", arr2);
    console.log("Sorted:", bucketSort([...arr2]));

    // Tim Sort
    const arr3 = [64, 34, 25, 12, 22, 11, 90];
    console.log("\nTim Sort:");
    console.log("Original:", arr3);
    console.log("Sorted:", timSort([...arr3]));
}

module.exports = {
    radixSort,
    bucketSort,
    timSort
};

