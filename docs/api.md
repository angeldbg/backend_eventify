# API (resumen rapido)

Base: `/api`

## Auth
- `POST /auth/register` (registro)
- `POST /auth/login` (login)
- `GET /auth/profile` (ruta protegida)

## Artists
- `GET /artists` (listar)
- `POST /artists` (crear)
- `GET /artists/:id` (detalle)

## Events
- `GET /events` (listar)
- `POST /events` (crear)
- `GET /events/:id` (detalle)
- `GET /events/artist/:artistId` (por artista)

## Tickets (protegido)
- `POST /tickets/buy` (comprar, max 6 por evento)
- `GET /tickets/my-tickets` (mis tickets)
- `PATCH /tickets/cancel/:id` (cancelar)

## Swagger

Una vez arrancado el backend: `http://localhost:3000/api-docs`
