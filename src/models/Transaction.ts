import { Schema, model, Document } from "mongoose";
import { TransactionTypes } from "../common/enums";

interface TransactionModel extends Document {
  type: string;
  recordedBy: string;

  //facility payment
  apartment?: string;
  paymentMode?: string;
  accountNumber?: string;
  amountPaid?: number;
  paymentMonths?: string[];
  year?: string;
  paidBy?: string;

  //expense
  item?: string;
  quantity?: number;
  unitPrice?: number;
  totalAmount?: number;
}

const TransactionSchema = new Schema<TransactionModel>(
  {
    type: {
      type: String,
      enum: [TransactionTypes.Expense, TransactionTypes.FacilityFee],
      required: true,
    },
    recordedBy: {
      type: String,
      required: true,
    },
    //facility
    apartment: {
      type: Schema.Types.ObjectId,
      ref: "Apartment",
      default: null,
    },
    paymentMode: {
      type: Schema.Types.String,
    },
    accountNumber: {
      type: Schema.Types.String,
    },
    amountPaid: {
      type: Schema.Types.Number,
    },
    paymentMonths: {
      type: String,
      default: [],
    },
    year: {
      type: String,
    },
    paidBy: {
      type: String,
    },
    //expense
    item: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      trim: true,
    },
    unitPrice: {
      type: Number,
    },
    totalAmount: {
      type: Number,
    },
  },
  { timestamps: true }
);
export default model<TransactionModel>("Transaction", TransactionSchema);
