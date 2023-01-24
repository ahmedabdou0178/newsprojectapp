const User = require("../models/User.js");
const dotenv = require("dotenv");
const newsFromSources = require("../helpers/newsFromSources");
const fetch = require("node-fetch");
const _ = require("lodash");
const client = require("../connectredis.js");
const { logger } = require("../helpers/logger.js");

dotenv.config();

/* GET ALL SOURCES */
const getSources = async (req, res, next) => {
  try {
    const reply = await client.get("sources");
    if (reply)
      return res
        .status(200)
        .send({ message: "cahched", sources: JSON.parse(reply) });

    const url = `https://newsapi.org/v2/top-headlines/sources?apiKey=${process.env.API_KEY}`;
    const data = await fetch(url, {
      method: "GET",
    });
    const { sources } = await data.json();
    await client.set("sources", JSON.stringify(sources), "EX", 60 * 60);
    return res.status(200).send({ sources });
  } catch (err) {
    next(err);
  }
};

/* GET NEWS FROM SOURCES*/
const getNews = async (req, res, next) => {
  try {
    const id = req.user;
    const { sources } = await User.findById(id);
    if (sources.length === 0)
      return res
        .status(200)
        .send({ message: "You don't have any subscriptions", sources: [] });
    newsFromSources(sources, process.env.API_KEY)
      .then((data) => res.status(200).send({ data }))
      .catch((error) => next(error));
    return;
  } catch (err) {
    next(err);
  }
};

/* GET MOST SUBSCRIBED */
const getMostSubscribed = async (req, res, next) => {
  try {
    const reply = await client.get("top5");
    if (reply) {
      return res
        .status(200)
        .send({ message: "cached", top5: JSON.parse(reply) });
    }
    const users = await User.find();
    const sources = users.flatMap((user) => user.sources);
    const data = _.map(_.countBy(sources), (value, key) => ({
      id: key,
      subscribers: value,
    })).sort((a, b) => b.subscribers - a.subscribers);
    const top5 = _.take(data, 5);
    await client.set("top5", JSON.stringify(top5), "EX", 2 * 60);
    return res.status(200).send({ top5 });
  } catch (err) {
    next(err);
  }
};

module.exports = { getSources, getNews, getMostSubscribed };
