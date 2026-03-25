# Arquitectura (backend)

El proyecto esta separado en capas para que sea mas facil de mantener:

- `routes`: define los endpoints y delega en controladores
- `controllers`: aplica logica de negocio y prepara respuestas
- `models`: esquemas de Mongoose y acceso a datos
- `middleware`: funciones reutilizables (por ejemplo, auth JWT)
- `db`: conexion a MongoDB

## Esquema general (texto)

Cliente (frontend) -> API REST (Express) -> Mongoose -> MongoDB

## Notas

- La autenticacion se hace con JWT en la cabecera `Authorization: Bearer <token>`.
- Swagger se usa para documentar y probar endpoints durante el desarrollo.
