import { Schema, model } from "mongoose";
import { AptTypes, Status } from "../common/enums";

const appartmentSchema = new Schema(
  {
    houseNumber: {
      type: Schema.Types.String,
      required: true,
    },
    type: {
      type: Schema.Types.String,
    },
    aptType: {
      type: Schema.Types.String,
      enum: [
        AptTypes.OneBedroomApt,
        AptTypes.TwoBedroomApt,
        AptTypes.ThreeBedroomApt,
        AptTypes.FourBedroomApt,
      ],
      required: true,
    },
    bedrooms: {
      type: Schema.Types.Number,
      required: true,
    },
    block: {
      type: Schema.Types.String,
      required: true,
    },
    ownerName: {
      type: Schema.Types.String,
      required: true,
    },
    ownerEmail: {
      type: Schema.Types.String,
      required: true,
    },
    ownerNumber: {
      type: Schema.Types.String,
      required: true,
    },
    status: {
      type: Schema.Types.String,
      enum: [Status.Active, Status.InActive],
      default: Status.Active,
    },
    facilityPayments: [
      {
        type: Schema.Types.ObjectId,
        ref: "FacilityPayment",
      },
    ],
  },
  { timestamps: true }
);

export default model("Appartment", appartmentSchema);
