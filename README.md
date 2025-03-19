# Yape Technical Challenge

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">Un monorepo basado en <a href="http://nodejs.org" target="_blank">Node.js</a> y <a href="http://nestjs.com" target="_blank">NestJS</a> para construir aplicaciones escalables y eficientes.</p>

## Descripción

Este repositorio contiene múltiples aplicaciones y servicios desarrollados con el framework NestJS. Es parte del desafío técnico de Yape y está diseñado para demostrar buenas prácticas en el desarrollo de microservicios y APIs.

## Estructura del proyecto

```plaintext
.env
.gitignore
.prettierrc
.docker-compose.yml
.eslint.config.mjs
.kafka-topics.sh
.nest-cli.json
.package.json
.pnpm-lock.yaml
.README.md
.tsconfig.build.json
.tsconfig.json
apps/
  yape-anti-fraud-ms/
    src/
      main.ts
      yape-anti-fraud-ms.module.ts
      application/
      domain/
      infrastructure/
      interface/
    test/
  yape-api-gateway/
    src/
      main.ts
      yape-api-gateway.module.ts
      application/
      domain/
      infrastructure/
      interface/
    test/
  yape-transaction-ms/
    src/
      main.ts
      yape-transaction-ms.module.ts
      application/
      domain/
      infrastructure/
      interface/
    test/
```

## Aplicaciones
- **yape-anti-fraud-ms**: Microservicio para la detección de fraudes.
- **yape-api-gateway**: Gateway API para centralizar las solicitudes.
- **yape-transaction-ms**: Microservicio para la gestión de transacciones.

## Instalación
Asegúrate de tener instalado `pnpm`.

```sh
pnpm install
```

## Ejecución del proyecto

### Desarrollo
```sh
pnpm start:dev
```

### Modo Watch
```sh
pnpm start:watch
```

### Producción
```sh
pnpm build && pnpm start:prod
```

### Pruebas
#### Unitarias
```sh
pnpm test
```

#### End-to-End (E2E)
```sh
pnpm test:e2e
```

#### Cobertura
```sh
pnpm test:cov
```
## Variables de Entorno

Configura las siguientes variables en un archivo .env:

```plaintext
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=transactions

KAFKA_BROKER=localhost:9092
KAFKA_CLIENT_ID=transaction-ms
KAFKA_GROUP_ID=transaction-consumer

MAX_AMOUNT=1000
```

## Ejemplos de Uso

### 1. Crear una Transacción
El proceso inicia desde el API Gateway enviando una solicitud al endpoint:

**Endpoint:**
```
POST http://localhost:3000/transactions/create
```

**Request Body:**
```json
{
  "accountExternalIdDebit": "550e8400-e29b-41d4-a716-446655440000",
  "accountExternalIdCredit": "550e8400-e29b-41d4-a716-446655440001",
  "transferTypeId": 1,
  "value": 1090.50
}
```

**Flujo del proceso:**
1. El API Gateway recibe la solicitud y la envía al microservicio `yape-transaction-ms`.
2. `yape-transaction-ms` procesa la transacción y publica un evento en Kafka (`transaction.created`).
3. `yape-anti-fraud-ms` consume el evento, valida si la transacción es fraudulenta y publica otro evento (`transaction.status.updated`).
4. `yape-transaction-ms` actualiza el estado de la transacción en la base de datos.

### 2. Validación Anti-Fraude
El microservicio `yape-anti-fraud-ms` escucha eventos de Kafka y evalúa si la transacción supera el monto permitido. Si lo hace, la marca como `REJECTED`, de lo contrario, la aprueba (`APPROVED`).

**Ejemplo de mensaje recibido en `yape-anti-fraud-ms`:**
```json
{
  "id": "a63f9c83-ad03-4e8b-8b2f-82afad281ff1",
  "value": 1090.50
}
```

### 3. Actualización del Estado de la Transacción
Una vez validada la transacción, `yape-anti-fraud-ms` publica un nuevo evento en Kafka con el resultado de la validación:

**Ejemplo de mensaje publicado:**
```json
{
  "id": "a63f9c83-ad03-4e8b-8b2f-82afad281ff1",
  "status": "REJECTED"
}
```

Este mensaje es consumido por `yape-transaction-ms`, que actualiza el estado de la transacción en la base de datos.

## Despliegue
Para desplegar las aplicaciones, puedes usar Docker y el archivo `docker-compose.yml` incluido en este repositorio:

```sh
docker-compose up -d
```

## Recursos
- [Documentación de NestJS](https://docs.nestjs.com/)
- [Canal de Discord de NestJS](https://discord.com/invite/nestjs)
- [Cursos oficiales de NestJS](https://nestjs.com/courses/)

