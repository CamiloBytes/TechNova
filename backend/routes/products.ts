import { Router } from "express";
import * as controller from "../controllers/productsController";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", controller.getProducts);
router.post("/", requireAdmin, controller.createProduct);
router.put("/:id", requireAdmin, controller.updateProduct);
router.delete("/:id", requireAdmin, controller.deleteProduct);

export default router;
