import { prismaClient } from "../application/database.js"
import { registerUserValidation, loginUserValidation, getUserValidation, updateUserValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import { ResponseError } from "../errors/response-error.js"
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    if( countUser === 1 ) {
        throw new ResponseError(400, 'Username already exists!');
    }

    user.password = await bcrypt.hash(user.password, 10);

    return prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true,
        }
    });
}

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);
    const user = await prismaClient.user.findUnique({
        where: {
            username: loginRequest.username,
        },
        select: {
            username: true,
            password: true
        }
    });

    if( !user ) {
        throw new ResponseError(401, 'Invalid username or password!');
    }

    const verifyPassword = await bcrypt.compare(loginRequest.password, user.password);

    if( ! verifyPassword ) {
        throw new ResponseError(401, 'Invalid username or password!');
    }

    const token = uuidv4();
    
    return await prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            username: user.username
        },
        select: {
            token: true
        },
    });
}

const get = async (username) => {
    username = validate(getUserValidation, username);
    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            name: true
        }
    });

    if( ! user ) {
        throw new ResponseError(404, `User not found`);
    }

    return user;
}

const update = async (request) => {
    const userRequest = validate(updateUserValidation, request);
    const hasUser = await prismaClient.user.count({
        where: {
            username: userRequest.username
        }
    });

    if( hasUser !== 1 ) {
        throw new ResponseError(404, 'User not found');
    }

    const data = {};

    if( userRequest.name ) {
        data.name = userRequest.name;
    }

    if( userRequest.password ) {
        data.password = await bcrypt.hash(userRequest.password, 10);
    }

    return prismaClient.user.update({
        data: data,
        select: {
            username: true,
            name: true,
        },
        where: {
            username: userRequest.username,
        }
    });
}

const logout = async (username) => {
    username = validate(getUserValidation, username);
    const hasUser = await prismaClient.user.findUnique({
        where: {
            username: username
        }
    });

    if( ! hasUser ) {
        throw new ResponseError(404, 'User not found');
    }

    return await prismaClient.user.update({
        data: {
            token: null,
        },
        select: {
            username: true,
        },
        where: {
            username: username
        }
    });
}

export default {
    register, login, get, update, logout
}