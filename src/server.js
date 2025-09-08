// // // import "dotenv/config.js";
// // // import express from "express";
// // // import cors from "cors";
// // // import helmet from "helmet";
// // // import morgan from "morgan";
// // // import rateLimit from "express-rate-limit";
// // // import { connectDB } from "./config/db.js";
// // // import { validateEnv } from "./utils/validateEnv.js";
// // // import { errorHandler } from "./middleware/errorHandler.js";

// // // import authRoutes from "./routes/authRoutes.js";
// // // import userRoutes from "./routes/userRoutes.js";
// // // import productRoutes from "./routes/productRoutes.js";
// // // import taskRoutes from "./routes/taskRoutes.js";

// // // validateEnv();

// // // const app = express();

// // // // Security & utils
// // // app.use(helmet());
// // // app.use(express.json({ limit: "1mb" }));

// // // // CORS
// // // const origins = (process.env.CORS_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
// // // app.use(
// // //   cors({
// // //     origin: (origin, cb) => {
// // //       if (!origin || origins.length === 0 || origins.includes(origin)) return cb(null, true);
// // //       return cb(new Error("Not allowed by CORS"));
// // //     },
// // //     credentials: true
// // //   })
// // // );

// // // // Logging
// // // app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// // // // Basic rate limit on auth
// // // const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
// // // app.use("/api/auth", authLimiter);

// // // // Routes
// // // app.get("/health", (_req, res) => res.json({ ok: true, ts: new Date().toISOString() }));
// // // app.use("/api/auth", authRoutes);
// // // app.use("/api/users", userRoutes);
// // // app.use("/api/products", productRoutes);
// // // app.use("/api/tasks", taskRoutes);

// // // // Error handler
// // // app.use(errorHandler);

// // // // Start
// // // const PORT = process.env.PORT || 8080;
// // // const MONGODB_URI = process.env.MONGODB_URI;

// // // connectDB(MONGODB_URI)
// // //   .then(() => {
// // //     app.listen(PORT, () => {
// // //       console.log(`🚀 Server running on http://localhost:${PORT}`);
// // //     });
// // //   })
// // //   .catch((err) => {
// // //     console.error("DB connection failed", err);
// // //     process.exit(1);
// // //   });
// // // import "dotenv/config.js";
// // // import express from "express";
// // // import cors from "cors";
// // // import helmet from "helmet";
// // // import morgan from "morgan";
// // // import rateLimit from "express-rate-limit";
// // // import { createServer } from "http";
// // // import { WebSocketServer } from "ws";

// // // import { connectDB } from "./config/db.js";
// // // import { validateEnv } from "./utils/validateEnv.js";
// // // import { errorHandler } from "./middleware/errorHandler.js";

// // // import authRoutes from "./routes/authRoutes.js";
// // // import userRoutes from "./routes/userRoutes.js";
// // // import productRoutes from "./routes/productRoutes.js";
// // // import taskRoutes from "./routes/taskRoutes.js";

// // // validateEnv();

// // // const app = express();

// // // // Security & utils
// // // app.use(helmet());
// // // app.use(express.json({ limit: "1mb" }));

// // // // CORS
// // // const origins = (process.env.CORS_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
// // // app.use(
// // //   cors({
// // //     origin: (origin, cb) => {
// // //       if (!origin || origins.length === 0 || origins.includes(origin)) return cb(null, true);
// // //       return cb(new Error("Not allowed by CORS"));
// // //     },
// // //     credentials: true
// // //   })
// // // );

// // // // Logging
// // // app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// // // // Basic rate limit on auth
// // // const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
// // // app.use("/api/auth", authLimiter);

// // // // Routes
// // // app.get("/", (req, res) => {
// // //   res.send("Backend is running ✅. Check /health for status.");
// // // });

// // // app.get("/health", (_req, res) => res.json({ ok: true, ts: new Date().toISOString() }));
// // // app.use("/api/auth", authRoutes);
// // // app.use("/api/users", userRoutes);
// // // app.use("/api/products", productRoutes);
// // // app.use("/api/tasks", taskRoutes);

// // // // Error handler
// // // app.use(errorHandler);

// // // // Start
// // // const PORT = process.env.PORT || 8080;
// // // const MONGODB_URI = process.env.MONGODB_URI;

// // // // Create HTTP server
// // // const server = createServer(app);

// // // // Attach WebSocket server at /ws/ws
// // // const wss = new WebSocketServer({ server, path: "/ws/ws" });

// // // wss.on("connection", (ws) => {
// // //   console.log("🔌 Client connected to /ws/ws");

// // //   // Send welcome message
// // //   ws.send(JSON.stringify({ message: "Hello from WebSocket server" }));

// // //   // Listen for messages from client
// // //   ws.on("message", (msg) => {
// // //     console.log("📩 Received:", msg.toString());

