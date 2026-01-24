# Odin Binary Search Tree

This is submission for [Odin Binary Search Tree](https://www.theodinproject.com/lessons/javascript-binary-search-trees) project.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)

### The challenge

Users should be able to:

- Create binary search tree from the user input
- insert and delete a node
- print the tree into the console
- provide the callback function to traverse the node in level order and depth order traversal
- check if tree is balanced
- balanced the unbalanced tree
- check if value exist in the tree
- get the height and depths of a node

## My process

### Built with

- Javascript classes and iife (immediate invoked function expression) pattern

### What I learned

Binary tree is a graph where each node have at most 2 children. Binary search tree is tree where it left children is smaller than it parent and it right children is greater than it parent. because of this it can traverse the node in log n (divide and conqueror) time complexity, by checking if the current node value is bigger than input value then traverse the left child, else traverse the right children.

```js
if (root.data > value) {
  root.leftChildren = this.insertTraverse(root.leftChildren, value);
} else if (root.data < value) {
  root.rightChildren = this.insertTraverse(root.rightChildren, value);
}
```

Next is traversal, there are two types of traversal in binary search tree. first is level order traversal and depth order traversal. level order is when all the node on that level (height) is visited, the convention is to visit the left to right children. because the link between parent and it children is one way (parent reference it children), using a single pointer wouldn't work because there is no reference back from it children to parent. because of that it will need a queue, queue is where the first inputted item will be the first one to out, similar to how the queue works in real life, where the first one to join the queue will be the one to be served first.

first it will need empty array to serve as a queue. where the root of the tree will be inputted first. we will loop through the queue as long it's not empty. and it will get the first item and process those node. if it either have left or right children it will inserted into the queue.

```js
const queue = [];
queue.push(this.root);

while (queue.length !== 0) {
  const currentNode = queue.shift();
  callback(currentNode);

  if (currentNode.leftChildren) queue.push(currentNode.leftChildren);
  if (currentNode.rightChildren) queue.push(currentNode.rightChildren);
}
```

Depth order is where we want to visit all of it left children first before visiting it right children. there are multiple type of depth order.

1. pre order (data, left, right)
2. in order (left, data, right)
3. post order (left, right, data)

to traverse in this order. it will need recursion. where the base case would be if the node is null it will return. and if it node it will process and call itself with it left and right children.

```js
if (root === null) return;

callback(root);
this.preOrderForEach(callback, root.leftChildren);
this.preOrderForEach(callback, root.rightChildren);
```

Height is the longest path from it node to the leaf node (node without children) while depth is number of edge from the root to that node.

to get the height it will have base where if the node is null it will return -1. and it will call itself to get the height of it left and right children. and it will get the largest amount between left and right children and increment it by one. those are needed because it didn't include the height between it left and right children to it current parent node. and the leaf node will need to have the height of 0.

```js
if (root === null) return -1;

const leftHeight = this.heightTraverse(root.leftChildren);
const rightHeight = this.heightTraverse(root.rightChildren);

return Math.max(leftHeight, rightHeight) + 1;
```

for depth is will use a pointer and will loop until it pointer have the value of inputted value or null, where each traversal to a node, would increment the amount depth by one.

```js
let depthHeight = 0;
let pointer = this.root;

while (pointer !== null && pointer.data !== value) {
  if (pointer.data > value) {
    depthHeight++;
    pointer = pointer.leftChildren;
  } else if (pointer.data < value) {
    depthHeight++;
    pointer = pointer.rightChildren;
  }
}

if (pointer === null) return null;
```

for insertion of the node it will have a base case where if current node is null then it will create a new node. and it will check if current node value is larger than new node value it will call itself with it left children while storing it value to the leftChildren of the current. else it will do the same to the right children. this can works because in this tree, there would be no duplicated value.

```js
if (root === null) return new Node(value);

if (root.data > value) {
  root.leftChildren = this.insertTraverse(root.leftChildren, value);
} else if (root.data < value) {
  root.rightChildren = this.insertTraverse(root.rightChildren, value);
}

return root;
```

for deletion there will be three possible case

1. if the node have no children, immediately delete those node.
2. if it have at least one children. connect it parent node to those children node
3. if it have two children, get the next largest value in the tree (on right side, remember it is binary search tree). replace the current node with those value. and delete those value.

to know if the tree is balanced. every node in the tree should have at least height difference no more than one. for this it will need to know the absolute difference between it left and right children height. if one of the tree node height is more than one, then the tree is unbalanced.

```js
let isTreeBalanced = true;
const queue = [];
queue.push(this.root);

while (queue.length !== 0) {
  const currentNode = queue.shift();

  const leftChildrenHeight = this.heightTraverse(currentNode.leftChildren);
  currentNode.leftChildren && queue.push(currentNode.leftChildren);

  const rightChildrenHeight = this.heightTraverse(currentNode.rightChildren);
  currentNode.rightChildren && queue.push(currentNode.rightChildren);
  const difference = Math.abs(leftChildrenHeight - rightChildrenHeight);

  const isCurrentNodeBalanced = difference <= 1;

  if (!isCurrentNodeBalanced) {
    isTreeBalanced = false;
  }
}
```

for rebalance, it will only need the existing array of node and then create a new tree with it.

```js
const queue = [];
const newTreeArray = [];
console.log(this.treeArray);

queue.push(this.root);
while (queue.length !== 0) {
  const currentNode = queue.shift();

  newTreeArray.push(currentNode.data);

  currentNode.leftChildren && queue.push(currentNode.leftChildren);
  currentNode.rightChildren && queue.push(currentNode.rightChildren);
}

this.treeArray = newTreeArray;
this.root = this.buildTree(this.treeArray);
```

### Useful resources

```
- [Javascript Binary Search Tree](https://www.theodinproject.com/lessons/javascript-binary-search-trees) - on giving resource on how to insert, delete, and traversing.
```
