// ==UserScript==
// @name        Level22
// @namespace   http://github.com/ryanml
// @description Submits and solves level 22
// @include     https://0xf.at/play/22
// @include     https://0xf.at/play/22?pw=
// @version     1
// @grant       none
// ==/UserScript==
(function () {
  'use strict';
  // Get Elements from the DOM
  var toMirror = document.getElementsByTagName('code') [0].innerHTML;
  var passInput = document.getElementById('pw');
  var passSubmit = document.getElementsByTagName('input') [1];
  // Gets solution
  var solution =
  toMirror +
  toMirror.split('').slice(0, toMirror.length - 1).reverse().join('');
  // Submits solution
  passInput.value = solution;
  passSubmit.click();
}) ();
