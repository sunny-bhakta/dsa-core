"""
Backtracking Problems in Python
"""

def n_queens(n):
    """
    N-Queens Problem
    Place n queens on n×n board so no two attack each other
    Time: O(n!), Space: O(n²)
    """
    def is_safe(board, row, col):
        # Check column
        for i in range(row):
            if board[i][col] == 'Q':
                return False
        
        # Check diagonal \
        for i, j in zip(range(row - 1, -1, -1), range(col - 1, -1, -1)):
            if board[i][j] == 'Q':
                return False
        
        # Check diagonal /
        for i, j in zip(range(row - 1, -1, -1), range(col + 1, n)):
            if board[i][j] == 'Q':
                return False
        
        return True
    
    def solve(board, row):
        if row == n:
            solutions.append([row[:] for row in board])
            return
        
        for col in range(n):
            if is_safe(board, row, col):
                board[row][col] = 'Q'
                solve(board, row + 1)
                board[row][col] = '.'  # Backtrack
    
    solutions = []
    board = [['.'] * n for _ in range(n)]
    solve(board, 0)
    return solutions


def sudoku_solver(board):
    """
    Sudoku Solver
    Solve 9×9 Sudoku puzzle
    Time: O(9^m) where m is empty cells, Space: O(1)
    """
    def is_valid(board, row, col, num):
        # Check row
        for j in range(9):
            if board[row][j] == num:
                return False
        
        # Check column
        for i in range(9):
            if board[i][col] == num:
                return False
        
        # Check 3×3 box
        start_row, start_col = 3 * (row // 3), 3 * (col // 3)
        for i in range(start_row, start_row + 3):
            for j in range(start_col, start_col + 3):
                if board[i][j] == num:
                    return False
        
        return True
    
    def solve():
        for i in range(9):
            for j in range(9):
                if board[i][j] == '.':
                    for num in '123456789':
                        if is_valid(board, i, j, num):
                            board[i][j] = num
                            if solve():
                                return True
                            board[i][j] = '.'  # Backtrack
                    return False
        return True
    
    solve()
    return board


def generate_permutations(nums):
    """
    Generate all permutations
    Time: O(n! × n), Space: O(n!)
    """
    def backtrack(path):
        if len(path) == len(nums):
            result.append(path[:])
            return
        
        for num in nums:
            if num not in path:
                path.append(num)
                backtrack(path)
                path.pop()  # Backtrack
    
    result = []
    backtrack([])
    return result


def generate_combinations(n, k):
    """
    Generate all combinations of k elements from 1 to n
    Time: O(C(n,k) × k), Space: O(k)
    """
    def backtrack(start, path):
        if len(path) == k:
            result.append(path[:])
            return
        
        for i in range(start, n + 1):
            path.append(i)
            backtrack(i + 1, path)
            path.pop()  # Backtrack
    
    result = []
    backtrack(1, [])
    return result


def word_search(board, word):
    """
    Word Search in 2D board
    Time: O(m × n × 4^L), Space: O(L) where L is word length
    """
    def dfs(row, col, index):
        if index == len(word):
            return True
        
        if (row < 0 or row >= len(board) or 
            col < 0 or col >= len(board[0]) or
            board[row][col] != word[index]):
            return False
        
        temp = board[row][col]
        board[row][col] = '#'  # Mark as visited
        
        found = (dfs(row + 1, col, index + 1) or
                dfs(row - 1, col, index + 1) or
                dfs(row, col + 1, index + 1) or
                dfs(row, col - 1, index + 1))
        
        board[row][col] = temp  # Backtrack
        return found
    
    for i in range(len(board)):
        for j in range(len(board[0])):
            if dfs(i, j, 0):
                return True
    
    return False


def rat_in_maze(maze):
    """
    Rat in a Maze Problem
    Find path from (0,0) to (n-1, n-1) in a maze
    1 = open path, 0 = blocked
    Time: O(2^(n²)), Space: O(n²)
    """
    n = len(maze)
    solution = [[0] * n for _ in range(n)]
    
    # Directions: down, right, up, left
    directions = [(1, 0), (0, 1), (-1, 0), (0, -1)]
    
    def is_safe(row, col):
        return (0 <= row < n and 0 <= col < n and 
                maze[row][col] == 1 and solution[row][col] == 0)
    
    def solve(row, col):
        # Base case: reached destination
        if row == n - 1 and col == n - 1:
            solution[row][col] = 1
            return True
        
        if is_safe(row, col):
            solution[row][col] = 1  # Mark as part of path
            
            # Try all directions
            for dr, dc in directions:
                if solve(row + dr, col + dc):
                    return True
            
            # Backtrack
            solution[row][col] = 0
            return False
        
        return False
    
    if solve(0, 0):
        return solution
    return None


def knights_tour(n, start_row=0, start_col=0):
    """
    Knight's Tour Problem
    Find a sequence of moves for a knight to visit every square exactly once
    Time: O(8^(n²)), Space: O(n²)
    """
    board = [[-1] * n for _ in range(n)]
    
    # All 8 possible moves for a knight
    moves = [
        (2, 1), (1, 2), (-1, 2), (-2, 1),
        (-2, -1), (-1, -2), (1, -2), (2, -1)
    ]
    
    def is_valid(row, col):
        return (0 <= row < n and 0 <= col < n and board[row][col] == -1)
    
    def get_degree(row, col):
        """Count number of unvisited neighbors (Warnsdorff's heuristic)"""
        count = 0
        for dr, dc in moves:
            nr, nc = row + dr, col + dc
            if is_valid(nr, nc):
                count += 1
        return count
    
    def solve(row, col, move_count):
        board[row][col] = move_count
        
        if move_count == n * n - 1:
            return True
        
        # Get valid next moves sorted by degree (Warnsdorff's heuristic)
        next_moves = []
        for dr, dc in moves:
            nr, nc = row + dr, col + dc
            if is_valid(nr, nc):
                degree = get_degree(nr, nc)
                next_moves.append((degree, nr, nc))
        
        # Sort by degree (prefer moves with fewer options)
        next_moves.sort()
        
        # Try moves in order
        for _, nr, nc in next_moves:
            if solve(nr, nc, move_count + 1):
                return True
        
        # Backtrack
        board[row][col] = -1
        return False
    
    if solve(start_row, start_col, 0):
        return board
    return None


# Example usage
if __name__ == "__main__":
    # N-Queens
    print("4-Queens solutions:", len(n_queens(4)))
    
    # Permutations
    print("Permutations of [1,2,3]:", generate_permutations([1, 2, 3]))
    
    # Combinations
    print("Combinations C(4,2):", generate_combinations(4, 2))
    
    # Word Search
    board = [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E']
    ]
    print("Word 'ABCCED' exists:", word_search(board, "ABCCED"))
    
    # Rat in a Maze
    print("\n--- Rat in a Maze ---")
    maze = [
        [1, 0, 0, 0],
        [1, 1, 0, 1],
        [0, 1, 0, 0],
        [1, 1, 1, 1]
    ]
    path = rat_in_maze(maze)
    if path:
        print("Path found:")
        for row in path:
            print(row)
    else:
        print("No path exists")
    
    # Knight's Tour
    print("\n--- Knight's Tour (5x5) ---")
    tour = knights_tour(5, 0, 0)
    if tour:
        print("Tour found:")
        for row in tour:
            print(row)
    else:
        print("No tour exists")

