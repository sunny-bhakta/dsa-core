"""
Boyer-Moore String Matching Algorithm in Python
"""

def boyer_moore(text, pattern):
    """
    Boyer-Moore Pattern Matching
    Time: O(nm) worst, O(n) best, Space: O(m)
    Uses bad character rule and good suffix rule
    """
    if not pattern:
        return []
    
    n, m = len(text), len(pattern)
    result = []
    
    # Preprocess bad character rule
    bad_char = build_bad_char_table(pattern)
    
    s = 0  # Shift of pattern with respect to text
    while s <= n - m:
        j = m - 1
        
        # Keep reducing index j while characters match
        while j >= 0 and pattern[j] == text[s + j]:
            j -= 1
        
        # If pattern found
        if j < 0:
            result.append(s)
            # Shift pattern to next possible position
            s += (m - bad_char.get(text[s + m], -1) if s + m < n else 1)
        else:
            # Shift pattern to align bad character
            s += max(1, j - bad_char.get(text[s + j], -1))
    
    return result


def build_bad_char_table(pattern):
    """
    Build bad character table
    Stores last occurrence of each character
    """
    table = {}
    for i, char in enumerate(pattern):
        table[char] = i
    return table


def boyer_moore_enhanced(text, pattern):
    """
    Enhanced Boyer-Moore with good suffix rule
    Time: O(nm) worst, O(n) best, Space: O(m)
    """
    if not pattern:
        return []
    
    n, m = len(text), len(pattern)
    result = []
    
    # Preprocess both rules
    bad_char = build_bad_char_table(pattern)
    good_suffix = build_good_suffix_table(pattern)
    
    s = 0
    while s <= n - m:
        j = m - 1
        
        while j >= 0 and pattern[j] == text[s + j]:
            j -= 1
        
        if j < 0:
            result.append(s)
            s += good_suffix[0] if m > 1 else 1
        else:
            bad_char_shift = j - bad_char.get(text[s + j], -1)
            good_suffix_shift = good_suffix[j + 1]
            s += max(bad_char_shift, good_suffix_shift)
    
    return result


def build_good_suffix_table(pattern):
    """
    Build good suffix table
    Stores shift values for good suffix rule
    """
    m = len(pattern)
    table = [0] * (m + 1)
    
    # Simplified good suffix rule
    for i in range(m):
        table[i] = m
    
    # Find longest suffix that matches prefix
    i, j = m, m + 1
    border = [0] * (m + 1)
    border[i] = j
    
    while i > 0:
        while j <= m and pattern[i - 1] != pattern[j - 1]:
            if table[j] == 0:
                table[j] = j - i
            j = border[j]
        i -= 1
        j -= 1
        border[i] = j
    
    j = border[0]
    for i in range(m + 1):
        if table[i] == 0:
            table[i] = j
        if i == j:
            j = border[j]
    
    return table


# Example usage
if __name__ == "__main__":
    text = "ABAAABCD"
    pattern = "ABC"
    
    print("Boyer-Moore Pattern Matching:")
    print(f"Text: {text}")
    print(f"Pattern: {pattern}")
    print(f"Matches: {boyer_moore(text, pattern)}")
    
    text2 = "THIS IS A TEST TEXT"
    pattern2 = "TEST"
    print(f"\nText: {text2}")
    print(f"Pattern: {pattern2}")
    print(f"Matches: {boyer_moore(text2, pattern2)}")
    
    print(f"\nEnhanced Boyer-Moore:")
    print(f"Matches: {boyer_moore_enhanced(text, pattern)}")

