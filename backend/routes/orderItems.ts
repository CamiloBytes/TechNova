import { Router } from "express";
import * as controller from "../controllers/orderItemsController";

const router = Router();

router.get("/", controller.getOrderItems);
router.post("/", controller.createOrderItem);
router.put("/:id", controller.updateOrderItem);
router.delete("/:id", controller.deleteOrderItem);

export default router;
