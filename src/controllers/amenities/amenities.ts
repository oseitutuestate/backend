import { Request, Response } from "express";
import Amenities from "../../models/Amenities";
import { Types } from "mongoose";

const getAmenities = async (req: Request, res: Response) => {
  let page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
  const pageSize = req.query.pageSize
    ? parseInt(req.query.pageSize as string, 10)
    : 10;

  // Ensure that page is at least 1
  page = Math.max(1, page);

  const count = await Amenities.countDocuments();
  const totalPages = Math.ceil(count / pageSize);

  // Calculate the correct skip value
  const skipValue = (page - 1) * pageSize;

  const amenities = await Amenities.find()
    .populate({ path: "apartment" })
    .skip(skipValue)
    .limit(pageSize);

  res
    .status(200)
    .json({ message: "Amenities retrieved", amenities, totalPages });
};

const getAmenity = async (req: Request, res: Response) => {
  const id = req.params.id;
  const amenity = await Amenities.findById(id).populate({ path: "apartment" });
  res.status(200).json({ amenity });
};

const createAmenities = async (req: Request, res: Response) => {
  try {
    const { apartment, clientName, amountPaid, recordedBy } = req.body;
    const amenities = await Amenities.create({
      apartment: new Types.ObjectId(apartment),
      clientName,
      amountPaid,
      recordedBy,
    });
    if (amenities) {
      res.status(201).json({ data: amenities });
    }
  } catch (error) {}
};

const updateAmenities = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const amenities = await Amenities.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ amenities });
  } catch (error) {}
};

const deleteAmenities = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Amenities.findByIdAndDelete(id);
  res.status(200).json({ error: null, msg: "Amenities deleted successfully" });
};

export {
  getAmenities,
  getAmenity,
  createAmenities,
  updateAmenities,
  deleteAmenities,
};
