/**
 * Multi-dimensional Arrays in Node.js
 */

class MultiDimensionalArray {
    /**
     * Multi-dimensional Array Implementation
     * @param {...number} dimensions - Sizes for each dimension
     */
    constructor(...dimensions) {
        this.dimensions = dimensions;
        this.totalSize = dimensions.reduce((acc, dim) => acc * dim, 1);
        this.data = new Array(this.totalSize).fill(0);
    }

    /**
     * Convert multi-dimensional indices to linear index (row-major)
     */
    _getIndex(...indices) {
        if (indices.length !== this.dimensions.length) {
            throw new Error("Number of indices must match number of dimensions");
        }

        let index = 0;
        let multiplier = 1;

        for (let i = indices.length - 1; i >= 0; i--) {
            if (indices[i] < 0 || indices[i] >= this.dimensions[i]) {
                throw new Error(`Index ${indices[i]} out of range for dimension ${i}`);
            }
            index += indices[i] * multiplier;
            multiplier *= this.dimensions[i];
        }

        return index;
    }

    /**
     * Set value at given indices
     */
    set(...args) {
        const value = args[args.length - 1];
        const indices = args.slice(0, -1);
        const index = this._getIndex(...indices);
        this.data[index] = value;
    }

    /**
     * Get value at given indices
     */
    get(...indices) {
        const index = this._getIndex(...indices);
        return this.data[index];
    }

    /**
     * Display 2D array in matrix format
     */
    display2D() {
        if (this.dimensions.length !== 2) {
            throw new Error("display2D only works for 2D arrays");
        }

        const [rows, cols] = this.dimensions;
        const matrix = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push(this.get(i, j));
            }
            matrix.push(row);
        }
        return matrix;
    }

    /**
     * Display 3D array
     */
    display3D() {
        if (this.dimensions.length !== 3) {
            throw new Error("display3D only works for 3D arrays");
        }

        const result = [];
        for (let i = 0; i < this.dimensions[0]; i++) {
            const layer = [];
            for (let j = 0; j < this.dimensions[1]; j++) {
                const row = [];
                for (let k = 0; k < this.dimensions[2]; k++) {
                    row.push(this.get(i, j, k));
                }
                layer.push(row);
            }
            result.push(layer);
        }
        return result;
    }
}

/**
 * Common matrix operations using 2D arrays
 */
function matrixOperations() {
    /**
     * Add two matrices
     */
    function addMatrices(a, b) {
        if (a.length !== b.length || a[0].length !== b[0].length) {
            throw new Error("Matrices must have same dimensions");
        }

        const result = Array(a.length).fill().map(() => Array(a[0].length).fill(0));
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < a[0].length; j++) {
                result[i][j] = a[i][j] + b[i][j];
            }
        }
        return result;
    }

    /**
     * Multiply two matrices
     */
    function multiplyMatrices(a, b) {
        if (a[0].length !== b.length) {
            throw new Error("Number of columns in A must equal rows in B");
        }

        const result = Array(a.length).fill().map(() => Array(b[0].length).fill(0));
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < b[0].length; j++) {
                for (let k = 0; k < b.length; k++) {
                    result[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        return result;
    }

    /**
     * Transpose matrix
     */
    function transposeMatrix(matrix) {
        return matrix[0].map((_, i) => matrix.map(row => row[i]));
    }

    return { addMatrices, multiplyMatrices, transposeMatrix };
}

// Example usage
if (require.main === module) {
    // 2D Array
    console.log("--- 2D Array ---");
    const arr2D = new MultiDimensionalArray(3, 4);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            arr2D.set(i, j, i * 4 + j);
        }
    }

    console.log("2D Array:");
    arr2D.display2D().forEach(row => console.log(row));

    // 3D Array
    console.log("\n--- 3D Array ---");
    const arr3D = new MultiDimensionalArray(2, 3, 4);
    let count = 0;
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 4; k++) {
                arr3D.set(i, j, k, count++);
            }
        }
    }

    console.log("3D Array (first layer):");
    console.log(arr3D.display3D()[0]);

    // Matrix Operations
    console.log("\n--- Matrix Operations ---");
    const { addMatrices, multiplyMatrices, transposeMatrix } = matrixOperations();

    const a = [[1, 2], [3, 4]];
    const b = [[5, 6], [7, 8]];
    console.log("Matrix A:", a);
    console.log("Matrix B:", b);
    console.log("A + B:", addMatrices(a, b));
    console.log("A * B:", multiplyMatrices(a, b));
    console.log("Transpose of A:", transposeMatrix(a));
}

module.exports = { MultiDimensionalArray, matrixOperations };

