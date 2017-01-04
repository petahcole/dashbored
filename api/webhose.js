const request = require('request');
const R = require('ramda');
const makeUrl = require('./helpers/make-url');


module.exports = (function() {

  const ENDPOINT = `https://webhose.io/search?token=3cae7ae3-71d5-45cc-a0b1-5ab0fd08da19&language=english`;


  function filterInfo(obj) {
    return obj.posts.map((post) => {
      return {
        thread: post.thread,
        text: post.text
      }
    });
  }

  const getNews = function(queryObj) {
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
    getNews
  }
})();
