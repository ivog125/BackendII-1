# Proyecto Eventos

Plataforma de Eventos e Inscripciones — backend base construido con Node.js y Express.

Este proyecto se desarrolla de forma incremental, en entregas sucesivas. La primera entrega cubrió la base arquitectónica (configuración del servidor, estructura de carpetas por capas y rutas mínimas de verificación). Esta segunda entrega suma el registro seguro de usuarios: validación de datos, normalización de email, hash de contraseñas con bcrypt y persistencia en MongoDB. Todavía no incluye login, JWT ni lógica de tickets/inscripciones; esas funcionalidades se desarrollarán en entregas posteriores.

## Temática elegida

Plataforma de Eventos e Inscripciones.

## Tecnologías usadas

- Node.js
- Express
- Mongoose (MongoDB)
- dotenv
- Módulos ESM (`import`/`export`)

## Instalación

```bash
npm install
```

## Variables de entorno

Copiar `.env.example` a `.env` y completar los valores:

| Variable     | Descripción                                                        |
|--------------|---------------------------------------------------------------------|
| `PORT`       | Puerto en el que escucha el servidor (fallback a `8080` si no se define). |
| `NODE_ENV`   | Entorno de ejecución (`development`, `production`, etc.).           |
| `MONGO_URL`  | Cadena de conexión a MongoDB. Si no se define, el servidor arranca igualmente y solo se registra un warning (aún no es crítico en esta etapa). |
| `JWT_SECRET` | Reservada para la implementación de autenticación en una entrega futura. Todavía no se utiliza. |

## Cómo ejecutar el proyecto

Modo desarrollo (con recarga automática usando `node --watch`):

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

## Estructura de carpetas

```
proyecto-eventos/
├── src/
│   ├── app.js              # Configuración de Express (middlewares, routers, error handler)
│   ├── server.js           # Punto de entrada: carga env, conecta DB y levanta el servidor
│   ├── config/              # Configuración centralizada (env, conexión a MongoDB)
│   ├── routes/               # Definición de rutas por recurso
│   ├── controllers/          # Controladores asociados a cada ruta
│   ├── services/              # Lógica de negocio (p. ej. registro de usuarios)
│   ├── repositories/          # Acceso a datos desacoplado
│   ├── dao/                   # Data Access Objects (interacción directa con Mongoose)
│   ├── models/               # Modelos de Mongoose
│   ├── middlewares/            # (vacío) Middlewares (auth, validaciones, etc.) — entregas futuras
│   └── utils/                  # Utilidades (hash de contraseñas, etc.)
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Rutas disponibles

| Método | Ruta                     | Descripción                                                  |
|--------|--------------------------|---------------------------------------------------------------|
| GET    | `/api/health`            | Verifica que el servidor está activo.                         |
| GET    | `/api/events`            | Estructura base del recurso eventos (retorna una lista vacía). |
| GET    | `/api/sessions`          | Estructura base del recurso sesiones (placeholder, sin autenticación aún). |
| POST   | `/api/sessions/register` | Registra un nuevo usuario.                                     |

### Probar el registro de usuarios (`POST /api/sessions/register`)

Body esperado (JSON):

| Campo        | Tipo   | Requerido | Descripción                                  |
|--------------|--------|-----------|-----------------------------------------------|
| `first_name` | string | sí        | Nombre del usuario.                            |
| `last_name`  | string | sí        | Apellido del usuario.                          |
| `email`      | string | sí        | Email del usuario (se normaliza a minúsculas). |
| `password`   | string | sí        | Contraseña (mínimo 8 caracteres).              |

Ejemplo de request:

```bash
curl -X POST http://localhost:8080/api/sessions/register \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Ada",
    "last_name": "Lovelace",
    "email": "ada@example.com",
    "password": "supersecreta"
  }'
```

Respuesta exitosa (`201 Created`):

```json
{
  "status": "success",
  "payload": {
    "id": "65123abc...",
    "first_name": "Ada",
    "last_name": "Lovelace",
    "email": "ada@example.com",
    "role": "user"
  }
}
```

Ante un error de validación (campos faltantes, formato de email inválido, contraseña corta o email ya registrado), la respuesta tiene la forma:

```json
{
  "status": "error",
  "message": "Descripción del error"
}
```

con el código HTTP correspondiente (`400` para validaciones, `409` si el email ya está registrado).
