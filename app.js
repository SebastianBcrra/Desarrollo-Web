const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');

const app = express();
const PORT = 3000;

// CONFIGURACIÓN

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sesión
app.use(session({
    secret: 'gym_secret',
    resave: false,
    saveUninitialized: true
}));

// =========================
// MIDDLEWARES SPRINT 5
// =========================

function authMiddleware(req, res, next) {

    if (!req.session.user) {
        return res.redirect('/login');
    }

    next();
}

function guestMiddleware(req, res, next) {

    if (req.session.user) {
        return res.redirect('/perfil');
    }

    next();
}

// JSON (PRODUCTOS CRUD)

const filePath = path.join(__dirname, 'data/productos.json');

function leerProductos() {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

function guardarProductos(productos) {
    fs.writeFileSync(filePath, JSON.stringify(productos, null, 2));
}

// USUARIO MOCK

const usuarioMock = {
    id: 1,
    nombre: "Usuario Demo",
    email: "demo@gmail.com",
    password: "1234"
};

// =========================
// RUTA PRINCIPAL
// =========================

app.get('/', (req, res) => {

    const planes = [
        {
            nombre: "Básico",
            precio: 50000,
            descripcion: "Acceso a máquinas"
        },
        {
            nombre: "Premium",
            precio: 80000,
            descripcion: "Máquinas + clases"
        },
        {
            nombre: "VIP",
            precio: 120000,
            descripcion: "Todo incluido + entrenador"
        }
    ];

    res.render('pages/home', {
        user: req.session.user,
        query: req.query,
        planes: planes
    });
});

// =========================
// LOGIN / REGISTER
// =========================

app.get('/login', guestMiddleware, (req, res) => {

    res.render('pages/login', {
        user: req.session.user
    });
});

app.get('/register', guestMiddleware, (req, res) => {

    res.render('pages/register', {
        user: req.session.user
    });
});

app.post('/login', (req, res) => {

    const { email, password } = req.body;

    if (
        email === usuarioMock.email &&
        password === usuarioMock.password
    ) {

        req.session.user = usuarioMock;

        return res.redirect('/perfil');
    }

    res.send("Credenciales incorrectas");
});

app.post('/register', (req, res) => {

    res.redirect('/login');
});

// =========================
// PERFIL
// =========================

app.get('/perfil', authMiddleware, (req, res) => {

    res.render('pages/profile', {
        user: req.session.user
    });
});

// =========================
// LOGOUT
// =========================

app.get('/logout', (req, res) => {

    req.session.destroy(() => {
        res.redirect('/');
    });
});

// =========================
// SELECCIONAR PLAN
// =========================

app.post('/seleccionar-plan/:nombre', authMiddleware, (req, res) => {

    const plan = req.params.nombre;

    res.redirect('/?ok=true');
});

// =========================
// CRUD JSON
// =========================

// GET
app.get('/productos', (req, res) => {

    const productos = leerProductos();

    res.json(productos);
});

// POST
app.post('/productos', (req, res) => {

    const productos = leerProductos();

    const nuevo = {
        id: Date.now(),
        nombre: req.body.nombre,
        precio: req.body.precio
    };

    productos.push(nuevo);

    guardarProductos(productos);

    res.json(nuevo);
});

// PUT
app.put('/productos/:id', (req, res) => {

    let productos = leerProductos();

    productos = productos.map(p => {

        if (p.id == req.params.id) {

            return {
                ...p,
                nombre: req.body.nombre,
                precio: req.body.precio
            };
        }

        return p;
    });

    guardarProductos(productos);

    res.json({
        mensaje: "Producto actualizado"
    });
});

// DELETE
app.delete('/productos/:id', (req, res) => {

    let productos = leerProductos();

    productos = productos.filter(
        p => p.id != req.params.id
    );

    guardarProductos(productos);

    res.json({
        mensaje: "Producto eliminado"
    });
});

// =========================
// SERVIDOR
// =========================

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});