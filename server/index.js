const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const { logger, middlewareLogger } = require("./helpers/logger");
require("./connectdb");
const client = require("./connectredis");
const authRouter = require("./routes/auth");
const newsRouter = require("./routes/news");
const userRouter = require("./routes/user");
dotenv.config();
const Port = process.env.PORT;
const app = express();

client.connect();
app.use(middlewareLogger);
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
/* ROUTES */
app.use("/auth", authRouter);
app.use("/news", newsRouter);
app.use("/user", userRouter);

/* UNHANDELED ERRORS */
app.use((err, req, res, next) => {
  logger.error("UNHANDELED ERROR", err.message);
  const status = err.statusCode || 500;
  return res.status(status)
    .send({
      error: err.errors || {},
      message: err.message || "something went wrong",
    });
});

app.listen(Port, () => logger.info(`App is up on http://localhost:${Port}`));
