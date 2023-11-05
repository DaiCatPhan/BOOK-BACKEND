const express = require("express");
const router = express.Router();
import ProductController from "../controllers/ProductController";
import uploadCloud from "../middlewares/uploadImage";

router.get("/read", ProductController.read);
router.get("/readPanigate", ProductController.readPanigate);
router.put("/update", ProductController.update);
router.delete("/delete", ProductController.delete);
router.post("/create", uploadCloud.single("HinhHH"), ProductController.create);

export default router;
