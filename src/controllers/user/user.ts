import { Request, Response, NextFunction } from "express";
import User from "../../models/User";
// import { RoleCode } from "../../common/enums";

const getUsers = async (req: Request, res: Response) => {
  let page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
  const pageSize = req.query.pageSize
    ? parseInt(req.query.pageSize as string, 10)
    : 10;

  // Ensure that page is at least 1
  page = Math.max(1, page);

  const count = await User.countDocuments();
  const totalPages = Math.ceil(count / pageSize);

  // Calculate the correct skip value
  const skipValue = (page - 1) * pageSize;

  const users = await User.find().skip(skipValue).limit(pageSize);

  res.status(200).json({ message: "Users retrieved", users, totalPages });
};

const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user) {
      res.status(200).json({ error: null, data: user });
    }
  } catch (err) {
    res.status(400).json({ error: err, data: null });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (user) {
      res.status(200).json({ error: null, data: user });
    }
  } catch (err) {
    res.status(400).json({ error: err, data: null });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(200).json({ error: null, msg: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export { getUser, getUsers, updateUser, deleteUser };
