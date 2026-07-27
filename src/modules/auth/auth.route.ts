import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

//login route set up
router.post("/login", authController.loginUser);

//refresh token route set up
router.post("/refresh-token", authController.refreshToken);

export const authRoutes = router;