"""
Trie (Prefix Tree) Implementation in Python
"""

class TrieNode:
    """Node for Trie"""
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False


class Trie:
    """Trie (Prefix Tree) Implementation"""
    
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        """Insert word - O(m) where m is word length"""
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True
    
    def search(self, word):
        """Search word - O(m)"""
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end_of_word
    
    def starts_with(self, prefix):
        """Check if prefix exists - O(m)"""
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True
    
    def delete(self, word):
        """Delete word - O(m)"""
        def _delete(node, word, index):
            if index == len(word):
                if not node.is_end_of_word:
                    return False
                node.is_end_of_word = False
                return len(node.children) == 0
            
            char = word[index]
            if char not in node.children:
                return False
            
            should_delete = _delete(node.children[char], word, index + 1)
            
            if should_delete:
                del node.children[char]
                return len(node.children) == 0 and not node.is_end_of_word
            
            return False
        
        _delete(self.root, word, 0)
    
    def get_all_words_with_prefix(self, prefix):
        """Get all words with given prefix - O(n)"""
        node = self.root
        for char in prefix:
            if char not in node.children:
                return []
            node = node.children[char]
        
        words = []
        
        def dfs(current_node, current_word):
            if current_node.is_end_of_word:
                words.append(prefix + current_word)
            
            for char, child_node in current_node.children.items():
                dfs(child_node, current_word + char)
        
        dfs(node, "")
        return words


# Example usage
if __name__ == "__main__":
    trie = Trie()
    
    words = ["apple", "app", "apricot", "banana", "band", "bandana"]
    for word in words:
        trie.insert(word)
    
    print("Search 'app':", trie.search("app"))
    print("Search 'appl':", trie.search("appl"))
    print("Starts with 'ban':", trie.starts_with("ban"))
    print("All words with prefix 'app':", trie.get_all_words_with_prefix("app"))
    
    trie.delete("app")
    print("After deleting 'app', search 'app':", trie.search("app"))
    print("After deleting 'app', search 'apple':", trie.search("apple"))

