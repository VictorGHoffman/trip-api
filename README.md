# How to start
- Setting up .env file:
  - create `.env` file and add the following line:
  - `TRIP_DATABASE_URL="postgresql://{USERNAME}:{PASSWORD}@{CONNECTION}:{PORT}/{DB}?schema={SCHEMA}"`
- Run the following commands:
  1. `docker compose up -d`
  2. `docker compose exec -it app sh`
  3. `npm run migrate:start`

## When you start new migrations will be applied