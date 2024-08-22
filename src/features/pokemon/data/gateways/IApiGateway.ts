import PokemonModel from "../models/PokemonModel"

export interface IApiGateway {
    get(page: number): Promise<PokemonModel[]>
    find(id: number): Promise<PokemonModel>
}