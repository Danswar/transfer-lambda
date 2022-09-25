const { MAIN_TO_FUNDING, FUNDING_TO_MAIN } = require("./constants");
const { transferAllBalances } = require("./src/transferAllBalances");

const eventCheckers = [
  event => Boolean(event),
  ({ type }) => Boolean(type),
  ({ type }) => type === MAIN_TO_FUNDING || type === FUNDING_TO_MAIN,
  ({ apiKey }) => Boolean(apiKey)
];

const isEventDataValid = event => {
  const isValid = eventCheckers.every(checker => checker(event));
  return isValid;
};

exports.handler = async event => {
  if (isEventDataValid(event)) {
    const { apiKey, type } = event;
    await transferAllBalances({ apiKey, type });
  } else {
    console.log("Not valid event");
  }
};
