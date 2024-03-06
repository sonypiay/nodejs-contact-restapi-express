import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";
import supertest from "supertest";

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
});