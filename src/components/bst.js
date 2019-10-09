class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

export default class BST {
    constructor() {
        this.root = null
    }

    insert(data) {
        let newNode = new Node(data)

        if (this.root == null)
            this.root = newNode
        else
            this.insertNode(this.root, newNode)
    }

    insertAll(data) {
        // data.map(this.insert) dosent work D:
        for (let n in data)
            this.insert(n)
    }

    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (node.left === null)
                node.left = newNode
            else
                this.insertNode(node.left, newNode)
        } else {
            if (node.right === null)
                node.right = newNode
            else
                this.insertNode(node.right, newNode)
        }
    }

    remove(data) {
        this.root = this.removeNode(this.root, data)
    }
    
    removeNode(node, key) {
        if (node === null)
            return null
        else if (key < node.data) {
            // Move down to the left
            node.left = this.removeNode(node.left, key)
            return node
        } else if (key > node.data) {
            // Move down to the right
            node.right = this.removeNode(node.right, key)
            return node
        } else {
            // If node has no children
            if (node.left === null && node.right === null) {
                node = null
                return node
            }

            // If right child is empty
            if (node.left === null) {
                node = node.right
                return node
            } else if (node.right === null) {
                node = node.left
                return node
            }

            let temp = this.getMinNode(node.right)
            node.data = temp.data

            node.right = this.removeNode(node.right, temp.data)
            return node
        }
    }

    getMinNode(node) {
        if (node.left === null)
            return node
        else
            return this.findMinNode(node.left)
    }

    getRoot() {
        return this.root
    }

    search(node, data) {
        if (node === null)
            return null
        else if (data < node.data)
            return this.search(node.left, data)
        else if (data > node.data)
            return this.serach(node.right, data)
        else
            return node
    }

    // Traversal
    inorder(node, result) {
        if (node) {
            this.inorder(node.left, result)
            result.push(node.data)
            this.inorder(node.right, result)
        }
    }

    preorder(node, result) {
        if (node) {
            result.push(node.data)
            this.inorder(node.left, result)
            this.inorder(node.right, result)
        }
    }

    postorder(node, result) {
        if (node) {
            this.inorder(node.left, result)
            this.inorder(node.right, result)
            result.push(node.data)
        }
    }
}