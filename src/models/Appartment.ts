import { Schema, model } from "mongoose";
import { Status } from "../common/enums";

const appartmentSchema = new Schema(
  {
    houseNumber: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    block: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    ownerEmail: {
      type: String,
      required: true,
    },
    ownerNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [Status.Active, Status.InActive],
      default: Status.Active,
    },
    facilityPayments: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "FacilityPayment",
        },
      ],
    },
  },
  { timestamps: true }
);

export default model("Appartment", appartmentSchema);
