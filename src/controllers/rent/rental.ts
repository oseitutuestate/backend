import { Request, Response } from "express";
import Rent from "../../models/Rent";
import Rental from "../../models/Rental";
import RentalCommission from "../../models/RentCommission";
import { Types } from "mongoose";

const addAparmentForRental = async (req: Request, res: Response) => {
  const {
    apartment,
    furnished,
    description,
    images,
    perMonth,
    perDay,
    rentType,
  } = req.body;
  const exist = await Rental.findOne({
    apartment: new Types.ObjectId(apartment),
  });

  if (exist) {
    throw new Error("Apartment already added for rentals!");
  }

  const rental = await Rental.create({
    apartment: new Types.ObjectId(apartment),
    furnished,
    description,
    images,
    perMonth,
    perDay,
    rentType,
  });
  res.status(200).json({ message: "Rental created", rental });
};

const getAvailableApartmentRentals = async (req: Request, res: Response) => {
  const rentals = await Rental.find()
    .populate({ path: "apartment" })
    .populate({ path: "rents" });
  res.status(200).json({ message: "Rentals retrieved", rentals });
};

const getSingleRental = async (req: Request, res: Response) => {
  const rental = await Rental.findById(req.params.id)
    .populate({ path: "apartment" })
    .populate({ path: "rents" });
  res.status(200).json({ message: "Apartment retrieved", rental });
};

const updateApartmentRental = async (req: Request, res: Response) => {
  const rental = await Rental.findByIdAndUpdate(
    new Types.ObjectId(req.params.id),
    req.body,
    { new: true }
  );
  res.status(200).json({ message: "Apartment retrieved", rental });
};

const updateRentalImage = async (req: Request, res: Response) => {
  const { rentalId, imageIndex } = req.params;
  const { imageUrl } = req.body;

  try {
    // Update the rental document
    const updatedRental = await Rental.updateOne(
      { _id: rentalId, "images.$": imageIndex },
      { $set: { "images.$": imageUrl } }
    );

    if (updatedRental.matchedCount === 0) {
      return res.status(404).json({ message: "Rental not found" });
    }

    if (updatedRental.modifiedCount === 0) {
      return res
        .status(200)
        .json({ message: "Image already has the same URL" });
    }

    return res.status(200).json({ message: "Image updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update image", error });
  }
};

export {
  addAparmentForRental,
  getAvailableApartmentRentals,
  getSingleRental,
  updateApartmentRental,
  updateRentalImage,
};
