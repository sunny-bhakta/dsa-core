/**
 * Graph Algorithms in Node.js
 */

/**
 * Dijkstra's Algorithm - Shortest path from source
 * Time: O((V + E) log V), Space: O(V)
 * Works for non-negative weights
 */
function dijkstra(graph, start) {
    const distances = {};
    const pq = [];
    const visited = new Set();

    // Initialize distances
    for (const node in graph) {
        distances[node] = Infinity;
    }
    distances[start] = 0;

    pq.push([0, start]);

    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);
        const [currentDist, current] = pq.shift();

        if (visited.has(current)) {
            continue;
        }

        visited.add(current);

        for (const [neighbor, weight] of graph[current] || []) {
            const distance = currentDist + weight;

            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                pq.push([distance, neighbor]);
            }
        }
    }

    return distances;
}

/**
 * Kruskal's Algorithm - Minimum Spanning Tree
 * Time: O(E log E), Space: O(V)
 */
function kruskalMST(edges, numVertices) {
    class UnionFind {
        constructor(n) {
            this.parent = Array.from({ length: n }, (_, i) => i);
            this.rank = new Array(n).fill(0);
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

    edges.sort((a, b) => a[2] - b[2]);
    const uf = new UnionFind(numVertices);
    const mst = [];

    for (const [u, v, weight] of edges) {
        if (uf.union(u, v)) {
            mst.push([u, v, weight]);
            if (mst.length === numVertices - 1) {
                break;
            }
        }
    }

    return mst;
}

/**
 * Prim's Algorithm - Minimum Spanning Tree
 * Time: O((V + E) log V), Space: O(V)
 */
function primMST(graph, start) {
    const mst = [];
    const visited = new Set([start]);
    const pq = [];

    for (const [neighbor, weight] of graph[start] || []) {
        pq.push([weight, start, neighbor]);
    }
    pq.sort((a, b) => a[0] - b[0]);

    while (pq.length > 0 && visited.size < Object.keys(graph).length) {
        pq.sort((a, b) => a[0] - b[0]);
        const [weight, u, v] = pq.shift();

        if (visited.has(v)) {
            continue;
        }

        visited.add(v);
        mst.push([u, v, weight]);

        for (const [neighbor, w] of graph[v] || []) {
            if (!visited.has(neighbor)) {
                pq.push([w, v, neighbor]);
            }
        }
    }

    return mst;
}

/**
 * Check if graph is bipartite
 * Time: O(V + E), Space: O(V)
 */
function isBipartite(graph, numVertices) {
    const color = new Array(numVertices).fill(-1);

    function bfs(start) {
        const queue = [start];
        color[start] = 0;

        while (queue.length > 0) {
            const u = queue.shift();
            for (const [v] of graph[u] || []) {
                if (color[v] === -1) {
                    color[v] = 1 - color[u];
                    queue.push(v);
                } else if (color[v] === color[u]) {
                    return false;
                }
            }
        }
        return true;
    }

    for (let i = 0; i < numVertices; i++) {
        if (color[i] === -1) {
            if (!bfs(i)) {
                return false;
            }
        }
    }

    return true;
}

// Example usage
if (require.main === module) {
    const graph = {
        0: [[1, 4], [2, 1]],
        1: [[3, 1]],
        2: [[1, 2], [3, 5]],
        3: []
    };
    console.log("Dijkstra from 0:", dijkstra(graph, 0));

    const edges = [[0, 1, 10], [0, 2, 6], [0, 3, 5], [1, 3, 15], [2, 3, 4]];
    console.log("Kruskal MST:", kruskalMST(edges, 4));

    const graphMST = {
        0: [[1, 10], [2, 6], [3, 5]],
        1: [[0, 10], [3, 15]],
        2: [[0, 6], [3, 4]],
        3: [[0, 5], [1, 15], [2, 4]]
    };
    console.log("Prim MST:", primMST(graphMST, 0));

    const bipartiteGraph = {
        0: [[1, 1], [3, 1]],
        1: [[0, 1], [2, 1]],
        2: [[1, 1], [3, 1]],
        3: [[0, 1], [2, 1]]
    };
    console.log("Is bipartite:", isBipartite(bipartiteGraph, 4));
}

module.exports = {
    dijkstra,
    kruskalMST,
    primMST,
    isBipartite
};

