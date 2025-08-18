// import { z } from "zod";
// import Task from "../models/Task.js";
// import Product from "../models/Product.js";

// const taskSchema = z.object({
//   product: z.string().min(1),
//   title: z.string().min(2),
//   status: z.enum(["IN_PROGRESS", "TODO"]),
//   owner: z.string().min(1),
//   createdDate: z.string().datetime().optional(),
//   startDate: z.string().datetime().optional(),
//   expectedEndDate: z.string().datetime().optional(),
//   remarks: z.string().optional()
// });

// const partialTaskSchema = taskSchema.partial();

// export async function createTask(req, res) {
//   const parsed = taskSchema.safeParse(req.body);
//   if (!parsed.success) {
//     return res.status(400).json({ message: parsed.error.errors.map(e => e.message).join(", ") });
//   }
//   const { product: productId, ...rest } = parsed.data;
//   const product = await Product.findById(productId);
//   if (!product) return res.status(404).json({ message: "Product not found" });

//   const task = await Task.create({
//     product: productId,
//     ...rest,
//     createdDate: rest.createdDate ? new Date(rest.createdDate) : undefined,
//     startDate: rest.startDate ? new Date(rest.startDate) : undefined,
//     expectedEndDate: rest.expectedEndDate ? new Date(rest.expectedEndDate) : undefined
//   });

//   res.status(201).json(task);
// }

// export async function updateTask(req, res) {
//   const parsed = partialTaskSchema.safeParse(req.body);
//   if (!parsed.success) {
//     return res.status(400).json({ message: parsed.error.errors.map(e => e.message).join(", ") });
//   }
//   const toSet = { ...parsed.data };
//   ["createdDate", "startDate", "expectedEndDate"].forEach((k) => {
//     if (toSet[k]) toSet[k] = new Date(toSet[k]);
//   });
//   if (toSet.product) delete toSet.product;

//   const task = await Task.findByIdAndUpdate(req.params.id, { $set: toSet }, { new: true });
//   if (!task) return res.status(404).json({ message: "Task not found" });
//   res.json(task);
// }

// export async function deleteTask(req, res) {
//   const task = await Task.findById(req.params.id);
//   if (!task) return res.status(404).json({ message: "Task not found" });
//   await task.deleteOne();
//   res.json({ message: "Deleted" });
// }

// export async function getTask(req, res) {
//   const task = await Task.findById(req.params.id);
//   if (!task) return res.status(404).json({ message: "Task not found" });
//   res.json(task);
// }

// export async function listTasks(req, res) {
//   const { product, status } = req.query;
//   const q = {};
//   if (product) q.product = product;
//   if (status) q.status = status;
//   const tasks = await Task.find(q).sort({ createdAt: -1 });
//   res.json(tasks);
// }
// import { z } from "zod";
// import Task from "../models/Task.js";
// import Product from "../models/Product.js";

// const taskSchema = z.object({
//   product: z.string().min(1),
//   title: z.string().min(2),
//   status: z.enum(["IN_PROGRESS", "TODO"]),
//   category: z.enum(["Hardware", "Firmware", "Testing", "Mechanical", "Certifications", "Production"]),
//   createdDate: z.string().datetime().optional(),
//   startDate: z.string().datetime().optional(),
//   expectedEndDate: z.string().datetime().optional(),
//   remarks: z.string().optional()
// });

// const partialTaskSchema = taskSchema.partial();

// export async function createTask(req, res) {
//   const parsed = taskSchema.safeParse(req.body);
//   if (!parsed.success) {
//     return res.status(400).json({
//       message: parsed.error.errors.map(e => e.message).join(", ")
//     });
//   }

//   const { product: productId, ...rest } = parsed.data;
//   const product = await Product.findById(productId);
//   if (!product) return res.status(404).json({ message: "Product not found" });

//   const task = await Task.create({
//     product: productId,
//     owner: req.user.id,   // auto-assign owner from logged-in user
//     ...rest,
//     createdDate: rest.createdDate ? new Date(rest.createdDate) : undefined,
//     startDate: rest.startDate ? new Date(rest.startDate) : undefined,
//     expectedEndDate: rest.expectedEndDate ? new Date(rest.expectedEndDate) : undefined
//   });

//   res.status(201).json(task);
// }

// export async function updateTask(req, res) {
//   const parsed = partialTaskSchema.safeParse(req.body);
//   if (!parsed.success) {
//     return res.status(400).json({
//       message: parsed.error.errors.map(e => e.message).join(", ")
//     });
//   }

