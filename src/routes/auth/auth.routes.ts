import express from "express";
import { signin, signup } from "../../controllers/auth/auth";
import { adminRole } from "../../middleware/authorization";
import authentication from "../../middleware/authentication";
import validator from "../../middleware/validator";
import schema from "./schema";

const router = express.Router();

router.post("/signin", validator(schema.signinAuth), signin);
router.post(
  "/signup",
  validator(schema.signupAuth),
  authentication,
  adminRole,
  signup
);

export default router;
