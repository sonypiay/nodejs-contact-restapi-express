import express from "express";
import contactController from "../controller/contact-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const contactRoute = express.Router();

contactRoute.use(authMiddleware);
contactRoute.post('/api/contacts', contactController.create);

export {
    contactRoute
}