import { Pokemon } from "@prisma/client"
import ApiPokemonModel from "./ApiPokemonModel"

class PokemonModel {
    constructor(
        public id: number,
        public name: string,
        public order: number,
        public weight: number | null,
        public image: string | null,
        public createdAt?: Date,
        public updatedAt?: Date | null,
    ) {}

    static fromPokeAPI(apiPokemonModel: ApiPokemonModel): PokemonModel {
        return new this(
            apiPokemonModel.id,
            apiPokemonModel.name,
            apiPokemonModel.order,
            apiPokemonModel.weight,
            apiPokemonModel.image,
        )
    }

    static fromPrismaPokemon(prismaPokemon: Pokemon): PokemonModel {
        return new this(
            prismaPokemon.id,
            prismaPokemon.name,
            prismaPokemon.order,
            prismaPokemon.weight,
            prismaPokemon.image,
            prismaPokemon.createdAt,
            prismaPokemon.updatedAt,
        )
    }

    public isOutdated() {
        const YESTERDAY = 1000 * 60 * 60 * 24;
        return !this.updatedAt || this.updatedAt < new Date(Date.now() - YESTERDAY)
    }

    public toPrismaPayload() {
        return {
            id: this.id,
            name: this.name,
            order: this.order,
            weight: this.weight,
            image: this.image,
        }
    }
}
export default PokemonModel
