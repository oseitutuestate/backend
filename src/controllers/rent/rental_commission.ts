import { Request, Response } from "express";
import RentCommission from "../../models/RentCommission";
import { Types } from "mongoose";

const createRentCommission = async (req: Request, res: Response) => {
  const rentCommission = await RentCommission.create(req.body);
  res.status(200).json({ message: "Rents Commission created", rentCommission });
};
const getRentCommissions = async (req: Request, res: Response) => {
  const rentCommissions = await RentCommission.find();
  res
    .status(200)
    .json({ message: "RentCommissions retrieved", rentCommissions });
};
const getSingleRentCommission = async (req: Request, res: Response) => {
  const rentCommission = await RentCommission.findById(
    new Types.ObjectId(req.params.id)
  );
  res.status(200).json({ message: "Rent retrieved", rentCommission });
};
const updateRentCommission = async (req: Request, res: Response) => {
  const rentCommission = await RentCommission.findByIdAndUpdate(
    new Types.ObjectId(req.params.id),
    req.body,
    { new: true }
  );
  res.status(200).json({ message: "Rent Commission updated", rentCommission });
};

export {
  createRentCommission,
  getRentCommissions,
  getSingleRentCommission,
  updateRentCommission,
};
