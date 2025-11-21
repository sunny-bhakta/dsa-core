"""
Interview Questions: Backtracking
Common interview questions with detailed solutions
"""

# ========== QUESTION 1: Generate Parentheses ==========
"""
Problem: Generate all combinations of n pairs of well-formed parentheses.

Example:
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]

Approach: Backtracking - add '(' or ')' when valid
Time: O(4^n / √n), Space: O(n)
"""
def generate_parenthesis(n):
    """
    Generate Parentheses
    """
    result = []
    
    def backtrack(current, open_count, close_count):
        if len(current) == 2 * n:
            result.append(current)
            return
        
        if open_count < n:
            backtrack(current + '(', open_count + 1, close_count)
        if close_count < open_count:
            backtrack(current + ')', open_count, close_count + 1)
    
    backtrack('', 0, 0)
    return result


# ========== QUESTION 2: Combination Sum ==========
"""
Problem: Find all unique combinations that sum to target.
Numbers can be reused.

Example:
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]

Approach: Backtracking with sorting
Time: O(2^target), Space: O(target)
"""
def combination_sum(candidates, target):
    """
    Combination Sum
    """
    result = []
    candidates.sort()
    
    def backtrack(remaining, combination, start):
        if remaining == 0:
            result.append(combination[:])
            return
        
        for i in range(start, len(candidates)):
            if candidates[i] > remaining:
                break
            combination.append(candidates[i])
            backtrack(remaining - candidates[i], combination, i)
            combination.pop()
    
    backtrack(target, [], 0)
    return result


# ========== QUESTION 3: Subsets ==========
"""
Problem: Return all possible subsets (power set).

Example:
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

Approach: Backtracking - include or exclude each element
Time: O(2^n), Space: O(n)
"""
def subsets(nums):
    """
    Subsets (Power Set)
    """
    result = []
    
    def backtrack(start, current):
        result.append(current[:])
        
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()
    
    backtrack(0, [])
    return result


# ========== QUESTION 4: Permutations ==========
"""
Problem: Return all permutations of array.

Example:
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

Approach: Backtracking - swap elements
Time: O(n!), Space: O(n)
"""
def permutations(nums):
    """
    Permutations
    """
    result = []
    
    def backtrack(start):
        if start == len(nums):
            result.append(nums[:])
            return
        
        for i in range(start, len(nums)):
            nums[start], nums[i] = nums[i], nums[start]
            backtrack(start + 1)
            nums[start], nums[i] = nums[i], nums[start]
    
    backtrack(0)
    return result


# Example usage
if __name__ == "__main__":
    print("=== BACKTRACKING INTERVIEW QUESTIONS ===\n")
    
    # Generate Parentheses
    print("1. Generate Parentheses (n=3):")
    print(f"   Output: {generate_parenthesis(3)}")
    
    # Combination Sum
    print("\n2. Combination Sum:")
    print(f"   Input: candidates=[2,3,6,7], target=7")
    print(f"   Output: {combination_sum([2,3,6,7], 7)}")
    
    # Subsets
    print("\n3. Subsets:")
    print(f"   Input: [1,2,3]")
    print(f"   Output: {subsets([1,2,3])}")
    
    # Permutations
    print("\n4. Permutations:")
    print(f"   Input: [1,2,3]")
    print(f"   Output: {permutations([1,2,3])}")

