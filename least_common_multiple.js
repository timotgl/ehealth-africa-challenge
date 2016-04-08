/*
 * Find the greatest common divisor (GCD) by taking advantage of the euclidean
 * algorithm. In each step, replace the larger number of the two by the
 * remainder of the division (larger/smaller). When one of the numbers has
 * reached zero, the non-zero number is the GCD.
 */
function greatest_common_divisor(num1, num2) {
  while (num1 > 0 && num2 > 0) {
    if (num1 > num2) {
      num1 %= num2;
    } else if (num2 > num1) {
      num2 %= num1;
    } else {
      // Abort, because the numbers are equal
      return num1;
    }
  }
  // Return the non-zero number
  return (num1 > num2) ? num1 : num2;
}

/*
 * Find the least common multiple (LCM) by successively applying
 * LCM(a, b) = (a*b) / GCD(a,b)
 * to all numbers. Since LCM() is associative, we can reduce numbers by
 * one element in each step.
 */
function least_common_multiple(numbers) {
  return numbers.reduce(function(result, num) {
    return result * (num / greatest_common_divisor(result, num));
  }, 1);
}
