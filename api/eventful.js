const request = require("request");
const R = require('ramda');
const makeUrl = require('./helpers/make-url');

module.exports = (function() {
  const ENDPOINT = 'http://api.eventful.com/json/events/search?app_key=Pn2LhKWMVtMGjCN4';


  function filterInfo(obj) {
    return obj.events.event.map((event) => {
      return {
        title: event.title,
        image: event.image,
        venueName: event.venue_name,
        url: event.url,
        venueAddress: event.venue_address,
        startTime: event.start_time,
        description: event.description,
        performers: event.performers
      }
    });
  }

  const getEvents = function(queryObj) {
    let url = makeUrl(ENDPOINT, queryObj);
    return new Promise(function (resolve, reject) {
      request(url, function(err, res, body) {
        if (!err) {
          resolve(filterInfo(JSON.parse(body)));
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
