const { body } = require('express-validator');

const productValidation = [

    body('nombre')
        .notEmpty().withMessage('El nombre del producto es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener mínimo 3 caracteres'),

    body('precio')
        .notEmpty().withMessage('El precio es obligatorio')
        .isNumeric().withMessage('El precio debe ser numérico')
];

module.exports = productValidation;