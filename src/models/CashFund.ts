import { Schema, model } from "mongoose";

interface CashFundModel extends Document {
  wallet: any;
  amount: number;
  fundedBy: string;
  //   status: string;
}

const CashFundSchema = new Schema<CashFundModel>(
  {
    wallet: {
      type: Schema.Types.ObjectId,
      ref: "Wallet",
    },
    amount: {
      type: Schema.Types.Number,
      default: 0,
      required: true,
    },
    fundedBy: {
      type: Schema.Types.String,
    },
  },
  { timestamps: true }
);
export default model<CashFundModel>("CashFund", CashFundSchema);
