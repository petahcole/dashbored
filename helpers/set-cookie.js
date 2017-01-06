module.exports = function setCookie(res, userObj) {
  let tenYearsMilli = 315569260000;
  let options = {
    maxAge: tenYearsMilli
  };
  for (key in userObj) {
    res.cookie(key, userObj[key], options);
  }
}
