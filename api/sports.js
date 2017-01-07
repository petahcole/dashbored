const request = require('request');
const R = require('ramda');
const makeUrl = require('./helpers/make-url');


module.exports = (function() {

  const ENDPOINT = `https://newsapi.org/v1/articles?`;

  function filterInfo(obj) {
    return obj.articles.map(function(article){
      return R.dissoc("publishedAt", article)
    })
  }

  const getSports = function(queryObj) {
    console.log("CALLING SPORTS API");
    let url = makeUrl(ENDPOINT, queryObj);
    return new Promise(function (resolve, reject) {
      request(url, function(err, res, body) {
        if (!err) {
          resolve(
            filterInfo(JSON.parse(body))
          );
        } else {
          reject(err);
        }
      });
    });
  }

  return {
    getSports
  }
})();
