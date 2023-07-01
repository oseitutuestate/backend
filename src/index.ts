import express, { Request, Response } from "express";
import { Configs } from "./config/config";
import cors from "cors";
import "./config/dbConnect";
import apartmentRoutes from "./routes/apartment/apartment.routes";
import authRoutes from "./routes/auth/auth.routes";
import blockRoutes from "./routes/block/block.routes";
import expenseRoutes from "./routes/expense/expense.routes";
import facilityPaymentRoutes from "./routes/facility_payment/facility-payment.routes";
import rentRoutes from "./routes/rent/rent.routes";
import rentalRoutes from "./routes/rent/rental.routes";
import rentCommRoutes from "./routes/rent/rent_commission.routes";
import smsRoutes from "./routes/sms/sms.routes";
import transactionRoutes from "./routes/transaction/transaction.routes";
import userRoutes from "./routes/user/user.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express!");
});

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/block", blockRoutes);
app.use("/api/v1/appartment", apartmentRoutes);
app.use("/api/v1/record-payment", facilityPaymentRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/rent-booking", rentRoutes);
app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/rent-commission", rentCommRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/sms", smsRoutes);

app.listen(Configs.PORT, () => {
  console.log(`Server is running on port ${Configs.PORT}`);
});
