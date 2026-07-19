import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { rentalController } from "./rental.controller";

const router = Router();

// Protect all rental routes so only logged-in users can access them
router.use(auth());

// POST /api/rentals - Create new rental order
router.post("/", rentalController.createRentalOrder);

// GET /api/rentals - Get logged-in user's rental orders
router.get("/", rentalController.getUserRentals);

// GET /api/rentals/:id - Get specific rental details
router.get("/:id", rentalController.getRentalDetails);

export const rentalRoutes = router;