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

Se implementó el motor de plantillas EJS para reutilizar componentes y mejorar la organización del código.

---

## 🚀 Tecnologías utilizadas

* Node.js
* Express
* EJS
* HTML5
* CSS3
* JavaScript

---

## 🧩 Estructura del proyecto


```
paginaGym/

node_modules/

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

app.js
package.json
package-lock.json

```
           
```

```

---

## ⚙️ Funcionamiento

La aplicación utiliza Express como servidor web y EJS como motor de plantillas.

Los componentes se reutilizan mediante la función:

```ejs
<%- include('../partials/header') %>
```

Esto permite evitar la repetición de código y facilita el mantenimiento del proyecto.

---

## 🎨 Diseño

El diseño del sitio está basado en un prototipo realizado en Figma, con una interfaz moderna, limpia y adaptable a dispositivos móviles.

---

## 📂 Archivos importantes

* app.js → configuración del servidor
* views/ → vistas en EJS
* public/ → archivos estáticos (CSS, imágenes)
* retro.md → retrospectiva del sprint
* weekly.md → seguimiento del proyecto

---

## 📈 Metodología

Se aplicaron prácticas ágiles durante el desarrollo:

* Retrospectiva (retro.md con estrella de mar)
* Seguimiento semanal (weekly.md)

---

## ▶️ Ejecución del proyecto

1. Instalar dependencias:

```
npm install
```

2. Ejecutar el servidor:

```
nodemon app.js
```

3. Abrir en el navegador:

```
http://localhost:3000
```

---

## ✅ Estado del proyecto

✔ Uso de EJS
✔ Componentes reutilizables (partials)
✔ Estructura organizada
✔ Diseño funcional basado en Figma

---

## 👥 Equipo de trabajo

Proyecto desarrollado por el equipo GYM JDO.
Jhoan Sebastian Becerra Chacon
Darwin Meza Sanabria
Oliver Fernando Pardo Duarte

---

## 📌 Notas

Este proyecto fue desarrollado con fines académicos como parte del Sprint 3.
