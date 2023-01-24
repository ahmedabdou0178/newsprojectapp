const mongoose = require("mongoose");
const _ = require("lodash");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    loginAttempts: {
      type: Array,
      default: [],
    },
    sources: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => _.omit(ret, ["__v", "password"]),
    },
  }
);

module.exports = mongoose.model("User", UserSchema);
