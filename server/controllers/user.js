const User = require("../models/User.js");
const _ = require("lodash");
const CustomError = require("../helpers/CustomError");

const subscribe = async (req, res, next) => {
  try {
    const id = req.user;
    const { sourceId } = req.params;
    if (!sourceId)
      throw new CustomError(403, "NOT ALLOWED", "No sourceId recieved");
    const user = await User.findById(id);
    if (user.sources.includes(sourceId))
      return res.status(405).send({status:405, message: "already subscribed", user });
    user.sources = _.compact(user.sources.concat(sourceId));
    await user.save();
    return res.status(200).send({ status:200,message: "subscribed successfully", user });
  } catch (err) {
    next(err);
  }
};

const unsubscribe = async (req, res, next) => {
  try {
    const id = req.user;
    const { sourceId } = req.params;
    if (!sourceId)
      if (!sourceId)
        throw new CustomError(403, "NOT ALLOWED", "No sourceId Recived");
    const user = await User.findById(id);
    if (!_.includes(user.sources, sourceId))
      return res.status(405).send({status:405, message: "you are not subscribed", user });
    user.sources = user.sources.filter((source) => source != sourceId);
    await user.save();
    return res.status(200).send({status:200, message: "unsubscribed successfully", user });
  } catch (err) {
    next(err);
  }
};

module.exports = { subscribe, unsubscribe };
