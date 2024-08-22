import { type UseCase } from "../../../../common/types";
import { IPokemonRepository } from "../../data/repositories/IPokemonRepository";
import Pokemon from "../entities/Pokemon";

interface FindOneRequest {
    id: number;
}

class FindOneUseCase implements UseCase<FindOneRequest, Pokemon | null> {
    constructor(
        private readonly pokemonRepository: IPokemonRepository,
    ) {}

    async execute(payload: FindOneRequest) {
        return await this.pokemonRepository.find(payload.id);
    }
}
export default FindOneUseCase
