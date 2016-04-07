/*
Note: My first instinct was to use Array.prototype.join to build the result,
but plain old string concatenation is apparently faster:
http://stackoverflow.com/questions/7299010/why-is-string-concatenation-faster-than-array-join
*/


/* N*N version */
function find_chars_slow(string1, string2) {
  var i1, char1, i2;
  var intersection = '';
  
  for (i1 = 0; i1 < string1.length; i1++) {
      char1 = string1[i1];
      for (i2 = 0; i2 < string2.length; i2++) {
          if (char1 === string2[i2]) {
            intersection += char1;
          }
      }
  }
  
  return intersection;
}

/* Linear complexity version. We iterate through both strings only once. */
function find_chars(string1, string2) {
  var i1, i2, char1, char2;
  var string2_chars = {};
  var intersection = '';
  
  // Map out string2 to allow constant-time property lookup
  // for individual characters.
  for (i2 = 0; i2 < string2.length; i2++) {
    char2 = string2[i2];
    string2_chars[char2] = true;
  }
  
  for (i1 = 0; i1 < string1.length; i1++) {
      char1 = string1[i1];
      if (string2_chars.hasOwnProperty(char1)) {
          intersection += char1;
      }
  }
  
  return intersection;
}

/* Just in case we don't want duplicated characters. */
function find_chars_unique(string1, string2) {
  var i1, i2, char1, char2;
  var string2_chars = {};
  var intersection = '';
  
  // Map out string2 to allow constant-time property lookup
  // for individual characters. Value will be set to false if already seen.
  for (i2 = 0; i2 < string2.length; i2++) {
    char2 = string2[i2];
    string2_chars[char2] = true;
  }
  
  for (i1 = 0; i1 < string1.length; i1++) {
      char1 = string1[i1];
      if (string2_chars.hasOwnProperty(char1) && string2_chars[char1]) {
          intersection += char1;
          string2_chars[char1] = false;
      }
  }
  
  return intersection;
}
