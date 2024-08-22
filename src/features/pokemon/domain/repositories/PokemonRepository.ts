import PokeApiGateway from "../../data/gateways/PokeApiGateway";
import { type IPokemonStorage } from "../../data/gateways/IPokemonStorage";
import { type IPokemonRepository } from "../../data/repositories/IPokemonRepository";

import Pokemon from "../entities/Pokemon";
import PokemonModel from "../../data/models/PokemonModel";
import { POKEMONS_BY_PAGE } from "../../constants";

class PokemonRepository implements IPokemonRepository {
    constructor(
        private readonly pokeApi: PokeApiGateway,
        private readonly pokemonStorage: IPokemonStorage,
    ) {}

    private async updatePokemons(pokemonsToUpdate: PokemonModel[], apiPokemons: PokemonModel[]) {
        return await Promise.all(
            pokemonsToUpdate.map(async (pokemon) => {
                const apiPokemon = apiPokemons.find((apiPokemon) => apiPokemon.id === pokemon.id);
                if (apiPokemon) {
                    return await this.pokemonStorage.update(pokemon.id, pokemon);
                }
                return pokemon;
            })
        );
    }

    async getPage(page: number) {
        const pokemons = await this.pokemonStorage.getPage(page);
        const outdatedPokemons = pokemons.filter((pokemon) => pokemon.isOutdated());
        
        if (outdatedPokemons.length || pokemons.length !== POKEMONS_BY_PAGE) {
            const apiPokemons = await this.pokeApi.get(page);
            const missingPokemons = apiPokemons.filter((apiPokemon) => !pokemons.some((pokemon) => pokemon.id === apiPokemon.id));

            if (missingPokemons.length > 0) {
                const newPokemons = await this.pokemonStorage.createMany(missingPokemons);
                pokemons.push(...newPokemons)
            }

            if (outdatedPokemons.length > 0) {
                const updatedPokemons = await this.updatePokemons(outdatedPokemons, apiPokemons);

                pokemons.forEach((pokemon, index) => {
                    const updatedPokemon = updatedPokemons.find((p) => p.id === pokemon.id);
                    if (updatedPokemon) {
                        pokemons[index] = updatedPokemon;
                    }
                });
            }
        }

        return pokemons.sort((a, b) => a.id - b.id).map((p) => Pokemon.fromPokemonModel(p));
    }

    async find(id: number) {
        const pokemon = await this.pokemonStorage.find(id);

        if (!pokemon || pokemon.isOutdated()) {
            const apiPokemon = await this.pokeApi.find(id);
            if (apiPokemon) {
                const upsertedPokemon = await this.pokemonStorage.upsert(apiPokemon);
                return Pokemon.fromPokemonModel(upsertedPokemon);
            }
        }

        return pokemon ? Pokemon.fromPokemonModel(pokemon) : null;
    }
}
export default PokemonRepository