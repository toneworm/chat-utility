'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChatToJson = function () {
  function ChatToJson(data) {
    _classCallCheck(this, ChatToJson);

    var textArr = data.split('\n'),
        entriesArr = [];

    for (var i = 0, len = textArr.length; i < len; i++) {

      if (textArr[i].length > 22) {
        var entry = {},
            entryStr = '',
            textStrDateChunk = textArr[i].slice(0, 20),
            textStrTextChunk = textArr[i].slice(22);

        // check for colon ( verify is user comment )
        var textStrTextChunkIndex = textStrTextChunk.indexOf(':');
        if (textStrTextChunkIndex >= 0) {
          var content = this.validateContent(textStrTextChunk.slice(textStrTextChunkIndex + 2));

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

  _createClass(ChatToJson, [{
    key: 'validateContent',
    value: function validateContent(str) {
      str = str.replace(/[\r\n]+/g, '').trim();
      if (str.length && str !== "<image omitted>" && str !== "<audio omitted>" && str !== "<video omitted>") {
        return str;
      }

      return null;
    }
  }, {
    key: 'formatDate',
    value: function formatDate(str) {

      var strToInt = function strToInt(r1, r2) {
        return parseInt(str.slice(r1, r2));
      };

      var D = strToInt(0, 2),
          M = strToInt(3, 5) - 1,
          Y = strToInt(6, 10),
          h = strToInt(12, 14),
          m = strToInt(15, 17),
          s = strToInt(18, 20);

      return new Date(Y, M, D, h, m, s);
    }
  }]);

  return ChatToJson;
}();

module.exports = ChatToJson;