//   const toSet = { ...parsed.data };
//   ["createdDate", "startDate", "expectedEndDate"].forEach((k) => {
//     if (toSet[k]) toSet[k] = new Date(toSet[k]);
//   });
//   if (toSet.product) delete toSet.product;

//   const task = await Task.findByIdAndUpdate(
//     req.params.id,
//     { $set: toSet },
//     { new: true }
//   );
//   if (!task) return res.status(404).json({ message: "Task not found" });
//   res.json(task);
// }

// export async function deleteTask(req, res) {
//   const task = await Task.findById(req.params.id);
//   if (!task) return res.status(404).json({ message: "Task not found" });
//   await task.deleteOne();
//   res.json({ message: "Deleted" });
// }

// export async function getTask(req, res) {
//   const task = await Task.findById(req.params.id);
//   if (!task) return res.status(404).json({ message: "Task not found" });
//   res.json(task);
// }

// export async function listTasks(req, res) {
//   const { product, status, category } = req.query;
//   const q = {};
//   if (product) q.product = product;
//   if (status) q.status = status;
//   if (category) q.category = category; // filter by category if provided
//   const tasks = await Task.find(q).sort({ createdAt: -1 });
//   res.json(tasks);
// }
// import { z } from "zod";
// import Task from "../models/Task.js";
// import Product from "../models/Product.js";

// const taskSchema = z.object({
//   product: z.string().min(1),
//   title: z.string().min(2),
//   status: z.enum(["IN_PROGRESS", "TODO"]),
//   category: z.enum([
//     "Hardware",
//     "Firmware",
//     "Testing",
//     "Mechanical",
//     "Certifications",
//     "Production"
//   ]),
//   createdDate: z.string().datetime().optional(),
//   startDate: z.string().datetime().optional(),
//   expectedEndDate: z.string().datetime().optional(),
//   remarks: z.string().optional()
// });

// const partialTaskSchema = taskSchema.partial();

// // ---------------- CREATE TASK ----------------
// export async function createTask(req, res) {
//   const parsed = taskSchema.safeParse(req.body);
//   if (!parsed.success) {
//     return res.status(400).json({
//       message: parsed.error.errors.map(e => e.message).join(", ")
//     });
//   }

//   const { product: productId, category, ...rest } = parsed.data;

//   const product = await Product.findById(productId);
//   if (!product) return res.status(404).json({ message: "Product not found" });

//   const task = await Task.create({
//     product: productId,
//     owner: req.user.id, // auto-assign owner
//     category,           // explicitly set category
//     ...rest,
//     createdDate: rest.createdDate ? new Date(rest.createdDate) : undefined,
//     startDate: rest.startDate ? new Date(rest.startDate) : undefined,
//     expectedEndDate: rest.expectedEndDate ? new Date(rest.expectedEndDate) : undefined
//   });

//   res.status(201).json(task);
// }

// // ---------------- UPDATE TASK ----------------
// export async function updateTask(req, res) {
//   const parsed = partialTaskSchema.safeParse(req.body);
//   if (!parsed.success) {
//     return res.status(400).json({
//       message: parsed.error.errors.map(e => e.message).join(", ")
//     });
//   }

//   const toSet = { ...parsed.data };
//   ["createdDate", "startDate", "expectedEndDate"].forEach((k) => {
//     if (toSet[k]) toSet[k] = new Date(toSet[k]);
//   });

//   // Prevent changing product
//   if (toSet.product) delete toSet.product;

//   const task = await Task.findByIdAndUpdate(
//     req.params.id,
//     { $set: toSet },
//     { new: true }
//   );

//   if (!task) return res.status(404).json({ message: "Task not found" });
//   res.json(task);
// }

// // ---------------- DELETE TASK ----------------
// export async function deleteTask(req, res) {
//   const task = await Task.findById(req.params.id);
//   if (!task) return res.status(404).json({ message: "Task not found" });

//   await task.deleteOne();
//   res.json({ message: "Deleted" });
// }

// // ---------------- GET SINGLE TASK ----------------
// export async function getTask(req, res) {
//   const task = await Task.findById(req.params.id);
//   if (!task) return res.status(404).json({ message: "Task not found" });

//   res.json(task);
// }

// // ---------------- LIST TASKS ----------------
// export async function listTasks(req, res) {
//   const { product, status, category } = req.query;

