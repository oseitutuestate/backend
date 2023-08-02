import { Request, Response } from "express";
import { Types } from "mongoose";
import Asset from "../../models/Asset";
import User from "../../models/User";

const getAssets = async (req: Request, res: Response) => {
  let page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
  const pageSize = req.query.pageSize
    ? parseInt(req.query.pageSize as string, 10)
    : 10;

  // Ensure that page is at least 1
  page = Math.max(1, page);

  const count = await Asset.countDocuments();
  const totalPages = Math.ceil(count / pageSize);

  // Calculate the correct skip value
  const skipValue = (page - 1) * pageSize;

  const assets = await Asset.find()
    .populate({ path: "recordedBy" })
    .populate({ path: "maintenance" })
    .skip(skipValue)
    .limit(pageSize);

  res.status(200).json({ message: "Assets retrieved", assets, totalPages });
};

const getAsset = async (req: Request, res: Response) => {
  const id = req.params.id;
  const asset = await Asset.findById(id)
    .populate({ path: "recordedBy" })
    .populate({ path: "maintenance" });
  res.status(200).json({ asset });
};

const createAsset = async (req: Request, res: Response) => {
  try {
    const { name, cost, description, recordedBy } = req.body;
    const user = await User.findById(new Types.ObjectId(recordedBy));

    if (!user) {
      throw new Error("User not found!");
    }
    const asset = await Asset.create({
      name,
      cost,
      description,
      recordedBy: user?._id,
    });
    if (asset) {
      res.status(201).json({ asset });
    }
  } catch (error) {
    throw error;
  }
};

const updateAsset = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const asset = await Asset.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ asset });
  } catch (error) {
    throw error;
  }
};

const deleteAsset = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Asset.findByIdAndDelete(id);
  res.status(200).json({ message: "Asset deleted successfully" });
};

export { createAsset, getAsset, getAssets, updateAsset, deleteAsset };
