module.exports = function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://elector-servidor.herokuapp.com/"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
};
