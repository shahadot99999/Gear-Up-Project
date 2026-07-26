import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { gearController } from "./gear.controller";

const router = Router();


router.get("/", gearController.getAllGear);



router.get("/:id", gearController.getGearById);

 //  PROVIDERS can add new gear to the inventory
router.post("/", auth(Role.PROVIDER), gearController.createGear);

// router.post(
//     "/", 
//     auth(Role.PROVIDER, Role.CUSTOMER, Role.ADMIN), 
//     gearController.createGear
// );

export const gearRoutes = router;