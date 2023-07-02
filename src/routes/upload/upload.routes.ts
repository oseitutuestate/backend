import express from "express";
import { adminRole } from "../../middleware/authorization";
import authentication from "../../middleware/authentication";
import validator from "../../middleware/validator";
// import schema from "./schema";
import { uploadImages } from "../../controllers/upload/upload";

const router = express.Router();

router.post("/images", authentication, uploadImages);

export default router;
