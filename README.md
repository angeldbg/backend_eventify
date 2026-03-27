# Backend Eventify

## Descripcion del proyecto

Este repositorio contiene el backend de **Eventify**, una aplicacion web orientada a la gestion y compra de entradas para eventos musicales. Este proyecto ha sido desarrollado como parte de mi **TFG del Grado Superior de Desarrollo de Aplicaciones Web (DAW)**.

La idea principal del backend es ofrecer una API REST que permita:

- registrar e iniciar sesion de usuarios
- consultar artistas y eventos
- comprar entradas
- consultar las entradas compradas
- cancelar tickets

Ademas, el proyecto incluye autenticacion con JWT, conexion con MongoDB y documentacion de la API con Swagger.

## Objetivo del backend

El objetivo de esta parte del proyecto es centralizar toda la logica de negocio y el acceso a datos. De esta forma, el frontend puede consumir la API y mostrar la informacion al usuario sin tener que gestionar directamente la base de datos.

He separado el proyecto por carpetas para que sea mas facil de mantener, entender y ampliar en el futuro. Esta organizacion tambien sigue una estructura bastante habitual en aplicaciones Node.js con Express.

## Tecnologias utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv
- Morgan
- Swagger UI

## Estructura de carpetas

```text
backend_eventify/
|-- node_modules/
|-- src/
|   |-- controllers/
|   |   |-- artist.controller.js
|   |   |-- auth.controller.js
|   |   |-- event.controller.js
|   |   `-- ticket.controller.js
|   |-- db/
|   |   `-- db.js
|   |-- middleware/
|   |   `-- auth.middleware.js
|   |-- models/
|   |   |-- Album.js
|   |   |-- Artist.js
|   |   |-- Event.js
|   |   |-- Song.js
|   |   |-- Ticket.js
|   |   `-- User.js
|   |-- routes/
|   |   |-- artist.routes.js
|   |   |-- auth.routes.js
|   |   |-- event.routes.js
|   |   `-- ticket.routes.js
|   |-- concierto.jpg
|   |-- index.html
|   |-- script.js
|   |-- server.js
|   `-- style.css
|-- .env
|-- .gitignore
|-- eventify.postman_collection.json
|-- package-lock.json
|-- package.json
`-- README.md
```

## Explicacion de la estructura

### `src/controllers`

En esta carpeta se encuentra la logica de cada funcionalidad. Los controladores reciben la peticion, trabajan con los modelos y devuelven la respuesta al cliente.

La cree para separar la logica del enrutado y evitar tener todo mezclado en un unico archivo.

### `src/routes`

Aqui se definen las rutas de la API. Cada archivo agrupa endpoints relacionados con una funcionalidad concreta, por ejemplo autenticacion, artistas, eventos o tickets.

La razon de usar esta carpeta es que mejora mucho la organizacion del proyecto y hace que `server.js` quede mas limpio.

### `src/models`

Contiene los modelos de Mongoose que representan las colecciones de MongoDB.

Esta carpeta es importante porque permite definir la estructura de los datos y las relaciones entre entidades del proyecto, como usuarios, artistas, eventos o tickets.

### `src/middleware`

Guarda middlewares reutilizables, en este caso el middleware de autenticacion con JWT.

La cree para no repetir logica comun en varias rutas y mantener una mejor separacion de responsabilidades.

### `src/db`

Incluye la configuracion de la conexion a la base de datos.

Su funcion es aislar la parte de acceso a MongoDB del resto de la aplicacion.

### `src/server.js`

Es el punto de entrada principal del backend. Desde aqui se configura Express, se cargan los middlewares, se conecta la base de datos, se cargan las rutas y se inicia el servidor.

### Archivos `index.html`, `script.js`, `style.css` y recursos en `src`

Estos archivos aparecen dentro del proyecto actual como apoyo visual o de pruebas realizadas durante el desarrollo. No forman la parte principal de la API, pero los mantengo porque me han servido en distintas fases del proyecto.

## Variables de entorno

Para que el proyecto funcione correctamente es necesario crear un archivo `.env` en la raiz del backend con valores como estos:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/eventify
JWT_SECRET=clave_super_secreta
```

### Explicacion de cada variable

- `PORT`: puerto en el que se ejecuta el servidor
- `MONGODB_URI`: cadena de conexion a MongoDB
- `JWT_SECRET`: clave usada para firmar y verificar los tokens

## Instalacion del proyecto

1. Clonar el repositorio.
2. Entrar en la carpeta del backend.
3. Instalar las dependencias.
4. Crear el archivo `.env`.
5. Iniciar el servidor.

```bash
git clone https://github.com/angeldbg/backend_eventify.git
cd backend_eventify
npm install
```

Despues de eso, hay que crear el `.env` con las variables necesarias.

## Ejemplo de inicio del proyecto

Para arrancar el backend en modo desarrollo:

```bash
npm run dev
```

Para arrancarlo en modo normal:

```bash
npm start
```

Si todo va bien, en consola deberia aparecer un mensaje parecido a este:

```bash
MongoDB conectado en localhost
Servidor corriendo en puerto 3000
Swagger UI disponible en http://localhost:3000/api-docs
```

## Endpoints principales

Estos son algunos de los endpoints mas importantes del proyecto:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `GET /api/artists`
- `POST /api/artists`
- `GET /api/events`
- `POST /api/events`
- `GET /api/events/:id`
- `GET /api/events/artist/:artistId`
- `POST /api/tickets/buy`
- `GET /api/tickets/my-tickets`
- `PATCH /api/tickets/cancel/:id`

## Documentacion con Swagger

La API cuenta con documentacion accesible desde el navegador una vez que el servidor esta iniciado:

```text
http://localhost:3000/api-docs
```

Esto me ha resultado util para probar endpoints y tener una vision general de la API sin depender siempre de Postman.

## Motivos de algunas decisiones

- He usado **Express** porque es un framework sencillo y adecuado para una API REST de este tipo.
- He usado **MongoDB** porque me permitia trabajar de forma flexible con documentos y relaciones sencillas entre colecciones.
- He usado **JWT** para gestionar la autenticacion de una manera relativamente simple y extendida.
- He separado rutas, controladores, modelos y middleware para que el proyecto fuese mas mantenible y entendible.

## Posibles mejoras futuras

- anadir validaciones mas completas en las entradas de datos
- mejorar el control de errores
- crear tests automaticos
- separar mejor los archivos de prueba o apoyo visual del backend
- desplegar la API en un entorno real

## Conclusion

Con este backend he buscado construir una base funcional para la aplicacion Eventify, aplicando conceptos vistos en el ciclo de DAW como el desarrollo de APIs, autenticacion, conexion con bases de datos y organizacion del codigo en capas.

No es un proyecto perfecto, pero si representa bien mi proceso de aprendizaje y el objetivo de crear una aplicacion realista y util como trabajo final.
