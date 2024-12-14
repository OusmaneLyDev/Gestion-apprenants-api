import Joi from 'joi';

export const validatePayment = (req, res, next) => {
    const schema = Joi.object({
        student_id: Joi.number().integer().required(),
        module_id: Joi.number().integer().required(),
        registration_id: Joi.number().integer().required(),
        payment_date: Joi.date().required(),
        amount: Joi.number().positive().required(),
        payer: Joi.string().max(50).required(),
        payer_number: Joi.string().max(15).required(),
        payment_mode: Joi.string().max(50).required(),
        status: Joi.string().valid('Pending', 'Completed', 'Failed').required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};
