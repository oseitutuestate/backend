import { Request, Response } from "express";
import CashFund from "../../models/CashFund";
import { Types } from "mongoose";
import Wallet from "../../models/Wallet";

const getCashFunds = async (req: Request, res: Response) => {
  let page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
  const pageSize = req.query.pageSize
    ? parseInt(req.query.pageSize as string, 10)
    : 10;

  // Ensure that page is at least 1
  page = Math.max(1, page);

  const count = await CashFund.countDocuments();
  const totalPages = Math.ceil(count / pageSize);

  // Calculate the correct skip value
  const skipValue = (page - 1) * pageSize;

  const cashFunds = await CashFund.find()
    .populate({ path: "wallet" })
    .skip(skipValue)
    .limit(pageSize);

  res
    .status(200)
    .json({ message: "CashFunds retrieved", cashFunds, totalPages });
};

const getCashFund = async (req: Request, res: Response) => {
  const id = req.params.id;
  const cashFunds = await CashFund.findById(id);
  res.status(200).json({ cashFunds });
};

const createCashFund = async (req: Request, res: Response) => {
  try {
    const { wallet, amount, fundedBy } = req.body;
    const wlt = await Wallet.findById(new Types.ObjectId(wallet));
    if (!wlt) {
      throw new Error("Wallet not found!");
    }

    // Add validation for amount and fundedBy fields if necessary
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Invalid amount value");
    }

    if (typeof fundedBy !== "string" || fundedBy.trim() === "") {
      throw new Error("Invalid fundedBy value");
    }

    const cashFund = await CashFund.create({
      wallet: new Types.ObjectId(wallet),
      amount,
      fundedBy,
    });

    if (cashFund) {
      const newBalance = wlt.balance + amount;
      wlt.balance = newBalance;
      wlt.fundHistory.push(new Types.ObjectId(cashFund._id));
      await wlt.save();

      res.status(201).json({ cashFund });
    }
  } catch (error) {
    throw error;
  }
};

const updateCashFund = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const cashFund = await CashFund.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ cashFund });
  } catch (error) {
    throw error;
  }
};

const deleteCashFund = async (req: Request, res: Response) => {
  const id = req.params.id;
  await CashFund.findByIdAndDelete(id);
  res.status(200).json({ error: null, msg: "CashFund deleted successfully" });
};

export {
  getCashFunds,
  getCashFund,
  createCashFund,
  updateCashFund,
  deleteCashFund,
};
