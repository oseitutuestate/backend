import express from "express";
import { adminRole } from "../../middleware/authorization";
import authentication from "../../middleware/authentication";
import validator from "../../middleware/validator";
import schema from "./schema";
import {
  createAsset,
  deleteAsset,
  getAsset,
  getAssets,
  updateAsset,
} from "../../controllers/asset/asset";

const router = express.Router();

router.get("/", getAssets);
router.get("/:id", authentication, getAsset);
router.post("/", authentication, validator(schema.payload), createAsset);
router.patch("/:id", authentication, validator(schema.update), updateAsset);
router.delete("/:id", authentication, adminRole, deleteAsset);

export default router;
