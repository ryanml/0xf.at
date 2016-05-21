// ==UserScript==
// @name        Level 32 
// @namespace   https://github.com/ryanml
// @description Solves and submits level 32 of 0xf.at
// @include     https://0xf.at/play/32*
// @version     1
// @grant       GM_xmlhttpRequest
// ==/UserScript==
(function () {
  // Get the dom elements we need to work with
  var wordBlock = document.getElementsByTagName('blockquote') [0].innerHTML;
  var passwordField = document.getElementById('pw');
  var submit = document.getElementsByTagName('input') [1];
  // Request the dictionary file
  var dictFile = GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://rlanesedev.iqlaunch.com/latindictionary.txt',
    synchronous: true
  });
  // Put in dictionary list
  var dictionary = dictFile.responseText.split('\n').map(word => word.trim());
  // Create a clean list of the given words
  var words = wordBlock.split(' ').map(word => 
    word.replace('.', '').trim().toLowerCase()
  );
  // Get all of the misspelled words
  var misspelledWords = [];
  for (var i = 0; i < words.length; i++) {
    if (dictionary.indexOf(words[i]) < 0) {
      misspelledWords.push(words[i]);
    }
  }
  // Set up solution
  var solution = misspelledWords.map((word) => {
    // For all the misspelled words, go through the dictionary
    for (var i = 0; i < dictionary.length; i++) {
      // Ignore the word if it isn't the same length
      if (dictionary[i].length == word.length) {
        var mc = 0; 
        var m = [];
        // Go through both words by chars
        for (var k = 0; k < word.length; k++) {
          // If there is a difference, 
          if (dictionary[i][k] != word[k]) {
            // Update difference count
            mc++;
            // Push the two characters on the array
            m.push([dictionary[i][k], word[k]]);
          }
        }
        // If there's only one difference and that difference is forward one char, append it to solution
        if (mc == 1) {
          if (m[0][1].charCodeAt() == m[0][0].charCodeAt() + 1) {
            return m[0][0];
          }
        }
      }
    }
  }).join('');
  // Fill in the password field with solution
  passwordField.value = solution;
  // Submit the solution
  submit.click();
}) ();
