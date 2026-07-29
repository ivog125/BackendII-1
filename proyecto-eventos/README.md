# Proyecto Eventos

Plataforma de Eventos e Inscripciones — backend base construido con Node.js y Express.

Esta es la **primera entrega** de un proyecto incremental. El alcance de esta etapa es exclusivamente la base arquitectónica: configuración del servidor, estructura de carpetas por capas y rutas mínimas de verificación. **No incluye** autenticación, JWT, roles, tickets, inscripciones ni lógica de negocio; esas funcionalidades se desarrollarán en entregas posteriores.

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
│   ├── services/              # (vacío) Lógica de negocio — entregas futuras
│   ├── repositories/          # (vacío) Acceso a datos desacoplado — entregas futuras
│   ├── dao/                   # (vacío) Data Access Objects — entregas futuras
│   ├── models/               # Modelos de Mongoose
│   ├── middlewares/            # (vacío) Middlewares (auth, validaciones, etc.) — entregas futuras
│   └── utils/                  # (vacío) Utilidades — entregas futuras
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Rutas disponibles

| Método | Ruta            | Descripción                                                  |
|--------|-----------------|---------------------------------------------------------------|
| GET    | `/api/health`   | Verifica que el servidor está activo.                         |
| GET    | `/api/events`   | Estructura base del recurso eventos (retorna una lista vacía). |
| GET    | `/api/sessions` | Estructura base del recurso sesiones (placeholder, sin autenticación aún). |
