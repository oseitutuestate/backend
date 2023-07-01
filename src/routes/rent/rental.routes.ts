import express from "express";
import { adminRole } from "../../middleware/authorization";
import authentication from "../../middleware/authentication";
import validator from "../../middleware/validator";
import schema from "./schema";
import {
  addAparmentForRental,
  getAvailableApartmentRentals,
  getSingleRental,
  updateApartmentRental,
} from "../../controllers/rent/rental";

const router = express.Router();

router.get("/all", authentication, getAvailableApartmentRentals);
router.get("/:id", authentication, getSingleRental);
router.post(
  "/create",
  validator(schema.payloadRental),
  authentication,
  addAparmentForRental
);
router.patch(
  "/:id",
  authentication,
  validator(schema.updateRental),
  updateApartmentRental
);

export default router;
