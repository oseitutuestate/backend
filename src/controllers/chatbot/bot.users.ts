import { Request, Response } from "express";
import BotUser from "../../models/BotUser";

async function getAllBotUsers(req: Request, res: Response) {
  const botusers = await BotUser.find();
  res.status(200).json({ data: botusers });
}
async function getSingleBotUser(req: Request, res: Response) {
  const botuser = await BotUser.findById(req.params.id);
  res.status(200).json({ data: botuser });
}
async function updateBotUser(req: Request, res: Response) {
  const botuser = await BotUser.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ data: botuser });
}
async function deleteBotUser(req: Request, res: Response) {
  await BotUser.findById(req.params.id);
  res.status(200).json({ message: `bot user of id ${req.params.id} deleted.` });
}

export { getAllBotUsers, getSingleBotUser, updateBotUser, deleteBotUser };
