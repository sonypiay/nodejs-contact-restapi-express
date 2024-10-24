import supertest from "supertest";
import { web } from "../../src/application/web.js";
import { createTestUser, removeTestUser, createTestContact, removeTestContact, getTestContact } from '../utils/utils.js';

describe("PUT /api/contacts/:id", () => {
    beforeEach(async () => {
        await createTestUser();
        await createTestContact('123');
    });

    afterEach(async () => {
        await removeTestContact('test');
        await removeTestUser();
    });

    it("update contact", async () => {
        const result = await supertest(web)
        .put('/api/contacts/123')
        .set('Authorization', 'test')
        .send({
            firstname: 'test update',
            lastname: 'test update',
            email: 'test@email-update.com',
            phone_number: '123456'
        });

        expect(result.body.data.firstname).toBe('test update');
        expect(result.body.data.lastname).toBe('test update');
        expect(result.body.data.phone).toBe('123456');
    });

    it("update contact rejected when email is unique", async () => {
        const createContact = await supertest(web)
        .post('/api/contacts')
        .set('Authorization', 'test')
        .send({
            firstname: 'john',
            lastname: 'doe',
            email: 'john.doe@example.com',
            phone_number: '12345678'
        });

        expect(createContact.status).toBe(200);
        expect(createContact.body.data.firstname).toBe('john');
        expect(createContact.body.data.lastname).toBe('doe');
        expect(createContact.body.data.email).toBe('john.doe@example.com');
        expect(createContact.body.data.phone).toBe('12345678');

        const resultUpdate = await supertest(web)
        .put('/api/contacts/123')
        .set('Authorization', 'test')
        .send({
            firstname: 'test update',
            lastname: 'test update',
            email: 'john.doe@example.com',
            phone_number: '123456'
        });

        expect(resultUpdate.status).toBe(400);
        expect(resultUpdate.body.errors).toBeDefined();
        expect(resultUpdate.body.errors).toBe('Email address is already taken!');
    });

    it("update contact rejected when phone number is unique", async () => {
        const createContact = await supertest(web)
        .post('/api/contacts')
        .set('Authorization', 'test')
        .send({
            firstname: 'john',
            lastname: 'doe',
            email: 'john.doe@example.com',
            phone_number: '12345678'
        });

        expect(createContact.status).toBe(200);
        expect(createContact.body.data.firstname).toBe('john');
        expect(createContact.body.data.lastname).toBe('doe');
        expect(createContact.body.data.email).toBe('john.doe@example.com');
        expect(createContact.body.data.phone).toBe('12345678');

        const resultUpdate = await supertest(web)
        .put('/api/contacts/123')
        .set('Authorization', 'test')
        .send({
            firstname: 'test update',
            lastname: 'test update',
            email: 'test@email-update.com',
            phone_number: '12345678'
        });

        expect(resultUpdate.status).toBe(400);
        expect(resultUpdate.body.errors).toBeDefined();
        expect(resultUpdate.body.errors).toBe('Phone number is already taken!');
    });
});