const express = require("express");
const router = express.Router();
import ProductController from "../controllers/ProductController";

router.get("/read", ProductController.read);
router.post("/create", ProductController.create);

export default router;
