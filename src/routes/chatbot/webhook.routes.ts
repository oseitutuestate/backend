import express from "express";
import { verifyWebhook, webhook } from "../../controllers/chatbot/webhook";

const router = express.Router();

router.post("/", webhook);
router.get("/", verifyWebhook);

export default router;
