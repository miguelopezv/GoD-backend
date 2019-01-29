# War of Drones (Backend)!

This is the backend for the game Game of drones, a digital two-player Rock, Papers, Scissor game. This backend saves all the users that log into the game and record their game statistics.

## How to make it work

- Clone or download this repo.
- navigate to the folder `cd GoD-backend`.
- use `npm install` or `yarn` to install dependencies.
- Create the database schema manually.
- Edit `ormconfig.json` file according to your database configuration, MySQL is the default and the one that I've used.
- run `npm run start:dev` or `yarn run start:dev` to run all the migrations on the DB and start running the server.

Server will be running on localhost:3000 by default.

P.S: Unit tests run with `yarn run test` or `npm run test` command.
