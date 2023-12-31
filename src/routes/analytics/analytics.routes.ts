import express from "express";
import authentication from "../../middleware/authentication";
import { getAnalytics } from "../../controllers/analytics/analytics";

const router = express.Router();

router.get("/", authentication, getAnalytics);

export default router;
