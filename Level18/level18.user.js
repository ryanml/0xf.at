// ==UserScript==
// @name        Level 18
// @namespace   https://github.com/ryanml
// @description Solves and submits level 18 of 0xf.at
// @include     https://0xf.at/play/18
// @include     https://0xf.at/play/18?pw=
// @version     1
// @grant       none
// ==/UserScript==
(function () {
  // Get the dom elements we need to work with
  var code = document.getElementsByTagName('code') [0].textContent;
  var passwordField = document.getElementById('pw');
  var submit = document.getElementsByTagName('input') [1];
  // Morse code dictionary
  var morseDict = {
    '.−': 'a',
    '−...': 'b',
    '−.−.': 'c',
    '−..': 'd',
    '.': 'e',
    '..−.': 'f',
    '−−.': 'g',
    '....': 'h',
    '..': 'i',
    '.−−−': 'j',
    '−.−': 'k',
    '.−..': 'l',
    '−−': 'm',
    '−.': 'n',
    '−−−': 'o',
    '.−−.': 'p',
    '−−.−': 'q',
    '.−.': 'r',
    '...': 's',
    '−': 't',
    '..−': 'u',
    '...−': 'v',
    '.−−': 'w',
    '−..−': 'x',
    '−.−−': 'y',
    '−−..': 'z',
    '.−−−−': '1',
    '..−−−': '2',
    '...−−': '3',
    '....−': '4',
    '.....': '5',
    '−....': '6',
    '−−...': '7',
    '−−−..': '8',
    '−−−−.': '9',
    '−−−−−': '0'
  };
  // Map through the morse code characters, reference the dictionary, and create solution
  var solution = code.split(' ').map((m) => morseDict[m]).join('');
  // Fill in the password field
  passwordField.value = solution;
  // Hit the submit button
  submit.click();
}) ();
