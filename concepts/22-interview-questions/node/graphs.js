/**
 * Interview Questions: Graphs
 * Common interview questions with detailed solutions
 */

// ========== QUESTION 1: Number of Islands ==========
/**
 * Problem: Given a 2D grid of '1's (land) and '0's (water), count islands.
 * 
 * Example:
 * Input: grid = [
 *   ["1","1","1","1","0"],
 *   ["1","1","0","1","0"],
 *   ["1","1","0","0","0"],
 *   ["0","0","0","0","0"]
 * ]
 * Output: 1
 * 
 * Approach: DFS to mark all connected land
 * Time: O(m * n), Space: O(m * n)
 */
function numIslands(grid) {
    if (!grid || grid.length === 0) {
        return 0;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    function dfs(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== '1') {
            return;
        }

        grid[r][c] = '0'; // Mark as visited
        // Explore all 4 directions
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(i, j);
            }
        }
    }

    return count;
}

// ========== QUESTION 2: Clone Graph ==========
/**
 * Problem: Clone a connected undirected graph.
 * 
 * Example:
 * Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
 * Output: [[2,4],[1,3],[2,4],[1,3]]
 * 
 * Approach: DFS with hash map to track cloned nodes
 * Time: O(V + E), Space: O(V)
 */
class Node {
    constructor(val = 0, neighbors = []) {
        this.val = val;
        this.neighbors = neighbors;
    }
}

function cloneGraph(node) {
    if (!node) {
        return null;
    }

    const cloned = new Map();

    function dfs(original) {
        if (cloned.has(original)) {
            return cloned.get(original);
        }

        const clone = new Node(original.val);
        cloned.set(original, clone);

        for (const neighbor of original.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }

        return clone;
    }

    return dfs(node);
}

// ========== QUESTION 3: Course Schedule ==========
/**
 * Problem: Determine if you can finish all courses given prerequisites.
 * 
 * Example:
 * Input: numCourses = 2, prerequisites = [[1,0]]
 * Output: true
 * 
 * Approach: Detect cycle using DFS
 * Time: O(V + E), Space: O(V + E)
 */
function canFinish(numCourses, prerequisites) {
    // Build adjacency list
    const graph = Array(numCourses).fill().map(() => []);
    for (const [course, prereq] of prerequisites) {
        graph[prereq].push(course);
    }

    // 0: unvisited, 1: visiting, 2: visited
    const state = new Array(numCourses).fill(0);

    function hasCycle(course) {
        if (state[course] === 1) { // Cycle detected
            return true;
        }
        if (state[course] === 2) { // Already processed
            return false;
        }

        state[course] = 1; // Mark as visiting
        for (const nextCourse of graph[course]) {
            if (hasCycle(nextCourse)) {
                return true;
            }
        }
        state[course] = 2; // Mark as visited
        return false;
    }

    for (let course = 0; course < numCourses; course++) {
        if (hasCycle(course)) {
            return false;
        }
    }

    return true;
}

// ========== QUESTION 4: Word Ladder ==========
/**
 * Problem: Find shortest transformation sequence from beginWord to endWord.
 * 
 * Example:
 * Input: beginWord = "hit", endWord = "cog", 
 *        wordList = ["hot","dot","dog","lot","log","cog"]
 * Output: 5
 * 
 * Approach: BFS to find shortest path
 * Time: O(M * N) where M is word length, N is word list size, Space: O(N)
 */
function ladderLength(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) {
        return 0;
    }

    const queue = [[beginWord, 1]];
    const visited = new Set([beginWord]);

    while (queue.length > 0) {
        const [word, length] = queue.shift();

        if (word === endWord) {
            return length;
        }

        // Try changing each character
        for (let i = 0; i < word.length; i++) {
            for (let c = 0; c < 26; c++) {
                const newWord = word.slice(0, i) + String.fromCharCode(97 + c) + word.slice(i + 1);
                if (wordSet.has(newWord) && !visited.has(newWord)) {
                    visited.add(newWord);
                    queue.push([newWord, length + 1]);
                }
            }
        }
    }

    return 0;
}

// Example usage
if (require.main === module) {
    console.log("=== GRAPHS INTERVIEW QUESTIONS ===\n");

    // Number of Islands
    console.log("1. Number of Islands:");
    const grid = [
        ['1', '1', '1', '1', '0'],
        ['1', '1', '0', '1', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '0', '0', '0']
    ];
    // Create a copy since function modifies grid
    const gridCopy = grid.map(row => [...row]);
    console.log(`   Input: ${grid.length}x${grid[0].length} grid`);
    console.log(`   Output: ${numIslands(gridCopy)}`);

    // Course Schedule
    console.log("\n2. Course Schedule:");
    console.log("   Input: numCourses=2, prerequisites=[[1,0]]");
    console.log(`   Output: ${canFinish(2, [[1, 0]])}`);

    // Word Ladder
    console.log("\n3. Word Ladder:");
    const wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'];
    console.log("   Input: beginWord='hit', endWord='cog'");
    console.log(`   Output: ${ladderLength('hit', 'cog', wordList)}`);
}

module.exports = {
    numIslands,
    Node,
    cloneGraph,
    canFinish,
    ladderLength
};

