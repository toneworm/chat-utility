'use strict';

const fs = require('fs');

// filename from argument
var fullFilename = process.argv.slice(2).toString(),
  chatToJson;

let fnArr = fullFilename.split("/"),
  fn = fnArr[fnArr.length - 1];

if ( fn ) {
  fs.readFile(`./json/${fn}`, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    const favWords = new FavouriteWords(data);
  });
} else {
  console.log('No filename specified.');
}

class FavouriteWords {
  constructor(data) {
    let json = JSON.parse(data),
      entries = json.entries;

    // split words to users
    this.words = {};
    this.userWords = {};

    for ( var i = 0, len = entries.length; i < len; i ++ ) {
      let entry = entries[i],
        entryWords = this.splitSentence(entry);
    }

    this.showFavouriteWords(this.words);

    // write to json file
    let jsonString = JSON.stringify(this.userWords),
      jsonTarget = `./json/${fn.slice(0,-5)}-fav-words.json`;

    if ( jsonString && jsonTarget ) {
      fs.writeFile(jsonTarget, jsonString, (err) => {
        if ( err ) {
          throw err;
        }

        console.log(`Saved to ${jsonTarget}.`);
      });
    }
  }

  showFavouriteWords(wordsObj) {

    for ( var i in wordsObj ) {
      // create user obj
      let userWordsObj = {},
        userWords = wordsObj[i].sort();

      for ( var w = 0, len = userWords.length; w < len; w ++ ) {
        if ( !userWordsObj[userWords[w]] ) {
          userWordsObj[userWords[w]] = 0;
        }

        userWordsObj[userWords[w]] += 1;
      }

      this.userWords[i] = userWordsObj;
    }
  }

  splitSentence(entry) {
    const charRe = /[\(\)\{\}\[\],.\/:0-9\-!?]/g;

    let sentence = entry.content.replace(charRe, '');

    if ( !this.words[entry.user] ) {
      this.words[entry.user] = [];
    }

    // concatenate new words and filter out common words
    this.words[entry.user] = this.words[entry.user].concat(sentence.split(/\s+/).filter(this.filterWords));
  }

  filterWords(word) {
    // filter words, check word length
    let wordRe = /^(and|or|the|why|how|but|this|that|is|are|our|from|of|with|yeh|yeah|not|can|too|what|got)$/i;

    if ( word.length < 2 || word.length > 20 || wordRe.test(word) ) {
      return false;
    }

    return true;
  }
}

module.exports = FavouriteWords;
