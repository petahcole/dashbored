const request = require('request');


module.exports = (function() {

  const ENDPOINT = `https://webhose.io/search?token=3cae7ae3-71d5-45cc-a0b1-5ab0fd08da19`

  const getNews = function() {
    return new Promise(function (resolve, reject) {
      request(ENDPOINT, function(err, res, body) {
        if (!err) {
          resolve(body);
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
