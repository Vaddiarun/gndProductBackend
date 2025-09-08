import mongoose from "mongoose";
 
const milestoneSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    expectedEndDate: { type: Date, required: true },
    completedAt: { type: Date, default: null }, // when milestone was achieved
    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "ACHIEVED"],
      default: "TODO",
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }], // link to existing tasks
  },
  { timestamps: true }
);
 
const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: "" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    milestones: [milestoneSchema],
  },
  { timestamps: true }
);
 
const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
 
export default Project;
 
 