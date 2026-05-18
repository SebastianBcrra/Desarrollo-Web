# 🏋️‍♂️ GYM JDO

Proyecto web desarrollado para la creación de una página de gimnasio, implementando una arquitectura basada en componentes reutilizables utilizando Node.js, Express y EJS.

---

## 📌 Descripción

Este proyecto consiste en el desarrollo de una página web para un gimnasio donde se presentan diferentes secciones como:

* Inicio (Hero)
* Descripción del gimnasio
* Entrenamientos
* Horarios
* Planes
* Contacto
* Login de usuarios
* Registro de usuarios
* Perfil de usuario
* CRUD de productos
* Base de datos MySQL

Se implementó el motor de plantillas EJS para reutilizar componentes y mejorar la organización del código.

Además, se implementó autenticación de usuarios mediante sesiones, CRUD completo de productos y persistencia de datos usando MySQL y Sequelize ORM.

---

## 🚀 Tecnologías utilizadas

* Node.js
* Express
* EJS
* HTML5
* CSS3
* JavaScript
* MySQL
* phpMyAdmin
* Sequelize
* Express-session
* Dotenv

---

## 🧩 Estructura del proyecto


```plaintext
paginaGym/

node_modules/

config/
    database.js

controllers/
    usersController.js

middlewares/
    authMiddleware.js
    guestMiddleware.js

models/
    Usuario.js
    Producto.js

public/
    css/
        style.css
    img/
    js/

views/
    pages/
        home.ejs
        login.ejs
        register.ejs
        profile.ejs

    partials/
        head.ejs
        header.ejs
        footer.ejs

    gym/
        hero.ejs
        descripcion.ejs
        entrenamientos.ejs
        horarios.ejs
        planes.ejs
        contacto.ejs

data/
    productos.json
    users.json

database.sql
retro.md
weekly.md
README.md
.env
app.js
package.json
package-lock.json

```

---

## 🗄️ Base de datos

El proyecto utiliza MySQL mediante phpMyAdmin y Sequelize ORM.

Base de datos utilizada:

```sql
gymdb
```

---

## 📊 Diagrama base de datos

```plaintext
USUARIOS
-------------------------
id
nombre
email
password
createdAt
updatedAt


PRODUCTOS
-------------------------
id
nombre
precio
descripcion
createdAt
updatedAt
```

---

## ⚙️ Funcionamiento

La aplicación utiliza Express como servidor web y EJS como motor de plantillas.

Los componentes se reutilizan mediante la función:

```ejs
<%- include('../partials/header') %>
```

Esto permite evitar la repetición de código y facilita el mantenimiento del proyecto.

También se implementó Sequelize para realizar operaciones CRUD sobre MySQL y manejo de sesiones con express-session.

---

## 🔐 Funcionalidades implementadas

✔ Registro de usuarios  
✔ Inicio de sesión  
✔ Cierre de sesión  
✔ Perfil de usuario  
✔ CRUD completo de productos  
✔ Persistencia con MySQL  
✔ Middleware de autenticación  
✔ Sesiones de usuario  
✔ Componentes reutilizables EJS  
✔ Diseño responsive  

---

## 🎨 Diseño

El diseño del sitio está basado en un prototipo realizado en Figma, con una interfaz moderna, limpia y adaptable a dispositivos móviles.

---

## 📂 Archivos importantes

* app.js → configuración del servidor
* config/database.js → conexión a MySQL
* models/ → modelos Sequelize
* views/ → vistas en EJS
* public/ → archivos estáticos (CSS, imágenes)
* database.sql → script de base de datos
* retro.md → retrospectiva del sprint
* weekly.md → seguimiento del proyecto

---

## 📈 Metodología

Se aplicaron prácticas ágiles durante el desarrollo:

* Retrospectiva (retro.md con estrella de mar)
* Seguimiento semanal (weekly.md)
* Desarrollo por sprints
* Uso de ramas GitHub

---

## 🌿 Ramas del proyecto

El repositorio contiene las siguientes ramas:

* main
* sprint-1
* sprint-2
* sprint-3
* sprint-5
* sprint-6


## ▶️ Ejecución del proyecto

1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables de entorno:

```env
DB_NAME=gymdb
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=3306
```

3. Ejecutar el servidor:

```bash
nodemon app.js
```

4. Abrir en el navegador:

```plaintext
http://localhost:3000
```

---

## ✅ Estado del proyecto

✔ Uso de EJS  
✔ Componentes reutilizables (partials)  
✔ Estructura organizada  
✔ Diseño funcional basado en Figma  
✔ CRUD completo  
✔ Base de datos MySQL  
✔ Sequelize ORM  
✔ Sistema de autenticación  
✔ Ramas GitHub por sprint  

---

## 👥 Equipo de trabajo

Proyecto desarrollado por el equipo GYM JDO.

Jhoan Sebastian Becerra Chacon  
Darwin Meza Sanabria  
Oliver Fernando Pardo Duarte

---

## 📌 Notas

Este proyecto fue desarrollado con fines académicos como parte de los Sprint 1 al Sprint 6 de Desarrollo Web.

