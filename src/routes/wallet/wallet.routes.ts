import express from "express";
import { adminRole } from "../../middleware/authorization";
import authentication from "../../middleware/authentication";
import validator from "../../middleware/validator";
import schema from "./schema";
import {
  getWallet,
  createWallet,
  deleteWallet,
  getWallets,
  updateWallet,
} from "../../controllers/wallets/wallets";

const router = express.Router();

router.get("/", getWallets);
router.get("/:id", authentication, getWallet);
router.post("/", validator(schema.payload), authentication, createWallet);
router.patch("/:id", authentication, updateWallet);
router.delete("/:id", authentication, adminRole, deleteWallet);

export default router;
