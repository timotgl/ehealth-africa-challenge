/*
 * I'm assuming that the array needs to be modified in-place
 * and therefore we don't have a return value.
*/
function compact_array(sorted_arr) {
  var i, curr;
  var prev = sorted_arr[0];
  var len = sorted_arr.length;

  for (i = 1; i < len; i++) {
      curr = sorted_arr[i];
      if (curr === prev) {
        sorted_arr.splice(i, 1);
        len--;
        i--;
      }
      prev = curr;
  }
}
