'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MostUsedWords = function () {
  function MostUsedWords(data) {
    _classCallCheck(this, MostUsedWords);

    var allFreqs = {},
        allFreqsArr = [];

    // flatten data and sort
    var flatData = this.flattenData(data);

    // form new arr
    var allFreqs = {};

    var _loop = function _loop(i) {
      var item = flatData[i],
          itemWord = item.word;

      if (!allFreqs[itemWord]) {
        var mostUsed = flatData.find(function (i) {
          return i.word === itemWord;
        });

        allFreqs[itemWord] = {
          word: itemWord,
          freq: 0,
          mostUsed: mostUsed.freq,
          user: mostUsed.user
        };
      }

      allFreqs[itemWord].freq += item.freq;
    };

    for (var i = 0; i < flatData.length; i++) {
      _loop(i);
    }

    for (var _i = 0, iKeys = Object.keys(allFreqs); _i < iKeys.length; _i++) {
      allFreqsArr.push(allFreqs[iKeys[_i]]);
    }

    // sort data
    allFreqsArr.sort(function (a, b) {
      return a.freq > b.freq ? -1 : a.freq < b.freq ? 1 : 0;
    });

    return allFreqsArr;
  }

  _createClass(MostUsedWords, [{
    key: 'flattenData',
    value: function flattenData(data) {

      var flatData = [];

      for (var u = 0, uKeys = Object.keys(data); u < uKeys.length; u++) {
        var userArr = data[uKeys[u]];

        for (var i = 0, len = userArr.length; i < len; i++) {
          var item = userArr[i];
          flatData.push({
            'word': item.word,
            'freq': item.freq,
            'user': uKeys[u]
          });
        }
      }

      // sort flat data
      flatData.sort(function (a, b) {
        return a.freq > b.freq ? -1 : a.freq < b.freq ? 1 : 0;
      });

      return flatData;
    }
  }]);

  return MostUsedWords;
}();

module.exports = MostUsedWords;