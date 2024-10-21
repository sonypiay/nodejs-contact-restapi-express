import { prismaClient } from "../application/database.js";

export const authMiddleware = async (request, response, next) => {
    const token = request.get("Authorization");

    if( ! token ) {
        response.status(401).json({
            errors: "Unauthorized"
        })
        .end();
    } else {
        const user = await prismaClient.user.findFirst({
            where: {
                token: token
            }
        });

        if( ! user ) {
            response.status(401).json({
                errors: "Unauthorized"
            })
            .end();
        } else {
            request.user = user;
            next();
        }
    }
}