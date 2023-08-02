import express from "express";
import { adminRole } from "../../middleware/authorization";
import authentication from "../../middleware/authentication";
import validator from "../../middleware/validator";
import schema from "./schema";
import {
  getFacilityPayments,
  deleteFacilityPayment,
  getFacilityPayment,
  updateFacilityPayment,
  createRecordPayment,
} from "../../controllers/facility_payment/facility_payment";

const router = express.Router();

router.get("/", authentication, getFacilityPayments);
router.get("/:id", authentication, getFacilityPayment);
router.post(
  "/",
  authentication,
  validator(schema.payload),
  createRecordPayment
);
router.patch("/:id", authentication, adminRole, updateFacilityPayment);
router.delete("/:id", authentication, adminRole, deleteFacilityPayment);

export default router;
