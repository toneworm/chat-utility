'use strict';

var _createJson = require('./create-json.js');

var _createJson2 = _interopRequireDefault(_createJson);

var _favouriteWords = require('./favourite-words.js');

var _favouriteWords2 = _interopRequireDefault(_favouriteWords);

var _mostUsedWords = require('./most-used-words.js');

var _mostUsedWords2 = _interopRequireDefault(_mostUsedWords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');

// filename from argument
var fullFilename = process.argv.slice(2).toString(),
    chatToJson;

var fnArr = fullFilename.split("/"),
    fn = fnArr[fnArr.length - 1];

if (fn) {
  fs.readFile('./txt/' + fn, 'utf8', function (err, data) {
    if (err) {
      throw err;
    }

    // create JSON
    var json = new _createJson2.default(data),
        jsonString = JSON.stringify(json),
        jsonTarget = './json/' + fn.slice(0, -4) + '.json';

    if (jsonString && jsonTarget) {
      fs.writeFile(jsonTarget, jsonString, function (err) {
        if (err) {
          throw err;
        }

        console.log('Saved to ' + jsonTarget + '.');
      });
    }

    // create FavWords
    var favWords = new _favouriteWords2.default(json),
        favWordsJsonString = JSON.stringify(favWords),
        favWordsJsonTarget = './json/' + fn.slice(0, -4) + '-fav-words.json';

    if (favWordsJsonString && favWordsJsonTarget) {
      fs.writeFile(favWordsJsonTarget, favWordsJsonString, function (err) {
        if (err) {
          throw err;
        }

        console.log('Saved to ' + favWordsJsonTarget + '.');
      });
    }

    // create most used words
    var mostUsedWords = new _mostUsedWords2.default(favWords),
        mostUsedWordsJsonString = JSON.stringify(mostUsedWords),
        mostUsedWordsJsonTarget = './json/' + fn.slice(0, -4) + '-most-used-words.json';

    if (mostUsedWordsJsonString && mostUsedWordsJsonTarget) {
      fs.writeFile(mostUsedWordsJsonTarget, mostUsedWordsJsonString, function (err) {
        if (err) {
          throw err;
        }

        console.log('Saved to ' + mostUsedWordsJsonTarget + '.');
      });
    }
  });
} else {
  console.log('No filename specified.');
}