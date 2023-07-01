import express from "express";
import { adminRole } from "../../middleware/authorization";
import authentication from "../../middleware/authentication";
import validator from "../../middleware/validator";
import schema from "./schema";
import {
  getAppartment,
  createAppartment,
  deleteAppartment,
  getAppartments,
  updateAppartment,
} from "../../controllers/apartment/apartment";

const router = express.Router();

router.get("/all", authentication, getAppartments);
router.get("/:id", authentication, getAppartment);
router.post(
  "/create",
  validator(schema.payload),
  authentication,
  createAppartment
);
router.patch("/:id", authentication, updateAppartment);
router.delete("/:id", authentication, adminRole, deleteAppartment);

export default router;
