const express = require("express");
const router = express.Router();
import CustomerController from "../controllers/CustomerController";

router.put("/update", CustomerController.update);
router.get("/readPanigation", CustomerController.readPanigation);
// router.delete("/delete", CustomerController.deleted);
// router.read("/read", CustomerController.read);

export default router;
