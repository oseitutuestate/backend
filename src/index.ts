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
import uploadRoutes from "./routes/upload/upload.routes";
import conversationRoutes from "./routes/chatbot/conversation.routes";
import botUserRoutes from "./routes/chatbot/bot.user.routes";
import botResponseRoutes from "./routes/chatbot/bot.response.routes";
import webhookRoutes from "./routes/chatbot/webhook.routes";
import analyticsRoutes from "./routes/analytics/analytics.routes";
import amenitiesRoutes from "./routes/amenities/amenities.routes";
import walletRoutes from "./routes/wallet/wallet.routes";
import cashfundRoutes from "./routes/cashfund/cashfund.routes";
import AssetRoutes from "./routes/asset/asset.routes";
import MaintenanceRoutes from "./routes/maintenance/maintenance.routes";
import TaskRoutes from "./routes/task/task.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json("Welcome To Osei Tutu II Estate");
});

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/block", blockRoutes);
app.use("/api/v1/apartment", apartmentRoutes);
app.use("/api/v1/record-payment", facilityPaymentRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/rent", rentRoutes);
app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/rent-commission", rentCommRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/sms", smsRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/webhook", webhookRoutes);
app.use("/api/v1/bot-users", botUserRoutes);
app.use("/api/v1/conversation", conversationRoutes);
app.use("/api/v1/bot-response", botResponseRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/amenities", amenitiesRoutes);
app.use("/api/v1/wallet", walletRoutes);
app.use("/api/v1/cash-fund", cashfundRoutes);
app.use("/api/v1/asset", AssetRoutes);
app.use("/api/v1/maintenance", MaintenanceRoutes);
app.use("/api/v1/task", TaskRoutes);

app.listen(Configs.PORT, () => {
  console.log(`Server is running on port ${Configs.PORT}`);
});
