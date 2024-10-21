import express from "express";
import { publicRouter } from "../routes/public-api.js";
import { userRoute } from "../routes/user-route.js";
import { errorMiddleware } from "../middleware/error-middleware.js";

export const web = express();

web.use(express.json());

web.use(publicRouter);
web.use(userRoute);

web.use(errorMiddleware);