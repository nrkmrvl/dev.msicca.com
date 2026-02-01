# MSICCA Backend

Backend básico en Node.js (Express) para captura de datos de contacto y presupuesto.

## Características

- Sin autenticación (según requerimientos)
- Endpoints para captura de datos:
  - `POST /api/contacto` - Captura datos de contacto
  - `POST /api/presupuesto` - Captura solicitudes de presupuesto
- Almacenamiento en archivos de texto locales
- Validación básica de datos
- CORS habilitado para comunicación con frontend

## Instalación

1. Navegar a la carpeta backend:
```bash
cd backend
```

2. Instalar dependencias:
```bash
npm install
```

## Uso

### Iniciar el servidor

```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000` por defecto.

### Variables de entorno

- `PORT`: Puerto del servidor (default: 3000)

```bash
PORT=4000 npm start
```

## Endpoints

### GET /api/health

Health check del servidor.

**Response:**
```json
{
  "status": "ok",
  "message": "MSICCA Backend is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### POST /api/contacto

Captura datos de contacto.

**Request Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "+1234567890",
  "mensaje": "Mensaje de contacto"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Contacto guardado exitosamente",
  "data": {
    "nombre": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Nombre y email son campos requeridos"
}
```

Los datos se guardan en `backend/contacts.txt`.

### POST /api/presupuesto

Captura solicitudes de presupuesto.

**Request Body:**
```json
{
  "nombre": "María García",
  "email": "maria@example.com",
  "empresa": "Tech Corp",
  "telefono": "+1234567890",
  "tipoProyecto": "Desarrollo Web",
  "presupuesto": "$10,000 - $20,000",
  "descripcion": "Necesito una aplicación web personalizada"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Solicitud de presupuesto guardada exitosamente",
  "data": {
    "nombre": "María García",
    "email": "maria@example.com",
    "tipoProyecto": "Desarrollo Web"
  }
}
```

Los datos se guardan en `backend/presupuestos.txt`.

## Archivos de datos

Los datos se almacenan en archivos de texto dentro de la carpeta `backend/`:

- `contacts.txt` - Datos de contacto
- `presupuestos.txt` - Solicitudes de presupuesto

Formato de almacenamiento:
```
========================================
Fecha: 2024-01-01T00:00:00.000Z
Nombre: Juan Pérez
Email: juan@example.com
Teléfono: +1234567890
Mensaje: Mensaje de contacto
========================================
```

## Estructura de archivos

```
backend/
├── server.js           # Servidor Express principal
├── package.json        # Dependencias y scripts
├── contacts.txt        # Datos de contacto (generado automáticamente)
├── presupuestos.txt    # Solicitudes de presupuesto (generado automáticamente)
└── README.md          # Esta documentación
```

## Notas de seguridad

⚠️ **IMPORTANTE**: Este backend no incluye autenticación según los requerimientos del proyecto. Para uso en producción, considerar:

- Implementar autenticación y autorización
- Agregar rate limiting
- Validación más robusta de datos
- Almacenamiento en base de datos
- Logging estructurado
- HTTPS obligatorio

## Testing

### Con curl

```bash
# Health check
curl http://localhost:3000/api/health

# Enviar contacto
curl -X POST http://localhost:3000/api/contacto \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test User",
    "email": "test@example.com",
    "telefono": "123456789",
    "mensaje": "Test message"
  }'

# Enviar presupuesto
curl -X POST http://localhost:3000/api/presupuesto \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test User",
    "email": "test@example.com",
    "empresa": "Test Corp",
    "tipoProyecto": "Web Development",
    "presupuesto": "$5000",
    "descripcion": "Test project description"
  }'
```

## Licencia

MIT
