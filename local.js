require("dotenv").config();

const { handler } = require(".");
const { FUNDING_TO_MAIN } = require("./constants");

handler({
  apiKey: process.env.APP_KEY,
  type: FUNDING_TO_MAIN
});
