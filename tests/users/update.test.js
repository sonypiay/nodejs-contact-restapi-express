import { web } from "../../src/application/web.js";
import supertest from "supertest";
import { createTestUser, removeTestUser, getTestUser } from "../utils/utils.js";
import bcrypt from "bcrypt";

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