const httpStatus = require("http-status");

const checkNumbers = (req, res, next) => {
  let numbers = { intA: req.query?.intA, intB: req.query?.intB };
  if (numbers.intA && !isNaN(numbers.intA) && numbers.intB && !isNaN(numbers.intB)) {
    return next();
  }
  res.status(httpStatus.BAD_REQUEST).send("Query olarak intA ve intB sayılarını gönderiniz.");
};

module.exports = checkNumbers;
