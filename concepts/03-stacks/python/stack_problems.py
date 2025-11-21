"""
Common Stack Problems
"""

def is_valid_parentheses(s):
    """
    Check if parentheses are valid
    Time: O(n), Space: O(n)
    """
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            stack.append(char)
    
    return len(stack) == 0


def next_greater_element(nums):
    """
    Find next greater element for each element
    Time: O(n), Space: O(n)
    """
    result = [-1] * len(nums)
    stack = []
    
    for i in range(len(nums)):
        while stack and nums[stack[-1]] < nums[i]:
            result[stack.pop()] = nums[i]
        stack.append(i)
    
    return result


def largest_rectangle_histogram(heights):
    """
    Find largest rectangle in histogram
    Time: O(n), Space: O(n)
    """
    stack = []
    max_area = 0
    
    for i, height in enumerate(heights):
        while stack and heights[stack[-1]] > height:
            h = heights[stack.pop()]
            w = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, h * w)
        stack.append(i)
    
    while stack:
        h = heights[stack.pop()]
        w = len(heights) if not stack else len(heights) - stack[-1] - 1
        max_area = max(max_area, h * w)
    
    return max_area


def evaluate_postfix(expression):
    """
    Evaluate postfix expression
    Time: O(n), Space: O(n)
    """
    stack = []
    
    for token in expression:
        if token.isdigit():
            stack.append(int(token))
        else:
            b = stack.pop()
            a = stack.pop()
            
            if token == '+':
                stack.append(a + b)
            elif token == '-':
                stack.append(a - b)
            elif token == '*':
                stack.append(a * b)
            elif token == '/':
                stack.append(a // b)
    
    return stack[0]


def infix_to_postfix(expression):
    """
    Convert infix to postfix notation
    Time: O(n), Space: O(n)
    """
    precedence = {'+': 1, '-': 1, '*': 2, '/': 2, '^': 3}
    stack = []
    result = []
    
    for char in expression:
        if char.isalnum():
            result.append(char)
        elif char == '(':
            stack.append(char)
        elif char == ')':
            while stack and stack[-1] != '(':
                result.append(stack.pop())
            stack.pop()  # Remove '('
        else:
            while (stack and stack[-1] != '(' and 
                   precedence.get(char, 0) <= precedence.get(stack[-1], 0)):
                result.append(stack.pop())
            stack.append(char)
    
    while stack:
        result.append(stack.pop())
    
    return ''.join(result)


def daily_temperatures(temperatures):
    """
    Find days until warmer temperature
    Time: O(n), Space: O(n)
    """
    result = [0] * len(temperatures)
    stack = []
    
    for i, temp in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < temp:
            idx = stack.pop()
            result[idx] = i - idx
        stack.append(i)
    
    return result


def trapping_rain_water(height):
    """
    Calculate trapped rainwater using stack
    Time: O(n), Space: O(n)
    """
    stack = []
    water = 0
    
    for i, h in enumerate(height):
        while stack and height[stack[-1]] < h:
            bottom = stack.pop()
            if not stack:
                break
            width = i - stack[-1] - 1
            trapped_height = min(height[stack[-1]], h) - height[bottom]
            water += width * trapped_height
        stack.append(i)
    
    return water


# Example usage
if __name__ == "__main__":
    # Valid parentheses
    print("Valid parentheses '()[]{}':", is_valid_parentheses("()[]{}"))
    print("Valid parentheses '([)]':", is_valid_parentheses("([)]"))
    
    # Next greater element
    nums = [4, 5, 2, 10, 8]
    print("Next greater elements:", next_greater_element(nums))
    
    # Largest rectangle
    heights = [2, 1, 5, 6, 2, 3]
    print("Largest rectangle area:", largest_rectangle_histogram(heights))
    
    # Evaluate postfix
    postfix = "231*+9-"
    print("Postfix evaluation:", evaluate_postfix(postfix))
    
    # Infix to postfix
    infix = "A+B*C-D"
    print("Infix to postfix:", infix_to_postfix(infix))
    
    # Daily temperatures
    temps = [73, 74, 75, 71, 69, 72, 76, 73]
    print("Days until warmer:", daily_temperatures(temps))
    
    # Trapping rain water
    height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
    print("Trapped water:", trapping_rain_water(height))

