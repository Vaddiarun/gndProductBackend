import Task from "../models/Task.js";
import Product from "../models/product.js";
import { taskZodSchema, partialTaskSchema } from "../utils/taskValidation.js";
 
export async function createTask(req, res) {
  try {
    const { assignee } = req.body;
    const parsed = taskZodSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: parsed.error.errors.map((e) => e.message).join(", "),
      });
    }
 
    const {
      product: productId,
      category,
      owner,
      ownerName,
      ...rest
    } = parsed.data;
 
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
 
    const task = await Task.create({
      product: productId,
      owner: owner || req.user.id, // ✅ allow frontend-sent owner
      ownerName: ownerName || rest.ownerName || req.user.name, // prefer frontend name
      category,
      ...rest,
      createdDate: rest.createdDate ? new Date(rest.createdDate) : undefined,
      startDate: rest.startDate ? new Date(rest.startDate) : undefined,
      expectedEndDate: rest.expectedEndDate
        ? new Date(rest.expectedEndDate)
        : undefined,
      endDate: rest.endDate ? new Date(rest.endDate) : undefined,
      assignee: assignee, // auto-assign current user as assignee
    });
 
    res.status(201).json(task);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating task", error: err.message });
  }
}
 
// ---------------- UPDATE TASK ----------------
export async function updateTask(req, res) {
  console.log("innnnnnnnnnnnnnnn");
  console.log(req.body, "iddddddddddddddddd");
  try {
    const parsed = partialTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: parsed.error.errors.map((e) => e.message).join(", "),
      });
    }
 
    const toSet = { ...parsed.data };
    ["createdDate", "startDate", "expectedEndDate", "endDate"].forEach((k) => {
      if (toSet[k]) toSet[k] = new Date(toSet[k]);
    });
 
    // Prevent changing product manually
    delete toSet.product;
 
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: toSet },
      { new: true }
    );
 
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating task", error: err.message });
  }
}
 
// ---------------- GET SINGLE TASK ----------------
export async function getTask(req, res) {
  try {
    const task = await Task.findById(req.params.id)
      .populate("product", "name")
      .populate("owner", "name email");
 
    if (!task) return res.status(404).json({ message: "Task not found" });
 
    res.json(task);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching task", error: err.message });
  }
}
 
// ---------------- LIST TASKS ----------------
export async function listTasks(req, res) {
  try {
    const { productId, status, category } = req.query;
    const filter = {};
 
    if (productId) filter.product = productId;
    if (status) filter.status = status;
    if (category) filter.category = category;
 
    const tasks = await Task.find(filter)
      .populate("product", "name")
      .populate("owner", "name email")
      .sort({ createdAt: -1 });
 
    res.json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: err.message });
  }
}
 
// ---------------- DELETE TASK ----------------
export async function deleteTask(req, res) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
 
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: err.message });
  }
}
 
 