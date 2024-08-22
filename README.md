# Instalattion instructions

This application uses Node `lts/iron`. If you have NVM installed you can use `nvm install` to install this node version and `nvm use` to change your current node version to `lts/iron`.

1. First install all dependencies by running `npm i`.
2. Run the app migrations for the first time with `npx prisma migrate dev`. This will also create the local SQLite database if its your first time running.
3. Clone the `.env.example` into a new `.env` file, you can change the environment, port and database file name on the `.env` file.
4. Start the api with `npm run start`.

The API will have two routes available:
`GET /v1/pokemons` - Retrieve 50 pokemons from the API, this route accepts a numeric `page` query param to request different pokemons.
`GET /v1/pokemons/:id` - Retrieve a single pokemon data from the API by ID.

I used a really simple approach of saving the pokemon data on our database whenever is the first time someone requests data from that page or pokemon, the data is also updated if a pokemon was not updated on the past 24 hours.

This approach considers that the PokéAPI would only add new pokemons to the last page of the `GET /pokemon` route and does not include treatment to update the list with new pokemons that were inserted in the middle of the list.
