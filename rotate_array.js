/* 
 * I'm assuming positions is an Integer >= 0.
 * Negative numbers don't cause arr to rotate in the other direction.
 */
function rotate_array(arr, positions) {
  var cutoff = arr.length - positions;
  return arr.slice(cutoff).concat(arr.slice(0, cutoff));
}