//   // Require product & category for proper filtering
//   if (!product || !category) {
//     return res.status(400).json({ message: "Product and category are required" });
//   }

//   const q = { product, category };
//   if (status) q.status = status;

//   try {
//     const tasks = await Task.find(q).sort({ createdAt: -1 });
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching tasks", error: err.message });
//   }
// }
// import { z } from "zod";
// import Task from "../models/Task.js";
// import Product from "../models/Product.js";

// const taskSchema = z.object({
//   product: z.string().min(1),
//   title: z.string().min(2),
//   status: z.enum(["IN_PROGRESS", "TODO"]),
//   category: z.enum([
//     "Hardware",
//     "Firmware",
//     "Testing",
//     "Mechanical",
//     "Certifications",
//     "Production"
//   ]),
//   createdDate: z.string().datetime().optional(),
//   startDate: z.string().datetime().optional(),
//   expectedEndDate: z.string().datetime().optional(),
//   remarks: z.string().optional()
// });

// const partialTaskSchema = taskSchema.partial();

// // ---------------- CREATE TASK ----------------
// export async function createTask(req, res) {
//   try {
//     const parsed = taskSchema.safeParse(req.body);
//     if (!parsed.success) {
//       return res.status(400).json({
//         message: parsed.error.errors.map(e => e.message).join(", ")
//       });
//     }

//     const { product: productId, category, ...rest } = parsed.data;

//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     const task = await Task.create({
//       product: productId,
//       owner: req.user.id, // auto-assign owner
//       category,           // explicitly set category
//       ...rest,
//       createdDate: rest.createdDate ? new Date(rest.createdDate) : undefined,
//       startDate: rest.startDate ? new Date(rest.startDate) : undefined,
//       expectedEndDate: rest.expectedEndDate ? new Date(rest.expectedEndDate) : undefined
//     });

//     res.status(201).json(task);
//   } catch (err) {
//     res.status(500).json({ message: "Error creating task", error: err.message });
//   }
// }

// // ---------------- UPDATE TASK ----------------
// export async function updateTask(req, res) {
//   try {
//     const parsed = partialTaskSchema.safeParse(req.body);
//     if (!parsed.success) {
//       return res.status(400).json({
//         message: parsed.error.errors.map(e => e.message).join(", ")
//       });
//     }

//     const toSet = { ...parsed.data };
//     ["createdDate", "startDate", "expectedEndDate"].forEach((k) => {
//       if (toSet[k]) toSet[k] = new Date(toSet[k]);
//     });

//     // Prevent changing product
//     if (toSet.product) delete toSet.product;

//     const task = await Task.findByIdAndUpdate(
//       req.params.id,
//       { $set: toSet },
//       { new: true }
//     );

//     if (!task) return res.status(404).json({ message: "Task not found" });
//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ message: "Error updating task", error: err.message });
//   }
// }

// // ---------------- DELETE TASK ----------------
// export async function deleteTask(req, res) {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) return res.status(404).json({ message: "Task not found" });

//     await task.deleteOne();
//     res.json({ message: "Deleted" });
//   } catch (err) {
//     res.status(500).json({ message: "Error deleting task", error: err.message });
//   }
// }

// // ---------------- GET SINGLE TASK ----------------
// export async function getTask(req, res) {
//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) return res.status(404).json({ message: "Task not found" });

//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching task", error: err.message });
//   }
// }

// // ---------------- LIST TASKS ----------------
// export async function listTasks(req, res) {
//   try {
//     const { product, status, category } = req.query;

//     // Require product & category for proper filtering
//     if (!product || !category) {
//       return res.status(400).json({ message: "Product and category are required" });
//     }

//     const query = { product, category };
//     if (status) query.status = status;

//     const tasks = await Task.find(query).sort({ createdAt: -1 });
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching tasks", error: err.message });
//   }
// }
// import { z } from "zod";
// import Task from "../models/Task.js";
// import Product from "../models/Product.js";

// const taskSchema = z.object({
//   product: z.string().min(1),
//   title: z.string().min(2),
//   status: z.enum(["IN_PROGRESS", "TODO", "DONE"]), // added DONE
//   category: z.enum([
//     "Hardware",
//     "Firmware",
//     "Testing",
//     "Mechanical",
//     "Certifications",
//     "Production"
//   ]),
//   createdDate: z.string().datetime().optional(),
//   startDate: z.string().datetime().optional(),
//   expectedEndDate: z.string().datetime().optional(),
//   endDate: z.string().datetime().optional(), // ✅ NEW
//   remarks: z.string().optional()
// });

