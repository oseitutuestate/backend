import express, { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { Configs } from "../config/config";
import { Types } from "mongoose";
import { ResponseStatus } from "../common/enums";

const router = express.Router();

interface AuthenticatedRequest extends Request {
  user?: {
    id: string | Types.ObjectId;
    role: string;
    email: string;
  };
}

export default router.use(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      try {
        const decodedToken = jwt.verify(
          token,
          Configs.JWT_SECRET as Secret
        ) as {
          id: string | Types.ObjectId;
          role: string;
          email: string;
        };
        req.user = {
          id: decodedToken.id,
          role: decodedToken.role,
          email: decodedToken.email,
        };
        next();
      } catch (error) {
        res.status(403).json({
          status: ResponseStatus.Failed,
          message: "Access denied - Invalid token",
        });
      }
    } else {
      res.status(403).json({
        status: ResponseStatus.Failed,
        message: "Access denied - Token missing",
      });
    }
  }
);
//Unauthorized -
