import { Schema, model, Document } from "mongoose";
import { Status } from "../common/enums";

export interface RentModel extends Document {
  apartment: Schema.Types.ObjectId;
  //   apartmentType: string;
  monthsRented: number;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
  clientName: string;
  clientNumber: string;
  clientEmail: string;
}

const rentSchema = new Schema<RentModel>(
  {
    apartment: {
      type: Schema.Types.ObjectId,
      ref: "Appartment",
    },
    monthsRented: {
      type: Schema.Types.Number,
      required: true,
    },
    startDate: {
      type: Schema.Types.Date,
      required: true,
    },
    endDate: {
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
    //   status: {
    //     type: Schema.Types.String,
    //     required: true,
    //   },
  },
  { timestamps: true }
);

export default model<RentModel>("Rent", rentSchema);
