const { handler } = require("./index");

describe("test", () => {
  it("it", async () => {
    const response = await handler();
    expect(response).toBe("hello");
  });
});
