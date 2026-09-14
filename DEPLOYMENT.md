# Deployment Guide

## AWS Setup

### 1. Create IAM User for Deployment

```bash
# Create user with programmatic access
# Attach policies: AdministratorAccess (or specific Lambda/API Gateway permissions)
# Save Access Key ID and Secret Access Key
```

### 2. Add GitHub Secrets

Go to repository → Settings → Secrets and variables → Actions → New repository secret

Add:
```
AWS_ACCESS_KEY_ID=<your_access_key>
AWS_SECRET_ACCESS_KEY=<your_secret_key>
DB_HOST=<your_db_host>
DB_USER=<your_db_user>
DB_PASSWORD=<your_db_password>
DB_NAME=<your_db_name>
DB_PORT=3306
JWT_SECRET=<your_jwt_secret>
```

## Local Deployment

### Install Serverless Framework

```bash
npm install -g serverless
```

### Deploy Backend

```bash
cd backend
npm install
npm run deploy
```

This will:
1. Compile TypeScript
2. Build the project
3. Deploy to AWS Lambda via Serverless Framework

### Deployment Environment

- Lambda Function: `defensores-casanare-api-{stage}`
- API Gateway: Auto-created
- Region: us-east-1

## CI/CD Workflow

When you push to `develop` or `main`:

1. GitHub Actions workflow triggers
2. Installs dependencies
3. Runs typecheck
4. Builds TypeScript
5. Configures AWS credentials from secrets
6. Deploys to Lambda using Serverless Framework

## Environment Variables

All environment variables are passed via GitHub Secrets to Lambda at deployment time.

**Important**: Never commit `.env` file. Use GitHub Secrets only.

## API Endpoint

After deployment, your API endpoint will be:

```
https://<api-id>.execute-api.us-east-1.amazonaws.com/dev/
```

Access Swagger docs at:

```
https://<api-id>.execute-api.us-east-1.amazonaws.com/dev/api-docs
```

## Troubleshooting

### "Unable to create role" error
- Ensure IAM user has sufficient permissions
- Check AWS credentials are correct

### Lambda timeout
- Increase timeout in `serverless.yml` (currently 30s)
- Check database connection is accessible from Lambda

### "Cannot find module" error
- Ensure `npm install` runs before build
- Check `package.json` includes all dependencies
