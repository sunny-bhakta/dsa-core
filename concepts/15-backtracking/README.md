# 15. Backtracking

**Navigation:** [Home](../../README.md) | [Previous: Greedy Algorithms](../14-greedy-algorithms/README.md) | [Next: Graph Algorithms](../16-graph-algorithms/README.md)

## Overview
Backtracking is a systematic method for solving problems by trying partial solutions and abandoning them if they cannot lead to a complete solution.

## How It Works
1. Make a choice
2. Recursively solve with that choice
3. If solution found, return
4. Otherwise, undo choice (backtrack)
5. Try next option

## Key Characteristics
- Systematic search through solution space
- Prunes invalid paths early
- Uses recursion with state restoration
- Explores all possibilities

## Template Pattern
```
def backtrack(current_state):
    if is_solution(current_state):
        return current_state
    
    for choice in possible_choices:
        if is_valid(choice):
            make_choice(choice)
            result = backtrack(new_state)
            if result:
                return result
            undo_choice(choice)  # backtrack
    
    return None
```

## Common Problems

### Constraint Satisfaction
- N-Queens Problem
- Sudoku Solver
- Graph Coloring

### Combinatorial Problems
- Permutations
- Combinations
- Subset Generation

### Path Finding
- **Rat in a Maze**: Find path from (0,0) to (n-1,n-1) (Implemented)
- **Knight's Tour**: Visit every square exactly once (Implemented)
  - Uses Warnsdorff's heuristic for optimization
- **Word Search**: Find word in 2D board (Implemented)

## Optimization Techniques
- Pruning: Skip invalid branches early
- Memoization: Cache results
- Constraint propagation: Reduce search space

## Time Complexity
- Often exponential O(2ⁿ) or O(n!)
- Depends on problem constraints
- Pruning reduces actual runtime

## Common Problems
1. N-Queens
2. Sudoku solver
3. Generate permutations
4. Generate combinations
5. Subset generation
6. Word search
7. Rat in a maze
8. Knight's tour

