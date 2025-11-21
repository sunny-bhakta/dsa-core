"""
Graph Implementation in Python
"""

from collections import defaultdict, deque

class Graph:
    """Graph using Adjacency List"""
    
    def __init__(self, directed=False):
        self.graph = defaultdict(list)
        self.directed = directed
    
    def add_edge(self, u, v, weight=1):
        """Add edge - O(1)"""
        self.graph[u].append((v, weight))
        if not self.directed:
            self.graph[v].append((u, weight))
    
    def add_vertex(self, v):
        """Add vertex - O(1)"""
        if v not in self.graph:
            self.graph[v] = []
    
    def bfs(self, start):
        """Breadth-First Search - O(V + E)"""
        visited = set()
        queue = deque([start])
        visited.add(start)
        result = []
        
        while queue:
            node = queue.popleft()
            result.append(node)
            
            for neighbor, _ in self.graph[node]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        
        return result
    
    def dfs(self, start):
        """Depth-First Search - O(V + E)"""
        visited = set()
        result = []
        
        def dfs_util(node):
            visited.add(node)
            result.append(node)
            
            for neighbor, _ in self.graph[node]:
                if neighbor not in visited:
                    dfs_util(neighbor)
        
        dfs_util(start)
        return result
    
    def dfs_iterative(self, start):
        """DFS Iterative - O(V + E)"""
        visited = set()
        stack = [start]
        result = []
        
        while stack:
            node = stack.pop()
            if node not in visited:
                visited.add(node)
                result.append(node)
                
                for neighbor, _ in reversed(self.graph[node]):
                    if neighbor not in visited:
                        stack.append(neighbor)
        
        return result
    
    def has_cycle(self):
        """Detect cycle in undirected graph - O(V + E)"""
        if self.directed:
            return self._has_cycle_directed()
        return self._has_cycle_undirected()
    
    def _has_cycle_undirected(self):
        visited = set()
        
        def dfs(node, parent):
            visited.add(node)
            for neighbor, _ in self.graph[node]:
                if neighbor not in visited:
                    if dfs(neighbor, node):
                        return True
                elif neighbor != parent:
                    return True
            return False
        
        for node in self.graph:
            if node not in visited:
                if dfs(node, -1):
                    return True
        return False
    
    def _has_cycle_directed(self):
        WHITE, GRAY, BLACK = 0, 1, 2
        color = defaultdict(lambda: WHITE)
        
        def dfs(node):
            color[node] = GRAY
            for neighbor, _ in self.graph[node]:
                if color[neighbor] == GRAY:
                    return True
                if color[neighbor] == WHITE and dfs(neighbor):
                    return True
            color[node] = BLACK
            return False
        
        for node in self.graph:
            if color[node] == WHITE:
                if dfs(node):
                    return True
        return False
    
    def topological_sort(self):
        """Topological sort (for DAG) - O(V + E)"""
        if not self.directed:
            return None
        
        in_degree = defaultdict(int)
        for node in self.graph:
            in_degree[node] = 0
        
        for node in self.graph:
            for neighbor, _ in self.graph[node]:
                in_degree[neighbor] += 1
        
        queue = deque([node for node in in_degree if in_degree[node] == 0])
        result = []
        
        while queue:
            node = queue.popleft()
            result.append(node)
            
            for neighbor, _ in self.graph[node]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)
        
        return result if len(result) == len(self.graph) else None


class GraphMatrix:
    """Graph using Adjacency Matrix"""
    
    def __init__(self, num_vertices, directed=False):
        self.num_vertices = num_vertices
        self.matrix = [[0] * num_vertices for _ in range(num_vertices)]
        self.directed = directed
    
    def add_edge(self, u, v, weight=1):
        """Add edge - O(1)"""
        self.matrix[u][v] = weight
        if not self.directed:
            self.matrix[v][u] = weight
    
    def remove_edge(self, u, v):
        """Remove edge - O(1)"""
        self.matrix[u][v] = 0
        if not self.directed:
            self.matrix[v][u] = 0
    
    def has_edge(self, u, v):
        """Check if edge exists - O(1)"""
        return self.matrix[u][v] != 0
    
    def get_neighbors(self, u):
        """Get neighbors - O(V)"""
        neighbors = []
        for v in range(self.num_vertices):
            if self.matrix[u][v] != 0:
                neighbors.append((v, self.matrix[u][v]))
        return neighbors


# Example usage
if __name__ == "__main__":
    # Adjacency List Graph
    print("--- Adjacency List Graph ---")
    g = Graph(directed=False)
    g.add_edge(0, 1)
    g.add_edge(0, 2)
    g.add_edge(1, 3)
    g.add_edge(2, 4)
    
    print("BFS from 0:", g.bfs(0))
    print("DFS from 0:", g.dfs(0))
    print("Has cycle:", g.has_cycle())
    
    # Directed Graph
    print("\n--- Directed Graph (Topological Sort) ---")
    dg = Graph(directed=True)
    dg.add_edge(5, 2)
    dg.add_edge(5, 0)
    dg.add_edge(4, 0)
    dg.add_edge(4, 1)
    dg.add_edge(2, 3)
    dg.add_edge(3, 1)
    
    print("Topological sort:", dg.topological_sort())
    
    # Adjacency Matrix
    print("\n--- Adjacency Matrix Graph ---")
    gm = GraphMatrix(5, directed=False)
    gm.add_edge(0, 1, 1)
    gm.add_edge(0, 2, 1)
    gm.add_edge(1, 3, 1)
    print("Has edge (0,1):", gm.has_edge(0, 1))
    print("Neighbors of 0:", gm.get_neighbors(0))

