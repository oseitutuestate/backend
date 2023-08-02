import { Schema, model, Document } from "mongoose";

interface FacilityPaymentModel extends Document {
  apartmentId: any;
  paymentAmount: number;
  paymentMonths: any;
  paymentYear: string;
  paidBy: string;
  recordedBy: string;
  paymentDate: Date;
  // transactionId?: any;
}

const facilityPaymentSchema = new Schema<FacilityPaymentModel>(
  {
    apartmentId: {
      type: Schema.Types.ObjectId,
      ref: "Appartment",
      required: true,
    },
    paymentAmount: {
      type: Schema.Types.Number,
      required: true,
    },
    paymentMonths: {
      type: Schema.Types.Array,
      required: true,
    },
    paymentYear: {
      type: Schema.Types.String,
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    paidBy: {
      type: Schema.Types.String,
      required: true,
    },
    recordedBy: {
      type: Schema.Types.String,
      required: true,
    },
    // transactionId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Transaction",
    // },
  },
  { timestamps: true }
);

export default model<FacilityPaymentModel>(
  "FacilityPayment",
  facilityPaymentSchema
);
