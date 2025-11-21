/**
 * Backtracking Problems in Node.js
 */

/**
 * N-Queens Problem
 * Place n queens on n×n board so no two attack each other
 * Time: O(n!), Space: O(n²)
 */
function nQueens(n) {
    const solutions = [];

    function isSafe(board, row, col) {
        // Check column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') {
                return false;
            }
        }

        // Check diagonal \
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') {
                return false;
            }
        }

        // Check diagonal /
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') {
                return false;
            }
        }

        return true;
    }

    function solve(board, row) {
        if (row === n) {
            solutions.push(board.map(row => [...row]));
            return;
        }

        for (let col = 0; col < n; col++) {
            if (isSafe(board, row, col)) {
                board[row][col] = 'Q';
                solve(board, row + 1);
                board[row][col] = '.'; // Backtrack
            }
        }
    }

    const board = Array(n).fill().map(() => Array(n).fill('.'));
    solve(board, 0);
    return solutions;
}

/**
 * Sudoku Solver
 * Solve 9×9 Sudoku puzzle
 * Time: O(9^m) where m is empty cells, Space: O(1)
 */
function sudokuSolver(board) {
    function isValid(row, col, num) {
        // Check row
        for (let j = 0; j < 9; j++) {
            if (board[row][j] === num) {
                return false;
            }
        }

        // Check column
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num) {
                return false;
            }
        }

        // Check 3×3 box
        const startRow = 3 * Math.floor(row / 3);
        const startCol = 3 * Math.floor(col / 3);
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (board[i][j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    function solve() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === '.') {
                    for (const num of '123456789') {
                        if (isValid(i, j, num)) {
                            board[i][j] = num;
                            if (solve()) {
                                return true;
                            }
                            board[i][j] = '.'; // Backtrack
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    solve();
    return board;
}

/**
 * Generate all permutations
 * Time: O(n! × n), Space: O(n!)
 */
function generatePermutations(nums) {
    const result = [];

    function backtrack(path) {
        if (path.length === nums.length) {
            result.push([...path]);
            return;
        }

        for (const num of nums) {
            if (!path.includes(num)) {
                path.push(num);
                backtrack(path);
                path.pop(); // Backtrack
            }
        }
    }

    backtrack([]);
    return result;
}

/**
 * Generate all combinations of k elements from 1 to n
 * Time: O(C(n,k) × k), Space: O(k)
 */
function generateCombinations(n, k) {
    const result = [];

    function backtrack(start, path) {
        if (path.length === k) {
            result.push([...path]);
            return;
        }

        for (let i = start; i <= n; i++) {
            path.push(i);
            backtrack(i + 1, path);
            path.pop(); // Backtrack
        }
    }

    backtrack(1, []);
    return result;
}

/**
 * Word Search in 2D board
 * Time: O(m × n × 4^L), Space: O(L) where L is word length
 */
function wordSearch(board, word) {
    function dfs(row, col, index) {
        if (index === word.length) {
            return true;
        }

        if (row < 0 || row >= board.length ||
            col < 0 || col >= board[0].length ||
            board[row][col] !== word[index]) {
            return false;
        }

        const temp = board[row][col];
        board[row][col] = '#'; // Mark as visited

        const found = (dfs(row + 1, col, index + 1) ||
            dfs(row - 1, col, index + 1) ||
            dfs(row, col + 1, index + 1) ||
            dfs(row, col - 1, index + 1));

        board[row][col] = temp; // Backtrack
        return found;
    }

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (dfs(i, j, 0)) {
                return true;
            }
        }
    }

    return false;
}

/**
 * Rat in a Maze Problem
 * Find path from (0,0) to (n-1, n-1) in a maze
 * 1 = open path, 0 = blocked
 * Time: O(2^(n²)), Space: O(n²)
 */
function ratInMaze(maze) {
    const n = maze.length;
    const solution = Array(n).fill().map(() => Array(n).fill(0));

    // Directions: down, right, up, left
    const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];

    function isSafe(row, col) {
        return (row >= 0 && row < n && col >= 0 && col < n &&
            maze[row][col] === 1 && solution[row][col] === 0);
    }

    function solve(row, col) {
        // Base case: reached destination
        if (row === n - 1 && col === n - 1) {
            solution[row][col] = 1;
            return true;
        }

        if (isSafe(row, col)) {
            solution[row][col] = 1; // Mark as part of path

            // Try all directions
            for (const [dr, dc] of directions) {
                if (solve(row + dr, col + dc)) {
                    return true;
                }
            }

            // Backtrack
            solution[row][col] = 0;
            return false;
        }

        return false;
    }

    if (solve(0, 0)) {
        return solution;
    }
    return null;
}

