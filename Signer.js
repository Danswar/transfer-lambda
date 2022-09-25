const crypto = require("crypto");
class Signer {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  getApiKey() {
    return this.apiKey;
  }

  async signMessage(msg) {
    const signature = crypto
      .createHmac("sha256", process.env.APP_SECRET)
      .update(msg)
      .digest("hex");

    return signature;
  }
}

module.exports.Signer = Signer;
