import "dotenv/config.js";
import { connectDB } from "../src/config/db.js";
import User from "../src/models/User.js";
import { validateEnv } from "../src/utils/validateEnv.js";

async function main() {
  validateEnv();
  await connectDB(process.env.MONGODB_URI);

  const email = process.env.SEED_ADMIN_EMAIL || "admin@thinxview.com";
  const password = process.env.SEED_ADMIN_PASSWORD || "Admin@12345";
  const name = process.env.SEED_ADMIN_NAME || "Thinxview Admin";

  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin already exists:", email);
    process.exit(0);
  }

  await User.create({
    name,
    email,
    password,
    role: "admin",
    active: true
  });

  console.log("✅ Admin created:", email);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
