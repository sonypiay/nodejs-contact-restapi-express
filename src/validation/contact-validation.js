import Joi from 'joi';

const storeContactValidation = Joi.object({
    username: Joi.string().max(100).required(),
    firstname: Joi.string().min(3).max(100).required(),
    lastname: Joi.string().max(100).optional(),
    email: Joi.string().email().max(100).optional(),
    phone_number: Joi.string().max(20).optional()
});

export {
    storeContactValidation
}