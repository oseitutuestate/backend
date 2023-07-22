import { Request, Response } from "express";
import BotResponse from "../../models/BotResponse";

async function getAllBotResponses(req: Request, res: Response) {
  const botResponses = await BotResponse.find();
  res.status(200).json({ data: botResponses });
}
async function createBotResponse(req: Request, res: Response) {
  const botResponse = await BotResponse.create(req.body);
  res.status(200).json({ data: botResponse });
}
async function getSingleBotResponse(req: Request, res: Response) {
  const botResponse = await BotResponse.findById(req.params.id);
  res.status(200).json({ data: botResponse });
}
async function updateBotResponse(req: Request, res: Response) {
  const botResponse = await BotResponse.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({ data: botResponse });
}
async function deleteBotResponse(req: Request, res: Response) {
  await BotResponse.findById(req.params.id);
  res
    .status(200)
    .json({ message: `bot response of id ${req.params.id} deleted.` });
}

export {
  getAllBotResponses,
  createBotResponse,
  getSingleBotResponse,
  updateBotResponse,
  deleteBotResponse,
};
