const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const client = require("../connectredis");
const { Validator } = require("node-input-validator");
const CustomError = require("../helpers/CustomError");

const dotenv = require("dotenv");
dotenv.config();

/* REGISTER USER */
const register = async (req, res, next) => {
  const v = new Validator(req.body, {
    fullName: "required|minLength:8|maxLength:50",
    email: "required|email",
    password: "required|minLength:8|maxLength:20",
  });
  try {
    const matched = await v.check();
    if (!matched) throw new CustomError(422, "Validation Error", v.errors);
    const { fullName, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    return res.status(201).send({ savedUser });
  } catch (err) {
    next(err);
  }
};

/* LOGIN USER */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw CustomError.INVALID;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      user.loginAttempts.unshift({
        time: Date.now(),
        ip: req.ip,
        success: false,
      });
      if (user.loginAttempts.length > 10) user.loginAttempts.length = 10;
      await user.save();
      throw CustomError.INVALID;
    }
    user.loginAttempts.unshift({
      time: Date.now(),
      ip: req.ip,
      success: true,
    });
    if (user.loginAttempts.length > 10) user.loginAttempts.length = 10;
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).send({ token, user });
  } catch (err) {
    next(err);
  }
};

/* VERIFY TOKEN */
const verifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw CustomError.INVALID_JWT;
    
    if (authorization.startsWith("A3bdou ")) {
      token = authorization.replace("A3bdou ", "");
    }
    const reply = await client.get(token);
    if (reply === "revoked") { 
      throw CustomError.INVALID_JWT;
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(!verified) throw CustomError.INVALID_JWT;
    req.user = verified.id;
    next();
  } catch (err) {
    err.statusCode=401
    next(err);
  }
};

/* LOGOUT USER */
const logout = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.replace("A3bdou ", "");
    await client.set(token, "revoked", "EX", 60 * 60); // 1 hr
    return res.status(200).send({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, verifyToken, logout };
