import { Request, Response } from "express";
import Appartment from "../../models/Appartment";

const getAppartments = async (req: Request, res: Response) => {
  const appartments = await Appartment.find();
  res.status(200).json({ appartments });
};

const getAppartment = async (req: Request, res: Response) => {
  const id = req.params.id;
  const appartments = await Appartment.findById(id);
  res.status(200).json({ appartments });
};

const createAppartment = async (req: Request, res: Response) => {
  try {
    const { type, houseNumber, block, ownerName, ownerEmail, ownerNumber } =
      req.body;
    const appartment = await Appartment.create({
      type,
      houseNumber,
      block,
      ownerName,
      ownerEmail,
      ownerNumber,
    });
    if (appartment) {
      // console.log(appartment);
      res.status(201).json({ appartment });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateAppartment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const appartment = await Appartment.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ appartment });
  } catch (error) {
    // console.log(error);
  }
};

const deleteAppartment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Appartment.findByIdAndDelete(id);
    res
      .status(200)
      .json({ error: null, msg: "Appartment deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

export {
  getAppartments,
  getAppartment,
  createAppartment,
  updateAppartment,
  deleteAppartment,
};
