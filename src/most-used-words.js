'use strict';

class MostUsedWords {
    constructor(data) {

      var allFreqs = {},
        allFreqsArr = [];

      // flatten data and sort
      var flatData = this.flattenData(data);

      // form new arr
      var allFreqs = {};

      for (let i = 0; i < flatData.length; i ++) {
        const item = flatData[i],
          itemWord = item.word;

        if (!allFreqs[itemWord]) {
          let mostUsed = flatData.find(i => i.word === itemWord);

          allFreqs[itemWord] = {
            word: itemWord,
            freq: 0,
            mostUsed: mostUsed.freq,
            user: mostUsed.user
          }
        }

        allFreqs[itemWord].freq += item.freq;
      }

      for (let i = 0, iKeys = Object.keys(allFreqs); i < iKeys.length; i ++) {
        allFreqsArr.push(allFreqs[iKeys[i]]);
      }

      // sort data
      allFreqsArr.sort((a, b) => a.freq > b.freq ? -1 : a.freq < b.freq ? 1 : 0);

      return allFreqsArr;
    }

    flattenData(data) {

      let flatData = [];

      for (let u = 0, uKeys = Object.keys(data); u < uKeys.length; u ++) {
        let userArr = data[uKeys[u]];

        for (let i = 0, len = userArr.length; i < len; i ++) {
          let item = userArr[i];
          flatData.push({
            'word': item.word,
            'freq': item.freq,
            'user': uKeys[u]
          });
        }
      }

      // sort flat data
      flatData.sort((a, b) => {
        return a.freq > b.freq ? -1 : a.freq < b.freq ? 1 : 0;
      });

      return flatData;
    }
}

module.exports = MostUsedWords;
