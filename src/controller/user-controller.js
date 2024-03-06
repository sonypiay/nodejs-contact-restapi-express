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

export default {
    register, login
};