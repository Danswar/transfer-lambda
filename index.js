const { Spot } = require("@danswar/binance-connector-node");
const { Signer } = require("./Signer");
const { MAIN_TO_FUNDING, FUNDING_TO_MAIN } = require("./constants");

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

const getBalancesOriginWallet = async (type, client) => {
  switch (type) {
    case MAIN_TO_FUNDING:
      return client.userAsset();

    case FUNDING_TO_MAIN:
      return client.fundingWallet();

    default:
      throw "not valid type";
  }
};

exports.handler = async event => {
  if (!isEventDataValid(event)) return console.log("Not valid event");

  const { apiKey, type } = event;
  const signer = new Signer(apiKey);
  const client = new Spot(signer);
  const { data: balances } = await getBalancesOriginWallet(type, client);

  balances
    .filter(({ free }) => free !== "0")
    .forEach(({ asset, free }) =>
      client
        .userUniversalTransfer(type, asset, free)
        .then(r => console.log({ asset, free, ...r.data }))
    );
};
