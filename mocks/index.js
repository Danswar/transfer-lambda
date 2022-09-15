const WALLET_BALANCE_RESPONSE = {
  data: [
    {
      asset: "USDT",
      free: "4",
      locked: "0",
      freeze: "0",
      withdrawing: "0",
      btcValuation: "0.00019832"
    },
    {
      asset: "BUSD",
      free: "0",
      locked: "0",
      freeze: "1",
      withdrawing: "0",
      btcValuation: "0.00004958"
    }
  ]
};

const TRANSFER_RESPONSE = { data: { tranId: 116993304342 } };

module.exports = {
  WALLET_BALANCE_RESPONSE,
  TRANSFER_RESPONSE
};
