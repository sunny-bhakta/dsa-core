"""
Multi-dimensional Arrays in Python
"""

import numpy as np

class MultiDimensionalArray:
    """Multi-dimensional Array Implementation"""
    
    def __init__(self, *dimensions):
        """
        Initialize multi-dimensional array
        dimensions: tuple of sizes for each dimension
        """
        self.dimensions = dimensions
        self.total_size = 1
        for dim in dimensions:
            self.total_size *= dim
        self.data = [0] * self.total_size
    
    def _get_index(self, *indices):
        """Convert multi-dimensional indices to linear index (row-major)"""
        if len(indices) != len(self.dimensions):
            raise ValueError("Number of indices must match number of dimensions")
        
        index = 0
        multiplier = 1
        
        for i in range(len(indices) - 1, -1, -1):
            if indices[i] < 0 or indices[i] >= self.dimensions[i]:
                raise IndexError(f"Index {indices[i]} out of range for dimension {i}")
            index += indices[i] * multiplier
            multiplier *= self.dimensions[i]
        
        return index
    
    def set(self, *indices, value):
        """Set value at given indices"""
        index = self._get_index(*indices)
        self.data[index] = value
    
    def get(self, *indices):
        """Get value at given indices"""
        index = self._get_index(*indices)
        return self.data[index]
    
    def display_2d(self):
        """Display 2D array in matrix format"""
        if len(self.dimensions) != 2:
            raise ValueError("display_2d only works for 2D arrays")
        
        rows, cols = self.dimensions
        matrix = []
        for i in range(rows):
            row = []
            for j in range(cols):
                row.append(self.get(i, j))
            matrix.append(row)
        return matrix
    
    def display_3d(self):
        """Display 3D array"""
        if len(self.dimensions) != 3:
            raise ValueError("display_3d only works for 3D arrays")
        
        result = []
        for i in range(self.dimensions[0]):
            layer = []
            for j in range(self.dimensions[1]):
                row = []
                for k in range(self.dimensions[2]):
                    row.append(self.get(i, j, k))
                layer.append(row)
            result.append(layer)
        return result


def matrix_operations():
    """Common matrix operations using 2D arrays"""
    
    def add_matrices(a, b):
        """Add two matrices"""
        if len(a) != len(b) or len(a[0]) != len(b[0]):
            raise ValueError("Matrices must have same dimensions")
        
        result = [[0] * len(a[0]) for _ in range(len(a))]
        for i in range(len(a)):
            for j in range(len(a[0])):
                result[i][j] = a[i][j] + b[i][j]
        return result
    
    def multiply_matrices(a, b):
        """Multiply two matrices"""
        if len(a[0]) != len(b):
            raise ValueError("Number of columns in A must equal rows in B")
        
        result = [[0] * len(b[0]) for _ in range(len(a))]
        for i in range(len(a)):
            for j in range(len(b[0])):
                for k in range(len(b)):
                    result[i][j] += a[i][k] * b[k][j]
        return result
    
    def transpose_matrix(matrix):
        """Transpose matrix"""
        return [[matrix[j][i] for j in range(len(matrix))] 
                for i in range(len(matrix[0]))]
    
    return add_matrices, multiply_matrices, transpose_matrix


# Example usage
if __name__ == "__main__":
    # 2D Array
    print("--- 2D Array ---")
    arr_2d = MultiDimensionalArray(3, 4)
    for i in range(3):
        for j in range(4):
            arr_2d.set(i, j, value=i * 4 + j)
    
    print("2D Array:")
    for row in arr_2d.display_2d():
        print(row)
    
    # 3D Array
    print("\n--- 3D Array ---")
    arr_3d = MultiDimensionalArray(2, 3, 4)
    count = 0
    for i in range(2):
        for j in range(3):
            for k in range(4):
                arr_3d.set(i, j, k, value=count)
                count += 1
    
    print("3D Array (first layer):")
    print(arr_3d.display_3d()[0])
    
    # Matrix Operations
    print("\n--- Matrix Operations ---")
    add, multiply, transpose = matrix_operations()
    
    a = [[1, 2], [3, 4]]
    b = [[5, 6], [7, 8]]
    print("Matrix A:", a)
    print("Matrix B:", b)
    print("A + B:", add(a, b))
    print("A * B:", multiply(a, b))
    print("Transpose of A:", transpose(a))
    
    # Using NumPy (for reference)
    print("\n--- Using NumPy (for reference) ---")
    np_array = np.array([[1, 2, 3], [4, 5, 6]])
    print("NumPy 2D Array:")
    print(np_array)
    print("Shape:", np_array.shape)
    print("Sum:", np_array.sum())
    print("Mean:", np_array.mean())

