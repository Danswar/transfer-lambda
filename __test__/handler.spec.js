const { transferAllBalances } = require("../src/transferAllBalances");
const { handler } = require("../index");

jest.mock("@danswar/binance-connector-node");
jest.mock("../src/transferAllBalances");

describe("test", () => {
  beforeEach(() => {
    transferAllBalances.mockClear();
  });

  it("should not create instances of client if event is not correct shaped", async () => {
    await handler(null);
    await handler({});
    await handler({ type: "" });
    await handler({ type: "random-thing" });

    expect(transferAllBalances).toHaveBeenCalledTimes(0);
  });
});
