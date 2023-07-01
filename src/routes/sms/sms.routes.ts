import express from "express";
import authentication from "../../middleware/authentication";
import validator from "../../middleware/validator";
import schema from "./schema";
import { sendMessage } from "../../controllers/sms/sms";

const router = express.Router();

router.post("/send", validator(schema.payload), authentication, sendMessage);

export default router;
