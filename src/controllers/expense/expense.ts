import { Request, Response } from "express";
import Expense from "../../models/Expense";
import Wallet from "../../models/Wallet";
import { Types } from "mongoose";

const createExpense = async (req: Request, res: Response) => {
  try {
    const { item, quantity, unitPrice, totalAmount, walletId, user } = req.body;
    const wallet = await Wallet.findById(new Types.ObjectId(walletId));
    if (!wallet) {
      throw new Error(`Wallet of Id ${walletId} is not found!`);
    }
    const expense = await Expense.create({
      item,
      quantity,
      unitPrice,
      totalAmount,
      walletId: new Types.ObjectId(walletId),
      user,
    });
    if (expense) {
      const newBalance = wallet.balance - totalAmount;
      wallet.balance = newBalance;
      wallet.spendingHistory.push(expense._id);
      await wallet.save();
      res.status(201).json({ expense });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getExpenses = async (req: Request, res: Response) => {
  let page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
  const pageSize = req.query.pageSize
    ? parseInt(req.query.pageSize as string, 10)
    : 10;

  // Ensure that page is at least 1
  page = Math.max(1, page);

  const count = await Expense.countDocuments();
  const totalPages = Math.ceil(count / pageSize);

  // Calculate the correct skip value
  const skipValue = (page - 1) * pageSize;

  const expenses = await Expense.find()
    .populate({ path: "walletId" })
    .skip(skipValue)
    .limit(pageSize);
  res.status(200).json({ message: "Expenses retrieved", expenses, totalPages });
};

const getExpense = async (req: Request, res: Response) => {
  const id = req.params.id;
  const expense = await Expense.findById(id).populate({ path: "walletId" });
  res.status(200).json({ expense });
};

const updateExpense = async (req: Request, res: Response) => {
  const id = req.params.id;
  const expense = await Expense.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json({ expense });
};

const deleteExpense = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Expense.findByIdAndDelete(id);
  res.status(200).json({ error: null, msg: "Expense deleted successfully" });
};

export { createExpense, getExpenses, getExpense, updateExpense, deleteExpense };
