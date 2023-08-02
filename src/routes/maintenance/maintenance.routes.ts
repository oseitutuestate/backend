import express from "express";
import { adminRole } from "../../middleware/authorization";
import authentication from "../../middleware/authentication";
import validator from "../../middleware/validator";
import schema from "./schema";
import {
  createMaintenance,
  deleteMaintenance,
  getAllMaintenance,
  getMaintenance,
  updateMaintenance,
} from "../../controllers/maintenance/maintenance";

const router = express.Router();

router.get("/", getAllMaintenance);
router.get("/:id", authentication, getMaintenance);
router.post("/", authentication, validator(schema.payload), createMaintenance);
router.patch(
  "/:id",
  authentication,
  validator(schema.update),
  updateMaintenance
);
router.delete("/:id", authentication, adminRole, deleteMaintenance);

export default router;
