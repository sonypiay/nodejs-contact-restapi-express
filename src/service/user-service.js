import { prismaClient } from "../application/database.js"
import { registerUserValidation, loginUserValidation } from "../validation/user-validation.js"
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

export default {
    register, login
}