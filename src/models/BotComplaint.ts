import mongoose, { Schema, Document } from "mongoose";

export interface IBotComplain extends Document {
  user: any;
  number: string;
  complains: string;
}

const botComplainSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "BotUser", required: true },
    number: { type: Schema.Types.String, required: true },
    complains: { type: Schema.Types.String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBotComplain>("BotComplain", botComplainSchema);
