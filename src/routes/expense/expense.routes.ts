import express from "express";
import authentication from "../../middleware/authentication";
import { adminRole } from "../../middleware/authorization";
import validator from "../../middleware/validator";
import schema from "./schema";
import {
  createExpense,
  deleteExpense,
  getExpense,
  getExpenses,
  updateExpense,
} from "../../controllers/expense/expense";

const router = express.Router();

router.post("/", authentication, validator(schema.payload), createExpense);
router.get("/", authentication, getExpenses);
router.get("/:id", authentication, getExpense);
router.patch("/:id", authentication, adminRole, updateExpense);
router.delete("/:id", authentication, adminRole, deleteExpense);

export default router;
