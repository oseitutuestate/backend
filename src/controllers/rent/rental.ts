import { Request, Response } from "express";
import Rental from "../../models/Rental";
import { Types } from "mongoose";
import { Status } from "../../common/enums";

const addAparmentForRental = async (req: Request, res: Response) => {
  const {
    apartment,
    maxguests,
    furnished,
    bedrooms,
    bathrooms,
    fenced,
    aircondition,
    airconditionDetail,
    headline,
    description,
    images,
    price,
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
    maxguests,
    furnished,
    bedrooms,
    bathrooms,
    fenced,
    aircondition,
    airconditionDetail,
    headline,
    description,
    images,
    price,
    rentType,
  });
  res.status(200).json({ message: "Rental created", rental });
};

// const getAvailableApartmentRentals = async (req: Request, res: Response) => {
//   const rentals = await Rental.find({ status: Status.Active })
//     .populate({ path: "apartment" })
//     .populate({ path: "rents" });
//   res.status(200).json({ message: "Rentals retrieved", rentals });
// };

const getAvailableApartmentRentals = async (req: Request, res: Response) => {
  const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
  const pageSize = req.query.pageSize
    ? parseInt(req.query.pageSize as string, 10)
    : 10;

  const count = await Rental.countDocuments({ status: Status.Active });
  const totalPages = Math.ceil(count / pageSize);

  const rentals = await Rental.find({ status: Status.Active })
    .populate({ path: "apartment" })
    .populate({ path: "rents" })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  res.status(200).json({ message: "Rentals retrieved", rentals, totalPages });
};

const getFeaturedApartmentRentals = async (req: Request, res: Response) => {
  const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
  const pageSize = req.query.pageSize
    ? parseInt(req.query.pageSize as string, 10)
    : 10;

  const count = await Rental.countDocuments({ featured: true });
  const totalPages = Math.ceil(count / pageSize);

  const featured = await Rental.find({ featured: true })
    .populate({ path: "apartment" })
    .populate({ path: "rents" })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  res.status(200).json({ message: "Featured retrieved", featured, totalPages });
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
  getFeaturedApartmentRentals,
  getSingleRental,
  updateApartmentRental,
  updateRentalImage,
};
