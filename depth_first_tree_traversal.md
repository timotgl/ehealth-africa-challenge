# Depth first tree traversal
This method of traversing a tree examines the first child of a node before looking at any subsequent children. Since a child can have further children, we keep following the 'depth' of the tree, by again examining the first child of the previous child. Eventually a leaf node is found, and only then are the remaining children examined (backtracking).

The key characteristic is to always descend into the next lower level of the tree **before** continuing to iterate over the children on the same level.

This can be done recursively with the following algorithm:

```
traverse_depth_first(tree) =
  if tree is leaf node:
   yield tree
  else
    for each child in tree:
      traverse_depth_first(child)
```

In JavaScript, for a tree represented by nested arrays with numbers as leaf nodes, the following code would output the numbers 1 through 7 in ascending order:

```
function traverse_depth_first(tree) {
  if (Number(tree)) {
    console.log(tree); // Leaf found
  } else {
    tree.forEach(function(child) {
      traverse_depth_first(child);
    });
  }
}

var tree = [
  [
    1,
    [2, 3]
  ],
  [
    [4, 5],
    6
  ],
  7
];

traverse_depth_first(tree);
```
