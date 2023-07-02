import express from "express";
import { adminRole } from "../../middleware/authorization";
import authentication from "../../middleware/authentication";
import validator from "../../middleware/validator";
import schema from "./schema";
import {
  bookApt,
  getBookedAirbnb,
  getRentedApts,
  getSingleRentedAny,
  updateRent,
} from "../../controllers/rent/rent";

const router = express.Router();

router.get("/airbnb/all", authentication, getBookedAirbnb);
router.get("/rented/all", authentication, getRentedApts);
router.get("/:id", authentication, getSingleRentedAny);
router.post("/create", authentication, validator(schema.payloadRent), bookApt);
router.patch("/:id", authentication, validator(schema.updateRent), updateRent);

export default router;