// // //     // Echo back
// // //     ws.send(JSON.stringify({ echo: msg.toString() }));
// // //   });

// // //   ws.on("close", () => {
// // //     console.log("❌ Client disconnected");
// // //   });
// // // });

// // // connectDB(MONGODB_URI)
// // //   .then(() => {
// // //     server.listen(PORT, () => {
// // //       console.log(`🚀 Server running on http://localhost:${PORT}`);
// // //     });
// // //   })
// // //   .catch((err) => {
// // //     console.error("DB connection failed", err);
// // //     process.exit(1);
// // //   });
// // import "dotenv/config.js";
// // import express from "express";
// // import cors from "cors";
// // import helmet from "helmet";
// // import morgan from "morgan";
// // import rateLimit from "express-rate-limit";
// // import { createServer } from "http";
// // import { WebSocketServer } from "ws";

// // import { connectDB } from "./config/db.js";
// // import { validateEnv } from "./utils/validateEnv.js";
// // import { errorHandler } from "./middleware/errorHandler.js";

// // import authRoutes from "./routes/authRoutes.js";
// // import userRoutes from "./routes/userRoutes.js";
// // import productRoutes from "./routes/productRoutes.js";
// // import taskRoutes from "./routes/taskRoutes.js";

// // validateEnv();


// // const app = express();
// // app.use(cors());

// // app.use(cors({
// //   origin: "https://gndengineeringdashboard.onrender.com", // frontend URL
// //   methods: ["GET", "POST", "PUT", "DELETE"],
// //   credentials: true
// // }));

// // // ────────────── Security & utils ──────────────
// // app.use(helmet());
// // app.use(express.json({ limit: "1mb" }));

// // // ────────────── CORS ──────────────
// // const origins = (process.env.CORS_ORIGINS || "")
// //   .split(",")
// //   .map((s) => s.trim())
// //   .filter(Boolean);

// // app.use(
// //   cors({
// //     origin: (origin, cb) => {
// //       if (!origin || origins.length === 0 || origins.includes(origin)) return cb(null, true);
// //       return cb(new Error("Not allowed by CORS"));
// //     },
// //     credentials: true,
// //   })
// // );

// // app.use((req, res, next) => {
// //   console.log("Incoming request:", req.method, req.path);
// //   next();
// // });

// // // ────────────── Logging ──────────────
// // app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// // // ────────────── Rate Limiting ──────────────
// // const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
// // app.use("/api/auth", authLimiter);

// // // ────────────── Routes ──────────────
// // app.get("/", (req, res) => {
// //   res.send("Backend is running ✅. Check /health for status.");
// // });

// // app.get("/health", (_req, res) => res.json({ ok: true, ts: new Date().toISOString() }));
// // app.use("/api/auth", authRoutes);
// // app.use("/api/users", userRoutes);
// // app.use("/api/products", productRoutes);
// // app.use("/api/tasks", taskRoutes);

// // // ────────────── Error Handler ──────────────
// // app.use(errorHandler);

// // // ────────────── Server + DB Start ──────────────
// // // ✅ Only start if not in test mode
// // if (process.env.NODE_ENV !== "test") {
// //   const PORT = process.env.PORT || 8080;
// //   const MONGODB_URI = process.env.MONGODB_URI;

// //   const server = createServer(app);

// //   // Attach WebSocket server
// //   const wss = new WebSocketServer({ server, path: "/ws/ws" });
// //   wss.on("connection", (ws) => {
// //     console.log("🔌 Client connected to /ws/ws");
// //     ws.send(JSON.stringify({ message: "Hello from WebSocket server" }));

// //     ws.on("message", (msg) => {
// //       console.log("📩 Received:", msg.toString());
// //       ws.send(JSON.stringify({ echo: msg.toString() }));
// //     });

// //     ws.on("close", () => {
// //       console.log("❌ Client disconnected");
// //     });
// //   });

// //   // Connect DB & start listening
// //   connectDB(MONGODB_URI)
// //     .then(() => {
// //       server.listen(PORT, () => {
// //         console.log(`🚀 Server running on http://localhost:${PORT}`);
// //       });
// //     })
// //     .catch((err) => {
// //       console.error("DB connection failed", err);
// //       process.exit(1);
// //     });
// // }

// // // ✅ Export app for Jest + Supertest
// // export default app;
// // server.js
// import "dotenv/config.js";
// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import morgan from "morgan";
// import rateLimit from "express-rate-limit";
// import { createServer } from "http";
// import { WebSocketServer } from "ws";

// import { connectDB } from "./config/db.js";
// import { validateEnv } from "./utils/validateEnv.js";
// import { errorHandler } from "./middleware/errorHandler.js";

// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import taskRoutes from "./routes/taskRoutes.js";

// // ────────────── Environment Validation ──────────────
// validateEnv();

