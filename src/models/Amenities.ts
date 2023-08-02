import { Schema, model } from "mongoose";

interface AmenitiesModel extends Document {
  amountPaid: number;
  clientName: string;
  apartment: any;
  recordedBy: string;
}

const AmenitiesSchema = new Schema<AmenitiesModel>(
  {
    apartment: {
      type: Schema.Types.ObjectId,
      ref: "Appartment",
      unique: true,
    },
    amountPaid: {
      type: Schema.Types.Number,
      required: true,
    },
    clientName: {
      type: Schema.Types.String,
      required: true,
    },
    recordedBy: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { timestamps: true }
);
export default model<AmenitiesModel>("Amenities", AmenitiesSchema);
