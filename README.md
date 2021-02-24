# Lazer-Prod-API
Lazer Prod API is the API for Lazer Prod Manager an app made in the 2021 Swift project at esgi.

## Deployment
### Using Docker compose
```yaml
version: '3.1'
services:
  postgres:
    image: postgres
    restart: 'always'
    ports:
      - 5432:5432
    environment:
      POSTGRES_USER: username
      POSTGRES_PASSWORD: password
      POSTGRES_DB: dbname
    volumes:
      - dbdata:/var/lib/postgres

  adminer:
    image: adminer
    restart: 'always'
    ports:
      - 8080:8080

  api:
    restart: 'always'
    image: salayna/lazer_prod_api
    volumes:
      - /usr/src/app
      - /usr/src/app/node_modules
    ports:
      - '7701:7701'
    depends_on:
      - postgres
    environment:
      - NODE_ENV=production
      - PORT=7701
      - JWT_SECRET=ASecretPass
      - TYPEORM_CONNECTION=postgres
      - TYPEORM_SYNCHRONIZE=true
      - TYPEORM_HOST=postgres
      - TYPEORM_PORT=5432
      - TYPEORM_USERNAME=username
      - TYPEORM_PASSWORD=password
      - TYPEORM_DATABASE=dbname
      - TYPEORM_AUTO_SCHEMA_SYNC=dbname
      - TYPEORM_ENTITIES=./build/Entities/*.entity.js
      - TYPEORM_MIGRATIONS=./build/Migration/**/*.migration.js
volumes:
  dbdata:

```
