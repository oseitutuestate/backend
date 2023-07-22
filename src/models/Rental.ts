import { Schema, model } from "mongoose";
import { RentTypes, Status } from "../common/enums";

const rentalSchema = new Schema(
  {
    apartment: {
      type: Schema.Types.ObjectId,
      ref: "Appartment",
      unique: true,
    },
    maxguests: {
      type: Schema.Types.Number,
      required: true,
    },
    furnished: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    bedrooms: {
      type: Schema.Types.Number,
      required: true,
    },
    bathrooms: {
      type: Schema.Types.Number,
      required: true,
    },
    fenced: {
      type: Schema.Types.Boolean,
      default: false,
    },
    aircondition: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    airconditionDetail: {
      type: Schema.Types.String,
    },
    headline: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    featured: {
      type: Schema.Types.Boolean,
      default: false,
    },
    images: [
      {
        type: Schema.Types.String,
      },
    ],
    price: {
      type: Schema.Types.Number,
      required: true,
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
