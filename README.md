# Lazer-Prod-API
Lazer Prod API is the API for Lazer Prod Manager an app made in the 2021 Swift project at esgi.

##Deployment
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
      POSTGRES_USER: Salayna
      POSTGRES_PASSWORD: DBTesting2021
      POSTGRES_DB: coliseum_db
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
      - JWT_SECRET=Pr@YsTh€hG0Bl!n
      - TYPEORM_CONNECTION=postgres
      - TYPEORM_SYNCHRONIZE=true
      - TYPEORM_HOST=postgres
      - TYPEORM_PORT=5432
      - TYPEORM_USERNAME=Salayna
      - TYPEORM_PASSWORD=DBTesting2021
      - TYPEORM_DATABASE=coliseum_db
      - TYPEORM_AUTO_SCHEMA_SYNC=coliseum_db
      - TYPEORM_ENTITIES=./build/**/*.entity.js
      - TYPEORM_MIGRATIONS=./build/Migration/**/*.migration.js
volumes:
  dbdata:

```
