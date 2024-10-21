import winston from "winston";

export const logger = winston.createLogger({
    level: "debug",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({}),
        new winston.transports.File({
            filename: 'log/info.log',
            level: 'info'
        }),
        new winston.transports.File({
            filename: 'log/error.log',
            level: 'error'
        })
    ]
});