// // ────────────── Express App Setup ──────────────
// const app = express();



// // ────────────── Security ──────────────
// app.use(helmet());
// app.use(express.json({ limit: "1mb" }));

// // ────────────── CORS ──────────────
// const allowedOrigins = [
//   "https://gndengineeringdashboard.onrender.com", // deployed frontend
//   "http://localhost:3000", // local dev
// ];

// app.use(cors({
//     origin: true,
//     credentials: true,
//   }));

// // app.use(
// //   cors({
// //     origin: (origin, callback) => {
// //       // Allow requests with no origin (like Postman, mobile apps)
// //       if (!origin) return callback(null, true);

// //       if (allowedOrigins.includes(origin)) {
// //         callback(null, true);
// //       } else {
// //         callback(new Error("Not allowed by CORS"));
// //       }
// //     },
// //     methods: ["GET", "POST", "PUT", "DELETE"],
// //     credentials: true,
// //   })
// // );

// // ────────────── Logging ──────────────
// app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// // ────────────── Rate Limiting ──────────────
// const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
// app.use("/api/auth", authLimiter);

// // ────────────── Routes ──────────────
// app.get("/", (_req, res) => {
//   res.send("Backend is running ✅. Check /health for status.");
// });

// app.get("/health", (_req, res) => res.json({ ok: true, ts: new Date().toISOString() }));

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/tasks", taskRoutes);

// // ────────────── Error Handler ──────────────
// app.use(errorHandler);

// // ────────────── Server + DB Start ──────────────
// if (process.env.NODE_ENV !== "test") {
//   const PORT = process.env.PORT || 8080;
//   const MONGODB_URI = process.env.MONGODB_URI;

//   const server = createServer(app);

//   // ────────────── WebSocket Server ──────────────
//   const wss = new WebSocketServer({ server, path: "/ws/ws" });

//   wss.on("connection", (ws) => {
//     console.log("🔌 Client connected to /ws/ws");
//     ws.send(JSON.stringify({ message: "Hello from WebSocket server" }));

//     ws.on("message", (msg) => {
//       console.log("📩 Received:", msg.toString());
//       ws.send(JSON.stringify({ echo: msg.toString() }));
//     });

//     ws.on("close", () => {
//       console.log("❌ Client disconnected");
//     });
//   });

//   // ────────────── Connect DB & Start Server ──────────────
//   connectDB(MONGODB_URI)
//     .then(() => {
//       server.listen(PORT, () => {
//         console.log(`🚀 Server running on http://localhost:${PORT}`);
//       });
//     })
//     .catch((err) => {
//       console.error("DB connection failed", err);
//       process.exit(1);
//     });
// }

// // ✅ Export app for Jest + Supertest
// export default app;
import "dotenv/config.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { createServer } from "http";
import { WebSocketServer } from "ws";
 
import { connectDB } from "./config/db.js";
import { validateEnv } from "./utils/validateEnv.js";
import { errorHandler } from "./middleware/errorHandler.js";
 
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
 
// ────────────── Environment Validation ──────────────
validateEnv();
 
// ────────────── Express App Setup ──────────────
const app = express();

  const allowedOrigins = [
  "https://gndengineeringdashboard.onrender.com", // deployed frontend
  "http://localhost:3000", // local dev
  "https://gndengineeringdashboard.thinxview.io"
];
// ────────────── CORS FIRST ──────────────
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
 
// ────────────── Security ──────────────
app.use(helmet());
app.use(express.json({ limit: "1mb" }));
 
// ────────────── Logging ──────────────
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
 
// ────────────── Rate Limiting ──────────────
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use("/api/auth", authLimiter);
 
// ────────────── Routes ──────────────
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/tasks", taskRoutes);
 
// ────────────── Error Handler ──────────────
app.use(errorHandler);
 
// ────────────── Server + DB Start ──────────────
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 8080;
  const MONGODB_URI = process.env.MONGODB_URI;
 
  const server = createServer(app);
 
  // ────────────── WebSocket Server ──────────────
  const wss = new WebSocketServer({ server, path: "/ws/ws" });
 
  wss.on("connection", (ws) => {
    console.log("🔌 Client connected to /ws/ws");
    ws.send(JSON.stringify({ message: "Hello from WebSocket server" }));
 
    ws.on("message", (msg) => {
      console.log("📩 Received:", msg.toString());
      ws.send(JSON.stringify({ echo: msg.toString() }));
    });
 
    ws.on("close", () => {
      console.log("❌ Client disconnected");
    });
  });
 
  // ────────────── Connect DB & Start Server ──────────────
  connectDB(MONGODB_URI)
    .then(() => {
      server.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error("DB connection failed", err);
      process.exit(1);
    });
}
 
// ✅ Export app for Jest + Supertest
export default app;
 