import express from "express";
import { adminRole } from "../../middleware/authorization";
import authentication from "../../middleware/authentication";
import validator from "../../middleware/validator";
import schema from "./schema";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../../controllers/task/task";

const router = express.Router();

router.get("/", getTasks);
router.get("/:id", authentication, getTask);
router.post("/", authentication, validator(schema.payload), createTask);
router.patch("/:id", authentication, validator(schema.update), updateTask);
router.delete("/:id", authentication, adminRole, deleteTask);

export default router;
