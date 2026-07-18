import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { providerController } from "./provider.controller";

const router = Router();

// Secure all endpoints below - Only PROVIDERS are allowed access here
router.use(auth(Role.PROVIDER));

// Gear Inventory Management
router.post("/gear", providerController.addGear);
router.put("/gear/:id", providerController.updateGear);
router.delete("/gear/:id", providerController.deleteGear);

// Incoming Orders Management
//router.get("/orders", providerController.getIncomingOrders);
router.patch("/orders/:id", providerController.updateOrderStatus);

export const providerRoutes = router;