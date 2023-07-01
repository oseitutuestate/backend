import express from "express";
import { adminRole } from "../../middleware/authorization";
import authentication from "../../middleware/authentication";
// import validator from "../../middleware/validator";
// import schema from "./schema";
import {
  getFacilityPayments,
  deleteFacilityPayment,
  getFacilityPayment,
  updateFacilityPayment,
} from "../../controllers/facility_payment/facility_payment";

const router = express.Router();

router.get("/all", authentication, getFacilityPayments);
router.get("/:id", authentication, getFacilityPayment);
router.patch("/:id", authentication, updateFacilityPayment);
router.delete("/:id", authentication, adminRole, deleteFacilityPayment);

export default router;
