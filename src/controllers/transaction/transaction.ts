import { Request, Response } from "express";
import Transaction from "../../models/Transaction";
import { TransactionTypes } from "../../common/enums";
import Expense from "../../models/Expense";
import FacilityPayment from "../../models/FacilityPayment";
import { Types } from "mongoose";

const createTransaction = async (req: Request, res: Response) => {
  const {
    type,
    recordedBy,
    apartment,
    paymentMode,
    accountNumber,
    amountPaid,
    paymentMonths,
    year,
    paidBy,
    item,
    quantity,
    unitPrice,
    totalAmount,
  } = req.body;

  try {
    const transaction = await Transaction.create({
      type,
      recordedBy,
      apartment,
      paymentMode,
      accountNumber,
      amountPaid,
      paymentMonths,
      year,
      paidBy,
      item,
      quantity,
      unitPrice,
      totalAmount,
    });
    switch (type) {
      case TransactionTypes.Expense:
        const expense = await Expense.create({
          item,
          quantity,
          unitPrice,
          totalAmount,
          user: recordedBy,
          transactionId: new Types.ObjectId(transaction._id),
        });
        res
          .status(201)
          .json({ message: "Expense created Successfully", expense });
        break;
      case TransactionTypes.FacilityFee:
        let payments = [];
        for (const each of paymentMonths) {
          const fee = await FacilityPayment.create({
            apartment,
            transactionId: new Types.ObjectId(transaction._id),
            paymentAmount: amountPaid / paymentMonths,
            paymentMonth: each,
            paymentYear: year,
          });
          payments.push(fee);
        }
        res
          .status(201)
          .json({ message: "Payment made Successfully", payments });

      default:
        break;
    }
  } catch (error) {
    throw error;
  }
};

const getTransactions = async (req: Request, res: Response) => {
  const transactions = await Transaction.find();
  res
    .status(200)
    .json({ message: "Transactions retrieved successfully", transactions });
};

const getSingleTransaction = async (req: Request, res: Response) => {
  const transaction = await Transaction.findById(
    new Types.ObjectId(req.params.id)
  );
  res
    .status(200)
    .json({ message: "Transaction retrieved successfully", transaction });
};

const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const transactionId = new Types.ObjectId(req.params.id);

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      throw new Error(`Transaction Id ${req.params.id} was not found`);
    }

    if (transaction.type === TransactionTypes.FacilityFee) {
      const payments = await FacilityPayment.find({ transactionId });
      if (payments.length >= 1) {
        for (const payment of payments) {
          await FacilityPayment.findByIdAndDelete(payment._id);
        }
      }
    } else {
      const expense = await Expense.findOne({ transactionId });
      if (expense) {
        await Expense.findByIdAndDelete(expense._id);
      }
    }

    await Transaction.findByIdAndDelete(transactionId);

    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  createTransaction,
  getTransactions,
  getSingleTransaction,
  deleteTransaction,
};
