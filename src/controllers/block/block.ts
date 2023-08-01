import { Request, Response } from "express";
import Block from "../../models/Block";

const getBlocks = async (req: Request, res: Response) => {
  const blocks = await Block.find();
  res.status(200).json({ blocks });
};

const getBlock = async (req: Request, res: Response) => {
  const id = req.params.id;
  const block = await Block.findById(id);
  res.status(200).json({ block });
};

const createBlock = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const block = await Block.create({
      name,
    });
    if (block) {
      res.status(201).json({ error: null, data: block });
    }
  } catch (error) {}
};

const updateBlock = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const block = await Block.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ block });
  } catch (error) {}
};

const deleteBlock = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Block.findByIdAndDelete(id);
  res.status(200).json({ error: null, msg: "Block deleted successfully" });
};

export { getBlocks, getBlock, createBlock, updateBlock, deleteBlock };
