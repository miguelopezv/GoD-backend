# War of Drones (Backend)!

NestJS backend for managing games and players (CRUD-style). Provides REST endpoints under /games and /players.

## Requirements

- Node 18+ (or LTS)
- pnpm
- MongoDB (if using mongoose schemas in src/*/schemas)

## Install

```bash
pnpm install
```

## Run

Start in development (watch):

```bash
pnpm run start:dev
```

Start production:

```bash
pnpm run build
pnpm run start:prod
```

Run tests:

```bash
pnpm test       
```

## Configuration

- Environment and DB connection are read from your NestJS configuration (check `src/app.module.ts` and schema files).
- Ensure MongoDB is running.

## API Endpoints (examples)

Base URL: http://localhost:3000

Games
- Get a game byplayer id
  ```bash
  curl --location 'localhost:3000/game?id=1'
  ```

- Create a game
  ```bash
    curl --location 'localhost:3000/game' \
    --header 'Content-Type: application/json' \
    --data '{
        "players": [1, 2],
        "winnerPlayerId": 1,
        "totalSets": 4
    }'
  ```

Players

- Create a player
  ```bash
    curl --location 'localhost:3000/player' \
    --header 'Content-Type: application/json' \
    --data-raw '{"email": "miguel@gmail.com"}'
  ```