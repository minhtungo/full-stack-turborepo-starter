import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";

import { openAPIRouter } from "@/api-docs/openAPIRouter";
import { authRouter } from "@/api/auth/authRouter";
import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";
import { userRouter } from "@/api/user/userRouter";
import { env } from "@/common/config/env";
import errorHandler from "@/middleware/errorHandler";
import isAuthenticated from "@/middleware/isAuthenticated";
import rateLimiter from "@/middleware/rateLimiter";
import requestLogger from "@/middleware/requestLogger";
import passport from "passport";
import "@/api/auth/strategies/jwt";
import "@/api/auth/strategies/google";
import "@/api/auth/strategies/local";

const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
// app.use(rateLimiter);
app.use(passport.initialize());

// Request logging
app.use(requestLogger);

// Routes
app.use("/auth", authRouter);
app.use("/health-check", healthCheckRouter);
app.use("/users", isAuthenticated, userRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
