// This solutions consists of several functions to increase readability.
// Instead of using sieve_of_eratosthenes to find prime numbers, we could
// use a hard-coded list of prime numbers to do this more efficiently.
// But this would require knowledge about the input array of numbers, so I went
// with a general solution.

/* Find all prime numbers between 2 and max. */
function sieve_of_eratosthenes(max) {
  var prev_prime;
  var numbers = [];
  var primes = [];

  // Fill sieve with all numbers
  for (var i = 2; i <= max; i++) {
   numbers.push(i);
  }

  while (numbers.length) {
      primes.push(numbers.shift()); // save number as prime
      numbers = numbers.filter(function(num) {
        prev_prime = primes[primes.length-1];
        return num % prev_prime !== 0;
      });
  }

  return primes;
}

/* Find the greatest number in an array of numbers. */
function find_max(numbers) {
  return numbers.reduce(function(greatest, num) {
    return (num > greatest) ? num : greatest;
  }, numbers[0]);
}

/* Multiply all numbers */
function product(numbers) {
  return numbers.reduce(function(result, num) {
    return result * num;
  }, 1);
}

/*
 * Find the least common multiple using prime factors.
 * Each individual number is divided by an increasing prime number,
 * until all results are the number 1.
 * 
 * Whenever the currently used prime number successfuly divided at least one of
 * the numbers (without leaving a remainder), we know it is one of the prime
 * factors used later to calculate the least common multiple.
 */
function least_common_multiple(numbers) {
  var next, prime;
  var primes = sieve_of_eratosthenes(find_max(numbers));
  var prime_factors = [];
  var is_divisible = false;
  var all_reduced_to_one = false;
  
  while (!all_reduced_to_one) {
    
    // Check wether we need to keep dividing by the current prime number
    // or move on to the next prime number.
    if (is_divisible) {
      is_divisible = false;
    } else {
      prime = primes.shift();
    }
    
    all_reduced_to_one = true;
    
    // Divide all numbers by the current prime number.
    // Overwrite each number with the result of the division if there is no
    // remainder.
    numbers = numbers.map(function(num) {
      if (num%prime === 0) {
        next = num / prime;

        // If *any* of the numbers were in fact divisble, we need to keep using
        // the current prime number for division.
        is_divisible = true;
      } else {
        next = num;
      }
      
      // If all (!) of the divisions produced one, we are done.
      if (next !== 1) all_reduced_to_one = false;
      
      return next;
    });
    if (is_divisible) prime_factors.push(prime);
  }
  
  return product(prime_factors);
}
