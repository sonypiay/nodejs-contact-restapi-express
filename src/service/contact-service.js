import { v4 as uuidv4 } from 'uuid';
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../errors/response-error.js";
import { validate } from '../validation/validation.js';
import { storeContactValidation } from '../validation/contact-validation.js';

const checkUniqueFields = async (request, fields, id) => {
    const defaultFields = [
        'email',
        'phone_number'
    ];

    const whereClause = {
        AND: [
            {
                username: request.username
            }
        ]
    };

    if( ! defaultFields.includes(fields) ) return false;

    if( fields == 'email' ) {
        whereClause.AND.push({
            email: request.email
        });
    } else if( fields == 'phone_number' ) {
        whereClause.AND.push({
            phone: request.phone_number
        });
    }

    if( id || id === undefined ) {
        whereClause.id = {
            not: id
        }
    }

    const result = await prismaClient.contact.count({
        where: whereClause
    });

    return result == 1 ? true : false;
}

const create = async (request) => {
    const contactRequest = validate(storeContactValidation, request);
    const isEmailUnique = await checkUniqueFields(contactRequest, 'email');
    const isPhoneUnique = await checkUniqueFields(contactRequest, 'phone_number');

    if( isEmailUnique ) {
        throw new ResponseError(400, 'Email address is already taken!');
    }

    if( isPhoneUnique ) {
        throw new ResponseError(400, 'Phone number is already taken!');
    }

    const contactId = uuidv4();
    const data = {
        id: contactId,
        firstname: contactRequest.firstname,
        lastname: contactRequest.lastname,
        email: contactRequest.email,
        phone: contactRequest.phone_number,
        username: contactRequest.username,
    };

    return await prismaClient.contact.create({
        data: data
    });
}

const update = async (request, id) => {
    const contactRequest = validate(storeContactValidation, request);
    const isEmailUnique = await checkUniqueFields(contactRequest, 'email', id);
    const isPhoneUnique = await checkUniqueFields(contactRequest, 'phone_number', id);

    if( isEmailUnique ) {
        throw new ResponseError(400, 'Email address is already taken!');
    }

    if( isPhoneUnique ) {
        throw new ResponseError(400, 'Phone number is already taken!');
    }

    let contacts = await prismaClient.contact;
    const hasContact = contacts.count({
        where: {
            id: id,
            username: contactRequest.username
        }
    });

    if( hasContact == 0 ) throw new ResponseError(404, 'Contact not found');

    return contacts.update({
        where: {
            id: id,
            username: contactRequest.username
        },
        data: {
            firstname: contactRequest.firstname,
            lastname: contactRequest.lastname,
            email: contactRequest.email,
            phone: contactRequest.phone_number
        }
    });
}

export default {
    create, update
}