/**
 * Graph Implementation in Node.js
 */

class Graph {
    /**
     * Graph using Adjacency List
     */
    constructor(directed = false) {
        this.graph = new Map();
        this.directed = directed;
    }

    /**
     * Add edge - O(1)
     */
    addEdge(u, v, weight = 1) {
        if (!this.graph.has(u)) {
            this.graph.set(u, []);
        }
        this.graph.get(u).push([v, weight]);

        if (!this.directed) {
            if (!this.graph.has(v)) {
                this.graph.set(v, []);
            }
            this.graph.get(v).push([u, weight]);
        }
    }

    /**
     * Add vertex - O(1)
     */
    addVertex(v) {
        if (!this.graph.has(v)) {
            this.graph.set(v, []);
        }
    }

    /**
     * Breadth-First Search - O(V + E)
     */
    bfs(start) {
        const visited = new Set();
        const queue = [start];
        visited.add(start);
        const result = [];

        while (queue.length > 0) {
            const node = queue.shift();
            result.push(node);

            const neighbors = this.graph.get(node) || [];
            for (const [neighbor] of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }

        return result;
    }

    /**
     * Depth-First Search - O(V + E)
     */
    dfs(start) {
        const visited = new Set();
        const result = [];

        const dfsUtil = (node) => {
            visited.add(node);
            result.push(node);

            const neighbors = this.graph.get(node) || [];
            for (const [neighbor] of neighbors) {
                if (!visited.has(neighbor)) {
                    dfsUtil(neighbor);
                }
            }
        };

        dfsUtil(start);
        return result;
    }

    /**
     * DFS Iterative - O(V + E)
     */
    dfsIterative(start) {
        const visited = new Set();
        const stack = [start];
        const result = [];

        while (stack.length > 0) {
            const node = stack.pop();
            if (!visited.has(node)) {
                visited.add(node);
                result.push(node);

                const neighbors = this.graph.get(node) || [];
                for (const [neighbor] of neighbors.reverse()) {
                    if (!visited.has(neighbor)) {
                        stack.push(neighbor);
                    }
                }
            }
        }

        return result;
    }

    /**
     * Detect cycle in graph - O(V + E)
     */
    hasCycle() {
        if (this.directed) {
            return this._hasCycleDirected();
        }
        return this._hasCycleUndirected();
    }

    _hasCycleUndirected() {
        const visited = new Set();

        const dfs = (node, parent) => {
            visited.add(node);
            const neighbors = this.graph.get(node) || [];
            for (const [neighbor] of neighbors) {
                if (!visited.has(neighbor)) {
                    if (dfs(neighbor, node)) {
                        return true;
                    }
                } else if (neighbor !== parent) {
                    return true;
                }
            }
            return false;
        };

        for (const node of this.graph.keys()) {
            if (!visited.has(node)) {
                if (dfs(node, -1)) {
                    return true;
                }
            }
        }
        return false;
    }

    _hasCycleDirected() {
        const WHITE = 0, GRAY = 1, BLACK = 2;
        const color = new Map();

        for (const node of this.graph.keys()) {
            color.set(node, WHITE);
        }

        const dfs = (node) => {
            color.set(node, GRAY);
            const neighbors = this.graph.get(node) || [];
            for (const [neighbor] of neighbors) {
                if (color.get(neighbor) === GRAY) {
                    return true;
                }
                if (color.get(neighbor) === WHITE && dfs(neighbor)) {
                    return true;
                }
            }
            color.set(node, BLACK);
            return false;
        };

        for (const node of this.graph.keys()) {
            if (color.get(node) === WHITE) {
                if (dfs(node)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Topological sort (for DAG) - O(V + E)
     */
    topologicalSort() {
        if (!this.directed) {
            return null;
        }

        const inDegree = new Map();
        for (const node of this.graph.keys()) {
            inDegree.set(node, 0);
        }

        for (const [node, neighbors] of this.graph.entries()) {
            for (const [neighbor] of neighbors) {
                inDegree.set(neighbor, (inDegree.get(neighbor) || 0) + 1);
            }
        }

        const queue = [];
        for (const [node, degree] of inDegree.entries()) {
            if (degree === 0) {
                queue.push(node);
            }
        }

        const result = [];
        while (queue.length > 0) {
            const node = queue.shift();
            result.push(node);

            const neighbors = this.graph.get(node) || [];
            for (const [neighbor] of neighbors) {
                inDegree.set(neighbor, inDegree.get(neighbor) - 1);
                if (inDegree.get(neighbor) === 0) {
                    queue.push(neighbor);
                }
            }
        }

        return result.length === this.graph.size ? result : null;
    }
}

class GraphMatrix {
    /**
     * Graph using Adjacency Matrix
     */
    constructor(numVertices, directed = false) {
        this.numVertices = numVertices;
        this.matrix = Array(numVertices).fill().map(() => Array(numVertices).fill(0));
        this.directed = directed;
    }

    addEdge(u, v, weight = 1) {
        this.matrix[u][v] = weight;
        if (!this.directed) {
            this.matrix[v][u] = weight;
        }
    }

    removeEdge(u, v) {
        this.matrix[u][v] = 0;
        if (!this.directed) {
            this.matrix[v][u] = 0;
        }
    }

    hasEdge(u, v) {
        return this.matrix[u][v] !== 0;
    }

    getNeighbors(u) {
        const neighbors = [];
        for (let v = 0; v < this.numVertices; v++) {
            if (this.matrix[u][v] !== 0) {
                neighbors.push([v, this.matrix[u][v]]);
            }
        }
        return neighbors;
    }
}

// Example usage
if (require.main === module) {
    // Adjacency List Graph
    console.log("--- Adjacency List Graph ---");
    const g = new Graph(false);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 3);
    g.addEdge(2, 4);

    console.log("BFS from 0:", g.bfs(0));
    console.log("DFS from 0:", g.dfs(0));
    console.log("Has cycle:", g.hasCycle());

    // Directed Graph
    console.log("\n--- Directed Graph (Topological Sort) ---");
    const dg = new Graph(true);
    dg.addEdge(5, 2);
    dg.addEdge(5, 0);
    dg.addEdge(4, 0);
    dg.addEdge(4, 1);
    dg.addEdge(2, 3);
    dg.addEdge(3, 1);

    console.log("Topological sort:", dg.topologicalSort());

    // Adjacency Matrix
    console.log("\n--- Adjacency Matrix Graph ---");
    const gm = new GraphMatrix(5, false);
    gm.addEdge(0, 1, 1);
    gm.addEdge(0, 2, 1);
    gm.addEdge(1, 3, 1);
    console.log("Has edge (0,1):", gm.hasEdge(0, 1));
    console.log("Neighbors of 0:", gm.getNeighbors(0));
}

module.exports = { Graph, GraphMatrix };

