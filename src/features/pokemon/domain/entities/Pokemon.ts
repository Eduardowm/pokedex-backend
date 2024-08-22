import PokemonModel from "../../data/models/PokemonModel";

class Pokemon {
    constructor(
        public id: number,
        public name: string,
        public order: number,
        public weight: number | null,
        public image: string | null,
        public createdAt?: Date,
        public updatedAt?: Date | null,
    ) {}

    static fromPokemonModel(PokemonModel: PokemonModel): Pokemon {
        return new this(
            PokemonModel.id,
            PokemonModel.name,
            PokemonModel.order,
            PokemonModel.weight,
            PokemonModel.image,
            PokemonModel.createdAt,
            PokemonModel.updatedAt,
        );
    }
}
export default Pokemon;
