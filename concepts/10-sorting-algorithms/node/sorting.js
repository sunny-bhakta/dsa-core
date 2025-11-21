/**
 * Sorting Algorithms in Node.js
 */

/**
 * Bubble Sort - O(n²) worst, O(n) best
 * Stable, in-place
 */
function bubbleSort(arr) {
    const n = arr.length;
    const result = [...arr];

    for (let i = 0; i < n; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (result[j] > result[j + 1]) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }

    return result;
}

/**
 * Selection Sort - O(n²)
 * Not stable, in-place
 */
function selectionSort(arr) {
    const result = [...arr];
    const n = result.length;

    for (let i = 0; i < n; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (result[j] < result[minIdx]) {
                minIdx = j;
            }
        }
        [result[i], result[minIdx]] = [result[minIdx], result[i]];
    }

    return result;
}

/**
 * Insertion Sort - O(n²) worst, O(n) best
 * Stable, in-place
 */
function insertionSort(arr) {
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

/**
 * Merge Sort - O(n log n)
 * Stable, not in-place
 */
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
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

/**
 * Quick Sort - O(n log n) average, O(n²) worst
 * Not stable, in-place
 */
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);

    return [...quickSort(left), ...middle, ...quickSort(right)];
}

/**
 * Heap Sort - O(n log n)
 * Not stable, in-place
 */
function heapSort(arr) {
    function heapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            heapify(arr, n, largest);
        }
    }

    const result = [...arr];
    const n = result.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(result, n, i);
    }

    // Extract elements
    for (let i = n - 1; i > 0; i--) {
        [result[0], result[i]] = [result[i], result[0]];
        heapify(result, i, 0);
    }

    return result;
}

/**
 * Counting Sort - O(n + k) where k is range
 * Stable, not in-place
 */
function countingSort(arr, maxVal = null) {
    if (arr.length === 0) {
        return [];
    }

    if (maxVal === null) {
        maxVal = Math.max(...arr);
    }

    const count = new Array(maxVal + 1).fill(0);

    for (const num of arr) {
        count[num]++;
    }

    const result = [];
    for (let i = 0; i < count.length; i++) {
        for (let j = 0; j < count[i]; j++) {
            result.push(i);
        }
    }

    return result;
}

// Example usage
if (require.main === module) {
    const arr = [64, 34, 25, 12, 22, 11, 90];

    console.log("Original:", arr);
    console.log("Bubble Sort:", bubbleSort(arr));
    console.log("Selection Sort:", selectionSort(arr));
    console.log("Insertion Sort:", insertionSort(arr));
    console.log("Merge Sort:", mergeSort(arr));
    console.log("Quick Sort:", quickSort(arr));
    console.log("Heap Sort:", heapSort(arr));
    console.log("Counting Sort:", countingSort([4, 2, 2, 8, 3, 3, 1]));
}

module.exports = {
    bubbleSort,
    selectionSort,
    insertionSort,
    mergeSort,
    quickSort,
    heapSort,
    countingSort
};

