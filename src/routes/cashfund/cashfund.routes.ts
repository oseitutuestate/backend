import express from "express";
import { adminRole } from "../../middleware/authorization";
import authentication from "../../middleware/authentication";
import validator from "../../middleware/validator";
import schema from "./schema";
import {
  createCashFund,
  deleteCashFund,
  getCashFund,
  getCashFunds,
  updateCashFund,
} from "../../controllers/cashfund/cashfund";

const router = express.Router();

router.get("/", getCashFunds);
router.get("/:id", authentication, getCashFund);
router.post("/", authentication, validator(schema.payload), createCashFund);
router.patch("/:id", authentication, updateCashFund);
router.delete("/:id", authentication, adminRole, deleteCashFund);

export default router;
