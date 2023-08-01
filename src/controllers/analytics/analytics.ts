import { Request, Response } from "express";
import User from "../../models/User";
import Appartment from "../../models/Appartment";
import Expense from "../../models/Expense";
import Amenities from "../../models/Amenities";
import FacilityPayment from "../../models/FacilityPayment";
import Wallet from "../../models/Wallet";
import CashFund from "../../models/CashFund";
import { WalletType } from "../../common/enums";

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
    //amenities
    const amenities = await Amenities.find();
    const amenitiesCount = amenities.length;
    const amenitiesPaidinTotal = amenities.reduce(
      (acc, amts) => acc + amts.amountPaid,
      0
    );

    //facility payments
    const fcpayments = await FacilityPayment.find();
    const fcPaymentCount = fcpayments.length;
    const fcPaymentinTotal = fcpayments.reduce(
      (acc, amts) => acc + amts.paymentAmount,
      0
    );

    //petty cash
    const pettycash = await Wallet.findOne({ type: WalletType.PettyCash });

    // Construct the final response object
    const analytics = {
      users: { total: usersCount },
      apartments: { total: apartmentsCount },
      expenses: { total: expensesCount, totalAmount },
      fcpayments: { total: fcPaymentCount, totalAmount: fcPaymentinTotal },
      amenities: {
        total: amenitiesCount,
        totalAmount: amenitiesPaidinTotal,
      },
      revenue: { amount: totalAmount + amenitiesPaidinTotal },
      pettycash: { balance: pettycash ? pettycash.balance : 0 },
    };

    return res.status(200).json(analytics);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while fetching analytics." });
  }
};

export { getAnalytics };
