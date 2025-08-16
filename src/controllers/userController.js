import { z } from "zod";
import User from "../models/User.js";

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["admin", "user"]).default("user"),
  active: z.boolean().optional()
});

export async function createUser(req, res) {
  const parsed = createUserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.errors.map(e => e.message).join(", ") });
  }
  const exists = await User.findOne({ email: parsed.data.email });
  if (exists) return res.status(409).json({ message: "Email already registered" });

  const user = await User.create(parsed.data);
  res.status(201).json({ id: user._id });
}

export async function listUsers(_req, res) {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
}

export async function getMe(req, res) {
  res.json(req.currentUser || null);
}
