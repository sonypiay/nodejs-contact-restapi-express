import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";
import supertest from "supertest";
import { logger } from "../src/application/logging.js";

describe('POST /api/users/register', function() {

    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: 'sonypiay'
            }
        });
    });

    it('should can register new user', async () => {
        const result = await supertest(web)
        .post('/api/users/register')
        .send({
            username: 'sonypiay',
            password: 'rahasia',
            name: 'Sony Darmawan'
        });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('sonypiay');
        expect(result.body.data.name).toBe('Sony Darmawan');
        expect(result.body.data.password).toBeUndefined();
    });

    it('should reject if request is invalid', async () => {
        const result = await supertest(web)
        .post('/api/users/register')
        .send({
            username: '',
            password: '',
            name: ''
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if user exists', async () => {
        let result = await supertest(web)
        .post('/api/users/register')
        .send({
            username: 'sonypiay',
            password: 'rahasia',
            name: 'Sony Darmawan'
        });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('sonypiay');
        expect(result.body.data.name).toBe('Sony Darmawan');
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web)
        .post('/api/users/register')
        .send({
            username: 'sonypiay',
            password: 'rahasia',
            name: 'Sony Darmawan'
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});