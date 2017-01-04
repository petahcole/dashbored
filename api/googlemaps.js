const request = require("request");
const makeURL = require("./helpers/make-url")

module.exports = (function() {
  const ENDPOINT = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyBd50SVB3miUFoYCAPeJ_-Kw1OJj5LW48U`;

  const findPlace = function(queryObj)    {
          let url = makeURL(ENDPOINT, queryObj);
          return new Promise(function(resolve, reject)   {
              request(url, function(err, res, body)   {
                  if (!err)   {
                      resolve(JSON.parse(body));
                  }   else    {
                      reject(err)
                  }
              })
          })
      }

  return {
    findPlace
  }
})();
