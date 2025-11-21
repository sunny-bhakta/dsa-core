/**
 * Searching Algorithms in Node.js
 */

/**
 * Linear Search - O(n)
 * Works on any array
 */
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

/**
 * Binary Search - O(log n)
 * Requires sorted array
 */
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}

/**
 * Binary Search (Recursive) - O(log n)
 */
function binarySearchRecursive(arr, target, left = 0, right = null) {
    if (right === null) {
        right = arr.length - 1;
    }

    if (left > right) {
        return -1;
    }

    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

/**
 * Ternary Search - O(log₃ n)
 * Requires sorted array
 */
function ternarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid1 = left + Math.floor((right - left) / 3);
        const mid2 = right - Math.floor((right - left) / 3);

        if (arr[mid1] === target) {
            return mid1;
        }
        if (arr[mid2] === target) {
            return mid2;
        }

        if (target < arr[mid1]) {
            right = mid1 - 1;
        } else if (target > arr[mid2]) {
            left = mid2 + 1;
        } else {
            left = mid1 + 1;
            right = mid2 - 1;
        }
    }

    return -1;
}

/**
 * Interpolation Search - O(log log n) average, O(n) worst
 * Requires sorted, uniformly distributed array
 */
function interpolationSearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right && arr[left] <= target && target <= arr[right]) {
        if (left === right) {
            if (arr[left] === target) {
                return left;
            }
            return -1;
        }

        const pos = left + Math.floor(((right - left) / (arr[right] - arr[left])) * (target - arr[left]));

        if (arr[pos] === target) {
            return pos;
        } else if (arr[pos] < target) {
            left = pos + 1;
        } else {
            right = pos - 1;
        }
    }

    return -1;
}

/**
 * Exponential Search - O(log n)
 * Useful for unbounded arrays
 */
function exponentialSearch(arr, target) {
    if (arr[0] === target) {
        return 0;
    }

    const n = arr.length;
    let i = 1;

    while (i < n && arr[i] <= target) {
        i *= 2;
    }

    return binarySearchRecursive(arr, target, Math.floor(i / 2), Math.min(i, n - 1));
}

/**
 * Jump Search - O(√n)
 * Requires sorted array
 */
function jumpSearch(arr, target) {
    const n = arr.length;
    let step = Math.floor(Math.sqrt(n));
    let prev = 0;

    while (arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) {
            return -1;
        }
    }

    for (let i = prev; i < Math.min(step, n); i++) {
        if (arr[i] === target) {
            return i;
        }
    }

    return -1;
}

// Example usage
if (require.main === module) {
    const sortedArr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    const unsortedArr = [64, 34, 25, 12, 22, 11, 90];

    console.log("Sorted array:", sortedArr);
    console.log("Binary search for 7:", binarySearch(sortedArr, 7));
    console.log("Ternary search for 11:", ternarySearch(sortedArr, 11));
    console.log("Interpolation search for 13:", interpolationSearch(sortedArr, 13));
    console.log("Exponential search for 15:", exponentialSearch(sortedArr, 15));
    console.log("Jump search for 9:", jumpSearch(sortedArr, 9));

    console.log("\nUnsorted array:", unsortedArr);
    console.log("Linear search for 25:", linearSearch(unsortedArr, 25));
}

module.exports = {
    linearSearch,
    binarySearch,
    binarySearchRecursive,
    ternarySearch,
    interpolationSearch,
    exponentialSearch,
    jumpSearch
};

