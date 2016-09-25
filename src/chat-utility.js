'use strict';

import CreateJson from './create-json.js';
import FavWords from './favourite-words.js';
import MostUsedWords from './most-used-words.js';

const fs = require('fs');

// filename from argument
var fullFilename = process.argv.slice(2).toString(),
  chatToJson;

let fnArr = fullFilename.split("/"),
  fn = fnArr[fnArr.length - 1];

if ( fn ) {
  fs.readFile(`./txt/${fn}`, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    // create JSON
    const json = new CreateJson(data),
      jsonString = JSON.stringify(json),
      jsonTarget = `./json/${fn.slice(0,-4)}.json`;

    if ( jsonString && jsonTarget ) {
      fs.writeFile(jsonTarget, jsonString, (err) => {
        if ( err ) {
          throw err;
        }

        console.log(`Saved to ${jsonTarget}.`);
      });
    }

    // create FavWords
    const favWords = new FavWords(json),
      favWordsJsonString = JSON.stringify(favWords),
      favWordsJsonTarget = `./json/${fn.slice(0,-4)}-fav-words.json`;

    if ( favWordsJsonString && favWordsJsonTarget ) {
      fs.writeFile(favWordsJsonTarget, favWordsJsonString, (err) => {
        if ( err ) {
          throw err;
        }

        console.log(`Saved to ${favWordsJsonTarget}.`);
      });
    }

    // create most used words
    const mostUsedWords = new MostUsedWords(favWords),
      mostUsedWordsJsonString = JSON.stringify(mostUsedWords),
      mostUsedWordsJsonTarget = `./json/${fn.slice(0,-4)}-most-used-words.json`;

    if (mostUsedWordsJsonString && mostUsedWordsJsonTarget) {
      fs.writeFile(mostUsedWordsJsonTarget, mostUsedWordsJsonString, (err) => {
        if ( err ) {
          throw err;
        }

        console.log(`Saved to ${mostUsedWordsJsonTarget}.`);
      });
    }
  });
} else {
  console.log('No filename specified.');
}
