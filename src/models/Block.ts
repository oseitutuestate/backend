import { Schema, model } from "mongoose";
import { Status } from "../common/enums";

const blockSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Block", blockSchema);
