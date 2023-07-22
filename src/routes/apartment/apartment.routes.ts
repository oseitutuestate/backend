import express from "express";
import { adminRole } from "../../middleware/authorization";
import authentication from "../../middleware/authentication";
import validator from "../../middleware/validator";
import schema from "./schema";
import {
  getApartment,
  createApartment,
  deleteApartment,
  getApartments,
  updateApartment,
} from "../../controllers/apartment/apartment";

const router = express.Router();

router.get("/", getApartments);
router.get("/:id", authentication, getApartment);
router.post(
  "/create",
  validator(schema.payload),
  authentication,
  createApartment
);
router.patch("/:id", authentication, updateApartment);
router.delete("/:id", authentication, adminRole, deleteApartment);

export default router;
