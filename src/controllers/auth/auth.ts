import { Request, Response } from "express";
import User from "../../models/User";
import {
  generateAccessToken,
  generatereFreshToken,
  hashedPassword,
  decryptPassword,
  verifyToken,
} from "../../common/auth";
import { RoleCode } from "../../common/enums";

const signup = async (req: Request, res: Response) => {
  const { fullname, email, password, isAdmin, isSuperAdmin } = req.body;
  try {
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User email already exists" });
    }

    const checkname = await User.findOne({ fullname });
    if (checkname) {
      return res.status(400).json({ message: "User name already exists" });
    }

    const hashPassword = await hashedPassword(password);
    const user = await User.create({
      fullname,
      email,
      password: hashPassword,
      role:
        (isAdmin && RoleCode.Admin) || (isSuperAdmin && RoleCode.SuperAdmin),
    });
    res.status(201).json({ user });
  } catch (err) {}
};

const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credenntials" });
    }
    const isMatch = await decryptPassword(password, user?.password);
    if (!isMatch) {
      res.status(400).json({ message: "email/password not valid" });
    }
    const accessToken = generateAccessToken(
      user._id.toString(),
      user.role,
      user.email
    );
    const refreshToken = generatereFreshToken(
      user._id.toString(),
      user.role,
      user.email
    );
    res.status(200).json({ user, accessToken, refreshToken });
  } catch (err) {}
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const rf_token = req.body.refreshToken;
    if (!rf_token)
      return res.status(400).json({ message: "Please Login or Register" });

    const newTokens = verifyToken(rf_token);
    res.json(newTokens);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
const signout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
    return res.json({ msg: "Logged out" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

export { signin, signup, signout, refreshToken };
