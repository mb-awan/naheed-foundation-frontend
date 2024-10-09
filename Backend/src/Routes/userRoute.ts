import express, { Router } from "express";
import { signup, login } from "../Controller/userController"; // Ensure you're exporting signup specifically

const router: Router = express.Router();

// Use the correct method for the signup route
router.post("/signup", signup);
router.post("/login", login);

export default router;
