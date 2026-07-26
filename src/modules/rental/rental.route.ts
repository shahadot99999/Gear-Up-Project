import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { rentalController } from "./rental.controller";

const router = Router();


router.use(auth());


router.post("/", rentalController.createRentalOrder);


router.get("/", rentalController.getUserRentals);


router.get("/:id", rentalController.getRentalDetails);

export const rentalRoutes = router;