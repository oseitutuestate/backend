import { Schema, model } from "mongoose";
import { AssetStatus } from "../common/enums";

interface AssetModel extends Document {
  name: string;
  cost: number;
  description?: string | null;
  lastDayOfMaintenance?: Date | null;
  status: AssetStatus;
  maintenance?: any[] | null;
  recordedBy: any;
}

const AssetSchema = new Schema<AssetModel>(
  {
    name: {
      type: Schema.Types.String,
      required: [true, "Name is mandatory"],
    },
    cost: {
      type: Schema.Types.Number,
      required: [true, "Cost of asset is mandatory"],
    },
    description: {
      type: Schema.Types.String,
      default: "",
    },
    lastDayOfMaintenance: {
      type: Schema.Types.Date,
    },
    status: {
      type: Schema.Types.String,
      enum: [AssetStatus.Damaged, AssetStatus.InUse],
      default: AssetStatus.InUse,
    },
    recordedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    maintenance: [
      {
        type: Schema.Types.ObjectId,
        ref: "Maintenance",
      },
    ],
  },
  { timestamps: true }
);
export default model<AssetModel>("Asset", AssetSchema);
