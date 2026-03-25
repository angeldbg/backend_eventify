# Pruebas manuales (checklist)

## Auth
- Registro con email nuevo devuelve token.
- Registro con email repetido devuelve error 400.
- Login con password incorrecta devuelve error 400.
- Perfil sin token devuelve 401.
- Perfil con token devuelve datos del usuario sin password.

## Eventos / artistas
- Crear artista y comprobar que aparece en el listado.
- Crear evento asociado a un artista y comprobar que aparece.
- Consultar detalle de un evento por id.

## Tickets
- Comprar 1-2 tickets reduce `availableTickets`.
- No deja comprar mas de 6 tickets por usuario y evento.
- `my-tickets` devuelve eventos con artista populado.
- Cancelar ticket cambia a `cancelled` y devuelve entradas al evento.
