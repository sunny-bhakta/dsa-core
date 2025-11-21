"""
Bit Manipulation in Python
"""

def count_set_bits(n):
    """
    Count number of set bits (Brian Kernighan's algorithm)
    Time: O(log n), Space: O(1)
    """
    count = 0
    while n:
        n &= n - 1  # Remove rightmost set bit
        count += 1
    return count


def is_power_of_two(n):
    """
    Check if number is power of 2
    Time: O(1), Space: O(1)
    """
    return n > 0 and (n & (n - 1)) == 0


def get_rightmost_set_bit(n):
    """
    Get position of rightmost set bit
    Time: O(1), Space: O(1)
    """
    return n & -n


def single_number(nums):
    """
    Find single number (others appear twice)
    Time: O(n), Space: O(1)
    """
    result = 0
    for num in nums:
        result ^= num
    return result


def single_number_iii(nums):
    """
    Find two single numbers (others appear twice)
    Time: O(n), Space: O(1)
    """
    xor = 0
    for num in nums:
        xor ^= num
    
    # Get rightmost set bit
    rightmost = xor & -xor
    
    num1 = num2 = 0
    for num in nums:
        if num & rightmost:
            num1 ^= num
        else:
            num2 ^= num
    
    return [num1, num2]


def reverse_bits(n):
    """
    Reverse bits of 32-bit number
    Time: O(1), Space: O(1)
    """
    result = 0
    for i in range(32):
        result <<= 1
        result |= n & 1
        n >>= 1
    return result


def bitwise_and_range(m, n):
    """
    Bitwise AND of numbers in range [m, n]
    Time: O(log n), Space: O(1)
    """
    shift = 0
    while m < n:
        m >>= 1
        n >>= 1
        shift += 1
    return m << shift


def swap_without_temp(a, b):
    """
    Swap two numbers without temporary variable
    Time: O(1), Space: O(1)
    """
    a = a ^ b
    b = a ^ b
    a = a ^ b
    return a, b


def add_without_plus(a, b):
    """
    Add two numbers without + operator
    Time: O(1), Space: O(1)
    """
    while b != 0:
        carry = a & b
        a = a ^ b
        b = carry << 1
    return a


def missing_number(nums, n):
    """
    Find missing number in range [0, n]
    Time: O(n), Space: O(1)
    """
    result = n
    for i, num in enumerate(nums):
        result ^= i ^ num
    return result


# Example usage
if __name__ == "__main__":
    print("Count set bits in 15:", count_set_bits(15))
    print("Is 16 power of 2:", is_power_of_two(16))
    print("Rightmost set bit of 12:", get_rightmost_set_bit(12))
    print("Single number:", single_number([4, 1, 2, 1, 2]))
    print("Two single numbers:", single_number_iii([1, 2, 1, 3, 2, 5]))
    print("Bitwise AND range [5,7]:", bitwise_and_range(5, 7))
    a, b = 5, 7
    print(f"Swap {a} and {b}:", swap_without_temp(a, b))
    print("Add 15 + 27:", add_without_plus(15, 27))
    print("Missing number:", missing_number([3, 0, 1], 3))

