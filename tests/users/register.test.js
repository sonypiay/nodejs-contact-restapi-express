import { web } from "../../src/application/web.js";
import supertest from "supertest";
import { removeTestUser } from "../utils/utils.js";

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