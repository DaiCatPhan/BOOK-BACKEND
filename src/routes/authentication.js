const express = require("express");
const router = express.Router();
import AuthenticationController from "../controllers/AuthenticationController";

router.post("/register", AuthenticationController.register);
router.post("/login", AuthenticationController.login);
router.get("/logout", AuthenticationController.logout);
router.get("/getProfile", AuthenticationController.getProfile);

export default router;
