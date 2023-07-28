import express from "express";
import { adminRole } from "../../middleware/authorization";
import authentication from "../../middleware/authentication";
import validator from "../../middleware/validator";
import schema from "./schema";
import {
  createTransaction,
  deleteTransaction,
  getSingleTransaction,
  getTransactions,
} from "../../controllers/transaction/transaction";

const router = express.Router();

router.get("/", getTransactions);
router.get("/:id", authentication, getSingleTransaction);
router.post("/", validator(schema.payload), authentication, createTransaction);
router.delete("/:id", authentication, adminRole, deleteTransaction);

export default router;
