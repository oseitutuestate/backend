import { Request, Response } from "express";
import Expense from "../../models/Expense";

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

  const expenses = await Expense.find().skip(skipValue).limit(pageSize);
  res.status(200).json({ message: "Expenses retrieved", expenses, totalPages });
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
