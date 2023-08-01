import { Schema, model } from "mongoose";
import { RoleCode } from "../common/enums";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    contact: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [RoleCode.FrontDesk, RoleCode.Admin, RoleCode.SuperAdmin],
      default: RoleCode.FrontDesk,
    },
  },
  { timestamps: true }
);

export default model("User", userSchema);
