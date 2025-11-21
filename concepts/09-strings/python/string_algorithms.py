"""
String Algorithms in Python
"""

def naive_pattern_matching(text, pattern):
    """
    Naive pattern matching
    Time: O(nm), Space: O(1)
    """
    n, m = len(text), len(pattern)
    result = []
    
    for i in range(n - m + 1):
        j = 0
        while j < m and text[i + j] == pattern[j]:
            j += 1
        if j == m:
            result.append(i)
    
    return result


def kmp_pattern_matching(text, pattern):
    """
    KMP (Knuth-Morris-Pratt) pattern matching
    Time: O(n + m), Space: O(m)
    """
    def build_lps(pattern):
        """Build Longest Proper Prefix which is also Suffix"""
        m = len(pattern)
        lps = [0] * m
        length = 0
        i = 1
        
        while i < m:
            if pattern[i] == pattern[length]:
                length += 1
                lps[i] = length
                i += 1
            else:
                if length != 0:
                    length = lps[length - 1]
                else:
                    lps[i] = 0
                    i += 1
        return lps
    
    n, m = len(text), len(pattern)
    if m == 0:
        return []
    
    lps = build_lps(pattern)
    result = []
    i = j = 0
    
    while i < n:
        if text[i] == pattern[j]:
            i += 1
            j += 1
        
        if j == m:
            result.append(i - j)
            j = lps[j - 1]
        elif i < n and text[i] != pattern[j]:
            if j != 0:
                j = lps[j - 1]
            else:
                i += 1
    
    return result


def rabin_karp(text, pattern, base=256, mod=101):
    """
    Rabin-Karp pattern matching
    Time: O(n + m) average, O(nm) worst, Space: O(1)
    """
    n, m = len(text), len(pattern)
    if m == 0 or m > n:
        return []
    
    # Calculate hash of pattern and first window
    pattern_hash = 0
    window_hash = 0
    h = 1
    
    for i in range(m - 1):
        h = (h * base) % mod
    
    for i in range(m):
        pattern_hash = (base * pattern_hash + ord(pattern[i])) % mod
        window_hash = (base * window_hash + ord(text[i])) % mod
    
    result = []
    
    for i in range(n - m + 1):
        if pattern_hash == window_hash:
            # Check if strings match (hash collision check)
            if text[i:i + m] == pattern:
                result.append(i)
        
        if i < n - m:
            window_hash = (base * (window_hash - ord(text[i]) * h) + ord(text[i + m])) % mod
            if window_hash < 0:
                window_hash += mod
    
    return result


def longest_palindromic_substring(s):
    """
    Find longest palindromic substring
    Time: O(n²), Space: O(1)
    """
    if not s:
        return ""
    
    start = 0
    max_len = 1
    
    def expand_around_center(left, right):
        nonlocal start, max_len
        while left >= 0 and right < len(s) and s[left] == s[right]:
            if right - left + 1 > max_len:
                start = left
                max_len = right - left + 1
            left -= 1
            right += 1
    
    for i in range(len(s)):
        expand_around_center(i, i)  # Odd length
        expand_around_center(i, i + 1)  # Even length
    
    return s[start:start + max_len]


def is_anagram(s1, s2):
    """
    Check if two strings are anagrams
    Time: O(n), Space: O(1) - limited charset
    """
    if len(s1) != len(s2):
        return False
    
    count = [0] * 26
    
    for char in s1:
        count[ord(char.lower()) - ord('a')] += 1
    
    for char in s2:
        count[ord(char.lower()) - ord('a')] -= 1
        if count[ord(char.lower()) - ord('a')] < 0:
            return False
    
    return True


def longest_common_substring(s1, s2):
    """
    Find longest common substring
    Time: O(nm), Space: O(nm)
    """
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    max_len = 0
    end_index = 0
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i - 1] == s2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
                if dp[i][j] > max_len:
                    max_len = dp[i][j]
                    end_index = i
            else:
                dp[i][j] = 0
    
    return s1[end_index - max_len:end_index] if max_len > 0 else ""


# Example usage
if __name__ == "__main__":
    text = "ABABDABACDABABCABCABC"
    pattern = "ABCABC"
    
    print("Naive matching:", naive_pattern_matching(text, pattern))
    print("KMP matching:", kmp_pattern_matching(text, pattern))
    print("Rabin-Karp matching:", rabin_karp(text, pattern))
    
    print("\nLongest palindromic substring:", longest_palindromic_substring("babad"))
    print("Is anagram:", is_anagram("listen", "silent"))
    print("Longest common substring:", longest_common_substring("ABABC", "BABCA"))

