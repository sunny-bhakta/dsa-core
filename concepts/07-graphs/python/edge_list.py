"""
Edge List Graph Representation in Python
"""

class EdgeListGraph:
    """Graph using Edge List representation"""
    
    def __init__(self, directed=False):
        self.edges = []
        self.vertices = set()
        self.directed = directed
    
    def add_edge(self, u, v, weight=1):
        """Add edge - O(1)"""
        self.edges.append((u, v, weight))
        self.vertices.add(u)
        self.vertices.add(v)
        
        if not self.directed:
            self.edges.append((v, u, weight))
    
    def remove_edge(self, u, v):
        """Remove edge - O(E)"""
        if self.directed:
            self.edges = [(a, b, w) for a, b, w in self.edges if not (a == u and b == v)]
        else:
            self.edges = [(a, b, w) for a, b, w in self.edges 
                         if not ((a == u and b == v) or (a == v and b == u))]
    
    def get_edges(self):
        """Get all edges - O(1)"""
        return self.edges.copy()
    
    def get_vertices(self):
        """Get all vertices - O(V)"""
        return list(self.vertices)
    
    def get_neighbors(self, vertex):
        """Get neighbors of vertex - O(E)"""
        neighbors = []
        for u, v, weight in self.edges:
            if u == vertex:
                neighbors.append((v, weight))
        return neighbors
    
    def has_edge(self, u, v):
        """Check if edge exists - O(E)"""
        for a, b, _ in self.edges:
            if a == u and b == v:
                return True
        return False
    
    def get_edge_weight(self, u, v):
        """Get edge weight - O(E)"""
        for a, b, weight in self.edges:
            if a == u and b == v:
                return weight
        return None
    
    def to_adjacency_list(self):
        """Convert to adjacency list - O(E)"""
        graph = {}
        for u, v, weight in self.edges:
            if u not in graph:
                graph[u] = []
            graph[u].append((v, weight))
        return graph
    
    def to_adjacency_matrix(self, num_vertices=None):
        """Convert to adjacency matrix - O(V² + E)"""
        if num_vertices is None:
            num_vertices = len(self.vertices)
        
        matrix = [[0] * num_vertices for _ in range(num_vertices)]
        vertex_map = {v: i for i, v in enumerate(sorted(self.vertices))}
        
        for u, v, weight in self.edges:
            i = vertex_map.get(u)
            j = vertex_map.get(v)
            if i is not None and j is not None:
                matrix[i][j] = weight
        
        return matrix, vertex_map
    
    def kruskal_mst(self):
        """Kruskal's MST using edge list (already sorted by weight)"""
        # Sort edges by weight
        sorted_edges = sorted(self.edges, key=lambda x: x[2])
        
        class UnionFind:
            def __init__(self, vertices):
                self.parent = {v: v for v in vertices}
                self.rank = {v: 0 for v in vertices}
            
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
        
        uf = UnionFind(self.vertices)
        mst = []
        
        for u, v, weight in sorted_edges:
            if uf.union(u, v):
                mst.append((u, v, weight))
                if len(mst) == len(self.vertices) - 1:
                    break
        
        return mst


# Example usage
if __name__ == "__main__":
    # Undirected Graph
    print("--- Edge List Graph (Undirected) ---")
    graph = EdgeListGraph(directed=False)
    graph.add_edge(0, 1, 4)
    graph.add_edge(0, 2, 1)
    graph.add_edge(1, 2, 2)
    graph.add_edge(1, 3, 5)
    graph.add_edge(2, 3, 8)
    
    print("Edges:", graph.get_edges())
    print("Vertices:", graph.get_vertices())
    print("Neighbors of 1:", graph.get_neighbors(1))
    print("Has edge (0,1):", graph.has_edge(0, 1))
    print("Weight of (0,1):", graph.get_edge_weight(0, 1))
    
    # Convert to adjacency list
    print("\nAdjacency List:")
    adj_list = graph.to_adjacency_list()
    for vertex, neighbors in adj_list.items():
        print(f"{vertex}: {neighbors}")
    
    # Kruskal's MST
    print("\nKruskal's MST:")
    mst = graph.kruskal_mst()
    print("MST Edges:", mst)
    print("Total Weight:", sum(weight for _, _, weight in mst))
    
    # Directed Graph
    print("\n--- Edge List Graph (Directed) ---")
    dgraph = EdgeListGraph(directed=True)
    dgraph.add_edge(0, 1, 1)
    dgraph.add_edge(1, 2, 2)
    dgraph.add_edge(2, 0, 3)
    print("Edges:", dgraph.get_edges())

