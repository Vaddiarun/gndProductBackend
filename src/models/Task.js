import mongoose from "mongoose";
 
const taskSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "DONE"],
      default: "TODO",
    }, // Added DONE
    category: {
      type: String,
      enum: [
        "Hardware",
        "Firmware",
        "Testing",
        "Mechanical",
        "Certifications",
        "Production",
      ],
      required: true,
    },
    createdDate: { type: Date, default: Date.now },
    startDate: { type: Date },
    assignee: { type: String, required: true },
    expectedEndDate: { type: Date },
    endDate: { type: Date }, // ✅ actual completion date
    remarks: { type: String },
  },
  { timestamps: true }
);
 
const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
export default Task;
 
 