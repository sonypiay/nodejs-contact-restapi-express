import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRoute = express.Router();

userRoute.use(authMiddleware);
userRoute.get('/api/users', userController.get);
userRoute.patch('/api/users', userController.update);
userRoute.delete('/api/users/logout', userController.logout);

export {
    userRoute
}