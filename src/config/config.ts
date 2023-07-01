import * as dotenv from "dotenv";
dotenv.config();

export const Configs = {
  PORT: process.env.PORT,
  SMS_API_KEY: process.env.AUTH_KEY,
  SMS_SENDER: process.env.SMS_SENDER,
  SMS_PROVIDER: process.env.SMS_PROVIDER_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGODB_URL: process.env.MONGODB_URL,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};
