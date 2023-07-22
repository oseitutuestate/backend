import { Request, Response } from "express";
import Expense from "../../models/Expense";

const getExpenses = async (req: Request, res: Response) => {
  const expenses = await Expense.find();
  res.status(200).json({ expenses });
};

const getExpense = async (req: Request, res: Response) => {
  const id = req.params.id;
  const expense = await Expense.findById(id);
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

export { getExpenses, getExpense, updateExpense, deleteExpense };
