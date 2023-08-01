import express from "express";
import { adminRole } from "../../middleware/authorization";
import authentication from "../../middleware/authentication";
import validator from "../../middleware/validator";
import schema from "./schema";
import {
  getAmenities,
  createAmenities,
  deleteAmenities,
  getAmenity,
  updateAmenities,
} from "../../controllers/amenities/amenities";

const router = express.Router();

router.get("/", getAmenities);
router.get("/:id", authentication, getAmenity);
router.post("/", validator(schema.payload), authentication, createAmenities);
router.patch("/:id", authentication, updateAmenities);
router.delete("/:id", authentication, adminRole, deleteAmenities);

export default router;
