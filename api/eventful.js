const request = require("request");
const R = require('Ramda');
const makeUrl = require('./helpers/make-url');

module.exports = (function() {
  const ENDPOINT = 'http://api.eventful.com/json/events/search?app_key=Pn2LhKWMVtMGjCN4';

  const getEvents = function(queryObj) {
    let url = makeUrl(ENDPOINT, queryObj);
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
    getEvents
  };


})();
