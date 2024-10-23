import express from "express";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { publicRouter } from "../routes/public-api.js";
import { userRoute } from "../routes/user-route.js";
import { contactRoute } from "../routes/contact-route.js";

export const web = express();

web.use(express.json());

web.use(publicRouter);
web.use(userRoute);
web.use(contactRoute);

web.use(errorMiddleware);