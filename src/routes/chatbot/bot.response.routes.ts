import express from "express";
import validator from "../../middleware/validator";
import schema from "./schema";
import {
  getAllBotResponses,
  createBotResponse,
  getSingleBotResponse,
  updateBotResponse,
  deleteBotResponse,
} from "../../controllers/chatbot/bot.response";

const router = express.Router();

router.get("/", getAllBotResponses);
router.post("/", validator(schema.payload), createBotResponse);
router.get("/:id", getSingleBotResponse);
router.patch("/:id", updateBotResponse);
router.delete("/:id", deleteBotResponse);

export default router;
