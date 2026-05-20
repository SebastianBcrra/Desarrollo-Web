const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');

const { body, validationResult } = require('express-validator');

const app = express();
const PORT = 3000;


// ======================
// CONEXIÓN MYSQL XAMPP
// ======================

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Conectado a MySQL correctamente');
    })
    .catch(err => {
        console.log('Error conexión:', err);
    });


// ======================
// MODELO PRODUCTOS
// ======================

const Producto = sequelize.define('Producto', {

    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    precio: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

});


// ======================
// MODELO USUARIOS
// ======================

const Usuario = sequelize.define('Usuario', {

    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }

});


// ======================
// SINCRONIZAR TABLAS
// ======================

sequelize.sync()
    .then(() => {
        console.log('Tablas sincronizadas');
    });


// ======================
// CONFIGURACIÓN
// ======================

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());


// ======================
// SESIONES
// ======================

app.use(session({
    secret: 'gym_secret',
    resave: false,
    saveUninitialized: false
}));


// ======================
// MIDDLEWARES
// ======================

function authMiddleware(req, res, next) {

    if (!req.session.user) {
        return res.redirect('/login');
    }

    next();
}

function guestMiddleware(req, res, next) {

    if (req.session.user) {
        return res.redirect('/');
    }

    next();
}


// ======================
// VALIDACIONES
// ======================

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

const productValidation = [

    body('nombre')
        .notEmpty().withMessage('El nombre del producto es obligatorio'),

    body('precio')
        .notEmpty().withMessage('El precio es obligatorio')
        .isNumeric().withMessage('El precio debe ser numérico')

];


// ======================
// HOME
// ======================

app.get('/', async (req, res) => {

    const planes = [
        { nombre: "Básico", precio: 50000 },
        { nombre: "Premium", precio: 80000 },
        { nombre: "VIP", precio: 120000 }
    ];

    const productos = await Producto.findAll();

    res.render('pages/home', {
        user: req.session.user,
        query: req.query,
        planes,
        productos
    });

});


// ======================
// LOGIN
// ======================

app.get('/login', guestMiddleware, (req, res) => {

    res.render('pages/login', {
        user: req.session.user,
        errors: []
    });

});

app.post('/login', loginValidation, async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.render('pages/login', {
            user: null,
            errors: errors.array()
        });
    }

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({
            where: {
                email,
                password
            }
        });

        if (!usuario) {

            return res.render('pages/login', {
                user: null,
                errors: [{ msg: 'Credenciales incorrectas' }]
            });
        }

        req.session.user = usuario;

        res.redirect('/');

    } catch (error) {

        console.log(error);

        res.send('Error al iniciar sesión');

    }

});


// ======================
// REGISTER
// ======================

app.get('/register', guestMiddleware, (req, res) => {

    res.render('pages/register', {
        user: req.session.user,
        errors: []
    });

});

app.post('/register', registerValidation, async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.render('pages/register', {
            user: null,
            errors: errors.array()
        });
    }

    const { nombre, email, password } = req.body;

    try {

        await Usuario.create({
            nombre,
            email,
            password
        });

        res.redirect('/login');

    } catch (error) {

        console.log(error);

        res.send(error.message);

    }

});


// ======================
// PERFIL
// ======================

app.get('/profile', authMiddleware, (req, res) => {

    res.render('pages/profile', {
        user: req.session.user
    });

});


// ======================
// LOGOUT
// ======================

app.get('/logout', (req, res) => {

    req.session.destroy();

    res.redirect('/');

});


// ======================
// CRUD PRODUCTOS
// ======================

// GET

app.get('/productos', async (req, res) => {

    const productos = await Producto.findAll();

    res.json(productos);

});


// POST

app.post('/productos', productValidation, async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json(errors.array());
    }

    try {

        const nuevo = await Producto.create({
            nombre: req.body.nombre,
            precio: req.body.precio
        });

        res.json(nuevo);

    } catch (error) {

        console.log(error);

        res.send('Error creando producto');

    }

});


// PUT

app.put('/productos/:id', productValidation, async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json(errors.array());
    }

    try {

        await Producto.update(
            {
                nombre: req.body.nombre,
                precio: req.body.precio
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );

        res.json({
            mensaje: 'Producto actualizado'
        });

    } catch (error) {

        console.log(error);

        res.send('Error actualizando producto');

    }

});


// DELETE

app.delete('/productos/:id', async (req, res) => {

    try {

        await Producto.destroy({
            where: {
                id: req.params.id
            }
        });

        res.json({
            mensaje: 'Producto eliminado'
        });

    } catch (error) {

        console.log(error);

        res.send('Error eliminando producto');

    }

});


// ======================
// SERVIDOR
// ======================

app.listen(PORT, () => {

    console.log(`Servidor corriendo en http://localhost:${PORT}`);

});