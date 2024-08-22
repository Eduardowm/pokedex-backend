import { type UseCase } from "../../../../common/types";
import { IPokemonRepository } from "../../data/repositories/IPokemonRepository";
import Pokemon from "../entities/Pokemon";

interface GetAllRequest {
    page?: number;
}

class GetAllUseCase implements UseCase<GetAllRequest, Pokemon[]> {
    constructor(
        private readonly pokemonRepository: IPokemonRepository,
    ) {}

    async execute(payload: GetAllRequest) {
        return await this.pokemonRepository.getPage(payload.page || 1);
    }
}
export default GetAllUseCase
