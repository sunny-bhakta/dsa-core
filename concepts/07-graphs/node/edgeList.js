/**
 * Edge List Graph Representation in Node.js
 */

class EdgeListGraph {
    /**
     * Graph using Edge List representation
     */
    constructor(directed = false) {
        this.edges = [];
        this.vertices = new Set();
        this.directed = directed;
    }

    /**
     * Add edge - O(1)
     */
    addEdge(u, v, weight = 1) {
        this.edges.push([u, v, weight]);
        this.vertices.add(u);
        this.vertices.add(v);

        if (!this.directed) {
            this.edges.push([v, u, weight]);
        }
    }

    /**
     * Remove edge - O(E)
     */
    removeEdge(u, v) {
        if (this.directed) {
            this.edges = this.edges.filter(([a, b]) => !(a === u && b === v));
        } else {
            this.edges = this.edges.filter(
                ([a, b]) => !((a === u && b === v) || (a === v && b === u))
            );
        }
    }

    /**
     * Get all edges - O(1)
     */
    getEdges() {
        return [...this.edges];
    }

    /**
     * Get all vertices - O(V)
     */
    getVertices() {
        return Array.from(this.vertices);
    }

    /**
     * Get neighbors of vertex - O(E)
     */
    getNeighbors(vertex) {
        const neighbors = [];
        for (const [u, v, weight] of this.edges) {
            if (u === vertex) {
                neighbors.push([v, weight]);
            }
        }
        return neighbors;
    }

    /**
     * Check if edge exists - O(E)
     */
    hasEdge(u, v) {
        return this.edges.some(([a, b]) => a === u && b === v);
    }

    /**
     * Get edge weight - O(E)
     */
    getEdgeWeight(u, v) {
        for (const [a, b, weight] of this.edges) {
            if (a === u && b === v) {
                return weight;
            }
        }
        return null;
    }

    /**
     * Convert to adjacency list - O(E)
     */
    toAdjacencyList() {
        const graph = {};
        for (const [u, v, weight] of this.edges) {
            if (!graph[u]) {
                graph[u] = [];
            }
            graph[u].push([v, weight]);
        }
        return graph;
    }

    /**
     * Convert to adjacency matrix - O(V² + E)
     */
    toAdjacencyMatrix(numVertices = null) {
        if (numVertices === null) {
            numVertices = this.vertices.size;
        }

        const matrix = Array(numVertices).fill().map(() => Array(numVertices).fill(0));
        const vertexMap = {};
        const sortedVertices = Array.from(this.vertices).sort((a, b) => a - b);
        sortedVertices.forEach((v, i) => {
            vertexMap[v] = i;
        });

        for (const [u, v, weight] of this.edges) {
            const i = vertexMap[u];
            const j = vertexMap[v];
            if (i !== undefined && j !== undefined) {
                matrix[i][j] = weight;
            }
        }

        return { matrix, vertexMap };
    }

    /**
     * Kruskal's MST using edge list (already sorted by weight)
     */
    kruskalMST() {
        // Sort edges by weight
        const sortedEdges = [...this.edges].sort((a, b) => a[2] - b[2]);

        class UnionFind {
            constructor(vertices) {
                this.parent = {};
                this.rank = {};
                for (const v of vertices) {
                    this.parent[v] = v;
                    this.rank[v] = 0;
                }
            }

            find(x) {
                if (this.parent[x] !== x) {
                    this.parent[x] = this.find(this.parent[x]);
                }
                return this.parent[x];
            }

            union(x, y) {
                const px = this.find(x);
                const py = this.find(y);
                if (px === py) {
                    return false;
                }

                if (this.rank[px] < this.rank[py]) {
                    [px, py] = [py, px];
                }

                this.parent[py] = px;
                if (this.rank[px] === this.rank[py]) {
                    this.rank[px]++;
                }
                return true;
            }
        }

        const uf = new UnionFind(this.vertices);
        const mst = [];

        for (const [u, v, weight] of sortedEdges) {
            if (uf.union(u, v)) {
                mst.push([u, v, weight]);
                if (mst.length === this.vertices.size - 1) {
                    break;
                }
            }
        }

        return mst;
    }
}

// Example usage
if (require.main === module) {
    // Undirected Graph
    console.log("--- Edge List Graph (Undirected) ---");
    const graph = new EdgeListGraph(false);
    graph.addEdge(0, 1, 4);
    graph.addEdge(0, 2, 1);
    graph.addEdge(1, 2, 2);
    graph.addEdge(1, 3, 5);
    graph.addEdge(2, 3, 8);

    console.log("Edges:", graph.getEdges());
    console.log("Vertices:", graph.getVertices());
    console.log("Neighbors of 1:", graph.getNeighbors(1));
    console.log("Has edge (0,1):", graph.hasEdge(0, 1));
    console.log("Weight of (0,1):", graph.getEdgeWeight(0, 1));

    // Convert to adjacency list
    console.log("\nAdjacency List:");
    const adjList = graph.toAdjacencyList();
    for (const [vertex, neighbors] of Object.entries(adjList)) {
        console.log(`${vertex}:`, neighbors);
    }

    // Kruskal's MST
    console.log("\nKruskal's MST:");
    const mst = graph.kruskalMST();
    console.log("MST Edges:", mst);
    console.log("Total Weight:", mst.reduce((sum, [, , w]) => sum + w, 0));

    // Directed Graph
    console.log("\n--- Edge List Graph (Directed) ---");
    const dgraph = new EdgeListGraph(true);
    dgraph.addEdge(0, 1, 1);
    dgraph.addEdge(1, 2, 2);
    dgraph.addEdge(2, 0, 3);
    console.log("Edges:", dgraph.getEdges());
}

module.exports = { EdgeListGraph };