// const partialTaskSchema = taskSchema.partial();

// // ---------------- CREATE TASK ----------------
// export async function createTask(req, res) {
//   try {
//     const parsed = taskSchema.safeParse(req.body);
//     if (!parsed.success) {
//       return res.status(400).json({
//         message: parsed.error.errors.map(e => e.message).join(", ")
//       });
//     }

//     const { product: productId, category, ...rest } = parsed.data;

//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     const task = await Task.create({
//       product: productId,
//       owner: req.user.id, // auto-assign owner
//       category,
//       ...rest,
//       createdDate: rest.createdDate ? new Date(rest.createdDate) : undefined,
//       startDate: rest.startDate ? new Date(rest.startDate) : undefined,
//       expectedEndDate: rest.expectedEndDate ? new Date(rest.expectedEndDate) : undefined,
//       endDate: rest.endDate ? new Date(rest.endDate) : undefined // ✅ NEW
//     });

//     res.status(201).json(task);
//   } catch (err) {
//     res.status(500).json({ message: "Error creating task", error: err.message });
//   }
// }

// // ---------------- UPDATE TASK ----------------
// export async function updateTask(req, res) {
//   try {
//     const parsed = partialTaskSchema.safeParse(req.body);
//     if (!parsed.success) {
//       return res.status(400).json({
//         message: parsed.error.errors.map(e => e.message).join(", ")
//       });
//     }

//     const toSet = { ...parsed.data };
//     ["createdDate", "startDate", "expectedEndDate", "endDate"].forEach((k) => {
//       if (toSet[k]) toSet[k] = new Date(toSet[k]);
//     });

//     // Prevent changing product
//     if (toSet.product) delete toSet.product;

//     const task = await Task.findByIdAndUpdate(
//       req.params.id,
//       { $set: toSet },
//       { new: true }
//     );

//     if (!task) return res.status(404).json({ message: "Task not found" });
//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ message: "Error updating task", error: err.message });
//   }
// }
// import { z } from "zod";
// import Task from "../models/Task.js";
// import Product from "../models/Product.js";

// // ---------------- VALIDATION ----------------
// const taskSchema = z.object({
//   product: z.string().min(1),
//   title: z.string().min(2),
//   status: z.enum(["IN_PROGRESS", "TODO", "DONE"]), // ✅ includes DONE
//   category: z.enum([
//     "Hardware",
//     "Firmware",
//     "Testing",
//     "Mechanical",
//     "Certifications",
//     "Production"
//   ]),
//   createdDate: z.string().datetime().optional(),
//   startDate: z.string().datetime().optional(),
//   expectedEndDate: z.string().datetime().optional(),
//   endDate: z.string().datetime().optional(),
//   remarks: z.string().optional()
// });

// const partialTaskSchema = taskSchema.partial();

// // ---------------- CREATE TASK ----------------
// export async function createTask(req, res) {
//   try {
//     const parsed = taskSchema.safeParse(req.body);
//     if (!parsed.success) {
//       return res.status(400).json({
//         message: parsed.error.errors.map(e => e.message).join(", ")
//       });
//     }

//     const { product: productId, category, ...rest } = parsed.data;

//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     const task = await Task.create({
//       product: productId,
//       owner: req.user.id, // auto-assign owner
//       category,
//       ...rest,
//       createdDate: rest.createdDate ? new Date(rest.createdDate) : undefined,
//       startDate: rest.startDate ? new Date(rest.startDate) : undefined,
//       expectedEndDate: rest.expectedEndDate ? new Date(rest.expectedEndDate) : undefined,
//       endDate: rest.endDate ? new Date(rest.endDate) : undefined
//     });

//     res.status(201).json(task);
//   } catch (err) {
//     res.status(500).json({ message: "Error creating task", error: err.message });
//   }
// }

// // ---------------- UPDATE TASK ----------------
// export async function updateTask(req, res) {
//   try {
//     const parsed = partialTaskSchema.safeParse(req.body);
//     if (!parsed.success) {
//       return res.status(400).json({
//         message: parsed.error.errors.map(e => e.message).join(", ")
//       });
//     }

//     const toSet = { ...parsed.data };
//     ["createdDate", "startDate", "expectedEndDate", "endDate"].forEach((k) => {
//       if (toSet[k]) toSet[k] = new Date(toSet[k]);
//     });

