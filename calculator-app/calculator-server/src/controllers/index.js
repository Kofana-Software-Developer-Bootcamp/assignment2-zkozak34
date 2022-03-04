const { requestCalculator, xmlParser } = require("../scripts/helper");
const httpStatus = require("http-status");

const add = (req, res) => {
  requestCalculator([req.query.intA, req.query.intB], "Add")
    .then((response) => {
      let data = response.data;
      res.status(httpStatus.OK).send(xmlParser(data, "AddResult"));
    })
    .catch((error) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error));
};

const divide = (req, res) => {
  requestCalculator([req.query.intA, req.query.intB], "Divide")
    .then((response) => {
      let data = response.data;
      res.status(httpStatus.OK).send(xmlParser(data, "DivideResult"));
    })
    .catch((error) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error));
};

const multiply = (req, res) => {
  requestCalculator([req.query.intA, req.query.intB], "Multiply")
    .then((response) => {
      let data = response.data;
      res.status(httpStatus.OK).send(xmlParser(data, "MultiplyResult"));
    })
    .catch((error) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error));
};

const subtract = (req, res) => {
  requestCalculator([req.query.intA, req.query.intB], "Subtract")
    .then((response) => {
      let data = response.data;
      res.status(httpStatus.OK).send(xmlParser(data, "SubtractResult"));
    })
    .catch((error) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error));
};

module.exports = {
  add,
  divide,
  multiply,
  subtract,
};
