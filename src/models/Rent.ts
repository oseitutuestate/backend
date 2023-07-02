import { Schema, model, Document } from "mongoose";
import { RentTypes, Status } from "../common/enums";

export interface RentModel extends Document {
  apt: Schema.Types.ObjectId;
  type: string;
  monthsRented: number;
  daysRented: number;
  checkin: Date;
  checkout: Date;
  totalAmount: number;
  clientName: string;
  clientNumber: string;
  clientEmail: string;
  status: string;
}

const rentSchema = new Schema<RentModel>(
  {
    apt: {
      type: Schema.Types.ObjectId,
      ref: "Rental",
    },
    type: {
      type: String,
      enum: [RentTypes.Airbnb, RentTypes.Rent, RentTypes.Lease],
      required: true,
    },
    monthsRented: {
      type: Schema.Types.Number,
    },
    daysRented: {
      type: Schema.Types.Number,
    },
    checkin: {
      type: Schema.Types.Date,
      required: true,
    },
    checkout: {
      type: Schema.Types.Date,
      required: true,
    },
    totalAmount: {
      type: Schema.Types.Number,
      required: true,
    },
    clientName: {
      type: Schema.Types.String,
      required: true,
    },
    clientNumber: {
      type: Schema.Types.String,
      required: true,
    },
    clientEmail: {
      type: Schema.Types.String,
      required: true,
    },
    status: {
      type: Schema.Types.String,
      enum: [Status.Active, Status.InActive],
      required: true,
    },
  },
  { timestamps: true }
);

export default model<RentModel>("Rent", rentSchema);