//     // Prevent changing product
//     if (toSet.product) delete toSet.product;

//     const task = await Task.findByIdAndUpdate(
//       req.params.id,
//       { $set: toSet },
//       { new: true }
//     );

//     if (!task) return res.status(404).json({ message: "Task not found" });
//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ message: "Error updating task", error: err.message });
//   }
// }

// // ---------------- GET SINGLE TASK ----------------
// export async function getTask(req, res) {
//   try {
//     const task = await Task.findById(req.params.id)
//       .populate("product", "name")
//       .populate("owner", "name email");

//     if (!task) return res.status(404).json({ message: "Task not found" });

//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching task", error: err.message });
//   }
// }

// // ---------------- LIST TASKS ----------------
// export async function listTasks(req, res) {
//   try {
//     const { productId, status, category } = req.query;
//     const filter = {};

//     if (productId) filter.product = productId;
//     if (status) filter.status = status;
//     if (category) filter.category = category;

//     const tasks = await Task.find(filter)
//       .populate("product", "name")
//       .populate("owner", "name email")
//       .sort({ createdAt: -1 });

//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching tasks", error: err.message });
//   }
// }

// // ---------------- DELETE TASK ----------------
// export async function deleteTask(req, res) {
//   try {
//     const task = await Task.findByIdAndDelete(req.params.id);

//     if (!task) return res.status(404).json({ message: "Task not found" });

//     res.json({ message: "Task deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error deleting task", error: err.message });
//   }
// }
// import { z } from "zod";
// import Task from "../models/Task.js";
// import Product from "../models/Product.js";

// // ---------------- VALIDATION ----------------
// const taskSchema = z.object({
//   product: z.string().min(1),
//   title: z.string().min(2),
//   status: z.enum(["IN_PROGRESS", "TODO", "DONE"]),
//   category: z.enum([
//     "Hardware",
//     "Firmware",
//     "Testing",
//     "Mechanical",
//     "Certifications",
//     "Production"
//   ]),
//   createdDate: z.string().datetime().optional(),
//   startDate: z.string().datetime().optional(),
//   expectedEndDate: z.string().datetime().optional(),
//   endDate: z.string().datetime().optional(),
//   remarks: z.string().optional(),
//   ownerName: z.string().optional(), // ✅ added ownerName
// });

// const partialTaskSchema = taskSchema.partial();

// // ---------------- CREATE TASK ----------------
// export async function createTask(req, res) {
//   try {
//     const parsed = taskSchema.safeParse(req.body);
//     if (!parsed.success) {
//       return res.status(400).json({
//         message: parsed.error.errors.map(e => e.message).join(", ")
//       });
//     }

//     const { product: productId, category, ...rest } = parsed.data;

//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     const task = await Task.create({
//       product: productId,
//       owner: req.user.id, // auto-assign owner
//       ownerName: req.user.name, // ✅ save snapshot of owner name
//       category,
//       ...rest,
//       createdDate: rest.createdDate ? new Date(rest.createdDate) : undefined,
//       startDate: rest.startDate ? new Date(rest.startDate) : undefined,
//       expectedEndDate: rest.expectedEndDate ? new Date(rest.expectedEndDate) : undefined,
//       endDate: rest.endDate ? new Date(rest.endDate) : undefined,
//     });

//     res.status(201).json(task);
//   } catch (err) {
//     res.status(500).json({ message: "Error creating task", error: err.message });
//   }
// }

// // ---------------- UPDATE TASK ----------------
// export async function updateTask(req, res) {
//   try {
//     const parsed = partialTaskSchema.safeParse(req.body);
//     if (!parsed.success) {
//       return res.status(400).json({
//         message: parsed.error.errors.map(e => e.message).join(", ")
//       });
//     }

//     const toSet = { ...parsed.data };
//     ["createdDate", "startDate", "expectedEndDate", "endDate"].forEach((k) => {
//       if (toSet[k]) toSet[k] = new Date(toSet[k]);
//     });

//     // Prevent changing product/owner manually
//     delete toSet.product;
//     delete toSet.owner;

//     const task = await Task.findByIdAndUpdate(
//       req.params.id,
//       { $set: toSet },
//       { new: true }
//     );

//     if (!task) return res.status(404).json({ message: "Task not found" });
//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ message: "Error updating task", error: err.message });
//   }
// }

