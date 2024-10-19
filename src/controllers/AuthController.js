import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthError } from "../classes/AuthError.js";

const saltRounds = 10;
const SECRET = "secret";


export const login = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email: email } });
    asyncCompare(password, user.password);
    let token = jwt.sign({ ...user }, SECRET);
    return token;
  } catch (error) {
    throw new AuthError(404, error.message);
  }
};

export const register = async (email, password) => {
  try {
    await User.create({
      email,
      password: await asyncCrypt(password),
    });
  } catch (error) {
    throw new AuthError(400, error.message);
  }
};

export const logout = async (req, res) => {
  return res.status(200).json({ message: "Logout successful" });
};

function asyncCompare(password, compare) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, compare, (err, result) => {
      if (err) return reject();
      else return resolve();
    });
  });
}

function asyncCrypt(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return reject();
      else return resolve(hash);
    });
  });
}
