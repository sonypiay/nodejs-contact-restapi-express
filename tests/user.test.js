import { web } from "../src/application/web.js";
import supertest from "supertest";
import { logger } from "../src/application/logging.js";
import { createTestUser, removeTestUser, getTestUser } from "./test-util.js";
import bcrypt from "bcrypt";

describe('POST /api/users/register', function() {
    afterEach(async () => {
        await removeTestUser();
    });

    it('should can register new user', async () => {
        const result = await supertest(web)
        .post('/api/users/register')
        .send({
            username: 'test',
            password: 'rahasia',
            name: 'test'
        });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');
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

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if user exists', async () => {
        let result = await supertest(web)
        .post('/api/users/register')
        .send({
            username: 'test',
            password: 'rahasia',
            name: 'test'
        });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web)
        .post('/api/users/register')
        .send({
            username: 'test',
            password: 'rahasia',
            name: 'test'
        });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

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

        logger.info(result.body);

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

        logger.info(result.body);

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

        logger.info(result.body);

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

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

describe("GET /api/users", () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it("should get current user", async () => {
        const result = await supertest(web)
        .get('/api/users')
        .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');
    });

    it("should not get current user", async () => {
        const result = await supertest(web)
        .get('/api/users')
        .set('Authorization', 'salah');

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
        expect(result.body.errors).toBe('Unauthorized');
    });

    it("should unauthorized", async () => {
        const result = await supertest(web)
        .get('/api/users');

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
        expect(result.body.errors).toBe('Unauthorized');
    });
});

describe("PATCH /api/users", () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it("should update user", async () => {
        const result = await supertest(web)
        .patch('/api/users')
        .set('Authorization', 'test')
        .send({
            name: 'Sony',
            password: 'passwordbaru'
        });

        console.info(result.status);
        console.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('Sony');

        const user = await getTestUser();
        expect(await bcrypt.compare('passwordbaru', user.password)).toBe(true);
    });

    it("should update name", async () => {
        const result = await supertest(web)
        .patch('/api/users')
        .set('Authorization', 'test')
        .send({
            name: 'Sony',
        });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('Sony');
    });

    it("should update password", async () => {
        const result = await supertest(web)
        .patch('/api/users')
        .set('Authorization', 'test')
        .send({
            password: 'passwordbaru',
        });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');

        const user = await getTestUser();
        expect(await bcrypt.compare('passwordbaru', user.password)).toBe(true);
    });

    it("should reject if request is invalid", async () => {
        const result = await supertest(web)
        .patch('/api/users')
        .set('Authorization', 'salah')
        .send({});

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

describe("DELETE /api/users/logout", () => {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it("should logout", async () => {
        const result = await supertest(web)
        .delete('/api/users/logout')
        .set('Authorization', 'test');

        console.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        const user = await getTestUser();
        expect(user.token).toBeNull();
    });
})