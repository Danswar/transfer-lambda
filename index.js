const { Spot } = require("@danswar/binance-connector-node");
const { MAIN_TO_FUNDING, FUNDING_TO_MAIN } = require("./constants");

const eventCheckers = [
  event => Boolean(event),
  ({ type }) => Boolean(type),
  ({ type }) => type === MAIN_TO_FUNDING || type === FUNDING_TO_MAIN
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
  if (!isEventDataValid(event)) {
    console.log("Not valid event");
    return;
  }

  const client = new Spot(process.env.APP_KEY, process.env.APP_SECRET);
  const { data: balances } = await getBalancesOriginWallet(event.type, client);

  balances
    .filter(({ free }) => free !== "0")
    .forEach(({ asset, free }) =>
      client
        .userUniversalTransfer(event.type, asset, free)
        .then(r => console.log({ asset, free, ...r.data }))
    );
};
