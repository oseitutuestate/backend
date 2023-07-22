import winston from "winston";
import "winston-daily-rotate-file";

// Define the log format
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

// Create a Winston logger instance
const logger = winston.createLogger({
  level: "info", // Set the default log level
  format: logFormat,
  transports: [
    // Log to console for debugging purposes
    new winston.transports.Console(),
    // Log to daily rotating files
    new winston.transports.DailyRotateFile({
      dirname: "logs", // Specify the directory to store logs
      filename: "application-%DATE%.log", // Set the log filename pattern
      datePattern: "YYYY-MM-DD", // Use the date as part of the log filename
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d", // Keep logs for the last 14 days
    }),
  ],
});

// Middleware function to log request/response details
export const loggerMiddleware = (req: any, res: any, next: any) => {
  const start = Date.now();

  res.on("finish", () => {
    const responseTime = Date.now() - start;

    const logData = {
      timestamp: new Date().toISOString(),
      level: "info",
      message: "Request completed",
      duration: responseTime,
      method: req.method,
      url: req.originalUrl,
      requestBody: req.body,
      responseBody: res.body,
    };

    logger.info(logData);
  });

  next();
};

export default logger;
