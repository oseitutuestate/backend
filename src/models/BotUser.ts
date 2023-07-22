import mongoose, { Schema, Document } from "mongoose";

export interface IBotUser extends Document {
  name: string;
  number: string;
  lastMessageTime: Date;
  conversations: any[];
}

const botUserSchema: Schema = new Schema({
  name: { type: String, required: true },
  number: { type: String, required: true, unique: true },
  lastMessageTime: { type: Date },
  conversations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
    },
  ],
  complains: [
    {
      type: Schema.Types.ObjectId,
      ref: "BotComplain",
    },
  ],
});

export default mongoose.model<IBotUser>("BotUser", botUserSchema);
