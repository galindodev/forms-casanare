# Defensores de la Patria - Casanare

Monolito frontend + backend para formulario de registro de Defensores de la Patria.

## Estructura

```
├── backend/          # API TypeScript + Express + Hexagonal
├── frontend/         # Frontend React (próximamente)
└── README.md
```

## Backend

Ver [backend/README.md](./backend/README.md)

### Quick start backend

```bash
cd backend
npm install
cp .env.example .env
# Editar .env con credenciales MySQL
npm run db:init
npm run dev
```

## Frontend

Por implementar.

## CI/CD

Pipeline GitHub Actions:
- Trigger: push a `develop` o `main`
- Build backend
- Deploy a AWS Lambda

## Deploy

Ver detalles de deployment en `.github/workflows/` (próximamente)