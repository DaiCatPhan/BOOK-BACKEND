const express = require("express");
const router = express.Router();
import CustomerController from "../controllers/CustomerController";

router.put("/update", CustomerController.update);

export default router;
