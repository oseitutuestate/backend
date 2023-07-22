import express from "express";
import {
  getAllBotUsers,
  getSingleBotUser,
  updateBotUser,
} from "../../controllers/chatbot/bot.users";

const router = express.Router();

router.get("/", getAllBotUsers);
router.get("/:id", getSingleBotUser);
router.patch("/:id", updateBotUser);

export default router;
