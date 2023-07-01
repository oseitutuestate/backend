import jwt, { Secret, VerifyErrors } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Configs } from "../config/config";
import { Schema } from "mongoose";

const generateAccessToken = (
  userId: string | Schema.Types.ObjectId,
  userRole: string,
  userEmail: string
) => {
  const accessToken = jwt.sign(
    { id: userId, role: userRole, email: userEmail },
    Configs.JWT_SECRET as Secret,
    { expiresIn: "14d" }
  );
  return accessToken;
};

const generatereFreshToken = async (
  userId: string | Schema.Types.ObjectId,
  userRole: string,
  userEmail: string
) => {
  const refreshToken = jwt.sign(
    { id: userId, role: userRole, email: userEmail },
    Configs.REFRESH_TOKEN_SECRET as Secret,
    { expiresIn: "140d" }
  );
  return refreshToken;
};

const verifyToken = async (rftoken: string) => {
  await jwt.verify(
    rftoken,
    Configs.REFRESH_TOKEN_SECRET as Secret,
    (err: any, user: any) => {
      if (err) return { message: "Please Login or Register" };
      const accesstoken = generateAccessToken(user.id, user.role, user.email);
      return accesstoken;
    }
  );
};

const hashedPassword = async (password: string) => {
  const passwordhash = await bcrypt.hash(password, 12);
  return passwordhash;
};

const decryptPassword = async (password: string, clientPassword: string) => {
  return await bcrypt.compare(password, clientPassword);
};

const randomGenerator = () => {
  // Poor man version of a random generator
  // duplicates keys can creeep in
  // REFACTOR NEEDED
  return Math.floor(Math.random() * 999999);
};

export {
  generateAccessToken,
  generatereFreshToken,
  hashedPassword,
  decryptPassword,
  verifyToken,
  randomGenerator,
};
