/**
 * Trie (Prefix Tree) Implementation in Node.js
 */

class TrieNode {
    /**
     * Node for Trie
     */
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    /**
     * Trie (Prefix Tree) Implementation
     */
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * Insert word - O(m) where m is word length
     */
    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!(char in node.children)) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    /**
     * Search word - O(m)
     */
    search(word) {
        let node = this.root;
        for (const char of word) {
            if (!(char in node.children)) {
                return false;
            }
            node = node.children[char];
        }
        return node.isEndOfWord;
    }

    /**
     * Check if prefix exists - O(m)
     */
    startsWith(prefix) {
        let node = this.root;
        for (const char of prefix) {
            if (!(char in node.children)) {
                return false;
            }
            node = node.children[char];
        }
        return true;
    }

    /**
     * Delete word - O(m)
     */
    delete(word) {
        const _delete = (node, word, index) => {
            if (index === word.length) {
                if (!node.isEndOfWord) {
                    return false;
                }
                node.isEndOfWord = false;
                return Object.keys(node.children).length === 0;
            }

            const char = word[index];
            if (!(char in node.children)) {
                return false;
            }

            const shouldDelete = _delete(node.children[char], word, index + 1);

            if (shouldDelete) {
                delete node.children[char];
                return Object.keys(node.children).length === 0 && !node.isEndOfWord;
            }

            return false;
        };

        _delete(this.root, word, 0);
    }

    /**
     * Get all words with given prefix - O(n)
     */
    getAllWordsWithPrefix(prefix) {
        let node = this.root;
        for (const char of prefix) {
            if (!(char in node.children)) {
                return [];
            }
            node = node.children[char];
        }

        const words = [];

        function dfs(currentNode, currentWord) {
            if (currentNode.isEndOfWord) {
                words.push(prefix + currentWord);
            }

            for (const [char, childNode] of Object.entries(currentNode.children)) {
                dfs(childNode, currentWord + char);
            }
        }

        dfs(node, "");
        return words;
    }
}

// Example usage
if (require.main === module) {
    const trie = new Trie();

    const words = ["apple", "app", "apricot", "banana", "band", "bandana"];
    words.forEach(word => trie.insert(word));

    console.log("Search 'app':", trie.search("app"));
    console.log("Search 'appl':", trie.search("appl"));
    console.log("Starts with 'ban':", trie.startsWith("ban"));
    console.log("All words with prefix 'app':", trie.getAllWordsWithPrefix("app"));

    trie.delete("app");
    console.log("After deleting 'app', search 'app':", trie.search("app"));
    console.log("After deleting 'app', search 'apple':", trie.search("apple"));
}

module.exports = { TrieNode, Trie };

