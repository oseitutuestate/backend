import express from "express";
import authentication from "../../middleware/authentication";
import { adminRole } from "../../middleware/authorization";
// import validator from "../../middleware/validator";
// import schema from "./schema";
import {
  deleteExpense,
  getExpense,
  getExpenses,
  updateExpense,
} from "../../controllers/expense/expense";

const router = express.Router();

router.get("/all", authentication, getExpenses);
router.get("/:id", authentication, getExpense);
// router.patch("/:id", authentication, adminRole, updateExpense);
router.delete("/:id", authentication, adminRole, deleteExpense);

export default router;
