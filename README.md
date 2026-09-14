# Defensores de la Patria - Casanare

API registro de Defensores de la Patria - Casanare.

## Tecnología

- **Backend:** TypeScript + Express + DynamoDB
- **Arquitectura:** Hexagonal (Domain-Driven Design)
- **Almacenamiento:** AWS DynamoDB (local development)
- **Autenticación:** CORS + Rate Limiting

## Estructura

```
├── backend/
│   ├── src/
│   │   ├── domain/          # Entidades y repositorios
│   │   ├── app/             # Servicios, controladores, DTOs, rutas
│   │   └── infra/           # DynamoDB, Swagger, Container DI
│   ├── scripts/             # Init DB, generate tokens
│   └── package.json
├── docker-compose.yml       # DynamoDB local + admin
└── README.md
```

## Quick Start

### 1. Requisitos

- Node.js 18+
- Docker + Docker Compose

### 2. Setup

```bash
# Clonar y navegar
cd backend

# Instalar dependencias
npm install

# Copiar env
cp .env.example .env
```

### 3. Levantar DynamoDB local

```bash
docker-compose up
```

### 4. Inicializar BD y server

```bash
# Terminal 1: DB init
npm run db:init

# Terminal 2: Dev server
npm run dev
```

Server en `http://localhost:3000`

## Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/registrations` | Listar todos |
| POST | `/api/registrations` | Crear registro |
| GET | `/api/registrations/excel` | Exportar Excel |
| DELETE | `/api/registrations?confirm=DELETE_ALL` | Limpiar BD |

## Documentación

- Swagger UI: `http://localhost:3000/api-docs`
- DynamoDB Admin: `http://localhost:8001`

## Scripts

```bash
npm run dev              # Dev mode
npm run build            # Compilar
npm run typecheck        # Validar tipos
npm run db:init          # Crear tabla DynamoDB
npm run token            # Generar JWT test
npm run dev:full         # Build + Init + Dev
npm run start:auto       # Auto-init en producción
```

## Deployment

Deploy a AWS Lambda:

```bash
npm run deploy:prod
```