const express = require("express");
const router = express.Router();
import ProductController from "../controllers/ProductController";

router.get("/read", ProductController.read);
router.get("/readAllType", ProductController.readAllType);
router.put("/update", ProductController.update);
router.delete("/delete", ProductController.delete);
router.post("/create", ProductController.create);

export default router;
