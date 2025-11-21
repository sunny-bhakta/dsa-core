"""
Interview Questions: Graphs
Common interview questions with detailed solutions
"""

# ========== QUESTION 1: Number of Islands ==========
"""
Problem: Given a 2D grid of '1's (land) and '0's (water), count islands.

Example:
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

Approach: DFS to mark all connected land
Time: O(m * n), Space: O(m * n)
"""
def num_islands(grid):
    """
    Number of Islands
    """
    if not grid:
        return 0
    
    rows, cols = len(grid), len(grid[0])
    count = 0
    
    def dfs(r, c):
        if (r < 0 or r >= rows or c < 0 or c >= cols or 
            grid[r][c] != '1'):
            return
        
        grid[r][c] = '0'  # Mark as visited
        # Explore all 4 directions
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    
    for i in range(rows):
        for j in range(cols):
            if grid[i][j] == '1':
                count += 1
                dfs(i, j)
    
    return count


# ========== QUESTION 2: Clone Graph ==========
"""
Problem: Clone a connected undirected graph.

Example:
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]

Approach: DFS with hash map to track cloned nodes
Time: O(V + E), Space: O(V)
"""
class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []


def clone_graph(node):
    """
    Clone Graph
    """
    if not node:
        return None
    
    cloned = {}
    
    def dfs(original):
        if original in cloned:
            return cloned[original]
        
        clone = Node(original.val)
        cloned[original] = clone
        
        for neighbor in original.neighbors:
            clone.neighbors.append(dfs(neighbor))
        
        return clone
    
    return dfs(node)


# ========== QUESTION 3: Course Schedule ==========
"""
Problem: Determine if you can finish all courses given prerequisites.

Example:
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: Take course 0 then course 1.

Approach: Detect cycle using DFS
Time: O(V + E), Space: O(V + E)
"""
def can_finish(num_courses, prerequisites):
    """
    Course Schedule - Can finish all courses?
    """
    # Build adjacency list
    graph = [[] for _ in range(num_courses)]
    for course, prereq in prerequisites:
        graph[prereq].append(course)
    
    # 0: unvisited, 1: visiting, 2: visited
    state = [0] * num_courses
    
    def has_cycle(course):
        if state[course] == 1:  # Cycle detected
            return True
        if state[course] == 2:  # Already processed
            return False
        
        state[course] = 1  # Mark as visiting
        for next_course in graph[course]:
            if has_cycle(next_course):
                return True
        state[course] = 2  # Mark as visited
        return False
    
    for course in range(num_courses):
        if has_cycle(course):
            return False
    
    return True


# ========== QUESTION 4: Word Ladder ==========
"""
Problem: Find shortest transformation sequence from beginWord to endWord.

Example:
Input: beginWord = "hit", endWord = "cog", 
       wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: hit -> hot -> dot -> dog -> cog

Approach: BFS to find shortest path
Time: O(M * N) where M is word length, N is word list size, Space: O(N)
"""
def ladder_length(begin_word, end_word, word_list):
    """
    Word Ladder - Shortest transformation sequence
    """
    from collections import deque
    
    word_set = set(word_list)
    if end_word not in word_set:
        return 0
    
    queue = deque([(begin_word, 1)])
    visited = {begin_word}
    
    while queue:
        word, length = queue.popleft()
        
        if word == end_word:
            return length
        
        # Try changing each character
        for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                new_word = word[:i] + c + word[i+1:]
                if new_word in word_set and new_word not in visited:
                    visited.add(new_word)
                    queue.append((new_word, length + 1))
    
    return 0


# Example usage
if __name__ == "__main__":
    print("=== GRAPHS INTERVIEW QUESTIONS ===\n")
    
    # Number of Islands
    print("1. Number of Islands:")
    grid = [
        ["1","1","1","1","0"],
        ["1","1","0","1","0"],
        ["1","1","0","0","0"],
        ["0","0","0","0","0"]
    ]
    # Create a copy since function modifies grid
    grid_copy = [row[:] for row in grid]
    print(f"   Input: {len(grid)}x{len(grid[0])} grid")
    print(f"   Output: {num_islands(grid_copy)}")
    
    # Course Schedule
    print("\n2. Course Schedule:")
    print(f"   Input: numCourses=2, prerequisites=[[1,0]]")
    print(f"   Output: {can_finish(2, [[1,0]])}")
    
    # Word Ladder
    print("\n3. Word Ladder:")
    word_list = ["hot","dot","dog","lot","log","cog"]
    print(f"   Input: beginWord='hit', endWord='cog'")
    print(f"   Output: {ladder_length('hit', 'cog', word_list)}")

