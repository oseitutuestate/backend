import { Request, Response, NextFunction } from "express";
import User from "../../models/User";
// import { RoleCode } from "../../common/enums";

const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json({ error: null, count: users.length, data: users });
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
