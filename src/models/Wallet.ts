import { Schema, model } from "mongoose";
import { WalletType } from "../common/enums";

interface WalletModel extends Document {
  type: string;
  balance: number;
  account: string;
  accountNumber: string;
  fundHistory: any[];
  spendingHistory: any[];
}

const WalletSchema = new Schema<WalletModel>(
  {
    type: {
      type: Schema.Types.String,
      enum: [
        WalletType.CreditCard,
        WalletType.FuelCard,
        WalletType.PettyCash,
        WalletType.Salary,
      ],
      unique: true,
      required: true,
    },
    balance: {
      type: Schema.Types.Number,
      default: 0,
      // required: true,
    },
    account: {
      type: Schema.Types.String,
    },
    accountNumber: {
      type: Schema.Types.String,
    },
    fundHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Fund",
      },
    ],
    spendingHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Expense",
      },
    ],
  },
  { timestamps: true }
);
export default model<WalletModel>("Wallet", WalletSchema);
