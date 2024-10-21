import { request } from "express";
import userService from "../service/user-service.js";

const register = async (request, response, next) => {
    try {
        const result = await userService.register(request.body);
        response.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
}

const login = async (request, response, next) => {
    try {
        const result = await userService.login(request.body);
        response.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
}

const get = async (request, response, next) => {
    try {
        const result = await userService.get(request.user.username);
        return response.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
}

const update = async (request, response, next) => {
    try {
        const username = request.user.username;
        const req = request.body;
        req.username = username;

        const result = await userService.update(req);
        return response.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
}

const logout = async (request, response, next) => {
    try {
        await userService.logout(request.user.username);
        return response.status(200).json({
            data: 'OK'
        });
    } catch (error) {
        next(error);
    }
}

export default {
    register, login, get, update, logout
};