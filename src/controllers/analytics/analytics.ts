import { Request, Response } from "express";
import User from "../../models/User";
import Appartment from "../../models/Appartment";
import Expense from "../../models/Expense";

const getAnalytics = async (req: Request, res: Response) => {
  try {
    // Get total number of users
    const usersCount = await User.countDocuments();

    // Get total number of apartments
    const apartmentsCount = await Appartment.countDocuments();

    // Get total number of expenses and calculate the sum of total amount
    const expenses = await Expense.find();
    const expensesCount = expenses.length;
    const totalAmount = expenses.reduce(
      (acc, expense) => acc + expense.totalAmount,
      0
    );

    // Construct the final response object
    const analytics = {
      users: { total: usersCount },
      apartments: { total: apartmentsCount },
      expenses: { total: expensesCount, totalAmount },
    };

    return res.status(200).json(analytics);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while fetching analytics." });
  }
};

export { getAnalytics };
