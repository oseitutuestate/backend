import { Schema, model } from "mongoose";
import { RentTypes, Status } from "../common/enums";

const rentalSchema = new Schema(
  {
    apartment: {
      type: Schema.Types.ObjectId,
      ref: "Appartment",
      unique: true,
    },
    furnished: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    images: [
      {
        type: Schema.Types.String,
      },
    ],
    perMonth: {
      type: Schema.Types.Number,
    },
    perDay: {
      type: Schema.Types.Number,
    },
    rentType: {
      type: String,
      enum: [RentTypes.Airbnb, RentTypes.Rent, RentTypes.Lease],
      required: true,
    },
    rents: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Rent",
        },
      ],
    },
    status: {
      type: String,
      enum: [Status.Active, Status.InActive],
      default: Status.Active,
    },
    // reviews: {
    //   type: [
    //     {
    //       type: Schema.Types.ObjectId,
    //       ref: "Review",
    //     },
    //   ],
    // },
  },
  { timestamps: true }
);

export default model("Rental", rentalSchema);
