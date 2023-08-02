import { Schema, model } from "mongoose";

interface ExpressModel extends Document {
  item: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  walletId: any;
  user: string;
  transactionId?: any;
}

const expenseSchema = new Schema<ExpressModel>(
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
    walletId: {
      type: Schema.Types.ObjectId,
      ref: "Wallet",
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

export default model<ExpressModel>("Expense", expenseSchema);
