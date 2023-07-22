import express from "express";
import authentication from "../../middleware/authentication";
import validator from "../../middleware/validator";
import schema from "./schema";
import {
  addAparmentForRental,
  getAvailableApartmentRentals,
  getFeaturedApartmentRentals,
  getSingleRental,
  updateApartmentRental,
  updateRentalImage,
} from "../../controllers/rent/rental";

const router = express.Router();

router.get("/", getAvailableApartmentRentals);
router.get("/featured", getFeaturedApartmentRentals);
router.get("/:id", getSingleRental);
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
router.patch(
  "/image/:rentalId/:imageIndex",
  authentication,
  validator(schema.updateRentalImage),
  updateRentalImage
);

export default router;