/**
 * Knight's Tour Problem
 * Find a sequence of moves for a knight to visit every square exactly once
 * Time: O(8^(n²)), Space: O(n²)
 */
function knightsTour(n, startRow = 0, startCol = 0) {
    const board = Array(n).fill().map(() => Array(n).fill(-1));

    // All 8 possible moves for a knight
    const moves = [
        [2, 1], [1, 2], [-1, 2], [-2, 1],
        [-2, -1], [-1, -2], [1, -2], [2, -1]
    ];

    function isValid(row, col) {
        return (row >= 0 && row < n && col >= 0 && col < n && board[row][col] === -1);
    }

    function getDegree(row, col) {
        // Count number of unvisited neighbors (Warnsdorff's heuristic)
        let count = 0;
        for (const [dr, dc] of moves) {
            const nr = row + dr;
            const nc = col + dc;
            if (isValid(nr, nc)) {
                count++;
            }
        }
        return count;
    }

    function solve(row, col, moveCount) {
        board[row][col] = moveCount;

        if (moveCount === n * n - 1) {
            return true;
        }

        // Get valid next moves sorted by degree (Warnsdorff's heuristic)
        const nextMoves = [];
        for (const [dr, dc] of moves) {
            const nr = row + dr;
            const nc = col + dc;
            if (isValid(nr, nc)) {
                const degree = getDegree(nr, nc);
                nextMoves.push([degree, nr, nc]);
            }
        }

        // Sort by degree (prefer moves with fewer options)
        nextMoves.sort((a, b) => a[0] - b[0]);

        // Try moves in order
        for (const [, nr, nc] of nextMoves) {
            if (solve(nr, nc, moveCount + 1)) {
                return true;
            }
        }

        // Backtrack
        board[row][col] = -1;
        return false;
    }

    if (solve(startRow, startCol, 0)) {
        return board;
    }
    return null;
}

// Example usage
if (require.main === module) {
    console.log("4-Queens solutions:", nQueens(4).length);

    console.log("Permutations of [1,2,3]:", generatePermutations([1, 2, 3]));

    console.log("Combinations C(4,2):", generateCombinations(4, 2));

    const board = [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E']
    ];
    console.log("Word 'ABCCED' exists:", wordSearch(board, "ABCCED"));

    // Rat in a Maze
    console.log("\n--- Rat in a Maze ---");
    const maze = [
        [1, 0, 0, 0],
        [1, 1, 0, 1],
        [0, 1, 0, 0],
        [1, 1, 1, 1]
    ];
    const path = ratInMaze(maze);
    if (path) {
        console.log("Path found:");
        path.forEach(row => console.log(row));
    } else {
        console.log("No path exists");
    }

    // Knight's Tour
    console.log("\n--- Knight's Tour (5x5) ---");
    const tour = knightsTour(5, 0, 0);
    if (tour) {
        console.log("Tour found:");
        tour.forEach(row => console.log(row));
    } else {
        console.log("No tour exists");
    }
}

module.exports = {
    nQueens,
    sudokuSolver,
    generatePermutations,
    generateCombinations,
    wordSearch,
    ratInMaze,
    knightsTour
};

