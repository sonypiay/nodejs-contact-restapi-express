import contactService from '../service/contact-service.js';

const create = async (request, response, next) => {
    try {
        const username = request.user.username;
        const requestBody = request.body;
        requestBody.username = username;
        
        const result = await contactService.create(requestBody);
        response.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
};

const update = async (request, response, next) => {
    try {
        const contactId = request.params.id;
        const username = request.user.username;
        const requestBody = request.body;
        requestBody.username = username;

        const result = await contactService.update(requestBody, contactId);

        response.status(200).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

export default {
    create, update
}