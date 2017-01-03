const request = require('request');
const R = require('Ramda');


module.exports = (function() {

  const ENDPOINT = `https://webhose.io/search?token=3cae7ae3-71d5-45cc-a0b1-5ab0fd08da19&language=english`;


  const renderQuery = function(obj) {
    if (!obj) {
      return '';
    } else {
      return '&' + R.toPairs(obj)
        .map(pair => pair.map(words => words.replace(' ', '%20')))
        .map(pair => pair.join('='))
        .join('&');
    }
  }

  const makeUrl = function(queryObj) {
    if (!queryObj) {
      return ENDPOINT;
    } else {
      return ENDPOINT + renderQuery(queryObj);
    }
  }

  const getNews = function(queryObj) {
    let url = makeUrl(queryObj);
    return new Promise(function (resolve, reject) {
      request(url, function(err, res, body) {
        if (!err) {
          resolve(JSON.parse(body));
        } else {
          reject(err);
        }
      });
    });
  }

  return {
    getNews
  }
})();
