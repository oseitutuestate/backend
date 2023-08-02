import { Request, Response } from "express";
import Appartment from "../../models/Appartment";

const getApartments = async (req: Request, res: Response) => {
  let page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
  const pageSize = req.query.pageSize
    ? parseInt(req.query.pageSize as string, 10)
    : 10;

  // Ensure that page is at least 1
  page = Math.max(1, page);

  const count = await Appartment.countDocuments();
  const totalPages = Math.ceil(count / pageSize);

  // Calculate the correct skip value
  const skipValue = (page - 1) * pageSize;

  const apartments = await Appartment.find().skip(skipValue).limit(pageSize);

  res
    .status(200)
    .json({ message: "Appartments retrieved", apartments, totalPages });
};

const getApartment = async (req: Request, res: Response) => {
  const id = req.params.id;
  const apartment = await Appartment.findById(id);
  res.status(200).json({ apartment });
};

const createApartment = async (req: Request, res: Response) => {
  try {
    const { type, houseNumber, block, ownerName, ownerEmail, ownerNumber } =
      req.body;
    const apartment = await Appartment.create({
      type,
      houseNumber,
      block,
      ownerName,
      ownerEmail,
      ownerNumber,
    });
    if (apartment) {
      res.status(201).json({ apartment });
    }
  } catch (error) {
    throw error;
  }
};

const updateApartment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const apartment = await Appartment.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ apartment });
  } catch (error) {
    throw error;
  }
};

const deleteApartment = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Appartment.findByIdAndDelete(id);
  res.status(200).json({ message: "Apartment deleted successfully" });
};

export {
  getApartments,
  getApartment,
  createApartment,
  updateApartment,
  deleteApartment,
};
