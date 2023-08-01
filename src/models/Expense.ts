import { Schema, model } from "mongoose";
import { RoleCode } from "../common/enums";

const expenseSchema = new Schema(
  {
    item: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      trim: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    transactionId: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
      // required: true,
    },
  },
  { timestamps: true }
);

export default model("Expense", expenseSchema);
