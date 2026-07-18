import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { gearController } from "./gear.controller";

const router = Router();

// 1. PUBLIC: Get all gear (Supports filtering by ?category=... &brand=... &maxPrice=...)
router.get("/", gearController.getAllGear);


// 2. PUBLIC: Get a single gear item's details by its ID
router.get("/:id", gearController.getGearById);

// 3. PROTECTED: Only PROVIDERS can add new gear to the inventory
//router.post("/", auth(Role.PROVIDER), gearController.createGear);
router.post(
    "/", 
    auth(Role.PROVIDER, Role.CUSTOMER, Role.ADMIN), 
    gearController.createGear
);

export const gearRoutes = router;