import { web } from "../../src/application/web.js";
import supertest from "supertest";
import { createTestUser, removeTestUser, getTestUser } from "../utils/utils.js";

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

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        const user = await getTestUser();
        expect(user.token).toBeNull();
    });
})