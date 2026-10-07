import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import apiRouter from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";

const app = express();

// Security & Parsing Middlewares
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow localhost and frontend dev requests
      if (!origin || origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) {
        return callback(null, true);
      }
      callback(null, true);
    },
    credentials: true,
  })
);
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/v1", apiRouter);
app.use("/api", apiRouter); // Alias for convenience

// 404 & Global Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
