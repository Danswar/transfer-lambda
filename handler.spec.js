const { Spot } = require("@danswar/binance-connector-node");
const { handler } = require("./index");
const { MAIN_TO_FUNDING, FUNDING_TO_MAIN } = require("./constants");
const { WALLET_BALANCE_RESPONSE, TRANSFER_RESPONSE } = require("./mocks");

jest.mock("@danswar/binance-connector-node");

describe("test", () => {
  const fundingWallet = jest.spyOn(Spot.prototype, "fundingWallet");
  const userAsset = jest.spyOn(Spot.prototype, "userAsset");
  const userUniversalTransfer = jest.spyOn(
    Spot.prototype,
    "userUniversalTransfer"
  );

  beforeEach(() => {
    Spot.mockClear();
    fundingWallet.mockClear().mockImplementation(() => WALLET_BALANCE_RESPONSE);
    userAsset.mockClear().mockImplementation(() => WALLET_BALANCE_RESPONSE);
    userUniversalTransfer
      .mockClear()
      .mockImplementation(() => Promise.resolve(TRANSFER_RESPONSE));
  });

  it("should not create instances of client if event is not correct shaped", async () => {
    await handler(null);
    await handler({});
    await handler({ type: "" });
    await handler({ type: "random-thing" });

    expect(Spot).toHaveBeenCalledTimes(0);
  });

  it("should transfer assets from funding to spot when type is FUNDING_MAIN", async () => {
    fundingWallet.mockImplementationOnce(() => ({
      data: [
        {
          asset: "ASSET_NAME",
          free: "1"
        }
      ]
    }));

    await handler({ type: FUNDING_TO_MAIN });

    expect(userUniversalTransfer).toHaveBeenCalledTimes(1);
    expect(userUniversalTransfer).toHaveBeenCalledWith(
      FUNDING_TO_MAIN,
      "ASSET_NAME",
      "1"
    );
    expect(fundingWallet).toHaveBeenCalledTimes(1);
    expect(userAsset).toHaveBeenCalledTimes(0);
  });

  it("should transfer assets from spot to funding when type is MAIN_FUNDING", async () => {
    userAsset.mockImplementationOnce(() => ({
      data: [
        {
          asset: "ASSET_NAME",
          free: "1"
        }
      ]
    }));

    await handler({ type: MAIN_TO_FUNDING });

    expect(userUniversalTransfer).toHaveBeenCalledTimes(1);
    expect(userUniversalTransfer).toHaveBeenCalledWith(
      MAIN_TO_FUNDING,
      "ASSET_NAME",
      "1"
    );
    expect(userAsset).toHaveBeenCalledTimes(1);
    expect(fundingWallet).toHaveBeenCalledTimes(0);
  });
});
