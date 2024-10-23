import { web } from "../../src/application/web.js";
import supertest from "supertest";
import { createTestUser, removeTestUser } from "../utils/utils.js";

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