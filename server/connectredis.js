const { logger } = require("./helpers/logger");
const { createClient } = require("redis");
const dotenv = require("dotenv");
dotenv.config();
const url =process.env.REDIS_URL||"redis://127.0.0.1:6379"
const client = createClient({ url});

client.on("connect", () => {
  logger.info(`url: ${url}`,"Redis client connected");
});

client.on("error", (err) => {
  logger.error("Redis Client Error",`url: ${url}`, err);
});

module.exports = client;
