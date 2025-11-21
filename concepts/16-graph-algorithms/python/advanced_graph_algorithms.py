"""
Advanced Graph Algorithms in Python
"""

import heapq
from collections import defaultdict

def bellman_ford(graph, start, num_vertices):
    """
    Bellman-Ford Algorithm - Shortest path with negative weights
    Time: O(VE), Space: O(V)
    Detects negative cycles
    Returns None if negative cycle detected
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
    Works with negative weights (no negative cycles)
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


def a_star(graph, start, goal, heuristic):
    """
    A* Algorithm - Informed search algorithm
    Time: O(b^d) where b is branching factor, d is depth
    Space: O(b^d)
    Uses heuristic function for optimal path finding
    """
    open_set = [(0, start)]
    came_from = {}
    g_score = {start: 0}
    f_score = {start: heuristic(start, goal)}
    
    while open_set:
        current = heapq.heappop(open_set)[1]
        
        if current == goal:
            # Reconstruct path
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            path.append(start)
            return path[::-1]
        
        for neighbor, weight in graph.get(current, []):
            tentative_g_score = g_score[current] + weight
            
            if neighbor not in g_score or tentative_g_score < g_score[neighbor]:
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g_score
                f_score[neighbor] = tentative_g_score + heuristic(neighbor, goal)
                heapq.heappush(open_set, (f_score[neighbor], neighbor))
    
    return None  # No path found


def tarjan_scc(graph, num_vertices):
    """
    Tarjan's Algorithm - Strongly Connected Components
    Time: O(V + E), Space: O(V)
    """
    index = 0
    stack = []
    indices = [-1] * num_vertices
    lowlinks = [-1] * num_vertices
    on_stack = [False] * num_vertices
    scc_list = []
    
    def strong_connect(v):
        nonlocal index
        indices[v] = index
        lowlinks[v] = index
        index += 1
        stack.append(v)
        on_stack[v] = True
        
        for neighbor, _ in graph.get(v, []):
            if indices[neighbor] == -1:
                strong_connect(neighbor)
                lowlinks[v] = min(lowlinks[v], lowlinks[neighbor])
            elif on_stack[neighbor]:
                lowlinks[v] = min(lowlinks[v], indices[neighbor])
        
        if lowlinks[v] == indices[v]:
            component = []
            while True:
                w = stack.pop()
                on_stack[w] = False
                component.append(w)
                if w == v:
                    break
            scc_list.append(component)
    
    for v in range(num_vertices):
        if indices[v] == -1:
            strong_connect(v)
    
    return scc_list


def find_articulation_points(graph, num_vertices):
    """
    Find Articulation Points (Cut Vertices)
    Time: O(V + E), Space: O(V)
    """
    discovery = [-1] * num_vertices
    low = [-1] * num_vertices
    parent = [-1] * num_vertices
    ap = [False] * num_vertices
    time = [0]
    
    def dfs(u):
        children = 0
        discovery[u] = time[0]
        low[u] = time[0]
        time[0] += 1
        
        for v, _ in graph.get(u, []):
            if discovery[v] == -1:
                children += 1
                parent[v] = u
                dfs(v)
                low[u] = min(low[u], low[v])
                
                # Root with 2+ children is AP
                if parent[u] == -1 and children > 1:
                    ap[u] = True
                # Non-root with low[v] >= discovery[u] is AP
                if parent[u] != -1 and low[v] >= discovery[u]:
                    ap[u] = True
            elif v != parent[u]:
                low[u] = min(low[u], discovery[v])
    
    for i in range(num_vertices):
        if discovery[i] == -1:
            dfs(i)
    
    return [i for i in range(num_vertices) if ap[i]]


def find_bridges(graph, num_vertices):
    """
    Find Bridges (Cut Edges)
    Time: O(V + E), Space: O(V)
    """
    discovery = [-1] * num_vertices
    low = [-1] * num_vertices
    parent = [-1] * num_vertices
    bridges = []
    time = [0]
    
    def dfs(u):
        discovery[u] = time[0]
        low[u] = time[0]
        time[0] += 1
        
        for v, _ in graph.get(u, []):
            if discovery[v] == -1:
                parent[v] = u
                dfs(v)
                low[u] = min(low[u], low[v])
                
                # Edge (u, v) is bridge if low[v] > discovery[u]
                if low[v] > discovery[u]:
                    bridges.append((u, v))
            elif v != parent[u]:
                low[u] = min(low[u], discovery[v])
    
    for i in range(num_vertices):
        if discovery[i] == -1:
            dfs(i)
    
    return bridges


# Example usage
if __name__ == "__main__":
    # Bellman-Ford
    graph1 = {
        0: [(1, -1), (2, 4)],
        1: [(2, 3), (3, 2), (4, 2)],
        2: [],
        3: [(2, 5), (1, 1)],
        4: [(3, -3)]
    }
    print("Bellman-Ford from 0:", bellman_ford(graph1, 0, 5))
    
    # Floyd-Warshall
    graph2 = {
        0: [(1, 5), (2, 10)],
        1: [(2, 3)],
        2: [(3, 1)],
        3: []
    }
    print("\nFloyd-Warshall all-pairs shortest path:")
    result = floyd_warshall(graph2, 4)
    for i, row in enumerate(result):
        print(f"From {i}: {row}")
    
    # A* (simplified - needs heuristic function)
    graph3 = {
        0: [(1, 1), (2, 3)],
        1: [(3, 2)],
        2: [(3, 1)],
        3: []
    }
    def heuristic(node, goal):
        return abs(node - goal)  # Simple heuristic
    print("\nA* path from 0 to 3:", a_star(graph3, 0, 3, heuristic))
    
    # Tarjan's SCC
    graph4 = {
        0: [(1, 1)],
        1: [(2, 1)],
        2: [(0, 1), (3, 1)],
        3: [(4, 1)],
        4: [(3, 1)]
    }
    print("\nTarjan's SCC:", tarjan_scc(graph4, 5))
    
    # Articulation Points
    graph5 = {
        0: [(1, 1), (2, 1)],
        1: [(0, 1), (2, 1)],
        2: [(0, 1), (1, 1), (3, 1)],
        3: [(2, 1)]
    }
    print("\nArticulation Points:", find_articulation_points(graph5, 4))
    
    # Bridges
    print("Bridges:", find_bridges(graph5, 4))

