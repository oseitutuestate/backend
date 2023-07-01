import { Schema, model, Document } from "mongoose";

//Refactoring all payments in one model Transaction or refactor the recordPaymentSchema to look like the schedule
// Transaction will have type, amount,

interface FacilityPaymentModel extends Document {
  apartment: Schema.Types.ObjectId;
  transactionId: Schema.Types.ObjectId;
  paymentAmount: number;
  paymentMonth: string;
  paymentYear: string;
  paymentDate: Date;
}

const facilityPaymentSchema = new Schema<FacilityPaymentModel>(
  {
    apartment: {
      type: Schema.Types.ObjectId,
      ref: "Apartment",
      required: true,
    },
    transactionId: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
      required: true,
    },
    paymentAmount: {
      type: Schema.Types.Number,
      required: true,
    },
    paymentMonth: {
      type: Schema.Types.String,
      required: true,
    },
    paymentYear: {
      type: Schema.Types.String,
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<FacilityPaymentModel>(
  "FacilityPayment",
  facilityPaymentSchema
);
