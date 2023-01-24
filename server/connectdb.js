const mongoose = require("mongoose");
const {logger} = require('./helpers/logger');
const dotenv = require("dotenv");
dotenv.config();


const URI = process.env.MONGO_URL||"mongodb://127.0.0.1:27017/newsproject";
const options = { serverSelectionTimeoutMS: 3000 };

mongoose
  .connect(URI, options)
  .then(() => logger.info("Successfully connected to MongoDB"))
  .catch((error) => logger.error(error,`URL : ${URI}`));

mongoose.connection.on("error", (err) => {
  logger.error("Error from DB",err, `URL : ${URI}`);
});
