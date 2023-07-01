import express, { Request, Response, NextFunction } from "express";
import User from "../models/User";
import jwt, { Secret } from "jsonwebtoken";
import { Configs } from "../config/config";
import { ResponseStatus, RoleCode } from "../common/enums";

interface AuthenticatedRequest extends Request {
  user?: {
    role: string;
  };
}

export const adminRole = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;

  if (
    user &&
    (user.role === RoleCode.Admin || user.role === RoleCode.SuperAdmin)
  ) {
    return next();
  } else {
    res.status(403).json({
      status: ResponseStatus.Failed,
      message: "Unauthorized - Admin access required",
    });
  }
};
