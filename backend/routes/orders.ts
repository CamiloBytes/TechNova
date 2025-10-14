import { Router } from "express";
import * as controller from "../controllers/ordersController";

const router = Router();

router.get("/", controller.getOrders);
router.post("/", controller.createOrder);
router.put("/:id", controller.updateOrder);
router.delete("/:id", controller.deleteOrder);

export default router;
