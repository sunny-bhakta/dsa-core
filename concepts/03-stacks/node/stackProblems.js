/**
 * Common Stack Problems
 */

/**
 * Check if parentheses are valid
 * Time: O(n), Space: O(n)
 */
function isValidParentheses(s) {
    const stack = [];
    const mapping = { ')': '(', '}': '{', ']': '[' };

    for (const char of s) {
        if (char in mapping) {
            if (stack.length === 0 || stack.pop() !== mapping[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }

    return stack.length === 0;
}

/**
 * Find next greater element for each element
 * Time: O(n), Space: O(n)
 */
function nextGreaterElement(nums) {
    const result = new Array(nums.length).fill(-1);
    const stack = [];

    for (let i = 0; i < nums.length; i++) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
            result[stack.pop()] = nums[i];
        }
        stack.push(i);
    }

    return result;
}

/**
 * Find largest rectangle in histogram
 * Time: O(n), Space: O(n)
 */
function largestRectangleHistogram(heights) {
    const stack = [];
    let maxArea = 0;

    for (let i = 0; i < heights.length; i++) {
        while (stack.length > 0 && heights[stack[stack.length - 1]] > heights[i]) {
            const h = heights[stack.pop()];
            const w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, h * w);
        }
        stack.push(i);
    }

    while (stack.length > 0) {
        const h = heights[stack.pop()];
        const w = stack.length === 0 ? heights.length : heights.length - stack[stack.length - 1] - 1;
        maxArea = Math.max(maxArea, h * w);
    }

    return maxArea;
}

/**
 * Evaluate postfix expression
 * Time: O(n), Space: O(n)
 */
function evaluatePostfix(expression) {
    const stack = [];

    for (const token of expression) {
        if (/\d/.test(token)) {
            stack.push(parseInt(token));
        } else {
            const b = stack.pop();
            const a = stack.pop();

            switch (token) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '/':
                    stack.push(Math.floor(a / b));
                    break;
            }
        }
    }

    return stack[0];
}

/**
 * Convert infix to postfix notation
 * Time: O(n), Space: O(n)
 */
function infixToPostfix(expression) {
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
    const stack = [];
    const result = [];

    for (const char of expression) {
        if (/[a-zA-Z0-9]/.test(char)) {
            result.push(char);
        } else if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                result.push(stack.pop());
            }
            stack.pop(); // Remove '('
        } else {
            while (stack.length > 0 && stack[stack.length - 1] !== '(' &&
                   (precedence[char] || 0) <= (precedence[stack[stack.length - 1]] || 0)) {
                result.push(stack.pop());
            }
            stack.push(char);
        }
    }

    while (stack.length > 0) {
        result.push(stack.pop());
    }

    return result.join('');
}

/**
 * Find days until warmer temperature
 * Time: O(n), Space: O(n)
 */
function dailyTemperatures(temperatures) {
    const result = new Array(temperatures.length).fill(0);
    const stack = [];

    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length > 0 && temperatures[stack[stack.length - 1]] < temperatures[i]) {
            const idx = stack.pop();
            result[idx] = i - idx;
        }
        stack.push(i);
    }

    return result;
}

/**
 * Calculate trapped rainwater using stack
 * Time: O(n), Space: O(n)
 */
function trappingRainWater(height) {
    const stack = [];
    let water = 0;

    for (let i = 0; i < height.length; i++) {
        while (stack.length > 0 && height[stack[stack.length - 1]] < height[i]) {
            const bottom = stack.pop();
            if (stack.length === 0) {
                break;
            }
            const width = i - stack[stack.length - 1] - 1;
            const trappedHeight = Math.min(height[stack[stack.length - 1]], height[i]) - height[bottom];
            water += width * trappedHeight;
        }
        stack.push(i);
    }

    return water;
}

// Example usage
if (require.main === module) {
    // Valid parentheses
    console.log("Valid parentheses '()[]{}':", isValidParentheses("()[]{}"));
    console.log("Valid parentheses '([)]':", isValidParentheses("([)]"));

    // Next greater element
    const nums = [4, 5, 2, 10, 8];
    console.log("Next greater elements:", nextGreaterElement(nums));

    // Largest rectangle
    const heights = [2, 1, 5, 6, 2, 3];
    console.log("Largest rectangle area:", largestRectangleHistogram(heights));

    // Evaluate postfix
    const postfix = "231*+9-";
    console.log("Postfix evaluation:", evaluatePostfix(postfix));

    // Infix to postfix
    const infix = "A+B*C-D";
    console.log("Infix to postfix:", infixToPostfix(infix));

    // Daily temperatures
    const temps = [73, 74, 75, 71, 69, 72, 76, 73];
    console.log("Days until warmer:", dailyTemperatures(temps));

    // Trapping rain water
    const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
    console.log("Trapped water:", trappingRainWater(height));
}

module.exports = {
    isValidParentheses,
    nextGreaterElement,
    largestRectangleHistogram,
    evaluatePostfix,
    infixToPostfix,
    dailyTemperatures,
    trappingRainWater
};

