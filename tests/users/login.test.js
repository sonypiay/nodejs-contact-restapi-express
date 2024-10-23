import { web } from "../../src/application/web.js";
import supertest from "supertest";
import { createTestUser, removeTestUser } from "../utils/utils.js";

describe("POST /api/users/login", function() {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can login', async () => {
        const result = await supertest(web)
        .post('/api/users/login')
        .send({
            username: 'test',
            password: 'rahasia',
        });

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe('test');
    });

    it('should reject if request is invalid', async () => {
        const result = await supertest(web)
        .post('/api/users/login')
        .send({
            username: '',
            password: '',
        });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if username is invalid', async () => {
        const result = await supertest(web)
        .post('/api/users/login')
        .send({
            username: 'salah',
            password: 'rahasia',
        });

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if password is invalid', async () => {
        const result = await supertest(web)
        .post('/api/users/login')
        .send({
            username: 'test',
            password: 'salah',
        });

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});