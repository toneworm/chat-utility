(($) => {

  const url = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/11314/bakings_baking-fav-words.json',
    renderLimit = 120,
    renderStart = 100;

  let request = new XMLHttpRequest();

  request.open('GET', url);
  request.addEventListener('load', init);
  request.send();

  function init() {

    const data = JSON.parse(request.responseText);

    console.log('successful init?', data);

    var flatData = [],
      allFreqs = {},
      allFreqsArr = [];

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

    // chop array to render limit
    const limitedAllFreqsArr = allFreqsArr.slice(renderStart,renderStart + renderLimit);

    // d3 test
    const maxFreq = limitedAllFreqsArr[0].freq;

    console.log(allFreqsArr);

    d3.select('.bar-container')
      .selectAll('div')
      .data(limitedAllFreqsArr)
      .enter().append('div')
        .on('mouseover', i => {
          $('.bar-details__word').textContent = i.word;
          $('.bar-details__num_times').textContent = `(used ${i.freq > 2 ? i.freq + ' times' : i.freq > 1 ? ' twice' : ' once'})`;
          $('.bar-details__user').textContent = `[${i.user} said it ${i.mostUsed > 2 ? i.mostUsed + ' times' : i.mostUsed > 1 ? ' twice' : ' once'})`;
        })
        .on('mouseleave', i => {
          // console.log('mouseleave');
        })
        .attr('class','bar-word')
        .style('height', v => `${parseInt(v.freq / maxFreq * 100)}%`);

  }
})(document.querySelector.bind(document));
