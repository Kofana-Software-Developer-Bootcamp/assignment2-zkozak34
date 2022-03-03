const requestCalculator = require("../scripts/helper");
const httpStatus = require("http-status");

const add = (req, res) => {
  requestCalculator([req.query.intA, req.query.intB], "Add")
    .then((response) => res.status(httpStatus.OK).send(response.data))
    .catch((error) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error));
};

const divide = (req, res) => {
  requestCalculator([req.query.intA, req.query.intB], "Divide")
    .then((response) => res.status(httpStatus.OK).send(response.data))
    .catch((error) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error));
};

const multiply = (req, res) => {
  requestCalculator([req.query.intA, req.query.intB], "Multiply")
    .then((response) => res.status(httpStatus.OK).send(response.data))
    .catch((error) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error));
};

const subtract = (req, res) => {
  requestCalculator([req.query.intA, req.query.intB], "Subtract")
    .then((response) => res.status(httpStatus.OK).send(response.data))
    .catch((error) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error));
};

module.exports = {
  add,
  divide,
  multiply,
  subtract,
};
