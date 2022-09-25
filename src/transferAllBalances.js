const { Spot } = require("@danswar/binance-connector-node");
const { Signer } = require("./Signer");
const { MAIN_TO_FUNDING, FUNDING_TO_MAIN } = require("../constants");

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

const transferAllBalances = async ({ apiKey, type }) => {
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

module.exports.transferAllBalances = transferAllBalances;
