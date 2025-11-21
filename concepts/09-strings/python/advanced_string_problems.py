"""
Advanced String Problems in Python
"""

def string_compression(s):
    """
    Compress string using character counts
    Example: "aabcccccaaa" -> "a2b1c5a3"
    Time: O(n), Space: O(n)
    """
    if not s:
        return ""
    
    compressed = []
    count = 1
    
    for i in range(1, len(s)):
        if s[i] == s[i - 1]:
            count += 1
        else:
            compressed.append(s[i - 1] + str(count))
            count = 1
    
    compressed.append(s[-1] + str(count))
    result = ''.join(compressed)
    
    return result if len(result) < len(s) else s


def string_compression_optimized(s):
    """
    Optimized compression - only compress if beneficial
    Time: O(n), Space: O(n)
    """
    if not s:
        return ""
    
    # First pass: calculate compressed length
    compressed_length = 0
    count = 1
    
    for i in range(1, len(s)):
        if s[i] == s[i - 1]:
            count += 1
        else:
            compressed_length += 1 + len(str(count))
            count = 1
    compressed_length += 1 + len(str(count))
    
    if compressed_length >= len(s):
        return s
    
    # Second pass: build compressed string
    result = []
    count = 1
    
    for i in range(1, len(s)):
        if s[i] == s[i - 1]:
            count += 1
        else:
            result.append(s[i - 1])
            result.append(str(count))
            count = 1
    
    result.append(s[-1])
    result.append(str(count))
    
    return ''.join(result)


def word_break(s, word_dict):
    """
    Word Break Problem - Check if string can be segmented
    Time: O(n²), Space: O(n)
    """
    word_set = set(word_dict)
    n = len(s)
    dp = [False] * (n + 1)
    dp[0] = True  # Empty string
    
    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break
    
    return dp[n]


def word_break_all_solutions(s, word_dict):
    """
    Word Break - Find all possible segmentations
    Time: O(2^n) worst case, Space: O(2^n)
    """
    word_set = set(word_dict)
    memo = {}
    
    def backtrack(start):
        if start in memo:
            return memo[start]
        
        if start == len(s):
            return [""]
        
        result = []
        for end in range(start + 1, len(s) + 1):
            word = s[start:end]
            if word in word_set:
                rest = backtrack(end)
                for r in rest:
                    if r:
                        result.append(word + " " + r)
                    else:
                        result.append(word)
        
        memo[start] = result
        return result
    
    return backtrack(0)


def regular_expression_matching(s, p):
    """
    Regular Expression Matching
    Supports '.' (any char) and '*' (zero or more of preceding)
    Time: O(m * n), Space: O(m * n)
    """
    m, n = len(s), len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True
    
    # Handle patterns like a*, a*b*, a*b*c*
    for j in range(2, n + 1):
        if p[j - 1] == '*':
            dp[0][j] = dp[0][j - 2]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j - 1] == s[i - 1] or p[j - 1] == '.':
                dp[i][j] = dp[i - 1][j - 1]
            elif p[j - 1] == '*':
                # Zero occurrences
                dp[i][j] = dp[i][j - 2]
                # One or more occurrences
                if p[j - 2] == s[i - 1] or p[j - 2] == '.':
                    dp[i][j] = dp[i][j] or dp[i - 1][j]
            else:
                dp[i][j] = False
    
    return dp[m][n]


def wildcard_matching(s, p):
    """
    Wildcard Matching
    Supports '?' (single char) and '*' (any sequence)
    Time: O(m * n), Space: O(m * n)
    """
    m, n = len(s), len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True
    
    # Handle leading '*'
    for j in range(1, n + 1):
        if p[j - 1] == '*':
            dp[0][j] = dp[0][j - 1]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j - 1] == s[i - 1] or p[j - 1] == '?':
                dp[i][j] = dp[i - 1][j - 1]
            elif p[j - 1] == '*':
                # Match zero or more characters
                dp[i][j] = dp[i][j - 1] or dp[i - 1][j]
            else:
                dp[i][j] = False
    
    return dp[m][n]


def longest_palindromic_subsequence(s):
    """
    Longest Palindromic Subsequence (LPS)
    Time: O(n²), Space: O(n²)
    """
    n = len(s)
    dp = [[0] * n for _ in range(n)]
    
    # Every single character is a palindrome of length 1
    for i in range(n):
        dp[i][i] = 1
    
    # Check for substrings of length 2 and more
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                dp[i][j] = 2 + dp[i + 1][j - 1] if length > 2 else 2
            else:
                dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])
    
    return dp[0][n - 1]


def minimum_insertions_for_palindrome(s):
    """
    Minimum insertions to make string palindrome
    Time: O(n²), Space: O(n²)
    """
    n = len(s)
    dp = [[0] * n for _ in range(n)]
    
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                dp[i][j] = dp[i + 1][j - 1] if length > 2 else 0
            else:
                dp[i][j] = 1 + min(dp[i + 1][j], dp[i][j - 1])
    
    return dp[0][n - 1]


# Example usage
if __name__ == "__main__":
    # String Compression
    print("--- String Compression ---")
    s1 = "aabcccccaaa"
    print(f"Original: {s1}")
    print(f"Compressed: {string_compression(s1)}")
    print(f"Optimized: {string_compression_optimized(s1)}")
    
    s2 = "abcdef"
    print(f"\nOriginal: {s2}")
    print(f"Compressed: {string_compression(s2)}")  # Returns original (not beneficial)
    
    # Word Break
    print("\n--- Word Break ---")
    s3 = "leetcode"
    word_dict = ["leet", "code"]
    print(f"String: {s3}, Dict: {word_dict}")
    print(f"Can be segmented: {word_break(s3, word_dict)}")
    
    s4 = "catsanddog"
    word_dict2 = ["cat", "cats", "and", "sand", "dog"]
    print(f"\nString: {s4}, Dict: {word_dict2}")
    print(f"All solutions: {word_break_all_solutions(s4, word_dict2)}")
    
    # Regular Expression Matching
    print("\n--- Regular Expression Matching ---")
    print(f"'aa' matches 'a': {regular_expression_matching('aa', 'a')}")
    print(f"'aa' matches 'a*': {regular_expression_matching('aa', 'a*')}")
    print(f"'ab' matches '.*': {regular_expression_matching('ab', '.*')}")
    print(f"'aab' matches 'c*a*b': {regular_expression_matching('aab', 'c*a*b')}")
    
    # Wildcard Matching
    print("\n--- Wildcard Matching ---")
    print(f"'aa' matches 'a': {wildcard_matching('aa', 'a')}")
    print(f"'aa' matches '*': {wildcard_matching('aa', '*')}")
    print(f"'adceb' matches '*a*b': {wildcard_matching('adceb', '*a*b')}")
    print(f"'acdcb' matches 'a*c?b': {wildcard_matching('acdcb', 'a*c?b')}")
    
    # Longest Palindromic Subsequence
    print("\n--- Longest Palindromic Subsequence ---")
    s5 = "bbbab"
    print(f"String: {s5}")
    print(f"LPS length: {longest_palindromic_subsequence(s5)}")
    
    # Minimum Insertions for Palindrome
    print("\n--- Minimum Insertions for Palindrome ---")
    s6 = "ab"
    print(f"String: {s6}")
    print(f"Minimum insertions: {minimum_insertions_for_palindrome(s6)}")