// // ---------------- GET SINGLE TASK ----------------
// export async function getTask(req, res) {
//   try {
//     const task = await Task.findById(req.params.id)
//       .populate("product", "name")
//       .populate("owner", "name email");

//     if (!task) return res.status(404).json({ message: "Task not found" });

//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching task", error: err.message });
//   }
// }

// // ---------------- LIST TASKS ----------------
// export async function listTasks(req, res) {
//   try {
//     const { productId, status, category } = req.query;
//     const filter = {};

//     if (productId) filter.product = productId;
//     if (status) filter.status = status;
//     if (category) filter.category = category;

//     const tasks = await Task.find(filter)
//       .populate("product", "name")
//       .populate("owner", "name email")
//       .sort({ createdAt: -1 });

//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching tasks", error: err.message });
//   }
// }

// // ---------------- DELETE TASK ----------------
// export async function deleteTask(req, res) {
//   try {
//     const task = await Task.findByIdAndDelete(req.params.id);
//     if (!task) return res.status(404).json({ message: "Task not found" });

//     res.json({ message: "Task deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error deleting task", error: err.message });
//   }
// }
import { z } from "zod";
import Task from "../models/Task.js";
import Product from "../models/Product.js";

// ---------------- VALIDATION ----------------
const taskSchema = z.object({
  product: z.string().min(1),
  title: z.string().min(2),
  status: z.enum(["IN_PROGRESS", "TODO", "DONE"]),
  category: z.enum([
    "Hardware",
    "Firmware",
    "Testing",
    "Mechanical",
    "Certifications",
    "Production"
  ]),
  createdDate: z.string().datetime().optional(),
  startDate: z.string().datetime().optional(),
  expectedEndDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  remarks: z.string().optional(),
  owner: z.string().optional(),      // ✅ send ObjectId of owner
  ownerName: z.string().optional(),
    // ✅ optional snapshot of owner name
});

const partialTaskSchema = taskSchema.partial();

// ---------------- CREATE TASK ----------------
// export async function createTask(req, res) {
//   try {
//     const parsed = taskSchema.safeParse(req.body);
//     if (!parsed.success) {
//       return res.status(400).json({
//         message: parsed.error.errors.map(e => e.message).join(", ")
//       });
//     }

//     const { product: productId, category, owner, ownerName, ...rest } = parsed.data;

//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     // If owner is not provided, fallback to logged-in user
//     const task = await Task.create({
//       product: productId,
//      owner: owner || req.user.id, 
//       ownerName: rest.ownerName || req.user.name,
//       category,
//       ...rest,
//       createdDate: rest.createdDate ? new Date(rest.createdDate) : undefined,
//       startDate: rest.startDate ? new Date(rest.startDate) : undefined,
//       expectedEndDate: rest.expectedEndDate ? new Date(rest.expectedEndDate) : undefined,
//       endDate: rest.endDate ? new Date(rest.endDate) : undefined,
//     });

//     res.status(201).json(task);
//   } catch (err) {
//     res.status(500).json({ message: "Error creating task", error: err.message });
//   }
// }
export async function createTask(req, res) {
  try {
    const {assignee} = req.body
    const parsed = taskSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: parsed.error.errors.map(e => e.message).join(", ")
      });
    }

    const { product: productId, category, owner, ownerName, ...rest } = parsed.data;
  

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const task = await Task.create({
      product: productId,
      owner: owner || req.user.id,           // ✅ allow frontend-sent owner
    ownerName: ownerName || rest.ownerName || req.user.name, // prefer frontend name
      category,
      ...rest,
      createdDate: rest.createdDate ? new Date(rest.createdDate) : undefined,
      startDate: rest.startDate ? new Date(rest.startDate) : undefined,
      expectedEndDate: rest.expectedEndDate ? new Date(rest.expectedEndDate) : undefined,
      endDate: rest.endDate ? new Date(rest.endDate) : undefined,
      assignee: assignee  // auto-assign current user as assignee
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Error creating task", error: err.message });
  }
}

// ---------------- UPDATE TASK ----------------
export async function updateTask(req, res) {
  try {
    const parsed = partialTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: parsed.error.errors.map(e => e.message).join(", ")
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
    res.status(500).json({ message: "Error updating task", error: err.message });
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
    res.status(500).json({ message: "Error fetching task", error: err.message });
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
    res.status(500).json({ message: "Error fetching tasks", error: err.message });
  }
}

// ---------------- DELETE TASK ----------------
export async function deleteTask(req, res) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err.message });
  }
}
