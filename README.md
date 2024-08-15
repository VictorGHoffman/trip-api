# How to start
- Setting up .env file:
  - create `.env` file and add the following lines:
    - `POSTGRES_USER="USER"`
    - `POSTGRES_PASSWORD="PASSWORD"`
    - `POSTGRES_CON="CONNECTION_URL"`
    - `POSTGRES_PORT="PORT"`
    - `POSTGRES_DB="DATABASE"`
    - `POSTGRES_SCHEMA="SCHEMA"`
    - `TRIP_DATABASE_URL="postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_CON:$POSTGRES_PORT/$POSTGRES_DB?schema=$POSTGRES_SCHEMA"`
- Run the following commands:
  1. `docker compose up -d`
  2. `docker compose exec -it app sh`
  3. `npm run migrate:start`

## When you start new migrations will be applied