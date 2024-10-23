import { prismaClient } from "../../src/application/database.js";
import bcrypt from "bcrypt";

const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: 'test'
        }
    });
}

const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: 'test',
            password: await bcrypt.hash('rahasia', 10),
            name: 'test',
            token: 'test'
        }
    });
}

const getTestUser = async () => {
    return await prismaClient.user.findUnique({
        where: {
            username: 'test'
        }
    });
}

const createTestContact = async (id) => {
    const user = await getTestUser();

    await prismaClient.contact.create({
        data: {
            id: id,
            firstname: 'test',
            lastname: 'test',
            email: 'sony@eannovate.com',
            phone: '12345',
            username: user.username
        }
    });
}

const removeTestContact = async (username) => {
    await prismaClient.contact.deleteMany({
        where: {
            username: username
        }
    });
}

export {
    removeTestUser,
    createTestUser,
    getTestUser,
    createTestContact,
    removeTestContact
}