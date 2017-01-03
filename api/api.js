const request = require("request");
// require("dotenv").config();

module.exports = {
    getEvents : function(url)  {
        return request(url, function(error, response, body)  {
        if (!error & response.statusCode == 200)   {
            console.log("working", body)
        } else  {
            console.log("not working", err)
        }
    })  
  }
}