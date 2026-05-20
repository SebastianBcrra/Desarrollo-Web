const { body } = require('express-validator');

const registerValidation = [

    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener mínimo 3 caracteres'),

    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe ingresar un email válido'),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 4 }).withMessage('La contraseña debe tener mínimo 4 caracteres')
];

const loginValidation = [

    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Email inválido'),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
];

module.exports = {
    registerValidation,
    loginValidation
};