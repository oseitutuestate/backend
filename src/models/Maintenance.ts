import { Schema, model } from "mongoose";

interface MaintenanceModel extends Document {
  assetId: any;
  cost: number;
  state: string;
  dateReview: Date;
  remarks: string;
  recordedBy: any;
  nextDayOfMaintenance?: Date | null;
}

const MaintenanceSchema = new Schema<MaintenanceModel>(
  {
    assetId: {
      type: Schema.Types.ObjectId,
      ref: "Asset",
      required: [true, "Asset is mandatory"],
    },
    cost: {
      type: Schema.Types.Number,
      required: [true, "Cost of maintenance is mandatory"],
    },
    state: {
      type: Schema.Types.String,
    },
    dateReview: {
      type: Schema.Types.Date,
    },
    remarks: {
      type: Schema.Types.String,
    },
    recordedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    nextDayOfMaintenance: {
      type: Schema.Types.Date,
    },
  },
  { timestamps: true }
);
export default model<MaintenanceModel>("Maintenance", MaintenanceSchema);
