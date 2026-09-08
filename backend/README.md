# Defensores de la Patria - Backend API

Backend para formulario de registro de Defensores de la Patria - Casanare.

## Setup

1. Instalar dependencias:
```bash
npm install
```

2. Crear archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

3. Llenar credenciales MySQL en `.env`

4. Inicializar base de datos:
```bash
npm run db:init
```

5. Iniciar servidor desarrollo:
```bash
npm run dev
```

## API Endpoints

### POST /api/registros
Crear nuevo registro. Requiere Bearer token.

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Body:**
```json
{
  "nombresCompletos": "Juan Pérez",
  "celular": "+573001234567",
  "tipoIdentificacion": "Cédula de Ciudadanía",
  "numeroIdentificacion": "123456789",
  "correoElectronico": "juan@example.com",
  "direccionCompleta": "Calle 1 #2-3",
  "grupoEdad": "25-35",
  "departamento": "Casanare",
  "municipio": "Yopal",
  "genero": "Hombre",
  "aceptoTerminos": true
}
```

### GET /api/registros/excel
Descargar registros en Excel. Requiere Bearer token.

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

## Base de Datos

- Tabla `registros`: almacena todos los registros del formulario
- Tabla `municipios`: lista de municipios de Casanare (seeded automáticamente)

## Scripts

- `npm run dev` - Iniciar servidor con hot-reload
- `npm run build` - Compilar TypeScript
- `npm start` - Iniciar servidor compilado
- `npm run db:init` - Inicializar/actualizar esquema de DB
- `npm run typecheck` - Verificar tipos TypeScript
