import { Schema, model } from "mongoose";
import { TaskStatus } from "../common/enums";

interface TaskModel extends Document {
  description: string;
  results: string;
  action: string;
  employee: any;
  completionDate: Date;
  status: TaskStatus;
}

const TaskSchema = new Schema<TaskModel>(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: Schema.Types.String,
      required: [true, "Description of task is mandatory"],
    },
    results: {
      type: Schema.Types.String,
    },
    action: {
      type: Schema.Types.String,
    },
    completionDate: {
      type: Schema.Types.Date,
      required: [true, "Completion date is mandatory"],
    },
    status: {
      type: Schema.Types.String,
      enum: [
        TaskStatus.NotStarted,
        TaskStatus.Cancelled,
        TaskStatus.Completed,
        TaskStatus.InProgress,
      ],
      default: TaskStatus.NotStarted,
    },
  },
  { timestamps: true }
);
export default model<TaskModel>("Task", TaskSchema);
