import { Request, Response } from "express";
import Wallet from "../../models/Wallet";

const getWallets = async (req: Request, res: Response) => {
  let page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
  const pageSize = req.query.pageSize
    ? parseInt(req.query.pageSize as string, 10)
    : 10;

  // Ensure that page is at least 1
  page = Math.max(1, page);

  const count = await Wallet.countDocuments();
  const totalPages = Math.ceil(count / pageSize);

  // Calculate the correct skip value
  const skipValue = (page - 1) * pageSize;

  const wallets = await Wallet.find().skip(skipValue).limit(pageSize);

  res.status(200).json({ message: "Wallets retrieved", wallets, totalPages });
};

const getWallet = async (req: Request, res: Response) => {
  const id = req.params.id;
  const wallet = await Wallet.findById(id);
  res.status(200).json({ wallet });
};

const createWallet = async (req: Request, res: Response) => {
  try {
    const { type, account, accountNumber } = req.body;
    const wlt = await Wallet.findOne({ type: type });
    if (wlt) {
      throw new Error(`Wallet type ${type} already exist!`);
    }
    const wallet = await Wallet.create({
      type,
      account,
      accountNumber,
    });
    if (wallet) {
      res.status(201).json({ error: null, data: wallet });
    }
  } catch (error) {}
};

const updateWallet = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const wallet = await Wallet.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ wallet });
  } catch (error) {}
};

const deleteWallet = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Wallet.findByIdAndDelete(id);
  res.status(200).json({ error: null, msg: "Wallet deleted successfully" });
};

export { getWallets, getWallet, createWallet, updateWallet, deleteWallet };
