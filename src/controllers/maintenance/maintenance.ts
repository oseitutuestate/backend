import { Request, Response } from "express";
import { Types } from "mongoose";
import Asset from "../../models/Asset";
import User from "../../models/User";
import Maintenance from "../../models/Maintenance";

const getAllMaintenance = async (req: Request, res: Response) => {
  let page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
  const pageSize = req.query.pageSize
    ? parseInt(req.query.pageSize as string, 10)
    : 10;

  // Ensure that page is at least 1
  page = Math.max(1, page);

  const count = await Maintenance.countDocuments();
  const totalPages = Math.ceil(count / pageSize);

  // Calculate the correct skip value
  const skipValue = (page - 1) * pageSize;

  const maintenance = await Maintenance.find()
    .populate({ path: "assetId" })
    .populate({ path: "recordedBy" })
    .skip(skipValue)
    .limit(pageSize);

  res
    .status(200)
    .json({ message: "Maintenances retrieved", maintenance, totalPages });
};

const getMaintenance = async (req: Request, res: Response) => {
  const id = req.params.id;
  const maintenance = await Maintenance.findById(id)
    .populate({ path: "assetId" })
    .populate({ path: "recordedBy" });
  res.status(200).json({ maintenance });
};

const createMaintenance = async (req: Request, res: Response) => {
  try {
    const {
      assetId,
      cost,
      state,
      dateReview,
      remarks,
      recordedBy,
      nextDayOfMaintenance,
    } = req.body;

    const user = await User.findById(new Types.ObjectId(recordedBy));
    if (!user) {
      throw new Error("User not found!");
    }

    const asset = await Asset.findById(new Types.ObjectId(assetId));
    if (!asset) {
      throw new Error("Asset not found!");
    }

    const maintenance = await Maintenance.create({
      assetId: new Types.ObjectId(asset._id),
      cost,
      state,
      dateReview,
      remarks,
      recordedBy: user?._id,
      nextDayOfMaintenance,
    });

    if (maintenance) {
      asset.maintenance?.push(new Types.ObjectId(maintenance._id));
      await asset.save();

      res.status(201).json({ maintenance });
    }
  } catch (error) {
    throw error;
  }
};

const updateMaintenance = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const maintenance = await Maintenance.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ maintenance });
  } catch (error) {
    throw error;
  }
};

const deleteMaintenance = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Maintenance.findByIdAndDelete(id);
  res.status(200).json({ message: "Maintenance deleted successfully" });
};

export {
  createMaintenance,
  getMaintenance,
  getAllMaintenance,
  updateMaintenance,
  deleteMaintenance,
};
