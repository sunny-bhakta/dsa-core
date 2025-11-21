"""
Greedy Algorithms in Python
"""

def activity_selection(start, finish):
    """
    Activity Selection Problem
    Select maximum non-overlapping activities
    Time: O(n log n), Space: O(1)
    """
    n = len(finish)
    # Sort by finish time
    activities = sorted(zip(finish, start))
    
    selected = [0]  # First activity always selected
    last_finish = activities[0][0]
    
    for i in range(1, n):
        if activities[i][1] >= last_finish:
            selected.append(i)
            last_finish = activities[i][0]
    
    return selected


def fractional_knapsack(weights, values, capacity):
    """
    Fractional Knapsack Problem
    Items can be taken partially
    Time: O(n log n), Space: O(n)
    """
    n = len(weights)
    items = [(values[i] / weights[i], weights[i], values[i], i) 
             for i in range(n)]
    items.sort(reverse=True)  # Sort by value/weight ratio
    
    total_value = 0
    remaining = capacity
    
    for ratio, weight, value, idx in items:
        if remaining >= weight:
            total_value += value
            remaining -= weight
        else:
            total_value += ratio * remaining
            break
    
    return total_value


def minimum_coins(coins, amount):
    """
    Minimum coins (greedy approach - works for certain coin systems)
    Time: O(n), Space: O(1)
    Note: Only works for canonical coin systems
    """
    coins.sort(reverse=True)
    count = 0
    i = 0
    
    while amount > 0 and i < len(coins):
        if coins[i] <= amount:
            num_coins = amount // coins[i]
            count += num_coins
            amount -= num_coins * coins[i]
        i += 1
    
    return count if amount == 0 else -1


def interval_scheduling(intervals):
    """
    Interval Scheduling - Maximum non-overlapping intervals
    Time: O(n log n), Space: O(1)
    """
    # Sort by end time
    intervals.sort(key=lambda x: x[1])
    
    selected = [intervals[0]]
    last_end = intervals[0][1]
    
    for interval in intervals[1:]:
        if interval[0] >= last_end:
            selected.append(interval)
            last_end = interval[1]
    
    return selected


def huffman_coding(frequencies):
    """
    Huffman Coding - Optimal prefix-free encoding
    Time: O(n log n), Space: O(n)
    """
    import heapq
    
    class Node:
        def __init__(self, char, freq, left=None, right=None):
            self.char = char
            self.freq = freq
            self.left = left
            self.right = right
        
        def __lt__(self, other):
            return self.freq < other.freq
    
    # Build priority queue
    heap = [Node(char, freq) for char, freq in frequencies.items()]
    heapq.heapify(heap)
    
    # Build Huffman tree
    while len(heap) > 1:
        left = heapq.heappop(heap)
        right = heapq.heappop(heap)
        merged = Node(None, left.freq + right.freq, left, right)
        heapq.heappush(heap, merged)
    
    # Generate codes
    codes = {}
    
    def generate_codes(node, code=""):
        if node.char is not None:
            codes[node.char] = code if code else "0"
        else:
            generate_codes(node.left, code + "0")
            generate_codes(node.right, code + "1")
    
    if heap:
        generate_codes(heap[0])
    
    return codes


def job_sequencing_with_deadlines(jobs):
    """
    Job Sequencing with Deadlines (Greedy)
    Schedule jobs to maximize profit before deadlines
    Each job: (job_id, profit, deadline)
    Time: O(n²), Space: O(n)
    """
    # Sort by profit (descending)
    jobs.sort(key=lambda x: x[1], reverse=True)
    
    # Find maximum deadline
    max_deadline = max(job[2] for job in jobs)
    
    # Initialize result array
    result = [None] * (max_deadline + 1)
    total_profit = 0
    
    for job in jobs:
        job_id, profit, deadline = job
        # Find latest free slot before deadline
        for j in range(deadline, 0, -1):
            if result[j] is None:
                result[j] = job_id
                total_profit += profit
                break
    
    # Get scheduled jobs (excluding None)
    scheduled = [job for job in result if job is not None]
    return scheduled, total_profit


