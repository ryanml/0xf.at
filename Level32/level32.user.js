// ==UserScript==
// @name        Level32
// @namespace   http://github.com/ryanml
// @description Solves and Submits level 32 of 0x.f4t
// @include     https://0xf.at/play/32
// @version     1
// @grant       GM_xmlhttpRequest
// ==/UserScript==
(function () {
  // Declare our password and misspelled word array
  var password = '';
  wordList = [
  ];
  //Uses cross site request to retrieve the dictionary text file.
  var list = GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://rlanesedev.iqlaunch.com/latindictionary.txt',
    synchronous: true
  });
  // Break up response by new lines
  var rawDictionary = list.responseText.split('\n');
  // Trim whitespace from elements
  var dictionary = rawDictionary.map(function (word) {
    return word.trim();
  });
  // Get what we'll need from the DOM, the wordlist and the password field.
  var blockText = document.getElementsByTagName('blockquote') [0].innerHTML;
  var passInput = document.getElementById('pw');
  var passSubmit = document.getElementsByTagName('input') [1];
  // Split the random list words by whitespace and put them in an array
  var rawWords = blockText.split(' ');
  // Force all words to lower case, trims extra whitespace and periods.
  var wordArray = rawWords.map(function (word) {
    return word.toLowerCase().trim().replace('.', '');
  });
  //Fill the wordlist with the incorrect word pairs
  getIncorrectWords(dictionary, wordArray);
  // Look through our wordlist, check to make sure the missing letter is just a one char val difference, if not, we ignor it. 
  for (var i = 0; i < wordList.length; i++) {
    var correct = wordList[i][0];
    var wrong = wordList[i][1];
    for (var j = 0; j < correct.length; j++) {
      if (correct.charCodeAt(j) == wrong.charCodeAt(j) - 1) {
        password += correct.charAt(j);
      }
    }
  }
  // When that's finished, we fill in the password and submit the form.
  passInput.value = password;
  passSubmit.click();
  // Gets all of the misspelled words in the block
  function getIncorrectWords(dict, words) {
    for (var i = 0; i < words.length; i++) {
      if (dict.indexOf(words[i]) == - 1) {
        getMatches(dict, words[i]);
      }
    }
  }
  // Finds all of the potential correct matches for our misspelled words.
  function getMatches(dict, word) {
    for (var i = 0; i < dict.length; i++) {
      if (dict[i].length == word.length) {
        var wc = 0;
        for (var j = 0; j < dict[i].length; j++) {
          if (dict[i][j] != word[j]) {
            wc++;
          }
        }
        if (wc == 1) {
          wordList.push([dict[i],
          word]);
        }
      }
    }
  }
}) ();
