import { ResponseError } from "../errors/response-error.js"

const errorMiddleware = async (err, request, response, next) => {
    if( ! err ) {
        next();
        return;
    }

    if( err instanceof ResponseError ) {
        response.status(err.status).json({
            errors: err.message
        }).end();
    } else {
        response.status(500).json({
            errors: err.message
        }).end();
    }
}

export {
    errorMiddleware
}