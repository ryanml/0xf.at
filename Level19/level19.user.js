// ==UserScript==
// @name        Level 19
// @namespace   https://github.com/ryanml
// @description Solves and submits level 19 of 0xf.at
// @include     https://0xf.at/play/19
// @include     https://0xf.at/play/19?pw=
// @version     1
// @grant       none
// ==/UserScript==
(function () {
  // Get the dom elements we need to work with
  var code = document.getElementsByTagName('code') [0].innerHTML;
  var passwordField = document.getElementById('pw');
  var submit = document.getElementsByTagName('input') [1];
  // An array of objects representing each phone key and their respective letters
  var phoneKeys = [
    {
      no: 2,
      lets: 'abc'
    },
    {
      no: 3,
      lets: 'def'
    },
    {
      no: 4,
      lets: 'ghi'
    },
    {
      no: 5,
      lets: 'jkl'
    },
    {
      no: 6,
      lets: 'mno'
    },
    {
      no: 7,
      lets: 'pqrs'
    },
    {
      no: 8,
      lets: 'tuv'
    },
    {
      no: 9,
      lets: 'wxyz'
    }
  ];
  // Create an array of characters from the <code> tag
  var codeChars = [...code];
  // Blank solution array, to be filled with integers
  var solutionArray = [];
  for (var k = 0; k < codeChars.length; k++) {
    // Numbers in the <code> tag just equal themselves, so if char is number, push it to solution array
    if (!isNaN(codeChars[k])) {
      solutionArray.push(parseInt(codeChars[k]));
    }
    else {
      // If it is a letter, loop through phone key objects
      for (var i = 0; i < phoneKeys.length; i++) {
        // If the letter is in the phone key
        if (phoneKeys[i].lets.indexOf(codeChars[k]) > -1) {
          // Add the appropriate number of phone keys presses to solution array (pos + 2)
          var index = phoneKeys[i].lets.indexOf(codeChars[k]) + 2;
          for (var y = 0; y < index; y++) {
            solutionArray.push(phoneKeys[i].no);
          }
        }
      }
    }
  }
  // Using reduce, we add all numbers together in the solution array
  var answer = solutionArray.reduce((cur, prev) => cur + prev);
  // Put answer in password field and click submit
  passwordField.value = answer;
  submit.click();
})();
