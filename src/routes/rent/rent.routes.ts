import express from "express";
import { adminRole } from "../../middleware/authorization";
import authentication from "../../middleware/authentication";
import validator from "../../middleware/validator";
import schema from "./schema";
import {
  createRent,
  getRents,
  getSingleRent,
  updateRent,
} from "../../controllers/rent/rent";

const router = express.Router();

router.get("/all", authentication, getRents);
router.get("/:id", authentication, getSingleRent);
router.post(
  "/create",
  authentication,
  validator(schema.payloadRent),
  createRent
);
router.patch("/:id", authentication, validator(schema.updateRent), updateRent);

export default router;
