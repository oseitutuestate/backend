import { Request, Response } from "express";
import FacilityPayment from "../../models/FacilityPayment";

const getFacilityPayments = async (req: Request, res: Response) => {
  const payments = await FacilityPayment.find();
  res.status(200).json({ payments });
};

const getFacilityPayment = async (req: Request, res: Response) => {
  const id = req.params.id;
  const recordPayment = await FacilityPayment.findById(id);
  res.status(200).json({ recordPayment });
};

const updateFacilityPayment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const payment = await FacilityPayment.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ payment });
  } catch (error) {
    console.log(error);
  }
};

const deleteFacilityPayment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await FacilityPayment.findByIdAndDelete(id);
    res
      .status(200)
      .json({ error: null, msg: "Payment Record deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
export {
  getFacilityPayments,
  getFacilityPayment,
  updateFacilityPayment,
  deleteFacilityPayment,
};
