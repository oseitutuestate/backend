import express from "express";
import { adminRole } from "../../middleware/authorization";
import authentication from "../../middleware/authentication";
import validator from "../../middleware/validator";
import schema from "./schema";
import {
  createRentCommission,
  getRentCommissions,
  getSingleRentCommission,
  updateRentCommission,
} from "../../controllers/rent/rental_commission";

const router = express.Router();

router.get("/all", authentication, adminRole, getRentCommissions);
router.get("/:id", authentication, adminRole, getSingleRentCommission);
router.post(
  "/create",
  validator(schema.payloadRentComm),
  authentication,
  adminRole,
  createRentCommission
);
router.patch(
  "/:id",
  validator(schema.updateRentComm),
  authentication,
  adminRole,
  updateRentCommission
);

export default router;
