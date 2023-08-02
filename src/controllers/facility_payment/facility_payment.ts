import { Request, Response } from "express";
import FacilityPayment from "../../models/FacilityPayment";
import Appartment from "../../models/Appartment";
import { Types } from "mongoose";

const createRecordPayment = async (req: Request, res: Response) => {
  try {
    const {
      apartmentId,
      paymentAmount,
      paymentMonths,
      paymentYear,
      paidBy,
      recordedBy,
    } = req.body;

    const apartment = await Appartment.findById(
      new Types.ObjectId(apartmentId)
    );
    if (!apartment) {
      throw new Error(`Apartment of Id ${apartmentId} was not found!`);
    }

    const recordPayment = await FacilityPayment.create({
      apartmentId: new Types.ObjectId(apartment._id),
      paymentAmount,
      paymentMonths,
      paymentYear,
      paidBy,
      recordedBy,
    });

    if (recordPayment) {
      apartment.facilityPayments.push(new Types.ObjectId(recordPayment._id));
      await apartment.save();

      res.status(201).json({ recordPayment });
    }
  } catch (error) {
    throw error;
  }
};

const getFacilityPayments = async (req: Request, res: Response) => {
  let page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
  const pageSize = req.query.pageSize
    ? parseInt(req.query.pageSize as string, 10)
    : 10;

  // Ensure that page is at least 1
  page = Math.max(1, page);

  const count = await FacilityPayment.countDocuments();
  const totalPages = Math.ceil(count / pageSize);

  // Calculate the correct skip value
  const skipValue = (page - 1) * pageSize;

  const recordPayments = await FacilityPayment.find()
    .populate({
      path: "apartmentId",
    })
    .skip(skipValue)
    .limit(pageSize);

  res.status(200).json({
    message: "Facility Payments retrieved",
    recordPayments,
    totalPages,
  });
};

const getFacilityPayment = async (req: Request, res: Response) => {
  const id = req.params.id;
  const recordPayment = await FacilityPayment.findById(id).populate({
    path: "apartmentId",
  });
  res.status(200).json({ recordPayment });
};

const updateFacilityPayment = async (req: Request, res: Response) => {
  const id = req.params.id;
  const payment = await FacilityPayment.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json({ payment });
};

const deleteFacilityPayment = async (req: Request, res: Response) => {
  const id = req.params.id;
  await FacilityPayment.findByIdAndDelete(id);
  res
    .status(200)
    .json({ error: null, msg: "Payment Record deleted successfully" });
};

export {
  createRecordPayment,
  getFacilityPayments,
  getFacilityPayment,
  updateFacilityPayment,
  deleteFacilityPayment,
};
