/**
 * Advanced Graph Algorithms in Node.js
 */

/**
 * Bellman-Ford Algorithm - Shortest path with negative weights
 * Time: O(VE), Space: O(V)
 * Detects negative cycles
 */
function bellmanFord(graph, start, numVertices) {
    const distances = new Array(numVertices).fill(Infinity);
    distances[start] = 0;

    // Relax edges V-1 times
    for (let i = 0; i < numVertices - 1; i++) {
        for (let u = 0; u < numVertices; u++) {
            for (const [v, weight] of graph[u] || []) {
                if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
                    distances[v] = distances[u] + weight;
                }
            }
        }
    }

    // Check for negative cycles
    for (let u = 0; u < numVertices; u++) {
        for (const [v, weight] of graph[u] || []) {
            if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
                return null; // Negative cycle detected
            }
        }
    }

    return distances;
}

/**
 * Floyd-Warshall Algorithm - All-pairs shortest path
 * Time: O(V³), Space: O(V²)
 */
function floydWarshall(graph, numVertices) {
    const dist = Array(numVertices).fill().map(() => Array(numVertices).fill(Infinity));

    // Initialize distances
    for (let i = 0; i < numVertices; i++) {
        dist[i][i] = 0;
    }

    for (let u = 0; u < numVertices; u++) {
        for (const [v, weight] of graph[u] || []) {
            dist[u][v] = weight;
        }
    }

    // Floyd-Warshall algorithm
    for (let k = 0; k < numVertices; k++) {
        for (let i = 0; i < numVertices; i++) {
            for (let j = 0; j < numVertices; j++) {
                if (dist[i][k] !== Infinity && dist[k][j] !== Infinity) {
                    dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }

    return dist;
}

/**
 * A* Algorithm - Informed search algorithm
 * Time: O(b^d) where b is branching factor, d is depth
 * Space: O(b^d)
 */
function aStar(graph, start, goal, heuristic) {
    const openSet = [[0, start]];
    const cameFrom = new Map();
    const gScore = new Map([[start, 0]]);
    const fScore = new Map([[start, heuristic(start, goal)]]);

    while (openSet.length > 0) {
        openSet.sort((a, b) => a[0] - b[0]);
        const current = openSet.shift()[1];

        if (current === goal) {
            // Reconstruct path
            const path = [];
            let node = current;
            while (node !== undefined) {
                path.push(node);
                node = cameFrom.get(node);
            }
            return path.reverse();
        }

        for (const [neighbor, weight] of graph[current] || []) {
            const tentativeGScore = gScore.get(current) + weight;

            if (!gScore.has(neighbor) || tentativeGScore < gScore.get(neighbor)) {
                cameFrom.set(neighbor, current);
                gScore.set(neighbor, tentativeGScore);
                fScore.set(neighbor, tentativeGScore + heuristic(neighbor, goal));
                openSet.push([fScore.get(neighbor), neighbor]);
            }
        }
    }

    return null; // No path found
}

/**
 * Tarjan's Algorithm - Strongly Connected Components
 * Time: O(V + E), Space: O(V)
 */
function tarjanSCC(graph, numVertices) {
    let index = 0;
    const stack = [];
    const indices = new Array(numVertices).fill(-1);
    const lowlinks = new Array(numVertices).fill(-1);
    const onStack = new Array(numVertices).fill(false);
    const sccList = [];

    function strongConnect(v) {
        indices[v] = index;
        lowlinks[v] = index;
        index++;
        stack.push(v);
        onStack[v] = true;

        for (const [neighbor] of graph[v] || []) {
            if (indices[neighbor] === -1) {
                strongConnect(neighbor);
                lowlinks[v] = Math.min(lowlinks[v], lowlinks[neighbor]);
            } else if (onStack[neighbor]) {
                lowlinks[v] = Math.min(lowlinks[v], indices[neighbor]);
            }
        }

        if (lowlinks[v] === indices[v]) {
            const component = [];
            while (true) {
                const w = stack.pop();
                onStack[w] = false;
                component.push(w);
                if (w === v) {
                    break;
                }
            }
            sccList.push(component);
        }
    }

    for (let v = 0; v < numVertices; v++) {
        if (indices[v] === -1) {
            strongConnect(v);
        }
    }

    return sccList;
}

/**
 * Find Articulation Points (Cut Vertices)
 * Time: O(V + E), Space: O(V)
 */
function findArticulationPoints(graph, numVertices) {
    const discovery = new Array(numVertices).fill(-1);
    const low = new Array(numVertices).fill(-1);
    const parent = new Array(numVertices).fill(-1);
    const ap = new Array(numVertices).fill(false);
    const time = [0];

    function dfs(u) {
        let children = 0;
        discovery[u] = time[0];
        low[u] = time[0];
        time[0]++;

        for (const [v] of graph[u] || []) {
            if (discovery[v] === -1) {
                children++;
                parent[v] = u;
                dfs(v);
                low[u] = Math.min(low[u], low[v]);

                // Root with 2+ children is AP
                if (parent[u] === -1 && children > 1) {
                    ap[u] = true;
                }
                // Non-root with low[v] >= discovery[u] is AP
                if (parent[u] !== -1 && low[v] >= discovery[u]) {
                    ap[u] = true;
                }
            } else if (v !== parent[u]) {
                low[u] = Math.min(low[u], discovery[v]);
            }
        }
    }

    for (let i = 0; i < numVertices; i++) {
        if (discovery[i] === -1) {
            dfs(i);
        }
    }

    return ap.map((isAP, i) => isAP ? i : null).filter(v => v !== null);
}

/**
 * Find Bridges (Cut Edges)
 * Time: O(V + E), Space: O(V)
 */
function findBridges(graph, numVertices) {
    const discovery = new Array(numVertices).fill(-1);
    const low = new Array(numVertices).fill(-1);
    const parent = new Array(numVertices).fill(-1);
    const bridges = [];
    const time = [0];

    function dfs(u) {
        discovery[u] = time[0];
        low[u] = time[0];
        time[0]++;

        for (const [v] of graph[u] || []) {
            if (discovery[v] === -1) {
                parent[v] = u;
                dfs(v);
                low[u] = Math.min(low[u], low[v]);

                // Edge (u, v) is bridge if low[v] > discovery[u]
                if (low[v] > discovery[u]) {
                    bridges.push([u, v]);
                }
            } else if (v !== parent[u]) {
                low[u] = Math.min(low[u], discovery[v]);
            }
        }
    }

    for (let i = 0; i < numVertices; i++) {
        if (discovery[i] === -1) {
            dfs(i);
        }
    }

    return bridges;
}

// Example usage
if (require.main === module) {
    // Bellman-Ford
    const graph1 = {
        0: [[1, -1], [2, 4]],
        1: [[2, 3], [3, 2], [4, 2]],
        2: [],
        3: [[2, 5], [1, 1]],
        4: [[3, -3]]
    };
    console.log("Bellman-Ford from 0:", bellmanFord(graph1, 0, 5));

    // Floyd-Warshall
    const graph2 = {
        0: [[1, 5], [2, 10]],
        1: [[2, 3]],
        2: [[3, 1]],
        3: []
    };
    console.log("\nFloyd-Warshall all-pairs shortest path:");
    const result = floydWarshall(graph2, 4);
    result.forEach((row, i) => console.log(`From ${i}:`, row));

    // A* (simplified - needs heuristic function)
    const graph3 = {
        0: [[1, 1], [2, 3]],
        1: [[3, 2]],
        2: [[3, 1]],
        3: []
    };
    const heuristic = (node, goal) => Math.abs(node - goal);
    console.log("\nA* path from 0 to 3:", aStar(graph3, 0, 3, heuristic));

    // Tarjan's SCC
    const graph4 = {
        0: [[1, 1]],
        1: [[2, 1]],
        2: [[0, 1], [3, 1]],
        3: [[4, 1]],
        4: [[3, 1]]
    };
    console.log("\nTarjan's SCC:", tarjanSCC(graph4, 5));

    // Articulation Points
    const graph5 = {
        0: [[1, 1], [2, 1]],
        1: [[0, 1], [2, 1]],
        2: [[0, 1], [1, 1], [3, 1]],
        3: [[2, 1]]
    };
    console.log("\nArticulation Points:", findArticulationPoints(graph5, 4));
    console.log("Bridges:", findBridges(graph5, 4));
}

module.exports = {
    bellmanFord,
    floydWarshall,
    aStar,
    tarjanSCC,
    findArticulationPoints,
    findBridges
};

