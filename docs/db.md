# Diseno de base de datos (MongoDB)

Este proyecto usa MongoDB con Mongoose. Aunque no hay un E/R clasico, si hay relaciones logicas con referencias `ObjectId`.

## Colecciones

### User
- `name` (string)
- `email` (string, unico)
- `password` (string, cifrada con bcrypt)

### Artist
- `name` (string)
- `bio` (string)
- `genre` (string)
- `image` (string)

### Album
- `title` (string)
- `artist` (ObjectId -> Artist)
- `coverImage` (string)
- `releaseDate` (date)

### Song
- `title` (string)
- `album` (ObjectId -> Album)
- `artist` (ObjectId -> Artist)
- `duration` (number)
- `youtubeUrl` (string)

### Event
- `artist` (ObjectId -> Artist)
- `title` (string)
- `date` (date)
- `time` (string)
- `venue` (string)
- `city` (string)
- `country` (string)
- `capacity` (number)
- `availableTickets` (number)
- `price` (number)
- `tour` (string)
- `image` (string)

### Ticket
- `user` (ObjectId -> User)
- `event` (ObjectId -> Event)
- `quantity` (number, min 1, max 6)
- `totalPrice` (number)
- `status` (active | cancelled)

## Relaciones principales

- Un `Artist` puede tener varios `Event`.
- Un `User` puede tener varios `Ticket`.
- Cada `Ticket` apunta a 1 `User` y 1 `Event`.
