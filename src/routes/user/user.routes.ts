import express from "express";
import authentication from "../../middleware/authentication";
import { adminRole } from "../../middleware/authorization";
// import validator from "../../middleware/validator";
// import schema from "./schema";
import {
  getUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../../controllers/user/user";

const router = express.Router();

router.get("/", authentication, getUsers);
router.get("/:id", authentication, getUser);
router.patch("/:id", authentication, updateUser);
router.delete("/:id", authentication, adminRole, deleteUser);

export default router;
