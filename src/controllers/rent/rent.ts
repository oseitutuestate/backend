import { Request, Response } from "express";
import Rent from "../../models/Rent";
import { Types } from "mongoose";
import { sendSMS } from "../../utils/sms.helper";
import { RentTypes, Status } from "../../common/enums";

const bookApt = async (req: Request, res: Response) => {
  const {
    apt,
    type,
    monthsRented,
    daysRented,
    checkin,
    checkout,
    totalAmount,
    clientName,
    clientNumber,
    clientEmail,
  } = req.body;

  try {
    const rent = await Rent.create({
      apt: new Types.ObjectId(apt),
      type,
      monthsRented,
      daysRented,
      checkin,
      checkout,
      totalAmount,
      clientName,
      clientNumber,
      clientEmail,
      status: Status.Active,
    });
    const message = `Hello ${clientName}, your rent of apartment Id. ${apt} has been confirmed. Note that your checkin date is ${checkin} and checkout date is ${checkout}. Enjoy your stay.`;
    await sendSMS([clientNumber], message);
    res.status(201).json({ message: "Rent created successfully", rent });
  } catch (error) {
    throw error;
  }
};

const getBookedAirbnb = async (req: Request, res: Response) => {
  const airbnb = await Rent.find({ type: RentTypes.Airbnb });
  res.status(200).json({ message: "Booked Airbnb retrieved", airbnb });
};

const getRentedApts = async (req: Request, res: Response) => {
  const rentedApt = await Rent.find({ type: RentTypes.Airbnb });
  res.status(200).json({ message: "Rents retrieved", rentedApt });
};

const getSingleRentedAny = async (req: Request, res: Response) => {
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

export {
  bookApt,
  getBookedAirbnb,
  getRentedApts,
  getSingleRentedAny,
  updateRent,
};
