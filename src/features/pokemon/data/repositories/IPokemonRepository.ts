import Pokemon from "../../domain/entities/Pokemon";

export interface IPokemonRepository {
    getPage: (page: number) => Promise<Pokemon[]>;
    find: (id: number) => Promise<Pokemon | null>;
}