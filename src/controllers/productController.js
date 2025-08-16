import { z } from "zod";
import Product from "../models/Product.js";
import Task from "../models/Task.js";

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional()
});

export async function createProduct(req, res) {
  const parsed = productSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.errors.map(e => e.message).join(", ") });
  }
  const exists = await Product.findOne({ name: parsed.data.name });
  if (exists) return res.status(409).json({ message: "Product already exists" });

  const product = await Product.create({ ...parsed.data, createdBy: req.user.id });
  res.status(201).json(product);
}

export async function listProducts(_req, res) {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
}

export async function getProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
}

export async function updateProduct(req, res) {
  const parsed = productSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.errors.map(e => e.message).join(", ") });
  }
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: parsed.data },
    { new: true }
  );
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
}

export async function deleteProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });

  await Task.deleteMany({ product: product._id });
  await product.deleteOne();
  res.json({ message: "Deleted" });
}

export async function listTasksByProduct(req, res) {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const tasks = await Task.find({ product: productId }).sort({ createdAt: -1 });
  res.json(tasks);
}
