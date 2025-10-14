import { Router } from "express";
import * as controller from "../controllers/usersController";

const router = Router();

router.get("/", controller.getUsers);
router.post("/register", controller.createUser);
router.post("/login", controller.loginUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

export default router;
