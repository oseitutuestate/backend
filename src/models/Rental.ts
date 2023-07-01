import { Schema, model } from "mongoose";
import { Status } from "../common/enums";

const rentalSchema = new Schema(
  {
    apartment: {
      type: Schema.Types.ObjectId,
      ref: "Appartment",
      unique: true,
    },
    rents: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Rent",
        },
      ],
    },
    image: {
      type: Schema.Types.String,
    },
    pricePerMonth: {
      type: Schema.Types.String,
      required: true,
    },
    status: {
      type: String,
      enum: [Status.Active, Status.InActive],
      default: Status.Active,
    },
  },
  { timestamps: true }
);

export default model("Rental", rentalSchema);
