import { PokeAPISinglePokemon } from "../gateways/PokeApiGateway"

class ApiPokemonModel {
    constructor(
        public id: number,
        public name: string,
        public order: number,
        public weight: number | null,
        public image: string | null,
    ) {}

    static fromJson(pokemon: PokeAPISinglePokemon): ApiPokemonModel {
        return new this(
            pokemon.id,
            pokemon.name,
            pokemon.order,
            pokemon.weight,
            pokemon.sprites.front_default,
        )
    }
}
export default ApiPokemonModel