def weighted_job_scheduling(jobs):
    """
    Weighted Job Scheduling (DP approach)
    Each job: (start, end, profit)
    Find maximum profit subset of non-overlapping jobs
    Time: O(n²), Space: O(n)
    """
    # Sort by end time
    jobs.sort(key=lambda x: x[1])
    n = len(jobs)
    
    # DP[i] = maximum profit using jobs[0..i]
    dp = [0] * n
    dp[0] = jobs[0][2]
    
    for i in range(1, n):
        # Profit including current job
        profit_including = jobs[i][2]
        
        # Find last job that doesn't conflict
        for j in range(i - 1, -1, -1):
            if jobs[j][1] <= jobs[i][0]:
                profit_including += dp[j]
                break
        
        # Maximum of including or excluding current job
        dp[i] = max(profit_including, dp[i - 1])
    
    return dp[n - 1]


def job_scheduling_earliest_deadline(jobs):
    """
    Job Scheduling - Earliest Deadline First (EDF)
    Schedule jobs to minimize maximum lateness
    Each job: (job_id, processing_time, deadline)
    Time: O(n log n), Space: O(n)
    """
    # Sort by deadline
    jobs.sort(key=lambda x: x[2])
    
    schedule = []
    current_time = 0
    max_lateness = 0
    
    for job in jobs:
        job_id, processing_time, deadline = job
        finish_time = current_time + processing_time
        lateness = max(0, finish_time - deadline)
        max_lateness = max(max_lateness, lateness)
        
        schedule.append((job_id, current_time, finish_time, lateness))
        current_time = finish_time
    
    return schedule, max_lateness


# Example usage
if __name__ == "__main__":
    # Activity Selection
    start = [1, 3, 0, 5, 8, 5]
    finish = [2, 4, 6, 7, 9, 9]
    print("Activity Selection:", activity_selection(start, finish))
    
    # Fractional Knapsack
    weights = [10, 20, 30]
    values = [60, 100, 120]
    capacity = 50
    print("Fractional Knapsack value:", fractional_knapsack(weights, values, capacity))
    
    # Minimum Coins
    coins = [1, 5, 10, 25]
    amount = 67
    print("Minimum coins:", minimum_coins(coins, amount))
    
    # Interval Scheduling
    intervals = [(1, 3), (2, 5), (4, 7), (6, 9), (8, 10)]
    print("Interval Scheduling:", interval_scheduling(intervals))
    
    # Huffman Coding
    frequencies = {'a': 5, 'b': 9, 'c': 12, 'd': 13, 'e': 16, 'f': 45}
    print("Huffman Codes:", huffman_coding(frequencies))
    
    # Job Sequencing with Deadlines
    print("\n--- Job Sequencing with Deadlines ---")
    jobs = [
        ('a', 20, 2), ('b', 15, 2), ('c', 10, 1),
        ('d', 5, 3), ('e', 1, 3)
    ]
    scheduled, profit = job_sequencing_with_deadlines(jobs)
    print(f"Scheduled jobs: {scheduled}, Total profit: {profit}")
    
    # Weighted Job Scheduling
    print("\n--- Weighted Job Scheduling ---")
    weighted_jobs = [
        (1, 3, 5), (2, 5, 6), (4, 6, 5),
        (6, 7, 4), (5, 8, 11), (7, 9, 2)
    ]
    max_profit = weighted_job_scheduling(weighted_jobs)
    print(f"Maximum profit: {max_profit}")
    
    # Earliest Deadline First
    print("\n--- Earliest Deadline First ---")
    edf_jobs = [
        ('J1', 2, 6), ('J2', 1, 4), ('J3', 3, 5),
        ('J4', 2, 7), ('J5', 1, 3)
    ]
    schedule, lateness = job_scheduling_earliest_deadline(edf_jobs)
    print(f"Schedule: {schedule}")
    print(f"Maximum lateness: {lateness}")

