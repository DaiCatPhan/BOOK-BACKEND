const express = require("express");
const router = express.Router();
import ProductController from "../controllers/ProductController";
import uploadCloud from "../middlewares/uploadImage";

router.get("/read", ProductController.read);
router.get("/readAllType", ProductController.readAllType);
router.put("/update", ProductController.update);
router.delete("/delete", ProductController.delete);
router.post("/create", uploadCloud.single("HinhHH"), ProductController.create);

export default router;
