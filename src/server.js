import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';
import { connectDB } from './db/db.js';
import authRoutes from './routes/auth.routes.js';
import artistRoutes from './routes/artist.routes.js';
import eventRoutes from './routes/event.routes.js';
import ticketRoutes from './routes/ticket.routes.js';

const require = createRequire(import.meta.url);

// Cargo el .env antes de montar el resto del servidor.
dotenv.config();

// Intento conectar con MongoDB nada mas arrancar la API.
connectDB();

const app = express();

// Middlewares basicos para pruebas y desarrollo.
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// He añadido Swagger para poder revisar los endpoints de una forma mas comoda.
const swaggerDocument = {
  openapi: '3.0.0',
  info: { title: 'Eventify API', version: '1.0.0', description: 'API para compra de tickets de eventos' },
  servers: [{ url: 'http://localhost:3000/api' }],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
    }
  },
  paths: {
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Registrar usuario',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { name: { type: 'string', example: 'Angel García' }, email: { type: 'string', example: 'angel@gmail.com' }, password: { type: 'string', example: '123456' } } } } } },
        responses: { 201: { description: 'Usuario creado' }, 400: { description: 'Email ya registrado' } }
      }
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Iniciar sesión',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { email: { type: 'string', example: 'angel@gmail.com' }, password: { type: 'string', example: '123456' } } } } } },
        responses: { 200: { description: 'Login exitoso, devuelve token' }, 400: { description: 'Credenciales incorrectas' } }
      }
    },
    '/auth/profile': {
      get: {
        tags: ['Auth'],
        summary: 'Obtener perfil del usuario autenticado',
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: 'Perfil del usuario' }, 401: { description: 'No autorizado' } }
      }
    },
    '/artists': {
      get: {
        tags: ['Artists'],
        summary: 'Listar todos los artistas',
        responses: { 200: { description: 'Lista de artistas' } }
      },
      post: {
        tags: ['Artists'],
        summary: 'Crear artista',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { name: { type: 'string', example: 'Bad Bunny' }, bio: { type: 'string', example: 'Artista de trap latino' }, genre: { type: 'string', example: 'Trap' }, image: { type: 'string', example: 'https://example.com/img.jpg' } } } } } },
        responses: { 201: { description: 'Artista creado' } }
      }
    },
    '/artists/{id}': {
      get: {
        tags: ['Artists'],
        summary: 'Obtener artista con álbumes y canciones',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Artista con discografía' }, 404: { description: 'No encontrado' } }
      }
    },
    '/events': {
      get: {
        tags: ['Events'],
        summary: 'Listar eventos futuros',
        responses: { 200: { description: 'Lista de eventos' } }
      },
      post: {
        tags: ['Events'],
        summary: 'Crear evento',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { artist: { type: 'string', example: '664f...' }, title: { type: 'string', example: "Bad Bunny World's Hottest Tour" }, date: { type: 'string', example: '2025-08-15' }, time: { type: 'string', example: '21:00' }, venue: { type: 'string', example: 'Bernabéu' }, city: { type: 'string', example: 'Madrid' }, country: { type: 'string', example: 'España' }, capacity: { type: 'number', example: 80000 }, price: { type: 'number', example: 85 }, tour: { type: 'string', example: "World's Hottest Tour" }, image: { type: 'string', example: 'https://example.com/evento.jpg' } } } } } },
        responses: { 201: { description: 'Evento creado' } }
      }
    },
    '/events/{id}': {
      get: {
        tags: ['Events'],
        summary: 'Obtener evento por ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Detalle del evento' }, 404: { description: 'No encontrado' } }
      }
    },
    '/events/artist/{artistId}': {
      get: {
        tags: ['Events'],
        summary: 'Eventos futuros por artista',
        parameters: [{ name: 'artistId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Lista de eventos del artista' } }
      }
    },
    '/tickets/buy': {
      post: {
        tags: ['Tickets'],
        summary: 'Comprar tickets (máx 6 por usuario por evento)',
        security: [{ bearerAuth: [] }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { eventId: { type: 'string', example: '667f...' }, quantity: { type: 'number', example: 2 } } } } } },
        responses: { 201: { description: 'Ticket comprado' }, 400: { description: 'Límite superado o sin disponibilidad' }, 401: { description: 'No autorizado' } }
      }
    },
    '/tickets/my-tickets': {
      get: {
        tags: ['Tickets'],
        summary: 'Mis tickets',
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: 'Lista de tickets del usuario' }, 401: { description: 'No autorizado' } }
      }
    },
    '/tickets/cancel/{id}': {
      patch: {
        tags: ['Tickets'],
        summary: 'Cancelar ticket',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Ticket cancelado' }, 404: { description: 'No encontrado' }, 401: { description: 'No autorizado' } }
      }
    }
  }
};

// Esta ruta muestra la documentacion de la API en el navegador.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Separo las rutas por modulos para que el archivo principal quede mas limpio.
app.use('/api/auth', authRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Swagger UI disponible en http://localhost:${PORT}/api-docs`);
});
