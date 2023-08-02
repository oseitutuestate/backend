import { Request, Response } from "express";
import { Types } from "mongoose";
import User from "../../models/User";
import Task from "../../models/Task";

const getTasks = async (req: Request, res: Response) => {
  let page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
  const pageSize = req.query.pageSize
    ? parseInt(req.query.pageSize as string, 10)
    : 10;

  // Ensure that page is at least 1
  page = Math.max(1, page);

  const count = await Task.countDocuments();
  const totalPages = Math.ceil(count / pageSize);

  // Calculate the correct skip value
  const skipValue = (page - 1) * pageSize;

  const tasks = await Task.find()
    .populate({ path: "employee" })
    .skip(skipValue)
    .limit(pageSize);

  res.status(200).json({ message: "Tasks retrieved", tasks, totalPages });
};

const getTask = async (req: Request, res: Response) => {
  const id = req.params.id;
  const task = await Task.findById(id).populate({ path: "employee" });
  res.status(200).json({ task });
};

const createTask = async (req: Request, res: Response) => {
  try {
    const { employee, description, results, action, completionDate } = req.body;

    const user = await User.findById(new Types.ObjectId(employee));
    if (!user) {
      throw new Error("User not found!");
    }

    const task = await Task.create({
      employee: new Types.ObjectId(user._id),
      description,
      results,
      action,
      completionDate,
    });

    if (task) {
      res.status(201).json({ task });
    }
  } catch (error) {
    throw error;
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ task });
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Task.findByIdAndDelete(id);
  res.status(200).json({ message: "Task deleted successfully" });
};

export { createTask, getTask, getTasks, updateTask, deleteTask };
