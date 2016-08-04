'use strict';

const fs = require('fs');

// filename from argument
var fullFilename = process.argv.slice(2).toString(),
    chatToJson;

let fnArr = fullFilename.split("/"),
    fn = fnArr[fnArr.length - 1];

if (fn) {
  fs.readFile(`./txt/${ fn }`, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    let json = new ChatToJson(data),
        jsonString = JSON.stringify(json),
        jsonTarget = `./json/${ fn.slice(0, -4) }.json`;

    if (jsonString && jsonTarget) {
      fs.writeFile(jsonTarget, jsonString, err => {
        if (err) {
          throw err;
        }

        console.log(`Saved to ${ jsonTarget }.`);
      });
    }
  });
} else {
  console.log('No filename specified.');
}

class ChatToJson {
  constructor(data) {

    let textArr = data.split('\n'),
        entriesArr = [];

    for (let i = 0, len = textArr.length; i < len; i++) {

      if (textArr[i].length > 22) {
        let entry = {},
            entryStr = '',
            textStrDateChunk = textArr[i].slice(0, 20),
            textStrTextChunk = textArr[i].slice(22);

        // check for colon ( verify is user comment )
        let textStrTextChunkIndex = textStrTextChunk.indexOf(':');
        if (textStrTextChunkIndex >= 0) {
          let content = this.validateContent(textStrTextChunk.slice(textStrTextChunkIndex + 2));

          if (content) {
            entry.content = content;
            entry.date = this.formatDate(textStrDateChunk);
            entry.user = textStrTextChunk.slice(0, textStrTextChunkIndex);

            entriesArr.push(entry);
          }
        }
      }
    }

    return {
      entries: entriesArr
    };
  }

  validateContent(str) {
    str = str.replace(/[\r\n]+/g, '').trim();
    if (str.length && str !== "<image omitted>" && str !== "<audio omitted>" && str !== "<video omitted>") {
      return str;
    }

    return null;
  }

  formatDate(str) {

    let strToInt = (r1, r2) => {
      return parseInt(str.slice(r1, r2));
    };

    let D = strToInt(0, 2),
        M = strToInt(3, 5) - 1,
        Y = strToInt(6, 10),
        h = strToInt(12, 14),
        m = strToInt(15, 17),
        s = strToInt(18, 20);

    return new Date(Y, M, D, h, m, s);
  }
}

module.exports = ChatToJson;