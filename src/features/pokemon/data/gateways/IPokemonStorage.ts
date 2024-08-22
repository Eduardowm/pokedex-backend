import PokemonModel from "../models/PokemonModel"

export interface IPokemonStorage {
    all(): Promise<PokemonModel[]>
    getPage(page: number): Promise<PokemonModel[]>
    find(id: number): Promise<PokemonModel | null>
    createMany: (pokemons: PokemonModel[]) => Promise<PokemonModel[]>
    create(pokemon: PokemonModel): Promise<PokemonModel>
    upsert(pokemon: PokemonModel): Promise<PokemonModel>
    update(id: number, data: Omit<PokemonModel, 'id'>): Promise<PokemonModel>
    delete(id: number): Promise<void>
}