import { Request, Response } from "express";
import Conversation from "../../models/Conversation";

async function getAllConversations(req: Request, res: Response) {
  const conversations = await Conversation.find()
    .populate({ path: "user" })
    .populate({ path: "initialResponse" })
    .populate({ path: "nextResponse" })
    .exec();

  res.status(200).json({ data: conversations });
}
async function getSingleConversation(req: Request, res: Response) {
  const conversation = await Conversation.findById(req.params.id)
    .populate({ path: "user" })
    .populate({ path: "initialResponse" })
    .populate({ path: "nextResponse" })
    .exec();
  res.status(200).json({ data: conversation });
}

export { getAllConversations, getSingleConversation };
