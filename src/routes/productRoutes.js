import { Router } from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import {
  createProduct,
  listProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  listTasksByProduct
} from "../controllers/productController.js";

const router = Router();

router.get("/", requireAuth, listProducts);
router.get("/:id", requireAuth, getProduct);
router.get("/:id/tasks", requireAuth, listTasksByProduct);

router.post("/", requireAuth, requireAdmin, createProduct);
router.put("/:id", requireAuth, requireAdmin, updateProduct);
router.delete("/:id", requireAuth, requireAdmin, deleteProduct);

export default router;
