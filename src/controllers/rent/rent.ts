import { Request, Response } from "express";
import Rent from "../../models/Rent";
import { Types } from "mongoose";
import { sendSMS } from "../../utils/sms.helper";

const createRent = async (req: Request, res: Response) => {
  const {
    apartment,
    monthsRented,
    startDate,
    endDate,
    totalAmount,
    clientName,
    clientNumber,
    clientEmail,
  } = req.body;

  try {
    const rent = await Rent.create({
      apartment: new Types.ObjectId(apartment),
      monthsRented,
      startDate,
      endDate,
      totalAmount,
      clientName,
      clientNumber,
      clientEmail,
    });
    const message = `Hello ${clientName}, your rent of apartment Id. ${apartment} has been confirmed. Note that your start date is ${startDate} and the end date of the rent is ${endDate}. Enjoy your stay.`;
    await sendSMS([clientNumber], message);
    res.status(201).json({ message: "Rent created successfully", rent });
  } catch (error) {
    throw error;
  }
};
const getRents = async (req: Request, res: Response) => {
  const rents = await Rent.find();
  res.status(200).json({ message: "Rents retrieved", rents });
};
const getSingleRent = async (req: Request, res: Response) => {
  const rent = await Rent.findById(new Types.ObjectId(req.params.id));
  res.status(200).json({ message: "Rent retrieved", rent });
};
const updateRent = async (req: Request, res: Response) => {
  const rent = await Rent.findByIdAndUpdate(
    new Types.ObjectId(req.params.id),
    req.body,
    { new: true }
  );
  res.status(200).json({ message: "Rent updated", rent });
};

export { createRent, getRents, getSingleRent, updateRent };
