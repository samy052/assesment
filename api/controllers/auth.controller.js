import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import { UserModel } from "../models/user.model.js";

export const signup = async (req, res, next) => {
  const { username, password, email } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new UserModel({
    username,
    password: hashedPassword,
    email,
  });
  try {
    await newUser.save();
    res.status(201).json("User Created Successfully ");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await UserModel.findOne({ email });
    if (!validUser) return next(errorHandler("User Not Found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler("Wrong Password"));
    const token = jwt.sign({ id: validUser._id }, process.env.STRING);
    const userObject = validUser.toObject();
    const { password: pass, ...rest } = userObject;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
