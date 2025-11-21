"""
Graph Algorithms in Python
"""

import heapq
from collections import defaultdict

def dijkstra(graph, start):
    """
    Dijkstra's Algorithm - Shortest path from source
    Time: O((V + E) log V), Space: O(V)
    Works for non-negative weights
    """
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    visited = set()
    
    while pq:
        current_dist, current = heapq.heappop(pq)
        
        if current in visited:
            continue
        
        visited.add(current)
        
        for neighbor, weight in graph.get(current, []):
            distance = current_dist + weight
            
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    
    return distances


def bellman_ford(graph, start, num_vertices):
    """
    Bellman-Ford Algorithm - Shortest path with negative weights
    Time: O(VE), Space: O(V)
    Detects negative cycles
    """
    distances = [float('inf')] * num_vertices
    distances[start] = 0
    
    # Relax edges V-1 times
    for _ in range(num_vertices - 1):
        for u in range(num_vertices):
            for v, weight in graph.get(u, []):
                if distances[u] != float('inf') and distances[u] + weight < distances[v]:
                    distances[v] = distances[u] + weight
    
    # Check for negative cycles
    for u in range(num_vertices):
        for v, weight in graph.get(u, []):
            if distances[u] != float('inf') and distances[u] + weight < distances[v]:
                return None  # Negative cycle detected
    
    return distances


def floyd_warshall(graph, num_vertices):
    """
    Floyd-Warshall Algorithm - All-pairs shortest path
    Time: O(V³), Space: O(V²)
    """
    dist = [[float('inf')] * num_vertices for _ in range(num_vertices)]
    
    # Initialize distances
    for i in range(num_vertices):
        dist[i][i] = 0
    
    for u in range(num_vertices):
        for v, weight in graph.get(u, []):
            dist[u][v] = weight
    
    # Floyd-Warshall algorithm
    for k in range(num_vertices):
        for i in range(num_vertices):
            for j in range(num_vertices):
                if dist[i][k] != float('inf') and dist[k][j] != float('inf'):
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
    
    return dist


def kruskal_mst(edges, num_vertices):
    """
    Kruskal's Algorithm - Minimum Spanning Tree
    Time: O(E log E), Space: O(V)
    """
    class UnionFind:
        def __init__(self, n):
            self.parent = list(range(n))
            self.rank = [0] * n
        
        def find(self, x):
            if self.parent[x] != x:
                self.parent[x] = self.find(self.parent[x])
            return self.parent[x]
        
        def union(self, x, y):
            px, py = self.find(x), self.find(y)
            if px == py:
                return False
            
            if self.rank[px] < self.rank[py]:
                px, py = py, px
            
            self.parent[py] = px
            if self.rank[px] == self.rank[py]:
                self.rank[px] += 1
            return True
    
    edges.sort(key=lambda x: x[2])  # Sort by weight
    uf = UnionFind(num_vertices)
    mst = []
    
    for u, v, weight in edges:
        if uf.union(u, v):
            mst.append((u, v, weight))
            if len(mst) == num_vertices - 1:
                break
    
    return mst


def prim_mst(graph, start):
    """
    Prim's Algorithm - Minimum Spanning Tree
    Time: O((V + E) log V), Space: O(V)
    """
    mst = []
    visited = {start}
    pq = []
    
    for neighbor, weight in graph.get(start, []):
        heapq.heappush(pq, (weight, start, neighbor))
    
    while pq and len(visited) < len(graph):
        weight, u, v = heapq.heappop(pq)
        
        if v in visited:
            continue
        
        visited.add(v)
        mst.append((u, v, weight))
        
        for neighbor, w in graph.get(v, []):
            if neighbor not in visited:
                heapq.heappush(pq, (w, v, neighbor))
    
    return mst


def kosaraju_scc(graph, num_vertices):
    """
    Kosaraju's Algorithm - Strongly Connected Components
    Time: O(V + E), Space: O(V)
    """
    visited = [False] * num_vertices
    stack = []
    
    # First DFS to fill stack
    def dfs1(v):
        visited[v] = True
        for u, _ in graph.get(v, []):
            if not visited[u]:
                dfs1(u)
        stack.append(v)
    
    for i in range(num_vertices):
        if not visited[i]:
            dfs1(i)
    
    # Reverse graph
    rev_graph = defaultdict(list)
    for u in range(num_vertices):
        for v, w in graph.get(u, []):
            rev_graph[v].append((u, w))
    
    # Second DFS on reversed graph
    visited = [False] * num_vertices
    scc = []
    
    def dfs2(v, component):
        visited[v] = True
        component.append(v)
        for u, _ in rev_graph.get(v, []):
            if not visited[u]:
                dfs2(u, component)
    
    while stack:
        v = stack.pop()
        if not visited[v]:
            component = []
            dfs2(v, component)
            scc.append(component)
    
    return scc


def is_bipartite(graph, num_vertices):
    """
    Check if graph is bipartite
    Time: O(V + E), Space: O(V)
    """
    color = [-1] * num_vertices
    
    def bfs(start):
        queue = [start]
        color[start] = 0
        
        while queue:
            u = queue.pop(0)
            for v, _ in graph.get(u, []):
                if color[v] == -1:
                    color[v] = 1 - color[u]
                    queue.append(v)
                elif color[v] == color[u]:
                    return False
        return True
    
    for i in range(num_vertices):
        if color[i] == -1:
            if not bfs(i):
                return False
    
    return True


# Example usage
if __name__ == "__main__":
    # Dijkstra
    graph = {
        0: [(1, 4), (2, 1)],
        1: [(3, 1)],
        2: [(1, 2), (3, 5)],
        3: []
    }
    print("Dijkstra from 0:", dijkstra(graph, 0))
    
    # Kruskal MST
    edges = [(0, 1, 10), (0, 2, 6), (0, 3, 5), (1, 3, 15), (2, 3, 4)]
    print("Kruskal MST:", kruskal_mst(edges, 4))
    
    # Prim MST
    graph_mst = {
        0: [(1, 10), (2, 6), (3, 5)],
        1: [(0, 10), (3, 15)],
        2: [(0, 6), (3, 4)],
        3: [(0, 5), (1, 15), (2, 4)]
    }
    print("Prim MST:", prim_mst(graph_mst, 0))
    
    # Bipartite check
    bipartite_graph = {
        0: [(1, 1), (3, 1)],
        1: [(0, 1), (2, 1)],
        2: [(1, 1), (3, 1)],
        3: [(0, 1), (2, 1)]
    }
    print("Is bipartite:", is_bipartite(bipartite_graph, 4))

