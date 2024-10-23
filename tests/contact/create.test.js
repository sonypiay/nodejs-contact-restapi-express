import supertest from "supertest";
import { web } from "../../src/application/web.js";
import { createTestUser, removeTestContact, removeTestUser } from "../test-util.js";

describe("POST /api/contacts", () => {
    beforeAll(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestContact('test');
    });

    afterAll(async () => {
        await removeTestUser();
    });

    it("should create new contact", async () => {
        const result = await supertest(web)
        .post('/api/contacts')
        .set('Authorization', 'test')
        .send({
            firstname: 'test',
            lastname: 'test',
            email: 'test@email.com',
            phone_number: '123'
        });

        expect(result.status).toBe(200);
        expect(result.body.data.firstname).toBe('test');
        expect(result.body.data.lastname).toBe('test');
        expect(result.body.data.email).toBe('test@email.com');
        expect(result.body.data.phone).toBe('123');
    });

    it("should reject if invalid request", async () => {
        const result = await supertest(web)
        .post('/api/contacts')
        .set('Authorization', 'test')
        .send({
            lastname: 'test',
            email: 'test@email.com',
            phone_number: '123'
        });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it("should reject if email is unique", async () => {
        const result = await supertest(web)
        .post('/api/contacts')
        .set('Authorization', 'test')
        .send({
            firstname: 'test',
            lastname: 'test',
            email: 'test@email.com',
            phone_number: '123'
        });

        expect(result.status).toBe(200);
        expect(result.body.data.email).toBe('test@email.com');
        expect(result.body.data.phone).toBe('123');

        const result_unique = await supertest(web)
        .post('/api/contacts')
        .set('Authorization', 'test')
        .send({
            firstname: 'test',
            lastname: 'test',
            email: 'test@email.com',
            phone_number: '123'
        });

        expect(result_unique.status).toBe(400);
        expect(result_unique.body.errors).toBeDefined();
        expect(result_unique.body.errors).toBe('Email address is already taken!');
    });

    it("should reject if phone number is unique", async () => {
        const result = await supertest(web)
        .post('/api/contacts')
        .set('Authorization', 'test')
        .send({
            firstname: 'test',
            lastname: 'test',
            email: 'test@email.com',
            phone_number: '123'
        });

        expect(result.status).toBe(200);
        expect(result.body.data.email).toBe('test@email.com');
        expect(result.body.data.phone).toBe('123');

        const result_unique = await supertest(web)
        .post('/api/contacts')
        .set('Authorization', 'test')
        .send({
            firstname: 'test2',
            lastname: 'test2',
            email: 'test2@email.com',
            phone_number: '123'
        });

        console.info(result_unique.status);
        console.info(result_unique.body);

        expect(result_unique.status).toBe(400);
        expect(result_unique.body.errors).toBeDefined();
        expect(result_unique.body.errors).toBe('Phone number is already taken!');
    });
});