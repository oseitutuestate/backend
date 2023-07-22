import express from "express";
import {
  getAllConversations,
  getSingleConversation,
} from "../../controllers/chatbot/conversations";

const router = express.Router();

router.get("/", getAllConversations);
router.get("/:id", getSingleConversation);

export default router;
