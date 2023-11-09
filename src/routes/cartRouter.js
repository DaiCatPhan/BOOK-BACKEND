const express = require("express");
const router = express.Router();
import CartController from "../controllers/CartController";

router.post("/create", CartController.create);
router.get("/readPanigation", CartController.readPanigation);
router.get("/read", CartController.read);
router.put("/update", CartController.update);
router.delete("/delete", CartController.delete);

export default router;
