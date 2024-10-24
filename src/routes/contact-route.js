import express from "express";
import contactController from "../controller/contact-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const contactRoute = express.Router();

contactRoute.post('/api/contacts', contactController.create);
contactRoute.put('/api/contacts/:id', contactController.update);

export {
    contactRoute
}