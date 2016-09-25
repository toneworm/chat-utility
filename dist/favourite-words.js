'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FavouriteWords = function () {
  function FavouriteWords(data) {
    _classCallCheck(this, FavouriteWords);

    var entries = data.entries;

    // split words to users
    this.words = {};
    this.userWords = {};
    this.allWords = {};

    for (var i = 0, len = entries.length; i < len; i++) {
      this.splitSentence(entries[i]);
    }

    this.showFavouriteWords(this.words);

    return this.userWords;
  }

  _createClass(FavouriteWords, [{
    key: 'showFavouriteWords',
    value: function showFavouriteWords(wordsObj) {

      var usersObj = {};

      for (var i = 0, userKeys = Object.keys(wordsObj); i < userKeys.length; i++) {
        // create user obj
        var userWordsObj = {},
            userWordsArr = wordsObj[userKeys[i]];

        for (var w = 0, len = userWordsArr.length; w < len; w++) {
          if (!userWordsObj[userWordsArr[w]]) {
            userWordsObj[userWordsArr[w]] = 0;
          }

          userWordsObj[userWordsArr[w]] += 1;
        }

        usersObj[userKeys[i]] = userWordsObj;
      }

      for (i = 0; i < userKeys.length; i++) {
        var user = usersObj[userKeys[i]];
        this.userWords[userKeys[i]] = [];
        for (var fw = 0, fwKeys = Object.keys(user); fw < fwKeys.length; fw++) {
          this.userWords[userKeys[i]].push({
            word: fwKeys[fw],
            freq: user[fwKeys[fw]]
          });
        }
      }
    }
  }, {
    key: 'splitSentence',
    value: function splitSentence(entry) {
      var charRe = /[\(\)\{\}\[\],.\/:0-9\-!?]/g;

      var sentence = entry.content.replace(charRe, '');

      if (!this.words[entry.user]) {
        this.words[entry.user] = [];
      }

      // concatenate new words and filter out common words
      this.words[entry.user] = this.words[entry.user].concat(sentence.split(/\s+/).filter(this.filterWords));
    }
  }, {
    key: 'filterWords',
    value: function filterWords(word) {
      // filter words, check word length
      var wordRe = /^(and|or|the|why|how|but|this|that|is|are|our|from|of|with|yeh|yeah|not|can|too|what|got)$/i;

      if (word.length < 2 || word.length > 20 || wordRe.test(word)) {
        return false;
      }

      return true;
    }
  }]);

  return FavouriteWords;
}();

module.exports = FavouriteWords;