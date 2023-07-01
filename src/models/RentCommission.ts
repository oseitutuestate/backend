import { Schema, model } from "mongoose";

interface RentCommissionModel extends Document {
  type: string;
  description: string;
  percentage: string;
}

const RentCommissionSchema = new Schema<RentCommissionModel>(
  {
    type: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
    },
    percentage: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<RentCommissionModel>(
  "RentCommission",
  RentCommissionSchema
);
