import express from "express";
import authentication from "../../middleware/authentication";
import { adminRole } from "../../middleware/authorization";
import validator from "../../middleware/validator";
import schema from "./schema";
import {
  createBlock,
  deleteBlock,
  getBlock,
  getBlocks,
  updateBlock,
} from "../../controllers/block/block";

const router = express.Router();

router.get("/all", authentication, getBlocks);
router.get("/:id", authentication, getBlock);
router.post("/create", validator(schema.payload), authentication, createBlock);
router.patch("/:id", validator(schema.update), authentication, updateBlock);
router.delete("/:id", authentication, deleteBlock);

export default router;
