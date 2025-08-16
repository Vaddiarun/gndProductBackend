
  import jwt from "jsonwebtoken";
  import { z } from "zod";
  import bcrypt from "bcryptjs";
  import User from "../models/User.js";

  // ───────────── LOGIN ─────────────
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  });

  function signToken(user) {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    });
  }

  export async function login(req, res) {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: parsed.error.errors.map(e => e.message).join(", ") });
    }

    const { email, password } = parsed.data;

    const user = await User.findOne({ email, active: true });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  }

  // ───────────── REGISTER ─────────────
  const registerSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6)
  });

  export async function registerUser(req, res) {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: parsed.error.errors.map(e => e.message).join(", ") });
    }

    const { name, email, password } = parsed.data;

    try {
      // check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // hash password
      // const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        email,
        password: password,
        role: "user", // default role
        active: true
      });

      const token = signToken(newUser);

      res.status(201).json({
        message: "User registered successfully",
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
