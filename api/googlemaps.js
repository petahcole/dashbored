const request = require("request");
const makeURL = require("./helpers/make-url")

module.exports = function() {
const ENDPOINT = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;

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
}